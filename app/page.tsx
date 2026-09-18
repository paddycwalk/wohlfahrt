import type { Metadata } from "next";
import { Home } from "@/site/pages/Home";
import { buildMetadata } from "@/site/config/seo";
import { getHomeContent } from "@/site/content";
import { graph, webPageJsonLd } from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";

export const metadata: Metadata = buildMetadata("home");

export default async function Page() {
  const content = await getHomeContent();
  return (
    <>
      {/* Die Startseite ist die Wurzel – kein Brotkrumen-Pfad. */}
      <JsonLd data={graph([webPageJsonLd("home")])} />
      <Home content={content} />
    </>
  );
}
