import fs from "node:fs";
import path from "node:path";
import { ShotVideo } from "@/components/shot-media";

/*
  Result ↔ mechanism: two media frames side by side (stacked on mobile),
  same aspect ratio, hairline border, a small caption under each. The
  left shows what the user sees; the right shows the machinery behind it.

  Sources are extension-less base paths (e.g. "/media/safecast-answer").
  Drop a file with that name into /public/media in any of these formats
  and it renders — video formats (preferred over GIF: ~10x smaller) play
  muted and looping, pause under prefers-reduced-motion, and toggle on
  tap. Until a file exists, the frame is a labeled placeholder.
*/

const extensions = ["mp4", "webm", "gif", "png", "jpg", "jpeg"] as const;

function resolve(base: string) {
  for (const ext of extensions) {
    if (fs.existsSync(path.join(process.cwd(), "public", `${base}.${ext}`))) {
      return { src: `${base}.${ext}`, video: ext === "mp4" || ext === "webm" };
    }
  }
  return null;
}

function Shot({
  base,
  alt,
  caption,
}: {
  base: string;
  alt: string;
  caption: string;
}) {
  const found = resolve(base);
  return (
    <figure className="min-w-0">
      <div className="flex aspect-video items-center justify-center overflow-hidden border border-line-strong bg-panel">
        {found ? (
          found.video ? (
            <ShotVideo src={found.src} label={alt} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={found.src} alt={alt} className="h-full w-full object-cover" />
          )
        ) : (
          <p className="label px-4 text-center normal-case tracking-normal">
            Placeholder — drop {base.replace("/media/", "")}
            .mp4/.gif/.png into /public/media
          </p>
        )}
      </div>
      <figcaption className="label mt-2 tracking-[0.08em]">{caption}</figcaption>
    </figure>
  );
}

export function ScreenshotPair({
  leftSrc,
  leftAlt,
  leftCaption,
  rightSrc,
  rightAlt,
  rightCaption,
}: {
  leftSrc: string;
  leftAlt: string;
  leftCaption: string;
  rightSrc: string;
  rightAlt: string;
  rightCaption: string;
}) {
  return (
    <div className="my-10 grid gap-5 sm:grid-cols-2">
      <Shot base={leftSrc} alt={leftAlt} caption={leftCaption} />
      <Shot base={rightSrc} alt={rightAlt} caption={rightCaption} />
    </div>
  );
}
