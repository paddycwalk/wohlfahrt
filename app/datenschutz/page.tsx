import type { Metadata } from "next";
import { Privacy } from "@/site/pages/Privacy";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("privacy");

export default function Page() {
  return <Privacy />;
}
