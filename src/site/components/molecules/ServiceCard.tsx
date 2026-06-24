import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  active?: boolean;
}

export function ServiceCard({ icon: Icon, title, description, index = 0, active = false }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isHovered || active;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full min-h-[220px] p-8 flex flex-col justify-end cursor-default group overflow-hidden bg-card border border-border/50"
    >
      {/* Animated accent fill on hover */}
      <motion.div
        className="absolute inset-0 bg-accent origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Large faded index number */}
      <div className={`absolute top-4 right-6 text-7xl font-[Bebas_Neue] text-border/40 ${isActive ? "text-white/20" : ""} transition-colors duration-500 select-none leading-none`}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10">
        <div className={`mb-6 ${isActive ? "text-white" : ""} transition-colors duration-500`}>
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 className={`text-xl mb-2 ${isActive ? "text-white" : ""} transition-colors duration-500`}>{title}</h3>
        <p className={`text-sm ${isActive ? "text-white/80" : "text-muted-foreground"} transition-colors duration-500`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}