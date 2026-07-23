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
      date: "13. Juli 2026",
      title: "Großformatfliesen: zeitlos und stilvoll",
      excerpt:
        "Mit der Verlegung moderner 80 × 80 cm Bodenfliesen im Großformat ist ein Raum entstanden, der Eleganz und Funktionalität vereint. Die großzügigen Formate sorgen für ein ruhiges, harmonisches Gesamtbild und verleihen dem Raum eine hochwertige, zeitlose Ausstrahlung.",
      category: "Referenzen",
    },
    {
      date: "6. Juli 2026",
      title: "Sanierung der WC-Anlagen im Friedrich-Schiller-Gymnasium",
      excerpt:
        "Aus Alt mach Neu: Mit viel Präzision und handwerklichem Können durften wir die Fliesenarbeiten bei der Sanierung der WC-Anlagen im Friedrich-Schiller-Gymnasium ausführen. Entstanden sind moderne, hochwertige und langlebige Sanitärbereiche, die Funktionalität und ansprechendes Design verbinden.",
      category: "Referenzen",
    },
    {
      date: "9. Juni 2026",
      title: "Holzoptikfliesen: Natürlichkeit trifft Funktionalität",
      excerpt:
        "Holzoptikfliesen verbinden die warme Ausstrahlung von Holz mit der Pflegeleichtigkeit von Keramik: täuschend echte Optik, langlebig, unempfindlich gegen Feuchtigkeit und ideal für Fußbodenheizungen – perfekt für Wohnräume und Bäder.",
      category: "Produkte",
    },
    {
      date: "September 2025",
      title: "Yannik Wohlfahrt ist die vierte Meistergeneration",
      excerpt:
        "Große Freude im 1954 gegründeten Familienbetrieb: Yannik Wohlfahrt hat im September 2025 seine Meisterprüfung im Fliesenlegerhandwerk erfolgreich abgelegt und führt damit als vierte Generation die Firmentradition fort. Für die Prüfung plante, baute und verflieste er eine voll funktionsfähige japanische Küche.",
      category: "Unternehmen",
    },
  ],
};
