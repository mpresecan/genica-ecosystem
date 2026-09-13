import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, easeOut, clamp01 } from "./lib"

/* ---------------------------------------------------------------------------
   The same underneath                edugenica.com/formats, "Whichever format
                                      you pick, this is underneath it"

   Above the line, the format: a webinar is a short sequence, a course is a
   long one, a masterclass is a funnel, a conference is a grid of tracks, a
   streamed event is one room with an access list. Pick another and the top
   redraws.

   Below the line, nothing moves. That is the whole argument of the section,
   and it is the kind of claim that is worth showing rather than asserting,
   because the reader's fear is that each format means another platform.
--------------------------------------------------------------------------- */

const BASE = 7
const TOP = 34
const N = BASE + TOP

type Cell = { x: number; y: number; s: number; tone: number }
type Line = { a: [number, number]; b: [number, number]; tone: number }
type Shape = { cells: Cell[]; lines: Line[] }

export const create: SceneFactory = (ctx) => {
  const { renderer, palette, reducedMotion } = ctx
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()
  const squares = new Squares(N, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines(72, p3)
  scene.add(squares.mesh, rules.lines)

  let pick = 0
  let target = 0
  let mix = 1
  let announced = -1
  let prev: Shape = { cells: [], lines: [] }
  let next: Shape = { cells: [], lines: [] }

  let L = {
    x0: 0.04,
    x1: 0.96,
    line: 0.34,
    topY0: 0.44,
    topY1: 0.8,
    tabY: 0.9,
    baseY: 0.2,
    s: 0.03,
  }
  let aspect = 3

  function shape(kind: number): Shape {
    const cells: Cell[] = []
    const lines: Line[] = []
    const w = L.x1 - L.x0
    const cx = (u: number) => L.x0 + u * w
    const cy = (v: number) => L.topY0 + v * (L.topY1 - L.topY0)
    const s = L.s
    const dx = (s * 2) / aspect

    const put = (x: number, y: number, tone = 0.5, scale = 1) =>
      cells.push({ x, y, s: s * scale, tone })
    const link = (x1: number, y1: number, x2: number, y2: number, tone = 0) =>
      lines.push({ a: [x1, y1], b: [x2, y2], tone })

    if (kind === 0) {
      /* Webinars. Register, the room, the replay, and the replay is where the
         money keeps arriving, so it is the marked one. */
      const at = [0.14, 0.45, 0.76]
      link(cx(at[0]), cy(0.62), cx(at[2]), cy(0.62))
      at.forEach((u, i) => {
        put(cx(u), cy(0.62), i === 2 ? 1 : 0.5, 2.4)
        for (let k = 0; k < 4; k++) put(cx(u) + (k - 1.5) * dx, cy(0.2), 0.32, 1)
      })
    } else if (kind === 1) {
      /* Courses. Modules in order, and the lesson where people stop. */
      const n = 9
      link(cx(0.08), cy(0.68), cx(0.08 + (n - 1) * 0.098), cy(0.68))
      for (let i = 0; i < n; i++) {
        const x = cx(0.08 + i * 0.098)
        put(x, cy(0.68), i === 6 ? 1 : 0.5, 1.7)
        const remaining = i > 6 ? 2 : i > 3 ? 4 : 5
        for (let k = 0; k < remaining; k++) put(x, cy(0.42 - k * 0.11), i === 6 ? 0.8 : 0.34, 1)
      }
    } else if (kind === 2) {
      /* Masterclasses. Applications in, a few seats out. */
      for (let i = 0; i < 14; i++) put(cx(0.1 + i * 0.052), cy(0.86), 0.3, 1)
      for (let i = 0; i < 7; i++) put(cx(0.26 + i * 0.052), cy(0.52), 0.5, 1.3)
      for (let i = 0; i < 3; i++) put(cx(0.37 + i * 0.058), cy(0.16), 1, 2)
      link(cx(0.08), cy(0.71), cx(0.86), cy(0.71))
      link(cx(0.24), cy(0.35), cx(0.7), cy(0.35))
    } else if (kind === 3) {
      /* Conferences. Tracks against slots, all landing on one day. */
      const tracks = 4
      const slots = 7
      for (let t = 0; t < tracks; t++) {
        const y = cy(0.12 + t * 0.26)
        link(cx(0.08), y, cx(0.08 + (slots - 1) * 0.118), y)
        for (let k = 0; k < slots; k++) {
          put(cx(0.08 + k * 0.118), y, t === 1 && k === 3 ? 1 : 0.45, 1.4)
        }
      }
    } else {
      /* Streamed events. One room, and an access list that has to hold. */
      put(cx(0.16), cy(0.55), 0.5, 6)
      link(cx(0.25), cy(0.55), cx(0.42), cy(0.55))
      for (let r = 0; r < 3; r++) {
        for (let i = 0; i < 10; i++) {
          const marked = r === 1 && i === 4
          put(cx(0.45 + i * 0.045), cy(0.82 - r * 0.3), marked ? 1 : 0.35, marked ? 1.4 : 1)
        }
      }
    }

    while (cells.length < TOP) cells.push({ x: cx(0.5), y: cy(0.5), s: 0, tone: 0 })
    return { cells: cells.slice(0, TOP), lines }
  }

  function build(w: number, h: number) {
    aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2
    L = {
      x0: 0.04,
      x1: 0.96,
      line: wide ? 0.32 : 0.3,
      topY0: wide ? 0.4 : 0.38,
      topY1: wide ? 0.9 : 0.9,
      tabY: wide ? 0.9 : 0.92,
      baseY: wide ? 0.18 : 0.16,
      s: wide ? 0.028 : 0.032,
    }
    prev = shape(pick)
    next = shape(target)
    squares.aspect(aspect)
  }
  build(ctx.width, ctx.height)

  return {
    input(v) {
      const k = v.pick
      if (typeof k !== "number" || k === target) return
      prev = next
      pick = target
      target = k
      next = shape(k)
      mix = reducedMotion ? 1 : 0
    },
    frame(f) {
      squares.reveal(f.reveal)
      rules.reveal(f.reveal)

      mix = Math.min(1, mix + f.dt * 2.6)
      const m = easeOut(mix)
      const enter = clamp01((f.scroll - 0.1) / 0.35)
      const enterLines = enter

      let ri = 0
      /* The line. Everything above it is the format, everything below is not. */
      rules.seg(ri++, L.x0, L.line, L.x1, L.line, 1, 0)

      /* A format's own structure, crossfaded rather than morphed: these are
         different shapes, not the same shape moved. */
      for (const ln of prev.lines) {
        rules.seg(ri++, ln.a[0], ln.a[1], ln.b[0], ln.b[1], (1 - m) * 0.85 * enterLines, ln.tone)
      }
      for (const ln of next.lines) {
        rules.seg(ri++, ln.a[0], ln.a[1], ln.b[0], ln.b[1], m * 0.85 * enterLines, ln.tone)
      }
      rules.hideFrom(ri)
      rules.commit()

      let si = 0
      for (let i = 0; i < TOP; i++) {
        const a = prev.cells[i] ?? next.cells[i]
        const b = next.cells[i]
        squares.set(
          si++,
          a.x + (b.x - a.x) * m,
          a.y + (b.y - a.y) * m,
          (a.s + (b.s - a.s) * m) * enter,
          a.tone + (b.tone - a.tone) * m,
          0.95 * enter
        )
      }

      /* The platform. Identical whichever format is chosen, and it does not
         move when one is. */
      const bw = (L.x1 - L.x0) / BASE
      for (let i = 0; i < BASE; i++) {
        squares.set(si++, L.x0 + (i + 0.5) * bw, L.baseY, L.s * 1.8, 0.5, 0.95 * enter)
      }
      squares.commit()

      if (target !== announced) {
        announced = target
        ctx.emit({ active: target, note: "" })
      }
      renderer.render(scene, camera)
    },
    resize(w, h) {
      build(w, h)
    },
    dispose() {
      squares.dispose()
      rules.dispose()
    },
  }
}
