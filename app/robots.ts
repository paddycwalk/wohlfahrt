import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site/config/seo";

// Statischer Export benoetigt diese Angabe fuer Routen-Handler.
export const dynamic = "force-static";

// Vorschau-Build (GitHub Pages) komplett fuer Crawler sperren, damit nur die
// echte Domain (FTP) indexiert wird.
const IS_PREVIEW = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

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
