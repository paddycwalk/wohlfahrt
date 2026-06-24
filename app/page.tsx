import type { Metadata } from "next";
import { Home } from "@/site/pages/Home";
import { buildMetadata } from "@/site/config/seo";

export const metadata: Metadata = buildMetadata("home");

export default function Page() {
  return <Home />;
}
