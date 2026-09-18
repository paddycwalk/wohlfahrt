# Produktseite – Zuordnung Serie ↔ Artikelnummer

Auf der Produktseite (`/produkte`) zeigen die Serien-Kacheln **nur noch die
Artikelnummer**, nicht mehr den Serientitel. Diese Liste hält fest, welche
Kachel zu welcher Serie gehört.

Stand: 2026-09-18 (erzeugt aus `src/site/content/pages/products-collections.ts`).

Quellen der Daten:

- Code-Defaults: [`src/site/content/pages/products-collections.ts`](../src/site/content/pages/products-collections.ts) (automatisch generiert)
- Rendering der Kachel: [`src/site/pages/Products.tsx`](../src/site/pages/Products.tsx) → `SeriesCard`
- Storyblok-Story `produkte` hat Vorrang: dort gepflegte Titel/Artikelnummern
  überschreiben die Code-Defaults. Nach Änderungen im CMS diese Liste neu erzeugen.

Der Serientitel bleibt weiterhin im Datenmodell und wird verwendet für:
Bild-`alt`-Text, `aria-label` des Kachel-Buttons und die Alt-Texte in der
Galerie-Lightbox. Nur die sichtbare Überschrift auf der Kachel ist entfallen.

## Gruppe „Outdoor“

| # | Serie | Artikelnummer | Bilder | Cover-Datei |
| --- | --- | --- | --- | --- |
| 1 | Serie Agathos | W163 | 6 | `01-agathos-anthracite-60x60-th2.webp` |
| 2 | Serie Basaltina | W99 | 8 | `01-basaltina-grey-120x120-th2-1.webp` |
| 3 | Serie Brera | – (keine, Kachel bleibt ohne Beschriftung) | 3 | `01-brera-bloom-60x60-th2.webp` |
| 4 | Serie Calacatta | – (keine, Kachel bleibt ohne Beschriftung) | 5 | `01-calacatta-60x120-th2-1.webp` |
| 5 | Serie Ceppo di Gre | W1001110 ff | 10 | `01-ceppo-di-gre-grey-120x120-th2-1.webp` |
| 6 | Serie Flatiron | W1000161 ff | 5 | `01-flatiron-black-60x60-th2.webp` |
| 7 | Serie Genesis | W1001120 ff | 4 | `01-genesis-ash-60x60-th2.webp` |
| 8 | Serie Heritage | W1001100 ff | 1 | `01-heritage-powder-60x120-th2.webp` |
| 9 | Serie Loft | W960001 ff | 9 | `01-loft-ash-80x80-th2.webp` |
| 10 | Serie Loop | W102 | 5 | `01-loop-anthracite-60x120-th2.webp` |
| 11 | Serie Medley | – (keine, Kachel bleibt ohne Beschriftung) | 2 | `01-medley-anthracite-80x80-th2.webp` |
| 12 | Serie Miro | W1001230 ff | 3 | `01-miro-champagne-120x120-th2-ivory-60x120-th2-1.webp` |
| 13 | Serie Native | – (keine, Kachel bleibt ohne Beschriftung) | 1 | `01-native-white-60x120-th2.webp` |
| 14 | Serie Navona Soft | – (keine, Kachel bleibt ohne Beschriftung) | 2 | `01-navona-soft-niveo-60x60-th2.webp` |
| 15 | Serie Navona Vein | – (keine, Kachel bleibt ohne Beschriftung) | 4 | `01-navona-vein-candido-60x120-th2-1.webp` |
| 16 | Serie Nereidi | W1001090 ff | 2 | `01-nereidi-cloud-60x60-th2-ecru-120x120-120x280.webp` |
| 17 | Serie Padouk | W1000001 ff | 8 | `01-padouk-beige-30x120-th2-1.webp` |
| 18 | Serie Parker | W1000410 ff | 4 | `01-parker-anthracite-80x80-th2.webp` |
| 19 | Serie Pennslate | W184 | 7 | `01-pennslate-akiba-60x120-th2.webp` |
| 20 | Serie Petraviva | – (keine, Kachel bleibt ohne Beschriftung) | 3 | `01-petraviva-beige-60x60-th2.webp` |
| 21 | Serie Pietra del Salento | – (keine, Kachel bleibt ohne Beschriftung) | 2 | `01-pietra-del-salento-60x120-th2.webp` |
| 22 | Serie Pietra di Vals | – (keine, Kachel bleibt ohne Beschriftung) | 2 | `01-pietra-di-vals-80x80-th2-1.webp` |
| 23 | Serie Robur | – (keine, Kachel bleibt ohne Beschriftung) | 8 | `01-robur-cocoa-30x120-th2.webp` |
| 24 | Serie Rushmore | W1000780 ff | 6 | `01-rushmore-beige-60x120-th2-1.webp` |
| 25 | Serie Sunstone | W307 | 6 | `01-sunstone-freya-120x120-th2.webp` |
| 26 | Serie Taj Mahal | – (keine, Kachel bleibt ohne Beschriftung) | 1 | `01-taj-mahal-shell-60x120-th2.webp` |
| 27 | Serie Tivoli | W327 | 1 | `01-tivoli-beige-60x60-th2.webp` |
| 28 | Serie Urano | W106 | 3 | `01-urano-grigio-60x120-th2.webp` |
| 29 | Serie Wonder | W312 | 2 | `01-wonder-dunes-60x90-th2.webp` |

## Gruppe „Indoor“

| # | Serie | Artikelnummer | Bilder | Cover-Datei |
| --- | --- | --- | --- | --- |
| 1 | Serie Ceppo di Gre | W1001110 ff | 9 | `01-ceppo-di-gre-anthracite-120x120-ivory-120x280-warm-60x120-th.webp` |
| 2 | Serie City Plaster | W1000420 ff | 10 | `01-city-plaster-beige-120x120-120x280.webp` |
| 3 | Serie Flatiron | W1000161 ff | 10 | `01-flatiron-black-120x280.webp` |
| 4 | Serie Heritage | W1001100 ff | 5 | `01-heritage-cornsilk-120x120-1.webp` |
| 5 | Serie Loft | W960001 ff | 10 | `01-loft-ash-120x120-loft-cream-120x280-loft-taupe-120x280.webp` |
| 6 | Serie Luminescence | W1001420 | 3 | `01-luminescence-120x280-1.webp` |
| 7 | Serie Magnetic | – (keine, Kachel bleibt ohne Beschriftung) | 6 | `01-magnetic-bronze-60x120-mosaik-5x5.webp` |
| 8 | Serie Miro | W1001230 ff | 10 | `01-miro-chalk-60x120-120x120-miro-leather-mosaik-spaccatella.webp` |
| 9 | Serie Nereidi | W1001090 ff | 10 | `01-nereidi-almond-120x120-cloud-120x280-ecru-120x280-umber-120x.webp` |
| 10 | Serie Padouk | W1000001 ff | 10 | `01-padouk-beige-20x120-30x120.webp` |
| 11 | Serie Parker | W1000410 ff | 6 | `01-parker-grey-120x120.webp` |
| 12 | Serie Robur | – (keine, Kachel bleibt ohne Beschriftung) | 5 | `01-robur-honey-20x120.webp` |
| 13 | Serie Sunstone | W307 | 10 | `01-sunstone-baugi-120x120.webp` |
| 14 | HR Ambienti BERGSTONE | W1000860 ff | 10 | `01-csa-bergstone-black120120-black60120-restaurant.webp` |
| 15 | HR Ambienti MYSTIC | W1000690 ff | 10 | `01-csa-mystic-beige60120-primewood-brown30180-living.webp` |
| 16 | HR Ambienti SABLE | W1000670 ff | 10 | `01-csa-sable-beige120120-jardin-04-living.webp` |
| 17 | HR Ambienti TETRIS | – (keine, Kachel bleibt ohne Beschriftung) | 10 | `01-csa-tetris-aria-mat-primewood-natural20120-living.webp` |
| 18 | HR Ambienti TIMEWOOD | W1000240 ff | 10 | `01-csa-timewood-brown20120-form-cement60180-silkystone-sand9090.webp` |

## Serien ohne Artikelnummer

Diese Kacheln zeigen nach der Umstellung keine Beschriftung mehr. Sobald in
Storyblok eine Artikelnummer ergänzt wird, erscheint sie automatisch.

- Serie Brera
- Serie Calacatta
- Serie Medley
- Serie Native
- Serie Navona Soft
- Serie Navona Vein
- Serie Petraviva
- Serie Pietra del Salento
- Serie Pietra di Vals
- Serie Robur
- Serie Taj Mahal
- Serie Magnetic
- Serie Robur
- HR Ambienti TETRIS
