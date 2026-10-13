import type { Metadata } from "next";
import { NotFound } from "@/site/pages/NotFound";

// Next setzt fuer 404-Antworten selbst `noindex`; hier nur ein eigener Titel,
// damit im Tab nicht der Titel der Startseite steht.
export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

export default function NotFoundPage() {
  return <NotFound />;
}
