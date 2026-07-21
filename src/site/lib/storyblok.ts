import StoryblokClient from "storyblok-js-client";

/**
 * Zentrale Storyblok-Konfiguration.
 *
 * Es wird bewusst `storyblok-js-client` direkt genutzt (reiner HTTP-Client).
 *
 * Aktiviert wird Storyblok nur, wenn ein Token gesetzt ist
 * (`STORYBLOK_TOKEN`). Ohne Token bleibt die Seite voll funktionsfaehig und
 * nutzt die lokalen Defaults aus `src/site/content/` – so kann gebaut werden,
 * bevor der Space existiert.
 *
 * Die Draft/Published-Version wird pro Anfrage in `resolveVersion`
 * (src/site/content/index.ts) ermittelt.
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

/** Storyblok-Client (nur initialisiert, wenn ein Token vorhanden ist). */
export const storyblokClient: StoryblokClient | null = TOKEN
  ? new StoryblokClient({ accessToken: TOKEN, region: REGION })
  : null;
