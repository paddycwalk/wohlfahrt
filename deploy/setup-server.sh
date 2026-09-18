#!/usr/bin/env bash
#
# Grundeinrichtung des Strato-VPS fuer die Wohlfahrt-Seite.
#
# Richtet ein: Swap (falls keiner da ist) und Caddy als Reverse Proxy mit
# automatischem Let's-Encrypt-Zertifikat. Die Next.js-App selbst wird hier
# NICHT installiert – das macht das Deployment-Skript.
#
# Aufruf vom Mac aus, das Skript muss nicht auf den Server kopiert werden:
#
#   ssh root@<SERVER-IP> 'bash -s' -- neu.fliesen-wohlfahrt.de \
#     < deploy/setup-server.sh
#
# Mehrere Domains sind erlaubt – sie zeigen dann alle auf dieselbe App:
#
#   ssh root@<SERVER-IP> 'bash -s' -- neu.fliesen-wohlfahrt.de \
#     fliesen-wohlfahrt.de www.fliesen-wohlfahrt.de < deploy/setup-server.sh
#
# Der Port kommt ueber die Umgebungsvariable PORT (Standard 3000).
#
# Das Skript ist mehrfach ausfuehrbar: Was schon eingerichtet ist, wird
# uebersprungen statt neu angelegt. Bereits laufende Dienste (etwa die App auf
# Port 8090) bleiben unangetastet.

set -euo pipefail

DOMAINS=("$@")
APP_PORT="${PORT:-3000}"
SWAP_SIZE="${SWAP_SIZE:-2G}"

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
ok()   { printf '    \033[32mok\033[0m %s\n' "$*"; }
warn() { printf '    \033[33m!\033[0m  %s\n' "$*"; }
die()  { printf '\n\033[31mAbbruch:\033[0m %s\n' "$*" >&2; exit 1; }

# --- Vorpruefungen ----------------------------------------------------------

[ "$(id -u)" -eq 0 ] || die "Bitte als root ausfuehren."
[ "${#DOMAINS[@]}" -gt 0 ] || die "Keine Domain angegeben. Aufruf: ... 'bash -s' -- <domain> [weitere...]"
command -v apt-get >/dev/null || die "Kein apt – dieses Skript ist fuer Ubuntu/Debian."

log "Pruefe, ob die Ports 80 und 443 frei sind"
for port in 80 443; do
  # Zeile des Ports aus der Listen-Liste holen, daraus den Prozessnamen
  # ziehen: ss schreibt ihn als users:(("name",pid=...)).
  line="$(ss -tlnp 2>/dev/null | grep -E "[:.]${port}[[:space:]]" || true)"
  [ -n "$line" ] || continue
  holder="$(printf '%s' "$line" | grep -oE '"[^"]+"' | head -1 | tr -d '"')"
  # Caddy selbst darf die Ports halten – dann laeuft das Skript ein zweites Mal.
  if [ "$holder" != "caddy" ]; then
    die "Port $port ist von '${holder:-einem unbekannten Dienst}' belegt. Bitte erst klaeren – zwei Webserver auf demselben Port blockieren sich."
  fi
done
ok "Ports 80 und 443 sind verfuegbar"

# --- Swap -------------------------------------------------------------------

log "Swap pruefen"
if [ "$(swapon --show --noheadings | wc -l)" -gt 0 ]; then
  ok "Swap ist bereits aktiv – unveraendert gelassen"
elif [ -e /swapfile ]; then
  warn "/swapfile existiert, ist aber nicht aktiv – bitte manuell pruefen"
else
  log "Lege ${SWAP_SIZE} Swap an (schuetzt vor Abstuerzen bei Speicherspitzen)"
  fallocate -l "$SWAP_SIZE" /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile >/dev/null
  swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  ok "Swap aktiv und in /etc/fstab eingetragen (ueberlebt den Reboot)"
fi

# --- Caddy ------------------------------------------------------------------

log "Caddy pruefen"
if command -v caddy >/dev/null; then
  ok "Caddy ist bereits installiert ($(caddy version | head -1))"
else
  log "Installiere Caddy aus der offiziellen Paketquelle"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -qq
  apt-get install -y -qq caddy
  ok "Caddy installiert"
fi

# --- Caddyfile --------------------------------------------------------------

log "Konfiguriere ${DOMAINS[*]} -> 127.0.0.1:${APP_PORT}"

CADDYFILE=/etc/caddy/Caddyfile
if [ -f "$CADDYFILE" ] && ! grep -q "^# --- wohlfahrt" "$CADDYFILE"; then
  cp "$CADDYFILE" "${CADDYFILE}.bak.$(date +%Y%m%d%H%M%S)"
  ok "Bestehende Caddyfile gesichert"
fi

# Nur den eigenen Block ersetzen, fremde Eintraege bleiben erhalten.
if grep -q "^# --- wohlfahrt" "$CADDYFILE" 2>/dev/null; then
  sed -i '/^# --- wohlfahrt/,/^# --- ende wohlfahrt/d' "$CADDYFILE"
fi

# Der Beispielblock aus dem Caddy-Paket faengt sonst alles auf Port 80 ab und
# liefert die Caddy-Willkommensseite. Er wird nur entfernt, wenn er unveraendert
# ist – daran erkennbar, dass er auf /usr/share/caddy zeigt.
if grep -q '^[[:space:]]*root \* /usr/share/caddy' "$CADDYFILE" 2>/dev/null; then
  sed -i '/^:80 {/,/^}/d' "$CADDYFILE"
  ok "Beispielblock des Pakets entfernt"
fi

# Caddy nimmt mehrere Hostnamen in einer Zeile – Komma UND Leerzeichen, ein
# blosses Komma lehnt es ab.
host_line="$(printf '%s, ' "${DOMAINS[@]}")"
host_line="${host_line%, }"
cat >> "$CADDYFILE" <<EOF
# --- wohlfahrt (von deploy/setup-server.sh verwaltet – nicht von Hand aendern)
${host_line} {
	encode zstd gzip
	reverse_proxy 127.0.0.1:${APP_PORT}
}
# --- ende wohlfahrt
EOF

log "Pruefe die Konfiguration"
caddy validate --config "$CADDYFILE" --adapter caddyfile >/dev/null 2>&1 \
  || die "Caddyfile ist fehlerhaft – es wurde nichts neu geladen."
ok "Konfiguration ist gueltig"

systemctl reload caddy 2>/dev/null || systemctl restart caddy
systemctl enable caddy >/dev/null 2>&1 || true
ok "Caddy laeuft und startet beim Reboot automatisch mit"

# --- Abschluss --------------------------------------------------------------

log "Fertig"
cat <<EOF

  Domains     : ${DOMAINS[*]}
  Weiterleitung: 127.0.0.1:${APP_PORT}
  Zertifikat  : holt Caddy je Domain automatisch, sobald sie auf diesen Server
                zeigt. Domains, die noch woanders zeigen, versucht Caddy im
                Hintergrund weiter – das ist erwartet und stoert nicht.

  Logs ansehen:  journalctl -u caddy -f

EOF
