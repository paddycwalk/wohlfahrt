"use client";

import { motion } from "motion/react";
import { sbEditable } from "../lib/editable";
import {
  defaultDisclaimerContent,
  type LegalContent,
} from "../content/pages/legal";

export function Disclaimer({
  content = defaultDisclaimerContent,
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
                className="prose prose-lg max-w-none space-y-6 text-muted-foreground"
                // eslint-disable-next-line react/no-danger -- vertrauenswuerdiger CMS-Inhalt, zur Build-Zeit gerendert
                dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
              />
            ) : (
              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    1. Haftung für Inhalte
                  </h2>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                    Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                    verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                    gespeicherte fremde Informationen zu überwachen oder nach
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                    hinweisen.
                  </p>
                  <p className="mt-3">
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                    Informationen nach den allgemeinen Gesetzen bleiben hiervon
                    unberührt. Eine diesbezügliche Haftung ist jedoch erst ab
                    dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                    möglich. Bei Bekanntwerden von entsprechenden
                    Rechtsverletzungen werden wir diese Inhalte umgehend
                    entfernen.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    2. Haftung für Links
                  </h2>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter,
                    auf deren Inhalte wir keinen Einfluss haben. Deshalb können
                    wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                    Für die Inhalte der verlinkten Seiten ist stets der
                    jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                  <p className="mt-3">
                    Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
                    auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
                    waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
                    permanente inhaltliche Kontrolle der verlinkten Seiten ist
                    jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
                    nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                    werden wir derartige Links umgehend entfernen.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    3. Urheberrecht
                  </h2>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke
                    auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                    Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                    der Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers.
                  </p>
                  <p className="mt-3">
                    Downloads und Kopien dieser Seite sind nur für den privaten,
                    nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte
                    auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                    die Urheberrechte Dritter beachtet. Insbesondere werden
                    Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                    trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
                    bitten wir um einen entsprechenden Hinweis. Bei
                    Bekanntwerden von Rechtsverletzungen werden wir derartige
                    Inhalte umgehend entfernen.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    4. Gewährleistung
                  </h2>
                  <p>
                    Die Inhalte dieser Website werden mit größtmöglicher
                    Sorgfalt erstellt. Der Anbieter übernimmt jedoch keine
                    Gewähr für die Richtigkeit, Vollständigkeit und Aktualität
                    der bereitgestellten Inhalte. Die Nutzung der Inhalte der
                    Website erfolgt auf eigene Gefahr des Nutzers.
                  </p>
                </section>

                <section className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm">
                    Stand: April 2026
                    <br />
                    Wohlfahrt & Wohlfahrt GmbH
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
