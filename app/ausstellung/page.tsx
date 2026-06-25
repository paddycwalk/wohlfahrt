import type { Metadata } from "next";
import { Showroom } from "@/site/pages/Showroom";
import { buildMetadata } from "@/site/config/seo";
import { getShowroomContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("showroom");

export default async function Page() {
  const content = await getShowroomContent();
  return <Showroom content={content} />;
}
