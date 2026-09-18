/**
 * Rendert ein JSON-LD-Dokument als `<script type="application/ld+json">`.
 *
 * Bewusst eine eigene Komponente statt verstreuter Script-Tags: so gibt es
 * genau eine Stelle mit `dangerouslySetInnerHTML` fuer Strukturdaten, und die
 * Serialisierung (inkl. `<`-Maskierung gegen fruehes Script-Ende) passiert
 * ueberall gleich.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- serialisiertes Objekt, kein Nutzer-HTML
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
