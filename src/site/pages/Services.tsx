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
  ArrowUpRight,
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

const heroImg =
  "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMHRpbGVzJTIwbW9kZXJuJTIwZGVzaWdufGVufDF8fHx8MTc3NTgzMDIxOHww&ixlib=rb-4.1.0&q=80&w=1080";
const craftsmanImg =
  "https://images.unsplash.com/photo-1723689675520-d93e0943cdb6?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjBsYXlpbmclMjBjZXJhbWljJTIwZmxvb3IlMjB0aWxlcyUyMHByZWNpc2lvbnxlbnwxfHx8fDE3NzU4MzAyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const marbleImg =
  "https://images.unsplash.com/photo-1670608927660-70a18b893cd3?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBzdG9uZSUyMHRleHR1cmUlMjBkYXJrJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzU4MzAyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const archImg =
  "https://images.unsplash.com/photo-1774516534107-7756806d8f73?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvciUyMGNvbmNyZXRlJTIwd2FsbHxlbnwxfHx8fDE3NzU4MzAyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const livingImg =
  "https://images.unsplash.com/photo-1757262798677-ab4af4455a58?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwdGlsZWQlMjBmbG9vciUyMGVsZWdhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzY4NTYzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  {
    icon: Building,
    title: "Neubauten",
    description:
      "Fliesenarbeiten in Neubauten — ob mit Architekt, Bauleiter oder in Eigenregie. Regional bekannt für Erfahrung und Know-how.",
    image:
      "https://images.unsplash.com/photo-1686358244570-631340cbbd22?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBuZXclMjBidWlsZGluZyUyMHNpdGUlMjBob3VzZXxlbnwxfHx8fDE3NzczNjQxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Wrench,
    title: "Sanierung",
    description:
      "Spezialisiert auf Sanierungen — auch im bewohnten Zustand. Schnell, flexibel und in enger Abstimmung mit allen Gewerken. Full-Service aus einer Hand.",
    image: heroImg,
  },
  {
    icon: HardHat,
    title: "Reparatur",
    description:
      "Hohe Flexibilität bei kurzfristigen Einsätzen — vor allem bei Wasserschäden helfen wir schnell und zuverlässig.",
    image: craftsmanImg,
  },
  {
    icon: Hammer,
    title: "Verlegung",
    description:
      "Perfekte Fliesenverlegung durch unser hochqualifiziertes Personal — kombiniert mit hochwertiger Bauchemie für langlebige Ergebnisse.",
    image: livingImg,
  },
  {
    icon: Sun,
    title: "Balkon- & Terrassensanierung",
    description:
      "Im Außenbereich kommt es auf hochwertige Ausführung und die richtigen Materialien an — mit jahrzehntelangem Fachwissen auf aktuellem Stand der Technik.",
    image:
      "https://images.unsplash.com/photo-1762857995839-62cf8587f542?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNlJTIwYmFsY29ueSUyMHRpbGVzJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzczNjQxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Flame,
    title: "Fliesenheizung",
    description:
      "Warme Füße ohne große Umbauten: Fliesenheizungen lassen sich unkompliziert unter Ihren Belag verlegen — programmierbar und energieeffizient.",
    image:
      "https://images.unsplash.com/photo-1614409938983-65f12e272ee4?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmZsb29yJTIwaGVhdGluZyUyMHdhcm0lMjBmbG9vciUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NzczNjQxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Droplet,
    title: "Silikonverfugung",
    description:
      "Silikonfugen sind Wartungsfugen und müssen regelmäßig geprüft werden. Wir führen Neuverfugungen sowie Sanierungen rissiger Fugen aus.",
    image: heroImg,
  },
  {
    icon: Accessibility,
    title: "Behindertengerechte Umbauten",
    description:
      "Barrierefreie Bäder und Wohnräume — durchdachte Lösungen für mehr Komfort und Sicherheit im Alltag.",
    image:
      "https://images.unsplash.com/photo-1756312178806-448bbb981d7e?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmxlJTIwYmF0aHJvb20lMjBiYXJyaWVyJTIwZnJlZSUyMHNob3dlciUyMHdoZWVsY2hhaXJ8ZW58MXx8fHwxNzc3MzY0MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Wind,
    title: "Bautrocknung",
    description:
      "Bautrocknungsgeräte zur Luftentfeuchtung — z. B. nach Wasserschäden — können bei uns gemietet werden. Auf Wunsch inklusive Auf- und Abbau.",
    image: archImg,
  },
  {
    icon: Shield,
    title: "Bitumenabdichtungsarbeiten",
    description:
      "Bitumenabdichtungen führen wir in kleinerem Umfang aus — etwa im Rahmen von Balkonsanierungen.",
    image: marbleImg,
  },
];

const process = [
  {
    step: "01",
    title: "Beratung",
    desc: "Persönliches Gespräch, Besichtigung vor Ort und Materialauswahl in unserer Ausstellung.",
  },
  {
    step: "02",
    title: "Planung",
    desc: "Detaillierte Planung mit Aufmaß, Verlegeplan und transparentem Festpreisangebot.",
  },
  {
    step: "03",
    title: "Ausführung",
    desc: "Professionelle Umsetzung durch unser erfahrenes Meisterbetrieb-Team — sauber und termingerecht.",
  },
  {
    step: "04",
    title: "Abnahme",
    desc: "Gemeinsame Endabnahme, Pflegehinweise und 5 Jahre Gewährleistung auf alle Arbeiten.",
  },
];

function ServiceShowcase({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] lg:min-h-[500px] ${index > 0 ? "" : ""}`}
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
          src={service.image}
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
            <service.icon size={22} className="text-accent" strokeWidth={1.5} />
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

export function Services() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero — Cinematic with diagonal text */}
      <section
        ref={heroRef}
        className="relative h-[85vh] flex items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <ImageWithFallback
            src={heroImg}
            alt="Luxury bathroom tiles"
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
                  Unsere Leistungen
                </p>
              </RevealText>
              <h1 className="sr-only">Handwerk mit Anspruch</h1>
              <div aria-hidden="true">
                <RevealText delay={0.2}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] text-white tracking-tight">
                    Handwerk
                  </span>
                </RevealText>
                <RevealText delay={0.3}>
                  <span className="block font-['Bebas_Neue',sans-serif] uppercase text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] text-white tracking-tight">
                    mit <span className="text-accent">Anspruch</span>
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
                Qualitätsbewusst und termingerecht — von der Beratung bis zur
                Abnahme.
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
                  Leistungsspektrum
                </span>
              </motion.div>
              <RevealText>
                <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                  Alles aus
                  <br />
                  einer Hand
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
                Als Meisterbetrieb seit 1954 bieten wir das komplette Spektrum
                rund um Fliesen und Badsanierung. Jedes Projekt wird von
                erfahrenen Fachkräften geplant und umgesetzt — mit dem
                Qualitätsanspruch, der unseren Namen seit drei Generationen
                auszeichnet.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Services — Alternating Full-Width Image/Text Showcases */}
      <section>
        {services.map((service, index) => (
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
                  Ablauf
                </span>
              </motion.div>
              <RevealText>
                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
                  Ihr Weg zum
                  <br />
                  <span className="text-accent">perfekten</span> Ergebnis
                </h2>
              </RevealText>
            </div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden lg:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-white/10" />

            {process.map((item, index) => {
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
                  Warum
                  <br />
                  Wohlfahrt & Wohlfahrt?
                </h2>
              </RevealText>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-lg leading-relaxed max-w-lg"
              >
                Drei Generationen Erfahrung, über 12 qualifizierte Mitarbeiter
                und ein unerschütterliches Engagement für Perfektion — das ist
                unser Versprechen.
              </motion.p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="space-y-0">
                {[
                  {
                    icon: Award,
                    title: "Meisterqualität",
                    desc: "Zertifizierter Meisterbetrieb seit 1954 mit höchsten Qualitätsstandards.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Festpreisgarantie",
                    desc: "Transparente Kalkulation — keine versteckten Kosten, faire Preise.",
                  },
                  {
                    icon: Star,
                    title: "5 Jahre Gewährleistung",
                    desc: "Verlängerte Garantie auf alle unsere Verlegearbeiten.",
                  },
                  {
                    icon: Phone,
                    title: "Persönliche Betreuung",
                    desc: "Ein Ansprechpartner von der Beratung bis zur Abnahme.",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group py-8 border-b border-border first:border-t"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-11 h-11 bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-500">
                        <feature.icon
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
            src={marbleImg}
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
              Jetzt starten
            </p>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight max-w-4xl mx-auto leading-[0.95] mb-10">
              Lassen Sie uns Ihr Projekt verwirklichen
            </h2>
          </RevealText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/kontakt">
              <Button
                variant="primary"
                className="text-sm px-10 py-4 flex items-center gap-2 h-14"
              >
                Kontakt aufnehmen <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
