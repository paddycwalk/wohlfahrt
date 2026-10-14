import { motion } from "motion/react";
import { ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealText({ children, delay = 0, className = "" }: RevealTextProps) {
  // Beobachtet wird der aeussere Rahmen, nicht der verschobene Text: der liegt
  // anfangs komplett ausserhalb des Rahmens. Safari meldet ein so
  // weggeschnittenes Element nie als sichtbar – der Text blieb auf dem iPhone
  // dauerhaft unsichtbar. Der Rahmen gibt den Zustand per Variante weiter.
  //
  // Abgeschnitten wird nur unten (dort wartet der Text auf seinen Auftritt).
  // Mit `overflow-hidden` fehlten bei engem Zeilenabstand oben die
  // Umlaut-Punkte ("FÜR" sah aus wie "FŪR").
  return (
    <motion.div
      className={`[clip-path:inset(-50%_-20%_0_-20%)] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        variants={{
          hidden: { y: "100%" },
          visible: {
            y: 0,
            transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
