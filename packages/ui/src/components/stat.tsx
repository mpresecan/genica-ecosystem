"use client"

import * as React from "react"
import { cn } from "../lib/utils"

/* ---------------------------------------------------------------------------
   A measured number

   The one place a figure is allowed to animate itself. It counts from zero to
   the measured value the first time it is read, once, and then stays there:
   a number that recounted every time it scrolled past would be a decoration
   rather than a reading.

   The value is in the markup before the script runs and stays in the markup
   if the script never runs, so what a crawler, a reader mode and a screen
   reader get is the number itself. Under `prefers-reduced-motion` it is
   simply printed.
--------------------------------------------------------------------------- */

export function Stat({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  duration = 1100,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  duration?: number
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [shown, setShown] = React.useState<number | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let start = 0

    const run = () => {
      const step = (now: number) => {
        if (!start) start = now
        const p = Math.min(1, (now - start) / duration)
        /* Decelerating, so the last digits settle rather than land. */
        const eased = 1 - Math.pow(1 - p, 3)
        setShown(value * eased)
        if (p < 1) raf = requestAnimationFrame(step)
        else setShown(null)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.disconnect()
            run()
          }
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [value, duration])

  const text =
    shown === null ? value.toFixed(decimals) : shown.toFixed(decimals)

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
