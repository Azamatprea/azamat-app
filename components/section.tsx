import type { ReactNode } from "react";

/*
  The site's core layout unit: a mono label in the left margin,
  content in a ~640px column. Collapses to stacked on small screens.
*/
export function Section({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`grid gap-3 sm:grid-cols-[140px_1fr] sm:gap-6 ${className}`}
    >
      <p className="label pt-1">{label}</p>
      <div className="max-w-[640px] min-w-0">{children}</div>
    </section>
  );
}
