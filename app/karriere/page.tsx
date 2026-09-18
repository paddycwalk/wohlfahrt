import type { Metadata } from "next";
import { Career } from "@/site/pages/Career";
import { buildMetadata } from "@/site/config/seo";
import { getCareerContent } from "@/site/content";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";

export const metadata: Metadata = buildMetadata("career");

export default async function Page() {
  const content = await getCareerContent();
  return (
    <>
      {/* Bewusst (noch) kein `JobPosting`: Google verlangt dafuer ein
          `datePosted` je Stelle, das im Content-Modell nicht existiert.
          Erfundene Daten wuerden die Strukturdaten ungueltig machen. */}
      <JsonLd
        data={graph([breadcrumbJsonLd("career"), webPageJsonLd("career")])}
      />
      <Career content={content} />
    </>
  );
}
