"use client";

import { motion } from "motion/react";
import { sbEditable } from "../lib/editable";
import {
  defaultPrivacyContent,
  type LegalContent,
} from "../content/pages/legal";

function ExternalLink({
  href,
  children,
}: Readonly<{ href: string; children: string }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      {children}
    </a>
  );
}

export function Privacy({
  content = defaultPrivacyContent,
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
                  <h2 className="text-2xl text-foreground mb-4">Datenschutz</h2>
                  <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                    persönlichen Daten sehr ernst. Wir behandeln Ihre
                    personenbezogenen Daten vertraulich und entsprechend der
                    gesetzlichen Datenschutzvorschriften sowie dieser
                    Datenschutzerklärung.
                  </p>
                  <p>
                    Die Nutzung unserer Webseite ist in der Regel ohne Angabe
                    personenbezogener Daten möglich. Soweit auf unseren Seiten
                    personenbezogene Daten (beispielsweise Name, Anschrift oder
                    E-Mail-Adressen) erhoben werden, erfolgt dies, soweit
                    möglich, stets auf freiwilliger Basis. Diese Daten werden
                    ohne Ihre ausdrückliche Zustimmung nicht an Dritte
                    weitergegeben.
                  </p>
                  <p>
                    Wir weisen darauf hin, dass die Datenübertragung im Internet
                    (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken
                    aufweisen kann. Ein lückenloser Schutz der Daten vor dem
                    Zugriff durch Dritte ist nicht möglich.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Datenschutzerklärung für die Nutzung von Facebook-Plugins
                    (Like-Button)
                  </h2>
                  <p>
                    Auf unseren Seiten sind Plugins des sozialen Netzwerks
                    Facebook, Anbieter Facebook Inc., 1 Hacker Way, Menlo Park,
                    California 94025, USA, integriert. Die Facebook-Plugins
                    erkennen Sie an dem Facebook-Logo oder dem „Like-Button"
                    („Gefällt mir") auf unserer Seite. Eine Übersicht über die
                    Facebook-Plugins finden Sie hier:{" "}
                    <ExternalLink href="http://developers.facebook.com/docs/plugins/">
                      developers.facebook.com/docs/plugins
                    </ExternalLink>
                    .
                  </p>
                  <p>
                    Wenn Sie unsere Seiten besuchen, wird über das Plugin eine
                    direkte Verbindung zwischen Ihrem Browser und dem
                    Facebook-Server hergestellt. Facebook erhält dadurch die
                    Information, dass Sie mit Ihrer IP-Adresse unsere Seite
                    besucht haben. Wenn Sie den Facebook „Like-Button" anklicken
                    während Sie in Ihrem Facebook-Account eingeloggt sind,
                    können Sie die Inhalte unserer Seiten auf Ihrem
                    Facebook-Profil verlinken. Dadurch kann Facebook den Besuch
                    unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen
                    darauf hin, dass wir als Anbieter der Seiten keine Kenntnis
                    vom Inhalt der übermittelten Daten sowie deren Nutzung durch
                    Facebook erhalten. Weitere Informationen hierzu finden Sie
                    in der Datenschutzerklärung von Facebook unter{" "}
                    <ExternalLink href="http://de-de.facebook.com/policy.php">
                      de-de.facebook.com/policy.php
                    </ExternalLink>
                    .
                  </p>
                  <p>
                    Wenn Sie nicht wünschen, dass Facebook den Besuch unserer
                    Seiten Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie
                    sich bitte aus Ihrem Facebook-Benutzerkonto aus.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Datenschutzerklärung für die Nutzung von Google Analytics
                  </h2>
                  <p>
                    Diese Website nutzt Funktionen des Webanalysedienstes Google
                    Analytics. Anbieter ist die Google Inc. 1600 Amphitheatre
                    Parkway Mountain View, CA 94043, USA. Google Analytics
                    verwendet sog. „Cookies". Das sind Textdateien, die auf
                    Ihrem Computer gespeichert werden und die eine Analyse der
                    Benutzung der Website durch Sie ermöglichen. Die durch den
                    Cookie erzeugten Informationen über Ihre Benutzung dieser
                    Website werden in der Regel an einen Server von Google in
                    den USA übertragen und dort gespeichert.
                  </p>
                  <p>
                    Im Falle der Aktivierung der IP-Anonymisierung auf dieser
                    Webseite wird Ihre IP-Adresse von Google jedoch innerhalb
                    von Mitgliedstaaten der Europäischen Union oder in anderen
                    Vertragsstaaten des Abkommens über den Europäischen
                    Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird
                    die volle IP-Adresse an einen Server von Google in den USA
                    übertragen und dort gekürzt. Im Auftrag des Betreibers
                    dieser Website wird Google diese Informationen benutzen, um
                    Ihre Nutzung der Website auszuwerten, um Reports über die
                    Websiteaktivitäten zusammenzustellen und um weitere mit der
                    Websitenutzung und der Internetnutzung verbundene
                    Dienstleistungen gegenüber dem Websitebetreiber zu
                    erbringen. Die im Rahmen von Google Analytics von Ihrem
                    Browser übermittelte IP-Adresse wird nicht mit anderen Daten
                    von Google zusammengeführt.
                  </p>
                  <p>
                    Sie können die Speicherung der Cookies durch eine
                    entsprechende Einstellung Ihrer Browser-Software verhindern;
                    wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall
                    gegebenenfalls nicht sämtliche Funktionen dieser Website
                    vollumfänglich werden nutzen können. Sie können darüber
                    hinaus die Erfassung der durch das Cookie erzeugten und auf
                    Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer
                    IP-Adresse) an Google sowie die Verarbeitung dieser Daten
                    durch Google verhindern, indem sie das unter dem folgenden
                    Link verfügbare Browser-Plugin herunterladen und
                    installieren:{" "}
                    <ExternalLink href="http://tools.google.com/dlpage/gaoptout?hl=de">
                      tools.google.com/dlpage/gaoptout
                    </ExternalLink>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Datenschutzerklärung für die Nutzung von Google +1
                  </h2>
                  <p>
                    Unsere Seiten nutzen Funktionen von Google +1. Anbieter ist
                    die Google Inc. 1600 Amphitheatre Parkway Mountain View, CA
                    94043, USA.
                  </p>
                  <p>
                    Erfassung und Weitergabe von Informationen: Mithilfe der
                    Google +1-Schaltfläche können Sie Informationen weltweit
                    veröffentlichen. über die Google +1-Schaltfläche erhalten
                    Sie und andere Nutzer personalisierte Inhalte von Google und
                    unseren Partnern. Google speichert sowohl die Information,
                    dass Sie für einen Inhalt +1 gegeben haben, als auch
                    Informationen über die Seite, die Sie beim Klicken auf +1
                    angesehen haben. Ihre +1 können als Hinweise zusammen mit
                    Ihrem Profilnamen und Ihrem Foto in Google-Diensten, wie
                    etwa in Suchergebnissen oder in Ihrem Google-Profil, oder an
                    anderen Stellen auf Websites und Anzeigen im Internet
                    eingeblendet werden. Google zeichnet Informationen über Ihre
                    +1-Aktivitäten auf, um die Google-Dienste für Sie und andere
                    zu verbessern. Um die Google +1-Schaltfläche verwenden zu
                    können, benötigen Sie ein weltweit sichtbares, öffentliches
                    Google-Profil, das zumindest den für das Profil gewählten
                    Namen enthalten muss. Dieser Name wird in allen
                    Google-Diensten verwendet. In manchen Fällen kann dieser
                    Name auch einen anderen Namen ersetzen, den Sie beim Teilen
                    von Inhalten über Ihr Google-Konto verwendet haben. Die
                    Identität Ihres Google-Profils kann Nutzern angezeigt
                    werden, die Ihre E-Mail-Adresse kennen oder über andere
                    identifizierende Informationen von Ihnen verfügen.
                  </p>
                  <p>
                    Verwendung der erfassten Informationen: Neben den oben
                    erläuterten Verwendungszwecken werden die von Ihnen
                    bereitgestellten Informationen gemäß den geltenden
                    Google-Datenschutzbestimmungen genutzt. Google
                    veröffentlicht möglicherweise zusammengefasste Statistiken
                    über die +1-Aktivitäten der Nutzer bzw. gibt diese an Nutzer
                    und Partner weiter, wie etwa Publisher, Inserenten oder
                    verbundene Websites.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Datenschutzerklärung für die Nutzung von Instagram
                  </h2>
                  <p>
                    Auf unseren Seiten sind Funktionen des Dienstes Instagram
                    eingebunden. Diese Funktionen werden angeboten durch die
                    Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA
                    integriert. Wenn Sie in Ihrem Instagram – Account eingeloggt
                    sind können Sie durch Anklicken des Instagram – Buttons die
                    Inhalte unserer Seiten mit Ihrem Instagram – Profil
                    verlinken. Dadurch kann Instagram den Besuch unserer Seiten
                    Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass
                    wir als Anbieter der Seiten keine Kenntnis vom Inhalt der
                    übermittelten Daten sowie deren Nutzung durch Instagram
                    erhalten.
                  </p>
                  <p>
                    Weitere Informationen hierzu finden Sie in der
                    Datenschutzerklärung von Instagram:{" "}
                    <ExternalLink href="http://instagram.com/about/legal/privacy/">
                      instagram.com/about/legal/privacy
                    </ExternalLink>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Datenschutzerklärung für die Nutzung von LinkedIn
                  </h2>
                  <p>
                    Unsere Website nutzt Funktionen des Netzwerks LinkedIn.
                    Anbieter ist die LinkedIn Corporation, 2029 Stierlin Court,
                    Mountain View, CA 94043, USA. Bei jedem Abruf einer unserer
                    Seiten, die Funktionen von LinkedIn enthält, wird eine
                    Verbindung zu Servern von LinkedIn aufbaut. LinkedIn wird
                    darüber informiert, dass Sie unsere Internetseiten mit Ihrer
                    IP-Adresse besucht haben. Wenn Sie den „Recommend-Button"
                    von LinkedIn anklicken und in Ihrem Account bei LinkedIn
                    eingeloggt sind, ist es LinkedIn möglich, Ihren Besuch auf
                    unserer Internetseite Ihnen und Ihrem Benutzerkonto
                    zuzuordnen. Wir weisen darauf hin, dass wir als Anbieter der
                    Seiten keine Kenntnis vom Inhalt der übermittelten Daten
                    sowie deren Nutzung durch LinkedIn haben.
                  </p>
                  <p>
                    Weitere Informationen hierzu finden Sie in der
                    Datenschutzerklärung von LinkedIn unter:{" "}
                    <ExternalLink href="https://www.linkedin.com/legal/privacy-policy">
                      linkedin.com/legal/privacy-policy
                    </ExternalLink>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Datenschutzerklärung für die Nutzung von Twitter
                  </h2>
                  <p>
                    Auf unseren Seiten sind Funktionen des Dienstes Twitter
                    eingebunden. Diese Funktionen werden angeboten durch die
                    Twitter Inc., 1355 Market Street, Suite 900, San Francisco,
                    CA 94103, USA. Durch das Benutzen von Twitter und der
                    Funktion „Re-Tweet" werden die von Ihnen besuchten Webseiten
                    mit Ihrem Twitter-Account verknüpft und anderen Nutzern
                    bekannt gegeben. Dabei werden auch Daten an Twitter
                    übertragen. Wir weisen darauf hin, dass wir als Anbieter der
                    Seiten keine Kenntnis vom Inhalt der übermittelten Daten
                    sowie deren Nutzung durch Twitter erhalten. Weitere
                    Informationen hierzu finden Sie in der Datenschutzerklärung
                    von Twitter unter{" "}
                    <ExternalLink href="http://twitter.com/privacy">
                      twitter.com/privacy
                    </ExternalLink>
                    .
                  </p>
                  <p>
                    Ihre Datenschutzeinstellungen bei Twitter können Sie in den
                    Konto-Einstellungen unter{" "}
                    <ExternalLink href="http://twitter.com/account/settings">
                      twitter.com/account/settings
                    </ExternalLink>{" "}
                    ändern.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Datenschutzerklärung für die Nutzung von Xing
                  </h2>
                  <p>
                    Unsere Webseite nutzt Funktionen des Netzwerks XING.
                    Anbieter ist die XING AG, Dammtorstraße 29-32, 20354
                    Hamburg, Deutschland. Bei jedem Abruf einer unserer Seiten,
                    die Funktionen von Xing enthält, wird eine Verbindung zu
                    Servern von Xing hergestellt. Eine Speicherung von
                    personenbezogenen Daten erfolgt dabei nach unserer Kenntnis
                    nicht. Insbesondere werden keine IP-Adressen gespeichert
                    oder das Nutzungsverhalten ausgewertet.
                  </p>
                  <p>
                    Weitere Information zum Datenschutz und dem Xing
                    Share-Button finden Sie in der Datenschutzerklärung von Xing
                    unter{" "}
                    <ExternalLink href="https://www.xing.com/app/share?op=data_protection">
                      xing.com/app/share
                    </ExternalLink>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Auskunft, Löschung, Sperrung
                  </h2>
                  <p>
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft
                    über Ihre gespeicherten personenbezogenen Daten, deren
                    Herkunft und Empfänger und den Zweck der Datenverarbeitung
                    sowie ein Recht auf Berichtigung, Sperrung oder Löschung
                    dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
                    personenbezogene Daten können Sie sich jederzeit unter der
                    im Impressum angegebenen Adresse an uns wenden.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">Cookies</h2>
                  <p>
                    Die Internetseiten verwenden teilweise so genannte Cookies.
                    Cookies richten auf Ihrem Rechner keinen Schaden an und
                    enthalten keine Viren. Cookies dienen dazu, unser Angebot
                    nutzerfreundlicher, effektiver und sicherer zu machen.
                    Cookies sind kleine Textdateien, die auf Ihrem Rechner
                    abgelegt werden und die Ihr Browser speichert.
                  </p>
                  <p>
                    Die meisten der von uns verwendeten Cookies sind so genannte
                    „Session-Cookies". Sie werden nach Ende Ihres Besuchs
                    automatisch gelöscht. Andere Cookies bleiben auf Ihrem
                    Endgerät gespeichert, bis Sie diese löschen. Diese Cookies
                    ermöglichen es uns, Ihren Browser beim nächsten Besuch
                    wiederzuerkennen.
                  </p>
                  <p>
                    Sie können Ihren Browser so einstellen, dass Sie über das
                    Setzen von Cookies informiert werden und Cookies nur im
                    Einzelfall erlauben, die Annahme von Cookies für bestimmte
                    Fälle oder generell ausschließen sowie das automatische
                    Löschen der Cookies beim Schließen des Browser aktivieren.
                    Bei der Deaktivierung von Cookies kann die Funktionalität
                    dieser Website eingeschränkt sein.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Server-Log-Files
                  </h2>
                  <p>
                    Der Provider der Seiten erhebt und speichert automatisch
                    Informationen in so genannten Server-Log Files, die Ihr
                    Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Browsertyp/ Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                  </ul>
                  <p>
                    Diese Daten sind nicht bestimmten Personen zuordenbar. Eine
                    Zusammenführung dieser Daten mit anderen Datenquellen wird
                    nicht vorgenommen. Wir behalten uns vor, diese Daten
                    nachträglich zu prüfen, wenn uns konkrete Anhaltspunkte für
                    eine rechtswidrige Nutzung bekannt werden.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Kontaktformular
                  </h2>
                  <p>
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                    werden Ihre Angaben aus dem Anfrageformular inklusive der
                    von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                    der Anfrage und für den Fall von Anschlussfragen bei uns
                    gespeichert. Diese Daten geben wir nicht ohne Ihre
                    Einwilligung weiter.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Widerspruch Werbe-Mails
                  </h2>
                  <p>
                    Der Nutzung von im Rahmen der Impressumspflicht
                    veröffentlichten Kontaktdaten zur Übersendung von nicht
                    ausdrücklich angeforderter Werbung und
                    Informationsmaterialien wird hiermit widersprochen. Die
                    Betreiber der Seiten behalten sich ausdrücklich rechtliche
                    Schritte im Falle der unverlangten Zusendung von
                    Werbeinformationen, etwa durch Spam-E-Mails, vor.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    Newsletterdaten
                  </h2>
                  <p>
                    Wenn Sie den auf der Webseite angebotenen Newsletter
                    beziehen möchten, benötigen wir von Ihnen eine
                    E-Mail-Adresse sowie Informationen, welche uns die
                    Überprüfung gestatten, dass Sie der Inhaber der angegebenen
                    E-Mail-Adresse sind und mit dem Empfang des Newsletters
                    einverstanden sind. Weitere Daten werden nicht erhoben.
                    Diese Daten verwenden wir ausschließlich für den Versand der
                    angeforderten Informationen und geben sie nicht an Dritte
                    weiter.
                  </p>
                  <p>
                    Die erteilte Einwilligung zur Speicherung der Daten, der
                    E-Mail-Adresse sowie deren Nutzung zum Versand des
                    Newsletters können Sie jederzeit widerrufen, etwa über den
                    „Austragen"-Link im Newsletter.
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
