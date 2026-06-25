import type { Metadata } from "next";
import { Imprint } from "@/site/pages/Imprint";
import { buildMetadata } from "@/site/config/seo";
import { getImprintContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("imprint");

export default async function Page() {
  const content = await getImprintContent();
  return <Imprint content={content} />;
}
