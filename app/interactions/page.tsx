import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { Section } from "@/components/section";
import { BoundaryDemo } from "@/components/interactions/boundary-demo";

export const metadata: Metadata = {
  title: "Interactions",
  description: "Small standalone demos — a sandbox, not a portfolio.",
  alternates: { canonical: "/interactions" },
  openGraph: ogImage("Interactions", "sandbox"),
};

// Each demo is a self-contained component; add new ones to this list.
const demos = [
  {
    title: "The boundary",
    component: BoundaryDemo,
  },
];

export default function Interactions() {
  return (
    <Section label="Interactions">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Interactions</h1>
      <p className="text-slate mb-10 max-w-[56ch]">
        Small standalone demos, no narrative attached.
      </p>
      <div className="flex flex-col gap-14">
        {demos.map((demo) => (
          <section key={demo.title} aria-label={demo.title}>
            <h2 className="label mb-4">{demo.title}</h2>
            <demo.component />
          </section>
        ))}
      </div>
    </Section>
  );
}
