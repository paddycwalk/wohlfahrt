import type { Metadata } from "next";
import { About } from "@/site/pages/About";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("about");

export default function Page() {
  return <About />;
}
