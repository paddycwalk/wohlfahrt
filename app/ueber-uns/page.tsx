import type { Metadata } from "next";
import { About } from "@/site/pages/About";
import { buildMetadata } from "@/site/config/seo";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { getAboutContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("about");

export default async function Page() {
  const content = await getAboutContent();
  return (
    <>
      <JsonLd
        data={graph([breadcrumbJsonLd("about"), webPageJsonLd("about", "AboutPage")])}
      />
      <About content={content} />
    </>
  );
}
