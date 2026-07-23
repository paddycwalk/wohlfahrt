// Einmal-Testskript: verschickt eine Dummy-Anfrage über GMX-SMTP an
// schottpatrick@gmx.de. Passwort kommt aus GMX_PASS in .env.local.
// Aufruf: node --env-file=.env.local scripts/test-contact.mjs
import nodemailer from "nodemailer";

const TO = "schottpatrick@gmx.de";
const SMTP_HOST = "mail.gmx.net";
const SMTP_PORT = 587;
const SMTP_USER = "schottpatrick@gmx.de";
const SMTP_PASS = process.env.GMX_PASS;

const name = "Max Mustermann";
const email = "max.mustermann@example.com";
const phone = "0170 1234567";
const message =
  "Dies ist eine Test-Anfrage über das Kontaktformular (Dummy-Daten).\n" +
  "Bitte ignorieren – reiner Funktionstest des E-Mail-Versands.";

if (!SMTP_PASS) {
  console.error("GMX_PASS fehlt in .env.local.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const html = `
  <h2 style="margin:0 0 16px">Neue Anfrage über das Kontaktformular (TEST)</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Telefon:</strong> ${phone}</p>
  <p><strong>Nachricht:</strong></p>
  <p style="white-space:pre-wrap">${message}</p>
`;

try {
  await transporter.verify();
  console.log("SMTP-Verbindung OK.");
  const info = await transporter.sendMail({
    from: `"Website Wohlfahrt & Wohlfahrt (TEST)" <${SMTP_USER}>`,
    to: TO,
    replyTo: `"${name}" <${email}>`,
    subject: `TEST – Neue Anfrage über das Kontaktformular – ${name}`,
    text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`,
    html,
  });
  console.log("Gesendet an", TO, "| messageId:", info.messageId);
  console.log("accepted:", info.accepted, "rejected:", info.rejected);
} catch (err) {
  console.error("Versand fehlgeschlagen:", err?.message || err);
  process.exit(2);
}
