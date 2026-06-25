import type { Metadata } from "next";
import { Privacy } from "@/site/pages/Privacy";
import { buildMetadata } from "@/site/config/seo";
import { getPrivacyContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("privacy");

export default async function Page() {
  const content = await getPrivacyContent();
  return <Privacy content={content} />;
}
