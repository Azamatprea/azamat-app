import type { Metadata } from "next";
import { Schibsted_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
          <header className="flex items-baseline justify-between pt-10 pb-16">
            <nav aria-label="Main" className="flex items-baseline gap-7">
              <Link
                href="/"
                className="font-display font-semibold tracking-tight hover:text-slate"
              >
                Azamat Erkinov
              </Link>
              <Link href="/work" className="text-sm text-slate hover:text-ink">
                Work
              </Link>
              <Link href="/writing" className="text-sm text-slate hover:text-ink">
                Writing
              </Link>
            </nav>
            <ThemeToggle />
          </header>
          <main id="main">{children}</main>
          <footer className="mt-24 border-t border-line pt-8 pb-14">
            <p className="text-sm text-slate">{site.nowLine}</p>
            <p className="reading mt-3 text-[0.7rem] tracking-[0.08em] text-slate">
              {site.signature}
            </p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
