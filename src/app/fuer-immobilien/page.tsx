import type { Metadata } from "next";
import { FuerImmobilienClient } from "./FuerImmobilienClient";

export const metadata: Metadata = {
  title: "Für Immobilieneigentümer – Fassadenwerbung | Hyde Media Schweiz",
  description:
    "Verdienen Sie mit Ihrer Bau- oder Sanierungsfassade. Gerüstwerbung als Einnahmequelle für Immobilieneigentümer in Zürich, Basel, Bern und der Schweiz.",
};

export default function FuerImmobilienPage() {
  return <FuerImmobilienClient />;
}
