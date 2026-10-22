import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "StuduRoj – Studenten van Roj";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image for social media (pages can override it with an image from Sanity). */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1F4D3A", padding: 72, position: "relative" }}>
        <svg width="700" height="700" viewBox="0 0 400 400" style={{ position: "absolute", right: -160, top: -220 }}>
          <circle cx="200" cy="200" r="190" fill="none" stroke="#2C6450" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="127" fill="none" stroke="#2C6450" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="63" fill="none" stroke="#2C6450" strokeWidth="1.5" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", background: "#FFFFFF", borderRadius: 24, padding: "18px 26px", alignSelf: "flex-start" }}>
            <img src={logoSrc} alt="" width={232} height={90} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 76, fontWeight: 600, color: "#FFFFFF", letterSpacing: -2, lineHeight: 1.05 }}>
              Een gemeenschap die samen groeit.
            </div>
            <div style={{ fontSize: 30, color: "#CFE0D6" }}>Gratis lid worden · Activiteiten · Nieuws</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
