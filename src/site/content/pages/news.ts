/** Inhalt der Aktuelles-Seite (feldbasiert, in Storyblok editierbar). */

export type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  editable?: string;
};

export type NewsContent = {
  heroEyebrow: string;
  heroTitle: string;
  items: NewsItem[];
  editable?: string;
};

export const defaultNewsContent: NewsContent = {
  heroEyebrow: "Aktuelles",
  heroTitle: "Neuigkeiten",
  items: [
    {
      date: "September 2025",
      title: "Yannik Wohlfahrt ist die vierte Meistergeneration",
      excerpt:
        "Große Freude im 1954 gegründeten Familienbetrieb: Yannik Wohlfahrt hat im September 2025 seine Meisterprüfung im Fliesenlegerhandwerk erfolgreich abgelegt und führt damit als vierte Generation die Firmentradition fort. Für die Prüfung plante, baute und verflieste er eine voll funktionsfähige japanische Küche.",
      category: "Unternehmen",
    },
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
  ],
};
