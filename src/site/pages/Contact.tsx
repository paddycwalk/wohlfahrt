"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { ContactForm } from "../components/molecules/ContactForm";
import { MapEmbed } from "../components/molecules/MapEmbed";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/site/content/SiteSettingsProvider";
import { formatOpeningHours } from "@/site/content/site";
import {
  defaultContactContent,
  type ContactContent,
} from "../content/pages/contact";
import { sbEditable } from "../lib/editable";

export function Contact({
  content = defaultContactContent,
}: {
  content?: ContactContent;
}) {
  const s = useSiteSettings();
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      text: `${s.legalName}\n${s.street}\n${s.zip} ${s.city}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${s.street}, ${s.zip} ${s.city}`,
      )}`,
      external: true,
    },
    {
      icon: Phone,
      title: "Telefon",
      text: s.phone,
      href: `tel:${s.phoneHref}`,
    },
    {
      icon: Mail,
      title: "E-Mail",
      text: s.email,
      href: `mailto:${s.email}`,
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      text: formatOpeningHours(s).join("\n"),
    },
  ];

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
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight max-w-4xl">
              {content.heroTitle}
            </h1>
          </RevealText>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left — Info */}
            <div className="lg:col-span-5">
              <SectionHeader
                label={content.infoLabel}
                title={content.infoTitle}
              />
              <div className="space-y-8 mt-12">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex gap-5"
                  >
                    <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm tracking-[0.15em] uppercase text-accent mb-1">
                        {item.title}
                      </h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={
                            item.external ? "noopener noreferrer" : undefined
                          }
                          className="text-muted-foreground text-sm hover:text-accent transition-colors whitespace-pre-line"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {item.text}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-6 lg:col-start-7 bg-secondary p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs tracking-[0.3em] text-accent uppercase">
                  {content.formEyebrow}
                </span>
              </div>
              <h2 className="text-3xl mb-8">{content.formTitle}</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map — Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-[500px]"
      >
        <MapEmbed
          embedUrl={s.mapEmbedUrl}
          address={[s.street, `${s.zip} ${s.city}`]}
        />
      </motion.div>

      {/* Reviews CTA */}
      <section className="bg-primary text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <RevealText>
            <h2 className="text-4xl md:text-6xl tracking-tight mb-6">
              {content.reviewsTitle}
            </h2>
          </RevealText>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg mb-10 max-w-xl mx-auto"
          >
            {content.reviewsText}
          </motion.p>
          <a
            href={content.reviewsButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-sm tracking-[0.1em] uppercase hover:bg-accent/90 transition-all"
          >
            {content.reviewsButtonLabel} <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
