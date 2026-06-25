import type { Metadata } from "next";
import { Disclaimer } from "@/site/pages/Disclaimer";
import { buildMetadata } from "@/site/config/seo";
import { getDisclaimerContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("disclaimer");

export default async function Page() {
  const content = await getDisclaimerContent();
  return <Disclaimer content={content} />;
}
