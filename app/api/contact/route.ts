import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Kontaktformular-Versand per SMTP (Nodemailer).
 *
 * Nimmt die Formulardaten als JSON entgegen, validiert sie serverseitig und
 * verschickt eine E-Mail über den in den Env-Variablen hinterlegten
 * SMTP-Zugang. Die Zugangsdaten bleiben serverseitig – nichts davon gelangt
 * ins Frontend.
 *
 * Benötigte Env-Variablen (siehe .env.example):
 *   SMTP_HOST   – z. B. w00efa13.kasserver.com (All-Inkl)
 *   SMTP_PORT   – 587 (STARTTLS) oder 465 (SSL)
 *   SMTP_USER   – volle E-Mail-Adresse des Postfachs
 *   SMTP_PASS   – Passwort des Postfachs
 *   CONTACT_TO  – Empfängeradresse (Standard: SMTP_USER)
 */

// Nodemailer benötigt die Node.js-Runtime (nicht Edge).
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** HTML-Sonderzeichen maskieren, damit Nutzereingaben die Mail nicht brechen. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json({ success: false, error: "Ungültige Anfrage." }, 400);
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const message = String(data.message ?? "").trim();
  const consent = data.consent === true;
  const honeypot = String(data.botcheck ?? "").trim();

  // Spam-Falle: gefülltes Honeypot-Feld -> stillschweigend als Erfolg quittieren.
  if (honeypot) return json({ success: true });

  // Serverseitige Validierung (unabhängig vom Frontend).
  if (!name || !email || !message) {
    return json(
      { success: false, error: "Bitte Name, E-Mail und Nachricht ausfüllen." },
      400,
    );
  }
  if (!EMAIL_RE.test(email)) {
    return json(
      { success: false, error: "Bitte eine gültige E-Mail-Adresse angeben." },
      400,
    );
  }
  if (!consent) {
    return json(
      { success: false, error: "Bitte der Datenverarbeitung zustimmen." },
      400,
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const to = process.env.CONTACT_TO || SMTP_USER;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !to) {
    console.error("[contact] SMTP-Konfiguration fehlt (Env-Variablen prüfen).");
    return json(
      {
        success: false,
        error:
          "Der E-Mail-Versand ist derzeit nicht konfiguriert. Bitte rufen Sie uns an.",
      },
      500,
    );
  }

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL/TLS, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const lines = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    "",
    "Nachricht:",
    message,
  ].filter((l) => l !== null);

  const html = `
    <h2 style="margin:0 0 16px">Neue Anfrage über das Kontaktformular</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>Nachricht:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Website Wohlfahrt & Wohlfahrt" <${SMTP_USER}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Neue Anfrage über das Kontaktformular – ${name}`,
      text: lines.join("\n"),
      html,
    });
    return json({ success: true });
  } catch (err) {
    console.error("[contact] Versand fehlgeschlagen:", err);
    return json(
      {
        success: false,
        error:
          "Das Senden ist fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
      },
      502,
    );
  }
}
