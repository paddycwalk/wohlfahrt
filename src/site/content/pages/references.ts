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
    "https://images.unsplash.com/photo-1625578622297-56606e41830f?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3NTcyODQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  heroEyebrow: "Referenzen",
  heroTitle: "Unsere Projekte",
  galleryLabel: "Portfolio",
  galleryTitle: "Qualität, die man sehen kann",
  projects: [
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/badezimmer-fliesenleger-fliesen.jpeg?w=915&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/DSC_0113-3.jpeg?w=915&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/IMG-20201120-WA0007.jpeg?resize=1080%2C772&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/e252c771-32a9-44d7-9ef2-fe6bdea5a1db-1.jpeg?w=1024&ssl=1",
    },
    {
      title: "Badezimmer",
      category: "Bad",
      image:
        "https://i0.wp.com/www.fliesen-wohlfahrt.de/wp-content/uploads/2021/02/IMG_20201125_103955.jpeg?resize=1080%2C772&ssl=1",
    },
  ],
  ctaTitlePre: "Ihr Projekt",
  ctaTitleAccent: "ist das nächste",
  ctaText:
    "Über 1000 zufriedene Kunden vertrauen auf unsere Expertise. Werden Sie Teil unserer Erfolgsgeschichte.",
  ctaButtonLabel: "Kontakt aufnehmen",
  ctaButtonLink: "/kontakt",
};
