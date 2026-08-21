"use client";

import { useEffect, useRef, useState } from "react";

/*
  Inline screen recording for case studies. Muted, looping, playsinline,
  controls chrome only on hover. Respects prefers-reduced-motion: no
  autoplay, tap to play. If the source file is missing, renders a clearly
  marked placeholder frame instead of a black box.

  TODO: replace with real screen recording, ~10-15s, Safecast assistant
  answering a live query. Drop the file at public/media/safecast-demo.mp4
  and a poster frame at public/media/safecast-poster.jpg.
*/

export function InlineRecording({
  src = "/media/safecast-demo.mp4",
  poster = "/media/safecast-poster.jpg",
  caption = "The assistant answering a live query on the Safecast map.",
}: {
  src?: string;
  poster?: string;
  caption?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);
  const [hover, setHover] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setNeedsTap(true);
    } else {
      ref.current?.play().catch(() => {});
    }
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setNeedsTap(false);
    } else {
      v.pause();
      setNeedsTap(true);
    }
  }

  if (missing) {
    return (
      <figure className="my-10">
        <div className="flex items-center justify-center border border-line-strong bg-panel px-6 py-16">
          <p className="label text-center normal-case tracking-normal">
            Recording placeholder — drop safecast-demo.mp4 into /public/media
          </p>
        </div>
        <figcaption className="label mt-3">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="my-10">
      <div
        className="border border-line-strong bg-panel"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Recording is illustrative; the surrounding prose carries the content. */}
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          controls={hover}
          onClick={toggle}
          onError={() => setMissing(true)}
          className="block w-full cursor-pointer"
          aria-label={caption}
        />
      </div>
      <figcaption className="label mt-3">
        {caption}
        {needsTap && <span> — tap to play</span>}
      </figcaption>
    </figure>
  );
}
