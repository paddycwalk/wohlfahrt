/** @type {import('next').NextConfig} */
// Hosting auf Vercel (SSR/ISR). Der Server rendert Inhalte pro Anfrage bzw.
// per Incremental Static Regeneration – dadurch sind der Storyblok Visual
// Editor (Draft-Vorschau) und "Veroeffentlichen -> kurz danach live" moeglich.
const nextConfig = {
  // Eigenstaendiges Server-Bundle nach .next/standalone: Next kopiert dorthin
  // den Server und nur die tatsaechlich benoetigten node_modules. Damit wird
  // auf dem Zielserver weder "npm install" noch ein Build gebraucht – wichtig,
  // weil der Strato-VPS mit 1,8 GB RAM einen Next-Build nicht durchhaelt.
  // Gebaut wird lokal, hochgeladen wird nur das Ergebnis.
  output: "standalone",
  // Bilder nicht ueber den Next-Optimierungsserver leiten (u. a. externe
  // Storyblok-Assets werden direkt ausgeliefert).
  images: { unoptimized: true },
  // Pro Route ein abschliessender Slash (/kontakt/) – konsistent mit Sitemap
  // und Canonical-URLs.
  trailingSlash: true,
  // Turbopack (Next 16 Standard): react-router-Aufrufe (Link, useLocation, ...)
  // auf die Next-Kompatibilitaetsschicht umleiten. Pfad relativ zum Projekt-Root.
  turbopack: {
    resolveAlias: {
      "react-router": "./src/site/lib/react-router-shim.tsx",
    },
  },
  // Storyblok haengt im Visual Editor den full_slug der Story an die Preview-URL
  // an. Die Startseite hat den Slug "home" -> Editor laedt /home. Da unsere
  // Startseite aber auf "/" liegt, liefern wir /home intern die Wurzel aus.
  async rewrites() {
    return [
      { source: "/home", destination: "/" },
      { source: "/home/", destination: "/" },
    ];
  },
  // Dauerhafte Weiterleitungen der alten WordPress-Seite.
  //
  // Beim Domain-Umzug wuerden diese URLs sonst auf 404 laufen und ihre bei
  // Google aufgebaute Bewertung verlieren. Die Altseite betreibt zwei
  // Sitemaps parallel: die von Jetpack (sitemap-1.xml, Seiten und Beitraege)
  // und die von Yoast (sitemap_index.xml, zusaetzlich Kategorie-, Autoren-,
  // Ticker- und Anhangseiten). Beide sind hier ausgewertet.
  //
  // Alle uebrigen Alt-URLs (/ueber-uns/, /aktuelles/, /impressum/,
  // /datenschutz/, /kontakt/, /karriere/, /ausstellung/, /produkte/,
  // /referenzen/) sind identisch geblieben und brauchen keinen Eintrag.
  async redirects() {
    const map = {
      "/disclaimer": "/haftungsausschluss/",
      "/unsere-leistungen": "/leistungen/",
      "/cookie-policy": "/datenschutz/",
      // "Wir suchen Verstaerkung" – Stellenanzeige der Altseite.
      "/1292-2": "/karriere/",
      "/sonderangebote_feinsteinzeugfliesen_2": "/produkte/",
      "/sonderangebote_terassenplatten": "/produkte/",
      "/feinsteinzeug-30x60-2": "/produkte/",
      // Archivseiten von WordPress (Kategorie, Autor, Ditty-News-Ticker). Auf
      // der neuen Seite gibt es dafuer keine Entsprechung. Erst die konkret
      // indexierten URLs – die treffen exakt und landen ohne angehaengten
      // Query-Parameter am Ziel –, danach ein Platzhalter, der auch die
      // paginierten Archive (/category/allgemein/page/2/) einsammelt.
      "/category/allgemein": "/aktuelles/",
      "/category/sonderangebote": "/aktuelles/",
      "/author/uwuvowo2015": "/ueber-uns/",
      "/ticker/546": "/aktuelles/",
      "/ticker/626": "/aktuelles/",
      "/ticker/angebote": "/aktuelles/",
      "/ticker/testticker": "/aktuelles/",
      "/category/:path*": "/aktuelles/",
      "/author/:path*": "/ueber-uns/",
      "/ticker/:path*": "/aktuelles/",
      // WordPress legte fuer jedes hochgeladene Bild eine eigene Anhangseite
      // an. Vier davon stehen in der Yoast-Sitemap und sind damit indexiert.
      "/aktuelles/dscf0079-2": "/aktuelles/",
      "/ausstellung/dscf0085": "/ausstellung/",
      "/sonderangebote_terassenplatten/img_4122": "/produkte/",
      "/feinsteinzeug-30x60-2/image001": "/produkte/",
    };
    return Object.entries(map).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  // Sicherheits-Header fuer alle Antworten.
  //
  // Bewusst KEIN X-Frame-Options und keine vollstaendige CSP: der Storyblok
  // Visual Editor laedt die Seite in einem iframe von app.storyblok.com, und
  // eine script-src-Direktive wuerde an den inline gerenderten JSON-LD- und
  // @font-face-Bloecken scheitern. `frame-ancestors` deckt den Clickjacking-
  // Schutz ab und laesst den Editor gezielt durch.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.storyblok.com",
          },
          // Ohne `includeSubDomains`/`preload`: das waere eine Zusage fuer
          // saemtliche (auch kuenftige) Subdomains der Kundendomain.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
