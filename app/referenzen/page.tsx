import type { Metadata } from "next";
import { References } from "@/site/pages/References";
import { buildMetadata } from "@/site/config/seo";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { getReferencesContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("references");

export default async function Page() {
  const content = await getReferencesContent();
  return (
    <>
      <JsonLd
        data={graph([breadcrumbJsonLd("references"), webPageJsonLd("references", "CollectionPage")])}
      />
      <References content={content} />
    </>
  );
}
