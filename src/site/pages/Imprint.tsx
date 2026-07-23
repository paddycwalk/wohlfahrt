"use client";

import { motion } from "motion/react";
import { sbEditable } from "../lib/editable";
import {
  defaultImprintContent,
  type LegalContent,
} from "../content/pages/legal";

export function Imprint({
  content = defaultImprintContent,
}: {
  content?: LegalContent;
}) {
  return (
    <div>
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            {...sbEditable(content.editable)}
          >
            <h1 className="text-5xl mb-8">{content.title}</h1>

            {content.bodyHtml ? (
              <div
                className="prose prose-lg max-w-none space-y-6 text-muted-foreground [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-80"
                // eslint-disable-next-line react/no-danger -- vertrauenswuerdiger CMS-Inhalt, zur Build-Zeit gerendert
                dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
              />
            ) : (
              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Angaben gemäß § 5 DDG
                  </h2>
                  <p>
                    Wohlfahrt & Wohlfahrt Fliesen GmbH
                    <br />
                    Hinterer Spielbach 4<br />
                    72793 Pfullingen
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Vertreten durch
                  </h2>
                  <p>
                    Geschäftsführer: Uwe Wohlfahrt, Volker Wohlfahrt
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">Kontakt</h2>
                  <p>
                    Telefon:{" "}
                    <a
                      href="tel:+49712171082"
                      className="text-accent hover:opacity-80 transition-opacity"
                    >
                      07121 / 71082
                    </a>
                    <br />
                    Telefax: 07121 / 79703
                    <br />
                    E-Mail:{" "}
                    <a
                      href="mailto:info@fliesen-wohlfahrt.de"
                      className="text-accent hover:opacity-80 transition-opacity"
                    >
                      info@fliesen-wohlfahrt.de
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Registereintrag
                  </h2>
                  <p>
                    Eintragung im Handelsregister.
                    <br />
                    Registergericht: Stuttgart
                    <br />
                    Registernummer: HRB 353254
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Umsatzsteuer-ID
                  </h2>
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                    Umsatzsteuergesetz:
                    <br />
                    DE188967066
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Redaktionell verantwortlich
                  </h2>
                  <p>
                    Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
                    <br />
                    Uwe Wohlfahrt, Volker Wohlfahrt
                    <br />
                    Hinterer Spielbach 4<br />
                    72793 Pfullingen
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    EU-Streitschlichtung
                  </h2>
                  <p>
                    Wir sind nicht bereit und nicht verpflichtet, an
                    Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen (§ 36
                    Verbraucherstreitbeilegungsgesetz – VSBG).
                  </p>
                </section>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
