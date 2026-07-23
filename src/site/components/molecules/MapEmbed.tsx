"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../atoms/Button";
import { asset } from "../../lib/asset";

const CONSENT_KEY = "ww-maps-consent";

interface MapEmbedProps {
  /** Google-Maps-Embed-URL (wird erst nach Einwilligung geladen). */
  embedUrl: string;
  /** Titel fuer das iframe (Barrierefreiheit). */
  title?: string;
  /** Adresszeilen fuer die Vorschau (z. B. ["Hinterer Spielbach 4", "72793 Pfullingen"]). */
  address?: string[];
  /** Direktlink „In Google Maps oeffnen" (Alternative ohne Einbettung). */
  mapsLink?: string;
  /** Lokales Vorschaubild der Karte (kein Google-Kontakt). */
  previewImage?: string;
}

/**
 * Datenschutzkonforme Google-Maps-Einbindung (2-Klick-Loesung).
 *
 * Solange keine Einwilligung vorliegt, wird KEINE Verbindung zu Google
 * aufgebaut. Stattdessen zeigt die Komponente eine stilisierte, lokal
 * gerenderte Karten-Vorschau. Erst nach aktivem Klick auf „Karte anzeigen"
 * wird das echte iframe geladen. Die Einwilligung kann optional im
 * localStorage gemerkt werden.
 */
export function MapEmbed({
  embedUrl,
  title = "Google Maps",
  address,
  mapsLink,
  previewImage = asset("/assets/standort-karte.jpg"),
}: Readonly<MapEmbedProps>) {
  const [consented, setConsented] = useState(false);
  const [remember, setRemember] = useState(true);

  // Gespeicherte Einwilligung erst nach dem Mount lesen (kein SSR-Mismatch).
  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === "true") setConsented(true);
    } catch {
      /* localStorage nicht verfuegbar – ignorieren */
    }
  }, []);

  function loadMap() {
    if (remember) {
      try {
        localStorage.setItem(CONSENT_KEY, "true");
      } catch {
        /* ignorieren */
      }
    }
    setConsented(true);
  }

  const derivedMapsLink =
    mapsLink ??
    (address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          address.join(", "),
        )}`
      : undefined);

  return (
    <div className="relative h-full w-full overflow-hidden bg-secondary">
      <AnimatePresence mode="wait">
        {consented ? (
          <motion.iframe
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <motion.div
            key="consent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {/* Lokales Kartenbild als Vorschau (kein Google-Kontakt) */}
            <img
              src={previewImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Farbverlauf fuer besseren Kontrast zur Karte */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-primary/10" />

            {/* Einwilligungs-Karte */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[260px] border border-white/10 bg-background/95 p-5 text-center shadow-2xl backdrop-blur-md md:max-w-[300px] md:p-6"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center bg-accent">
                  <MapPin
                    className="h-5 w-5 text-accent-foreground"
                    strokeWidth={1.5}
                  />
                </div>

                <p className="mb-1.5 text-[11px] uppercase tracking-[0.3em] text-accent">
                  Standort
                </p>
                <h3 className="mb-2.5 text-xl text-foreground">Karte ansehen</h3>

                {address && address.length > 0 && (
                  <p className="mb-2.5 whitespace-pre-line text-sm text-muted-foreground">
                    {address.join("\n")}
                  </p>
                )}

                <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                  Beim Laden der Karte werden Daten an Google übertragen und
                  Cookies gesetzt. Mehr dazu in unserer{" "}
                  <Link
                    to="/datenschutz"
                    className="text-accent underline underline-offset-2 hover:opacity-80"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>

                <Button variant="primary" onClick={loadMap} className="w-full">
                  Karte anzeigen
                </Button>

                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 text-[11px] text-muted-foreground select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-3.5 w-3.5 accent-accent"
                  />
                  <span>Auswahl für diesen Browser merken</span>
                </label>

                {derivedMapsLink && (
                  <a
                    href={derivedMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-foreground transition-colors hover:text-accent"
                  >
                    Stattdessen in Google Maps öffnen
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
