"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/*
  Quick-open palette: Cmd+K / Ctrl+K, plus the visible trigger in the nav.
  Deliberately minimal — a fuzzy-filtered list over a static route index,
  no dependency. Focus is trapped in the dialog and returned to whatever
  opened it. Numbers stay per-page concerns; this only navigates.
*/

export type PaletteItem = {
  title: string;
  href: string;
  group: string;
};

// Subsequence match: every query character appears in order in the title.
// Contiguous substrings rank above scattered matches, earlier above later.
function fuzzyScore(query: string, title: string): number | null {
  const q = query.toLowerCase();
  const t = title.toLowerCase();
  if (!q) return 0;
  const substringAt = t.indexOf(q);
  if (substringAt !== -1) return 1000 - substringAt;
  let ti = 0;
  let score = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return null;
    score -= found - ti; // penalize gaps
    ti = found + 1;
  }
  return score;
}

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    return items
      .map((item) => ({ item, score: fuzzyScore(query, item.title) }))
      .filter((r): r is { item: PaletteItem; score: number } => r.score !== null)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    restoreRef.current?.focus();
    restoreRef.current = null;
  }, []);

  const openPalette = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((was) => {
          if (was) {
            setQuery("");
            setActive(0);
            restoreRef.current?.focus();
            restoreRef.current = null;
            return false;
          }
          restoreRef.current = document.activeElement as HTMLElement | null;
          return true;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[active];
      if (target) {
        close();
        router.push(target.href);
      }
    } else if (e.key === "Tab") {
      // Focus trap: the input is the only tab stop while open.
      e.preventDefault();
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        aria-label="Open command palette"
        aria-haspopup="dialog"
        className="reading min-w-11 px-2 py-[14px] -my-[14px] -mx-2 text-center text-[0.7rem] text-slate hover:text-ink"
      >
        {isMac ? "⌘K" : "Ctrl K"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink/20 px-6 pt-[18vh]"
          onMouseDown={(e) => {
            if (!dialogRef.current?.contains(e.target as Node)) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Jump to page"
            onKeyDown={onDialogKeyDown}
            className="mx-auto max-w-md border border-line-strong bg-paper shadow-lg"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Jump to…"
              aria-label="Search pages"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-results"
              aria-activedescendant={
                results[active] ? `palette-opt-${active}` : undefined
              }
              autoComplete="off"
              spellCheck={false}
              className="w-full border-b border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate"
            />
            <ul
              id="palette-results"
              role="listbox"
              aria-label="Pages"
              className="max-h-[40vh] overflow-y-auto py-1.5"
            >
              {results.length === 0 && (
                <li className="px-4 py-2.5 text-sm text-slate" aria-disabled>
                  No matches
                </li>
              )}
              {results.map((item, i) => (
                <li
                  key={item.href}
                  id={`palette-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    close();
                    router.push(item.href);
                  }}
                  className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2 text-sm ${
                    i === active ? "bg-panel text-ink" : "text-slate"
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  <span className="label shrink-0 normal-case tracking-[0.08em]">
                    {item.group}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
