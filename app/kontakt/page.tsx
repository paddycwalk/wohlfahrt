import type { Metadata } from "next";
import { Contact } from "@/site/pages/Contact";
import { buildMetadata } from "@/site/config/seo";
import { getContactContent, getSiteSettings } from "@/site/content";
import { SITE_URL } from "@/site/config/seo";
import {
  BUSINESS_ID,
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";

export const metadata: Metadata = buildMetadata("contact");

export default async function Page() {
  const [content, settings] = await Promise.all([
    getContactContent(),
    getSiteSettings(),
  ]);

  // Kontaktweg explizit auszeichnen: KI-Suchen beantworten "Wie erreiche ich
  // den Betrieb?" damit direkt, ohne den Fliesstext zu interpretieren.
  const contactPoint = {
    "@type": "ContactPoint",
    "@id": `${SITE_URL}/#contact-point`,
    contactType: "customer service",
    telephone: settings.phoneHref,
    email: settings.email,
    availableLanguage: ["de"],
    areaServed: "DE",
  };

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbJsonLd("contact"),
          webPageJsonLd("contact", "ContactPage"),
          // Ergaenzt den im Layout definierten Betriebs-Knoten, statt ihn zu
          // wiederholen – `@id` fuehrt beide Angaben zusammen.
          {
            "@id": BUSINESS_ID,
            "@type": "HomeAndConstructionBusiness",
            contactPoint,
          },
        ])}
      />
      <Contact content={content} />
    </>
  );
}
