import type { Metadata } from "next";
import { Services } from "@/site/pages/Services";
import { buildMetadata } from "@/site/config/seo";
import { getServicesContent } from "@/site/content";
import {
  BUSINESS_ID,
  breadcrumbJsonLd,
  graph,
  pageUrl,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { stripFocus } from "@/site/lib/image";

export const metadata: Metadata = buildMetadata("services");

export default async function Page() {
  const content = await getServicesContent();

  // Jede Leistung als eigene `Service`-Entitaet. Damit kann eine KI-Suche
  // "Wer macht X in Pfullingen?" direkt beantworten, statt die Ueberschriften
  // des Fliesstextes zu raten.
  const serviceList = {
    "@type": "ItemList",
    "@id": `${pageUrl("services")}#services`,
    name: "Leistungen",
    numberOfItems: content.services.length,
    itemListElement: content.services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        image: stripFocus(service.image),
        serviceType: service.title,
        provider: { "@id": BUSINESS_ID },
        areaServed: [
          "Pfullingen",
          "Reutlingen",
          "Tübingen",
          "Baden-Württemberg",
        ],
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbJsonLd("services"),
          webPageJsonLd("services"),
          serviceList,
        ])}
      />
      <Services content={content} />
    </>
  );
}
