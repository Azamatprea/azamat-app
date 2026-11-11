import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getWorkEntries, getPosts } from "@/lib/content";
import { ogImage } from "@/lib/og";
import { Section } from "@/components/section";
import { EntryLinks } from "@/components/entry-links";
import { renderCitedParagraphs } from "@/components/citations";
import { BoundaryLine } from "@/components/boundary-line";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/writing/rss.xml" },
  },
  openGraph: ogImage(site.tagline),
};

// Real intrinsic pixel sizes of the cover images referenced in work
// frontmatter; next/image needs them for the aspect ratio.
const coverSizes: Record<string, { width: number; height: number }> = {
  "safecast-assistant": { width: 1440, height: 772 },
  origin: { width: 1920, height: 1006 },
};

export default function Home() {
  const work = getWorkEntries();
  const posts = getPosts().slice(0, 3);

  return (
    <div className="reveal flex flex-col gap-16">
      <Section label="Intro">
        {/* Name and tagline on the left, a small framed portrait on the
            right. On mobile the portrait sits above the name. */}
        <div className="mb-7 flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[1.15rem] sm:text-[1.25rem] font-semibold mb-2">
              {site.name}
            </h1>
            <p className="font-display text-ink text-[1.6rem] sm:text-[2.1rem] leading-tight text-balance">
              {site.tagline}
            </p>
          </div>
          <figure className="w-[120px] shrink-0 sm:w-[160px]">
            <Image
              src={site.portrait.src}
              alt={site.portrait.alt}
              width={site.portrait.width}
              height={site.portrait.height}
              sizes="160px"
              priority
              className="border border-line"
            />
            <figcaption className="reading mt-2 text-[0.7rem] tracking-[0.08em] text-slate">
              {site.portrait.caption}
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-col gap-4">
          {renderCitedParagraphs(site.intro.slice(0, 1), site.citations)}
        </div>
      </Section>

      <BoundaryLine />

      {/* Two columns: the roles timeline sits in the label margin and stays
          sticky on desktop while the case study cards scroll past it. On
          mobile it stacks — compact timeline first, cards below, no sticky. */}
      <section className="grid gap-3 sm:grid-cols-[140px_1fr] sm:gap-6">
        <aside className="sm:sticky sm:top-10 sm:self-start">
          <p className="label pt-1">Work</p>
          <ol className="mt-3 flex flex-col gap-3 sm:mt-5">
            {site.timeline.map((role) => (
              <li key={role.org} className="text-xs leading-relaxed">
                <p className="font-medium">{role.org}</p>
                <p className="text-slate">{role.title}</p>
                <p className="reading text-slate">{role.years}</p>
              </li>
            ))}
          </ol>
        </aside>
        <ul className="flex max-w-[640px] min-w-0 flex-col">
          {work.map((entry, i) => (
            <li
              key={entry.slug}
              className={`py-6 ${i > 0 ? "border-t border-line" : "pt-0"}`}
            >
              <div className="sm:flex sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
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
                  <EntryLinks links={entry.links} />
                </div>
                <div className="hidden sm:block w-[132px] shrink-0">
                  {entry.cover && (
                    <div className="relative w-[132px] aspect-[15/8] overflow-hidden border border-line">
                      <Image
                        src={entry.cover.src}
                        alt={entry.cover.alt}
                        width={coverSizes[entry.slug].width}
                        height={coverSizes[entry.slug].height}
                        sizes="132px"
                        priority={i === 0}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

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

      <BoundaryLine />

      <Section label="About">
        <div className="flex flex-col gap-4">
          {renderCitedParagraphs(site.intro.slice(1), site.citations)}
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
    </div>
  );
}
