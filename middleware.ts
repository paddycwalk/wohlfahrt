import { NextRequest, NextResponse } from "next/server";

/**
 * Storyblok-Visual-Editor-Erkennung (ohne Cookie/Redirect)
 * =======================================================
 *
 * Der Visual Editor laedt die Seite in einem iframe und haengt den Query-
 * Parameter `_storyblok` an. Ist dieser vorhanden, setzen wir einen internen
 * Request-Header `x-sb-preview`. Der Server rendert dann Draft-Inhalte.
 *
 * Bewusst KEIN Draft-Mode-Cookie: Im iframe ist die Seite "third-party", und
 * Browser blockieren solche Cookies -> das fuehrte zu einer Redirect-Schleife
 * ("zu oft weitergeleitet"). Die Header-Loesung funktioniert in allen Browsern.
 */
export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  if (req.nextUrl.searchParams.has("_storyblok")) {
    requestHeaders.set("x-sb-preview", "1");
  } else {
    // Von aussen eingeschleuste Header niemals vertrauen.
    requestHeaders.delete("x-sb-preview");
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Nur auf Seiten-Routen laufen – API, Next-Interna und Assets ausklammern.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|fonts).*)"],
};
