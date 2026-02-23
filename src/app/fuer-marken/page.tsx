import type { Metadata } from "next";
import { FuerMarkenClient } from "./FuerMarkenClient";

export const metadata: Metadata = {
  title: "Für Marken – Gerüstwerbung & Fassadenwerbung | Hyde Media Schweiz",
  description:
    "Grossflächige OOH-Kampagnen für Marken in der Schweiz. Gerüstwerbung und Fassadenwerbung in Zürich, Basel, Bern und weiteren Städten.",
};

export default function FuerMarkenPage() {
  return <FuerMarkenClient />;
}
