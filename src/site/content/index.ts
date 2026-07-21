import { isStoryblokEnabled, storyblokClient } from "../lib/storyblok";
import { headers } from "next/headers";
import { defaultSiteSettings } from "./site";
import type { SiteSettings } from "./types";
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
    const filename = (field as { filename?: string }).filename;
    return filename || fallback;
  }
  if (typeof field === "string" && field) return field;
  return fallback;
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
          const f = (a as { filename?: string }).filename;
          return typeof f === "string" ? f : "";
        }
        return typeof a === "string" ? a : "";
      })
      .filter(Boolean);
    if (urls.length > 0) return urls;
  }
  return fallback;
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
export async function getSiteSettings(): Promise<SiteSettings> {
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

/**
 * Laedt die Inhalte der Startseite (Story "home").
 * Ohne Token / bei Fehlern: lokale Defaults aus `pages/home.ts`.
 */
export async function getHomeContent(): Promise<HomeContent> {
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
            value: Number(s.value) || d.stats[i]?.value || 0,
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
export async function getAboutContent(): Promise<AboutContent> {
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
export async function getServicesContent(): Promise<ServicesContent> {
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
export async function getProductsContent(): Promise<ProductsContent> {
  if (!isStoryblokEnabled || !storyblokClient) return defaultProductsContent;

  try {
    const { data } = await storyblokClient.get("cdn/stories/produkte", {
      version: await resolveVersion(),
    });
    const c = data?.story?.content;
    if (c?.component !== "page_products") return defaultProductsContent;

    const d = defaultProductsContent;

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
      bannerBadge: c.bannerBadge || d.bannerBadge,
      bannerHeadlinePre: c.bannerHeadlinePre || d.bannerHeadlinePre,
      bannerHeadlineItalic: c.bannerHeadlineItalic || d.bannerHeadlineItalic,
      bannerFeatures: textItems(c.bannerFeatures, d.bannerFeatures),
      bannerButtonLabel: c.bannerButtonLabel || d.bannerButtonLabel,
      bannerButtonLink: resolveLink(c.bannerButtonLink, d.bannerButtonLink),
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
export async function getReferencesContent(): Promise<ReferencesContent> {
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
export async function getShowroomContent(): Promise<ShowroomContent> {
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
export async function getCareerContent(): Promise<CareerContent> {
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
export async function getNewsContent(): Promise<NewsContent> {
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
        ? c.items.map((it: Record<string, unknown>) => ({
            date: typeof it.date === "string" ? it.date : "",
            title: typeof it.title === "string" ? it.title : "",
            excerpt: typeof it.excerpt === "string" ? it.excerpt : "",
            category: typeof it.category === "string" ? it.category : "",
            editable: editableOf(it),
          }))
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
export async function getContactContent(): Promise<ContactContent> {
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
export function getImprintContent(): Promise<LegalContent> {
  return getLegalContent("impressum", "page_imprint", defaultImprintContent);
}

/** Inhalte der Seite "Datenschutz" (Story "datenschutz"). */
export function getPrivacyContent(): Promise<LegalContent> {
  return getLegalContent("datenschutz", "page_privacy", defaultPrivacyContent);
}

/** Inhalte der Seite "Haftungsausschluss" (Story "haftungsausschluss"). */
export function getDisclaimerContent(): Promise<LegalContent> {
  return getLegalContent(
    "haftungsausschluss",
    "page_disclaimer",
    defaultDisclaimerContent,
  );
}
