/**
 * Typdefinitionen fuer die zentrale Content-Schicht.
 *
 * Diese Typen beschreiben die Inhalte, die spaeter aus Storyblok geladen
 * werden. Bis ein Storyblok-Space existiert (oder beim Build ohne Token),
 * dienen die Defaults in `site.ts` als lokaler Fallback – die Seite
 * funktioniert also mit und ohne CMS.
 */

/** Ein Navigationspunkt (Header, Footer, Schnelllinks). */
export interface NavItem {
  name: string;
  /** Interner Pfad mit fuehrendem Slash, z. B. "/leistungen". */
  path: string;
}

/** Geokoordinaten fuer JSON-LD / Karte. */
export interface Geo {
  latitude: number;
  longitude: number;
}

/** Wochentag in Schema.org-Schreibweise. */
export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Ein Zeitfenster innerhalb eines Tages, z. B. 08:00 – 12:30. */
export interface TimeRange {
  opens: string; // "08:00"
  closes: string; // "12:30"
}

/** Die Oeffnungszeiten eines einzelnen Wochentags (Anzeige & JSON-LD). */
export interface OpeningDay {
  day: Weekday;
  /** Geschlossen-Schalter aus Storyblok – Zeitfenster werden dann ignoriert. */
  closed: boolean;
  /** Ein oder zwei Zeitfenster (z. B. Vormittag/Nachmittag). */
  slots: TimeRange[];
}

/** Globale, seitenweit genutzte Geschaeftsdaten (Storyblok: "settings"). */
export interface SiteSettings {
  companyName: string;
  legalName: string;
  /** Kurzclaim in der Kopfzeile, z. B. "Meisterbetrieb seit 1954". */
  tagline: string;
  /** Kurzer Einleitungstext (Footer). */
  footerIntro: string;
  /** Gruendungsjahr, z. B. 1954. */
  foundingYear: number;
  /** Erfahrung in Jahren (fuer "seit ueber X Jahren"). */
  yearsExperience: number;

  // Kontakt & Adresse
  street: string;
  zip: string;
  city: string;
  region: string;
  country: string; // ISO, z. B. "DE"
  /** Telefon zur Anzeige, z. B. "07121 / 71082". */
  phone: string;
  /** Telefon fuer tel:-Link, z. B. "+49712171082". */
  phoneHref: string;
  email: string;

  // Oeffnungszeiten
  /** Ein Eintrag je Wochentag (Storyblok: ein `opening_day`-Blok pro Tag). */
  openingHours: OpeningDay[];
  /** Zusatzhinweis unter den Zeiten, z. B. "Beratung nach Vereinbarung". */
  openingHoursNote: string;

  // Sonstiges
  social: {
    facebook?: string;
    instagram?: string;
  };
  geo: Geo;
  mapEmbedUrl: string;

  // Navigation
  mainNav: NavItem[];
  footerQuickLinks: NavItem[];
  legalNav: NavItem[];
}
