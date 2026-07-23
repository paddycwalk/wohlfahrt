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
                  <h2 className="text-2xl text-foreground mb-4">
                    1. Datenschutz auf einen Blick
                  </h2>
                  <p>
                    Der Schutz Ihrer personenbezogenen Daten ist uns ein
                    wichtiges Anliegen. Wir behandeln Ihre Daten vertraulich und
                    entsprechend der gesetzlichen Datenschutzvorschriften
                    (insbesondere DSGVO und BDSG) sowie dieser
                    Datenschutzerklärung. Diese Erklärung informiert Sie
                    darüber, welche personenbezogenen Daten wir beim Besuch
                    dieser Website verarbeiten und zu welchem Zweck.
                  </p>
                  <p>
                    Personenbezogene Daten sind alle Daten, mit denen Sie
                    persönlich identifiziert werden können (z. B. Name,
                    Anschrift oder E-Mail-Adresse).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    2. Verantwortliche Stelle
                  </h2>
                  <p>
                    Verantwortlich für die Datenverarbeitung auf dieser Website
                    im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                  </p>
                  <p>
                    Wohlfahrt & Wohlfahrt Fliesen GmbH
                    <br />
                    Hinterer Spielbach 4<br />
                    72793 Pfullingen
                    <br />
                    Telefon:{" "}
                    <a
                      href="tel:+49712171082"
                      className="text-accent hover:opacity-80 transition-opacity"
                    >
                      07121 / 71082
                    </a>
                    <br />
                    E-Mail:{" "}
                    <a
                      href="mailto:info@fliesen-wohlfahrt.de"
                      className="text-accent hover:opacity-80 transition-opacity"
                    >
                      info@fliesen-wohlfahrt.de
                    </a>
                  </p>
                  <p>
                    Verantwortliche Stelle ist die natürliche oder juristische
                    Person, die allein oder gemeinsam mit anderen über die
                    Zwecke und Mittel der Verarbeitung von personenbezogenen
                    Daten entscheidet.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">3. Hosting</h2>
                  <p>
                    Wir hosten die Inhalte unserer Website bei folgendem
                    Anbieter:
                  </p>
                  <p>
                    ALL-INKL.COM – Neue Medien Münnich, Inhaber: René Münnich,
                    Hauptstraße 68, 02742 Friedersdorf (nachfolgend „All-Inkl").
                  </p>
                  <p>
                    Wenn Sie unsere Website besuchen, erfasst All-Inkl
                    verschiedene Logfiles inklusive Ihrer IP-Adressen. Die
                    Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
                    DSGVO. Wir haben ein berechtigtes Interesse an einer
                    möglichst zuverlässigen Darstellung unserer Website. Die
                    Verwendung von All-Inkl erfolgt zum Zweck einer sicheren,
                    schnellen und effizienten Bereitstellung unseres
                    Online-Angebots durch einen professionellen Anbieter.
                  </p>
                  <p>
                    Mit All-Inkl haben wir einen Vertrag über
                    Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO geschlossen.
                    Dieser stellt sicher, dass die personenbezogenen Daten
                    unserer Websitebesucher nur nach unseren Weisungen und unter
                    Einhaltung der DSGVO verarbeitet werden.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    4. Allgemeine Hinweise
                  </h2>
                  <h3 className="text-xl text-foreground mb-2">
                    SSL- bzw. TLS-Verschlüsselung
                  </h3>
                  <p>
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                    Übertragung vertraulicher Inhalte eine SSL- bzw.
                    TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
                    Sie daran, dass die Adresszeile des Browsers von „http://"
                    auf „https://" wechselt und am Schloss-Symbol in Ihrer
                    Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung
                    aktiviert ist, können die Daten, die Sie an uns übermitteln,
                    nicht von Dritten mitgelesen werden.
                  </p>
                  <h3 className="text-xl text-foreground mb-2 mt-4">
                    Speicherdauer
                  </h3>
                  <p>
                    Soweit innerhalb dieser Datenschutzerklärung keine
                    speziellere Speicherdauer genannt wurde, verbleiben Ihre
                    personenbezogenen Daten bei uns, bis der Zweck für die
                    Datenverarbeitung entfällt. Wenn Sie ein berechtigtes
                    Löschersuchen geltend machen oder eine Einwilligung zur
                    Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
                    sofern wir keine anderen rechtlich zulässigen Gründe für die
                    Speicherung Ihrer personenbezogenen Daten haben (z. B.
                    steuer- oder handelsrechtliche Aufbewahrungsfristen); im
                    letztgenannten Fall erfolgt die Löschung nach Fortfall
                    dieser Gründe.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    5. Ihre Rechte
                  </h2>
                  <p>
                    Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                    jederzeit das Recht auf:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      unentgeltliche Auskunft über Ihre gespeicherten
                      personenbezogenen Daten, deren Herkunft und Empfänger
                      sowie den Zweck der Datenverarbeitung (Art. 15 DSGVO),
                    </li>
                    <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
                    <li>Löschung Ihrer Daten (Art. 17 DSGVO),</li>
                    <li>
                      Einschränkung der Datenverarbeitung (Art. 18 DSGVO),
                    </li>
                    <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
                    <li>
                      Widerspruch gegen die Verarbeitung (Art. 21 DSGVO) sowie
                    </li>
                    <li>
                      Widerruf einer erteilten Einwilligung mit Wirkung für die
                      Zukunft (Art. 7 Abs. 3 DSGVO).
                    </li>
                  </ul>
                  <p>
                    Hierzu sowie zu weiteren Fragen zum Thema personenbezogene
                    Daten können Sie sich jederzeit an uns wenden.
                  </p>
                  <h3 className="text-xl text-foreground mb-2 mt-4">
                    Beschwerderecht bei der Aufsichtsbehörde
                  </h3>
                  <p>
                    Im Falle von Verstößen gegen die DSGVO steht den Betroffenen
                    ein Beschwerderecht bei einer Aufsichtsbehörde zu,
                    insbesondere in dem Mitgliedstaat ihres gewöhnlichen
                    Aufenthalts, ihres Arbeitsplatzes oder des Orts des
                    mutmaßlichen Verstoßes. Die für uns zuständige
                    Aufsichtsbehörde ist der Landesbeauftragte für den
                    Datenschutz und die Informationsfreiheit Baden-Württemberg
                    (LfDI BW). Das Beschwerderecht besteht unbeschadet
                    anderweitiger verwaltungsrechtlicher oder gerichtlicher
                    Rechtsbehelfe.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    6. Server-Log-Files
                  </h2>
                  <p>
                    Der Provider dieser Seiten erhebt und speichert automatisch
                    Informationen in so genannten Server-Log-Files, die Ihr
                    Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer-URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                  <p>
                    Eine Zusammenführung dieser Daten mit anderen Datenquellen
                    wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt
                    auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
                    Websitebetreiber hat ein berechtigtes Interesse an der
                    technisch fehlerfreien Darstellung und der Optimierung
                    seiner Website – hierzu müssen die Server-Log-Files erfasst
                    werden.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    7. Kontaktformular und Kontaktaufnahme
                  </h2>
                  <p>
                    Wenn Sie uns per Kontaktformular oder per E-Mail Anfragen
                    zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
                    (Name, E-Mail-Adresse, ggf. Telefonnummer und Ihre
                    Nachricht) inklusive der von Ihnen dort angegebenen
                    Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
                    von Anschlussfragen bei uns gespeichert. Für den Versand
                    nutzen wir den E-Mail-Dienst unseres Providers All-Inkl.
                    Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  <p>
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art.
                    6 Abs. 1 lit. a DSGVO, sofern Sie hierzu über die
                    Einwilligungs-Checkbox eingewilligt haben. Sofern Ihre
                    Anfrage auf die Durchführung vorvertraglicher Maßnahmen oder
                    die Erfüllung eines Vertrags gerichtet ist, beruht die
                    Verarbeitung zudem auf Art. 6 Abs. 1 lit. b DSGVO. Im
                    Übrigen stützt sich die Verarbeitung auf unser berechtigtes
                    Interesse an der effektiven Bearbeitung der an uns
                    gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Die von
                    Ihnen erteilte Einwilligung können Sie jederzeit widerrufen.
                  </p>
                  <p>
                    Die von Ihnen im Kontaktformular eingegebenen Daten
                    verbleiben bei uns, bis Sie uns zur Löschung auffordern,
                    Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
                    für die Datenspeicherung entfällt (z. B. nach
                    abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende
                    gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen
                    – bleiben unberührt.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    8. Google Maps
                  </h2>
                  <p>
                    Diese Website bindet auf der Kontakt- und Ausstellungsseite
                    Kartenmaterial des Dienstes Google Maps ein. Anbieter ist
                    die Google Ireland Limited („Google"), Gordon House, Barrow
                    Street, Dublin 4, Irland.
                  </p>
                  <p>
                    Zur Nutzung der Funktionen von Google Maps ist es notwendig,
                    Ihre IP-Adresse zu speichern. Diese Informationen werden in
                    der Regel an einen Server von Google in den USA übertragen
                    und dort gespeichert. Der Anbieter dieser Seite hat keinen
                    Einfluss auf diese Datenübertragung. Wenn Google Maps
                    aktiviert ist, kann Google zum Zwecke der einheitlichen
                    Darstellung der Schriftarten Google Fonts verwenden. Beim
                    Aufruf von Google Maps lädt Ihr Browser die benötigten Web
                    Fonts in Ihren Browsercache, um Texte und Schriftarten
                    korrekt anzuzeigen.
                  </p>
                  <p>
                    Die Nutzung von Google Maps erfolgt im Interesse einer
                    ansprechenden Darstellung unserer Online-Angebote und einer
                    leichten Auffindbarkeit der von uns auf der Website
                    angegebenen Orte. Dies stellt ein berechtigtes Interesse im
                    Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
                  </p>
                  <p>
                    Die Datenübertragung in die USA wird auf die
                    Standardvertragsklauseln der EU-Kommission gestützt. Google
                    ist zudem unter dem EU-US Data Privacy Framework (DPF)
                    zertifiziert. Weitere Informationen zum Umgang mit
                    Nutzerdaten finden Sie in der Datenschutzerklärung von
                    Google:{" "}
                    <ExternalLink href="https://policies.google.com/privacy?hl=de">
                      policies.google.com/privacy
                    </ExternalLink>
                    .
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    9. Soziale Medien
                  </h2>
                  <p>
                    Auf unserer Website verlinken wir auf unsere Profile bei
                    Facebook und Instagram (jeweils Meta Platforms Ireland
                    Limited, 4 Grand Canal Square, Dublin 2, Irland). Es handelt
                    sich dabei ausschließlich um einfache Verlinkungen – es sind
                    keine Social-Media-Plugins („Like"-Buttons o. Ä.)
                    eingebunden, die bereits beim bloßen Laden unserer Seiten
                    Daten an die Netzwerke übertragen.
                  </p>
                  <p>
                    Erst wenn Sie aktiv auf ein solches Symbol klicken, werden
                    Sie zur jeweiligen Plattform weitergeleitet und es werden
                    Daten an den Anbieter übermittelt. Auf die Datenverarbeitung
                    durch die sozialen Netzwerke nach dem Verlassen unserer
                    Website haben wir keinen Einfluss. Informationen dazu finden
                    Sie in den Datenschutzhinweisen des jeweiligen Anbieters.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">10. Cookies</h2>
                  <p>
                    Unsere Website verwendet keine Cookies zu Analyse-,
                    Tracking- oder Marketingzwecken. Es kommen ausschließlich
                    technisch notwendige Cookies zum Einsatz, sofern diese für
                    den Betrieb der Seite erforderlich sind (Rechtsgrundlage:
                    Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG). Beim
                    Aufruf eingebetteter Inhalte Dritter (z. B. Google Maps)
                    können durch den jeweiligen Anbieter Cookies gesetzt werden.
                  </p>
                  <p>
                    Sie können Ihren Browser so einstellen, dass Sie über das
                    Setzen von Cookies informiert werden und Cookies nur im
                    Einzelfall erlauben oder generell ausschließen. Bei der
                    Deaktivierung von Cookies kann die Funktionalität dieser
                    Website eingeschränkt sein.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl text-foreground mb-4">
                    11. Widerspruch gegen Werbe-Mails
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

                <section className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm">Stand: Juli 2026</p>
                </section>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
