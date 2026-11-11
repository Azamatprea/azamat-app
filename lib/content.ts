import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type WorkEntry = {
  title: string;
  slug: string;
  status: "Production" | "Deployed" | "Shipped" | "Won";
  org: string;
  year: string;
  order: number;
  summary: string;
  stack: string[];
  links: Record<string, string>;
  cover?: { src: string; alt: string; width: number; height: number };
  body: string;
};

export type Post = {
  title: string;
  slug: string;
  date: string;
  description: string;
  published: boolean;
  body: string;
};

function readDir(dir: string) {
  const full = path.join(contentRoot, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), "utf8");
      return matter(raw);
    });
}

function assertCoverSize(slug: string, cover: WorkEntry["cover"]) {
  if (cover && (!Number.isFinite(cover.width) || !Number.isFinite(cover.height))) {
    throw new Error(
      `work/${slug}: cover frontmatter must include numeric width and height`
    );
  }
}

export function getWorkEntries(): WorkEntry[] {
  return readDir("work")
    .map(({ data, content }) => {
      const entry = { ...(data as Omit<WorkEntry, "body">), body: content };
      assertCoverSize(entry.slug, entry.cover);
      return entry;
    })
    .sort((a, b) => a.order - b.order);
}

export function getWorkEntry(slug: string): WorkEntry | undefined {
  return getWorkEntries().find((w) => w.slug === slug);
}

export function getPosts(): Post[] {
  return readDir("writing")
    .map(({ data, content }) => ({ ...(data as Omit<Post, "body">), body: content }))
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
