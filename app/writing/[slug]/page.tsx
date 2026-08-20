import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/lib/content";
import { ogImage } from "@/lib/og";
import { Mdx } from "@/components/mdx";

// getPost only returns published posts, so unpublished drafts 404 here
// as well as staying out of the index, sitemap, and feed.

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { ...ogImage(post.title, post.date), type: "article", publishedTime: post.date },
  };
}

function readingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[640px]">
      <p className="mb-10 text-sm">
        <Link
          href="/writing"
          className="text-slate underline underline-offset-4 decoration-line-strong hover:text-ink"
        >
          ← All writing
        </Link>
      </p>

      <header className="mb-10">
        <p className="reading mb-3 text-xs text-slate">
          <time dateTime={post.date}>{post.date}</time> ·{" "}
          {readingTime(post.body)} min
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold">{post.title}</h1>
      </header>

      <Mdx source={post.body} />
    </article>
  );
}
