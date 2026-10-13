import type { MetadataRoute } from "next";
import { SITE_URL, pageSeo, type PageKey } from "@/site/config/seo";
import { getStoryPublishedDates } from "@/site/content";

// Kein `force-static` mehr: die Sitemap wird pro Abruf erzeugt (der
// Storyblok-Client fragt ohne Cache), ein in Storyblok veroeffentlichtes
// Aenderungsdatum steht also ohne neues Deployment darin.

/** Storyblok-Story je Seite – Quelle fuer das Aenderungsdatum. */
const STORY_SLUG: Record<PageKey, string> = {
  home: "home",
  about: "ueber-uns",
  services: "leistungen",
  showroom: "ausstellung",
  references: "referenzen",
  products: "produkte",
  news: "aktuelles",
  career: "karriere",
  contact: "kontakt",
  privacy: "datenschutz",
  disclaimer: "haftungsausschluss",
  imprint: "impressum",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = await getStoryPublishedDates();

  // Prioritaeten je nach Wichtigkeit der Seite
  const priorities: Partial<Record<PageKey, number>> = {
    home: 1,
    services: 0.9,
    showroom: 0.9,
    products: 0.8,
    references: 0.8,
    about: 0.7,
    contact: 0.7,
    career: 0.6,
    news: 0.6,
    imprint: 0.3,
    privacy: 0.3,
    disclaimer: 0.3,
  };

  return (Object.keys(pageSeo) as PageKey[])
    .filter((key) => !pageSeo[key].noindex)
    .map((key) => {
      // Google wertet `lastmod` nur, solange es verlaesslich ist. Das echte
      // Veroeffentlichungsdatum der Story statt der Build-Zeit – und lieber
      // keine Angabe als eine, die bei jedem Deployment "heute" meldet.
      const lastModified = published.get(STORY_SLUG[key]);
      return {
        url: `${SITE_URL}${pageSeo[key].path}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency:
          key === "home" || key === "news" ? "weekly" : "monthly",
        priority: priorities[key] ?? 0.5,
      };
    });
}
