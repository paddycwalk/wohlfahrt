import React, { useState } from "react";
import {
  croppedSize,
  intrinsicSize,
  storyblokFallbackSrc,
  storyblokObjectPosition,
  storyblokSrcSet,
  stripFocus,
} from "@/site/lib/image";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Fuer das LCP-Bild (Above-the-fold): laedt sofort und mit hoher Prioritaet. */
  priority?: boolean;
  /**
   * Anzeigebreite als CSS-`sizes`-Angabe, damit der Browser die passende
   * `srcset`-Stufe waehlen kann – z. B. `"(min-width: 1024px) 25vw, 50vw"`
   * fuer eine vierspaltige Kachel. Ohne Angabe nimmt der Browser `100vw` an
   * und laedt damit systematisch zu grosse Varianten.
   */
  sizes?: string;
  /** WebP-Qualitaet der skalierten Varianten (Standard 75). */
  quality?: number;
  /**
   * Seitenverhaeltnis des Anzeigerahmens als Breite/Hoehe – z. B. `4 / 5` fuer
   * ein `aspect-[4/5]`-Kaestchen.
   *
   * Nur setzen, wenn das Bild per `object-cover` in einen Rahmen mit FESTEM
   * Verhaeltnis gelegt wird. Dann schneidet Storyblok serverseitig mittig auf
   * genau dieses Verhaeltnis zu – identisch zu dem, was `object-cover` im
   * Browser macht, nur ohne Hochskalieren und ohne Bytes fuer die
   * weggeschnittenen Bereiche.
   *
   * Ohne diese Angabe beschreibt `sizes` nur die Rahmenbreite, der Browser
   * skaliert die gelieferte Datei aber auf Deckung hoch: eine 2200x1362-Quelle
   * in einer 4:5-Kachel wird 1,7x hochskaliert und sieht unscharf aus.
   */
  aspect?: number;
  /**
   * Bild unveraendert ausliefern, ohne `srcset`.
   *
   * Fuer Assets, die bereits klein und handoptimiert sind – dort kostet die
   * Neukodierung durch den Image Service mehr, als sie spart. Gemessen am
   * Logo (270x49): Original 2.120 B, `/m/320x0` 4.278 B, `/m/480x0` 8.338 B.
   */
  unoptimized?: boolean;
}

/**
 * Bild mit Platzhalter bei Ladefehlern – und zentraler Ort der
 * Storyblok-Bildoptimierung.
 *
 * Alle Bilder der Seite laufen durch diese Komponente, deshalb entstehen
 * `srcset` und `width`/`height` hier automatisch (siehe `@/site/lib/image`):
 *
 * - `srcset` laesst den Browser die kleinste ausreichende Variante laden.
 *   Ein 2200px-Cover in einer 340px-Kachel geht so von ~700 KB auf ~55 KB.
 * - `width`/`height` stammen aus der Storyblok-URL und reservieren den Platz
 *   vor dem Laden (kein Layout-Shift). CSS-Klassen ueberschreiben sie wie
 *   gewohnt – sie wirken dann nur noch als Seitenverhaeltnis-Angabe.
 *
 * Nicht-Storyblok-Quellen (z. B. data:-URIs) werden unveraendert durchgereicht.
 */
export function ImageWithFallback({
  priority = false,
  sizes,
  quality,
  aspect,
  unoptimized = false,
  ...props
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const {
    src,
    alt,
    style,
    className,
    srcSet: srcSetProp,
    width: widthProp,
    height: heightProp,
    ...rest
  } = props;

  const srcString = typeof src === "string" ? src : undefined;
  // Explizit uebergebene Werte gewinnen immer gegen die Automatik.
  const srcSet =
    srcSetProp ??
    (unoptimized ? undefined : storyblokSrcSet(srcString, quality, aspect));
  const resolvedSrc = srcSet
    ? (storyblokFallbackSrc(srcString, quality, aspect) ??
      stripFocus(srcString) ??
      src)
    : (stripFocus(srcString) ?? src);
  // Bei Zuschnitt gilt das Zielverhaeltnis, sonst die Originalmasse.
  const natural = aspect
    ? croppedSize(srcString, aspect)
    : intrinsicSize(srcString);
  const width = widthProp ?? natural?.width;
  const height = heightProp ?? natural?.height;
  // Fokuspunkt nur nötig, wenn NICHT serverseitig zugeschnitten wird (bei
  // `aspect` erledigt der `focal`-Filter das bereits). Inline-Style gewinnt
  // gegen object-position-Klassen wie `object-top`.
  const objectPosition = aspect
    ? undefined
    : storyblokObjectPosition(srcString);
  const resolvedStyle = objectPosition ? { ...style, objectPosition } : style;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={resolvedSrc}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? "100vw") : undefined}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={resolvedStyle}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      {...rest}
      onError={handleError}
    />
  );
}
