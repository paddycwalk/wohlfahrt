"use client";

import { motion } from "motion/react";
import { RevealText } from "../components/molecules/RevealText";
import { defaultNewsContent, type NewsContent } from "../content/pages/news";
import { sbEditable } from "../lib/editable";

export function News({
  content = defaultNewsContent,
}: {
  content?: NewsContent;
}) {
  const newsItems = content.items;

  return (
    <div className="overflow-hidden" {...sbEditable(content.editable)}>
      {/* Hero */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <RevealText>
            <p className="text-xs tracking-[0.4em] text-accent uppercase mb-4">
              {content.heroEyebrow}
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight">
              {content.heroTitle}
            </h1>
          </RevealText>
        </div>
      </section>

      {/* News — Editorial List */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {newsItems.map((item) => (
              <motion.article
                key={`${item.date}-${item.title}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5 }}
                className="border-b border-border py-10 md:py-12"
                {...sbEditable(item.editable)}
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
