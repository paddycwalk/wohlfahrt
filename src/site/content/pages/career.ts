/** Inhalt der Karriere-Seite (feldbasiert, in Storyblok editierbar). */

export type BenefitIcon = "award" | "trendingUp" | "users" | "heart";

export type CareerBenefit = {
  icon: BenefitIcon;
  title: string;
  description: string;
  editable?: string;
};

export type CareerOpening = {
  title: string;
  type: string;
  description: string;
  editable?: string;
};

export type CareerContent = {
  heroEyebrow: string;
  heroTitle: string;
  benefitsLabel: string;
  benefitsTitle: string;
  benefits: CareerBenefit[];
  openingsLabel: string;
  openingsTitle: string;
  openings: CareerOpening[];
  openingsButtonLabel: string;
  openingsButtonLink: string;
  initiativeEyebrow: string;
  initiativeTitle: string;
  initiativeText: string;
  initiativeButtonLabel: string;
  initiativeButtonLink: string;
  trainingEyebrow: string;
  trainingTitle: string;
  trainingText: string;
  trainingButtonLabel: string;
  trainingButtonLink: string;
  editable?: string;
};

export const defaultCareerContent: CareerContent = {
  heroEyebrow: "Karriere",
  heroTitle: "Werde Teil unseres Teams",
  benefitsLabel: "Vorteile",
  benefitsTitle: "Warum Wohlfahrt & Wohlfahrt?",
  benefits: [
    {
      icon: "award",
      title: "Faire Bezahlung",
      description: "Attraktive Vergütung und Sonderzahlungen",
    },
    {
      icon: "trendingUp",
      title: "Weiterbildung",
      description: "Regelmäßige Schulungen und Entwicklungsmöglichkeiten",
    },
    {
      icon: "users",
      title: "Teamgeist",
      description: "Familiäres Arbeitsklima und starker Zusammenhalt",
    },
    {
      icon: "heart",
      title: "Work-Life-Balance",
      description: "Geregelte Arbeitszeiten und flexible Urlaubsplanung",
    },
  ],
  openingsLabel: "Stellenangebote",
  openingsTitle: "Offene Positionen",
  openings: [
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
  ],
  openingsButtonLabel: "Bewerben",
  openingsButtonLink: "/kontakt",
  initiativeEyebrow: "Initiativ",
  initiativeTitle: "Initiativbewerbung",
  initiativeText:
    "Keine passende Stelle? Senden Sie uns gerne eine Initiativbewerbung. Wir sind immer auf der Suche nach talentierten Mitarbeitern.",
  initiativeButtonLabel: "Initiativ bewerben",
  initiativeButtonLink: "/kontakt",
  trainingEyebrow: "Nachwuchs",
  trainingTitle: "Ausbildung bei uns",
  trainingText:
    "Starte deine Karriere mit einer hochwertigen Ausbildung in unserem Meisterbetrieb. Erfahrene Ausbilder, vielseitige Projekte, beste Übernahmechancen.",
  trainingButtonLabel: "Mehr erfahren",
  trainingButtonLink: "/kontakt",
};
