/*
  Outbound links for a work entry — a working thing beats a description,
  so these render wherever the entry appears. Keys map to fixed labels;
  unknown keys are ignored rather than guessed at.
*/

const labels: Record<string, string> = {
  live: "Try it on the live map ↗",
  demo: "Watch the demo ↗",
};

export function EntryLinks({
  links,
  className = "mt-2 text-sm",
}: {
  links: Record<string, string>;
  className?: string;
}) {
  const known = Object.entries(links).filter(([key]) => labels[key]);
  if (known.length === 0) return null;
  return (
    <p className={className}>
      {known.map(([key, url], i) => (
        <span key={key}>
          {i > 0 && <span className="text-slate"> · </span>}
          <a
            href={url}
            className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
          >
            {labels[key]}
          </a>
        </span>
      ))}
    </p>
  );
}
