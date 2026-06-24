import type { Metadata } from "next";
import { References } from "@/site/pages/References";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("references");

export default function Page() {
  return <References />;
}
