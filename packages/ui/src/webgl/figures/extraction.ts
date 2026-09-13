import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, leg, easeInOut, rng } from "./lib"

/* ---------------------------------------------------------------------------
   Source to brief                              genica.org/work, Layron

   Four documents arrive with a deal. Most of what is in them is not the point;
   a few lines in each are. Those lines move into one brief, in order, and the
   rest stays where it was.

   Hovering a document shows which lines in the brief came out of it, because
   the question a reader actually has about a tool like this is not whether it
   is fast, it is whether they can tell where a number came from.
--------------------------------------------------------------------------- */

const DOCS = 4
const LINES_PER_DOC = 45
const FACTS_PER_DOC = 4
const N = DOCS * LINES_PER_DOC
const GHOSTS = DOCS * FACTS_PER_DOC

export const create: SceneFactory = (ctx) => {
  const { renderer, palette } = ctx
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()
  const squares = new Squares(N + GHOSTS, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines(48, p3)
  scene.add(squares.mesh, rules.lines)

  const R = rng(97)

  /* Which lines carry something the brief needs. Fixed, so the drawing is the
     same every time it is looked at. */
  const isFact = new Array<boolean>(N).fill(false)
  for (let d = 0; d < DOCS; d++) {
    const picked = new Set<number>()
    while (picked.size < FACTS_PER_DOC) picked.add(Math.floor(R() * LINES_PER_DOC))
    for (const k of picked) isFact[d * LINES_PER_DOC + k] = true
  }
  const facts = isFact.reduce<number[]>((acc, v, i) => (v ? (acc.push(i), acc) : acc), [])
  const docOf = (i: number) => Math.floor(i / LINES_PER_DOC)

  type Node = { from: [number, number]; to: [number, number]; s: number; w: number; delay: number }
  let nodes: Node[] = []
  let docRect: { x0: number; x1: number; y0: number; y1: number }[] = []
  let pinned = -1
  let announced = -2

  function build(w: number, h: number) {
    const aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2

    nodes = []
    docRect = []
    let ri = 0

    const s = wide ? 0.028 : 0.03
    const dx = (s * 1.6) / aspect

    /* The documents. Two by two on the left when there is width for it. */
    const leftW = wide ? 0.56 : 1
    const cols = 2
    const rows = 2
    const padX = 0.03
    const areaY0 = wide ? 0.1 : 0.5
    const areaY1 = wide ? 0.88 : 0.92
    const bw = (leftW - padX * 2) / cols
    const bh = (areaY1 - areaY0) / rows

    for (let d = 0; d < DOCS; d++) {
      const c = d % cols
      const r = 1 - Math.floor(d / cols)
      const x0 = padX + c * bw
      const y0 = areaY0 + r * bh
      const ix = x0 + bw * 0.06
      const iy = y0 + bh * 0.14
      const iw = bw * 0.82
      const ih = bh * 0.6
      docRect[d] = { x0, x1: x0 + bw * 0.94, y0, y1: y0 + bh }

      const perRow = Math.max(5, Math.floor(iw / dx))
      const lineRows = Math.ceil(LINES_PER_DOC / perRow)
      const dy = ih / Math.max(lineRows, 1)

      for (let i = 0; i < LINES_PER_DOC; i++) {
        const rr = Math.floor(i / perRow)
        const cc = i % perRow
        nodes[d * LINES_PER_DOC + i] = {
          from: [ix + cc * dx, iy + ih - rr * dy],
          to: [0, 0],
          s,
          w: 1,
          delay: R(),
        }
      }
    }

    /* The brief. One column, in order, and only the lines that mattered. */
    const briefX0 = wide ? 0.64 : 0.12
    const briefX1 = wide ? 0.97 : 0.88
    const briefY0 = wide ? 0.12 : 0.1
    const briefY1 = wide ? 0.8 : 0.4
    /* The brief is bounded top and bottom, and divided off from the sources,
       so it reads as a document rather than as a column of leftovers. */
    rules.seg(ri++, briefX0, briefY1 + 0.07, briefX1, briefY1 + 0.07, 0.9, 0)
    rules.seg(ri++, briefX0, briefY0 - 0.07, briefX1, briefY0 - 0.07, 0.9, 0)
    if (wide) rules.seg(ri++, 0.605, 0.06, 0.605, 0.94, 0.5, 0)

    const lineStep = (briefY1 - briefY0) / Math.max(facts.length, 1)
    facts.forEach((idx, k) => {
      /* Lines land as a stack of short rules: a brief is read, not counted. */
      const y = briefY1 - k * lineStep
      nodes[idx].to = [briefX0 + 0.015, y]
      nodes[idx].w = briefX1 - briefX0 - 0.03
    })

    for (let i = 0; i < N; i++) if (!isFact[i]) nodes[i].to = [...nodes[i].from] as [number, number]

    rules.hideFrom(ri)
    rules.commit()
    squares.aspect(aspect)
    baseRules = ri
  }

  let baseRules = 0
  build(ctx.width, ctx.height)

  const hit = (fx: number, fy: number) =>
    docRect.findIndex((r) => fx >= r.x0 && fx <= r.x1 && fy >= r.y0 && fy <= r.y1)

  return {
    cursorAt(fx, fy) {
      return hit(fx, fy) >= 0 ? "pointer" : "default"
    },
    click(fx, fy) {
      const i = hit(fx, fy)
      pinned = i >= 0 && i !== pinned ? i : -1
    },
    frame(f) {
      squares.reveal(f.reveal)
      rules.reveal(f.reveal)

      const hovered = f.over ? hit(f.fx, f.fy) : -1
      const active = pinned >= 0 ? pinned : hovered
      if (active !== announced) {
        announced = active
        ctx.emit({
          active,
          note:
            active >= 0
              ? `${FACTS_PER_DOC} of the ${facts.length} lines in the brief came out of this one.`
              : "",
        })
      }

      let ri = baseRules
      let gi = N
      for (let i = 0; i < N; i++) {
        const n = nodes[i]
        const fact = isFact[i]
        const a = fact ? easeInOut(leg(f.scroll, 0.2 + n.delay * 0.25, 0.62 + n.delay * 0.25)) : 0
        const x = n.from[0] + (n.to[0] - n.from[0]) * a
        const y = n.from[1] + (n.to[1] - n.from[1]) * a

        const mine = active < 0 || docOf(i) === active
        const dim = mine ? 1 : 0.24
        let tone = fact ? 0.5 : 0.18
        if (fact && active >= 0 && docOf(i) === active) tone = 1

        squares.set(i, x, y, n.s, tone, (fact ? 0.95 : 0.5) * dim)



        /* Once a line has arrived it is a line of the brief, so it is drawn as
           one: a rule, not a mark. */
        if (fact && a > 0.55) {
          const grow = leg(a, 0.55, 1)
          rules.seg(ri++, x + n.s * 0.6, y, x + n.s * 0.6 + n.w * grow, y, 0.95 * dim, tone === 1 ? 1 : 0)
        }

        /* What is left behind where a line came from. Without it the sources
           read as untouched, and the brief as unsourced. */
        if (fact) {
          squares.set(gi++, n.from[0], n.from[1], n.s * 0.75, tone === 1 ? 1 : 0, 0.5 * dim * a)
        }
      }
      for (let i = gi; i < N + GHOSTS; i++) squares.set(i, 0, 0, 0, 0, 0)
      squares.commit()
      rules.hideFrom(ri)
      rules.commit()
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
