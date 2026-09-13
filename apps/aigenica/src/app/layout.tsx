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

const SITE = PROPERTIES.aigenica;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Aigenica, agentic delivery pipelines for engineering organisations',
    template: `%s, ${SITE.name}`,
  },
  description: 'We install the pipeline that lets your team ship with agents under real controls: specification, review gates, traceability and a delivery record you can audit.',
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: 'Aigenica, agentic delivery pipelines for engineering organisations',
    description: 'We install the pipeline that lets your team ship with agents under real controls: specification, review gates, traceability and a delivery record you can audit.',
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
    "label": "The pipeline",
    "href": "/pipeline"
  },
  {
    "label": "Engagements",
    "href": "/engagements"
  }
];

const FOOTER_COLUMNS = [
  {
    "title": "This site",
    "links": [
      {
        "label": "The pipeline",
        "href": "/pipeline"
      },
      {
        "label": "Engagements",
        "href": "/engagements"
      }
    ]
  }
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-line="aigenica" className={`${inter.variable} ${jb.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Motion />
        <SiteHeader line="aigenica" nav={NAV} />
        <main id="main">{children}</main>
        <SiteFooter line="aigenica" columns={FOOTER_COLUMNS} />
      </body>
    </html>
  );
}
