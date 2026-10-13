"use client";

import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";

export function NotFound() {
  return (
    // Dunkler Grund wie die Heros von Kontakt/Karriere: der Header liegt auf
    // unbekannten Pfaden transparent mit weisser Schrift ueber der Seite – auf
    // hellem Grund waren Logo und Claim dort unsichtbar.
    <div className="min-h-[70vh] flex items-center justify-center bg-primary text-white pt-32 pb-24 border-b border-white/10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Die Zahl ist Dekoration, die Ueberschrift sagt, was passiert ist. */}
          <p
            aria-hidden="true"
            className="font-[Bebas_Neue] text-9xl leading-none mb-4 text-accent"
          >
            404
          </p>
          <h1 className="text-4xl mb-6">Seite nicht gefunden</h1>
          <p className="text-lg text-white/70 mb-8">
            Die gesuchte Seite existiert leider nicht.
          </p>
          <Button asChild variant="primary">
            <Link to="/">Zurück zur Startseite</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
