import { NextRequest, NextResponse } from "next/server";

/**
 * Storyblok-Visual-Editor-Erkennung
 * =================================
 *
 * Der Visual Editor laedt die Seite in einem iframe und haengt den Query-
 * Parameter `_storyblok` an. Ist der Next.js Draft-Mode dann noch nicht aktiv
 * (kein Bypass-Cookie), leiten wir einmalig ueber `/api/draft` um. Diese Route
 * aktiviert den Draft-Mode und schickt zurueck zur urspruenglichen URL – inkl.
 * der `_storyblok`-Parameter, die die Bridge braucht.
 *
 * Normale Besucher (ohne `_storyblok`) werden nicht angefasst und bleiben auf
 * der ISR-gecachten, veroeffentlichten Fassung.
 */
export function middleware(req: NextRequest) {
  const isEditor = req.nextUrl.searchParams.has("_storyblok");
  const draftActive = req.cookies.has("__prerender_bypass");

  if (isEditor && !draftActive) {
    const draftUrl = new URL("/api/draft/", req.url);
    draftUrl.searchParams.set(
      "redirect",
      req.nextUrl.pathname + req.nextUrl.search,
    );
    return NextResponse.redirect(draftUrl);
  }

  return NextResponse.next();
}

// Nur auf Seiten-Routen laufen – API, Next-Interna und Assets ausklammern.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|fonts).*)"],
};
