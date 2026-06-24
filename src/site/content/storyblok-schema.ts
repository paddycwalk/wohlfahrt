/**
 * Storyblok-Komponenten-Blueprint
 * ================================
 *
 * Diese Datei beschreibt – als ausfuehrbare TypeScript-Spezifikation – welche
 * Storyblok-Komponenten (Bloks) im Space angelegt werden muessen, damit die
 * Inhalte dieser Seite im CMS pflegbar sind. Sie wird NICHT zur Laufzeit
 * verwendet, sondern dient als Vorlage:
 *
 *   1. Space in Storyblok anlegen (Region merken: eu | us | ap | ca | cn).
 *   2. Mit dem Storyblok-MCP (oder manuell) die hier definierten Komponenten
 *      und die globale Story "settings" erstellen.
 *   3. Token in `.env` eintragen und neu bauen.
 *
 * Feldtypen entsprechen den Storyblok-Field-Types
 * (text, textarea, number, boolean, bloks, option, asset, ...).
 */

export interface StoryblokFieldSpec {
  /** Technischer Feldname (= key im content-Objekt). */
  name: string;
  type:
    | "text"
    | "textarea"
    | "markdown"
    | "richtext"
    | "number"
    | "boolean"
    | "bloks"
    | "option"
    | "options"
    | "asset"
    | "multiasset"
    | "datetime"
    | "link";
  display_name?: string;
  description?: string;
  required?: boolean;
  /** Bei type "bloks": erlaubte Komponenten. */
  component_whitelist?: string[];
}

export interface StoryblokComponentSpec {
  /** Technischer Name (= component im content). */
  name: string;
  display_name: string;
  /** "Universal"-Blok, Content-Type (eigene Story) oder Nestable. */
  is_root: boolean;
  is_nestable: boolean;
  description: string;
  schema: StoryblokFieldSpec[];
}

/**
 * Globale Einstellungen – eine einzelne Story "settings" vom Typ `settings`.
 * Quelle der Wahrheit fuer Kontakt, Adresse, Oeffnungszeiten, Navigation.
 * Mapping siehe `src/site/content/index.ts -> getSiteSettings`.
 */
export const settingsComponent: StoryblokComponentSpec = {
  name: "settings",
  display_name: "Globale Einstellungen",
  is_root: true,
  is_nestable: false,
  description: "Firmendaten, Kontakt, Oeffnungszeiten, Navigation (global).",
  schema: [
    { name: "companyName", type: "text", display_name: "Firmenname" },
    { name: "legalName", type: "text", display_name: "Rechtlicher Name" },
    {
      name: "footerIntro",
      type: "textarea",
      display_name: "Footer-Einleitung",
    },
    { name: "foundingYear", type: "number", display_name: "Gruendungsjahr" },
    {
      name: "yearsExperience",
      type: "number",
      display_name: "Jahre Erfahrung",
    },
    { name: "street", type: "text", display_name: "Strasse" },
    { name: "zip", type: "text", display_name: "PLZ" },
    { name: "city", type: "text", display_name: "Ort" },
    { name: "region", type: "text", display_name: "Bundesland" },
    { name: "country", type: "text", display_name: "Land (ISO)" },
    { name: "phone", type: "text", display_name: "Telefon (Anzeige)" },
    { name: "phoneHref", type: "text", display_name: "Telefon (tel:-Link)" },
    { name: "email", type: "text", display_name: "E-Mail" },
    {
      name: "openingHours",
      type: "bloks",
      display_name: "Oeffnungszeiten",
      component_whitelist: ["opening_hours"],
    },
    { name: "openingHoursNote", type: "text", display_name: "Hinweis Zeiten" },
    { name: "facebook", type: "text", display_name: "Facebook-URL" },
    { name: "instagram", type: "text", display_name: "Instagram-URL" },
    {
      name: "mapEmbedUrl",
      type: "text",
      display_name: "Google-Maps-Embed-URL",
    },
    {
      name: "mainNav",
      type: "bloks",
      display_name: "Hauptnavigation",
      component_whitelist: ["nav_item"],
    },
    {
      name: "footerQuickLinks",
      type: "bloks",
      display_name: "Footer-Schnelllinks",
      component_whitelist: ["nav_item"],
    },
    {
      name: "legalNav",
      type: "bloks",
      display_name: "Rechtliche Links",
      component_whitelist: ["nav_item"],
    },
  ],
};

/** Wiederverwendbarer Nav-Eintrag (name + path). */
export const navItemComponent: StoryblokComponentSpec = {
  name: "nav_item",
  display_name: "Navigationspunkt",
  is_root: false,
  is_nestable: true,
  description: "Ein Menuepunkt (Beschriftung + interner Pfad).",
  schema: [
    {
      name: "name",
      type: "text",
      display_name: "Beschriftung",
      required: true,
    },
    {
      name: "path",
      type: "text",
      display_name: "Pfad (z. B. /leistungen)",
      required: true,
    },
  ],
};

/** Eine strukturierte Oeffnungszeit. */
export const openingHoursComponent: StoryblokComponentSpec = {
  name: "opening_hours",
  display_name: "Oeffnungszeit",
  is_root: false,
  is_nestable: true,
  description: "Wochentage + Von/Bis (fuer Anzeige und JSON-LD).",
  schema: [
    {
      name: "days",
      type: "options",
      display_name: "Wochentage (Schema.org)",
      description: "Monday, Tuesday, ...",
    },
    { name: "opens", type: "text", display_name: "Von (HH:MM)" },
    { name: "closes", type: "text", display_name: "Bis (HH:MM)" },
  ],
};

/**
 * Referenz/Galerie als Datenquelle. Jede Referenz = eigene Story vom Typ
 * `reference` (z. B. im Ordner /referenzen/). Galerie-Bilder als Multi-Asset.
 */
export const referenceComponent: StoryblokComponentSpec = {
  name: "reference",
  display_name: "Referenz",
  is_root: true,
  is_nestable: false,
  description: "Projekt-/Referenzeintrag mit Galerie.",
  schema: [
    { name: "title", type: "text", display_name: "Titel", required: true },
    { name: "category", type: "text", display_name: "Kategorie" },
    { name: "location", type: "text", display_name: "Ort" },
    { name: "year", type: "text", display_name: "Jahr" },
    { name: "description", type: "textarea", display_name: "Beschreibung" },
    { name: "cover", type: "asset", display_name: "Titelbild" },
    { name: "gallery", type: "multiasset", display_name: "Galerie" },
  ],
};

/**
 * Aktuelles/News als Blog-Eintrag. Jede Meldung = eigene Story vom Typ
 * `news` (z. B. im Ordner /aktuelles/).
 */
export const newsComponent: StoryblokComponentSpec = {
  name: "news",
  display_name: "Aktuelles / Beitrag",
  is_root: true,
  is_nestable: false,
  description: "Newsbeitrag mit Datum, Titelbild und Fliesstext.",
  schema: [
    { name: "title", type: "text", display_name: "Titel", required: true },
    { name: "date", type: "datetime", display_name: "Datum" },
    { name: "excerpt", type: "textarea", display_name: "Teaser" },
    { name: "cover", type: "asset", display_name: "Titelbild" },
    { name: "body", type: "richtext", display_name: "Inhalt" },
  ],
};

/**
 * Generischer Seiteninhalt (feldbasiert). Pro Seite eine Story vom Typ `page`.
 * Hinweis: Die aktuellen Seiten sind stark animiert; Inhalte werden hier als
 * Felder gepflegt und in den bestehenden Komponenten eingesetzt – KEINE
 * vollstaendige Blok-Komposition, um die Animationen nicht zu brechen.
 */
export const pageComponent: StoryblokComponentSpec = {
  name: "page",
  display_name: "Seite",
  is_root: true,
  is_nestable: false,
  description: "Feldbasierte Seiteninhalte (Titel, Texte, Bilder, SEO).",
  schema: [
    { name: "title", type: "text", display_name: "Seitentitel" },
    { name: "heroEyebrow", type: "text", display_name: "Hero-Label" },
    { name: "heroHeadline", type: "text", display_name: "Hero-Ueberschrift" },
    { name: "heroImage", type: "asset", display_name: "Hero-Bild" },
    { name: "intro", type: "richtext", display_name: "Einleitung" },
    { name: "sections", type: "richtext", display_name: "Abschnitte" },
    { name: "seoTitle", type: "text", display_name: "SEO-Titel" },
    {
      name: "seoDescription",
      type: "textarea",
      display_name: "SEO-Beschreibung",
    },
  ],
};

/** Alle Komponenten in der Reihenfolge, in der sie angelegt werden sollten. */
export const allComponents: StoryblokComponentSpec[] = [
  navItemComponent,
  openingHoursComponent,
  settingsComponent,
  referenceComponent,
  newsComponent,
  pageComponent,
];
