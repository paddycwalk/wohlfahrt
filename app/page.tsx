import type { Metadata } from "next";
import { Home } from "@/site/pages/Home";
import { buildMetadata } from "@/site/config/seo";
import { getHomeContent } from "@/site/content";

export const metadata: Metadata = buildMetadata("home");

export default async function Page() {
  const content = await getHomeContent();
  return <Home content={content} />;
}
