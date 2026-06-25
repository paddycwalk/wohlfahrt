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
        "https://images.unsplash.com/photo-1685040339272-e387e49f712b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNlcmFtaWMlMjB3YWxsJTIwdGlsZXMlMjBiYXRocm9vbSUyMHZlcnRpY2FsfGVufDF8fHx8MTc3NTgyOTEwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Bodenfliesen",
      description:
        "Robuste und elegante Bodenfliesen für Innen- und Außenbereiche",
      image:
        "https://images.unsplash.com/photo-1593981663640-993a5134d8fd?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc3RvbmUlMjBmbG9vciUyMHRpbGVzJTIwaGFsbHdheSUyMGludGVyaW9yfGVufDF8fHx8MTc3NTgyOTEwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Großformatfliesen",
      description: "Moderne Großformatfliesen für ein nahtloses Design",
      image:
        "https://images.unsplash.com/photo-1722153148937-c7abc6cd3361?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMGZvcm1hdCUyMGNlcmFtaWMlMjBzbGFiJTIwbW9kZXJuJTIwYmF0aHJvb218ZW58MXx8fHwxNzc1ODI5MTA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Mosaik",
      description: "Kreative Mosaikfliesen für individuelle Akzente",
      image:
        "https://images.unsplash.com/photo-1767306683428-e80b2b4e52c4?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NhaWMlMjB0aWxlJTIwcGF0dGVybiUyMGRlY29yYXRpdmUlMjB3YWxsJTIwZGV0YWlsfGVufDF8fHx8MTc3NTgyOTEwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Feinsteinzeug",
      description: "Pflegeleichtes Feinsteinzeug in Holz- und Betonoptik",
      image:
        "https://images.unsplash.com/photo-1769736438943-3c57cbd02c22?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZWZmZWN0JTIwcG9yY2VsYWluJTIwdGlsZSUyMGZsb29yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzU4MjkxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],

  ctaTitle: "Erleben Sie unsere Produkte live",
  ctaText:
    "Besuchen Sie unsere Ausstellung und lassen Sie sich persönlich beraten.",
  ctaButtonLabel: "Ausstellung besuchen",
  ctaButtonLink: "/ausstellung",
};
