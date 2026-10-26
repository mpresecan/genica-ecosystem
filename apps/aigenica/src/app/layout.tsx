import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader, SiteFooter, Motion, PROPERTIES, Button } from "@genica/ui";
import { QrCodeIcon } from "lucide-react";
import "./globals.css";
import { ContactCard } from "../components/contact-card";

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
    default: 'AIgenica, AI automation for European companies',
    template: `%s, ${SITE.name}`,
  },
  description: 'AI automation agency working across Europe and certified SuperCognit partner. We automate the repetitive work in your documents, inboxes and systems, and build AI agents that answer your customers, with human review where it matters and GDPR built in.',
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: 'AIgenica, AI automation for European companies',
    description: 'AI automation agency working across Europe and certified SuperCognit partner. We automate the repetitive work in your documents, inboxes and systems, and build AI agents that answer your customers, with human review where it matters and GDPR built in.',
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
    "label": "AI agents",
    "href": "/agents"
  },
  {
    "label": "How it works",
    "href": "/how-it-works"
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
        "label": "AI agents",
        "href": "/agents"
      },
      {
        "label": "How it works",
        "href": "/how-it-works"
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
    /* `suppressHydrationWarning` covers this element's own attributes and
       nothing else. It is here for one of them: the motion island writes
       `data-motion` from an inline script at the top of the body, before
       React hydrates, because the hold on the entrances has to be in place
       before anything below it paints. The server cannot render that
       attribute itself, since the whole point of writing it from a script
       is that no script means no hold. */
    <html
      lang="en"
      data-line="aigenica"
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
        <SiteHeader
          line="aigenica"
          nav={NAV}
          extra={
            <Button asChild variant="outline" size="sm">
              <a href="#card">
                <QrCodeIcon />
                Contact
              </a>
            </Button>
          }
        />
        <main id="main">{children}</main>
        <SiteFooter line="aigenica" columns={FOOTER_COLUMNS} />
        <ContactCard />
      </body>
    </html>
  );
}
