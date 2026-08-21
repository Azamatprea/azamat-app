"use client";

import { useEffect, useRef } from "react";

/*
  Client half of a screenshot-pair cell when the file is a video:
  muted, looping, gif-like — but pauses under prefers-reduced-motion
  and toggles on tap.
*/

export function ShotVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) ref.current?.play().catch(() => {});
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onClick={toggle}
      className="h-full w-full cursor-pointer object-cover"
      aria-label={label}
    />
  );
}
