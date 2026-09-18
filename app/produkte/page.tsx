import type { Metadata } from "next";
import { Products } from "@/site/pages/Products";
import { buildMetadata } from "@/site/config/seo";
import {
  breadcrumbJsonLd,
  graph,
  webPageJsonLd,
} from "@/site/config/jsonld";
import { JsonLd } from "@/site/components/atoms/JsonLd";
import { getProductsContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("products");

export default async function Page() {
  const content = await getProductsContent();
  return (
    <>
      <JsonLd
        data={graph([breadcrumbJsonLd("products"), webPageJsonLd("products", "CollectionPage")])}
      />
      <Products content={content} />
    </>
  );
}
