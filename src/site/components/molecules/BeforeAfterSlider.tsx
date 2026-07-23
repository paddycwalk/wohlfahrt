"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  /** Traditionelles Bild (wird von links eingeblendet). */
  beforeImage: string;
  /** Modernes Bild (Basisebene, rechts sichtbar). */
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Startposition des Reglers in Prozent (0–100). */
  initial?: number;
}

/**
 * Vorher/Nachher-Vergleich mit ziehbarem Regler.
 * Links das traditionelle, rechts das moderne Bild – die Trennlinie laesst
 * sich per Maus, Touch oder Pfeiltasten verschieben.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "",
  afterAlt = "",
  beforeLabel = "Traditionell",
  afterLabel = "Modern",
  initial = 50,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) updateFromClientX(e.clientX);
  };
  const endDrag = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`absolute inset-0 overflow-hidden select-none touch-pan-y ${
        dragging ? "cursor-grabbing" : "cursor-ew-resize"
      }`}
    >
      {/* Basisebene: modern (rechte Seite) */}
      <img
        src={afterImage}
        alt={afterAlt}
        draggable={false}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Overlay: traditionell (links, per clip-path beschnitten) */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        draggable={false}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Labels */}
      <span
        className="pointer-events-none absolute bottom-4 left-4 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 transition-opacity duration-300"
        style={{ opacity: pos > 12 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute bottom-4 right-4 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 transition-opacity duration-300"
        style={{ opacity: pos < 88 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      {/* Trennlinie */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      />

      {/* Griff */}
      <button
        type="button"
        role="slider"
        aria-label="Vergleich traditionell/modern verschieben"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% traditionell`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 grid place-items-center w-11 h-11 rounded-full bg-white text-primary shadow-lg cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
      >
        <MoveHorizontal size={20} />
      </button>
    </div>
  );
}
