import type { Metadata } from "next";
import { Products } from "@/site/pages/Products";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("products");

export default function Page() {
  return <Products />;
}
