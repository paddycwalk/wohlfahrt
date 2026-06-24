import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface IconFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function IconFeature({ icon: Icon, title, description, delay = 0 }: IconFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5 group"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-all duration-500">
          <Icon size={18} className="text-accent group-hover:text-white transition-colors duration-500" />
        </div>
      </div>
      <div>
        <h4 className="text-lg mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
