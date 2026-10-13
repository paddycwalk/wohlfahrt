import { DEFAULT_DESCRIPTION, SITE_URL, pageSeo, type PageKey } from "@/site/config/seo";
import { AREA_SERVED } from "@/site/config/jsonld";
import { getServicesContent, getSiteSettings } from "@/site/content";
import { CLOSED_LABEL, openingHoursRows } from "@/site/content/site";

/**
 * /llms.txt – Kurzprofil des Betriebs fuer KI-Suchen (https://llmstxt.org).
 *
 * Bewusst aus denselben Quellen erzeugt wie die Seite selbst (Storyblok-
 * Settings, Leistungen, SEO-Konfiguration) statt als statische Datei: eine
 * in Storyblok geaenderte Oeffnungszeit oder Telefonnummer stimmt hier sonst
 * nach kurzer Zeit nicht mehr – und KI-Antworten zitieren sie trotzdem.
 */

const CONTENT_PAGES: PageKey[] = [
  "home",
  "about",
  "services",
  "products",
  "showroom",
  "references",
  "career",
  "contact",
  "news",
];
const LEGAL_PAGES: PageKey[] = ["imprint", "privacy", "disclaimer"];

function pageLink(key: PageKey): string {
  const page = pageSeo[key];
  return `[${page.title ?? "Startseite"}](${SITE_URL}${page.path})`;
}

export async function GET() {
  const [s, services] = await Promise.all([
    getSiteSettings(),
    getServicesContent(),
  ]);

  const hours = openingHoursRows(s).map(
    (row) =>
      `- ${row.label} ${row.closed ? CLOSED_LABEL : `${row.slots.join(" und ")} Uhr`}`,
  );

  const lines = [
    `# ${s.companyName}`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    "## Unternehmen",
    "",
    `- Name: ${s.companyName} (${s.legalName})`,
    `- Gegründet: ${s.foundingYear}`,
    `- Adresse: ${s.street}, ${s.zip} ${s.city}, Deutschland`,
    `- Telefon: ${s.phone} (${s.phoneHref})`,
    `- E-Mail: ${s.email}`,
    `- Website: ${SITE_URL}/`,
    `- Einzugsgebiet: ${AREA_SERVED.map((area) => area.name).join(", ")}`,
    "",
    "## Öffnungszeiten",
    "",
    ...hours,
    ...(s.openingHoursNote ? [`- ${s.openingHoursNote}`] : []),
    "",
    "## Leistungen",
    "",
    ...services.services.map(
      (service) => `- ${service.title}: ${service.description}`,
    ),
    "",
    "## Seiten",
    "",
    ...CONTENT_PAGES.map(
      (key) => `- ${pageLink(key)}: ${pageSeo[key].description}`,
    ),
    "",
    "## Rechtliches",
    "",
    ...LEGAL_PAGES.map((key) => `- ${pageLink(key)}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
