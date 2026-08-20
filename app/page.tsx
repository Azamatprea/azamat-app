import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getWorkEntries, getPosts } from "@/lib/content";
import { ogImage } from "@/lib/og";
import { Section } from "@/components/section";
import { BoundaryLine } from "@/components/boundary-line";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/writing/rss.xml" },
  },
  openGraph: ogImage(site.tagline),
};

export default function Home() {
  const work = getWorkEntries();
  const posts = getPosts().slice(0, 3);

  return (
    <div className="reveal flex flex-col gap-16">
      <Section label="Intro">
        <h1 className="text-3xl sm:text-4xl font-bold mb-5">{site.name}</h1>
        <p className="text-lg text-slate mb-7 text-balance">{site.tagline}</p>
        <div className="flex flex-col gap-4">
          {site.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p>
            Say hello:{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              {site.email}
            </a>
            , or find me on{" "}
            <a
              href={site.links.github}
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              GitHub
            </a>{" "}
            and{" "}
            <a
              href={site.links.linkedin}
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </Section>

      <BoundaryLine />

      <Section label="Work">
        <ul className="flex flex-col">
          {work.map((entry, i) => (
            <li
              key={entry.slug}
              className={`py-6 ${i > 0 ? "border-t border-line" : "pt-0"}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-semibold leading-snug">
                  <Link
                    href={`/work/${entry.slug}`}
                    className="hover:text-slate"
                  >
                    {entry.title}
                  </Link>
                </h2>
                <p className="reading shrink-0 text-xs">
                  <span className="text-signal">
                    {entry.status.toUpperCase()}
                  </span>
                  <span className="text-slate"> · {entry.year}</span>
                </p>
              </div>
              <p className="mt-1.5 text-sm text-slate">{entry.summary}</p>
              {entry.links.live && (
                <p className="mt-2 text-sm">
                  <a
                    href={entry.links.live}
                    className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
                  >
                    Try it on the live map ↗
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {posts.length > 0 && (
        <Section label="Writing">
          <ul className="flex flex-col">
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className={`py-4 ${i > 0 ? "border-t border-line" : "pt-0"}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <Link
                    href={`/writing/${post.slug}`}
                    className="font-medium hover:text-slate"
                  >
                    {post.title}
                  </Link>
                  <time dateTime={post.date} className="reading shrink-0 text-xs text-slate">
                    {post.date}
                  </time>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link
              href="/writing"
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              All writing
            </Link>
          </p>
        </Section>
      )}

      <Section label="Elsewhere">
        <ul className="flex flex-col gap-2 text-sm">
          <li>
            <a
              href={site.links.github}
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.links.linkedin}
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={site.links.resume}
              className="underline underline-offset-4 decoration-line-strong hover:decoration-ink"
            >
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </Section>
    </div>
  );
}
