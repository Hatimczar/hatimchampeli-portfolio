import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Hatim Champeli - Marketing, E-commerce & AI-Driven Growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0b0d",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8fb0d6",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#8fb0d6" }} />
          Marketing, E-commerce &amp; AI-Driven Growth
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 28, lineHeight: 1.1 }}>
          Hatim Champeli
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 24, color: "#a1a1a6", maxWidth: 880 }}>
          I turn tech and commerce complexity into growth.
        </div>
      </div>
    ),
    { ...size }
  );
}
