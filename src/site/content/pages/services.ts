/**
 * Feldbasiertes Content-Modell der Seite "Leistungen" (Services).
 */

/** Icon-Schluessel der Leistungs-Showcases (lucide-react). */
export type ServiceShowcaseIcon =
  | "building"
  | "wrench"
  | "hardHat"
  | "hammer"
  | "sun"
  | "flame"
  | "droplet"
  | "accessibility"
  | "wind"
  | "shield";

/** Icon-Schluessel der Vorteils-Kacheln (lucide-react). */
export type FeatureIcon = "award" | "checkCircle" | "star" | "phone";

export interface ServiceShowcase {
  icon: ServiceShowcaseIcon;
  title: string;
  description: string;
  image: string;
  editable?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  editable?: string;
}

export interface FeatureItem {
  icon: FeatureIcon;
  title: string;
  desc: string;
  editable?: string;
}

export interface ServicesContent {
  // Hero
  heroImage: string;
  heroImageAlt: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2Pre: string;
  heroTitleLine2Accent: string;
  heroIntro: string;

  // Intro-Statement
  introEyebrow: string;
  introTitle: string;
  introText: string;

  // Leistungen
  services: ServiceShowcase[];

  // Ablauf
  processEyebrow: string;
  processTitlePre: string;
  processTitleAccent: string;
  processTitlePost: string;
  process: ProcessStep[];

  // Vorteile
  whyEyebrow: string;
  whyTitle: string;
  whyText: string;
  features: FeatureItem[];

  // CTA
  ctaImage: string;
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaButtonLabel: string;
  ctaButtonLink: string;

  /** Storyblok Click-to-Edit der Seiten-Story (nur im Editor gesetzt). */
  editable?: string;
}

const heroImg =
  "/assets/leistung-bad.webp";
const craftsmanImg =
  "/assets/leistung-reparatur.webp";
const marbleImg =
  "/assets/leistung-marmor.webp";
const archImg =
  "/assets/leistung-architektur.webp";
const livingImg =
  "/assets/leistung-verlegung.webp";

export const defaultServicesContent: ServicesContent = {
  heroImage: heroImg,
  heroImageAlt: "Edles Badezimmer mit Natursteinoptik-Fliesen",
  heroEyebrow: "Unsere Leistungen",
  heroTitleLine1: "Handwerk",
  heroTitleLine2Pre: "mit ",
  heroTitleLine2Accent: "Anspruch",
  heroIntro:
    "Qualitätsbewusst und termingerecht — von der Beratung bis zur Abnahme.",

  introEyebrow: "Leistungsspektrum",
  introTitle: "Alles aus\neiner Hand",
  introText:
    "Als Meisterbetrieb seit 1954 bieten wir das komplette Spektrum rund um Fliesen und Badsanierung. Jedes Projekt wird von erfahrenen Fachkräften geplant und umgesetzt — mit dem Qualitätsanspruch, der unseren Namen seit drei Generationen auszeichnet.",

  services: [
    {
      icon: "building",
      title: "Neubauten",
      description:
        "Fliesenarbeiten in Neubauten — ob mit Architekt, Bauleiter oder in Eigenregie. Regional bekannt für Erfahrung und Know-how.",
      image:
        "/assets/leistung-neubau.webp",
    },
    {
      icon: "wrench",
      title: "Sanierung",
      description:
        "Spezialisiert auf Sanierungen — auch im bewohnten Zustand. Schnell, flexibel und in enger Abstimmung mit allen Gewerken. Full-Service aus einer Hand.",
      image: heroImg,
    },
    {
      icon: "hardHat",
      title: "Reparatur",
      description:
        "Hohe Flexibilität bei kurzfristigen Einsätzen — vor allem bei Wasserschäden helfen wir schnell und zuverlässig.",
      image: craftsmanImg,
    },
    {
      icon: "hammer",
      title: "Verlegung",
      description:
        "Perfekte Fliesenverlegung durch unser hochqualifiziertes Personal — kombiniert mit hochwertiger Bauchemie für langlebige Ergebnisse.",
      image: livingImg,
    },
    {
      icon: "sun",
      title: "Balkon- & Terrassensanierung",
      description:
        "Im Außenbereich kommt es auf hochwertige Ausführung und die richtigen Materialien an — mit jahrzehntelangem Fachwissen auf aktuellem Stand der Technik.",
      image:
        "/assets/leistung-terrasse.webp",
    },
    {
      icon: "flame",
      title: "Fliesenheizung",
      description:
        "Warme Füße ohne große Umbauten: Fliesenheizungen lassen sich unkompliziert unter Ihren Belag verlegen — programmierbar und energieeffizient.",
      image:
        "/assets/leistung-heizung.webp",
    },
    {
      icon: "droplet",
      title: "Silikonverfugung",
      description:
        "Silikonfugen sind Wartungsfugen und müssen regelmäßig geprüft werden. Wir führen Neuverfugungen sowie Sanierungen rissiger Fugen aus.",
      image: heroImg,
    },
    {
      icon: "accessibility",
      title: "Behindertengerechte Umbauten",
      description:
        "Barrierefreie Bäder und Wohnräume — durchdachte Lösungen für mehr Komfort und Sicherheit im Alltag.",
      image:
        "/assets/leistung-barrierefrei.webp",
    },
    {
      icon: "wind",
      title: "Bautrocknung",
      description:
        "Bautrocknungsgeräte zur Luftentfeuchtung — z. B. nach Wasserschäden — können bei uns gemietet werden. Auf Wunsch inklusive Auf- und Abbau.",
      image: archImg,
    },
    {
      icon: "shield",
      title: "Bitumenabdichtungsarbeiten",
      description:
        "Bitumenabdichtungen führen wir in kleinerem Umfang aus — etwa im Rahmen von Balkonsanierungen.",
      image: marbleImg,
    },
  ],

  processEyebrow: "Ablauf",
  processTitlePre: "Ihr Weg zum\n",
  processTitleAccent: "perfekten",
  processTitlePost: " Ergebnis",
  process: [
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
  ],

  whyEyebrow: "Vorteile",
  whyTitle: "Warum\nWohlfahrt & Wohlfahrt?",
  whyText:
    "Drei Generationen Erfahrung, über 12 qualifizierte Mitarbeiter und ein unerschütterliches Engagement für Perfektion — das ist unser Versprechen.",
  features: [
    {
      icon: "award",
      title: "Meisterqualität",
      desc: "Zertifizierter Meisterbetrieb seit 1954 mit höchsten Qualitätsstandards.",
    },
    {
      icon: "checkCircle",
      title: "Festpreisgarantie",
      desc: "Transparente Kalkulation — keine versteckten Kosten, faire Preise.",
    },
    {
      icon: "star",
      title: "5 Jahre Gewährleistung",
      desc: "Verlängerte Garantie auf alle unsere Verlegearbeiten.",
    },
    {
      icon: "phone",
      title: "Persönliche Betreuung",
      desc: "Ein Ansprechpartner von der Beratung bis zur Abnahme.",
    },
  ],

  ctaImage: marbleImg,
  ctaEyebrow: "Jetzt starten",
  ctaHeadline: "Lassen Sie uns Ihr Projekt verwirklichen",
  ctaButtonLabel: "Kontakt aufnehmen",
  ctaButtonLink: "/kontakt",
};
