/** @type {import('next').NextConfig} */
// Unterpfad fuer GitHub Pages (z. B. "/wohlfahrt"). Auf dem eigenen FTP-Server
// (Root-Hosting) bleibt die Variable leer -> kein Praefix.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Statischer Export -> erzeugt einen `out/`-Ordner, der per FTP hochladbar ist
  output: "export",
  // Pflicht fuer statischen Export: kein Next-Image-Optimierungsserver
  images: { unoptimized: true },
  // Erzeugt pro Route /pfad/index.html -> funktioniert ohne Server-Rewrites auf FTP
  trailingSlash: true,
  // Unterpfad-Hosting (GitHub Pages). Leer => Root-Hosting (FTP).
  basePath,
  assetPrefix: basePath || undefined,
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
