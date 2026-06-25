import type { Metadata } from "next";
import { Contact } from "@/site/pages/Contact";
import { buildMetadata } from "@/site/config/seo";
import { getContactContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("contact");

export default async function Page() {
  const content = await getContactContent();
  return <Contact content={content} />;
}
