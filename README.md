# W&W – Wohlfahrt & Wohlfahrt Fliesen

Website des Fliesen-Meisterbetriebs **Wohlfahrt & Wohlfahrt** (Pfullingen, seit 1954).
Gebaut mit **Next.js** (App Router) und auf **Vercel** server-gerendert (SSR/ISR).
Inhalte kommen aus **Storyblok** und sind ohne Rebuild sofort live; ohne Token
läuft die Seite mit den lokalen Fallback-Inhalten in `src/site/content/`.

---

## Inhaltsverzeichnis

- [Tech-Stack](#tech-stack)
- [Voraussetzungen](#voraussetzungen)
- [Schnellstart](#schnellstart)
- [Skripte](#skripte)
- [Projektstruktur](#projektstruktur)
- [Deployment (Vercel, SSR)](#deployment-vercel-ssr)
- [SEO](#seo)
- [Konfiguration anpassen](#konfiguration-anpassen)
- [Storyblok CMS (Inhalte pflegbar machen)](#storyblok-cms-inhalte-pflegbar-machen)
- [Bekannte Punkte / To-dos](#bekannte-punkte--to-dos)
- [Mail-/DNS-Daten (kasserver.com)](#mail-dns-daten-kasservercom)

---

## Tech-Stack

| Bereich        | Technologie                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router, SSR/ISR, Turbopack)            |
| UI-Bibliothek  | [React 19](https://react.dev/)                                                |
| Sprache        | [TypeScript 6](https://www.typescriptlang.org/)                               |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/)                                   |
| UI-Komponenten | Eigene Komponenten (Atomic Design) + [Radix Slot](https://www.radix-ui.com/) |
| Animationen    | [Motion](https://motion.dev/)                                                 |
| Icons          | [lucide-react](https://lucide.dev/) (+ eigene Brand-Icons)                    |
| Schriften      | Bebas Neue & Montserrat (selbst gehostet, woff2)                              |

---

## Voraussetzungen

- **Node.js 24 LTS** (siehe [`.nvmrc`](.nvmrc))
- **npm** (wird mit Node geliefert)

Mit [nvm](https://github.com/nvm-sh/nvm) die passende Version aktivieren:

```bash
nvm use
# oder, falls noch nicht installiert:
nvm install
```

---

## Schnellstart

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Entwicklungsserver starten (https://localhost:3010)
npm run dev
```

---

## Skripte

| Befehl              | Beschreibung                                                                    |
| ------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`       | Dev-Server mit Hot-Reload auf **https**://localhost:**3010** (lokales Zertifikat). |
| `npm run dev:http`  | Dev-Server ohne HTTPS auf Port 3000.                                            |
| `npm run build`     | Produktions-Build (`.next/`) für den Node-Server.                               |
| `npm run start`     | Startet den gebauten Produktions-Server.                                        |
| `npm run preview`   | `build` + `start` in einem Schritt.                                             |
| `npm run typecheck` | Prüft die Typen via `tsc --noEmit`.                                             |

> **Warum HTTPS im Dev-Modus?** Der Storyblok Visual Editor lädt die Seite in einem
> iframe und verlangt eine `https`-Preview-URL. Die Zertifikate `localhost.pem` /
> `localhost-key.pem` liegen im Projekt-Root und sind per `.gitignore` ausgenommen –
> bei Bedarf mit [mkcert](https://github.com/FiloSottile/mkcert) neu erzeugen.

---

## Projektstruktur

```
.
├─ app/                     # Next.js App Router (Routen, Layout, SEO-Dateien)
│  ├─ layout.tsx            # Root-Layout: Metadaten, Fonts, JSON-LD
│  ├─ page.tsx              # Startseite (/)
│  ├─ <route>/page.tsx      # Eine Datei je Unterseite (z. B. kontakt/)
│  ├─ sitemap.ts            # generiert /sitemap.xml
│  ├─ robots.ts             # generiert /robots.txt
│  ├─ manifest.ts           # generiert /manifest.webmanifest
│  ├─ icon.png              # Favicon (auto-erkannt)
│  └─ apple-icon.png        # Apple-Touch-Icon (auto-erkannt)
│
├─ src/
│  ├─ site/
│  │  ├─ components/        # Atomic Design: atoms / molecules / organisms / templates
│  │  ├─ pages/             # Seiten-Komponenten (Home, About, Contact …)
│  │  ├─ content/           # Content-Schicht: Storyblok-Abruf + lokale Fallbacks
│  │  ├─ config/seo.ts      # zentrale SEO-Konfiguration (Domain, Titel, Texte)
│  │  └─ lib/               # Hilfsfunktionen (u. a. react-router-Shim)
│  └─ styles/               # Tailwind, Theme-Variablen, selbst gehostete Fonts
│
├─ public/                  # statische Assets (Fonts, llms.txt)
├─ .next/                   # Build-Ergebnis (wird von `npm run build` erzeugt)
├─ proxy.ts                 # Basic-Auth + Storyblok-Preview-Erkennung
├─ next.config.mjs          # Next.js-Konfiguration (SSR/ISR auf Vercel)
├─ .nvmrc                   # festgelegte Node-Version
└─ .editorconfig            # einheitlicher Editor-Stil
```

### Routing-Hinweis

Die Seiten-Komponenten stammen aus einem Vite/React-Router-Projekt. Damit der
generierte Code unverändert weiterläuft, mappt [`src/site/lib/react-router-shim.tsx`](src/site/lib/react-router-shim.tsx)
`react-router` auf die Next.js-Pendants – bewusst nur die beiden tatsächlich
genutzten APIs `Link` und `useLocation`. Der Alias ist doppelt hinterlegt: in
[`tsconfig.json`](tsconfig.json) (für TypeScript) und in
[`next.config.mjs`](next.config.mjs) (für Turbopack).
Jede Route unter `app/<name>/page.tsx` ist ein dünner Wrapper mit eigener
`metadata` und rendert die passende Komponente aus `src/site/pages/`.

> **Aufräum-Kandidat:** Der Shim ist reines Figma-Make-Erbe. Wer die 32
> `<Link to=…>`-Stellen auf `next/link` (`href=`) und `useLocation` auf
> `usePathname` umstellt, kann Shim + beide Alias-Einträge löschen.

---

## Deployment (Vercel, SSR)

Die Seite laeuft auf **Vercel** als server-gerenderte App (dynamisches SSR).
Vorteil: der Storyblok Visual Editor zeigt eine echte Draft-Vorschau, und
veroeffentlichte Aenderungen sind **sofort** live – ohne Rebuild und ohne
Commit.

### Einrichtung

1. Repo bei Vercel importieren (Framework wird als **Next.js** erkannt).
2. **Environment Variables** setzen (Production + Preview):
   - `STORYBLOK_TOKEN`, `STORYBLOK_REGION`, `STORYBLOK_VERSION=published`
   - `NEXT_PUBLIC_STORYBLOK_TOKEN`, `NEXT_PUBLIC_STORYBLOK_REGION` (Bridge)
3. **Domain** im Vercel-Projekt hinterlegen und die DNS-Eintraege beim
   Registrar setzen. SSL kommt automatisch.

### Live-Vorschau (Storyblok Visual Editor)

- In Storyblok → **Settings → Visual Editor → Preview URL** die Vercel-Domain
  eintragen (`https://DEINE-DOMAIN/`).
- Beim Oeffnen einer Story haengt Storyblok `?_storyblok=…` an. Die
  [`proxy.ts`](proxy.ts) setzt daraufhin den internen Header
  `x-sb-preview`, und die Content-Fetcher laden **draft** statt **published**
  (siehe `resolveVersion` in [`src/site/content/index.ts`](src/site/content/index.ts)).
  Bewusst **ohne** Draft-Mode-Cookie – im iframe blockieren Browser solche
  Third-Party-Cookies (fuehrte zu einer Redirect-Schleife). Beim **Speichern**
  laedt die Bridge neu und zeigt den neuen Stand.

### Veroeffentlichen → live

Da die Seiten pro Anfrage server-seitig gerendert werden, ist eine
Veroeffentlichung **sofort** sichtbar – kein Webhook, kein Rebuild noetig.

### Lokal testen

```bash
npm run build && npm start   # baut und startet den Produktionsserver
```

---

## SEO

Bereits eingerichtet:

- **Per-Page-Metadaten** (Titel, Description, Canonical) – zentral gepflegt in
  [`src/site/config/seo.ts`](src/site/config/seo.ts)
- **Open Graph** & **Twitter Cards** inkl. Vorschaubild (`public/og-image.jpg`, 1200×630)
- **JSON-LD** Strukturdaten (`HomeAndConstructionBusiness`) im Root-Layout
- automatisch generierte **`sitemap.xml`**, **`robots.txt`** und **`manifest.webmanifest`**
- `theme-color`, Favicon und Apple-Touch-Icon

**Wichtig:** Die Domain ist in [`src/site/config/seo.ts`](src/site/config/seo.ts)
über `SITE_URL` gesetzt. Bei abweichender Domain dort anpassen – sie wird für
Canonical-URLs, Open Graph, Sitemap und robots.txt verwendet.

---

## Konfiguration anpassen

| Was                                                 | Wo                                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| Domain, Titel, Meta-Texte                           | `src/site/config/seo.ts`                                            |
| Firmendaten / Kontakt / Öffnungszeiten / Navigation | `src/site/content/site.ts` (lokale Defaults, zugleich CMS-Fallback) |
| Strukturdaten (JSON-LD)                             | `app/layout.tsx` (`buildJsonLd`, speist sich aus den Firmendaten)   |
| Farben / Theme                                      | `src/styles/theme.css`                                              |
| Schriften                                           | `src/styles/fonts.css` + `public/fonts/`                            |
| Next.js-Optionen (Bilder, trailingSlash, Rewrites)  | `next.config.mjs`                                                   |

---

## Storyblok CMS (Inhalte pflegbar machen)

Die Seite ist auf eine **Storyblok**-Anbindung vorbereitet. Solange kein Token
gesetzt ist, laufen Build und Seite vollständig mit den lokalen Default-Inhalten
unter `src/site/content/` – Storyblok ist also **optional** und bricht den Build
nie.

### Architektur

- **Modell:** SSR/ISR auf Vercel. Inhalte werden serverseitig pro Anfrage bzw.
  per Incremental Static Regeneration geholt – veröffentlichte Änderungen sind
  ohne Rebuild live.
- **Datenabruf:** `storyblok-js-client` direkt (reiner HTTP-Client). Der
  `@storyblok/react/rsc`-Einstieg wird **nicht** genutzt; `@storyblok/react`
  liefert nur die Visual-Editor-Bridge für den Client.
- **Draft-Vorschau:** [`proxy.ts`](proxy.ts) erkennt den Query-Parameter
  `_storyblok` des Visual Editors und setzt den internen Header `x-sb-preview`;
  der Server rendert dann Draft-Inhalte (bewusst kein Cookie – im iframe würde
  es als Third-Party blockiert).
- **Fallback:** `src/site/content/site.ts` ist die Quelle der Wahrheit ohne CMS;
  gepflegte Storyblok-Felder überlagern diese Werte (Teil-Pflege möglich).

### Dateien

| Datei                                                 | Zweck                                                   |
| ----------------------------------------------------- | ------------------------------------------------------- |
| `src/site/content/types.ts`                           | TypeScript-Typen der Inhalte                            |
| `src/site/content/site.ts`                            | Lokale Default-Firmendaten (Fallback)                   |
| `src/site/content/index.ts`                           | `getSiteSettings()` – serverseitiger Fetch mit Fallback |
| `src/site/lib/storyblok.ts`                           | Client-Init (nur mit Token aktiv)                       |
| `src/site/content/SiteSettingsProvider.tsx`           | Stellt Settings clientseitig bereit (`useSiteSettings`) |
| `src/site/components/providers/StoryblokProvider.tsx` | Visual-Editor-Bridge (Live-Vorschau)                    |
| `src/site/lib/editable.ts`                            | Click-to-Edit-Attribute aus `_editable`                 |
| `proxy.ts`                                            | Preview-Erkennung + Basic-Auth                          |
| `.env.example`                                        | Vorlage für die Env-Variablen                           |

### Einrichtung

1. **Space anlegen** in Storyblok (Region merken: `eu`/`us`/`ap`/`ca`/`cn`).
2. **Komponenten erstellen** (z. B. mit dem Storyblok-MCP) und eine globale
   Story `settings` füllen. Als Feldnamen die Keys aus
   `src/site/content/types.ts` verwenden – dort steht die Zielstruktur.
3. **`.env.local`** aus `.env.example` kopieren und Tokens eintragen:
   ```bash
   cp .env.example .env.local
   ```
4. **Dev-Server neu starten** – die Inhalte werden serverseitig geladen.

### Visual Editor (Live-Vorschau)

- `NEXT_PUBLIC_STORYBLOK_TOKEN` setzen und `StoryblokProvider` in
  `app/layout.tsx` um die App legen.
- Als Vorschau-URL im Space den lokalen Dev-Server
  (`https://localhost:3010`, daher `npm run dev` mit HTTPS) bzw. die
  Preview-Deployment-URL eintragen.

### Inhaltsänderungen

Kein Rebuild nötig: durch SSR/ISR holt der Server die Inhalte selbst.
„Veröffentlichen" in Storyblok wirkt also direkt – ohne GitHub-Action,
ohne Webhook, ohne Commit.

---

## Bekannte Punkte / To-dos

- [x] **Kontaktformular** versendet real per SMTP über
      [`app/api/contact/route.ts`](app/api/contact/route.ts) (Nodemailer,
      Honeypot + serverseitige Validierung). Env: `SMTP_*`, `CONTACT_TO`.
- [ ] **Cookie-/Consent-Banner** für externe Einbettungen (Google-Maps-iframe
      über `mapEmbedUrl` in [`MapEmbed.tsx`](src/site/components/molecules/MapEmbed.tsx))
      prüfen.
- [ ] **Rechtstexte** (Impressum/Datenschutz) juristisch final prüfen.
- [ ] **react-router-Shim** ablösen (siehe [Routing-Hinweis](#routing-hinweis)).
- [ ] **`asset()`** in [`src/site/lib/asset.ts`](src/site/lib/asset.ts) ist seit
      dem Wechsel auf Vercel eine Identitätsfunktion (`NEXT_PUBLIC_BASE_PATH`
      wird nirgends gesetzt, `basePath` ist nicht konfiguriert) – kann entfallen.

---

## Mail-/DNS-Daten (kasserver.com)

| Eintrag              | Wert                                       |
| -------------------- | ------------------------------------------ |
| MX (Postannahme)     | `w00efa13.kasserver.com`                   |
| SPF                  | `include:spf.kasserver.com`                |
| Nameserver           | `ns5.kasserver.com` / `ns6.kasserver.com`  |
