import { site } from "@/lib/site";
import { getWorkEntries, getPosts } from "@/lib/content";

// A route handler instead of the sitemap.ts convention: Next's metadata
// route loader breaks on the apostrophe in this project's directory path.
export const dynamic = "force-static";

export function GET() {
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: `${site.url}/` },
    { loc: `${site.url}/work` },
    { loc: `${site.url}/writing` },
    ...getWorkEntries().map((w) => ({ loc: `${site.url}/work/${w.slug}` })),
    // getPosts already filters to published, so drafts never appear here.
    ...getPosts().map((p) => ({
      loc: `${site.url}/writing/${p.slug}`,
      lastmod: p.date,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
