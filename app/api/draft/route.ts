import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Draft-Mode aktivieren (Storyblok Visual Editor).
 *
 * Wird von der Middleware aufgerufen, sobald die Seite im Visual Editor
 * (Query `_storyblok`) geladen wird. Aktiviert den Next.js Draft-Mode (setzt
 * das Bypass-Cookie) und leitet zurueck zur eigentlichen Story-URL. Aus
 * Sicherheitsgruenden wird nur weitergeleitet, wenn das Ziel tatsaechlich
 * eine interne Storyblok-Vorschau-URL ist.
 */
export async function GET(req: NextRequest) {
  const redirect = req.nextUrl.searchParams.get("redirect") || "/";

  // Nur interne Pfade zulassen (kein Open-Redirect) und nur im Editor-Kontext.
  const isInternal = redirect.startsWith("/") && !redirect.startsWith("//");
  const isEditor = redirect.includes("_storyblok");
  if (!isInternal || !isEditor) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(redirect, req.url));
}
