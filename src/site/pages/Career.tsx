"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { Button } from "../components/atoms/Button";
import { Link } from "react-router";
import { Users, Award, TrendingUp, Heart, ArrowRight } from "lucide-react";

export function Career() {
  const benefits = [
    {
      icon: Award,
      title: "Faire Bezahlung",
      description: "Attraktive Vergütung und Sonderzahlungen",
    },
    {
      icon: TrendingUp,
      title: "Weiterbildung",
      description: "Regelmäßige Schulungen und Entwicklungsmöglichkeiten",
    },
    {
      icon: Users,
      title: "Teamgeist",
      description: "Familiäres Arbeitsklima und starker Zusammenhalt",
    },
    {
      icon: Heart,
      title: "Work-Life-Balance",
      description: "Geregelte Arbeitszeiten und flexible Urlaubsplanung",
    },
  ];

  const openings = [
    {
      title: "Fliesenleger (m/w/d)",
      type: "Vollzeit",
      description:
        "Erfahrener Fliesenleger mit Gesellenbrief für vielseitige Projekte gesucht.",
    },
    {
      title: "Auszubildender Fliesenleger (m/w/d)",
      type: "Ausbildung",
      description:
        "Starte deine Karriere mit einer fundierten Ausbildung in unserem Meisterbetrieb.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <RevealText>
            <p className="text-xs tracking-[0.4em] text-accent uppercase mb-4">
              Karriere
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight max-w-4xl">
              Werde Teil unseres Teams
            </h1>
          </RevealText>
        </div>
      </section>

      {/* Benefits — Bordered Grid */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader
            label="Vorteile"
            title="Warum Wohlfahrt & Wohlfahrt?"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-border mt-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-10 group hover:bg-accent transition-all duration-500 cursor-default ${index < 3 ? "md:border-r border-border" : ""}`}
              >
                <benefit.icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-accent group-hover:text-white transition-colors duration-500 mb-8"
                />
                <h3 className="text-xl mb-3 group-hover:text-white transition-colors duration-500">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-500 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings — Editorial List */}
      <section className="bg-secondary py-24 md:py-40">
        <div className="container mx-auto px-4">
          <SectionHeader label="Stellenangebote" title="Offene Positionen" />
          <div className="max-w-4xl mt-16">
            {openings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border py-10 group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs tracking-[0.15em] text-accent uppercase px-3 py-1 border border-accent/30">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl mb-2 group-hover:text-accent transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {job.description}
                    </p>
                  </div>
                  <Link to="/kontakt" className="shrink-0">
                    <Button
                      variant="primary"
                      className="text-sm flex items-center gap-2"
                    >
                      Bewerben <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiativbewerbung + Ausbildung */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-background p-12 md:p-20 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs tracking-[0.3em] text-accent uppercase">
                Initiativ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">Initiativbewerbung</h2>
            <p className="text-muted-foreground mb-8">
              Keine passende Stelle? Senden Sie uns gerne eine
              Initiativbewerbung. Wir sind immer auf der Suche nach talentierten
              Mitarbeitern.
            </p>
            <Link to="/kontakt">
              <Button
                variant="primary"
                className="text-sm flex items-center gap-2"
              >
                Initiativ bewerben <ArrowRight size={14} />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="bg-primary text-white p-12 md:p-20 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs tracking-[0.3em] text-accent uppercase">
                Nachwuchs
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">Ausbildung bei uns</h2>
            <p className="text-white/70 mb-8">
              Starte deine Karriere mit einer hochwertigen Ausbildung in unserem
              Meisterbetrieb. Erfahrene Ausbilder, vielseitige Projekte, beste
              Übernahmechancen.
            </p>
            <Link to="/kontakt">
              <Button
                variant="primary"
                className="text-sm flex items-center gap-2"
              >
                Mehr erfahren <ArrowRight size={14} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
