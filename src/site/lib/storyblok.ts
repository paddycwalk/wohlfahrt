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
  ? new StoryblokClient({
      accessToken: TOKEN,
      region: REGION,
      // Kein Zwischenspeicher.
      //
      // Der Client legt sonst alle Antworten im Arbeitsspeicher ab und leert
      // sie per Voreinstellung nur manuell (`cache: { clear: "manual" }`).
      // Auf Vercel faellt das nicht auf, weil dort staendig neue Instanzen
      // starten. Auf einem eigenen Server laeuft aber ein einziger Prozess
      // dauerhaft – dort blieben veroeffentlichte Aenderungen bis zum
      // naechsten Neustart unsichtbar.
      //
      // Die Seiten werden ohnehin pro Anfrage gerendert, ein Storyblok-Abruf
      // je Seitenaufruf ist also der beabsichtigte Weg.
      cache: {
        type: "none",
        // Dritte Ebene, und die eigentliche Ursache: der Client merkt sich die
        // Inhaltsversion (`cv`) aus der letzten Antwort und haengt sie an jede
        // weitere Anfrage. Storyblok liefert daraufhin aus seinem CDN die zu
        // dieser Version gespeicherte Fassung – die wiederum dieselbe alte `cv`
        // enthaelt. Der Client kommt aus diesem Zustand nicht mehr heraus, und
        // veroeffentlichte Aenderungen blieben bis zum Neustart unsichtbar.
        // "manual" heisst: `cv` wird nicht mitgeschickt. Fuer SSR ist das der
        // vom Hersteller vorgesehene Weg.
        cv: "manual",
      },
      // Zweite Ebene: Next.js ersetzt das globale `fetch` durch eine eigene
      // Fassung, die Antworten im Arbeitsspeicher behaelt.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    })
  : null;
