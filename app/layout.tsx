import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import { getWorkEntries, getPosts } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette, type PaletteItem } from "@/components/command-palette";
import "./globals.css";

const schibsted = localFont({
  src: "./fonts/schibsted-grotesk-latin-wght-normal.woff2",
  weight: "400 900",
  variable: "--font-schibsted",
  display: "swap",
});

const plexSans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: { "application/rss+xml": "/writing/rss.xml" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// Applies a stored theme choice before first paint. Light is the default;
// only an explicit toggle choice is honored.
const themeInit = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Static route index for the ⌘K palette, built once at render time.
  const paletteItems: PaletteItem[] = [
    { title: "Home", href: "/", group: "page" },
    { title: "Work", href: "/work", group: "page" },
    { title: "Writing", href: "/writing", group: "page" },
    { title: "Interactions", href: "/interactions", group: "page" },
    ...getWorkEntries().map((w) => ({
      title: w.title,
      href: `/work/${w.slug}`,
      group: "work",
    })),
    ...getPosts().map((p) => ({
      title: p.title,
      href: `/writing/${p.slug}`,
      group: "writing",
    })),
  ];

  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="mx-auto max-w-[820px] px-6">
          <header className="flex flex-wrap items-baseline justify-between gap-y-3 pt-10 pb-16">
            <Link
              href="/"
              className="whitespace-nowrap font-display font-semibold tracking-tight hover:text-slate"
            >
              Azamat Erkinov
            </Link>
            <nav
              aria-label="Main"
              className="order-3 flex w-full items-baseline gap-7 sm:order-none sm:w-auto sm:ml-7"
            >
              <Link href="/work" className="text-sm text-slate hover:text-ink">
                Work
              </Link>
              <Link href="/writing" className="text-sm text-slate hover:text-ink">
                Writing
              </Link>
              <Link
                href="/interactions"
                className="text-sm text-slate hover:text-ink"
              >
                Interactions
              </Link>
            </nav>
            <div className="order-2 ml-auto flex items-baseline gap-4 sm:order-none">
              <CommandPalette items={paletteItems} />
              <ThemeToggle />
            </div>
          </header>
          <main id="main">{children}</main>
          <footer className="mt-24 border-t border-line pt-8 pb-14">
            <p className="text-sm text-slate">{site.nowLine}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
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
            <p className="reading mt-5 text-[0.7rem] tracking-[0.08em] text-slate">
              {site.signature}
            </p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
