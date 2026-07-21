import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  /** Optionale, aussagekraeftige Bildbeschreibungen (gleiche Reihenfolge wie images). */
  alts?: string[];
}

export function GalleryModal({
  images,
  currentIndex,
  onClose,
  alts,
}: GalleryModalProps) {
  const [index, setIndex] = useState(currentIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Body-Scroll sperren, solange das Modal offen ist
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Tastatursteuerung: Escape schliesst, Pfeiltasten navigieren, Tab bleibt im Dialog
  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Alle Galeriebilder vorab laden (Nachbarn zuerst), damit Wischen/Blaettern
  // sofort erscheint statt bei jedem Wechsel neu vom CDN zu laden. Der
  // Image().src-Aufruf fuellt den HTTP-Cache – eine JS-Referenz ist nicht noetig.
  useEffect(() => {
    const seen = new Set<number>();
    const preload = (i: number) => {
      const n = ((i % images.length) + images.length) % images.length;
      if (seen.has(n)) return;
      seen.add(n);
      const img = new Image();
      img.decoding = "async";
      img.src = images[n];
    };
    preload(currentIndex);
    for (let d = 1; d < images.length; d++) {
      preload(currentIndex + d);
      preload(currentIndex - d);
    }
  }, [images, currentIndex]);

  const currentAlt =
    alts?.[index] ?? `Galeriebild ${index + 1} von ${images.length}`;

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Bildergalerie"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Galerie schließen"
          className="absolute top-4 right-4 text-white cursor-pointer hover:text-accent transition-colors z-10"
        >
          <X size={32} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Vorheriges Bild"
          className="absolute left-4 text-white cursor-pointer hover:text-accent transition-colors"
        >
          <ChevronLeft size={48} />
        </button>

        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={images[index]}
          alt={currentAlt}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          drag={images.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_e, info) => {
            // Wischen: nach links -> naechstes Bild, nach rechts -> vorheriges.
            if (info.offset.x < -80 || info.velocity.x < -500) handleNext();
            else if (info.offset.x > 80 || info.velocity.x > 500) handlePrev();
          }}
          className="max-h-[90vh] max-w-[90vw] object-contain touch-pan-y select-none cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Nächstes Bild"
          className="absolute right-4 text-white cursor-pointer hover:text-accent transition-colors"
        >
          <ChevronRight size={48} />
        </button>

        <div className="absolute bottom-4 text-white" aria-live="polite">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
