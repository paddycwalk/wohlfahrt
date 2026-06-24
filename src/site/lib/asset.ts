/**
 * Praefixiert oeffentliche Asset-Pfade (aus `public/`) mit dem optionalen
 * Base-Path. Noetig fuer Unterpfad-Hosting wie GitHub Pages (`/wohlfahrt/...`),
 * waehrend Root-Hosting (FTP) ohne Praefix funktioniert.
 *
 * Beispiel: asset("/logo.webp") -> "/wohlfahrt/logo.webp" (Pages) bzw.
 * "/logo.webp" (FTP).
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
