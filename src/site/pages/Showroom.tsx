"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { asset } from "../lib/asset";
import { sbEditable } from "../lib/editable";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";
import { useSiteSettings } from "@/site/content/SiteSettingsProvider";
import { formatOpeningHours } from "@/site/content/site";
import {
  defaultShowroomContent,
  type ShowroomContent,
} from "../content/pages/showroom";

/** Relative Pfade ueber den Base-Path aufloesen, externe URLs unveraendert. */
function resolveImage(src: string): string {
  return src.startsWith("/") ? asset(src) : src;
}

export function Showroom({
  content = defaultShowroomContent,
}: {
  content?: ShowroomContent;
}) {
  const s = useSiteSettings();
  const addressText = `${s.legalName}\n${s.street}\n${s.zip} ${s.city}`;
  const openingHoursText = formatOpeningHours(s).join("\n");

  return (
    <div className="overflow-hidden" {...sbEditable(content.editable)}>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolveImage(content.heroImage)}
            alt="Wohlfahrt & Wohlfahrt Ausstellung"
            className="w-full h-full object-cover"
            priority
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-24">
          <RevealText>
            <p className="text-xs tracking-[0.4em] text-accent uppercase mb-4 text-[#ffffff]">
              {content.heroEyebrow}
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-white tracking-tight">
              {content.heroTitle}
            </h1>
          </RevealText>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                label={content.infoLabel}
                title={content.infoTitle}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                {content.infoParagraph1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-12"
              >
                {content.infoParagraph2}
              </motion.p>

              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: "Adresse",
                    text: addressText,
                  },
                  {
                    icon: Clock,
                    title: "Öffnungszeiten",
                    text: openingHoursText,
                  },
                  { icon: Phone, title: "Telefon", text: s.phone },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex gap-5 group"
                  >
                    <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm tracking-[0.15em] uppercase text-accent mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm whitespace-pre-line">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 h-[500px] lg:h-[600px]"
            >
              <iframe
                src={s.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features — Bordered Grid */}
      <section className="py-24 md:py-40 bg-primary text-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            label={content.featuresLabel}
            title={content.featuresTitle}
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 mt-16">
            {content.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`p-10 md:p-12 group hover:bg-accent transition-all duration-500 cursor-default ${index < 2 ? "md:border-r border-white/10" : ""}`}
                {...sbEditable(feature.editable)}
              >
                <span className="text-5xl font-[Bebas_Neue] text-accent/40 group-hover:text-white/30 transition-colors leading-none block mb-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 group-hover:text-white/80 transition-colors text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to={content.featuresButtonLink}>
              <Button
                variant="primary"
                className="text-sm flex items-center gap-2 mx-auto"
              >
                {content.featuresButtonLabel} <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
