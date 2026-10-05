import { ImageResponse } from "next/og";

export const alt = "JakSambung spatial intelligence network";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#101414", color: "#d9ddda", padding: 64, position: "relative", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "62%" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>JakSambung</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 75, lineHeight: 1, letterSpacing: -4, fontWeight: 900 }}>
            <div style={{ display: "flex" }}>FROM CROWD FLOW</div>
            <div style={{ display: "flex" }}>TO CITY FLOW.</div>
          </div>
          <div style={{ marginTop: 30, fontSize: 24, color: "#9da8a5" }}>Spatial intelligence for city-scale events</div>
        </div>
      </div>
      <div style={{ display: "flex", width: "38%", height: "100%", border: "2px solid #465250", position: "relative", background: "#143c42" }}>
        <div style={{ position: "absolute", left: 155, top: 210, width: 120, height: 90, border: "3px solid #d9ddda", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>EVENT</div>
        <div style={{ position: "absolute", left: 40, top: 100, width: 28, height: 28, border: "5px solid #54d6d0" }} />
        <div style={{ position: "absolute", right: 35, bottom: 70, width: 28, height: 28, border: "5px solid #54d6d0" }} />
        <div style={{ position: "absolute", left: 62, top: 122, width: 190, height: 4, background: "#54d6d0", transform: "rotate(27deg)" }} />
        <div style={{ position: "absolute", right: 50, bottom: 113, width: 190, height: 4, background: "#ff5a36", transform: "rotate(32deg)" }} />
      </div>
    </div>,
    size,
  );
}
