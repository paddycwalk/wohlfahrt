/**
 * Storyblok Image Service
 * =======================
 *
 * Storyblok kann Assets serverseitig skalieren – gesteuert per URL-Suffix:
 *
 *   <asset-url>/m/600x0/filters:quality(75)
 *              └─┬─┘ └─┬─┘ └────────┬─────┘
 *                │     │            └ Kompression (Standard des Service: 80)
 *                │     └ Zielbreite x Zielhoehe ("0" = proportional)
 *                └ aktiviert den Image Service
 *
 * Das passiert auf Storyblok-Seite und ist CDN-gecacht – deshalb laufen die
 * Bilder bewusst NICHT ueber den Next-Optimizer (`images.unoptimized = true`
 * in next.config.mjs). Sonst wuerden ~340 Assets durch Vercel geproxied und
 * das dortige Bildkontingent belasten, obwohl Storyblok dasselbe gratis kann.
 *
 * Ohne diese Transformation liefert die Seite die Originale aus – bis zu
 * 2200x2200 und ~900 KB pro Datei, fuer teils 340px breite Raster-Kacheln.
 */

/** Nur Assets von diesem Host versteht der Image Service. */
const STORYBLOK_HOST = "a.storyblok.com";

/**
 * Breiten-Stufen fuer das `srcset`. Bewusst grob gestaffelt: jede Stufe ist
 * eine eigene Datei im Storyblok-Cache, zu viele Stufen streuen die Cache-Hits.
 *
 * Die 1200er-Stufe sieht unmotiviert aus, ist aber gemessen: gaengige Handys
 * landen mit CSS-Breite x DPR knapp UEBER 1080 (412x2.625 = 1081, 390x3 = 1170)
 * und wuerden sonst auf 1440w springen. Beim Hero der Startseite sind das
 * 175 KB statt 246 KB.
 */
const WIDTH_STEPS: number[] = [320, 480, 640, 828, 1080, 1200, 1440, 1920];

/** Kompression fuer skalierte Varianten (75 ist bei Fotos visuell unauffaellig). */
const DEFAULT_QUALITY = 75;

/** Ist das ein Storyblok-Asset, das der Image Service transformieren kann? */
export function isStoryblokAsset(url: string | undefined): boolean {
  return typeof url === "string" && url.includes(STORYBLOK_HOST);
}

/**
 * Liest die Originalmasse aus dem Asset-Pfad.
 *
 * Storyblok kodiert sie in der URL: `/f/<space>/<breite>x<hoehe>/<hash>/<name>`.
 * Damit lassen sich `width`/`height` am `<img>` setzen – der Browser kennt das
 * Seitenverhaeltnis dann vor dem Laden und reserviert den Platz (kein CLS).
 *
 * Aeltere Uploads haben keine Masse im Pfad (hier 33 von 340) – dann `null`.
 */
export function intrinsicSize(
  url: string | undefined,
): { width: number; height: number } | null {
  if (!isStoryblokAsset(url)) return null;
  const m = /\/f\/\d+\/(\d+)x(\d+)\//.exec(url as string);
  if (!m) return null;
  const width = Number(m[1]);
  const height = Number(m[2]);
  return width > 0 && height > 0 ? { width, height } : null;
}

/**
 * Eine einzelne Variante.
 *
 * Ohne `aspect` wird proportional auf `width` skaliert (`<breite>x0`). Mit
 * `aspect` (= Breite/Hoehe) schneidet der Image Service zusaetzlich mittig auf
 * genau dieses Verhaeltnis zu – siehe `storyblokSrcSet`.
 */
export function storyblokVariant(
  url: string,
  width: number,
  quality: number = DEFAULT_QUALITY,
  aspect?: number,
): string {
  const height = aspect ? Math.round(width / aspect) : 0;
  return `${url}/m/${width}x${height}/filters:quality(${quality})`;
}

/**
 * Groesste Breite, die sich aus dem Original ohne Hochskalieren holen laesst.
 *
 * Ohne Zuschnitt ist das die Originalbreite. Mit Zuschnitt begrenzt bei
 * querformatigen Quellen die *Hoehe* das Ergebnis: aus 2200x1362 laesst sich
 * im Verhaeltnis 4:5 maximal 1362 * 0,8 = 1089 px Breite schneiden.
 */
function maxUsableWidth(
  size: { width: number; height: number },
  aspect?: number,
): number {
  if (!aspect) return size.width;
  return Math.min(size.width, Math.floor(size.height * aspect));
}

/**
 * Baut das `srcset` ueber die Breiten-Stufen.
 *
 * Stufen oberhalb der nutzbaren Originalbreite werden verworfen – der Image
 * Service skaliert nicht hoch, sie waeren nur Duplikate derselben Datei. Ist
 * die Originalgroesse unbekannt, werden alle Stufen angeboten.
 *
 * `aspect` (Breite/Hoehe) ist wichtig, wenn das Bild per CSS `object-cover` in
 * einen Rahmen mit festem Verhaeltnis gelegt wird: dann beschreibt `sizes` nur
 * die Rahmenbreite, der Browser skaliert aber auf *Deckung* hoch. Bei einer
 * 2200x1362-Quelle in einer 4:5-Kachel sind das 1,7x – sichtbar unscharf.
 * Mit `aspect` liefert Storyblok den Zuschnitt direkt passend, dadurch ist
 * `sizes` wieder korrekt und es entsteht kein Hochskalieren.
 *
 * Gibt `undefined` zurueck, wenn es nichts zu transformieren gibt (Fremd-URL,
 * data:-URI) – der Aufrufer faellt dann auf das nackte `src` zurueck.
 */
export function storyblokSrcSet(
  url: string | undefined,
  quality: number = DEFAULT_QUALITY,
  aspect?: number,
): string | undefined {
  if (!isStoryblokAsset(url)) return undefined;
  const src = url as string;
  const size = intrinsicSize(src);
  const usable = size ? maxUsableWidth(size, aspect) : undefined;

  // Ist das Original schon kleiner als die kleinste Stufe, gibt es nichts zu
  // gewinnen – eine Neukodierung kann die Datei sogar vergroessern (siehe
  // `unoptimized` in ImageWithFallback).
  if (usable && usable <= WIDTH_STEPS[0]) return undefined;

  const steps = usable
    ? WIDTH_STEPS.filter((w) => w < usable).concat(usable)
    : [...WIDTH_STEPS];
  if (steps.length === 0) return undefined;

  return steps
    .map((w) => `${storyblokVariant(src, w, quality, aspect)} ${w}w`)
    .join(", ");
}

/**
 * Fallback-`src` fuer Browser ohne `srcset`-Unterstuetzung und – wichtiger –
 * die Variante, die bei fehlendem `sizes` als Basis dient. Absichtlich eine
 * mittlere Stufe statt des Originals.
 */
export function storyblokFallbackSrc(
  url: string | undefined,
  quality: number = DEFAULT_QUALITY,
  aspect?: number,
): string | undefined {
  if (!isStoryblokAsset(url)) return undefined;
  const src = url as string;
  const size = intrinsicSize(src);
  const usable = size ? maxUsableWidth(size, aspect) : undefined;
  const width = usable ? Math.min(1080, usable) : 1080;
  return storyblokVariant(src, width, quality, aspect);
}

/**
 * Zielgroesse eines zugeschnittenen Bildes fuer `width`/`height` am `<img>`.
 * Nur relevant, damit der Browser das Seitenverhaeltnis vorab kennt (kein CLS).
 */
export function croppedSize(
  url: string | undefined,
  aspect: number,
): { width: number; height: number } | null {
  const size = intrinsicSize(url);
  if (!size) return null;
  const width = maxUsableWidth(size, aspect);
  return { width, height: Math.round(width / aspect) };
}

/**
 * Fertige `<img>`-Attribute fuer die Stellen, die bewusst ein rohes `<img>`
 * verwenden statt `ImageWithFallback` – etwa weil sie `clip-path`, `draggable`
 * oder eine exakte absolute Positionierung brauchen, mit der der
 * Fehler-Platzhalter der Komponente kollidieren wuerde.
 *
 * Ist die Quelle kein Storyblok-Asset, kommt nur `{ src }` zurueck.
 */
export function storyblokImgProps(
  url: string | undefined,
  sizes: string,
  quality: number = DEFAULT_QUALITY,
  aspect?: number,
): { src: string | undefined; srcSet?: string; sizes?: string } {
  const srcSet = storyblokSrcSet(url, quality, aspect);
  if (!srcSet) return { src: url };
  return {
    src: storyblokFallbackSrc(url, quality, aspect) ?? url,
    srcSet,
    sizes,
  };
}
