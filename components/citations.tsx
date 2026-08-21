import type { ReactNode } from "react";

/*
  Footnote-style citation links. Intro text carries markers like
  [^aiconsensus]; each resolves against the citations map to a superscript
  numbered link. Numbers are assigned in order of first appearance and
  reset per page. A marker with no entry in the map renders nothing —
  the claim stays as plain text rather than linking somewhere weak.
*/

export function renderCitedParagraphs(
  paragraphs: readonly string[],
  citations: Record<string, string>
): ReactNode[] {
  const numbers = new Map<string, number>();

  return paragraphs.map((text) => {
    const parts = text.split(/(\[\^\w+\])/);
    return (
      <p key={text.slice(0, 24)}>
        {parts.map((part, i) => {
          const m = part.match(/^\[\^(\w+)\]$/);
          if (!m) return part;
          const url = citations[m[1]];
          if (!url) return null;
          if (!numbers.has(m[1])) numbers.set(m[1], numbers.size + 1);
          const n = numbers.get(m[1]);
          return (
            <sup key={i} className="citation">
              <a href={url} aria-label={`Reference ${n}`}>
                {n}
              </a>
            </sup>
          );
        })}
      </p>
    );
  });
}
