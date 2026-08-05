import { isStoryblokEnabled, storyblokClient } from "../lib/storyblok";
import { resolveYearTokens, yearsSinceFounding } from "../lib/years";
import { headers } from "next/headers";
import { cache } from "react";
import { WEEKDAYS, defaultSiteSettings } from "./site";
import type { Geo, NavItem, OpeningDay, SiteSettings } from "./types";
import { defaultHomeContent } from "./pages/home";
import type {
  CtaLink,
  HomeContent,
  ServiceIcon,
  ServiceItem,
  StatItem,
} from "./pages/home";
import { defaultAboutContent } from "./pages/about";
import type {
  AboutContent,
  TeamMember,
  TimelineItem,
  ValueIcon,
  ValueItem,
} from "./pages/about";
import { defaultServicesContent } from "./pages/services";
import type {
  FeatureIcon,
  FeatureItem,
  ProcessStep,
  ServiceShowcase,
  ServiceShowcaseIcon,
  ServicesContent,
} from "./pages/services";
import { defaultProductsContent } from "./pages/products";
import type {
  ProductCategory,
  ProductCollectionGroup,
  ProductHighlight,
  ProductsContent,
} from "./pages/products";
import { defaultReferencesContent } from "./pages/references";
import type { ReferenceProject, ReferencesContent } from "./pages/references";
import { defaultShowroomContent } from "./pages/showroom";
import type { ShowroomFeature, ShowroomContent } from "./pages/showroom";
import { defaultCareerContent } from "./pages/career";
import type {
  BenefitIcon,
  CareerBenefit,
  CareerOpening,
  CareerContent,
} from "./pages/career";
import { defaultNewsContent } from "./pages/news";
import type { NewsItem, NewsContent } from "./pages/news";
import { defaultContactContent } from "./pages/contact";
import type { ContactContent } from "./pages/contact";
import {
  defaultImprintContent,
  defaultPrivacyContent,
  defaultDisclaimerContent,
} from "./pages/legal";
import type { LegalContent } from "./pages/legal";
import { renderRichText } from "@storyblok/richtext";

/**
 * Ermittelt pro Anfrage, ob "draft" oder "published" geladen wird.
 *
 * - Dev-Server: immer "draft" (fuer die lokale Vorschau).
 * - Produktion: "draft" nur, wenn der interne Header `x-sb-preview` gesetzt ist
 *   (von der Middleware bei vorhandenem `_storyblok`-Query gesetzt = Storyblok
 *   Visual Editor). Sonst die Env-Version bzw. "published".
 *
 * Da hier `headers()` gelesen wird, werden die Seiten serverseitig dynamisch
 * gerendert – veroeffentlichte Aenderungen sind dadurch ohne Rebuild sofort
 * live, und die Editor-Vorschau funktioniert ohne Cookie (iframe-tauglich).
 */
async function resolveVersion(): Promise<"draft" | "published"> {
  if (process.env.NODE_ENV !== "production") return "draft";
  try {
    const h = await headers();
    if (h.get("x-sb-preview") === "1") return "draft";
  } catch {
    /* headers() ausserhalb eines Request-Kontexts -> published */
  }
  return (
    (process.env.STORYBLOK_VERSION as "draft" | "published") || "published"
  );
}

/** Storyblok-Asset-Feld (Objekt) auf eine URL-Zeichenkette reduzieren. */
function assetUrl(field: unknown, fallback: string): string {
  if (field && typeof field === "object" && "filename" in field) {
    const a = field as { filename?: string; focus?: string };
    if (!a.filename) return fallback;
    return withFocus(a.filename, a.focus);
  }
  if (typeof field === "string" && field) return field;
  return fallback;
}

/**
 * Haengt einen in Storyblok gesetzten Fokuspunkt als `#focus=…`-Fragment an die
 * Asset-URL. So wandert der Fokus durch die string-basierte Bildpipeline (siehe
 * `src/site/lib/image.ts`), ohne die Content-Felder auf Objekte umzustellen.
 */
function withFocus(filename: string, focus?: string): string {
  return focus ? `${filename}#focus=${focus}` : filename;
}

/** Einen CTA-Blok (label/link) mit Fallback abbilden. */
function ctaFrom(field: unknown, fallback: CtaLink): CtaLink {
  const blok = Array.isArray(field) ? field[0] : field;
  if (blok && typeof blok === "object") {
    const b = blok as { label?: string; link?: unknown };
    return {
      label: b.label || fallback.label,
      link: resolveLink(b.link, fallback.link),
    };
  }
  return fallback;
}

/** Storyblok-Multilink oder Text auf einen internen Pfad reduzieren. */
function resolveLink(field: unknown, fallback: string): string {
  if (typeof field === "string" && field) return field;
  if (field && typeof field === "object") {
    const l = field as { cached_url?: string; url?: string };
    return l.cached_url || l.url || fallback;
  }
  return fallback;
}

/** Ein einzelnes text_item (oder String) auf seinen Text reduzieren. */
function textFrom(item: unknown): string {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && "text" in item) {
    const t = (item as { text?: unknown }).text;
    return typeof t === "string" ? t : "";
  }
  return "";
}

/** Eine Liste von text_item-Bloks (oder Strings) mit Fallback abbilden. */
function textItems(field: unknown, fallback: string[]): string[] {
  if (Array.isArray(field) && field.length > 0) return field.map(textFrom);
  return fallback;
}

/** Ein Multi-Asset-Feld auf eine Liste von URLs reduzieren (mit Fallback). */
function multiAssetUrls(field: unknown, fallback: string[]): string[] {
  if (Array.isArray(field) && field.length > 0) {
    const urls = field
      .map((a) => {
        if (a && typeof a === "object" && "filename" in a) {
          const o = a as { filename?: string; focus?: string };
          return typeof o.filename === "string" && o.filename
            ? withFocus(o.filename, o.focus)
            : "";
        }
        return typeof a === "string" ? a : "";
      })
      .filter(Boolean);
    if (urls.length > 0) return urls;
  }
  return fallback;
}

/**
 * Eine Liste von `nav_item`-Bloks auf `NavItem[]` abbilden.
 *
 * Eintraege ohne Name *oder* Pfad werden verworfen; bleibt nichts uebrig,
 * greifen die lokalen Defaults (Menue faellt nie leer aus).
 */
function navItems(field: unknown, fallback: NavItem[]): NavItem[] {
  if (!Array.isArray(field)) return fallback;

  const items = field.flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const o = raw as { name?: unknown; path?: unknown };
    const name = typeof o.name === "string" ? o.name.trim() : "";
    const path = typeof o.path === "string" ? o.path.trim() : "";
    return name && path ? [{ name, path }] : [];
  });

  return items.length > 0 ? items : fallback;
}

/**
 * Geokoordinaten aus zwei Storyblok-Zahlenfeldern lesen.
 *
 * Storyblok liefert Zahlenfelder als Zeichenkette, leere Felder als `""`
 * (-> `0`). Nur ein vollstaendiges, plausibles Paar ueberschreibt den Default.
 */
function geoFrom(latitude: unknown, longitude: unknown, fallback: Geo): Geo {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const usable = (n: number) => Number.isFinite(n) && n !== 0;
  return usable(lat) && usable(lng)
    ? { latitude: lat, longitude: lng }
    : fallback;
}

/** Eine Zeitangabe aus Storyblok auf "HH:MM" (oder leer) reduzieren. */
function timeFrom(field: unknown): string {
  return typeof field === "string" ? field.trim() : "";
}

/**
 * Eine Liste von `opening_day`-Bloks auf `OpeningDay[]` abbilden – ein Blok je
 * Wochentag, mit Geschlossen-Schalter und bis zu zwei Zeitfenstern.
 *
 * Bloks ohne gueltigen Wochentag werden ignoriert; bleibt nichts uebrig, wird
 * `null` zurueckgegeben, damit die lokalen Defaults greifen.
 */
function openingDays(field: unknown): OpeningDay[] | null {
  if (!Array.isArray(field)) return null;

  const days = field.flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const o = raw as Record<string, unknown>;
    const day = WEEKDAYS.find((d) => d === o.day);
    if (!day) return [];

    const slots = [
      { opens: timeFrom(o.opens), closes: timeFrom(o.closes) },
      { opens: timeFrom(o.opens2), closes: timeFrom(o.closes2) },
    ].filter((slot) => slot.opens && slot.closes);

    return [{ day, closed: Boolean(o.closed) || slots.length === 0, slots }];
  });

  return days.length > 0 ? days : null;
}

/** Das `_editable`-Feld eines Bloks extrahieren (Storyblok Click-to-Edit). */
function editableOf(obj: unknown): string | undefined {
  if (obj && typeof obj === "object" && "_editable" in obj) {
    const e = (obj as { _editable?: unknown })._editable;
    return typeof e === "string" ? e : undefined;
  }
  return undefined;
}

/**
 * Wandelt nackte URLs (als reiner Text gepflegte Adressen) in echte
 * `<a>`-Links um. Bereits vorhandene `<a>…</a>`-Elemente bleiben unberuehrt,
 * ebenso URLs in Tag-Attributen (z.B. `href`/`src`). Satzzeichen am Ende
 * bleiben ausserhalb des Links. Styling uebernimmt der `[&_a]`-Container.
 */
function linkifyHtml(html: string): string {
  const URL_RE = /(?<!["'=])(https?:\/\/[^\s<>"')]+)/g;
  // An vorhandenen Anker-Elementen splitten; ungerade Segmente sind Anker.
  return html
    .split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi)
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part.replace(URL_RE, (url) => {
        const trailing = /[.,;:)]+$/.exec(url)?.[0] ?? "";
        const href = trailing ? url.slice(0, -trailing.length) : url;
        const label = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>${trailing}`;
      });
    })
    .join("");
}

/**
 * Ein Storyblok-Richtext-Feld zur Build-Zeit in einen HTML-String rendern.
 * Gibt `null` zurueck, wenn das Feld leer ist – die Seite nutzt dann ihren
 * statischen JSX-Fallback. Der HTML-String stammt aus vertrauenswuerdigem,
 * vom Seitenbetreiber gepflegtem CMS-Inhalt.
 */
function richTextToHtml(field: unknown): string | null {
  if (!field || typeof field !== "object") return null;
  const doc = field as { type?: string; content?: unknown[] };
  if (
    doc.type !== "doc" ||
    !Array.isArray(doc.content) ||
    doc.content.length === 0
  ) {
    return null;
  }
  try {
    const html = renderRichText(field as never);
    return typeof html === "string" && html.trim() ? linkifyHtml(html) : null;
  } catch (err) {
    console.warn("[storyblok] richTextToHtml fiel auf null zurueck:", err);
    return null;
  }
}

/**
 * Laedt die globalen Geschaeftsdaten.
 *
 * - Mit Storyblok-Token: holt die Story "settings" (global) per CDN-API und
 *   ueberlagert die lokalen Defaults mit den gepflegten Werten.
 * - Ohne Token / bei Fehlern: lokale Defaults (Seite bleibt funktionsfaehig).
 *
 * Wird zur Build-Zeit (RSC) aufgerufen -> Inhalte werden statisch eingebacken.
 */
async function loadSiteSettings(): Promise<SiteSettings> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultSiteSettings;

  try {
    const { data } = await storyblokClient.get("cdn/stories/settings", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (!c) return defaultSiteSettings;

    // Storyblok-Felder auf SiteSettings mappen. Leere Felder fallen auf die
    // Defaults zurueck, damit Teil-Pflege moeglich ist.
    const d = defaultSiteSettings;
    const foundingYear = Number(c.foundingYear) || d.foundingYear;
    return {
      ...d,
      companyName: c.companyName || d.companyName,
      legalName: c.legalName || d.legalName,
      tagline: c.tagline || d.tagline,
      footerIntro: c.footerIntro || d.footerIntro,
      foundingYear,
      // Bewusst NICHT aus Storyblok: die Jahre werden aus dem Gruendungsjahr
      // abgeleitet, damit die Angabe nicht jaehrlich nachgepflegt werden muss.
      yearsExperience: yearsSinceFounding(foundingYear),
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
      openingHours: openingDays(c.openingHours) ?? d.openingHours,
      geo: geoFrom(c.geoLatitude, c.geoLongitude, d.geo),
      mainNav: navItems(c.mainNav, d.mainNav),
      footerQuickLinks: navItems(c.footerQuickLinks, d.footerQuickLinks),
      legalNav: navItems(c.legalNav, d.legalNav),
    };
  } catch (err) {
    // Im Fehlerfall niemals den Build brechen – lokale Defaults nutzen.
    console.warn("[storyblok] getSiteSettings fiel auf Defaults zurueck:", err);
    return defaultSiteSettings;
  }
}

/**
 * Laedt die Inhalte der Startseite (Story "home").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/home.ts`.
 */
async function loadHomeContent(): Promise<HomeContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultHomeContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/home", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    // Nur uebernehmen, wenn die Story unser feldbasiertes Schema nutzt.
    if (c?.component !== "page_home") return defaultHomeContent;

    const d = defaultHomeContent;

    const stats: StatItem[] =
      Array.isArray(c.stats) && c.stats.length > 0
        ? c.stats.map((s: Record<string, unknown>, i: number) => ({
            // Als Zeichenkette uebernehmen, damit `{{jahre}}` erhalten bleibt
            // und erst in `withYears` aufgeloest wird.
            value:
              typeof s.value === "string" || typeof s.value === "number"
                ? String(s.value)
                : (d.stats[i]?.value ?? "0"),
            suffix: typeof s.suffix === "string" ? s.suffix : "",
            label: typeof s.label === "string" ? s.label : "",
            editable: editableOf(s),
          }))
        : d.stats;

    const services: ServiceItem[] =
      Array.isArray(c.services) && c.services.length > 0
        ? c.services.map((s: Record<string, unknown>, i: number) => ({
            icon: (typeof s.icon === "string"
              ? s.icon
              : d.services[i]?.icon || "layers") as ServiceIcon,
            title: typeof s.title === "string" ? s.title : "",
            description: typeof s.description === "string" ? s.description : "",
            editable: editableOf(s),
          }))
        : d.services;

    const traditionItems: string[] = textItems(
      c.traditionItems,
      d.traditionItems,
    );

    return {
      ...d,
      editable: editableOf(c),
      heroImage: assetUrl(c.heroImage, d.heroImage),
      heroImageAlt: c.heroImageAlt || d.heroImageAlt,
      heroLine1: c.heroLine1 || d.heroLine1,
      heroAccentWord: c.heroAccentWord || d.heroAccentWord,
      heroLine2Suffix: c.heroLine2Suffix || d.heroLine2Suffix,
      heroSubtitle: c.heroSubtitle || d.heroSubtitle,
      heroCtaPrimary: ctaFrom(c.heroCtaPrimary, d.heroCtaPrimary),
      heroCtaSecondary: ctaFrom(c.heroCtaSecondary, d.heroCtaSecondary),
      stats,
      servicesLabel: c.servicesLabel || d.servicesLabel,
      servicesTitle: c.servicesTitle || d.servicesTitle,
      servicesIntro: c.servicesIntro || d.servicesIntro,
      services,
      traditionImage: assetUrl(c.traditionImage, d.traditionImage),
      traditionImageAlt: c.traditionImageAlt || d.traditionImageAlt,
      traditionTitle: c.traditionTitle || d.traditionTitle,
      traditionText: c.traditionText || d.traditionText,
      traditionItems,
      traditionCta: ctaFrom(c.traditionCta, d.traditionCta),
      traditionOldImage: assetUrl(c.traditionOldImage, d.traditionOldImage),
      traditionOldImageAlt: c.traditionOldImageAlt || d.traditionOldImageAlt,
      traditionOldLabel: c.traditionOldLabel || d.traditionOldLabel,
      traditionNewImage: assetUrl(c.traditionNewImage, d.traditionNewImage),
      traditionNewImageAlt: c.traditionNewImageAlt || d.traditionNewImageAlt,
      traditionNewLabel: c.traditionNewLabel || d.traditionNewLabel,
      statementImage: assetUrl(c.statementImage, d.statementImage),
      statementImageAlt: c.statementImageAlt || d.statementImageAlt,
      statementEyebrow: c.statementEyebrow || d.statementEyebrow,
      statementHeadline: c.statementHeadline || d.statementHeadline,
      statementCta: ctaFrom(c.statementCta, d.statementCta),
      showroomImage: assetUrl(c.showroomImage, d.showroomImage),
      showroomImageAlt: c.showroomImageAlt || d.showroomImageAlt,
      showroomTitle: c.showroomTitle || d.showroomTitle,
      showroomText: c.showroomText || d.showroomText,
      showroomCta: ctaFrom(c.showroomCta, d.showroomCta),
      ctaHeadlinePre: c.ctaHeadlinePre || d.ctaHeadlinePre,
      ctaHeadlineAccent: c.ctaHeadlineAccent || d.ctaHeadlineAccent,
      ctaText: c.ctaText || d.ctaText,
      ctaButton: ctaFrom(c.ctaButton, d.ctaButton),
    };
  } catch (err) {
    console.warn("[storyblok] getHomeContent fiel auf Defaults zurueck:", err);
    return defaultHomeContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Über uns" (Story "ueber-uns").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/about.ts`.
 */
async function loadAboutContent(): Promise<AboutContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultAboutContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/ueber-uns", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_about") return defaultAboutContent;

    const d = defaultAboutContent;

    const team: TeamMember[] =
      Array.isArray(c.team) && c.team.length > 0
        ? c.team.map((m: Record<string, unknown>, i: number) => ({
            image: assetUrl(m.image, d.team[i]?.image || ""),
            imageAlt:
              typeof m.imageAlt === "string"
                ? m.imageAlt
                : d.team[i]?.imageAlt || "",
            name: typeof m.name === "string" ? m.name : "",
            role: typeof m.role === "string" ? m.role : "",
            description: typeof m.description === "string" ? m.description : "",
            editable: editableOf(m),
          }))
        : d.team;

    const timeline: TimelineItem[] =
      Array.isArray(c.timeline) && c.timeline.length > 0
        ? c.timeline.map((t: Record<string, unknown>) => ({
            year: typeof t.year === "string" ? t.year : "",
            text: typeof t.text === "string" ? t.text : "",
            editable: editableOf(t),
          }))
        : d.timeline;

    const values: ValueItem[] =
      Array.isArray(c.values) && c.values.length > 0
        ? c.values.map((v: Record<string, unknown>, i: number) => ({
            icon: (typeof v.icon === "string"
              ? v.icon
              : d.values[i]?.icon || "award") as ValueIcon,
            title: typeof v.title === "string" ? v.title : "",
            description: typeof v.description === "string" ? v.description : "",
            editable: editableOf(v),
          }))
        : d.values;

    return {
      ...d,
      editable: editableOf(c),
      heroImage: assetUrl(c.heroImage, d.heroImage),
      heroImageAlt: c.heroImageAlt || d.heroImageAlt,
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitleLine1: c.heroTitleLine1 || d.heroTitleLine1,
      heroTitleLine2: c.heroTitleLine2 || d.heroTitleLine2,
      storyLabel: c.storyLabel || d.storyLabel,
      storyTitle: c.storyTitle || d.storyTitle,
      storyParagraphs: textItems(c.storyParagraphs, d.storyParagraphs),
      teamLabel: c.teamLabel || d.teamLabel,
      teamTitle: c.teamTitle || d.teamTitle,
      team,
      timelineLabel: c.timelineLabel || d.timelineLabel,
      timelineTitle: c.timelineTitle || d.timelineTitle,
      timeline,
      valuesLabel: c.valuesLabel || d.valuesLabel,
      valuesTitle: c.valuesTitle || d.valuesTitle,
      values,
      statementHeadline: c.statementHeadline || d.statementHeadline,
      statementParagraphs: textItems(
        c.statementParagraphs,
        d.statementParagraphs,
      ),
    };
  } catch (err) {
    console.warn("[storyblok] getAboutContent fiel auf Defaults zurueck:", err);
    return defaultAboutContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Leistungen" (Story "leistungen").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/services.ts`.
 */
async function loadServicesContent(): Promise<ServicesContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultServicesContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/leistungen", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_services") return defaultServicesContent;

    const d = defaultServicesContent;

    const services: ServiceShowcase[] =
      Array.isArray(c.services) && c.services.length > 0
        ? c.services.map((s: Record<string, unknown>, i: number) => ({
            icon: (typeof s.icon === "string"
              ? s.icon
              : d.services[i]?.icon || "building") as ServiceShowcaseIcon,
            title: typeof s.title === "string" ? s.title : "",
            description: typeof s.description === "string" ? s.description : "",
            image: assetUrl(s.image, d.services[i]?.image || ""),
            editable: editableOf(s),
          }))
        : d.services;

    const process: ProcessStep[] =
      Array.isArray(c.process) && c.process.length > 0
        ? c.process.map((p: Record<string, unknown>) => ({
            step: typeof p.step === "string" ? p.step : "",
            title: typeof p.title === "string" ? p.title : "",
            desc: typeof p.desc === "string" ? p.desc : "",
            editable: editableOf(p),
          }))
        : d.process;

    const features: FeatureItem[] =
      Array.isArray(c.features) && c.features.length > 0
        ? c.features.map((f: Record<string, unknown>, i: number) => ({
            icon: (typeof f.icon === "string"
              ? f.icon
              : d.features[i]?.icon || "award") as FeatureIcon,
            title: typeof f.title === "string" ? f.title : "",
            desc: typeof f.desc === "string" ? f.desc : "",
            editable: editableOf(f),
          }))
        : d.features;

    return {
      ...d,
      editable: editableOf(c),
      heroImage: assetUrl(c.heroImage, d.heroImage),
      heroImageAlt: c.heroImageAlt || d.heroImageAlt,
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitleLine1: c.heroTitleLine1 || d.heroTitleLine1,
      heroTitleLine2Pre: c.heroTitleLine2Pre || d.heroTitleLine2Pre,
      heroTitleLine2Accent: c.heroTitleLine2Accent || d.heroTitleLine2Accent,
      heroIntro: c.heroIntro || d.heroIntro,
      introEyebrow: c.introEyebrow || d.introEyebrow,
      introTitle: c.introTitle || d.introTitle,
      introText: c.introText || d.introText,
      services,
      processEyebrow: c.processEyebrow || d.processEyebrow,
      processTitlePre: c.processTitlePre || d.processTitlePre,
      processTitleAccent: c.processTitleAccent || d.processTitleAccent,
      processTitlePost: c.processTitlePost || d.processTitlePost,
      process,
      whyEyebrow: c.whyEyebrow || d.whyEyebrow,
      whyTitle: c.whyTitle || d.whyTitle,
      whyText: c.whyText || d.whyText,
      features,
      ctaImage: assetUrl(c.ctaImage, d.ctaImage),
      ctaEyebrow: c.ctaEyebrow || d.ctaEyebrow,
      ctaHeadline: c.ctaHeadline || d.ctaHeadline,
      ctaButtonLabel: c.ctaButtonLabel || d.ctaButtonLabel,
      ctaButtonLink: resolveLink(c.ctaButtonLink, d.ctaButtonLink),
    };
  } catch (err) {
    console.warn(
      "[storyblok] getServicesContent fiel auf Defaults zurueck:",
      err,
    );
    return defaultServicesContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Produkte" (Story "produkte").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/products.ts`.
 */
async function loadProductsContent(): Promise<ProductsContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultProductsContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/produkte", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_products") return defaultProductsContent;

    const d = defaultProductsContent;

    // Highlight-Banner: beliebig viele Eintraege, jedes Feld einzeln optional.
    const bannerItems: ProductHighlight[] = Array.isArray(c.bannerItems)
      ? c.bannerItems.map((b: Record<string, unknown>, i: number) => {
          const f = d.bannerItems[i];
          return {
            badge: typeof b.badge === "string" ? b.badge : "",
            headlinePre: typeof b.headlinePre === "string" ? b.headlinePre : "",
            headlineItalic:
              typeof b.headlineItalic === "string" ? b.headlineItalic : "",
            features: textItems(b.features, f?.features || []),
            buttonLabel: typeof b.buttonLabel === "string" ? b.buttonLabel : "",
            buttonLink: resolveLink(b.buttonLink, f?.buttonLink || ""),
            image: assetUrl(b.image, f?.image || ""),
            editable: editableOf(b),
          };
        })
      : d.bannerItems;

    const categories: ProductCategory[] =
      Array.isArray(c.categories) && c.categories.length > 0
        ? c.categories.map((cat: Record<string, unknown>, i: number) => ({
            title: typeof cat.title === "string" ? cat.title : "",
            description:
              typeof cat.description === "string" ? cat.description : "",
            image: assetUrl(cat.image, d.categories[i]?.image || ""),
            editable: editableOf(cat),
          }))
        : d.categories;

    const collections: ProductCollectionGroup[] =
      Array.isArray(c.collections) && c.collections.length > 0
        ? c.collections.map((g: Record<string, unknown>, gi: number) => ({
            label:
              typeof g.label === "string"
                ? g.label
                : d.collections[gi]?.label || "",
            editable: editableOf(g),
            series: (Array.isArray(g.series) ? g.series : []).map(
              (s: Record<string, unknown>, si: number) => ({
                title: typeof s.title === "string" ? s.title : "",
                articleNumber:
                  typeof s.articleNumber === "string" && s.articleNumber
                    ? s.articleNumber
                    : d.collections[gi]?.series[si]?.articleNumber || "",
                images: multiAssetUrls(
                  s.gallery,
                  d.collections[gi]?.series[si]?.images || [],
                ),
                editable: editableOf(s),
              }),
            ),
          }))
        : d.collections;

    return {
      ...d,
      editable: editableOf(c),
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitle: c.heroTitle || d.heroTitle,
      heroSubtitle: c.heroSubtitle || d.heroSubtitle,
      bannerMarqueeText: c.bannerMarqueeText || d.bannerMarqueeText,
      bannerItems,
      categoriesLabel: c.categoriesLabel || d.categoriesLabel,
      categoriesTitle: c.categoriesTitle || d.categoriesTitle,
      categories,
      collectionsLabel: c.collectionsLabel || d.collectionsLabel,
      collectionsTitle: c.collectionsTitle || d.collectionsTitle,
      collectionsIntro: c.collectionsIntro || d.collectionsIntro,
      collections,
      ctaTitle: c.ctaTitle || d.ctaTitle,
      ctaText: c.ctaText || d.ctaText,
      ctaButtonLabel: c.ctaButtonLabel || d.ctaButtonLabel,
      ctaButtonLink: resolveLink(c.ctaButtonLink, d.ctaButtonLink),
    };
  } catch (err) {
    console.warn(
      "[storyblok] getProductsContent fiel auf Defaults zurueck:",
      err,
    );
    return defaultProductsContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Referenzen" (Story "referenzen").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/references.ts`.
 */
async function loadReferencesContent(): Promise<ReferencesContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultReferencesContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/referenzen", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_references") return defaultReferencesContent;

    const d = defaultReferencesContent;

    const projects: ReferenceProject[] =
      Array.isArray(c.projects) && c.projects.length > 0
        ? c.projects.map((p: Record<string, unknown>, i: number) => ({
            title: typeof p.title === "string" ? p.title : "",
            category: typeof p.category === "string" ? p.category : "",
            image: assetUrl(p.image, d.projects[i]?.image || ""),
            editable: editableOf(p),
          }))
        : d.projects;

    return {
      ...d,
      editable: editableOf(c),
      heroImage: assetUrl(c.heroImage, d.heroImage),
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitle: c.heroTitle || d.heroTitle,
      galleryLabel: c.galleryLabel || d.galleryLabel,
      galleryTitle: c.galleryTitle || d.galleryTitle,
      projects,
      ctaTitlePre: c.ctaTitlePre || d.ctaTitlePre,
      ctaTitleAccent: c.ctaTitleAccent || d.ctaTitleAccent,
      ctaText: c.ctaText || d.ctaText,
      ctaButtonLabel: c.ctaButtonLabel || d.ctaButtonLabel,
      ctaButtonLink: resolveLink(c.ctaButtonLink, d.ctaButtonLink),
    };
  } catch (err) {
    console.warn(
      "[storyblok] getReferencesContent fiel auf Defaults zurueck:",
      err,
    );
    return defaultReferencesContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Ausstellung" (Story "ausstellung").
 * Adresse/Karte stammen aus den globalen SiteSettings.
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/showroom.ts`.
 */
async function loadShowroomContent(): Promise<ShowroomContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultShowroomContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/ausstellung", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_showroom") return defaultShowroomContent;

    const d = defaultShowroomContent;

    const features: ShowroomFeature[] =
      Array.isArray(c.features) && c.features.length > 0
        ? c.features.map((f: Record<string, unknown>) => ({
            title: typeof f.title === "string" ? f.title : "",
            description: typeof f.description === "string" ? f.description : "",
            editable: editableOf(f),
          }))
        : d.features;

    return {
      ...d,
      editable: editableOf(c),
      heroImage: assetUrl(c.heroImage, d.heroImage),
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitle: c.heroTitle || d.heroTitle,
      infoLabel: c.infoLabel || d.infoLabel,
      infoTitle: c.infoTitle || d.infoTitle,
      infoParagraph1: c.infoParagraph1 || d.infoParagraph1,
      infoParagraph2: c.infoParagraph2 || d.infoParagraph2,
      featuresLabel: c.featuresLabel || d.featuresLabel,
      featuresTitle: c.featuresTitle || d.featuresTitle,
      features,
      featuresButtonLabel: c.featuresButtonLabel || d.featuresButtonLabel,
      featuresButtonLink: resolveLink(
        c.featuresButtonLink,
        d.featuresButtonLink,
      ),
    };
  } catch (err) {
    console.warn(
      "[storyblok] getShowroomContent fiel auf Defaults zurueck:",
      err,
    );
    return defaultShowroomContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Karriere" (Story "karriere").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/career.ts`.
 */
async function loadCareerContent(): Promise<CareerContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultCareerContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/karriere", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_career") return defaultCareerContent;

    const d = defaultCareerContent;

    const benefits: CareerBenefit[] =
      Array.isArray(c.benefits) && c.benefits.length > 0
        ? c.benefits.map((b: Record<string, unknown>, i: number) => ({
            icon: (typeof b.icon === "string"
              ? b.icon
              : d.benefits[i]?.icon || "award") as BenefitIcon,
            title: typeof b.title === "string" ? b.title : "",
            description: typeof b.description === "string" ? b.description : "",
            editable: editableOf(b),
          }))
        : d.benefits;

    const openings: CareerOpening[] =
      Array.isArray(c.openings) && c.openings.length > 0
        ? c.openings.map((o: Record<string, unknown>) => ({
            title: typeof o.title === "string" ? o.title : "",
            type: typeof o.type === "string" ? o.type : "",
            description: typeof o.description === "string" ? o.description : "",
            editable: editableOf(o),
          }))
        : d.openings;

    return {
      ...d,
      editable: editableOf(c),
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitle: c.heroTitle || d.heroTitle,
      benefitsLabel: c.benefitsLabel || d.benefitsLabel,
      benefitsTitle: c.benefitsTitle || d.benefitsTitle,
      benefits,
      openingsLabel: c.openingsLabel || d.openingsLabel,
      openingsTitle: c.openingsTitle || d.openingsTitle,
      openings,
      openingsButtonLabel: c.openingsButtonLabel || d.openingsButtonLabel,
      openingsButtonLink: resolveLink(
        c.openingsButtonLink,
        d.openingsButtonLink,
      ),
      initiativeEyebrow: c.initiativeEyebrow || d.initiativeEyebrow,
      initiativeTitle: c.initiativeTitle || d.initiativeTitle,
      initiativeText: c.initiativeText || d.initiativeText,
      initiativeButtonLabel: c.initiativeButtonLabel || d.initiativeButtonLabel,
      initiativeButtonLink: resolveLink(
        c.initiativeButtonLink,
        d.initiativeButtonLink,
      ),
      trainingEyebrow: c.trainingEyebrow || d.trainingEyebrow,
      trainingTitle: c.trainingTitle || d.trainingTitle,
      trainingText: c.trainingText || d.trainingText,
      trainingButtonLabel: c.trainingButtonLabel || d.trainingButtonLabel,
      trainingButtonLink: resolveLink(
        c.trainingButtonLink,
        d.trainingButtonLink,
      ),
    };
  } catch (err) {
    console.warn(
      "[storyblok] getCareerContent fiel auf Defaults zurueck:",
      err,
    );
    return defaultCareerContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Aktuelles" (Story "aktuelles").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/news.ts`.
 */
async function loadNewsContent(): Promise<NewsContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultNewsContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/aktuelles", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_news") return defaultNewsContent;

    const d = defaultNewsContent;

    const items: NewsItem[] =
      Array.isArray(c.items) && c.items.length > 0
        ? c.items.map((it: Record<string, unknown>, i: number) => {
            const title = typeof it.title === "string" ? it.title : "";
            // Fallback-Bild aus den Defaults, falls in Storyblok (noch) keins gesetzt ist.
            const fallback =
              d.items.find((di) => di.title === title)?.image ??
              d.items[i]?.image;
            return {
              date: typeof it.date === "string" ? it.date : "",
              title,
              excerpt: typeof it.excerpt === "string" ? it.excerpt : "",
              category: typeof it.category === "string" ? it.category : "",
              image:
                assetUrl(it.image ?? it.cover, "") || fallback || undefined,
              editable: editableOf(it),
            };
          })
        : d.items;

    return {
      ...d,
      editable: editableOf(c),
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitle: c.heroTitle || d.heroTitle,
      items,
    };
  } catch (err) {
    console.warn("[storyblok] getNewsContent fiel auf Defaults zurueck:", err);
    return defaultNewsContent;
  }
}

/**
 * Laedt die Inhalte der Seite "Kontakt" (Story "kontakt").
 * Adresse/Telefon/E-Mail/Karte stammen aus den globalen SiteSettings.
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/contact.ts`.
 */
async function loadContactContent(): Promise<ContactContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultContactContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/kontakt", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_contact") return defaultContactContent;

    const d = defaultContactContent;

    return {
      ...d,
      editable: editableOf(c),
      heroEyebrow: c.heroEyebrow || d.heroEyebrow,
      heroTitle: c.heroTitle || d.heroTitle,
      infoLabel: c.infoLabel || d.infoLabel,
      infoTitle: c.infoTitle || d.infoTitle,
      formEyebrow: c.formEyebrow || d.formEyebrow,
      formTitle: c.formTitle || d.formTitle,
      reviewsTitle: c.reviewsTitle || d.reviewsTitle,
      reviewsText: c.reviewsText || d.reviewsText,
      reviewsButtonLabel: c.reviewsButtonLabel || d.reviewsButtonLabel,
      reviewsButtonLink: resolveLink(c.reviewsButtonLink, d.reviewsButtonLink),
    };
  } catch (err) {
    console.warn(
      "[storyblok] getContactContent fiel auf Defaults zurueck:",
      err,
    );
    return defaultContactContent;
  }
}

/** Gemeinsame Lade-Logik fuer die Rechtsseiten (ein Richtext-Feld `body`). */
async function getLegalContent(
  slug: string,
  component: string,
  fallback: LegalContent,
): Promise<LegalContent> {
  if (!isStoryblokEnabled || !storyblokClient) return fallback;

  try {
    const { data } = await storyblokClient.get(`cdn/stories/${slug}`, {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== component) return fallback;

    return {
      title: c.title || fallback.title,
      bodyHtml: richTextToHtml(c.body),
      editable: editableOf(c),
    };
  } catch (err) {
    console.warn(
      `[storyblok] getLegalContent(${slug}) fiel auf Defaults zurueck:`,
      err,
    );
    return fallback;
  }
}

/** Inhalte der Seite "Impressum" (Story "impressum"). */
async function loadImprintContent(): Promise<LegalContent> {
  return getLegalContent("impressum", "page_imprint", defaultImprintContent);
}

/** Inhalte der Seite "Datenschutz" (Story "datenschutz"). */
async function loadPrivacyContent(): Promise<LegalContent> {
  return getLegalContent("datenschutz", "page_privacy", defaultPrivacyContent);
}

/** Inhalte der Seite "Haftungsausschluss" (Story "haftungsausschluss"). */
async function loadDisclaimerContent(): Promise<LegalContent> {
  return getLegalContent(
    "haftungsausschluss",
    "page_disclaimer",
    defaultDisclaimerContent,
  );
}

/* -------------------------------------------------------------------------
 * Oeffentliche Getter
 * ---------------------------------------------------------------------- */

/**
 * Die Settings pro Anfrage nur einmal laden.
 *
 * Sie werden im Layout *und* – fuer das Gruendungsjahr – von jedem
 * Content-Getter gebraucht. `cache()` memoisiert im Request-Scope, es bleibt
 * also bei einem CDN-Aufruf je Anfrage.
 */
const siteSettingsOnce = cache(loadSiteSettings);

/**
 * Umhuellt einen Content-Getter mit der Platzhalter-Aufloesung.
 *
 * Alles, was eine Seite bekommt – aus Storyblok *oder* aus den lokalen
 * Defaults – laeuft hier durch. Dadurch bleiben `{{jahre}}` und
 * `{{gruendungsjahr}}` ueberall aktuell, auch in Texten, die erst spaeter im
 * CMS ergaenzt werden. Die Aufloesung passiert pro Anfrage, nicht beim
 * Modul-Import, und rechnet mit dem in Storyblok gepflegten Gruendungsjahr –
 * damit die Jahreszahl genau eine Quelle hat.
 */
function withYears<T>(load: () => Promise<T>): () => Promise<T> {
  return async () => {
    const [value, settings] = await Promise.all([load(), siteSettingsOnce()]);
    return resolveYearTokens(value, settings.foundingYear);
  };
}

export const getSiteSettings = withYears(siteSettingsOnce);
export const getHomeContent = withYears(loadHomeContent);
export const getAboutContent = withYears(loadAboutContent);
export const getServicesContent = withYears(loadServicesContent);
export const getProductsContent = withYears(loadProductsContent);
export const getReferencesContent = withYears(loadReferencesContent);
export const getShowroomContent = withYears(loadShowroomContent);
export const getCareerContent = withYears(loadCareerContent);
export const getNewsContent = withYears(loadNewsContent);
export const getContactContent = withYears(loadContactContent);
export const getImprintContent = withYears(loadImprintContent);
export const getPrivacyContent = withYears(loadPrivacyContent);
export const getDisclaimerContent = withYears(loadDisclaimerContent);
