# azamat.app

Personal site of [Azamat Erkinov](https://azamat.app) — AI systems for data that can't move.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript, server-rendered throughout — the only client component is the theme toggle
- Tailwind CSS 4, with the design tokens as CSS custom properties in `app/globals.css`
- MDX content rendered with `next-mdx-remote`
- Deployed on Vercel

## Structure

```
app/                routes; also OG image, sitemap, and RSS route handlers
components/         layout primitives, MDX styling, hand-authored system diagrams
content/work/       case studies (MDX + frontmatter)
content/writing/    posts; published: false keeps a draft out of the index,
                    sitemap, RSS, and returns 404
lib/site.ts         name, thesis, intro, links — the one file to edit for identity
lib/content.ts      frontmatter readers for both content types
assets/fonts/       TTFs used by the OG image template (SIL OFL licensed)
```

## Design notes

Three typefaces with strict roles: Schibsted Grotesk for display, IBM Plex Sans for prose, and IBM Plex Mono **only** for numbers, units, dates, and status tags — so measured values read as instrument readings, visually separate from prose.

The recurring hairline rule is the site's signature element: a boundary line marking what's inside a system and what's outside it. In case studies it's the axis of each system diagram — what sits above the line stays inside the network; whatever crosses is drawn crossing it.

Light theme is the default; dark is a toggle, not an OS preference.

## Running locally

```bash
npm install
npm run dev
```

## Adding a post

Create `content/writing/<slug>.mdx` with `title`, `slug`, `date`, `description`, and `published` in the frontmatter. Flip `published: true` when it's ready — the index, home page, sitemap, and RSS pick it up automatically.
