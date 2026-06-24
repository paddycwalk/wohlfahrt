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

const aboutImage = asset("/assets/de9dae3e15181dc8a32cee214e691af8ea1217e1.webp");

export function About() {
  const values = [
    {
      icon: Award,
      title: "Qualität",
      description:
        "\u201EQualitätsbewusst und Termingerecht\u201C \u2013 unsere gelebte Firmenphilosophie seit 1954",
    },
    {
      icon: Users,
      title: "Kompetenz",
      description:
        "Ausschließlich hochqualifiziertes Personal unter persönlicher Meisterüberwachung",
    },
    {
      icon: Heart,
      title: "Kundennähe",
      description: "Individuelle Beratung durch den Firmeninhaber persönlich",
    },
    {
      icon: ShieldCheck,
      title: "Qualitätsmanagement",
      description:
        "Geprüfter Qualitätsbeauftragter QB-Bau garantiert konsequente Umsetzung",
    },
    {
      icon: TrendingUp,
      title: "Tradition",
      description:
        "Erfolgreich in 3. Generation – seit über 70 Jahren Meisterbetrieb",
    },
    {
      icon: Zap,
      title: "Flexibilität",
      description:
        "Schnelle Hilfe bei Notfällen wie Wasserschäden – ohne lange Wartezeiten",
    },
  ];

  const timeline = [
    {
      year: "1954",
      text: "Gründung des Fliesenmeisterbetriebs Wohlfahrt & Wohlfahrt",
    },
    {
      year: "1995",
      text: "Volker Wohlfahrt legt die Prüfung als Qualitätsbeauftragter QB-Bau ab",
    },
    {
      year: "1997",
      text: "Uwe und Volker Wohlfahrt übernehmen den Betrieb in 3. Generation",
    },
    {
      year: "2006",
      text: "Eröffnung der Fliesenausstellung am Firmensitz in Pfullingen",
    },
    {
      year: "Heute",
      text: "Meisterbetrieb für Neubau und Sanierung im Privat- und Industriebereich mit 12+ Mitarbeitern",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero — Typographic */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={aboutImage}
            alt="Wohlfahrt & Wohlfahrt Team in der Ausstellung"
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
              Über uns
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-white tracking-tight">
              Drei Generationen,
              <br />
              eine Leidenschaft
            </h1>
          </RevealText>
        </div>
      </section>

      {/* Story — Editorial Two Column */}
      <section className="pt-16 md:pt-20 pb-24 md:pb-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <SectionHeader label="Unsere Geschichte" title="Seit 1954" />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              >
                <p>
                  Am 01. Februar 1954 wurde unser Fliesenmeisterbetrieb
                  Wohlfahrt & Wohlfahrt Fliesen GmbH gegründet. Im Jahre 1997
                  übernahmen wir von unserem Vater Werner Wohlfahrt die Firma.
                </p>
                <p>
                  Wir, Uwe Wohlfahrt als Fliesenlegermeister und Volker
                  Wohlfahrt als Kaufmann sowie Qualitätsbeauftragter QB-Bau,
                  leiten somit in 3. Generation die Firma erfolgreich weiter.
                </p>
                <p>
                  Unser Betrieb ist sowohl im Neubau-Sektor als auch im Bereich
                  der Sanierung von Häusern und Wohnungen im Privatbereich und
                  Industriebereich tätig. In der langen Tradition unseres
                  Unternehmens wird stets allergrößter Wert auf die fachliche
                  und pünktliche Arbeit bei der Verlegung verschiedenster
                  Fliesen und Mosaike gelegt.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team — Asymmetric Editorial */}
      <section className="pt-12 md:pt-16 pb-24 md:pb-40">
        <div className="container mx-auto px-4">
          <SectionHeader label="Die Geschäftsführung" title="Unser Team" />

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Team Member 1 — Large */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzkwOTE1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Volker Wohlfahrt"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-[Bebas_Neue] tracking-wide">
                  Volker Wohlfahrt
                </h3>
                <p className="text-accent text-sm tracking-[0.3em] uppercase">
                  Kaufmann & QB-Bau
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">
                  Geschäftsführer und geprüfter Qualitätsbeauftragter QB-Bau.
                  Garantiert konsequente Qualitätsumsetzung.
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
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzkwOTE1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Uwe Wohlfahrt"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-[Bebas_Neue] tracking-wide">
                  Uwe Wohlfahrt
                </h3>
                <p className="text-accent text-sm tracking-[0.3em] uppercase">
                  Fliesenlegermeister
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">
                  Geschäftsführer und Fliesenlegermeister in 3. Generation.
                  Persönliche Überwachung jeder Baustelle.
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
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 relative aspect-[3/4] md:aspect-square overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1624797432677-6f803a98acb3?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzkwOTE1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Yannik Wohlfahrt"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="md:col-span-3 space-y-2">
                <h3 className="text-3xl md:text-4xl font-[Bebas_Neue] tracking-wide">
                  Yannik Wohlfahrt
                </h3>
                <p className="text-accent text-sm tracking-[0.3em] uppercase">
                  Technische Leitung
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed pt-2">
                  Meisterliche Überwachung aller Baustellen. Jahrzehntelange
                  Erfahrung in der fachgerechten Verlegung von Fliesen und
                  Mosaiken.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline — Vertical Editorial */}
      <section className="py-24 md:py-40 bg-primary text-white">
        <div className="container mx-auto px-4">
          <SectionHeader label="Meilensteine" title="Unser Weg" />
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
            label="Was uns ausmacht"
            title="Unsere Werte"
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
              >
                <value.icon
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
                {"\u201EQualitätsbewusst und Termingerecht\u201C"}
              </h2>
            </RevealText>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Um sicherzustellen, dass diese Firmenphilosophie immer
              gewährleistet ist, arbeiten wir ausschließlich mit
              hochqualifiziertem Personal. Jede Baustelle wird von Uwe Wohlfahrt
              persönlich oder von unserem Fliesenlegermeister überwacht.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Im Jahre 2006 eröffneten wir unsere Ausstellung am Firmensitz in
              Pfullingen. Hier findet jeder Kunde die passenden Fliesen zu
              fairen Preisen – auch ausgefallene Fliesen, die es nicht{" "}
              {"\u201Ean jeder Ecke\u201C"} gibt. Nach telefonischer
              Terminvereinbarung werden unsere Kunden vom Firmeninhaber
              persönlich und ganz individuell beraten.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
