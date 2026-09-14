import * as React from "react"
import { cn } from "../lib/utils"
import { BOOKING_URL, CONTACT_EMAIL } from "../brand"
import { Button, Arrow } from "./ui/button"
import { Container } from "./primitives"
import { RevealText } from "./reveal-text"

/** The close. One action, and one address underneath it. */
export function CtaBand({
  heading,
  lede,
  action = "Book a call",
  detail,
  className,
}: {
  heading: React.ReactNode
  lede?: React.ReactNode
  action?: string
  detail?: React.ReactNode
  tone?: "field" | "ink"
  className?: string
}) {
  return (
    <section className={cn("border-t border-hair bg-paper", className)}>
      <Container className="py-24 sm:py-28">
        <div className="max-w-[40rem]">
          <RevealText as="h2" className="t-display text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
            {heading}
          </RevealText>
          {lede ? <p className="t-body reveal-under mt-7">{lede}</p> : null}

          <div className="reveal-under mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                {action}
                <Arrow />
              </a>
            </Button>
            <p className="text-[0.875rem] text-muted">
              or write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="link">{CONTACT_EMAIL}</a>
            </p>
          </div>

          {detail ? (
            <p className="t-mono reveal mt-10 max-w-[32rem] leading-[1.7]">{detail}</p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
