"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";

/**
 * Visual-Editor-Bridge
 * ====================
 *
 * Initialisiert das Storyblok-Bridge-Script im Browser, damit der Storyblok
 * Visual Editor (Live-Vorschau) Aenderungen in Echtzeit anzeigen kann.
 *
 * Wichtig: Es wird der Client-Einstieg `@storyblok/react` genutzt (NICHT
 * `/rsc`), da letzterer Server Actions registriert, die mit dem Next.js
 * Static Export inkompatibel sind.
 *
 * Aktiv nur, wenn ein oeffentlicher Bridge-Token gesetzt ist
 * (`NEXT_PUBLIC_STORYBLOK_TOKEN`). Ohne Token wird nichts geladen und die
 * Seite verhaelt sich normal.
 *
 * Einbindung: in `app/layout.tsx` um die App legen, z. B.
 *   <StoryblokProvider>{children}</StoryblokProvider>
 */

const BRIDGE_TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
const REGION = (process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu") as
  | "eu"
  | "us"
  | "ap"
  | "ca"
  | "cn";

if (BRIDGE_TOKEN) {
  storyblokInit({
    accessToken: BRIDGE_TOKEN,
    use: [apiPlugin],
    apiOptions: { region: REGION },
    // Komponenten hier registrieren, sobald Bloks visuell editierbar sein
    // sollen (z. B. { page: PageBlok }).
    components: {},
  });
}

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
