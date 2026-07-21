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
  // Figma-Make-generierter shadcn/ui-Code wird nicht typgeprueft (Boilerplate)
  typescript: { ignoreBuildErrors: true },
  // Turbopack (Next 16 Standard): react-router-Aufrufe (Link, useLocation, ...)
  // auf die Next-Kompatibilitaetsschicht umleiten. Pfad relativ zum Projekt-Root.
  turbopack: {
    resolveAlias: {
      "react-router": "./src/site/lib/react-router-shim.tsx",
    },
  },
};

export default nextConfig;
