import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader, SiteFooter, PROPERTIES } from "@genica/ui";
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

const SITE = PROPERTIES.flowgenica;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Flowgenica, client delivery workflow for agencies',
    template: `%s, ${SITE.name}`,
  },
  description: 'Define your delivery workflow once. Every client engagement then runs on it, with stages, owners, dates and a status your client can see without asking.',
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: 'Flowgenica, client delivery workflow for agencies',
    description: 'Define your delivery workflow once. Every client engagement then runs on it, with stages, owners, dates and a status your client can see without asking.',
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
    "label": "Product",
    "href": "/product"
  },
  {
    "label": "For agencies",
    "href": "/agencies"
  }
];

const FOOTER_COLUMNS = [
  {
    "title": "This site",
    "links": [
      {
        "label": "Product",
        "href": "/product"
      },
      {
        "label": "For agencies",
        "href": "/agencies"
      }
    ]
  }
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-line="flowgenica" className={`${inter.variable} ${jb.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader line="flowgenica" nav={NAV} />
        <main id="main">{children}</main>
        <SiteFooter line="flowgenica" columns={FOOTER_COLUMNS} />
      </body>
    </html>
  );
}
