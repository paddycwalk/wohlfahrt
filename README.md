# W&W – Wohlfahrt & Wohlfahrt Fliesen

Website des Fliesen-Meisterbetriebs **Wohlfahrt & Wohlfahrt** (Pfullingen, seit 1954).
Gebaut mit **Next.js** als **statischer Export** – das Ergebnis ist reines HTML/CSS/JS
und kann ohne Server (z. B. per FTP) auf jedes Webhosting geladen werden.

---

## Inhaltsverzeichnis

- [Tech-Stack](#tech-stack)
- [Voraussetzungen](#voraussetzungen)
- [Schnellstart](#schnellstart)
- [Skripte](#skripte)
- [Projektstruktur](#projektstruktur)
- [Statischer Build & FTP-Upload](#statischer-build--ftp-upload)
- [SEO](#seo)
- [Konfiguration anpassen](#konfiguration-anpassen)
- [Storyblok CMS (Inhalte pflegbar machen)](#storyblok-cms-inhalte-pflegbar-machen)
- [Bekannte Punkte / To-dos](#bekannte-punkte--to-dos)

---

## Tech-Stack

| Bereich        | Technologie                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router, `output: "export"`, Turbopack) |
| UI-Bibliothek  | [React 19](https://react.dev/)                                                |
| Sprache        | [TypeScript 6](https://www.typescriptlang.org/)                               |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/)                                   |
| UI-Komponenten | [Radix UI](https://www.radix-ui.com/) / shadcn                                |
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

# 2. Entwicklungsserver starten (http://localhost:3000)
npm run dev
```

---

## Skripte

| Befehl            | Beschreibung                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Startet den Entwicklungsserver mit Hot-Reload auf Port 3000.        |
| `npm run build`   | Erzeugt den statischen Export im Ordner `out/`.                     |
| `npm run preview` | Serviert den gebauten `out/`-Ordner lokal (wie auf dem FTP-Server). |
| `npm run lint`    | Führt das Linting via ESLint aus.                                   |

> **Hinweis:** `next start` gibt es bewusst nicht – bei `output: "export"` existiert
> kein Node-Server. Zum Anschauen des Builds `npm run preview` verwenden.

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
│  │  ├─ config/seo.ts      # zentrale SEO-Konfiguration (Domain, Titel, Texte)
│  │  └─ lib/               # Hilfsfunktionen (u. a. react-router-Shim)
│  ├─ styles/               # Tailwind, Theme-Variablen, selbst gehostete Fonts
│  └─ imports/              # (Altlasten aus Figma – können entfernt werden)
│
├─ public/                  # statische Assets (Logo, Fonts, Bilder, og-image)
├─ out/                     # Build-Ergebnis (wird von `npm run build` erzeugt)
├─ next.config.mjs          # Next.js-Konfiguration (Static Export)
├─ .nvmrc                   # festgelegte Node-Version
└─ .editorconfig            # einheitlicher Editor-Stil
```

### Routing-Hinweis

Die Seiten-Komponenten stammen aus einem Vite/React-Router-Projekt. Damit der
generierte Code unverändert weiterläuft, mappt [`src/site/lib/react-router-shim.tsx`](src/site/lib/react-router-shim.tsx)
`react-router` (z. B. `Link`, `useLocation`, `Outlet`) auf die Next.js-Pendants.
Jede Route unter `app/<name>/page.tsx` ist ein dünner Wrapper mit eigener
`metadata` und rendert die passende Komponente aus `src/site/pages/`.

---

## Deployment (Vercel, SSR/ISR)

Die Seite laeuft auf **Vercel** als server-gerenderte App mit **ISR**
(Incremental Static Regeneration). Vorteil: der Storyblok Visual Editor zeigt
eine echte Draft-Vorschau, und veroeffentlichte Aenderungen sind kurz darauf
live – ohne Rebuild-Commit.

### Einrichtung

1. Repo bei Vercel importieren (Framework wird als **Next.js** erkannt).
2. **Environment Variables** setzen (Production + Preview):
   - `STORYBLOK_TOKEN`, `STORYBLOK_REGION`, `STORYBLOK_VERSION=published`
   - `NEXT_PUBLIC_STORYBLOK_TOKEN`, `NEXT_PUBLIC_STORYBLOK_REGION` (Bridge)
   - `STORYBLOK_REVALIDATE_SECRET` (frei waehlbares Geheimnis)
3. **Domain** im Vercel-Projekt hinterlegen und die DNS-Eintraege beim
   Registrar setzen. SSL kommt automatisch.

### Live-Vorschau (Storyblok Visual Editor)

- In Storyblok → **Settings → Visual Editor → Preview URL** die Vercel-Domain
  eintragen (`https://DEINE-DOMAIN/`).
- Beim Oeffnen einer Story haengt Storyblok `?_storyblok=…` an. Die
  [`middleware.ts`](middleware.ts) leitet einmalig ueber
  [`app/api/draft/route.ts`](app/api/draft/route.ts) und aktiviert den
  Next.js Draft-Mode → die Vorschau rendert **draft**. Beim **Speichern** laedt
  die Bridge neu und zeigt den neuen Stand.

### Veroeffentlichen → live

- In Storyblok → **Settings → Webhooks** einen Webhook „Story published"
  anlegen mit URL:
  `https://DEINE-DOMAIN/api/revalidate/?secret=DEIN_SECRET`
- Der Handler [`app/api/revalidate/route.ts`](app/api/revalidate/route.ts) ruft
  `revalidatePath("/", "layout")` auf → betroffene Seiten werden neu erzeugt,
  die Aenderung ist in Sekunden live. Als Sicherheitsnetz revalidieren die
  Seiten zusaetzlich stuendlich ([`revalidate = 3600`](app/layout.tsx)).

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
| Static-Export-Optionen                              | `next.config.mjs`                                                   |

---

## Storyblok CMS (Inhalte pflegbar machen)

Die Seite ist auf eine **Storyblok**-Anbindung vorbereitet. Solange kein Token
gesetzt ist, laufen Build und Seite vollständig mit den lokalen Default-Inhalten
unter `src/site/content/` – Storyblok ist also **optional** und bricht den Build
nie.

### Architektur

- **Modell:** Build-time (SSG). Inhalte werden beim `npm run build` per Content
  Delivery API geholt und statisch eingebacken → beste SEO/Performance.
- **Datenabruf:** `storyblok-js-client` direkt (reiner HTTP-Client). Der
  `@storyblok/react/rsc`-Einstieg wird **nicht** genutzt, da er Server Actions
  registriert, die mit `output: "export"` inkompatibel sind.
- **Fallback:** `src/site/content/site.ts` ist die Quelle der Wahrheit ohne CMS;
  gepflegte Storyblok-Felder überlagern diese Werte (Teil-Pflege möglich).

### Dateien

| Datei                                                 | Zweck                                                   |
| ----------------------------------------------------- | ------------------------------------------------------- |
| `src/site/content/types.ts`                           | TypeScript-Typen der Inhalte                            |
| `src/site/content/site.ts`                            | Lokale Default-Firmendaten (Fallback)                   |
| `src/site/content/index.ts`                           | `getSiteSettings()` – Build-time Fetch mit Fallback     |
| `src/site/lib/storyblok.ts`                           | Client-Init (nur mit Token aktiv)                       |
| `src/site/content/SiteSettingsProvider.tsx`           | Stellt Settings clientseitig bereit (`useSiteSettings`) |
| `src/site/content/storyblok-schema.ts`                | Blueprint der anzulegenden Storyblok-Komponenten        |
| `src/site/components/providers/StoryblokProvider.tsx` | Visual-Editor-Bridge (Live-Vorschau)                    |
| `.env.example`                                        | Vorlage für die Env-Variablen                           |

### Einrichtung

1. **Space anlegen** in Storyblok (Region merken: `eu`/`us`/`ap`/`ca`/`cn`).
2. **Komponenten erstellen** gemäß `src/site/content/storyblok-schema.ts`
   (z. B. mit dem Storyblok-MCP) und eine globale Story `settings` füllen.
3. **`.env.local`** aus `.env.example` kopieren und Tokens eintragen:
   ```bash
   cp .env.example .env.local
   ```
4. **Neu bauen:** `npm run build`. Die Inhalte sind nun statisch eingebacken.

### Visual Editor (Live-Vorschau)

- `NEXT_PUBLIC_STORYBLOK_TOKEN` setzen und `StoryblokProvider` in
  `app/layout.tsx` um die App legen.
- Als Vorschau-URL im Space den lokalen Dev-Server (`npm run dev`) bzw. die
  Preview-Deployment-URL eintragen.

### Wichtig: Rebuild bei Inhaltsänderungen

Da die Seite **statisch** exportiert wird, erscheinen neue Inhalte erst nach
einem erneuten Build/Deploy. Empfehlung: einen **Webhook** in Storyblok
(„Story published") auf einen GitHub-Action-`repository_dispatch` zeigen lassen,
der den Build + Deploy automatisch auslöst.

---

## Bekannte Punkte / To-dos

- [ ] **Storyblok-Space** anlegen und Inhalte gemäß Blueprint pflegen (s. o.).
- [ ] **Rebuild-Webhook** (Storyblok → GitHub Action) für automatische Deploys.
- [ ] **Kontaktformular** versendet noch nicht real (Mock) – Anbindung an einen
      Dienst wie Web3Forms/Formspree oder `mailto:`-Fallback nötig.
- [ ] **Cookie-/Consent-Banner** für extern geladene Inhalte (z. B. Unsplash-Bilder) prüfen.
- [ ] **Rechtstexte** (Impressum/Datenschutz) juristisch final prüfen.
- [ ] `src/imports/` (Figma-Altlasten) aufräumen.
      --test
