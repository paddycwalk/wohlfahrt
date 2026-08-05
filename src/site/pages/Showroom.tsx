"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { MapEmbed } from "../components/molecules/MapEmbed";
import {
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { asset } from "../lib/asset";
import { sbEditable } from "../lib/editable";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";
import { useSiteSettings } from "@/site/content/SiteSettingsProvider";
import {
  CLOSED_LABEL,
  openingHoursRows,
  type OpeningHoursRow,
} from "@/site/content/site";
import {
  defaultShowroomContent,
  type ShowroomContent,
} from "../content/pages/showroom";

/** Relative Pfade ueber den Base-Path aufloesen, externe URLs unveraendert. */
function resolveImage(src: string): string {
  return src.startsWith("/") ? asset(src) : src;
}

/** Ein Info-Block neben der Karte (Adresse, Oeffnungszeiten, Telefon). */
interface InfoBlock {
  icon: LucideIcon;
  title: string;
  note?: string;
  text?: string;
  /** Oeffnungszeiten als ausgerichtete Zeilen – wie im Footer. */
  rows?: OpeningHoursRow[];
  href?: string;
  external?: boolean;
}

/**
 * Der Inhalt eines Info-Blocks: Oeffnungszeiten als Tag/Zeit-Raster,
 * verlinkte Angaben als `<a>`, alles andere als Absatz.
 */
function InfoBlockBody({ item }: Readonly<{ item: InfoBlock }>) {
  if (item.rows) {
    return (
      <ul className="space-y-1.5 text-sm">
        {item.rows.map((row) => (
          <li
            key={row.day}
            className={`flex gap-3 ${row.closed ? "text-muted-foreground/50" : "text-muted-foreground"}`}
          >
            <span className="w-12 shrink-0">{row.label}</span>
            <span className="tabular-nums">
              {row.closed ? CLOSED_LABEL : row.slots.join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className="text-muted-foreground text-sm hover:text-accent transition-colors whitespace-pre-line"
      >
        {item.text}
      </a>
    );
  }

  return (
    <p className="text-muted-foreground text-sm whitespace-pre-line">
      {item.text}
    </p>
  );
}

export function Showroom({
  content = defaultShowroomContent,
}: {
  content?: ShowroomContent;
}) {
  const s = useSiteSettings();
  const addressText = `${s.legalName}\n${s.street}\n${s.zip} ${s.city}`;
  const openingHours = openingHoursRows(s);

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
            {/* Wie auf dem About-Hero: aufgehelltes Akzentrot, groesser und
                fett – sonst geht der Eyebrow auf dem dunklen Bild unter. */}
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-accent-on-dark md:text-base">
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
                {(
                  [
                    {
                      icon: MapPin,
                      title: "Adresse",
                      text: addressText,
                      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${s.street}, ${s.zip} ${s.city}`,
                      )}`,
                      external: true,
                    },
                    {
                      icon: Clock,
                      title: "Öffnungszeiten",
                      note: s.openingHoursNote,
                      rows: openingHours,
                    },
                    {
                      icon: Phone,
                      title: "Telefon",
                      text: s.phone,
                      href: `tel:${s.phoneHref}`,
                    },
                  ] as InfoBlock[]
                ).map((item, i) => (
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
                      {item.note && (
                        <p className="text-sm text-accent mb-2">{item.note}</p>
                      )}
                      <InfoBlockBody item={item} />
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
              {/* Zwei-Klick-Loesung: Google wird erst nach Einwilligung kontaktiert. */}
              <MapEmbed
                embedUrl={s.mapEmbedUrl}
                address={[s.street, `${s.zip} ${s.city}`]}
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
            <Button
              asChild
              variant="primary"
              className="text-sm flex items-center gap-2 mx-auto"
            >
              <Link to={content.featuresButtonLink}>
                {content.featuresButtonLabel} <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
