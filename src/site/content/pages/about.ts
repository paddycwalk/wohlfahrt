/**
 * Feldbasiertes Content-Modell der Seite "Über uns" (About).
 *
 * Alle Texte, Bilder und Listen sind hier typisiert und mit den aktuellen
 * Inhalten als Default vorbelegt. Ohne Storyblok-Token rendert die Seite mit
 * diesen Defaults; mit Token werden gepflegte Werte ueberlagert.
 */

/** Icon-Schluessel fuer die Werte-Kacheln (lucide-react). */
export type ValueIcon =
  | "award"
  | "users"
  | "heart"
  | "shieldCheck"
  | "trendingUp"
  | "zap";

export interface ValueItem {
  icon: ValueIcon;
  title: string;
  description: string;
  editable?: string;
}

export interface TeamMember {
  image: string;
  imageAlt: string;
  name: string;
  role: string;
  description: string;
  editable?: string;
}

export interface TimelineItem {
  year: string;
  text: string;
  editable?: string;
}

export interface AboutContent {
  // Hero
  heroImage: string;
  heroImageAlt: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;

  // Geschichte
  storyLabel: string;
  storyTitle: string;
  storyParagraphs: string[];

  // Team
  teamLabel: string;
  teamTitle: string;
  team: TeamMember[];

  // Timeline
  timelineLabel: string;
  timelineTitle: string;
  timeline: TimelineItem[];

  // Werte
  valuesLabel: string;
  valuesTitle: string;
  values: ValueItem[];

  // Statement
  statementHeadline: string;
  statementParagraphs: string[];

  /** Storyblok Click-to-Edit der Seiten-Story (nur im Editor gesetzt). */
  editable?: string;
}

export const defaultAboutContent: AboutContent = {
  heroImage: "/assets/de9dae3e15181dc8a32cee214e691af8ea1217e1.webp",
  heroImageAlt: "Wohlfahrt & Wohlfahrt Team in der Ausstellung",
  heroEyebrow: "Über uns",
  heroTitleLine1: "Drei Generationen,",
  heroTitleLine2: "eine Leidenschaft",

  storyLabel: "Unsere Geschichte",
  storyTitle: "Seit 1954",
  storyParagraphs: [
    "Am 01. Februar 1954 wurde unser Fliesenmeisterbetrieb Wohlfahrt & Wohlfahrt Fliesen GmbH gegründet. Im Jahre 1997 übernahmen wir von unserem Vater Werner Wohlfahrt die Firma.",
    "Wir, Uwe Wohlfahrt als Fliesenlegermeister und Volker Wohlfahrt als Kaufmann sowie Qualitätsbeauftragter QB-Bau, leiten somit in 3. Generation die Firma erfolgreich weiter.",
    "Unser Betrieb ist sowohl im Neubau-Sektor als auch im Bereich der Sanierung von Häusern und Wohnungen im Privatbereich und Industriebereich tätig. In der langen Tradition unseres Unternehmens wird stets allergrößter Wert auf die fachliche und pünktliche Arbeit bei der Verlegung verschiedenster Fliesen und Mosaike gelegt.",
  ],

  teamLabel: "Die Geschäftsführung",
  teamTitle: "Unser Team",
  team: [
    {
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzkwOTE1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Volker Wohlfahrt",
      name: "Volker Wohlfahrt",
      role: "Kaufmann & QB-Bau",
      description:
        "Geschäftsführer und geprüfter Qualitätsbeauftragter QB-Bau. Garantiert konsequente Qualitätsumsetzung.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzkwOTE1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Uwe Wohlfahrt",
      name: "Uwe Wohlfahrt",
      role: "Fliesenlegermeister",
      description:
        "Geschäftsführer und Fliesenlegermeister in 3. Generation. Persönliche Überwachung jeder Baustelle.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1624797432677-6f803a98acb3?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzkwOTE1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageAlt: "Yannik Wohlfahrt",
      name: "Yannik Wohlfahrt",
      role: "Technische Leitung",
      description:
        "Meisterliche Überwachung aller Baustellen. Jahrzehntelange Erfahrung in der fachgerechten Verlegung von Fliesen und Mosaiken.",
    },
  ],

  timelineLabel: "Meilensteine",
  timelineTitle: "Unser Weg",
  timeline: [
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
  ],

  valuesLabel: "Was uns ausmacht",
  valuesTitle: "Unsere Werte",
  values: [
    {
      icon: "award",
      title: "Qualität",
      description:
        "\u201EQualitätsbewusst und Termingerecht\u201C \u2013 unsere gelebte Firmenphilosophie seit 1954",
    },
    {
      icon: "users",
      title: "Kompetenz",
      description:
        "Ausschließlich hochqualifiziertes Personal unter persönlicher Meisterüberwachung",
    },
    {
      icon: "heart",
      title: "Kundennähe",
      description: "Individuelle Beratung durch den Firmeninhaber persönlich",
    },
    {
      icon: "shieldCheck",
      title: "Qualitätsmanagement",
      description:
        "Geprüfter Qualitätsbeauftragter QB-Bau garantiert konsequente Umsetzung",
    },
    {
      icon: "trendingUp",
      title: "Tradition",
      description:
        "Erfolgreich in 3. Generation – seit über 70 Jahren Meisterbetrieb",
    },
    {
      icon: "zap",
      title: "Flexibilität",
      description:
        "Schnelle Hilfe bei Notfällen wie Wasserschäden – ohne lange Wartezeiten",
    },
  ],

  statementHeadline: "\u201EQualitätsbewusst und Termingerecht\u201C",
  statementParagraphs: [
    "Um sicherzustellen, dass diese Firmenphilosophie immer gewährleistet ist, arbeiten wir ausschließlich mit hochqualifiziertem Personal. Jede Baustelle wird von Uwe Wohlfahrt persönlich oder von unserem Fliesenlegermeister überwacht.",
    "Im Jahre 2006 eröffneten wir unsere Ausstellung am Firmensitz in Pfullingen. Hier findet jeder Kunde die passenden Fliesen zu fairen Preisen – auch ausgefallene Fliesen, die es nicht \u201Ean jeder Ecke\u201C gibt. Nach telefonischer Terminvereinbarung werden unsere Kunden vom Firmeninhaber persönlich und ganz individuell beraten.",
  ],
};
