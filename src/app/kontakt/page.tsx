import type { Metadata } from "next";
import { KontaktClient } from "./KontaktClient";

export const metadata: Metadata = {
  title: "Kontakt – Hyde Media Schweiz | Gerüstwerbung & Fassadenwerbung",
  description:
    "Kontaktieren Sie uns für eine unverbindliche Beratung zu Gerüstwerbung und Fassadenwerbung in der Schweiz. Antwort innerhalb von 24 Stunden.",
};

export default function KontaktPage() {
  return <KontaktClient />;
}
