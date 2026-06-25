"use client";

import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/atoms/Button";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-9xl mb-4 text-accent">404</h1>
          <h2 className="text-4xl mb-6">Seite nicht gefunden</h2>
          <p className="text-lg text-muted-foreground mb-8">
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
