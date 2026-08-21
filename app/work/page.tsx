import type { Metadata } from "next";
import Link from "next/link";
import { getWorkEntries } from "@/lib/content";
import { ogImage } from "@/lib/og";
import { Section } from "@/components/section";
import { EntryLinks } from "@/components/entry-links";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: on-prem models, an assistant over 200M radiation measurements, and a multi-agent research platform.",
  alternates: { canonical: "/work" },
  openGraph: ogImage("Work", "case studies"),
};

export default function WorkIndex() {
  const work = getWorkEntries();

  return (
    <Section label="Work">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Work</h1>
      <p className="text-slate mb-10 max-w-[56ch]">
        Systems for data that can't move — each one built inside somebody's
        boundary, with the numbers to show for it.
      </p>
      <ul className="flex flex-col">
        {work.map((entry, i) => (
          <li
            key={entry.slug}
            className={`py-7 ${i > 0 ? "border-t border-line" : "pt-0"}`}
          >
            <p className="reading mb-2 text-xs">
              <span className="text-signal">{entry.status.toUpperCase()}</span>
              <span className="text-slate">
                {" "}
                · {entry.org} · {entry.year}
              </span>
            </p>
            <h2 className="text-lg font-semibold leading-snug mb-1.5">
              <Link href={`/work/${entry.slug}`} className="hover:text-slate">
                {entry.title}
              </Link>
            </h2>
            <p className="text-sm text-slate">{entry.summary}</p>
            <EntryLinks links={entry.links} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
