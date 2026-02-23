import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hyde Media – Gerüstwerbung & Fassadenwerbung in der Schweiz",
  description:
    "Hyde Media expandiert in die Schweiz. Spezialist für Gerüstwerbung und Fassadenwerbung – bewährt in Dänemark mit Kampagnen für TV2, Lidl, Saxo Bank u.v.m. Jetzt auch für Marken und Immobilieneigentümer in der Schweiz.",
  keywords:
    "Gerüstwerbung, Fassadenwerbung, Outdoor Werbung Schweiz, Grossflächenwerbung, OOH Kampagnen, Baustellenwerbung, Gerüstbanner, Fassadenwraps, Hyde Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
