/*
  The signature element: a hairline rule marking what's inside a system
  and what's outside it. Used between the intro and the work on the home
  page, and as the axis of case-study diagrams.
*/
export function BoundaryLine({ className = "" }: { className?: string }) {
  return (
    <hr
      aria-hidden="true"
      className={`border-0 h-px bg-line-strong ${className}`}
    />
  );
}
