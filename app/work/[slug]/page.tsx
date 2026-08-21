import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkEntries, getWorkEntry } from "@/lib/content";
import { ogImage } from "@/lib/og";
import { systemDiagrams } from "@/components/system-diagrams";
import { InlineRecording } from "@/components/inline-recording";
import { Mdx } from "@/components/mdx";
import { EntryLinks } from "@/components/entry-links";

export function generateStaticParams() {
  return getWorkEntries().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkEntry(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/work/${entry.slug}` },
    openGraph: ogImage(entry.title, `${entry.status} \u00b7 ${entry.year}`),
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkEntry(slug);
  if (!entry) notFound();

  const Diagram = systemDiagrams[entry.slug];

  return (
    <article className="mx-auto max-w-[640px]">
      <p className="mb-10 text-sm">
        <Link
          href="/work"
          className="text-slate underline underline-offset-4 decoration-line-strong hover:text-ink"
        >
          ← All work
        </Link>
      </p>

      <header className="mb-10">
        <p className="reading mb-3 text-xs">
          <span className="text-signal">{entry.status.toUpperCase()}</span>
          <span className="text-slate">
            {" "}
            · {entry.org} · {entry.year}
          </span>
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold">{entry.title}</h1>
        <EntryLinks links={entry.links} className="mt-4 text-sm" />
      </header>

      <Mdx source={entry.body} components={{ InlineRecording, ...(Diagram ? { SystemDiagram: Diagram } : {}) }} />

      <footer className="mt-12 border-t border-line pt-6">
        <p className="label mb-2">Stack</p>
        <p className="reading text-sm text-slate">{entry.stack.join(", ")}</p>
      </footer>
    </article>
  );
}
