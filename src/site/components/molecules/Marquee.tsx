import { motion, useReducedMotion } from "motion/react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
}

export function Marquee({
  items,
  speed = 20,
  separator = "—",
  className = "",
}: MarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: [0, `-50%`] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { repeat: Infinity, duration: speed, ease: "linear" }
        }
        className="inline-flex"
      >
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4">{content}</span>
      </motion.div>
    </div>
  );
}
