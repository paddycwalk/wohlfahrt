import type { Metadata } from "next";
import { Career } from "@/site/pages/Career";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("career");

export default function Page() {
  return <Career />;
}
