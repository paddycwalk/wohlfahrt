import type { Metadata } from "next";
import { Disclaimer } from "@/site/pages/Disclaimer";
import { buildMetadata } from "@/site/config/seo";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { getDisclaimerContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("disclaimer");

export default async function Page() {
  const content = await getDisclaimerContent();
  return (
    <>
      <JsonLd
        data={graph([breadcrumbJsonLd("disclaimer"), webPageJsonLd("disclaimer", "WebPage")])}
      />
      <Disclaimer content={content} />
    </>
  );
}
