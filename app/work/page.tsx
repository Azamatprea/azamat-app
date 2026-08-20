import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies: systems for data that can't move.",
};

export default function WorkIndex() {
  return (
    <Section label="Work">
      <h1 className="text-2xl font-bold mb-4">Work</h1>
      <p className="text-slate">Case studies land in pass 4.</p>
    </Section>
  );
}
