import type { Metadata } from "next";
import { Services } from "@/site/pages/Services";
import { buildMetadata } from "@/site/config/seo";
import { getServicesContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("services");

export default async function Page() {
  const content = await getServicesContent();
  return <Services content={content} />;
}
