import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";
import { ogImage } from "@/lib/og";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on on-prem AI, quantization economics, MCP, and public data.",
  alternates: { canonical: "/writing" },
  openGraph: ogImage("Writing", "posts"),
};

export default function WritingIndex() {
  const posts = getPosts();

  return (
    <Section label="Writing">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Writing</h1>
      <p className="text-slate mb-10 max-w-[56ch]">
        Mostly the economics and mechanics of owning your AI instead of
        renting it.
      </p>
      <ul className="flex flex-col">
        {posts.map((post, i) => (
          <li
            key={post.slug}
            className={`py-6 ${i > 0 ? "border-t border-line" : "pt-0"}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-semibold leading-snug">
                <Link href={`/writing/${post.slug}`} className="hover:text-slate">
                  {post.title}
                </Link>
              </h2>
              <time dateTime={post.date} className="reading shrink-0 text-xs text-slate">
                {post.date}
              </time>
            </div>
            <p className="mt-1.5 text-sm text-slate">{post.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
