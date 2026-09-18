import type { Metadata } from "next";
import { Imprint } from "@/site/pages/Imprint";
import { buildMetadata } from "@/site/config/seo";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { getImprintContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("imprint");

export default async function Page() {
  const content = await getImprintContent();
  return (
    <>
      <JsonLd
        data={graph([breadcrumbJsonLd("imprint"), webPageJsonLd("imprint", "WebPage")])}
      />
      <Imprint content={content} />
    </>
  );
}
