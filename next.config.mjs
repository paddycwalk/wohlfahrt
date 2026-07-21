/** @type {import('next').NextConfig} */
// Hosting auf Vercel (SSR/ISR). Der Server rendert Inhalte pro Anfrage bzw.
// per Incremental Static Regeneration – dadurch sind der Storyblok Visual
// Editor (Draft-Vorschau) und "Veroeffentlichen -> kurz danach live" moeglich.
const nextConfig = {
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
};

export default nextConfig;
