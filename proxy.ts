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
export function proxy(req: NextRequest) {
  // Einfacher Passwortschutz (HTTP Basic Auth).
  // Nur aktiv, wenn SITE_PASSWORD gesetzt ist -> auf Vercel schuetzt es die
  // Seite, lokal (ohne die Variable) bleibt alles frei zugaenglich.
  const authResponse = checkBasicAuth(req);
  if (authResponse) return authResponse;

  const requestHeaders = new Headers(req.headers);

  if (req.nextUrl.searchParams.has("_storyblok")) {
    requestHeaders.set("x-sb-preview", "1");
  } else {
    // Von aussen eingeschleuste Header niemals vertrauen.
    requestHeaders.delete("x-sb-preview");
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

/**
 * Prueft HTTP Basic Auth gegen SITE_PASSWORD (und optional SITE_USER).
 *
 * - Ist SITE_PASSWORD nicht gesetzt, wird der Schutz uebersprungen (z. B. lokal).
 * - Bei fehlenden/falschen Zugangsdaten fordert der Browser via 401 +
 *   WWW-Authenticate einen Login-Dialog an.
 * - Gibt `null` zurueck, wenn der Request durchgelassen werden darf.
 */
function checkBasicAuth(req: NextRequest): NextResponse | null {
  const password = process.env.SITE_PASSWORD;
  if (!password) return null;

  const expectedUser = process.env.SITE_USER ?? "wohlfahrt";

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const index = decoded.indexOf(":");
      const user = decoded.slice(0, index);
      const pass = decoded.slice(index + 1);
      if (user === expectedUser && pass === password) {
        return null;
      }
    } catch {
      // Fehlerhafter Header -> als nicht authentifiziert behandeln.
    }
  }

  return new NextResponse("Authentifizierung erforderlich", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Geschuetzter Bereich", charset="UTF-8"',
    },
  });
}

// Nur auf Seiten-Routen laufen – API, Next-Interna und Assets ausklammern.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|fonts).*)"],
};
