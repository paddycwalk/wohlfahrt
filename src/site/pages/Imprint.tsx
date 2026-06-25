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
                    Angaben gemäß § 5 TMG
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
                    Uwe Wohlfahrt
                    <br />
                    Volker Wohlfahrt
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">Kontakt</h2>
                  <p>
                    Telefon: 07121 / 71082
                    <br />
                    Telefax: 07121 / 79703
                    <br />
                    E-Mail: info@fliesen-wohlfahrt.de
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

                <section className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm">
                    Quelle:{" "}
                    <a
                      href="https://www.e-recht24.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      www.e-recht24.de
                    </a>
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
