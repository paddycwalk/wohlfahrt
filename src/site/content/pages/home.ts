/**
 * Inhaltsmodell der Startseite (feldbasiert).
 *
 * Alle Texte/Bilder/Buttons der Startseite sind hier als Felder beschrieben.
 * `defaultHomeContent` enthaelt die aktuellen Inhalte als lokalen Fallback –
 * die Seite funktioniert damit auch ohne Storyblok. Sobald die Storyblok-Story
 * "home" gepflegt ist, ueberlagern deren Werte die Defaults
 * (siehe `getHomeContent` in `../index.ts`).
 */

import { YEARS_TOKEN } from "../../lib/years";

export interface CtaLink {
  label: string;
  /** Interner Pfad, z. B. "/kontakt". */
  link: string;
}

export interface StatItem {
  /**
   * Zahl als Zeichenkette, damit hier auch `{{jahre}}` stehen kann
   * (siehe `src/site/lib/years.ts`). Die Anzeige parst den Wert.
   */
  value: string;
  suffix: string;
  label: string;
  editable?: string;
}

/** Icon-Auswahl fuer Service-Karten (gemappt in der Komponente). */
export type ServiceIcon = "layers" | "home" | "sparkles" | "award";

export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  description: string;
  editable?: string;
}

export interface HomeContent {
  // Hero
  heroImage: string;
  heroImageAlt: string;
  heroLine1: string;
  heroAccentWord: string;
  heroLine2Suffix: string;
  heroSubtitle: string;
  heroCtaPrimary: CtaLink;
  heroCtaSecondary: CtaLink;

  // Stats
  stats: StatItem[];

  // Services
  servicesLabel: string;
  servicesTitle: string;
  servicesIntro: string;
  services: ServiceItem[];

  // Split "Tradition"
  traditionImage: string;
  traditionImageAlt: string;
  traditionTitle: string;
  traditionText: string;
  traditionItems: string[];
  traditionCta: CtaLink;

  // Tradition/Modern-Vergleich (Vorher-Nachher-Regler)
  traditionOldImage: string;
  traditionOldImageAlt: string;
  traditionOldLabel: string;
  traditionNewImage: string;
  traditionNewImageAlt: string;
  traditionNewLabel: string;

  // Full-width Statement
  statementImage: string;
  statementImageAlt: string;
  statementEyebrow: string;
  statementHeadline: string;
  statementCta: CtaLink;

  // Split "Showroom"
  showroomImage: string;
  showroomImageAlt: string;
  showroomTitle: string;
  showroomText: string;
  showroomCta: CtaLink;

  // Final CTA
  ctaHeadlinePre: string;
  ctaHeadlineAccent: string;
  ctaText: string;
  ctaButton: CtaLink;

  /** Storyblok Click-to-Edit der Seiten-Story (nur im Editor gesetzt). */
  editable?: string;
}

export const defaultHomeContent: HomeContent = {
  heroImage:
    "https://a.storyblok.com/f/293408914760698/fcc7765c74/home-hero.webp",
  heroImageAlt: "Edler Wohnbereich mit großformatigen Marmoroptik-Fliesen",
  heroLine1: "Fliesen",
  heroAccentWord: "neu",
  heroLine2Suffix: "gedacht",
  heroSubtitle:
    "Exklusive Fliesen, professionelle Verlegung und individuelle Gestaltung — Wohlfahrt & Wohlfahrt.",
  heroCtaPrimary: { label: "Projekt starten", link: "/kontakt" },
  heroCtaSecondary: { label: "Ausstellung", link: "/ausstellung" },

  stats: [
    { value: YEARS_TOKEN, suffix: "+", label: "Jahre Erfahrung" },
    { value: "1000", suffix: "+", label: "Projekte" },
    { value: "12", suffix: "+", label: "Mitarbeiter" },
    { value: "500", suffix: "+", label: "Fliesenmuster" },
  ],

  servicesLabel: "Kompetenzen",
  servicesTitle: "Was wir für Sie tun",
  servicesIntro:
    "Von der ersten Idee bis zum letzten Handgriff — wir vereinen Tradition mit Innovation und schaffen Räume, die begeistern.",
  services: [
    {
      icon: "layers",
      title: "Professionelle Verlegung",
      description:
        "Fachgerechte Verlegung aller Fliesenarten durch unsere erfahrenen Mitarbeiter.",
    },
    {
      icon: "home",
      title: "Komplettlösungen",
      description:
        "Von der Planung bis zur Fertigstellung — alles aus einer Hand.",
    },
    {
      icon: "sparkles",
      title: "Premium Materialien",
      description: "Hochwertige Fliesen von führenden Herstellern.",
    },
    {
      icon: "award",
      title: `Über ${YEARS_TOKEN} Jahre Erfahrung`,
      description:
        "Tradition trifft Innovation für höchste Qualitätsansprüche.",
    },
  ],

  traditionImage:
    "https://a.storyblok.com/f/293408914760698/295d5a15d5/home-tradition.webp",
  traditionImageAlt: "Modernes Wohnzimmer mit warmen Holzoptik-Fliesen",
  traditionTitle: "Tradition trifft Moderne",
  traditionText: `Seit über ${YEARS_TOKEN} Jahren steht der Name Wohlfahrt & Wohlfahrt für Qualität und Zuverlässigkeit. Als familiengeführter Meisterbetrieb verbinden wir traditionelles Handwerk mit modernster Technik.`,
  traditionItems: [
    "Meisterqualität seit 1954",
    "Familiengeführter Betrieb",
    "Modernste Verlegetechnik",
  ],
  traditionCta: { label: "Mehr über uns", link: "/ueber-uns" },

  traditionOldImage:
    "https://a.storyblok.com/f/293408914760698/1760x2200/83ca8f947b/csa-sable-beige120120-jardin-04-living.webp",
  traditionOldImageAlt:
    "Traditionell gestalteter Wohnraum mit dekorativen Fliesen",
  traditionOldLabel: "Traditionell",
  traditionNewImage:
    "https://a.storyblok.com/f/293408914760698/2200x2200/3cace53a74/csa-mystic-beige8989-kry-living.webp",
  traditionNewImageAlt:
    "Moderner Wohnraum mit großformatigen Marmoroptik-Fliesen",
  traditionNewLabel: "Modern",

  statementImage:
    "https://a.storyblok.com/f/293408914760698/1ea2b06624/home-statement.webp",
  statementImageAlt: "Dunkle Feinsteinzeug-Oberfläche im Detail",
  statementEyebrow: "Unser Versprechen",
  statementHeadline: "Perfektion in jedem Detail",
  statementCta: { label: "Leistungen entdecken", link: "/leistungen" },

  showroomImage:
    "https://a.storyblok.com/f/293408914760698/7e8eeaba90/c933bf73ff901e67a7958cdfebb4d489a28ca49e.webp",
  showroomImageAlt: "Wohlfahrt & Wohlfahrt Ausstellung",
  showroomTitle: "Besuchen Sie unsere Ausstellung",
  showroomText:
    "Entdecken Sie Inspiration in unserer modernen Ausstellung. Erleben Sie die Vielfalt an Fliesen und Gestaltungsmöglichkeiten hautnah.",
  showroomCta: { label: "Ausstellung entdecken", link: "/ausstellung" },

  ctaHeadlinePre: "Bereit für",
  ctaHeadlineAccent: "Ihr Projekt?",
  ctaText:
    "Lassen Sie uns gemeinsam Ihre Visionen verwirklichen. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.",
  ctaButton: { label: "Kontakt aufnehmen", link: "/kontakt" },
};
