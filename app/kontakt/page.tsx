import type { Metadata } from "next";
import { Contact } from "@/site/pages/Contact";
import { buildMetadata } from "@/site/config/seo";
import { getContactContent } from "@/site/content";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";

export const metadata: Metadata = buildMetadata("contact");

export default async function Page() {
  const content = await getContactContent();

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbJsonLd("contact"),
          // Telefon, E-Mail und Kontaktweg haengen am Betriebs-Knoten im
          // Layout (app/layout.tsx) und gelten damit fuer jede Seite.
          webPageJsonLd("contact", "ContactPage"),
        ])}
      />
      <Contact content={content} />
    </>
  );
}
