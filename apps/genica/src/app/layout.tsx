import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader, SiteFooter, Motion, PROPERTIES } from "@genica/ui";
import "./globals.css";

/* Inter + JetBrains Mono, self-hosted variable subsets. Inter is the
   reference site's face and the user named Linear as the craft bar, which is
   the documented override for taste-skill's "avoid Inter as default". */
const inter = localFont({
  src: [
    { path: "./fonts/inter-var.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter-italic-var.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

const jb = localFont({
  src: "./fonts/jbmono-var.woff2",
  variable: "--font-jb",
  display: "swap",
  weight: "100 800",
  style: "normal",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
  adjustFontFallback: false,
});

const SITE = PROPERTIES.genica;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Genica, the software studio for founders building SaaS',
    template: `%s, ${SITE.name}`,
  },
  description: 'Technical direction, product engineering and long-term ownership, from first specification to a product people love. EU-based. No equity.',
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: 'Genica, the software studio for founders building SaaS',
    description: 'Technical direction, product engineering and long-term ownership, from first specification to a product people love. EU-based. No equity.',
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: SITE.hex,
  colorScheme: "light",
};

const NAV = [
  {
    "label": "Approach",
    "href": "/approach"
  },
  {
    "label": "Work",
    "href": "/work"
  },
  {
    "label": "Network",
    "href": "/ecosystem"
  }
];

const FOOTER_COLUMNS = [
  {
    "title": "This site",
    "links": [
      {
        "label": "Approach",
        "href": "/approach"
      },
      {
        "label": "Work",
        "href": "/work"
      },
      {
        "label": "The network",
        "href": "/ecosystem"
      }
    ]
  }
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* `suppressHydrationWarning` covers this element's own attributes and
       nothing else. It is here for one of them: the motion island writes
       `data-motion` from an inline script at the top of the body, before
       React hydrates, because the hold on the entrances has to be in place
       before anything below it paints. The server cannot render that
       attribute itself, since the whole point of writing it from a script
       is that no script means no hold. */
    <html
      lang="en"
      data-line="genica"
      className={`${inter.variable} ${jb.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Motion />
        <SiteHeader line="genica" nav={NAV} />
        <main id="main">{children}</main>
        <SiteFooter line="genica" columns={FOOTER_COLUMNS} />
      </body>
    </html>
  );
}
