import type { Metadata } from "next";
import { Contact } from "@/site/pages/Contact";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("contact");

export default function Page() {
  return <Contact />;
}
