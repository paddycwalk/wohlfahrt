import type { Metadata } from "next";
import { Products } from "@/site/pages/Products";
import { buildMetadata } from "@/site/config/seo";
import { getProductsContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("products");

export default async function Page() {
  const content = await getProductsContent();
  return <Products content={content} />;
}
