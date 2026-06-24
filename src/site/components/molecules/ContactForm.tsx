import { useState } from "react";
import { Link } from "react-router";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { Button } from "../atoms/Button";
import { toast } from "sonner";

/**
 * Web3Forms Access Key.
 * Kostenlos erstellen unter https://web3forms.com (E-Mail-Adresse eintragen,
 * Key wird zugeschickt) und hier einsetzen. Der Key ist nicht geheim – er darf
 * im Frontend stehen; die Einsendungen gehen an die bei Web3Forms hinterlegte
 * E-Mail-Adresse.
 */
const WEB3FORMS_ACCESS_KEY = "DEIN-ACCESS-KEY";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      toast.error(
        "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu, um fortzufahren.",
      );
      return;
    }
    void sendForm();
  };

  const sendForm = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Neue Anfrage über das Kontaktformular",
          from_name: "Website Wohlfahrt & Wohlfahrt",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Vielen Dank! Wir werden uns bald bei Ihnen melden.");
        setFormData(EMPTY_FORM);
        setConsent(false);
      } else {
        toast.error(
          "Das Senden ist fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
        );
      }
    } catch {
      toast.error(
        "Verbindungsfehler. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot gegen Spam-Bots – fuer Menschen unsichtbar */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <Input
        label="Name"
        name="name"
        type="text"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        label="E-Mail"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        label="Telefon"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <Textarea
        label="Nachricht"
        name="message"
        required
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <div className="flex items-start gap-3">
        <input
          id="privacy-consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-accent"
          aria-required="true"
        />
        <label
          htmlFor="privacy-consent"
          className="text-sm text-foreground/80 leading-relaxed"
        >
          Ich habe die{" "}
          <Link
            to="/datenschutz"
            className="text-accent underline hover:no-underline"
          >
            Datenschutzerklärung
          </Link>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung
          meiner Anfrage zu.
          <span className="text-accent" aria-hidden="true">
            {" "}
            *
          </span>
        </label>
      </div>
      <Button
        type="submit"
        variant="primary"
        className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Wird gesendet…" : "Nachricht senden"}
      </Button>
    </form>
  );
}
