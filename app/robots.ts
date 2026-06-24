import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site/config/seo";

// Statischer Export benoetigt diese Angabe fuer Routen-Handler.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // KI-Crawler explizit erlauben (bessere Auffindbarkeit in ChatGPT,
      // Claude, Perplexity, Google Gemini)
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
