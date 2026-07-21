import type { Metadata } from "next";
import type { Viewport } from "next";
import ReactDOM from "react-dom";
import "@/styles/index.css";
import { SiteShell } from "@/site/components/templates/SiteShell";
import { fontFaceCss, fontPreloads } from "@/site/config/fonts";
import { getSiteSettings } from "@/site/content";
import { SiteSettingsProvider } from "@/site/content/SiteSettingsProvider";
import { StoryblokProvider } from "@/site/components/providers/StoryblokProvider";
import type { SiteSettings } from "@/site/content/types";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
  LOCALE,
} from "@/site/config/seo";

// Vercel-Vorschau-Deployments (Branch-/Preview-Builds) NICHT indexieren –
// nur die Produktions-Domain soll in Google landen. Lokal (kein VERCEL_ENV)
// bleibt es indexierbar.
const IS_PREVIEW = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV !== "production"
  : false;

// ISR-Sicherheitsnetz: Seiten spaetestens stuendlich neu erzeugen, falls der
// Publish-Webhook (/api/revalidate) einmal nicht greift. Gilt als Default fuer
// alle Routen unter diesem Layout.
export const revalidate = 3600;

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

function buildJsonLd(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: "W&W Fliesen",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}${OG_IMAGE}`,
    telephone: s.phoneHref,
    email: s.email,
    foundingDate: String(s.foundingYear),
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: s.street,
      postalCode: s.zip,
      addressLocality: s.city,
      addressRegion: s.region,
      addressCountry: s.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: s.geo.latitude,
      longitude: s.geo.longitude,
    },
    openingHoursSpecification: s.openingHours.map((oh) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: oh.days,
      opens: oh.opens,
      closes: oh.closes,
    })),
    areaServed: ["Pfullingen", "Reutlingen", "Tübingen", "Baden-Württemberg"],
    sameAs: [s.social.facebook, s.social.instagram].filter(Boolean),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Globale Geschaeftsdaten zur Build-Zeit laden (Storyblok oder Defaults).
  const settings = await getSiteSettings();
  const jsonLd = buildJsonLd(settings);

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
        <StoryblokProvider>
          <SiteSettingsProvider settings={settings}>
            <SiteShell>{children}</SiteShell>
          </SiteSettingsProvider>
        </StoryblokProvider>
      </body>
    </html>
  );
}
