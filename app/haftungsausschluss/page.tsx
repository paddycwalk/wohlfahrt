import type { Metadata } from "next";
import { Disclaimer } from "@/site/pages/Disclaimer";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("disclaimer");

export default function Page() {
  return <Disclaimer />;
}
