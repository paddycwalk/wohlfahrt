import type { Metadata } from "next";
import { About } from "@/site/pages/About";
import { buildMetadata } from "@/site/config/seo";
import { getAboutContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("about");

export default async function Page() {
  const content = await getAboutContent();
  return <About content={content} />;
}
