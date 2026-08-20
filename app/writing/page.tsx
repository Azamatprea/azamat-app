import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on on-prem AI, quantization, and public data.",
};

export default function WritingIndex() {
  return (
    <Section label="Writing">
      <h1 className="text-2xl font-bold mb-4">Writing</h1>
      <p className="text-slate">Posts land in pass 5.</p>
    </Section>
  );
}
