import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { site } from "@/lib/site";

/*
  Shared OG image template: paper ground, mono eyebrow, display title,
  and the boundary line in signal amber — the site's signature element
  as the card's one graphic device.
*/

const fontsDir = path.join(process.cwd(), "assets/fonts");
const schibsted = fs.readFileSync(path.join(fontsDir, "schibsted-grotesk-700.ttf"));
const plexMono = fs.readFileSync(path.join(fontsDir, "ibm-plex-mono-400.ttf"));

export function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const title = (params.get("title") ?? site.name).slice(0, 120);
  const eyebrow = (params.get("eyebrow") ?? "azamat.app").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F0F2F0",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontFamily: "Plex Mono",
            fontSize: 26,
            letterSpacing: "0.14em",
            color: "#5A655F",
          }}
        >
          {eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            fontFamily: "Schibsted",
            fontSize: title.length > 55 ? 60 : 72,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: "#12171A",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", height: 3, background: "#96581B" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
              fontFamily: "Plex Mono",
              fontSize: 24,
              color: "#5A655F",
            }}
          >
            <span>{site.name}</span>
            <span style={{ color: "#96581B" }}>azamat.app</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Schibsted", data: schibsted, weight: 700 },
        { name: "Plex Mono", data: plexMono, weight: 400 },
      ],
    }
  );
}
