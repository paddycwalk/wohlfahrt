import { motion } from "motion/react";
import { ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealText({ children, delay = 0, className = "" }: RevealTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
