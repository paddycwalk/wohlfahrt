import type { OpeningDay, SiteSettings, TimeRange, Weekday } from "./types";
import {
  FOUNDING_YEAR,
  FOUNDING_YEAR_TOKEN,
  YEARS_TOKEN,
  yearsSinceFounding,
} from "../lib/years";

/** Wochentage in Anzeige- und Sortierreihenfolge (Montag zuerst). */
export const WEEKDAYS: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** Kurzform der Wochentage fuer die Anzeige. */
const DAY_SHORT: Record<Weekday, string> = {
  Monday: "Mo.",
  Tuesday: "Di.",
  Wednesday: "Mi.",
  Thursday: "Do.",
  Friday: "Fr.",
  Saturday: "Sa.",
  Sunday: "So.",
};

/** Anzeigetext fuer Tage ohne Zeitfenster bzw. mit gesetztem Geschlossen-Schalter. */
export const CLOSED_LABEL = "Geschlossen";

const WORKDAY_SLOTS: TimeRange[] = [
  { opens: "08:00", closes: "12:30" },
  { opens: "14:00", closes: "17:00" },
];

const openDay = (day: Weekday): OpeningDay => ({
  day,
  closed: false,
  slots: WORKDAY_SLOTS.map((slot) => ({ ...slot })),
});

const closedDay = (day: Weekday): OpeningDay => ({
  day,
  closed: true,
  slots: [],
});

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
  tagline: `Meisterbetrieb seit ${FOUNDING_YEAR_TOKEN}`,
  footerIntro: `Ihr Experte für hochwertige Fliesen und professionelle Verlegung seit über ${YEARS_TOKEN} Jahren.`,
  foundingYear: FOUNDING_YEAR,
  // Abgeleitet statt gepflegt: als Getter, damit die Zahl auch in einem lang
  // laufenden Prozess ueber den Jahrestag hinaus stimmt.
  get yearsExperience() {
    return yearsSinceFounding();
  },

  street: "Hinterer Spielbach 4",
  zip: "72793",
  city: "Pfullingen",
  region: "Baden-Württemberg",
  country: "DE",
  phone: "07121 / 71082",
  phoneHref: "+49712171082",
  email: "info@fliesen-wohlfahrt.de",

  // Pro Wochentag gepflegt, damit ein einzelner Tag (z. B. Betriebsurlaub oder
  // ein Feiertag) in Storyblok ohne Umbau auf "Geschlossen" gestellt werden kann.
  openingHours: [
    openDay("Monday"),
    openDay("Tuesday"),
    openDay("Wednesday"),
    openDay("Thursday"),
    openDay("Friday"),
    closedDay("Saturday"),
    closedDay("Sunday"),
  ],
  openingHoursNote: "Beratung nach Vereinbarung",

  social: {
    facebook: "https://www.facebook.com/FliesenWohlfahrt/",
    instagram: "https://www.instagram.com/fliesen_wohlfahrt/",
  },
  // Gebaeude Hinterer Spielbach 4 laut OpenStreetMap. Fuer JSON-LD und lokale
  // Suche zaehlt die Hausposition, nicht die Ortsmitte.
  geo: { latitude: 48.47235, longitude: 9.23452 },
  // Adress-Suche (`!2m1!1s<Adresse>`, Zoom `!6i16`) statt fester Koordinaten:
  // Google setzt die Nadel selbst auf die Adresse, ohne API-Schluessel.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sHinterer+Spielbach+4,+72793+Pfullingen!6i16",

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
  // Alle Hauptseiten: das Menue-Overlay existiert erst nach dem Klick im DOM,
  // fuer Suchmaschinen ist der Footer daher die einzige seitenweite
  // Verlinkung. Fehlte eine Seite hier, war sie praktisch verwaist.
  footerQuickLinks: [
    { name: "Über uns", path: "/ueber-uns" },
    { name: "Leistungen", path: "/leistungen" },
    { name: "Ausstellung", path: "/ausstellung" },
    { name: "Referenzen", path: "/referenzen" },
    { name: "Produkte", path: "/produkte" },
    { name: "Aktuelles", path: "/aktuelles" },
    { name: "Karriere", path: "/karriere" },
    { name: "Kontakt", path: "/kontakt" },
  ],
  legalNav: [
    { name: "Impressum", path: "/impressum" },
    { name: "Datenschutz", path: "/datenschutz" },
    { name: "Haftungsausschluss", path: "/haftungsausschluss" },
  ],
};

/** Nur vollstaendig gepflegte Zeitfenster sind verwertbar. */
const isUsable = (slot: TimeRange) => Boolean(slot.opens && slot.closes);

/** Die verwertbaren Zeitfenster eines Wochentags (leer = geschlossen). */
function slotsOf(s: SiteSettings, day: Weekday): TimeRange[] {
  const entry = s.openingHours.find((d) => d.day === day);
  if (!entry || entry.closed) return [];
  return entry.slots.filter(isUsable);
}

/** Eine Anzeigezeile der Oeffnungszeiten (ein Wochentag). */
export interface OpeningHoursRow {
  day: Weekday;
  /** Kurzform des Wochentags, z. B. "Mo.". */
  label: string;
  /** Zeitfenster als Text, z. B. ["08:00 – 12:30", "14:00 – 17:00"]. */
  slots: string[];
  /** Geschlossen – kein gepflegtes Zeitfenster bzw. Schalter gesetzt. */
  closed: boolean;
}

/**
 * Erzeugt die Oeffnungszeiten als Anzeigezeilen – eine je Wochentag, Montag
 * zuerst. Ein Tag, der in Storyblok fehlt oder auf "Geschlossen" steht,
 * erscheint als geschlossen.
 */
export function openingHoursRows(s: SiteSettings): OpeningHoursRow[] {
  return WEEKDAYS.map((day) => {
    const slots = slotsOf(s, day);
    return {
      day,
      label: DAY_SHORT[day],
      slots: slots.map((slot) => `${slot.opens} – ${slot.closes}`),
      closed: slots.length === 0,
    };
  });
}

/**
 * Die Oeffnungszeiten als schema.org `OpeningHoursSpecification`.
 *
 * Tage mit identischem Zeitfenster werden zusammengefasst (kompakteres JSON-LD),
 * geschlossene Tage entfallen.
 */
export function openingHoursSpecification(s: SiteSettings) {
  const daysByRange = new Map<string, Weekday[]>();
  WEEKDAYS.forEach((day) => {
    slotsOf(s, day).forEach((slot) => {
      const key = `${slot.opens}-${slot.closes}`;
      daysByRange.set(key, [...(daysByRange.get(key) ?? []), day]);
    });
  });

  return [...daysByRange.entries()].map(([key, days]) => {
    const [opens, closes] = key.split("-");
    return {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}
