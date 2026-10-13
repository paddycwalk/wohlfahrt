import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site/config/seo";

// Statischer Export benoetigt diese Angabe fuer Routen-Handler.
export const dynamic = "force-static";

// Nur Vercel-Vorschau-Deployments (Branch-/Preview-Builds) fuer Crawler
// sperren, damit ausschliesslich die Produktions-Domain indexiert wird.
const IS_PREVIEW = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV !== "production"
  : false;

export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // KI-Crawler explizit erlauben (bessere Auffindbarkeit in ChatGPT,
      // Claude, Perplexity, Google Gemini, Apple Intelligence). Je Anbieter
      // getrennt: Training, Suchindex und Abruf im Auftrag eines Nutzers.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
