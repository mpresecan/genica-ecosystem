import * as React from "react"
import { cn } from "../lib/utils"
import { RevealText } from "./reveal-text"

/** 1200px, matching the reference site. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-6 sm:px-8", className)}
      {...props}
    />
  )
}

/**
 * Three surfaces and no more: the page, one tinted band, and the dark band.
 * The dark band appears at most once per page.
 *
 * `data-tone` is also what tells the motion layer which surface a hovered row
 * should take, so a row on the tinted band lifts to white rather than tinting
 * into itself.
 */
export function Band({
  tone = "paper",
  className,
  ...props
}: React.ComponentProps<"section"> & { tone?: "paper" | "sunk" | "dark" }) {
  return (
    <section
      data-tone={tone}
      className={cn(
        tone === "paper" && "bg-paper text-ink",
        tone === "sunk" && "bg-paper-2 text-ink",
        tone === "dark" && "bg-dark text-on-dark",
        className
      )}
      {...props}
    />
  )
}

/**
 * The mono label. Rationed by taste-skill to one per three sections, so it is
 * a deliberate call site every time, never a section decoration.
 */
export function Eyebrow({
  className,
  as: As = "p",
  ...props
}: React.ComponentProps<"p"> & { as?: React.ElementType }) {
  return <As className={cn("t-eyebrow", className)} {...props} />
}

export function Rule({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden className={cn("h-px w-full bg-hair", className)} {...props} />
}

/**
 * Heading, and body stacked under it. No floating corner paragraph.
 *
 * It arrives on the scrollport rather than on a clock, and in the order the
 * block is read: the heading a word at a time, left to right, then the line
 * under it, starting a moment later and travelling half as far.
 */
export function SectionHead({
  heading,
  lede,
  className,
  onDark = false,
}: {
  heading: React.ReactNode
  lede?: React.ReactNode
  className?: string
  onDark?: boolean
}) {
  return (
    <div className={cn("max-w-[34rem]", className)}>
      <RevealText as="h2" className={cn("t-h2", onDark && "text-on-dark")}>
        {heading}
      </RevealText>
      {lede ? (
        <p className={cn("t-body reveal-under mt-5", onDark && "text-on-dark-body")}>{lede}</p>
      ) : null}
    </div>
  )
}

/**
 * A ruled list: one hairline between rows, none above the first or below the
 * last. Used wherever parallel facts would otherwise become a card grid.
 *
 * A row under the pointer takes the neighbouring surface out to the gutter
 * and grows a hairline down its leading edge, and its term moves by that
 * hairline's width. The drawing of the row does not otherwise change: the
 * gesture says which row you are on, and nothing else.
 */
export function RuledList({
  rows,
  className,
  onDark = false,
}: {
  rows: { term: React.ReactNode; detail: React.ReactNode; note?: React.ReactNode }[]
  className?: string
  onDark?: boolean
}) {
  return (
    <dl className={cn("grid", className)}>
      {rows.map((r, i) => (
        <div
          key={i}
          className={cn(
            "row reveal grid grid-cols-1 gap-x-16 gap-y-3 py-8 sm:grid-cols-[minmax(0,16rem)_1fr]",
            i > 0 && (onDark ? "border-t border-hair-dark" : "border-t border-hair")
          )}
        >
          <dt className={cn("t-h3 row-term", onDark && "text-on-dark")}>{r.term}</dt>
          <dd className={cn("t-body measure", onDark && "text-on-dark-body")}>
            {r.detail}
            {r.note ? (
              <span
                className={cn(
                  "mt-2 block text-[0.875rem]",
                  onDark ? "text-on-dark-muted" : "row-note"
                )}
              >
                {r.note}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Alias kept so call sites read as what they are. */
export const Label = Eyebrow

/**
 * Hero facts: a short pair list, one hairline between rows only. Never used
 * for more than three rows, and never as a page's main structure.
 */
export function FactRows({
  rows,
  className,
}: {
  rows: { term: React.ReactNode; value: React.ReactNode }[]
  className?: string
}) {
  return (
    <dl className={cn("grid", className)}>
      {rows.map((r, i) => (
        <div
          key={i}
          className={cn(
            "row flex flex-wrap items-baseline justify-between gap-x-10 gap-y-1 py-3",
            i > 0 && "border-t border-hair"
          )}
        >
          <dt className="t-mono row-term">{r.term}</dt>
          <dd className="text-[0.9375rem] font-medium text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * A roster of names, read one at a time: the one under the pointer holds the
 * ink and the rest step back to the quiet tone. It is what the eye does to a
 * list of clients anyway.
 */
export function Roster({
  names,
  className,
}: {
  names: React.ReactNode[]
  className?: string
}) {
  return (
    <ul className={cn("roster flex flex-wrap items-center gap-x-10 gap-y-2", className)}>
      {names.map((n, i) => (
        <li key={i} className="text-[1rem] font-medium tracking-[-0.02em]">
          {n}
        </li>
      ))}
    </ul>
  )
}
