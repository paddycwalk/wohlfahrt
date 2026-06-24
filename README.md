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

## Statischer Build & FTP-Upload

```bash
npm run build
```

Erzeugt den Ordner `out/` mit fertigem HTML, CSS, JS und allen Assets.
Dank `trailingSlash: true` bekommt jede Route ihren eigenen Ordner mit
`index.html` – dadurch funktionieren URLs wie `/kontakt/` **ohne** Server-Rewrites.

**Upload:** Den **Inhalt** von `out/` (nicht den Ordner selbst) in das Web-Root
des Hosters laden (meist `public_html/`, `htdocs/` oder `www/`):

```
out/index.html        →  public_html/index.html
out/kontakt/          →  public_html/kontakt/
out/_next/            →  public_html/_next/
out/fonts/ …          →  public_html/fonts/ …
```

> ⚠️ Alle Pfade sind absolut ab dem Domain-Root (beginnen mit `/`). Die Seite muss
> daher direkt unter der Domain liegen (`https://domain.de/`), **nicht** in einem
> Unterordner. Für ein Unterverzeichnis müsste in `next.config.mjs` `basePath`
> gesetzt werden.

Vor dem Upload lokal testen:

```bash
npm run preview   # http://localhost:3000
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

| Was                       | Wo                                       |
| ------------------------- | ---------------------------------------- |
| Domain, Titel, Meta-Texte | `src/site/config/seo.ts`                 |
| Strukturdaten / Kontakt   | `app/layout.tsx` (`jsonLd`)              |
| Farben / Theme            | `src/styles/theme.css`                   |
| Schriften                 | `src/styles/fonts.css` + `public/fonts/` |
| Static-Export-Optionen    | `next.config.mjs`                        |

---

## Bekannte Punkte / To-dos

- [ ] **Kontaktformular** versendet noch nicht real (Mock) – Anbindung an einen
      Dienst wie Web3Forms/Formspree oder `mailto:`-Fallback nötig.
- [ ] **Cookie-/Consent-Banner** für extern geladene Inhalte (z. B. Unsplash-Bilder) prüfen.
- [ ] **Rechtstexte** (Impressum/Datenschutz) juristisch final prüfen.
- [ ] `src/imports/` (Figma-Altlasten) aufräumen.
