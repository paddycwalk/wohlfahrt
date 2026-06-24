import { motion } from "motion/react";
import { ReactNode } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface SplitImageCardProps {
  image: string;
  title: string;
  children: ReactNode;
  reverse?: boolean;
  imageAlt?: string;
}

export function SplitImageCard({
  image,
  title,
  children,
  reverse = false,
  imageAlt = "",
}: SplitImageCardProps) {
  return (
    <section className="relative">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[80vh]`}
      >
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`relative overflow-hidden ${reverse ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}`}
        >
          <ImageWithFallback
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover absolute inset-0"
            width={1600}
            height={1200}
          />
          {/* Subtle grain overlay */}
          <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
        </motion.div>

        {/* Content Side */}
        <div
          className={`flex items-center ${reverse ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-8 lg:p-16 xl:p-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-accent" />
              <span className="text-xs tracking-[0.3em] text-accent uppercase">
                Wohlfahrt & Wohlfahrt
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl mb-8 tracking-tight">
              {title}
            </h3>
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
