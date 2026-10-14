import { useInView, useReducedMotion } from "motion/react";
import { useRef, useEffect, useState } from "react";

interface StatsCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
}

export function StatsCounter({
  end,
  duration = 2,
  suffix = "",
  label,
}: StatsCounterProps) {
  // Startwert ist der ENDwert: so steht die echte Zahl im Server-HTML – fuer
  // Crawler, KI-Suchen und ohne JavaScript. Erst im Browser wird sie fuer die
  // Hochzaehl-Animation auf 0 gesetzt (siehe unten).
  const [count, setCount] = useState(end);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  // Nach der Hydrierung auf 0 setzen, damit der Zaehler beim Hineinscrollen
  // hochzaehlen kann. Die Zahlen liegen unter dem bildschirmfuellenden Hero –
  // der Wechsel passiert also, bevor sie zu sehen sind.
  useEffect(() => {
    if (!shouldReduceMotion) setCount(0);
    // Nur einmal nach dem Mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(end);
      return;
    }
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration, shouldReduceMotion]);

  return (
    <div ref={ref} className="relative">
      {/* Die laufende Zahl ist reine Optik; vorgelesen wird nur der Endwert. */}
      <div
        aria-hidden="true"
        // Fluessig skaliert: auf schmalen Handys stehen drei Spalten mit je
        // knapp 100px nebeneinander, ein festes text-6xl ("1000+") lief dort
        // in die Nachbarspalte.
        className="text-[clamp(2rem,10.5vw,3.75rem)] md:text-7xl lg:text-8xl font-[Bebas_Neue] leading-none tracking-tight whitespace-nowrap"
      >
        {count}
        {suffix}
      </div>
      <span className="sr-only">
        {end}
        {suffix}
      </span>
      {/* Lange Einzelwoerter ("Fliesenmuster") trennt der Browser auf dem
          Handy (lang="de") nur als Notloesung unter ~360px; darueber passen sie
          dank enger Laufweite in die Spalte. */}
      <div className="mt-2 text-[10px] sm:text-xs tracking-[0.02em] sm:tracking-[0.2em] uppercase text-white/60 hyphens-auto break-words">
        {label}
      </div>
    </div>
  );
}
