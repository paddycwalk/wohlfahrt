import type { Metadata } from "next";

/**
 * Zentrale SEO-Konfiguration.
 * Domain bei Bedarf hier anpassen – wird fuer canonical-URLs,
 * Open Graph, Sitemap und robots.txt verwendet.
 */
export const SITE_URL = "https://www.fliesen-wohlfahrt.de";
export const SITE_NAME = "Wohlfahrt & Wohlfahrt";
export const SITE_TITLE_TEMPLATE = "%s | W&W – Fliesen seit 1954";
export const DEFAULT_TITLE =
  "W&W – Fliesen neu gedacht | Meisterbetrieb seit 1954";
export const DEFAULT_DESCRIPTION =
  "Exklusive Fliesen, professionelle Verlegung und individuelle Gestaltung — Wohlfahrt & Wohlfahrt. Meisterbetrieb seit 1954 in Pfullingen.";
export const OG_IMAGE = "/og-image.jpg";
export const LOCALE = "de_DE";

// Vorschau-Build (GitHub Pages) erkennen: dort ist ein Base-Path gesetzt.
const IS_PREVIEW = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

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
  /** Seitentitel ohne Marken-Suffix (Home nutzt den Default-Titel) */
  title?: string;
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
    description:
      "Lernen Sie Wohlfahrt & Wohlfahrt kennen – Meisterbetrieb für Fliesen seit 1954 in Pfullingen. Tradition, Handwerk und moderne Gestaltung aus einer Hand.",
  },
  services: {
    path: "/leistungen/",
    title: "Leistungen",
    description:
      "Unsere Leistungen: Fliesenverlegung, Naturstein, Bäder, Abdichtung und individuelle Gestaltung vom Meisterbetrieb in Pfullingen.",
  },
  showroom: {
    path: "/ausstellung/",
    title: "Ausstellung",
    description:
      "Besuchen Sie unsere Fliesenausstellung in Pfullingen – entdecken Sie exklusive Fliesen, Naturstein und Designideen für Ihr Zuhause.",
  },
  references: {
    path: "/referenzen/",
    title: "Referenzen",
    description:
      "Referenzen und realisierte Projekte von Wohlfahrt & Wohlfahrt – Einblicke in unsere Fliesen-, Bad- und Natursteingestaltung.",
  },
  products: {
    path: "/produkte/",
    title: "Produkte",
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
    description:
      "Karriere bei Wohlfahrt & Wohlfahrt – aktuelle Stellenangebote und Ausbildungsplätze im Fliesenhandwerk in Pfullingen.",
  },
  contact: {
    path: "/kontakt/",
    title: "Kontakt",
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
  const title = page.title ?? DEFAULT_TITLE;

  // Vorschau-Build (GitHub Pages) komplett auf noindex, damit nur die echte
  // Domain (FTP) in Suchmaschinen landet.
  let robots: Metadata["robots"];
  if (IS_PREVIEW) {
    robots = { index: false, follow: false };
  } else if (page.noindex) {
    robots = { index: false, follow: true };
  } else {
    robots = { index: true, follow: true };
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
      title: page.title ? `${page.title} | ${SITE_NAME}` : DEFAULT_TITLE,
      description: page.description,
      locale: LOCALE,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title ? `${page.title} | ${SITE_NAME}` : DEFAULT_TITLE,
      description: page.description,
      images: [OG_IMAGE],
    },
  };
}
