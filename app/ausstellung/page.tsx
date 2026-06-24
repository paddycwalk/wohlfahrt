import type { Metadata } from "next";
import { Showroom } from "@/site/pages/Showroom";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("showroom");

export default function Page() {
  return <Showroom />;
}
