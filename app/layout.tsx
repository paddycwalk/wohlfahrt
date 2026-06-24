import type { Metadata } from "next";
import type { Viewport } from "next";
import ReactDOM from "react-dom";
import "@/styles/index.css";
import { SiteShell } from "@/site/components/templates/SiteShell";
import { fontFaceCss, fontPreloads } from "@/site/config/fonts";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
  LOCALE,
} from "@/site/config/seo";

// Vorschau-Build (GitHub Pages) erkennen: dort ist ein Base-Path gesetzt.
// Die Vorschau soll NICHT von Suchmaschinen indexiert werden, damit nur die
// echte Domain (FTP) in Google landet.
const IS_PREVIEW = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "Fliesen",
    "Fliesenleger",
    "Fliesenleger Pfullingen",
    "Naturstein",
    "Badgestaltung",
    "Fliesenverlegung",
    "Meisterbetrieb",
    "Wohlfahrt & Wohlfahrt",
    "Fliesen Reutlingen",
    "Ausstellung Fliesen",
  ],
  alternates: { canonical: "/" },
  robots: IS_PREVIEW
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: LOCALE,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c41e1e",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: "W&W Fliesen",
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: "+49 7121 71082",
  email: "info@fliesen-wohlfahrt.de",
  foundingDate: "1954",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hinterer Spielbach 4",
    postalCode: "72793",
    addressLocality: "Pfullingen",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.4658,
    longitude: 9.2256,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "17:00",
    },
  ],
  areaServed: ["Pfullingen", "Reutlingen", "Tübingen", "Baden-Württemberg"],
  sameAs: [
    "https://www.facebook.com/FliesenWohlfahrt/",
    "https://www.instagram.com/fliesen_wohlfahrt/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kritische Schriften vorab laden (React 19 dedupliziert automatisch und
  // hoistet die Preload-Hints in den <head>).
  fontPreloads.forEach((href) =>
    ReactDOM.preload(href, {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    }),
  );

  return (
    <html lang="de">
      <head>
        {/* Strukturierte Daten (LocalBusiness) fuer Suchmaschinen */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Selbst gehostete @font-face-Regeln (Base-Path-bewusst) */}
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: fontFaceCss }}
        />
        {/* Verbindungs-Latenz fuer externe Bilder reduzieren */}
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
