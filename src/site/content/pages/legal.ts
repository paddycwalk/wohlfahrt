/**
 * Inhaltsmodell der Rechtsseiten (Impressum, Datenschutz, Haftungsausschluss).
 *
 * Diese Seiten bestehen aus langem Fliesstext mit Ueberschriften, Absaetzen
 * und Listen. Statt jeden Absatz in einzelne Bloks zu zerlegen, werden sie als
 * ein einziges Richtext-Feld (`body`) in Storyblok gepflegt. Zur Build-Zeit
 * wird das Richtext-Dokument in einen HTML-String gerendert.
 *
 * Solange in Storyblok kein Inhalt gepflegt ist (`bodyHtml === null`), rendert
 * die jeweilige Seite ihren bestehenden statischen JSX-Inhalt als Fallback.
 */
export interface LegalContent {
  /** Seitentitel (H1). */
  title: string;
  /** Aus dem Richtext gerenderter HTML-String – oder null fuer JSX-Fallback. */
  bodyHtml: string | null;
  /** Storyblok Click-to-Edit (nur im Editor gesetzt). */
  editable?: string;
}

export const defaultImprintContent: LegalContent = {
  title: "Impressum",
  bodyHtml: null,
};

export const defaultPrivacyContent: LegalContent = {
  title: "Datenschutz",
  bodyHtml: null,
};

export const defaultDisclaimerContent: LegalContent = {
  title: "Haftungsausschluss",
  bodyHtml: null,
};
