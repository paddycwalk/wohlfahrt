"use client";

import { motion } from "motion/react";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { RevealText } from "../components/molecules/RevealText";
import { ContactForm } from "../components/molecules/ContactForm";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      text: "Wohlfahrt & Wohlfahrt\nFliesen GmbH\nHinterer Spielbach 4\n72793 Pfullingen",
    },
    {
      icon: Phone,
      title: "Telefon",
      text: "07121 / 71082",
      href: "tel:+49712171082",
    },
    {
      icon: Mail,
      title: "E-Mail",
      text: "info@fliesen-wohlfahrt.de",
      href: "mailto:info@fliesen-wohlfahrt.de",
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      text: "Mo. – Fr.: 08:00 – 12:30 Uhr\nMo. – Fr.: 14:00 – 17:00 Uhr\nSa.: Nach Vereinbarung",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-primary text-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <RevealText>
            <p className="text-xs tracking-[0.4em] text-accent uppercase mb-4">
              Kontakt
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight max-w-4xl">
              Lassen Sie uns sprechen
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
                label="Erreichbarkeit"
                title="Kontaktieren Sie uns"
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
                  Nachricht
                </span>
              </div>
              <h2 className="text-3xl mb-8">Schreiben Sie uns</h2>
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.5!2d9.2252!3d48.4525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799ed6e5e6b1b1d%3A0x0!2sHinterer%20Spielbach%204%2C%2072793%20Pfullingen!5e0!3m2!1sde!2sde!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        />
      </motion.div>

      {/* Reviews CTA */}
      <section className="bg-primary text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <RevealText>
            <h2 className="text-4xl md:text-6xl tracking-tight mb-6">
              Was unsere Kunden sagen
            </h2>
          </RevealText>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg mb-10 max-w-xl mx-auto"
          >
            Überzeugen Sie sich von unserer Qualität anhand der Bewertungen
            unserer Kunden.
          </motion.p>
          <a
            href="https://www.google.com/search?q=wohlfahrt+wohlfahrt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-sm tracking-[0.1em] uppercase hover:bg-accent/90 transition-all"
          >
            Google Bewertungen <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
