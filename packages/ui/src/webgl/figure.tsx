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
   and crisp at any pixel ratio.
--------------------------------------------------------------------------- */

const LOADERS = {
  stops: () => import("./figures/stops") as Promise<SceneModule>,
  gate: () => import("./figures/gate") as Promise<SceneModule>,
  sources: () => import("./figures/sources") as Promise<SceneModule>,
  schedule: () => import("./figures/schedule") as Promise<SceneModule>,
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
}

export type FigureProps = {
  kind: FigureKind
  variant?: string
  labels?: FigureLabel[]
  /** Read by assistive technology in place of the drawing. */
  alt: string
  /** One line under the figure, in mono. */
  caption?: React.ReactNode
  className?: string
}

const ALIGN = {
  left: { transform: "translate(0, 50%)", textAlign: "left" as const },
  center: { transform: "translate(-50%, 50%)", textAlign: "center" as const },
  right: { transform: "translate(-100%, 50%)", textAlign: "right" as const },
}

/** The proportion at which every figure switches to its stacked arrangement. */
const WIDE = 2.2

export function Figure({ kind, variant = "default", labels = [], alt, caption, className }: FigureProps) {
  const boxRef = React.useRef<HTMLDivElement | null>(null)
  const [wide, setWide] = React.useState(true)

  React.useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => setWide(el.clientWidth / Math.max(el.clientHeight, 1) >= WIDE)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <figure className={cn("relative", className)}>
      <div
        ref={boxRef}
        className="relative h-[300px] w-full sm:h-[340px] lg:h-[380px]"
        role="img"
        aria-label={alt}
      >
        <Stage
          load={LOADERS[kind]}
          variant={variant}
          antialias
          /* Scroll-driven: a reader with motion off is shown the end state,
             which is the one that carries the argument. */
          still={STILL}
        />
        {labels
          .filter((l) => !l.only || (l.only === "wide") === wide)
          .map((l, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: `${l.x * 100}%`,
              bottom: `${l.y * 100}%`,
              ...ALIGN[l.align ?? "left"],
            }}
          >
            <span className="t-mono block text-ink">{l.text}</span>
            {l.note ? <span className="t-mono mt-1 block">{l.note}</span> : null}
          </div>
        ))}
      </div>
      {caption ? <figcaption className="t-mono mt-6 max-w-[46rem]">{caption}</figcaption> : null}
    </figure>
  )
}

const STILL = { t: 4.2, scroll: 1 }
