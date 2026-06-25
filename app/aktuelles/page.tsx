import type { Metadata } from "next";
import { News } from "@/site/pages/News";
import { buildMetadata } from "@/site/config/seo";
import { getNewsContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("news");

export default async function Page() {
  const content = await getNewsContent();
  return <News content={content} />;
}
