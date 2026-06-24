import { motion } from "motion/react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  children?: ReactNode;
  label?: string;
}

export function SectionHeader({ title, subtitle, centered = false, children, label }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className={`mb-16 md:mb-24 ${centered ? "text-center" : ""}`}
    >
      {label && (
        <motion.div
          initial={{ opacity: 0, x: centered ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className={`flex items-center gap-4 mb-6 ${centered ? "justify-center" : ""}`}
        >
          <div className="w-8 h-px bg-accent" />
          <span className="text-xs tracking-[0.3em] text-accent uppercase">{label}</span>
          <div className="w-8 h-px bg-accent" />
        </motion.div>
      )}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl mb-4 tracking-tight"
        >
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`text-lg text-muted-foreground ${centered ? "max-w-xl mx-auto" : "max-w-2xl"}`}
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}
