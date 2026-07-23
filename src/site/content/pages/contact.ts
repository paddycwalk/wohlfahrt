/** Inhalt der Kontakt-Seite (feldbasiert, in Storyblok editierbar).
 *  Adresse/Telefon/E-Mail/Öffnungszeiten stammen aus den globalen SiteSettings. */

export type ContactContent = {
  heroEyebrow: string;
  heroTitle: string;
  infoLabel: string;
  infoTitle: string;
  formEyebrow: string;
  formTitle: string;
  reviewsTitle: string;
  reviewsText: string;
  reviewsButtonLabel: string;
  reviewsButtonLink: string;
  editable?: string;
};

export const defaultContactContent: ContactContent = {
  heroEyebrow: "Kontakt",
  heroTitle: "Lassen Sie uns sprechen",
  infoLabel: "Erreichbarkeit",
  infoTitle: "Kontaktieren Sie uns",
  formEyebrow: "Nachricht",
  formTitle: "Schreiben Sie uns",
  reviewsTitle: "Was unsere Kunden sagen",
  reviewsText:
    "Überzeugen Sie sich von unserer Qualität anhand der Bewertungen unserer Kunden.",
  reviewsButtonLabel: "Google Bewertungen",
  reviewsButtonLink: "https://g.page/FliesenWohlfahrt/review",
};
