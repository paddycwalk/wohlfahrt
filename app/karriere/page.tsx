import type { Metadata } from "next";
import { Career } from "@/site/pages/Career";
import { buildMetadata } from "@/site/config/seo";
import { getCareerContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("career");

export default async function Page() {
  const content = await getCareerContent();
  return <Career content={content} />;
}
