import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const INK = "#0b0c10";
const PAPER = "#f2eee6";
const SAFFRON = "#f9c13c";

function readAsset(name) {
  return readFile(join(process.cwd(), "src/assets/og", name));
}

async function ogFonts() {
  const [medium, bold] = await Promise.all([
    readAsset("bricolage-grotesque-latin-500-normal.woff"),
    readAsset("bricolage-grotesque-latin-800-normal.woff"),
  ]);
  return [
    { name: "Bricolage", data: medium, weight: 500, style: "normal" },
    { name: "Bricolage", data: bold, weight: 800, style: "normal" },
  ];
}

function Star({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path
        fill={SAFFRON}
        d="M16 0l4.6 4.9 6.7-.2-.2 6.7L32 16l-4.9 4.6.2 6.7-6.7-.2L16 32l-4.6-4.9-6.7.2.2-6.7L0 16l4.9-4.6-.2-6.7 6.7.2z"
      />
      <path fill={INK} d="M10 9.5h12.4v2.6l-8.3 7.5h8.5v2.9H9.6v-2.7l8.2-7.4H10z" />
    </svg>
  );
}

function Signature() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: PAPER }}>
      <Star />
      Mohamed Zrigou
    </div>
  );
}

export async function siteOgImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: INK, color: PAPER, fontFamily: "Bricolage" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, opacity: 0.75 }}>
        <span>Agadir, Morocco</span>
        <span>zrigou.com</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 158, fontWeight: 800, lineHeight: 0.92, letterSpacing: -7 }}>Mohamed</div>
        <div style={{ fontSize: 158, fontWeight: 800, lineHeight: 0.92, letterSpacing: -7, color: SAFFRON }}>Zrigou</div>
        <div style={{ marginTop: 36, fontSize: 38 }}>Full-stack web & mobile developer</div>
      </div>
    </div>,
    { ...ogSize, fonts: await ogFonts() }
  );
}

export async function projectOgImage(project) {
  const image = await readAsset(`${project.id}.jpg`);
  const src = `data:image/jpeg;base64,${image.toString("base64")}`;
  const isTall = project.id === "masroufi" || project.id === "inspectra";
  const background = project.tintDeep ?? "#13151b";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background, color: PAPER, fontFamily: "Bricolage", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 60, width: isTall ? 800 : 620, flexShrink: 0 }}>
        <Signature />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, opacity: 0.75, marginBottom: 18 }}>{project.category}</div>
          <div style={{ fontSize: project.title.length > 20 ? 58 : 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{project.title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.25, marginTop: 20, opacity: 0.9 }}>{project.tagline}</div>
        </div>
      </div>
      <img
        src={src}
        alt=""
        width={isTall ? 330 : 900}
        style={isTall ? { marginTop: 56, borderRadius: 24 } : { marginTop: 72, borderRadius: 16, height: 560, objectFit: "cover", objectPosition: "left top" }}
      />
    </div>,
    { ...ogSize, fonts: await ogFonts() }
  );
}
