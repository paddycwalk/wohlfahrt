"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import {
  Users,
  Award,
  Heart,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { asset } from "../lib/asset";
import {
  defaultAboutContent,
  type AboutContent,
  type ValueIcon,
} from "../content/pages/about";
import { sbEditable } from "../lib/editable";

const valueIcons: Record<ValueIcon, typeof Award> = {
  award: Award,
  users: Users,
  heart: Heart,
  shieldCheck: ShieldCheck,
  trendingUp: TrendingUp,
  zap: Zap,
};

/** Relative Pfade ueber den Base-Path aufloesen, externe URLs unveraendert. */
function resolveImage(src: string): string {
  return src.startsWith("/") ? asset(src) : src;
}

export function About({
  content = defaultAboutContent,
}: {
  content?: AboutContent;
}) {
  const values = content.values.map((v) => ({
    ...v,
    Icon: valueIcons[v.icon] ?? Award,
  }));
  const timeline = content.timeline;

  return (
    <div className="overflow-hidden" {...sbEditable(content.editable)}>
      {/* Hero — Typographic */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={resolveImage(content.heroImage)}
            alt={content.heroImageAlt}
            className="w-full h-full object-cover object-top"
            priority
            width={1204}
            height={785}
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
              {content.heroTitleLine1}
              <br />
              {content.heroTitleLine2}
            </h1>
          </RevealText>
        </div>
      </section>

      {/* Story — Editorial Two Column */}
      <section className="pt-16 md:pt-20 pb-24 md:pb-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <SectionHeader
                label={content.storyLabel}
                title={content.storyTitle}
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              >
                {content.storyParagraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team — Asymmetric Editorial */}
      <section className="pt-12 md:pt-16 pb-24 md:pb-40">
        <div className="container mx-auto px-4">
          <SectionHeader label={content.teamLabel} title={content.teamTitle} />

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Team Member 1 — Large */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 group"
              {...sbEditable(content.team[0]?.editable)}
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <ImageWithFallback
                  src={resolveImage(content.team[0]?.image ?? "")}
                  alt={content.team[0]?.imageAlt ?? ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-[Bebas_Neue] tracking-wide">
                  {content.team[0]?.name}
                </h3>
                <p className="text-accent text-sm tracking-[0.3em] uppercase">
                  {content.team[0]?.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">
                  {content.team[0]?.description}
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 — Large */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-5 lg:col-start-8 lg:mt-20 group"
              {...sbEditable(content.team[1]?.editable)}
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <ImageWithFallback
                  src={resolveImage(content.team[1]?.image ?? "")}
                  alt={content.team[1]?.imageAlt ?? ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-[Bebas_Neue] tracking-wide">
                  {content.team[1]?.name}
                </h3>
                <p className="text-accent text-sm tracking-[0.3em] uppercase">
                  {content.team[1]?.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">
                  {content.team[1]?.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Team Member 3 — Wide Format */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 lg:mt-20 max-w-4xl group"
            {...sbEditable(content.team[2]?.editable)}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 relative aspect-[3/4] md:aspect-square overflow-hidden">
                <ImageWithFallback
                  src={resolveImage(content.team[2]?.image ?? "")}
                  alt={content.team[2]?.imageAlt ?? ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="md:col-span-3 space-y-2">
                <h3 className="text-3xl md:text-4xl font-[Bebas_Neue] tracking-wide">
                  {content.team[2]?.name}
                </h3>
                <p className="text-accent text-sm tracking-[0.3em] uppercase">
                  {content.team[2]?.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">
                  {content.team[2]?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline — Vertical Editorial */}
      <section className="py-24 md:py-40 bg-primary text-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            label={content.timelineLabel}
            title={content.timelineTitle}
          />
          <div className="mt-16 max-w-3xl">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex gap-8 md:gap-16 items-baseline border-b border-white/10 py-8 group hover:border-accent/50 transition-colors"
                {...sbEditable(item.editable)}
              >
                <span className="text-4xl md:text-6xl font-[Bebas_Neue] text-accent shrink-0 w-24 md:w-32">
                  {item.year}
                </span>
                <p className="text-white/70 text-lg group-hover:text-white transition-colors">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — Minimal Grid */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader
            label={content.valuesLabel}
            title={content.valuesTitle}
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-10 group hover:bg-accent transition-all duration-500 cursor-default border-b border-r border-border"
                {...sbEditable(value.editable)}
              >
                <value.Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-accent group-hover:text-white transition-colors duration-500 mb-8"
                />
                <h3 className="text-2xl mb-3 group-hover:text-white transition-colors duration-500">
                  {value.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-500 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Statement */}
      <section className="py-24 md:py-40 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <RevealText>
              <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-8">
                {content.statementHeadline}
              </h2>
            </RevealText>
            {content.statementParagraphs.map((p, i) => (
              <motion.p
                key={p.slice(0, 32)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className={`text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto${
                  i < content.statementParagraphs.length - 1 ? " mb-8" : ""
                }`}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
