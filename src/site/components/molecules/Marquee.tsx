import { motion } from "motion/react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
}

export function Marquee({ items, speed = 20, separator = "—", className = "" }: MarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: [0, `-50%`] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="inline-flex"
      >
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4">{content}</span>
      </motion.div>
    </div>
  );
}
