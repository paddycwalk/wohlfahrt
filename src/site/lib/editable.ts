/**
 * Click-to-Edit-Attribute fuer den Storyblok Visual Editor.
 *
 * Storyblok liefert bei einem Draft-Abruf (Preview-Token) zu jedem Blok ein
 * Feld `_editable` – einen HTML-Kommentar der Form
 *   <!--#storyblok#{"name":"...","space":"...","uid":"...","id":"..."}-->
 *
 * Diese Funktion parst diesen Kommentar und erzeugt die DOM-Attribute, die die
 * Storyblok-Bridge fuer "Element anklicken -> im Editor zum Modul springen"
 * benoetigt. Ohne `_editable` (z. B. im Production-Build mit Published-Inhalt)
 * werden keine Attribute gesetzt – die Seite bleibt sauber.
 */
export interface SbEditableAttrs {
  "data-blok-c"?: string;
  "data-blok-uid"?: string;
}

export function sbEditable(editable?: string | null): SbEditableAttrs {
  if (!editable || typeof editable !== "string") return {};
  try {
    const json = editable.replace(/^<!--#storyblok#/, "").replace(/-->$/, "");
    const options = JSON.parse(json) as { id?: string; uid?: string };
    if (!options.id || !options.uid) return {};
    return {
      "data-blok-c": JSON.stringify(options),
      "data-blok-uid": `${options.id}-${options.uid}`,
    };
  } catch {
    return {};
  }
}
