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
const showroomImage = asset("/assets/c933bf73ff901e67a7958cdfebb4d489a28ca49e.webp");

export function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const services = [
    {
      icon: Layers,
      title: "Professionelle Verlegung",
      description:
        "Fachgerechte Verlegung aller Fliesenarten durch unsere erfahrenen Mitarbeiter.",
    },
    {
      icon: HomeIcon,
      title: "Komplettlösungen",
      description:
        "Von der Planung bis zur Fertigstellung — alles aus einer Hand.",
    },
    {
      icon: Sparkles,
      title: "Premium Materialien",
      description: "Hochwertige Fliesen von führenden Herstellern.",
    },
    {
      icon: Award,
      title: "Über 67 Jahre Erfahrung",
      description:
        "Tradition trifft Innovation für höchste Qualitätsansprüche.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero — Cinematic Full-Screen */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1765766600805-e75c44124d2c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkYXJrJTIwYmF0hrob29tJTIwtillfyMgYXJ0JTIwZGVzaWduJTIwZmxvb3J8ZW58MXx8fHwxNzc1ODI0Mjc3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury tiles"
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
              <h1 className="sr-only">Fliesen neu gedacht</h1>
              <div aria-hidden="true">
                <RevealText delay={0.4}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-white mb-0">
                    Fliesen
                  </span>
                </RevealText>
                <RevealText delay={0.5}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-white">
                    <span className="text-accent">neu</span> gedacht
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
                Exklusive Fliesen, professionelle Verlegung und individuelle
                Gestaltung — Wohlfahrt & Wohlfahrt.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/kontakt">
                  <Button
                    variant="primary"
                    className="text-sm px-8 py-4 flex items-center gap-2 h-14"
                  >
                    Projekt starten <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/ausstellung">
                  <Button
                    variant="outline"
                    className="border border-white/30 bg-transparent text-white hover:!bg-[#c41e1e] hover:!text-white hover:!border-[#c41e1e] text-sm px-8 py-4 h-14 transition-colors"
                  >
                    Ausstellung
                  </Button>
                </Link>
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
            {[
              { end: 67, suffix: "+", label: "Jahre Erfahrung" },
              { end: 1000, suffix: "+", label: "Projekte" },
              { end: 12, suffix: "+", label: "Mitarbeiter" },
              { end: 500, suffix: "+", label: "Fliesenmuster" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`py-12 md:py-20 px-6 md:px-10 ${i < 3 ? "border-r border-white/10" : ""} ${i < 2 ? "border-b lg:border-b-0 border-white/10" : i === 2 ? "border-b lg:border-b-0 border-white/10" : ""}`}
              >
                <StatsCounter {...stat} />
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
              <SectionHeader label="Kompetenzen" title="Was wir für Sie tun" />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end pb-8">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg"
              >
                Von der ersten Idee bis zum letzten Handgriff — wir vereinen
                Tradition mit Innovation und schaffen Räume, die begeistern.
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
              >
                <ServiceCard {...service} index={index} active={index === 0} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Section — Tradition (clip-path reveal) */}
      <SplitImageCard
        image="https://images.unsplash.com/photo-1636200534256-c08268363482?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjBoYW5kcyUyMGxheWluZyUyMHRpbGUlMjBmbG9vciUyMHByZWNpc2lvbnxlbnwxfHx8fDE3NzU4MjgzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
        title="Tradition trifft Moderne"
        imageAlt="Professionelle Fliesenverlegung"
      >
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Seit über 67 Jahren steht der Name Wohlfahrt & Wohlfahrt für Qualität
          und Zuverlässigkeit. Als familiengeführter Meisterbetrieb verbinden
          wir traditionelles Handwerk mit modernster Technik.
        </p>
        <div className="space-y-4 mb-10">
          {[
            "Meisterqualität seit 1954",
            "Familiengeführter Betrieb",
            "Modernste Verlegetechnik",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle className="text-accent flex-shrink-0" size={18} />
              <span className="text-muted-foreground text-sm">{item}</span>
            </div>
          ))}
        </div>
        <Link to="/ueber-uns">
          <Button variant="primary" className="text-sm flex items-center gap-2">
            Mehr über uns <ArrowRight size={14} />
          </Button>
        </Link>
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
            src="https://images.unsplash.com/photo-1634135129561-23f88811b8a1?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZSUyMHRleHR1cmV8ZW58MXx8fHwxNzc1ODI0Mjc3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Architecture"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <RevealText>
            <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6">
              Unser Versprechen
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="text-4xl md:text-7xl lg:text-8xl text-white tracking-tight max-w-5xl mx-auto leading-[0.95]">
              Perfektion in jedem Detail
            </h2>
          </RevealText>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Link to="/leistungen">
              <Button
                variant="outline"
                className="border border-white/40 bg-transparent text-white hover:!bg-[#c41e1e] hover:!text-white hover:!border-[#c41e1e] text-sm px-10 py-4 transition-colors"
              >
                Leistungen entdecken
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Showroom Split — Reversed */}
      <SplitImageCard
        image={showroomImage}
        title="Besuchen Sie unsere Ausstellung"
        reverse
        imageAlt="Wohlfahrt & Wohlfahrt Ausstellung"
      >
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Entdecken Sie Inspiration in unserer modernen Ausstellung. Erleben Sie
          die Vielfalt an Fliesen und Gestaltungsmöglichkeiten hautnah.
        </p>
        <Link to="/ausstellung">
          <Button
            variant="secondary"
            className="text-sm flex items-center gap-2"
          >
            Ausstellung entdecken <ArrowRight size={14} />
          </Button>
        </Link>
      </SplitImageCard>

      {/* CTA — Minimal, Powerful */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <RevealText>
                <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
                  Bereit für
                  <br />
                  <span className="text-accent">Ihr Projekt?</span>
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
                  Lassen Sie uns gemeinsam Ihre Visionen verwirklichen.
                  Kontaktieren Sie uns für ein unverbindliches
                  Beratungsgespräch.
                </p>
                <Link to="/kontakt">
                  <Button
                    variant="primary"
                    className="text-sm px-10 py-5 flex items-center gap-3"
                  >
                    Kontakt aufnehmen <ArrowRight size={16} />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
