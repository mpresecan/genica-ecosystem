"use client"

import * as React from "react"

/* ---------------------------------------------------------------------------
   The motion island

   Almost all of the motion in this system is CSS: entrances run on the
   scrollport, hovers run on the element. Three things cannot be, and they are
   the only reason this component exists.

     - Where the pointer is inside a control, so the light on a pill can
       follow it.
     - How far through the document you are, for the hairline on the bar.
     - Whether the page has been scrolled at all, which is what makes the
       switcher rail give way to the bar.

   One pointer listener and one scroll listener, both passive, both folded
   into a single animation frame, both writing custom properties rather than
   re-rendering anything. Nothing here is load-bearing: with the script absent
   the pill simply has no light and the bar simply stays as it is.
--------------------------------------------------------------------------- */

export function Motion() {
  React.useEffect(() => {
    const root = document.documentElement
    root.dataset.motion = "on"

    let pointerFrame = 0
    let pending: { el: HTMLElement; x: number; y: number } | null = null

    const onPointerMove = (e: PointerEvent) => {
      const target = e.target as Element | null
      const el = target?.closest?.("[data-sheen]") as HTMLElement | null
      if (!el) return
      pending = { el, x: e.clientX, y: e.clientY }
      if (pointerFrame) return
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0
        if (!pending) return
        const { el, x, y } = pending
        const r = el.getBoundingClientRect()
        el.style.setProperty("--px", `${x - r.left}px`)
        el.style.setProperty("--py", `${y - r.top}px`)
      })
    }

    let scrollFrame = 0
    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        const y = window.scrollY
        const travel = root.scrollHeight - window.innerHeight
        root.style.setProperty(
          "--scroll",
          travel > 1 ? String(Math.min(1, Math.max(0, y / travel))) : "0"
        )
        /* Eight pixels: past the point where a trackpad's own inertia counts
           as having scrolled. */
        const scrolled = y > 8
        if ((root.dataset.scrolled === "true") !== scrolled) {
          root.dataset.scrolled = scrolled ? "true" : "false"
        }
      })
    }

    onScroll()
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
      delete root.dataset.motion
    }
  }, [])

  return null
}
