import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = "Kartavya Gupta — Content Strategist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "84px 88px",
        background:
          "linear-gradient(135deg, #fdf5ec 0%, #fbe6d4 55%, #efe1f7 100%)",
        color: "#1c130c",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: "#c2683a",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#5c4a3a",
          }}
        >
          {site.role}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 128, fontWeight: 700, lineHeight: 1 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 38, color: "#5c4a3a", maxWidth: 880 }}>
          A strategist who can actually execute.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {site.skills.slice(0, 5).map((s) => (
            <div
              key={s}
              style={{
                fontSize: 24,
                padding: "8px 20px",
                borderRadius: 9999,
                border: "1.5px solid rgba(28,19,12,0.18)",
                color: "#5c4a3a",
              }}
            >
              {s}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, color: "#c2683a" }}>
          kartavyagupta.com
        </div>
      </div>
    </div>,
    { ...size },
  );
}
