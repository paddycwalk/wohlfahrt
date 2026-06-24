import type { SiteSettings } from "./types";

/**
 * Lokale Default-Geschaeftsdaten – die einzige Quelle der Wahrheit, solange
 * kein Storyblok-Space angebunden ist. Sobald Storyblok aktiv ist, ueberlagert
 * der CMS-Inhalt diese Werte (siehe `lib/storyblok.ts -> getSiteSettings`).
 *
 * Diese Datei ersetzt die zuvor ueber mehrere Komponenten verstreuten
 * Kontakt-/Adress-/Oeffnungszeiten-Angaben.
 */
export const defaultSiteSettings: SiteSettings = {
  companyName: "Wohlfahrt & Wohlfahrt",
  legalName: "Wohlfahrt & Wohlfahrt Fliesen GmbH",
  footerIntro:
    "Ihr Experte für hochwertige Fliesen und professionelle Verlegung seit über 67 Jahren.",
  foundingYear: 1954,
  yearsExperience: 67,

  street: "Hinterer Spielbach 4",
  zip: "72793",
  city: "Pfullingen",
  region: "Baden-Württemberg",
  country: "DE",
  phone: "07121 / 71082",
  phoneHref: "+49712171082",
  email: "info@fliesen-wohlfahrt.de",

  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:30",
    },
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "17:00",
    },
  ],
  openingHoursNote: "Sa.: Nach Vereinbarung",

  social: {
    facebook: "https://www.facebook.com/FliesenWohlfahrt/",
    instagram: "https://www.instagram.com/fliesen_wohlfahrt/",
  },
  geo: { latitude: 48.4658, longitude: 9.2256 },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.5!2d9.2252!3d48.4525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799ed6e5e6b1b1d%3A0x0!2sHinterer%20Spielbach%204%2C%2072793%20Pfullingen!5e0!3m2!1sde!2sde!4v1234567890",

  mainNav: [
    { name: "Startseite", path: "/" },
    { name: "Über uns", path: "/ueber-uns" },
    { name: "Leistungen", path: "/leistungen" },
    { name: "Ausstellung", path: "/ausstellung" },
    { name: "Referenzen", path: "/referenzen" },
    { name: "Produkte", path: "/produkte" },
    { name: "Aktuelles", path: "/aktuelles" },
    { name: "Karriere", path: "/karriere" },
    { name: "Kontakt", path: "/kontakt" },
  ],
  footerQuickLinks: [
    { name: "Über uns", path: "/ueber-uns" },
    { name: "Leistungen", path: "/leistungen" },
    { name: "Produkte", path: "/produkte" },
    { name: "Karriere", path: "/karriere" },
  ],
  legalNav: [
    { name: "Impressum", path: "/impressum" },
    { name: "Datenschutz", path: "/datenschutz" },
    { name: "Haftungsausschluss", path: "/haftungsausschluss" },
  ],
};

/**
 * Hilfsfunktion: erzeugt die Adresse als mehrzeiligen String.
 */
export function formatAddress(s: SiteSettings): string[] {
  return [s.street, `${s.zip} ${s.city}`];
}

/**
 * Hilfsfunktion: erzeugt die Oeffnungszeiten als Anzeige-Zeilen
 * (z. B. "Mo. – Fr.: 08:00 – 12:30 Uhr").
 */
export function formatOpeningHours(s: SiteSettings): string[] {
  const dayShort: Record<string, string> = {
    Monday: "Mo.",
    Tuesday: "Di.",
    Wednesday: "Mi.",
    Thursday: "Do.",
    Friday: "Fr.",
    Saturday: "Sa.",
    Sunday: "So.",
  };
  const lines = s.openingHours.map((oh) => {
    const first = dayShort[oh.days[0]] ?? oh.days[0];
    const last =
      dayShort[oh.days[oh.days.length - 1]] ?? oh.days[oh.days.length - 1];
    const range = oh.days.length > 1 ? `${first} – ${last}` : first;
    return `${range}: ${oh.opens} – ${oh.closes} Uhr`;
  });
  if (s.openingHoursNote) lines.push(s.openingHoursNote);
  return lines;
}
