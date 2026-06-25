"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { ServiceCard } from "../components/molecules/ServiceCard";
import { StatsCounter } from "../components/molecules/StatsCounter";
import { SplitImageCard } from "../components/molecules/SplitImageCard";
import { RevealText } from "../components/molecules/RevealText";
import { asset } from "../lib/asset";
import {
  Layers,
  Home as HomeIcon,
  Sparkles,
  Award,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { defaultHomeContent } from "../content/pages/home";
import type { HomeContent, ServiceIcon } from "../content/pages/home";
import { sbEditable } from "../lib/editable";

/** Icon-Schluessel aus dem CMS auf die lucide-Komponenten abbilden. */
const serviceIcons: Record<ServiceIcon, typeof Layers> = {
  layers: Layers,
  home: HomeIcon,
  sparkles: Sparkles,
  award: Award,
};

/** Relativen Pfad Base-Path-bewusst aufloesen, externe URLs unveraendert lassen. */
function resolveImage(src: string): string {
  return src.startsWith("/") ? asset(src) : src;
}

export function Home({
  content = defaultHomeContent,
}: {
  content?: HomeContent;
}) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const services = content.services.map((s) => ({
    icon: serviceIcons[s.icon] ?? Layers,
    title: s.title,
    description: s.description,
    editable: s.editable,
  }));

  return (
    <div className="overflow-hidden" {...sbEditable(content.editable)}>
      {/* Hero — Cinematic Full-Screen */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <ImageWithFallback
            src={resolveImage(content.heroImage)}
            alt={content.heroImageAlt}
            className="w-full h-full object-cover"
            priority
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-4 pb-16 md:pb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="sr-only">
                {content.heroLine1} {content.heroAccentWord}{" "}
                {content.heroLine2Suffix}
              </h1>
              <div aria-hidden="true">
                <RevealText delay={0.4}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-white mb-0">
                    {content.heroLine1}
                  </span>
                </RevealText>
                <RevealText delay={0.5}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-white">
                    <span className="text-accent">
                      {content.heroAccentWord}
                    </span>{" "}
                    {content.heroLine2Suffix}
                  </span>
                </RevealText>
              </div>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-white/70 text-lg mb-8 max-w-sm"
              >
                {content.heroSubtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild variant="primary" className="text-sm px-8 py-4 flex items-center gap-2 h-14">
                  <Link to={content.heroCtaPrimary.link}>
                    {content.heroCtaPrimary.label} <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border border-white/30 bg-transparent text-white hover:!bg-[#c41e1e] hover:!text-white hover:!border-[#c41e1e] text-sm px-8 py-4 h-14 transition-colors"
                >
                  <Link to={content.heroCtaSecondary.link}>
                    {content.heroCtaSecondary.label}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-0 left-8 md:left-12 w-px h-24 bg-gradient-to-b from-transparent to-accent origin-top z-10"
        />
      </section>

      {/* Stats — Horizontal Editorial */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {content.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-12 md:py-20 px-6 md:px-10 ${i < 3 ? "border-r border-white/10" : ""} ${i < 2 ? "border-b lg:border-b-0 border-white/10" : i === 2 ? "border-b lg:border-b-0 border-white/10" : ""}`}
                {...sbEditable(stat.editable)}
              >
                <StatsCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Staggered Editorial Grid */}
      <section className="py-24 md:py-40 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
            <div className="lg:col-span-5">
              <SectionHeader
                label={content.servicesLabel}
                title={content.servicesTitle}
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end pb-8">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg"
              >
                {content.servicesIntro}
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ marginTop: index % 2 === 1 ? "2rem" : "0" }}
                {...sbEditable(service.editable)}
              >
                <ServiceCard {...service} index={index} active={index === 0} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Section — Tradition (clip-path reveal) */}
      <SplitImageCard
        image={resolveImage(content.traditionImage)}
        title={content.traditionTitle}
        imageAlt={content.traditionImageAlt}
      >
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {content.traditionText}
        </p>
        <div className="space-y-4 mb-10">
          {content.traditionItems.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="text-accent flex-shrink-0" size={18} />
              <span className="text-muted-foreground text-sm">{item}</span>
            </div>
          ))}
        </div>
        <Button asChild variant="primary" className="text-sm flex items-center gap-2">
          <Link to={content.traditionCta.link}>
            {content.traditionCta.label} <ArrowRight size={14} />
          </Link>
        </Button>
      </SplitImageCard>

      {/* Full-width Image Statement */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={resolveImage(content.statementImage)}
            alt={content.statementImageAlt}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <RevealText>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6">
              {content.statementEyebrow}
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="text-4xl md:text-7xl lg:text-8xl text-white tracking-tight max-w-5xl mx-auto leading-[0.95]">
              {content.statementHeadline}
            </h2>
          </RevealText>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Button
              asChild
              variant="outline"
              className="border border-white/40 bg-transparent text-white hover:!bg-[#c41e1e] hover:!text-white hover:!border-[#c41e1e] text-sm px-10 py-4 transition-colors"
            >
              <Link to={content.statementCta.link}>
                {content.statementCta.label}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Showroom Split — Reversed */}
      <SplitImageCard
        image={resolveImage(content.showroomImage)}
        title={content.showroomTitle}
        reverse
        imageAlt={content.showroomImageAlt}
      >
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          {content.showroomText}
        </p>
        <Button
          asChild
          variant="secondary"
          className="text-sm flex items-center gap-2"
        >
          <Link to={content.showroomCta.link}>
            {content.showroomCta.label} <ArrowRight size={14} />
          </Link>
        </Button>
      </SplitImageCard>

      {/* CTA — Minimal, Powerful */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <RevealText>
                <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
                  {content.ctaHeadlinePre}
                  <br />
                  <span className="text-accent">
                    {content.ctaHeadlineAccent}
                  </span>
                </h2>
              </RevealText>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="text-white/70 text-lg mb-10 leading-relaxed">
                  {content.ctaText}
                </p>
                <Button
                  asChild
                  variant="primary"
                  className="text-sm px-10 py-5 flex items-center gap-3"
                >
                  <Link to={content.ctaButton.link}>
                    {content.ctaButton.label} <ArrowRight size={16} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
