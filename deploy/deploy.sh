#!/usr/bin/env bash
#
# Deployment der Wohlfahrt-Seite auf den Strato-VPS.
#
# Laeuft auf dem Mac: baut lokal, laedt nur das fertige Bundle hoch und
# startet den Dienst neu. Auf dem Server wird weder gebaut noch installiert –
# der hat dafuer zu wenig RAM.
#
#   ./deploy/deploy.sh root@<SERVER-IP>
#
# Optionen ueber Umgebungsvariablen:
#   PORT=3000              Port, auf dem die App lauscht
#   APP_DIR=/opt/wohlfahrt Zielverzeichnis auf dem Server
#   BIND=0.0.0.0           Schnittstelle. Zum Testen ueber die nackte IP
#                          "0.0.0.0", sobald Caddy davor sitzt "127.0.0.1"
#                          (dann ist die App von aussen nicht mehr direkt
#                          erreichbar – sicherer).

set -euo pipefail

TARGET="${1:-}"
PORT="${PORT:-3000}"
APP_DIR="${APP_DIR:-/opt/wohlfahrt}"
BIND="${BIND:-0.0.0.0}"
SERVICE=wohlfahrt

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
ok()   { printf '    \033[32mok\033[0m %s\n' "$*"; }
die()  { printf '\n\033[31mAbbruch:\033[0m %s\n' "$*" >&2; exit 1; }

[ -n "$TARGET" ] || die "Kein Ziel. Aufruf: ./deploy/deploy.sh root@<SERVER-IP>"
cd "$(dirname "$0")/.."
[ -f package.json ] || die "package.json nicht gefunden – falsches Verzeichnis?"
[ -f .env.local ]   || die ".env.local fehlt – ohne die Variablen startet die App nicht."

# --- 1. Lokal bauen ---------------------------------------------------------

log "Baue lokal (der Server hat dafuer zu wenig Speicher)"
npm run build >/dev/null || die "Build fehlgeschlagen – nichts hochgeladen."
[ -d .next/standalone ] || die ".next/standalone fehlt. Steht output: 'standalone' in der next.config.mjs?"
ok "Build fertig"

# --- 2. Bundle zusammenstellen ---------------------------------------------

log "Stelle das Upload-Paket zusammen"
# Next kopiert static/ und public/ NICHT selbst nach standalone – das ist so
# dokumentiert und eine haeufige Fehlerquelle ("Seite ohne Styles").
rm -rf .next/standalone/.next/static .next/standalone/public
cp -r .next/static .next/standalone/.next/static
[ -d public ] && cp -r public .next/standalone/public
cp .env.local .next/standalone/.env.local
chmod 600 .next/standalone/.env.local
ok "Paket bereit ($(du -sh .next/standalone | cut -f1))"

# --- 3. Hochladen -----------------------------------------------------------

log "Lade nach ${TARGET}:${APP_DIR}"
ssh "$TARGET" "mkdir -p '$APP_DIR'"
rsync -az --delete \
  --exclude '.env.local' \
  .next/standalone/ "$TARGET:$APP_DIR/"
# .env getrennt – enthaelt Tokens und das SMTP-Passwort. Die Rechte setzt der
# Remote-Teil weiter unten auf 600; das rsync von macOS kennt --chmod nicht.
rsync -az .next/standalone/.env.local "$TARGET:$APP_DIR/.env.local"
ssh "$TARGET" "chmod 600 '$APP_DIR/.env.local'"
ok "Upload fertig"

# --- 4. Dienst einrichten und starten ---------------------------------------

log "Richte den systemd-Dienst ein und starte neu"
ssh "$TARGET" APP_DIR="$APP_DIR" PORT="$PORT" BIND="$BIND" SERVICE="$SERVICE" 'bash -se' <<'REMOTE'
set -euo pipefail

command -v node >/dev/null || { echo "Node.js ist nicht installiert."; exit 1; }
major="$(node -v | sed 's/^v\([0-9]*\).*/\1/')"
[ "$major" -ge 20 ] || { echo "Node $major ist zu alt – Next 16 braucht mindestens 20."; exit 1; }

# Eigener Systembenutzer: die App laeuft nicht als root.
id wohlfahrt >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin wohlfahrt
chown -R wohlfahrt:wohlfahrt "$APP_DIR"
chmod 600 "$APP_DIR/.env.local"

cat > /etc/systemd/system/${SERVICE}.service <<UNIT
[Unit]
Description=Wohlfahrt Website (Next.js)
After=network.target

[Service]
Type=simple
User=wohlfahrt
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
Environment=PORT=${PORT}
Environment=HOSTNAME=${BIND}
ExecStart=$(command -v node) ${APP_DIR}/server.js
Restart=always
RestartSec=5
# Etwas Abschottung – die App braucht nur ihr eigenes Verzeichnis.
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=${APP_DIR}

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable "$SERVICE" >/dev/null 2>&1 || true
systemctl restart "$SERVICE"
sleep 2
systemctl is-active --quiet "$SERVICE" || { journalctl -u "$SERVICE" -n 30 --no-pager; exit 1; }
echo "    Dienst laeuft auf ${BIND}:${PORT}"
REMOTE
ok "Dienst neu gestartet"

# --- 5. Funktionspruefung ---------------------------------------------------

log "Pruefe, ob die Seite antwortet"
code="$(ssh "$TARGET" "curl -sS -o /dev/null -w '%{http_code}' --max-time 15 http://127.0.0.1:${PORT}/" || true)"
case "$code" in
  200) ok "Die Seite antwortet mit 200" ;;
  # 401 kommt vom Passwortschutz in proxy.ts (SITE_PASSWORD gesetzt) – die
  # App laeuft dann genauso, sie verlangt nur vorher eine Anmeldung.
  401) ok "Die Seite antwortet mit 401 – der Passwortschutz ist aktiv, die App laeuft" ;;
  *)   die "Die Seite antwortet mit '$code'. Logs: ssh $TARGET journalctl -u $SERVICE -n 50" ;;
esac

host="${TARGET#*@}"
cat <<EOF

  Fertig.

  Test ueber die IP :  http://${host}:${PORT}/   (nur wenn BIND=0.0.0.0)
  Logs             :  ssh ${TARGET} journalctl -u ${SERVICE} -f
  Neustart         :  ssh ${TARGET} systemctl restart ${SERVICE}

  Sobald Caddy davorsteht, einmal mit BIND=127.0.0.1 deployen – dann ist die
  App nur noch ueber HTTPS erreichbar und nicht mehr direkt ueber den Port.

EOF
