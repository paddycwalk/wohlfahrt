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
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
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
    }
  }, [isInView, end, duration, shouldReduceMotion]);

  return (
    <div ref={ref} className="relative">
      <div className="text-6xl md:text-7xl lg:text-8xl font-[Bebas_Neue] leading-none tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-xs tracking-[0.2em] uppercase text-white/60">
        {label}
      </div>
    </div>
  );
}
