/** Inhalt der Referenzen-Seite (feldbasiert, in Storyblok editierbar). */

export type ReferenceProject = {
  title: string;
  category: string;
  image: string;
  editable?: string;
};

export type ReferencesContent = {
  heroImage: string;
  heroEyebrow: string;
  heroTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  projects: ReferenceProject[];
  ctaTitlePre: string;
  ctaTitleAccent: string;
  ctaText: string;
  ctaButtonLabel: string;
  ctaButtonLink: string;
  editable?: string;
};

export const defaultReferencesContent: ReferencesContent = {
  heroImage:
    "https://a.storyblok.com/f/293408914760698/d4e4e5db3e/referenzen-hero.webp",
  heroEyebrow: "Referenzen",
  heroTitle: "Unsere Projekte",
  galleryLabel: "Portfolio",
  galleryTitle: "Qualität, die man sehen kann",
  projects: [
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://a.storyblok.com/f/293408914760698/7ad0800a6a/projekt-bad-1.webp",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://a.storyblok.com/f/293408914760698/0949fc2475/projekt-bad-2.webp",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://a.storyblok.com/f/293408914760698/54e72bfe7b/projekt-bad-3.webp",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://a.storyblok.com/f/293408914760698/dfde2b7a2e/projekt-bad-4.webp",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://a.storyblok.com/f/293408914760698/fcd40170d1/projekt-bad-5.webp",
    },
  ],
  ctaTitlePre: "Ihr Projekt",
  ctaTitleAccent: "ist das nächste",
  ctaText:
    "Über 1000 zufriedene Kunden vertrauen auf unsere Expertise. Werden Sie Teil unserer Erfolgsgeschichte.",
  ctaButtonLabel: "Kontakt aufnehmen",
  ctaButtonLink: "/kontakt",
};
