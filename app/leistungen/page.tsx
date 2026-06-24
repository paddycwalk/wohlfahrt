import type { Metadata } from "next";
import { Services } from "@/site/pages/Services";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("services");

export default function Page() {
  return <Services />;
}
