import {
  isStoryblokEnabled,
  storyblokClient,
  storyblokVersion,
} from "../lib/storyblok";
import { defaultSiteSettings } from "./site";
import type { SiteSettings } from "./types";

/**
 * Laedt die globalen Geschaeftsdaten.
 *
 * - Mit Storyblok-Token: holt die Story "settings" (global) per CDN-API und
 *   ueberlagert die lokalen Defaults mit den gepflegten Werten.
 * - Ohne Token / bei Fehlern: lokale Defaults (Seite bleibt funktionsfaehig).
 *
 * Wird zur Build-Zeit (RSC) aufgerufen -> Inhalte werden statisch eingebacken.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultSiteSettings;

  try {
    const { data } = await storyblokClient.get("cdn/stories/settings", {
      version: storyblokVersion,
    });
    const c = data?.story?.content;
    if (!c) return defaultSiteSettings;

    // Storyblok-Felder auf SiteSettings mappen. Leere Felder fallen auf die
    // Defaults zurueck, damit Teil-Pflege moeglich ist.
    const d = defaultSiteSettings;
    return {
      ...d,
      companyName: c.companyName || d.companyName,
      legalName: c.legalName || d.legalName,
      footerIntro: c.footerIntro || d.footerIntro,
      foundingYear: Number(c.foundingYear) || d.foundingYear,
      yearsExperience: Number(c.yearsExperience) || d.yearsExperience,
      street: c.street || d.street,
      zip: c.zip || d.zip,
      city: c.city || d.city,
      region: c.region || d.region,
      country: c.country || d.country,
      phone: c.phone || d.phone,
      phoneHref: c.phoneHref || d.phoneHref,
      email: c.email || d.email,
      openingHoursNote: c.openingHoursNote || d.openingHoursNote,
      social: {
        facebook: c.facebook || d.social.facebook,
        instagram: c.instagram || d.social.instagram,
      },
      mapEmbedUrl: c.mapEmbedUrl || d.mapEmbedUrl,
      // Strukturierte Listen nur uebernehmen, wenn vorhanden:
      openingHours:
        Array.isArray(c.openingHours) && c.openingHours.length > 0
          ? c.openingHours.map((o: Record<string, unknown>) => ({
              days: Array.isArray(o.days) ? (o.days as string[]) : [],
              opens: typeof o.opens === "string" ? o.opens : "",
              closes: typeof o.closes === "string" ? o.closes : "",
            }))
          : d.openingHours,
      geo:
        c.geo?.latitude && c.geo?.longitude
          ? {
              latitude: Number(c.geo.latitude),
              longitude: Number(c.geo.longitude),
            }
          : d.geo,
    };
  } catch (err) {
    // Im Fehlerfall niemals den Build brechen – lokale Defaults nutzen.
    console.warn("[storyblok] getSiteSettings fiel auf Defaults zurueck:", err);
    return defaultSiteSettings;
  }
}
