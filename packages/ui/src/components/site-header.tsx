"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"
import { BOOKING_URL, type LineId } from "../brand"
import { Wordmark } from "./wordmark"
import { NetworkRail } from "./network-rail"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

export type NavItem = { label: string; href: string }

/** Nav on one line, 64px tall. */
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

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <NetworkRail current={line} />
      <div className="border-b border-hair">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center px-6 sm:px-8">
          <a href="/" className="shrink-0">
            <Wordmark line={line} />
            <span className="sr-only">Home</span>
          </a>

          <nav className="ml-auto hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.8125rem] text-body transition-colors hover:text-ink"
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
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-hair py-4 text-[1.125rem] font-medium tracking-[-0.02em] text-ink"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="px-6 pt-6">
                  <Button asChild size="lg" className="w-full">
                    <a href={BOOKING_URL} target="_blank" rel="noreferrer">{cta}</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
