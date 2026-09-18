import { SITE_NAME, SITE_URL, pageSeo, type PageKey } from "./seo";

/**
 * Strukturierte Daten (schema.org / JSON-LD)
 * =========================================
 *
 * Zweck ist doppelt: klassische Rich Results bei Google *und* maschinenlesbare
 * Fakten fuer KI-Suchen (ChatGPT, Perplexity, Gemini). Deshalb sind alle
 * Knoten ueber stabile `@id`s miteinander verbunden, statt die Firmendaten je
 * Seite zu wiederholen:
 *
 *   <SITE_URL>/#business   – der Betrieb (app/layout.tsx)
 *   <SITE_URL>/#website    – die Website selbst
 *   <url>#breadcrumb       – der Pfad zur jeweiligen Seite
 *   <url>#webpage          – die Seite selbst
 *
 * So kann jede Unterseite per `{ "@id": … }` auf den Betrieb verweisen, und
 * Crawler fuehren die Angaben zu einer Entitaet zusammen.
 */

/** Stabile Knoten-IDs, auf die Unterseiten verweisen. */
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Vollstaendige URL einer Seite (mit abschliessendem Slash, wie die Sitemap). */
export function pageUrl(key: PageKey): string {
  return `${SITE_URL}${pageSeo[key].path}`;
}

/**
 * Die Website als eigene Entitaet – verknuepft Domain, Name, Sprache und
 * Herausgeber. Liegt im Root-Layout und gilt damit fuer alle Seiten.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "de-DE",
    publisher: { "@id": BUSINESS_ID },
  };
}

/**
 * Brotkrumen-Pfad "Startseite › <Seite>".
 *
 * Google zeigt den Pfad statt der nackten URL im Suchergebnis an. Die
 * Startseite bekommt keine Brotkrumen (sie ist die Wurzel) – dort liefert die
 * Funktion `null`.
 */
export function breadcrumbJsonLd(key: PageKey) {
  if (key === "home") return null;
  const page = pageSeo[key];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl(key)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title ?? SITE_NAME,
        item: pageUrl(key),
      },
    ],
  };
}

/**
 * Die Seite selbst als `WebPage` (bzw. spezialisierter Untertyp), verknuepft
 * mit Website, Betrieb und Brotkrumen. Der Untertyp hilft KI-Suchen beim
 * Einordnen: eine `ContactPage` beantwortet andere Fragen als eine `AboutPage`.
 */
export function webPageJsonLd(
  key: PageKey,
  type:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "ProfilePage" = "WebPage",
) {
  const page = pageSeo[key];
  const url = pageUrl(key);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: page.title ? `${page.title} | ${SITE_NAME}` : SITE_NAME,
    description: page.description,
    inLanguage: "de-DE",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    ...(key === "home" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };
}

/** Mehrere Knoten als ein `@graph` buendeln – ein Script-Tag statt vieler. */
export function graph(nodes: (object | null | undefined)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean).map((node) => {
      // Der Kontext gehoert nur einmal an die Wurzel des Graphen.
      const { "@context": _ctx, ...rest } = node as Record<string, unknown>;
      return rest;
    }),
  };
}

/**
 * Deutsche Datumsangaben aus dem CMS ("13. Juli 2026", "September 2025") in
 * ISO-8601 uebersetzen, wie schema.org es verlangt.
 *
 * Bewusst tolerant: laesst sich ein Wert nicht lesen, kommt `undefined`
 * zurueck und das Feld entfaellt – lieber keine Angabe als eine falsche.
 */
const MONTHS: Record<string, number> = {
  januar: 1,
  februar: 2,
  "märz": 3,
  maerz: 3,
  april: 4,
  mai: 5,
  juni: 6,
  juli: 7,
  august: 8,
  september: 9,
  oktober: 10,
  november: 11,
  dezember: 12,
};

export function germanDateToIso(value: string): string | undefined {
  const text = value.trim().toLowerCase();
  const withDay = /^(\d{1,2})\.\s*([a-zäöü]+)\s+(\d{4})$/.exec(text);
  if (withDay) {
    const month = MONTHS[withDay[2]];
    if (!month) return undefined;
    return `${withDay[3]}-${pad(month)}-${pad(Number(withDay[1]))}`;
  }
  const monthOnly = /^([a-zäöü]+)\s+(\d{4})$/.exec(text);
  if (monthOnly) {
    const month = MONTHS[monthOnly[1]];
    if (!month) return undefined;
    return `${monthOnly[2]}-${pad(month)}`;
  }
  // Bereits ISO gepflegt (z. B. direkt aus einem Storyblok-Datumsfeld).
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(text)) return text;
  return undefined;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
