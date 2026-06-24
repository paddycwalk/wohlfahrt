import type { Metadata } from "next";
import { News } from "@/site/pages/News";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("news");

export default function Page() {
  return <News />;
}
