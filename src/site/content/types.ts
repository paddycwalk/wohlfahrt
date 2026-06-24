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

/** Eine strukturierte Oeffnungszeit (fuer Anzeige & JSON-LD). */
export interface OpeningHours {
  /** Wochentage in Schema.org-Schreibweise, z. B. ["Monday", ...]. */
  days: string[];
  opens: string; // "08:00"
  closes: string; // "12:30"
}

/** Globale, seitenweit genutzte Geschaeftsdaten (Storyblok: "settings"). */
export interface SiteSettings {
  companyName: string;
  legalName: string;
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
  /** Strukturiert (JSON-LD). */
  openingHours: OpeningHours[];
  /** Zusatzhinweis, z. B. "Sa.: Nach Vereinbarung". */
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
