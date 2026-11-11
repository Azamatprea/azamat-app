"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark === true}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="label cursor-pointer px-2 py-[14px] -my-[14px] -mx-2 text-slate hover:text-ink"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
