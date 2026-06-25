import type { Metadata } from "next";
import { References } from "@/site/pages/References";
import { buildMetadata } from "@/site/config/seo";
import { getReferencesContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("references");

export default async function Page() {
  const content = await getReferencesContent();
  return <References content={content} />;
}
