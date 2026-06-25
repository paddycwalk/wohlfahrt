/** Inhalt der Ausstellungs-Seite (feldbasiert, in Storyblok editierbar). */

export type ShowroomFeature = {
  title: string;
  description: string;
  editable?: string;
};

export type ShowroomContent = {
  heroImage: string;
  heroEyebrow: string;
  heroTitle: string;
  infoLabel: string;
  infoTitle: string;
  infoParagraph1: string;
  infoParagraph2: string;
  featuresLabel: string;
  featuresTitle: string;
  features: ShowroomFeature[];
  featuresButtonLabel: string;
  featuresButtonLink: string;
  editable?: string;
};

export const defaultShowroomContent: ShowroomContent = {
  heroImage: "/assets/c933bf73ff901e67a7958cdfebb4d489a28ca49e.webp",
  heroEyebrow: "Inspiration",
  heroTitle: "Ausstellung",
  infoLabel: "Besuchen Sie uns",
  infoTitle: "Erleben Sie Qualität",
  infoParagraph1:
    "Besuchen Sie unsere großzügige Ausstellung und lassen Sie sich von der Vielfalt an Fliesen und Gestaltungsmöglichkeiten inspirieren.",
  infoParagraph2:
    "Jedes Jahr besuchen wir die Fliesenmesse in Bologna, um die aktuellsten und schönsten Fliesen für Sie zu entdecken.",
  featuresLabel: "Ihre Vorteile",
  featuresTitle: "Was Sie erwartet",
  features: [
    {
      title: "Große Auswahl",
      description:
        "Über 1000 verschiedene Fliesenmuster und Terrassenplatten für Innen- und Außenbereich",
    },
    {
      title: "Persönliche Beratung",
      description: "Fachkundige Beratung durch unsere erfahrenen Mitarbeiter",
    },
    {
      title: "Inspiration",
      description: "Musterbäder und Rauminszenierungen für neue Ideen",
    },
  ],
  featuresButtonLabel: "Termin vereinbaren",
  featuresButtonLink: "/kontakt",
};
