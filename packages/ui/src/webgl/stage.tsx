"use client"

import * as React from "react"
import { cn } from "../lib/utils"
import type { Palette, SceneModule, StageContext, StageScene } from "./types"

/* ---------------------------------------------------------------------------
   Stage

   One canvas host for every field in the system. It owns the things that are
   easy to get wrong once and then wrong everywhere: three is imported only
   when a field is actually about to be seen, the loop stops when the host
   leaves the viewport or the tab goes away, the pixel ratio is capped, context
   loss is survived, and `prefers-reduced-motion` renders a single still frame
   rather than nothing at all.
--------------------------------------------------------------------------- */

function readPalette(el: HTMLElement, THREE: typeof import("three")): Palette {
  const cs = getComputedStyle(el)
  const c = (name: string, fallback: string) => {
    const v = cs.getPropertyValue(name).trim()
    try {
      return new THREE.Color(v || fallback)
    } catch {
      return new THREE.Color(fallback)
    }
  }
  return {
    paper: c("--paper", "#ffffff"),
    paper2: c("--paper-2", "#fafafa"),
    dark: c("--dark", "#0a0a0a"),
    ink: c("--ink", "#0a0a0a"),
    hair: c("--hair", "#e5e5e5"),
    faint: c("--faint", "#71717a"),
    muted: c("--muted", "#5f5f66"),
    onDark: c("--on-dark", "#fafafa"),
    accent: c("--accent", "#2b41a8"),
    accentDark: c("--accent-dark", "#93a6f5"),
    network: {
      genica: new THREE.Color("#2b41a8"),
      aigenica: new THREE.Color("#b0341c"),
      edugenica: new THREE.Color("#0b6852"),
      flowgenica: new THREE.Color("#7a5410"),
    },
  }
}

function deviceTier(): 0 | 1 | 2 {
  if (typeof window === "undefined") return 1
  const cores = navigator.hardwareConcurrency ?? 4
  const narrow = window.matchMedia("(max-width: 768px)").matches
  const coarse = window.matchMedia("(pointer: coarse)").matches
  if (narrow || coarse || cores <= 4) return 0
  return cores >= 10 ? 2 : 1
}

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

export type StageProps = {
  /** Dynamic import of the scene module. Keeps three out of the first load. */
  load: () => Promise<SceneModule>
  variant?: string
  onDark?: boolean
  /** Line-based scenes want MSAA. Shader fields do not, and pay for it. */
  antialias?: boolean
  maxDpr?: number
  className?: string
  /** Painted under the canvas so there is never a blank frame on load. */
  fallbackClassName?: string
  /** Start loading this far outside the viewport. */
  rootMargin?: string
  /**
   * The single frame rendered under `prefers-reduced-motion`. Scroll-driven
   * figures pass 1, so a reader who has turned motion off is shown the
   * finished state, which is the one carrying the argument.
   */
  still?: { t: number; scroll: number }
}

export function Stage({
  load,
  variant = "default",
  onDark = false,
  antialias = false,
  maxDpr = 1.75,
  className,
  fallbackClassName,
  rootMargin = "300px",
  still = { t: 4.2, scroll: 0.5 },
}: StageProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null)
  const [live, setLive] = React.useState(false)

  React.useEffect(() => {
    const host = hostRef.current
    if (!host || !supportsWebGL()) return

    let cancelled = false
    let raf = 0
    let scene: StageScene | null = null
    let renderer: import("three").WebGLRenderer | null = null
    let canvas: HTMLCanvasElement | null = null
    let ro: ResizeObserver | null = null

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    /* Pointer is tracked in client space and resolved against the host box each
       frame, so it stays correct while the page scrolls under a still cursor. */
    let cx = -1e5
    let cy = -1e5
    let px = 0
    let py = 0
    let visible = false
    let started = 0
    let last = 0
    let reveal = 0
    let w = host.clientWidth || 1
    let h = host.clientHeight || 1

    const onPointer = (e: PointerEvent) => {
      cx = e.clientX
      cy = e.clientY
    }
    const onLeave = () => {
      cx = -1e5
      cy = -1e5
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!scene || !renderer) return

      const dt = Math.min((now - last) / 1000, 1 / 20)
      last = now
      const t = (now - started) / 1000

      const rect = host.getBoundingClientRect()
      const vh = window.innerHeight || 1

      /* Pointer, normalised to half-box units and eased. A cursor that has
         never entered the page sits at the centre rather than in a corner. */
      let tx = 0
      let ty = 0
      if (cx > -1e4) {
        tx = (cx - (rect.left + rect.width / 2)) / (rect.width / 2)
        ty = (cy - (rect.top + rect.height / 2)) / (rect.height / 2)
        tx = Math.max(-2, Math.min(2, tx))
        ty = Math.max(-2, Math.min(2, ty))
      }
      const k = 1 - Math.pow(0.0015, dt)
      px += (tx - px) * k
      py += (ty - py) * k

      /* 0 as the element's top crosses the bottom of the viewport, 1 once it
         has risen to a fifth of the way down. A scroll-driven figure therefore
         completes while it is fully in view, rather than at the moment it
         leaves the screen. */
      const scroll = Math.max(0, Math.min(1, (vh - rect.top) / Math.max(vh * 0.8, 1)))
      reveal = Math.min(1, reveal + dt / 0.9)

      /* Scenes render themselves: each owns its own camera, and some render
         more than once per frame. */
      scene.frame({ t, dt, px, py, scroll, reveal, w, h })
    }

    const start = () => {
      if (raf) return
      last = performance.now()
      if (!started) started = last
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        if (!visible) {
          stop()
          return
        }
        if (!scene) {
          void boot()
        } else if (!reduced) {
          start()
        }
      },
      { rootMargin }
    )
    io.observe(host)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (visible && scene && !reduced) start()
    }

    async function boot() {
      const THREE = await import("three")
      const mod = await load()
      if (cancelled || !host) return

      canvas = document.createElement("canvas")
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"
      host.appendChild(canvas)

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias,
        powerPreference: "low-power",
        stencil: false,
        depth: true,
      })
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      renderer.setClearAlpha(0)
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const ctx: StageContext = {
        renderer,
        palette: readPalette(host, THREE),
        width: w,
        height: h,
        dpr,
        tier: deviceTier(),
        variant,
        onDark,
        reducedMotion: reduced,
      }

      scene = mod.create(ctx)
      setLive(true)

      ro = new ResizeObserver(() => {
        if (!host || !renderer || !scene) return
        const nw = host.clientWidth || 1
        const nh = host.clientHeight || 1
        if (nw === w && nh === h) return
        w = nw
        h = nh
        renderer.setSize(w, h, false)
        scene.resize(w, h)
      })
      ro.observe(host)

      canvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault()
        stop()
      })
      canvas.addEventListener("webglcontextrestored", () => {
        if (visible && !reduced) start()
      })

      if (reduced) {
        /* One still frame, composed at a point in the field where it reads as
           a considered image rather than as flat noise. */
        scene.frame({ t: still.t, dt: 0, px: 0, py: 0, scroll: still.scroll, reveal: 1, w, h })
      } else {
        window.addEventListener("pointermove", onPointer, { passive: true })
        window.addEventListener("pointerleave", onLeave, { passive: true })
        document.addEventListener("visibilitychange", onVisibility)
        start()
      }
    }

    return () => {
      cancelled = true
      stop()
      io.disconnect()
      ro?.disconnect()
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      scene?.dispose()
      renderer?.dispose()
      canvas?.remove()
    }
  }, [load, variant, onDark, antialias, maxDpr, rootMargin, still.t, still.scroll])

  return (
    <div
      ref={hostRef}
      aria-hidden
      data-live={live || undefined}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {fallbackClassName ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            live && "opacity-0",
            fallbackClassName
          )}
        />
      ) : null}
    </div>
  )
}
