import type { Metadata } from "next";

/**
 * Zentrale SEO-Konfiguration.
 * Domain bei Bedarf hier anpassen – wird fuer canonical-URLs,
 * Open Graph, Sitemap und robots.txt verwendet.
 */
export const SITE_URL = "https://www.fliesen-wohlfahrt.de";
export const SITE_NAME = "Wohlfahrt & Wohlfahrt";
// Marke ausgeschrieben statt "W&W": nach dem vollen Namen wird gesucht, und
// er ist identisch mit `og:site_name` und dem JSON-LD-Betrieb.
export const SITE_TITLE_TEMPLATE = "%s | Wohlfahrt & Wohlfahrt";
// Ort und Gewerk gehoeren in den Titel der Startseite – er ist das staerkste
// Signal fuer lokale Suchen wie "Fliesen Pfullingen". Unter 60 Zeichen, damit
// Google ihn nicht kuerzt.
export const DEFAULT_TITLE =
  "Fliesen & Naturstein in Pfullingen | Wohlfahrt & Wohlfahrt";
export const DEFAULT_DESCRIPTION =
  "Exklusive Fliesen, professionelle Verlegung und individuelle Gestaltung — Wohlfahrt & Wohlfahrt. Meisterbetrieb seit 1954 in Pfullingen.";
export const OG_IMAGE =
  "https://a.storyblok.com/f/293408914760698/015bf0cbe8/og-image.jpg";
export const LOCALE = "de_DE";

// Nur Vercel-Vorschau-Deployments (Branch-/Preview-Builds) auf noindex.
const IS_PREVIEW = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV !== "production"
  : false;

/**
 * Indexierbar inkl. grosser Bildvorschau und unbegrenztem Snippet – erlaubt
 * Google (und KI-Uebersichten), Texte und Bilder vollstaendig zu zitieren.
 */
export const INDEXABLE_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
} satisfies Metadata["robots"];

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "showroom"
  | "references"
  | "products"
  | "news"
  | "career"
  | "contact"
  | "privacy"
  | "disclaimer"
  | "imprint";

interface PageSeo {
  /** Pfad mit fuehrendem und abschliessendem Slash (trailingSlash: true) */
  path: string;
  /** Kurzer Seitenname ohne Marken-Suffix – Brotkrumen, Open Graph, JSON-LD
   *  (Home nutzt den Default-Titel). */
  title?: string;
  /**
   * Suchmaschinen-Titel (`<title>`), falls er vom kurzen Seitennamen abweichen
   * soll. Traegt Gewerk und Ort, die im Seitennamen keinen Platz haben. Das
   * Marken-Suffix haengt das Template an – zusammen hoechstens ~60 Zeichen.
   */
  metaTitle?: string;
  description: string;
  /** Aus dem Index ausschliessen (z. B. rechtliche Seiten optional) */
  noindex?: boolean;
}

export const pageSeo: Record<PageKey, PageSeo> = {
  home: {
    path: "/",
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    path: "/ueber-uns/",
    title: "Über uns",
    metaTitle: "Über uns – Meisterbetrieb seit 1954",
    description:
      "Lernen Sie Wohlfahrt & Wohlfahrt kennen – Meisterbetrieb für Fliesen seit 1954 in Pfullingen. Tradition, Handwerk und moderne Gestaltung aus einer Hand.",
  },
  services: {
    path: "/leistungen/",
    title: "Leistungen",
    metaTitle: "Leistungen – Fliesenleger in Pfullingen",
    description:
      "Unsere Leistungen: Fliesenverlegung, Naturstein, Bäder, Abdichtung und individuelle Gestaltung vom Meisterbetrieb in Pfullingen.",
  },
  showroom: {
    path: "/ausstellung/",
    title: "Ausstellung",
    metaTitle: "Fliesenausstellung in Pfullingen",
    description:
      "Besuchen Sie unsere Fliesenausstellung in Pfullingen – entdecken Sie exklusive Fliesen, Naturstein und Designideen für Ihr Zuhause.",
  },
  references: {
    path: "/referenzen/",
    title: "Referenzen",
    metaTitle: "Referenzen – Bad- & Fliesenprojekte",
    description:
      "Referenzen und realisierte Projekte von Wohlfahrt & Wohlfahrt – Einblicke in unsere Fliesen-, Bad- und Natursteingestaltung.",
  },
  products: {
    path: "/produkte/",
    title: "Produkte",
    metaTitle: "Fliesen, Naturstein & Mosaik",
    description:
      "Hochwertige Fliesen, Naturstein und Mosaike führender Hersteller – entdecken Sie unser Produktsortiment bei Wohlfahrt & Wohlfahrt.",
  },
  news: {
    path: "/aktuelles/",
    title: "Aktuelles",
    description:
      "Aktuelles, Neuigkeiten und Trends rund um Fliesen, Naturstein und Badgestaltung von Wohlfahrt & Wohlfahrt.",
  },
  career: {
    path: "/karriere/",
    title: "Karriere",
    metaTitle: "Karriere – Jobs & Ausbildung",
    description:
      "Karriere bei Wohlfahrt & Wohlfahrt – aktuelle Stellenangebote und Ausbildungsplätze im Fliesenhandwerk in Pfullingen.",
  },
  contact: {
    path: "/kontakt/",
    title: "Kontakt",
    metaTitle: "Kontakt & Anfahrt Pfullingen",
    description:
      "Kontaktieren Sie Wohlfahrt & Wohlfahrt in Pfullingen – Telefon, E-Mail und Anfahrt. Wir beraten Sie gerne zu Fliesen und Bädern.",
  },
  privacy: {
    path: "/datenschutz/",
    title: "Datenschutz",
    description:
      "Datenschutzerklärung von Wohlfahrt & Wohlfahrt – Informationen zur Verarbeitung Ihrer personenbezogenen Daten.",
  },
  disclaimer: {
    path: "/haftungsausschluss/",
    title: "Haftungsausschluss",
    description: "Haftungsausschluss von Wohlfahrt & Wohlfahrt.",
  },
  imprint: {
    path: "/impressum/",
    title: "Impressum",
    description:
      "Impressum von Wohlfahrt & Wohlfahrt, Hinterer Spielbach 4, 72793 Pfullingen.",
  },
};

/** Erzeugt vollstaendige Next-Metadata fuer eine Seite inkl. canonical & Open Graph. */
export function buildMetadata(key: PageKey): Metadata {
  const page = pageSeo[key];
  const canonical = page.path;
  const title = page.metaTitle ?? page.title ?? DEFAULT_TITLE;
  const socialTitle = page.title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  // Vorschau-Build komplett auf noindex, damit nur die echte Domain in
  // Suchmaschinen landet. Next fuehrt `robots` nicht mit dem Layout zusammen,
  // sondern ersetzt es – die Snippet-/Bildvorschau-Angaben muessen deshalb
  // hier erneut stehen, sonst gelten sie nur fuer die Startseite.
  let robots: Metadata["robots"];
  if (IS_PREVIEW) {
    robots = { index: false, follow: false };
  } else if (page.noindex) {
    robots = { index: false, follow: true };
  } else {
    robots = INDEXABLE_ROBOTS;
  }

  return {
    title,
    description: page.description,
    alternates: { canonical },
    robots,
    openGraph: {
      type: "website",
      url: `${SITE_URL}${page.path}`,
      siteName: SITE_NAME,
      title: socialTitle,
      description: page.description,
      locale: LOCALE,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [OG_IMAGE],
    },
  };
}
