import type { Metadata } from "next";
import { Privacy } from "@/site/pages/Privacy";
import { buildMetadata } from "@/site/config/seo";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { getPrivacyContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("privacy");

export default async function Page() {
  const content = await getPrivacyContent();
  return (
    <>
      <JsonLd
        data={graph([breadcrumbJsonLd("privacy"), webPageJsonLd("privacy", "WebPage")])}
      />
      <Privacy content={content} />
    </>
  );
}
