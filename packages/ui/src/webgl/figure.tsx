"use client"

import * as React from "react"
import { cn } from "../lib/utils"
import { Stage } from "./stage"
import type { SceneModule } from "./types"

/* ---------------------------------------------------------------------------
   Figure

   A figure holds its own space in the page and carries labels, because it is
   making an argument rather than decorating one. The drawing and the labels
   share one coordinate box, x and y from 0 to 1 with y up, so a label stays
   on the part of the drawing it names at every width.

   The labels are real text, not drawn into the canvas: selectable, findable,
   and crisp at any pixel ratio. Anything a figure reveals when it is used
   appears as text too, under the drawing.
--------------------------------------------------------------------------- */

const LOADERS = {
  stops: () => import("./figures/stops") as Promise<SceneModule>,
  gate: () => import("./figures/gate") as Promise<SceneModule>,
  sources: () => import("./figures/sources") as Promise<SceneModule>,
  schedule: () => import("./figures/schedule") as Promise<SceneModule>,
  extraction: () => import("./figures/extraction") as Promise<SceneModule>,
  stages: () => import("./figures/stages") as Promise<SceneModule>,
  formats: () => import("./figures/formats") as Promise<SceneModule>,
  clientview: () => import("./figures/clientview") as Promise<SceneModule>,
  cube: () => import("./figures/cube") as Promise<SceneModule>,
} as const

export type FigureKind = keyof typeof LOADERS

export type FigureLabel = {
  /** 0 to 1 across the figure. */
  x: number
  /** 0 to 1 up the figure. */
  y: number
  text: React.ReactNode
  /** A second line, in the quieter tone. */
  note?: React.ReactNode
  align?: "left" | "center" | "right"
  /**
   * Every figure lays itself out differently once its box stops being wide,
   * so a label belongs to one arrangement or the other. The switch is made on
   * the figure's measured proportions, the same test the drawing uses, rather
   * than on a viewport breakpoint that would disagree with it at some widths.
   */
  only?: "wide" | "narrow"
  /** Ties the label to a part of the drawing, so it recedes with it. */
  index?: number
  /** Shown only in one state of the figure, for parts that come and go. */
  when?: { key: string; is: unknown }
}

export type FigureState = {
  /** What the drawing currently has singled out, or -1 for nothing. */
  active?: number
  /** A line the drawing composes from its own data. */
  note?: string
  [k: string]: unknown
}

export type FigureProps = {
  kind: FigureKind
  variant?: string
  labels?: FigureLabel[]
  /** Read by assistive technology in place of the drawing. */
  alt: string
  /** One line under the figure, in mono. */
  caption?: React.ReactNode
  /** Page copy shown when the drawing singles something out, indexed by it. */
  details?: string[]
  /**
   * A piece of the figure's state that is also a real control, so it can be
   * reached with a keyboard and read by a screen reader rather than only
   * clicked on a canvas.
   */
  toggle?: { key: string; on: string; off: string; initial?: boolean }
  /**
   * The same idea for a figure that is set rather than switched. Rendered as
   * real buttons, so picking one is a keyboard action and the options are
   * legible at any width, which they would not be as tabs inside the drawing.
   */
  choices?: { key: string; label?: string; options: string[]; initial?: number }
  className?: string
  /** The drawing's box, when a surface needs a different height from the default. */
  boxClassName?: string
  /**
   * The drawing alone: no caption row and no reserved readout line. For a
   * figure that sits beside copy rather than under a heading, where the text
   * around it is already the reading.
   */
  bare?: boolean
}

const ALIGN = {
  left: { transform: "translate(0, 50%)", textAlign: "left" as const },
  center: { transform: "translate(-50%, 50%)", textAlign: "center" as const },
  right: { transform: "translate(-100%, 50%)", textAlign: "right" as const },
}

/** The proportion at which every figure switches to its stacked arrangement. */
const WIDE = 2.2

/* Scroll-driven figures are shown finished under prefers-reduced-motion: that
   is the frame carrying the argument. */
const STILL = { t: 4.2, scroll: 1 }

export function Figure({
  kind,
  variant = "default",
  labels = [],
  alt,
  caption,
  details,
  toggle,
  choices,
  className,
  boxClassName,
  bare = false,
}: FigureProps) {
  const boxRef = React.useRef<HTMLDivElement | null>(null)
  const [wide, setWide] = React.useState(true)
  const [state, setState] = React.useState<FigureState>({})
  const [on, setOn] = React.useState(toggle?.initial ?? true)
  const [pick, setPick] = React.useState(choices?.initial ?? 0)

  React.useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => setWide(el.clientWidth / Math.max(el.clientHeight, 1) >= WIDE)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const onState = React.useCallback((next: Record<string, unknown>) => {
    setState((prev) => ({ ...prev, ...next }))
  }, [])

  /* The drawing can flip the toggle too, by being clicked. Mirror it back so
     the control and the picture never disagree. */
  const key = toggle?.key
  React.useEffect(() => {
    if (!key) return
    const v = state[key]
    if (typeof v === "boolean" && v !== on) setOn(v)
  }, [key, state, on])

  const ckey = choices?.key
  React.useEffect(() => {
    if (!ckey) return
    const v = state[ckey]
    if (typeof v === "number" && v !== pick) setPick(v)
  }, [ckey, state, pick])

  const input = React.useMemo(() => {
    const v: Record<string, unknown> = {}
    if (key) v[key] = on
    if (ckey) v[ckey] = pick
    return Object.keys(v).length ? v : undefined
  }, [key, on, ckey, pick])

  const active = typeof state.active === "number" ? state.active : -1
  const readout = details && active >= 0 ? details[active] : state.note

  return (
    <figure className={cn("reveal relative", className)}>
      <div
        ref={boxRef}
        className={cn(
          "figure-box relative w-full",
          boxClassName ?? "h-[300px] sm:h-[340px] lg:h-[380px]"
        )}
        role="img"
        aria-label={alt}
      >
        <Stage
          load={LOADERS[kind]}
          variant={variant}
          antialias
          interactive
          onState={onState}
          input={input}
          still={STILL}
        />
        {labels
          .filter((l) => !l.only || (l.only === "wide") === wide)
          .filter((l) => !l.when || state[l.when.key] === l.when.is)
          .map((l, i) => (
            <div
              key={i}
              aria-hidden
              className="pointer-events-none absolute transition-opacity duration-200"
              style={{
                left: `${l.x * 100}%`,
                bottom: `${l.y * 100}%`,
                opacity:
                  active >= 0 && typeof l.index === "number" && l.index !== active ? 0.35 : 1,
                ...ALIGN[l.align ?? "left"],
              }}
            >
              <span className="t-mono block text-ink">{l.text}</span>
              {l.note ? <span className="t-mono mt-1 block">{l.note}</span> : null}
            </div>
          ))}
      </div>

      {bare ? null : (
        <>
      {choices ? (
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
          {choices.label ? (
            <span className="t-mono mr-2">{choices.label}</span>
          ) : null}
          {choices.options.map((o, i) => (
            <button
              key={o}
              type="button"
              onClick={() => setPick(i)}
              aria-pressed={i === pick}
              data-sheen
              data-variant="outline"
              className={cn(
                "t-mono rounded-full border px-3.5 py-1.5",
                "transition-[background-color,color,border-color,translate,scale] duration-150 ease-out",
                "hover:-translate-y-px active:translate-y-0 active:scale-[0.985]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                i === pick
                  ? "border-ink text-ink"
                  : "border-hair text-muted hover:border-faint hover:text-ink"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-3">
        {toggle ? (
          <button
            type="button"
            onClick={() => setOn((v) => !v)}
            aria-pressed={on}
            data-sheen
            data-variant="outline"
            className={cn(
              "t-mono inline-flex items-center rounded-full border border-hair px-4 py-1.5 text-ink",
              "transition-[background-color,color,border-color,translate,scale] duration-150 ease-out",
              "hover:-translate-y-px hover:border-ink active:translate-y-0 active:scale-[0.985]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            )}
          >
            {on ? toggle.on : toggle.off}
          </button>
        ) : null}
        {caption ? <figcaption className="t-mono max-w-[46rem]">{caption}</figcaption> : null}
      </div>

      {/* Held open so nothing below moves as the reading changes, and keyed
          on the reading so a new one fades up rather than replacing the old
          one between two frames. */}
      <p
        aria-hidden
        className="figure-readout t-mono mt-3 min-h-[1.5rem] max-w-[46rem] text-ink"
      >
        <span key={String(readout ?? "")}>{readout}</span>
      </p>
        </>
      )}
    </figure>
  )
}
