/**
 * Feldbasiertes Content-Modell der Seite "Produkte" (Products).
 *
 * Hinweis: Das Kategorie-Layout ist fest auf 5 Kacheln ausgelegt
 * (Reihe 1: 2 Kacheln, Reihe 2: 3 Kacheln).
 */

export interface ProductCategory {
  title: string;
  description: string;
  image: string;
  /** Storyblok Click-to-Edit (nur im Editor gesetzt). */
  editable?: string;
}

export interface ProductsContent {
  // Hero
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;

  // Aktions-Banner
  bannerMarqueeText: string;
  bannerBadge: string;
  bannerHeadlinePre: string;
  bannerHeadlineItalic: string;
  bannerFeatures: string[];
  bannerButtonLabel: string;
  bannerButtonLink: string;

  // Kategorien
  categoriesLabel: string;
  categoriesTitle: string;
  categories: ProductCategory[];

  // CTA
  ctaTitle: string;
  ctaText: string;
  ctaButtonLabel: string;
  ctaButtonLink: string;

  /** Storyblok Click-to-Edit der Seiten-Story (nur im Editor gesetzt). */
  editable?: string;
}

export const defaultProductsContent: ProductsContent = {
  heroEyebrow: "Produkte",
  heroTitle: "Premium Fliesen",
  heroSubtitle: "Von führenden Herstellern — kuratiert für höchste Ansprüche",

  bannerMarqueeText: "NEU · 2026 · KOLLEKTION ·",
  bannerBadge: "Neu · Frühjahr 2026",
  bannerHeadlinePre: "Neue Kollektionen",
  bannerHeadlineItalic: "eingetroffen",
  bannerFeatures: [
    "Großformat-Slabs bis 320 × 160 cm",
    "Holzdekor XXL",
    "Handgefertigte Mosaike",
  ],
  bannerButtonLabel: "Jetzt entdecken",
  bannerButtonLink: "/ausstellung",

  categoriesLabel: "Sortiment",
  categoriesTitle: "Unsere Produktkategorien",
  categories: [
    {
      title: "Wandfliesen",
      description:
        "Hochwertige Wandfliesen in verschiedenen Formaten, Farben und Oberflächen",
      image:
        "/assets/produkt-wandfliesen.webp",
    },
    {
      title: "Bodenfliesen",
      description:
        "Robuste und elegante Bodenfliesen für Innen- und Außenbereiche",
      image:
        "/assets/produkt-bodenfliesen.webp",
    },
    {
      title: "Großformatfliesen",
      description: "Moderne Großformatfliesen für ein nahtloses Design",
      image:
        "/assets/produkt-grossformat.webp",
    },
    {
      title: "Mosaik",
      description: "Kreative Mosaikfliesen für individuelle Akzente",
      image:
        "/assets/produkt-mosaik.webp",
    },
    {
      title: "Feinsteinzeug",
      description: "Pflegeleichtes Feinsteinzeug in Holz- und Betonoptik",
      image:
        "/assets/produkt-feinsteinzeug.webp",
    },
  ],

  ctaTitle: "Erleben Sie unsere Produkte live",
  ctaText:
    "Besuchen Sie unsere Ausstellung und lassen Sie sich persönlich beraten.",
  ctaButtonLabel: "Ausstellung besuchen",
  ctaButtonLink: "/ausstellung",
};
