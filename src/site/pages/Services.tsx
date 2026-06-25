"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealText } from "../components/molecules/RevealText";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";
import {
  Hammer,
  Building,
  Wrench,
  Shield,
  ArrowRight,
  Award,
  CheckCircle2,
  Star,
  Phone,
  Sun,
  Flame,
  Droplet,
  Accessibility,
  Wind,
  HardHat,
} from "lucide-react";
import { asset } from "../lib/asset";
import {
  defaultServicesContent,
  type ServicesContent,
  type ServiceShowcase as ServiceShowcaseData,
  type ServiceShowcaseIcon,
  type FeatureIcon,
} from "../content/pages/services";
import { sbEditable } from "../lib/editable";

const showcaseIcons: Record<ServiceShowcaseIcon, typeof Building> = {
  building: Building,
  wrench: Wrench,
  hardHat: HardHat,
  hammer: Hammer,
  sun: Sun,
  flame: Flame,
  droplet: Droplet,
  accessibility: Accessibility,
  wind: Wind,
  shield: Shield,
};

const featureIcons: Record<FeatureIcon, typeof Award> = {
  award: Award,
  checkCircle: CheckCircle2,
  star: Star,
  phone: Phone,
};

/** Relative Pfade ueber den Base-Path aufloesen, externe URLs unveraendert. */
function resolveImage(src: string): string {
  return src.startsWith("/") ? asset(src) : src;
}

function ServiceShowcase({
  service,
  index,
}: {
  service: ServiceShowcaseData;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const Icon = showcaseIcons[service.icon] ?? Building;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] lg:min-h-[500px] ${index > 0 ? "" : ""}`}
      {...sbEditable(service.editable)}
    >
      {/* Image */}
      <motion.div
        initial={{
          opacity: 0,
          clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        }}
        whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative h-[300px] lg:h-auto overflow-hidden ${!isEven ? "lg:order-2" : ""}`}
      >
        <ImageWithFallback
          src={resolveImage(service.image)}
          alt={service.title}
          className="w-full h-full object-cover absolute inset-0"
          width={1080}
          height={720}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <span className="text-[5rem] md:text-[7rem] font-[Bebas_Neue] text-white/10 leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <div
        className={`flex items-center ${isEven ? "bg-secondary" : "bg-background"} ${!isEven ? "lg:order-1" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 md:p-12 lg:p-16 xl:p-20 max-w-xl"
        >
          <div className="w-12 h-12 border border-accent/30 flex items-center justify-center mb-6">
            <Icon size={22} className="text-accent" strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl md:text-4xl tracking-tight mb-4">
            {service.title}
          </h3>
          <div className="w-12 h-px bg-accent mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Services({
  content = defaultServicesContent,
}: {
  content?: ServicesContent;
}) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const features = content.features.map((f) => ({
    ...f,
    Icon: featureIcons[f.icon] ?? Award,
  }));

  return (
    <div className="overflow-hidden" {...sbEditable(content.editable)}>
      {/* Hero — Cinematic with diagonal text */}
      <section
        ref={heroRef}
        className="relative h-[85vh] flex items-end overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-4 pb-16 md:pb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <RevealText>
                <p className="text-xs tracking-[0.4em] text-white uppercase mb-4">
                  {content.heroEyebrow}
                </p>
              </RevealText>
              <h1 className="sr-only">
                {content.heroTitleLine1} {content.heroTitleLine2Pre}
                {content.heroTitleLine2Accent}
              </h1>
              <div aria-hidden="true">
                <RevealText delay={0.2}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] text-white tracking-tight">
                    {content.heroTitleLine1}
                  </span>
                </RevealText>
                <RevealText delay={0.3}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] text-white tracking-tight">
                    {content.heroTitleLine2Pre}
                    <span className="text-accent">
                      {content.heroTitleLine2Accent}
                    </span>
                  </span>
                </RevealText>
              </div>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-white/60 text-lg max-w-sm"
              >
                {content.heroIntro}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-0 left-8 md:left-12 w-px h-24 bg-gradient-to-b from-transparent to-accent origin-top z-10"
        />
      </section>

      {/* Intro Statement */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs tracking-[0.3em] text-accent uppercase">
                  {content.introEyebrow}
                </span>
              </motion.div>
              <RevealText>
                <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                  {content.introTitle.split("\n").map((line, i, arr) => (
                    <span key={line}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </RevealText>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                {content.introText}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Services — Alternating Full-Width Image/Text Showcases */}
      <section>
        {content.services.map((service, index) => (
          <ServiceShowcase
            key={service.title}
            service={service}
            index={index}
          />
        ))}
      </section>

      {/* Process — Vertical Timeline Editorial */}
      <section className="bg-primary text-white py-24 md:py-40 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs tracking-[0.3em] text-accent uppercase">
                  {content.processEyebrow}
                </span>
              </motion.div>
              <RevealText>
                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
                  {content.processTitlePre.split("\n").map((line, i, arr) => (
                    <span key={line || i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                  <span className="text-accent">
                    {content.processTitleAccent}
                  </span>
                  {content.processTitlePost}
                </h2>
              </RevealText>
            </div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden lg:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-white/10" />

            {content.process.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-24 last:mb-0`}
                  {...sbEditable(item.editable)}
                >
                  {/* Dot on timeline */}
                  <div className="hidden lg:block absolute left-1/2 top-4 -translate-x-1/2 w-3 h-3 bg-accent z-10" />

                  <div
                    className={`${isEven ? "lg:text-right lg:pr-16" : "lg:order-2 lg:pl-16"}`}
                  >
                    <span className="text-[4rem] md:text-[5rem] font-[Bebas_Neue] text-accent leading-none block mb-2">
                      {item.step}
                    </span>
                    <h3 className="text-3xl md:text-4xl tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed max-w-md ${isEven ? 'lg:ml-auto' : ''}">
                      {item.desc}
                    </p>
                  </div>

                  {/* Empty space for opposite side */}
                  <div
                    className={`hidden lg:block ${!isEven ? "lg:order-1" : ""}`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us — Bold Statement + Features */}
      <section className="py-24 md:py-40 bg-background relative overflow-hidden">
        {/* Large background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="text-[15rem] md:text-[25rem] font-[Bebas_Neue] text-foreground/[0.02] leading-none whitespace-nowrap">
            W&W
          </span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs tracking-[0.3em] text-accent uppercase">
                  Vorteile
                </span>
              </motion.div>
              <RevealText>
                <h2 className="text-4xl md:text-6xl tracking-tight leading-[0.95] mb-8">
                  {content.whyTitle.split("\n").map((line, i, arr) => (
                    <span key={line}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </RevealText>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-lg leading-relaxed max-w-lg"
              >
                {content.whyText}
              </motion.p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="space-y-0">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group py-8 border-b border-border first:border-t"
                    {...sbEditable(feature.editable)}
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-11 h-11 bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-500">
                        <feature.Icon
                          size={18}
                          className="text-accent group-hover:text-white transition-colors duration-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg mb-1 group-hover:text-accent transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Full-Width Image with Overlay */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={resolveImage(content.ctaImage)}
            alt="Marble texture"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <RevealText>
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-6">
              {content.ctaEyebrow}
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight max-w-4xl mx-auto leading-[0.95] mb-10">
              {content.ctaHeadline}
            </h2>
          </RevealText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              variant="primary"
              className="text-sm px-10 py-4 flex items-center gap-2 h-14"
            >
              <Link to={content.ctaButtonLink}>
                {content.ctaButtonLabel} <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
