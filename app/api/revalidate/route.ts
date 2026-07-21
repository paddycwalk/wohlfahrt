import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-Demand-Revalidation (Storyblok "Story published"-Webhook).
 *
 * Sobald in Storyblok veroeffentlicht wird, ruft ein Webhook diese Route auf
 * und die ISR-gecachten Seiten werden neu erzeugt -> die Aenderung ist kurz
 * darauf live, ohne Rebuild/Deploy und ohne manuellen Commit.
 *
 * Absicherung ueber ein geheimes Token (`STORYBLOK_REVALIDATE_SECRET`), das im
 * Webhook-URL als `?secret=...` mitgegeben wird.
 *
 * Webhook-URL in Storyblok:
 *   https://DEINE-DOMAIN/api/revalidate/?secret=DEIN_SECRET
 */
async function handle(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expected = process.env.STORYBLOK_REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json(
      { revalidated: false, message: "Ungueltiges oder fehlendes Secret." },
      { status: 401 },
    );
  }

  // Alle Routen unter dem Root-Layout neu validieren.
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function POST(req: NextRequest) {
  return handle(req);
}

// GET zusaetzlich erlauben – praktisch zum manuellen Testen im Browser.
export async function GET(req: NextRequest) {
  return handle(req);
}
