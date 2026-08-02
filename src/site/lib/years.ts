/**
 * Jahresangaben aus dem Gruendungsdatum ableiten.
 *
 * Saetze wie "seit ueber 67 Jahren" veralten still – deshalb steht in den
 * Inhalten (lokale Defaults *und* Storyblok) nur der Platzhalter `{{jahre}}`.
 *
 * Aufgeloest wird er pro Anfrage in der Content-Schicht
 * (`src/site/content/index.ts` -> `withYears`), bewusst nicht beim
 * Modul-Import: So stimmt die Zahl auch dann noch, wenn ein Server-Prozess
 * ueber den Jahrestag hinaus laeuft.
 *
 * Redaktion: `{{jahre}}` funktioniert in jedem Textfeld in Storyblok.
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
export function yearsSinceFounding(now: Date = new Date()): number {
  const month = now.getMonth() + 1;
  const beforeAnniversary =
    month < FOUNDING_MONTH ||
    (month === FOUNDING_MONTH && now.getDate() < FOUNDING_DAY);
  return now.getFullYear() - FOUNDING_YEAR - (beforeAnniversary ? 1 : 0);
}

/** Platzhalter fuer die Jahre seit Gruendung – in Inhalten verwendbar. */
export const YEARS_TOKEN = "{{jahre}}";

/** Erlaubt Schreibweisen wie {{jahre}}, {{ Jahre }} oder {{JAHRE}}. */
const YEARS_TOKEN_RE = /\{\{\s*jahre\s*\}\}/gi;

/**
 * Ersetzt `{{jahre}}` rekursiv in allen Zeichenketten eines Inhaltsobjekts.
 *
 * Arrays und verschachtelte Objekte werden dabei kopiert – die Vorlage bleibt
 * unveraendert, weil die lokalen Defaults geteilte Modul-Objekte sind und
 * nicht mutiert werden duerfen.
 */
export function resolveYearTokens<T>(value: T, now?: Date): T {
  return walk(value, String(yearsSinceFounding(now))) as T;
}

function walk(value: unknown, years: string): unknown {
  if (typeof value === "string") {
    // Billiger Vorab-Check: die allermeisten Felder enthalten kein Token.
    return value.includes("{{") ? value.replace(YEARS_TOKEN_RE, years) : value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => walk(item, years));
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = walk(item, years);
    }
    return out;
  }
  return value;
}
