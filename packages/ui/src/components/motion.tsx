"use client"

import * as React from "react"

/* ---------------------------------------------------------------------------
   The motion island

   Almost all of the motion in this system is CSS: hovers run on the element,
   entrances are a keyframe the stylesheet already owns. Four things cannot
   be, and they are the only reason this component exists.

     - When an element has reached the scrollport, so its entrance can start
       there rather than on page load. It is released and then forgotten:
       nothing watches it once it has arrived.
     - Where the pointer is inside a control, so the light on a pill can
       follow it, and inside the signature, so the light finds the name.
     - How far through the document you are, for the hairline on the bar.
     - Whether the page has been scrolled at all, which is what makes the
       switcher rail give way to the bar.

   Two observers, one pointer listener and one scroll listener, the last two
   passive and folded into a single animation frame, all of them writing
   attributes and custom properties rather than re-rendering anything.

   Nothing here is load-bearing. The hold on the entrances is applied by the
   stylesheet under `[data-motion="on"]`, and `data-motion` is written by the
   inline script below, which is the first thing in the body: if scripting is
   off or the bundle never arrives, the attribute is never set, the hold never
   applies, and every entrance simply plays once on load the way it did before
   any of this existed. There is no state in which an element is held by a
   script that is not running.
--------------------------------------------------------------------------- */

/* Written before anything below it in the body has painted, so an entrance is
   held at its first frame rather than settling and being taken back.

   It lands on the document element ahead of hydration, which React reads as an
   attribute the server did not render, so every layout carries
   `suppressHydrationWarning` on its `<html>`. That is the narrowest available
   answer: it covers that element's own attributes and nothing else, and the
   alternative, rendering `data-motion` on the server, would be the one thing
   this must never be, a hold that survives its script not running. */
const HOLD = 'document.documentElement.dataset.motion="on"'

export function Motion() {
  React.useEffect(() => {
    const root = document.documentElement
    root.dataset.motion = "on"

    /* --- Arrival ---------------------------------------------------------
       An eighth of the viewport is taken off the bottom edge before an
       element counts as arrived: measured against the real bottom edge an
       entrance starts at the real bottom edge, which is where nobody is
       looking. Held back a little it plays where it is read.

       An observer is the cheap way to ask the question, but it cannot be the
       only way it is asked, because it answers only when the answer changes.
       Two cases never produce a change, and both leave an element held
       forever, which in this system means invisible:

         - Something that is skipped over. A jump longer than the viewport,
           an anchor, a restored scroll position, a hard flick, can carry an
           element from below the fold to above it without a single frame in
           between where it overlapped.
         - Something that can never reach the line. The signature is the last
           thing on the page and sits against its bottom edge, so on a short
           page its top never rises above seven-eighths of the viewport, and
           there is nothing left to scroll to make it.

       So `sweep` is the answer of record and the observer is the fast path.
       It runs on the first frame, on any jump longer than the viewport, and
       whenever the document runs out underneath you, and it reads the
       remaining held elements only, a set that empties as the page is read.
       ------------------------------------------------------------------ */
    const held = new Set<HTMLElement>(
      document.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-under, .reveal-soft, .signature-word, .reveal-text"
      )
    )

    /* The signature is the exception, and it has to be. It is the last thing
       on the page and it sits against the page's bottom edge, so its top
       never rises above the line the rest of the page is held to, and there
       is nothing below it left to scroll. It arrives when it appears. */
    const atEdge = (el: Element) => el.matches(".reveal-soft, .signature-word")

    const release = (el: HTMLElement) => {
      el.dataset.in = ""
      held.delete(el)
      main?.unobserve(el)
      edge?.unobserve(el)
    }

    const sweep = () => {
      if (!held.size) return
      const h = window.innerHeight
      /* Sub-pixel layout can leave a page a dozen pixels short of its own
         scrollHeight, so "as far as this goes" is not an equality. */
      const atEnd = window.scrollY + h >= root.scrollHeight - 24
      for (const el of [...held]) {
        const line = atEdge(el) ? h - 8 : h * 0.875
        if (atEnd || el.getBoundingClientRect().top < line) release(el)
      }
    }

    let main: IntersectionObserver | null = null
    let edge: IntersectionObserver | null = null
    if ("IntersectionObserver" in window) {
      const onSeen: IntersectionObserverCallback = (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) release(entry.target as HTMLElement)
        }
      }
      main = new IntersectionObserver(onSeen, { rootMargin: "0px 0px -12.5% 0px" })
      edge = new IntersectionObserver(onSeen, { rootMargin: "0px 0px -8px 0px" })
      held.forEach((el) => (atEdge(el) ? edge! : main!).observe(el))
    }

    let pointerFrame = 0
    let pending: { el: HTMLElement; x: number; y: number } | null = null

    const onPointerMove = (e: PointerEvent) => {
      const target = e.target as Element | null
      const el = target?.closest?.("[data-sheen],[data-signature]") as HTMLElement | null
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
    let lastY = window.scrollY
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
        /* A jump the observer cannot have seen, or the end of the document. */
        if (Math.abs(y - lastY) > window.innerHeight || travel - y < 2) sweep()
        lastY = y
      })
    }

    onScroll()
    sweep()
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
      main?.disconnect()
      edge?.disconnect()
      delete root.dataset.motion
    }
  }, [])

  return <script dangerouslySetInnerHTML={{ __html: HOLD }} />
}
