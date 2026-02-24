import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hyde Media – Gerüstwerbung & Fassadenwerbung in der Schweiz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          HYDE MEDIA
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Gerüstwerbung & Fassadenwerbung
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#64748b",
            marginTop: 12,
          }}
        >
          Bewährt in Dänemark – jetzt in der Schweiz
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 20,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          www.hydemedia.ch
        </div>
      </div>
    ),
    { ...size }
  );
}
