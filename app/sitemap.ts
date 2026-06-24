import type { MetadataRoute } from "next";
import { SITE_URL, pageSeo, type PageKey } from "@/site/config/seo";

// Statischer Export benoetigt diese Angabe fuer Routen-Handler.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
    .map((key) => ({
      url: `${SITE_URL}${pageSeo[key].path}`,
      lastModified: now,
      changeFrequency: key === "home" || key === "news" ? "weekly" : "monthly",
      priority: priorities[key] ?? 0.5,
    }));
}
