import type { Metadata } from "next";
import { Imprint } from "@/site/pages/Imprint";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("imprint");

export default function Page() {
  return <Imprint />;
}
