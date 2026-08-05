/**
 * Jahresangaben aus dem Gruendungsjahr ableiten.
 *
 * Saetze wie "seit ueber 67 Jahren" veralten still, und eine zweite Stelle mit
 * "1954" laeuft irgendwann auseinander – deshalb stehen in den Inhalten (lokale
 * Defaults *und* Storyblok) nur Platzhalter:
 *
 * - `{{jahre}}`          -> vollendete Jahre seit der Gruendung
 * - `{{gruendungsjahr}}` -> das Gruendungsjahr selbst
 *
 * Aufgeloest werden sie pro Anfrage in der Content-Schicht
 * (`src/site/content/index.ts` -> `withYears`), bewusst nicht beim
 * Modul-Import: So stimmt die Zahl auch dann noch, wenn ein Server-Prozess
 * ueber den Jahrestag hinaus laeuft. Grundlage ist das in Storyblok gepflegte
 * `foundingYear` – es gibt also genau eine Quelle fuer die Jahreszahl.
 *
 * Redaktion: beide Platzhalter funktionieren in jedem Textfeld in Storyblok.
 */

/** Gruendung des Betriebs: 01.02.1954 (siehe Zeitleiste auf "Ueber uns"). */
export const FOUNDING_YEAR = 1954;
const FOUNDING_MONTH = 2; // Februar
const FOUNDING_DAY = 1;

/**
 * Vollendete Jahre seit der Gruendung.
 *
 * Vor dem Jahrestag zaehlt das laufende Jahr noch nicht mit – damit stimmt
 * "seit ueber X Jahren" ganzjaehrig und nicht erst ab Februar.
 */
export function yearsSinceFounding(
  foundingYear: number = FOUNDING_YEAR,
  now: Date = new Date(),
): number {
  const month = now.getMonth() + 1;
  const beforeAnniversary =
    month < FOUNDING_MONTH ||
    (month === FOUNDING_MONTH && now.getDate() < FOUNDING_DAY);
  return now.getFullYear() - foundingYear - (beforeAnniversary ? 1 : 0);
}

/** Platzhalter fuer die Jahre seit Gruendung – in Inhalten verwendbar. */
export const YEARS_TOKEN = "{{jahre}}";

/** Platzhalter fuer das Gruendungsjahr – in Inhalten verwendbar. */
export const FOUNDING_YEAR_TOKEN = "{{gruendungsjahr}}";

/** Erlaubt Schreibweisen wie {{jahre}}, {{ Jahre }} oder {{JAHRE}}. */
const YEARS_TOKEN_RE = /\{\{\s*jahre\s*\}\}/gi;

/** Dito fuer {{gruendungsjahr}} – auch "gruendungsjahr" mit ue geschrieben. */
const FOUNDING_YEAR_TOKEN_RE = /\{\{\s*gr(?:ue|ü)ndungsjahr\s*\}\}/gi;

/**
 * Ersetzt `{{jahre}}` und `{{gruendungsjahr}}` rekursiv in allen Zeichenketten
 * eines Inhaltsobjekts.
 *
 * Arrays und verschachtelte Objekte werden dabei kopiert – die Vorlage bleibt
 * unveraendert, weil die lokalen Defaults geteilte Modul-Objekte sind und
 * nicht mutiert werden duerfen.
 */
export function resolveYearTokens<T>(
  value: T,
  foundingYear: number = FOUNDING_YEAR,
  now?: Date,
): T {
  return walk(value, {
    years: String(yearsSinceFounding(foundingYear, now)),
    foundingYear: String(foundingYear),
  }) as T;
}

interface Replacements {
  years: string;
  foundingYear: string;
}

function walk(value: unknown, r: Replacements): unknown {
  if (typeof value === "string") {
    // Billiger Vorab-Check: die allermeisten Felder enthalten kein Token.
    if (!value.includes("{{")) return value;
    return value
      .replace(YEARS_TOKEN_RE, r.years)
      .replace(FOUNDING_YEAR_TOKEN_RE, r.foundingYear);
  }
  if (Array.isArray(value)) {
    return value.map((item) => walk(item, r));
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = walk(item, r);
    }
    return out;
  }
  return value;
}
