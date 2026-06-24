"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { ArrowRight } from "lucide-react";

export function News() {
  const newsItems = [
    {
      date: "15. März 2026",
      title: "Neue Großformatfliesen eingetroffen",
      excerpt:
        "Entdecken Sie unsere neuesten Großformatfliesen in moderner Betonoptik. Perfekt für minimalistische Designs.",
      category: "Produkte",
    },
    {
      date: "2. März 2026",
      title: "Erweiterte Öffnungszeiten",
      excerpt: "Ab sofort haben wir samstags bis 16:00 Uhr für Sie geöffnet.",
      category: "Unternehmen",
    },
    {
      date: "18. Februar 2026",
      title: "Auszeichnung als Top-Handwerker 2026",
      excerpt:
        "Wir wurden erneut als einer der besten Fliesenleger der Region ausgezeichnet.",
      category: "Auszeichnung",
    },
    {
      date: "20. Januar 2026",
      title: "Workshop: Trends 2026",
      excerpt:
        "Kostenloser Workshop zu aktuellen Trends in der Fliesengestaltung.",
      category: "Event",
    },
    {
      date: "8. Januar 2026",
      title: "Nachhaltigkeitsinitiative",
      excerpt:
        "Wir setzen verstärkt auf umweltfreundliche Materialien und recycelbare Verpackungen.",
      category: "Nachhaltigkeit",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <RevealText>
            <p className="text-xs tracking-[0.4em] text-accent uppercase mb-4">
              Aktuelles
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight">
              Neuigkeiten
            </h1>
          </RevealText>
        </div>
      </section>

      {/* News — Editorial List */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {newsItems.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5 }}
                className="border-b border-border py-10 md:py-12"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="flex items-center gap-4 md:w-48 shrink-0">
                    <span className="text-xs tracking-[0.15em] text-accent uppercase px-3 py-1 border border-accent/30">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2 tracking-[0.1em]">
                      {item.date}
                    </p>
                    <h3 className="text-2xl md:text-3xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
