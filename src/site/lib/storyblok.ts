import StoryblokClient from "storyblok-js-client";

/**
 * Zentrale Storyblok-Konfiguration (Build-Zeit-Datenabruf).
 *
 * Es wird bewusst `storyblok-js-client` direkt genutzt (reiner HTTP-Client),
 * da `@storyblok/react/rsc` Server Actions registriert, die mit dem Next.js
 * Static Export (`output: "export"`) inkompatibel sind.
 *
 * Aktiviert wird Storyblok nur, wenn ein Token gesetzt ist
 * (`STORYBLOK_TOKEN`). Ohne Token bleibt die Seite voll funktionsfaehig und
 * nutzt die lokalen Defaults aus `src/site/content/` – so kann gebaut werden,
 * bevor der Space existiert.
 *
 * Benoetigte Env-Variablen (siehe .env.example):
 *   STORYBLOK_TOKEN   – Preview- oder Public-Token (Content Delivery API)
 *   STORYBLOK_REGION  – eu | us | ap | ca | cn   (Standard: eu)
 *   STORYBLOK_VERSION – draft | published         (Standard: published)
 */

const TOKEN = process.env.STORYBLOK_TOKEN;
const REGION = (process.env.STORYBLOK_REGION || "eu") as
  | "eu"
  | "us"
  | "ap"
  | "ca"
  | "cn";

/** Ist Storyblok konfiguriert? */
export const isStoryblokEnabled = Boolean(TOKEN);

/**
 * Content-Version. Im Dev-Server (Visual Editor / Live-Vorschau) immer "draft",
 * damit Storyblok die `_editable`-Metadaten mitliefert (Click-to-Edit). Im
 * Production-Build gilt die Env-Variable bzw. "published".
 */
export const storyblokVersion: "draft" | "published" =
  process.env.NODE_ENV !== "production"
    ? "draft"
    : (process.env.STORYBLOK_VERSION as "draft" | "published") || "published";

/** Storyblok-Client (nur initialisiert, wenn ein Token vorhanden ist). */
export const storyblokClient: StoryblokClient | null = TOKEN
  ? new StoryblokClient({ accessToken: TOKEN, region: REGION })
  : null;
