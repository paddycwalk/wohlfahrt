/**
 * Feldbasiertes Content-Modell der Seite "Produkte" (Products).
 *
 * Hinweis: Das Kategorie-Layout ist fest auf 5 Kacheln ausgelegt
 * (Reihe 1: 2 Kacheln, Reihe 2: 3 Kacheln).
 *
 * Die Serien-Galerien (`collections`) werden aus den gelieferten Bildordnern
 * generiert und liegen in `products-collections.ts` (regenerierbar).
 */

import { productCollections } from "./products-collections";

/**
 * Ein Eintrag im Highlight-Banner (Aktions-Banner unter dem Hero).
 *
 * Mehrere Eintraege werden untereinander gestapelt und durch eine Linie
 * getrennt. Leere Felder werden ausgeblendet, ein Eintrag braucht also nicht
 * vollstaendig gepflegt zu sein.
 */
export interface ProductHighlight {
  /** Ueberzeile neben dem pulsierenden Punkt, z. B. "Neu · Frühjahr 2026". */
  badge: string;
  /** Erster, aufrechter Teil der Ueberschrift. */
  headlinePre: string;
  /** Zweiter, kursiver Teil der Ueberschrift. Optional. */
  headlineItalic: string;
  /** Stichpunkte unter der Ueberschrift. */
  features: string[];
  /** Button-Text. Leer = kein Button. */
  buttonLabel: string;
  buttonLink: string;
  /** Bild links im Banner (4:3-Rahmen). Leer = Eintrag ohne Bild. */
  image: string;
  /** Storyblok Click-to-Edit (nur im Editor gesetzt). */
  editable?: string;
}

export interface ProductCategory {
  title: string;
  description: string;
  image: string;
  /** Storyblok Click-to-Edit (nur im Editor gesetzt). */
  editable?: string;
}

/** Eine Produktserie mit Bildergalerie (Ordnername + WebP-Bilder). */
export interface ProductSeries {
  /** Serien-/Ordnername, z. B. "Serie Loft" oder "HR Ambienti BERGSTONE". */
  title: string;
  /**
   * Art.-Nr. der Serie, wird auf der Kachel hinter dem Titel angezeigt.
   * Schema: `WF-<OD|ID>-<lfd. Nr. in 10er-Schritten>`. Leer = wird ausgeblendet.
   */
  articleNumber?: string;
  /** Galeriebilder (WebP, Storyblok-CDN). Das erste Bild dient als Cover. */
  images: string[];
  /** Storyblok Click-to-Edit (nur im Editor gesetzt). */
  editable?: string;
}

/** Eine Kollektions-Gruppe (z. B. "HR Ambienti", "Outdoor", "Indoor"). */
export interface ProductCollectionGroup {
  /** Gruppen-Ueberschrift. */
  label: string;
  series: ProductSeries[];
  /** Storyblok Click-to-Edit (nur im Editor gesetzt). */
  editable?: string;
}

export interface ProductsContent {
  // Hero
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;

  // Aktions-Banner (Highlight-Banner)
  /** Lauftext im Hintergrund des Banners. */
  bannerMarqueeText: string;
  /** Beliebig viele Highlights, werden untereinander ausgegeben. */
  bannerItems: ProductHighlight[];

  // Kategorien
  categoriesLabel: string;
  categoriesTitle: string;
  categories: ProductCategory[];

  // Kollektionen (Serien-Galerien)
  collectionsLabel: string;
  collectionsTitle: string;
  collectionsIntro: string;
  collections: ProductCollectionGroup[];

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
  bannerItems: [
    {
      badge: "Neu · Frühjahr 2026",
      headlinePre: "Neue Kollektionen",
      headlineItalic: "eingetroffen",
      features: [
        "Großformat-Slabs bis 320 × 160 cm",
        "Holzdekor XXL",
        "Handgefertigte Mosaike",
      ],
      buttonLabel: "Jetzt entdecken",
      buttonLink: "/ausstellung",
      image:
        "https://a.storyblok.com/f/293408914760698/2200x1456/477def9462/01-csa-timewood-brown20120-form-cement60180-silkystone-sand9090.webp",
    },
  ],

  categoriesLabel: "Sortiment",
  categoriesTitle: "Unsere Produktkategorien",
  categories: [
    {
      title: "Wandfliesen",
      description:
        "Hochwertige Wandfliesen in verschiedenen Formaten, Farben und Oberflächen",
      image:
        "https://a.storyblok.com/f/293408914760698/e5b8fc4f67/produkt-wandfliesen.webp",
    },
    {
      title: "Bodenfliesen",
      description:
        "Robuste und elegante Bodenfliesen für Innen- und Außenbereiche",
      image:
        "https://a.storyblok.com/f/293408914760698/d782c57e8b/produkt-bodenfliesen.webp",
    },
    {
      title: "Großformatfliesen",
      description: "Moderne Großformatfliesen für ein nahtloses Design",
      image:
        "https://a.storyblok.com/f/293408914760698/cd99d74afd/produkt-grossformat.webp",
    },
    {
      title: "Mosaik",
      description: "Kreative Mosaikfliesen für individuelle Akzente",
      image:
        "https://a.storyblok.com/f/293408914760698/f8c03e8040/produkt-mosaik.webp",
    },
    {
      title: "Feinsteinzeug",
      description: "Pflegeleichtes Feinsteinzeug in Holz- und Betonoptik",
      image:
        "https://a.storyblok.com/f/293408914760698/96de529bc1/produkt-feinsteinzeug.webp",
    },
  ],

  collectionsLabel: "Kollektionen",
  collectionsTitle: "Auswahl aus unseren Kollektionen",
  collectionsIntro:
    "Ausgewählte Serien aus unserem Sortiment — jede mit eigener Bildergalerie. Bild anklicken zum Vergrößern.",
  collections: productCollections,

  ctaTitle: "Erleben Sie unsere Produkte live",
  ctaText:
    "Besuchen Sie unsere Ausstellung und lassen Sie sich persönlich beraten.",
  ctaButtonLabel: "Ausstellung besuchen",
  ctaButtonLink: "/ausstellung",
};
