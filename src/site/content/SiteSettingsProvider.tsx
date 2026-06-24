"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/site/content/types";
import { defaultSiteSettings } from "@/site/content/site";

/**
 * Stellt die globalen Geschaeftsdaten (aus Storyblok bzw. lokalen Defaults)
 * clientseitig bereit. Die Werte werden zur Build-Zeit in der RSC-Layout
 * geladen und hier hineingereicht – Client-Komponenten (Header, Footer,
 * Showroom) lesen sie ueber `useSiteSettings()`.
 */
const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

/** Hook fuer den Zugriff auf die globalen Geschaeftsdaten. */
export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
