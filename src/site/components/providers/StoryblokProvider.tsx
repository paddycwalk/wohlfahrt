"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    if (!BRIDGE_TOKEN) return;

    // Nur im Visual Editor aktiv werden (Story wird im iframe mit ?_storyblok=… geladen).
    const inEditor =
      window.location.search.includes("_storyblok") ||
      window.self !== window.top;
    if (!inEditor) return;

    const BRIDGE_SRC = "https://app.storyblok.com/f/storyblok-v2-latest.js";

    let bridge: { on: (events: string[], cb: () => void) => void } | null =
      null;

    // Erst eine StoryblokBridge-Instanz aktiviert Hover-Outline + Klick-zu-Editieren.
    const init = () => {
      const SB = (
        window as unknown as {
          StoryblokBridge?: new (opts?: Record<string, unknown>) => {
            on: (events: string[], cb: () => void) => void;
          };
        }
      ).StoryblokBridge;
      if (!SB) return false;
      bridge = new SB();
      // Beim Speichern/Veroeffentlichen die Vorschau neu laden (Server-Render mit Draft).
      bridge.on(["published", "change"], () => {
        window.location.reload();
      });
      return true;
    };

    if (init()) return;

    // Bridge-Script laden, falls noch nicht vorhanden, dann instanziieren.
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${BRIDGE_SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = BRIDGE_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", init);

    // Fallback-Polling, falls das load-Event verpasst wurde.
    const interval = window.setInterval(() => {
      if (init()) window.clearInterval(interval);
    }, 300);
    const timeout = window.setTimeout(
      () => window.clearInterval(interval),
      10000,
    );

    return () => {
      script?.removeEventListener("load", init);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return <>{children}</>;
}
