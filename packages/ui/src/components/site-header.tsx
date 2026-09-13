"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"
import { BOOKING_URL, type LineId } from "../brand"
import { Wordmark } from "./wordmark"
import { NetworkRail } from "./network-rail"
import { Button, Arrow } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

export type NavItem = { label: string; href: string }

/**
 * Nav on one line, 64px tall.
 *
 * The header sticks one switcher-rail above the viewport, so as soon as the
 * page moves the rail scrolls away and the bar pins on its own. Nothing is
 * measured, nothing collapses, and the document's height never changes, which
 * is why the page under it does not jump. Once pinned the bar goes
 * translucent over what passes beneath it and carries a single accent
 * hairline showing how far through the page you are: the one piece of colour
 * this system spends on position.
 */
export function SiteHeader({
  line,
  nav,
  cta = "Book a call",
}: {
  line: LineId
  nav: NavItem[]
  cta?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [here, setHere] = React.useState<string | null>(null)

  /* Read after mount rather than on the server, so the markup stays static
     and the same page can be cached for every route. */
  React.useEffect(() => setHere(window.location.pathname), [])

  return (
    <header className="site-header sticky z-50">
      <NetworkRail current={line} />
      <div className="site-bar relative border-b border-hair">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center px-6 sm:px-8">
          <a
            href="/"
            className="shrink-0 transition-opacity duration-150 hover:opacity-70"
          >
            <Wordmark line={line} />
            <span className="sr-only">Home</span>
          </a>

          <nav className="ml-auto hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={here === item.href ? "page" : undefined}
                className="nav-link text-[0.8125rem] text-body transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-8">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                {cta}
              </a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon-sm" className="md:hidden">
                  <MenuIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(21rem,88vw)] border-l-hair bg-paper p-0">
                <SheetHeader className="border-b border-hair px-6 py-4">
                  <SheetTitle asChild>
                    <span><Wordmark line={line} /></span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-6">
                  {nav.map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      style={{ animationDelay: `${0.05 + i * 0.045}s` }}
                      className="sheet-item flex items-center justify-between border-b border-hair py-4 text-[1.125rem] font-medium tracking-[-0.02em] text-ink"
                    >
                      {item.label}
                      <Arrow className="text-faint" />
                    </a>
                  ))}
                </nav>
                <div
                  className="sheet-item px-6 pt-6"
                  style={{ animationDelay: `${0.05 + nav.length * 0.045}s` }}
                >
                  <Button asChild size="lg" className="w-full">
                    <a href={BOOKING_URL} target="_blank" rel="noreferrer">{cta}</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* How far through the page. Scaled from a custom property, so it
            costs one composited transform per frame and no layout. */}
        <div
          aria-hidden
          className="site-progress absolute inset-x-0 bottom-[-1px] h-px bg-accent"
        />
      </div>
    </header>
  )
}
