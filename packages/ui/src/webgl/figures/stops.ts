import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, leg, easeOut, rng } from "./lib"

/* ---------------------------------------------------------------------------
   The four stops                                    genica.org, "The route"

   A diagram of what the work looks like at each stop, in the only two marks
   this system owns. Panel one is the scope: loose at first, then argued into
   ordered lines, which is the specification. Panel two is the proof: a frame
   with the risky joins drawn in and most of the product still absent. Panel
   three is the MVP, solid. Panel four is the MLP: the same product with what
   usage proved unnecessary taken out, and the few parts that turned out to
   matter marked.

   Each panel assembles as the reader reaches it, so the figure is read in the
   order the section argues, and holds its finished state afterwards.
--------------------------------------------------------------------------- */

type Cell = { x: number; y: number; s: number; tone: number; from: [number, number]; delay: number; keep: number }
type Rule = { a: [number, number]; b: [number, number]; alpha: number; tone: number; owner: number }
type Rect = { x0: number; x1: number; y0: number; y1: number }

export const create: SceneFactory = (ctx) => {
  const { renderer, palette } = ctx
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()

  const MAX = 420
  const squares = new Squares(MAX, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines(64, p3)
  scene.add(squares.mesh, rules.lines)

  let cells: Cell[] = []
  let used = 0
  let panelOf: number[] = []
  let ruleDefs: Rule[] = []
  let panelRect: Rect[] = []

  /* A panel can be held open by clicking it, which is also how the figure
     works on a touch screen, where there is no hovering to do. */
  let pinned = -1
  let hovered = -1
  let announced = -2

  function build(w: number, h: number) {
    const aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2
    const cols = wide ? 4 : 2
    const rows = wide ? 1 : 2

    const R = rng(7)
    cells = []
    panelOf = []
    ruleDefs = []
    panelRect = []

    const padX = 0.035
    const padTop = wide ? 0.24 : 0.17
    const padBottom = wide ? 0.10 : 0.08
    const panelW = (1 - padX * 2) / cols
    const panelH = (1 - padTop - padBottom) / rows

    const rule = (x1: number, y1: number, x2: number, y2: number, alpha: number, owner: number) => {
      ruleDefs.push({ a: [x1, y1], b: [x2, y2], alpha, tone: 0, owner })
    }

    /* Dividers between panels, and nothing around the outside: the same rule
       RuledList follows. */
    for (let c = 1; c < cols; c++) {
      const x = padX + c * panelW
      rule(x, padBottom * 0.5, x, 1 - padTop * 0.62, 0.9, -1)
    }
    if (rows > 1) {
      rule(padX, padBottom + panelH, 1 - padX, padBottom + panelH, 0.9, -1)
    }

    const push = (panel: number, x: number, y: number, s: number, tone: number, delay: number, keep = 1) => {
      if (cells.length >= MAX) return
      cells.push({
        x,
        y,
        s,
        tone,
        keep,
        delay,
        from: [x + (R() - 0.5) * 0.035, y + (R() - 0.5) * 0.07],
      })
      panelOf.push(panel)
    }

    for (let panel = 0; panel < 4; panel++) {
      const c = wide ? panel : panel % 2
      const r = wide ? 0 : 1 - Math.floor(panel / 2)
      const x0 = padX + c * panelW
      const y0 = padBottom + r * panelH
      panelRect[panel] = { x0, x1: x0 + panelW, y0, y1: y0 + panelH }
      const iw = panelW * 0.74
      const ih = panelH * 0.72
      const ix = x0 + (panelW - iw) / 2
      const iy = y0 + panelH * 0.12

      const s = Math.min(ih / 11, (iw * aspect) / 13) * 0.72
      const dx = (s * 1.75) / aspect
      const dy = s * 1.75
      const nx = Math.max(4, Math.floor(iw / dx))
      const ny = Math.max(4, Math.floor(ih / dy))
      const gx = ix + (iw - (nx - 1) * dx) / 2
      const gy = iy + (ih - (ny - 1) * dy) / 2

      const at = (cx: number, cy: number) => [gx + cx * dx, gy + cy * dy] as const
      const stagger = (cx: number, cy: number) => (cx / nx) * 0.55 + (1 - cy / ny) * 0.45

      if (panel === 0) {
        /* Specify: ragged lines, the shape of a written document. */
        for (let cy = 0; cy < ny; cy++) {
          const len = 3 + Math.floor(R() * (nx - 2))
          for (let cx = 0; cx < len; cx++) {
            const [x, y] = at(cx, ny - 1 - cy)
            push(0, x, y, s, 0.5, stagger(cx, ny - 1 - cy))
          }
        }
      } else if (panel === 1) {
        /* Build the proof: the risky parts only. A few structures and the
           joins between them, and none of the product around it. */
        const tiers: [number, number][][] = [
          [[0.5, 0.92]],
          [[0.16, 0.60], [0.5, 0.60], [0.84, 0.60]],
          [[0.06, 0.2], [0.38, 0.2], [0.68, 0.2], [0.96, 0.2]],
        ]
        const pt = (u: number, v: number) => [ix + u * iw, iy + v * ih] as const
        const edges: [[number, number], [number, number]][] = [
          [[0, 0], [1, 0]],
          [[0, 0], [1, 1]],
          [[0, 0], [1, 2]],
          [[1, 0], [2, 0]],
          [[1, 0], [2, 1]],
          [[1, 1], [2, 1]],
          [[1, 2], [2, 2]],
          [[1, 2], [2, 3]],
        ]
        for (const [[t1, i1], [t2, i2]] of edges) {
          const [ax, ay] = pt(tiers[t1][i1][0], tiers[t1][i1][1])
          const [bx, by] = pt(tiers[t2][i2][0], tiers[t2][i2][1])
          rule(ax, ay, bx, by, 0.75, 1)
        }
        tiers.forEach((tier, ti) => {
          tier.forEach(([u, v], ni) => {
            const [x, y] = pt(u, v)
            push(1, x, y, s * (ti === 0 ? 1.7 : 1.35), 0.5, 0.25 + ti * 0.2 + ni * 0.05)
          })
        })
      } else if (panel === 2) {
        /* The MVP: solid, and the widest thing in the figure. */
        for (let cy = 0; cy < ny; cy++) {
          for (let cx = 0; cx < nx; cx++) {
            const [x, y] = at(cx, cy)
            push(2, x, y, s, 0.5, stagger(cx, cy))
          }
        }
      } else {
        /* Scale to MLP: the same product, tighter. Two columns and a row are
           gone, because usage proved they were not load-bearing; the few
           parts that turned out to matter are marked. */
        const s4 = s * 0.84
        const dx4 = (s4 * 1.75) / aspect
        const dy4 = s4 * 1.75
        const gx4 = ix + (iw - (nx - 1) * dx4) / 2
        const gy4 = iy + (ih - (ny - 1) * dy4) / 2
        const cutCols = new Set([Math.floor(nx * 0.3), Math.floor(nx * 0.72)])
        const cutRow = Math.floor(ny * 0.55)
        const mark: [number, number][] = [
          [Math.floor(nx * 0.12), Math.floor(ny * 0.2)],
          [Math.floor(nx * 0.52), Math.floor(ny * 0.78)],
          [Math.floor(nx * 0.86), Math.floor(ny * 0.35)],
        ]
        const isMark = (cx: number, cy: number) => mark.some(([a, b]) => a === cx && b === cy)
        for (let cy = 0; cy < ny; cy++) {
          for (let cx = 0; cx < nx; cx++) {
            const x = gx4 + cx * dx4
            const y = gy4 + cy * dy4
            const cut = cutCols.has(cx) || cy === cutRow
            if (cut) {
              push(3, x, y, s4, 0, stagger(cx, cy), 0)
            } else {
              push(3, x, y, s4 * (isMark(cx, cy) ? 1.3 : 1), isMark(cx, cy) ? 1 : 0.5, stagger(cx, cy))
            }
          }
        }
      }
    }

    used = cells.length
    squares.aspect(aspect)
  }

  build(ctx.width, ctx.height)

  const hit = (fx: number, fy: number) =>
    panelRect.findIndex((r) => fx >= r.x0 && fx <= r.x1 && fy >= r.y0 && fy <= r.y1)

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

      hovered = f.over ? hit(f.fx, f.fy) : -1
      const active = pinned >= 0 ? pinned : hovered
      if (active !== announced) {
        announced = active
        ctx.emit({ active })
      }

      /* Each panel assembles over its own quarter of the section's passage. */
      for (let i = 0; i < used; i++) {
        const c = cells[i]
        const panel = panelOf[i]
        const start = 0.04 + panel * 0.21
        const a = easeOut(leg(f.scroll, start + c.delay * 0.08, start + 0.22 + c.delay * 0.08))

        const x = c.from[0] + (c.x - c.from[0]) * a
        const y = c.from[1] + (c.y - c.from[1]) * a

        /* A cut cell stays on the page as a ghost. The gap is the argument:
           that work existed, and usage did not justify keeping it. */
        let alpha = c.keep === 0 ? a * 0.2 : a * 0.95
        let tone = c.tone
        /* Looking at one stop pushes the other three back rather than lighting
           the chosen one, so the figure never gets brighter than it was. */
        if (active >= 0 && panel !== active) {
          alpha *= 0.28
          tone = Math.min(tone, 0.32)
        }
        squares.set(i, x, y, c.s, tone, alpha)
      }
      for (let i = used; i < MAX; i++) squares.set(i, 0, 0, 0, 0, 0)
      squares.commit()

      for (let i = 0; i < ruleDefs.length; i++) {
        const r = ruleDefs[i]
        const dim = active >= 0 && r.owner >= 0 && r.owner !== active ? 0.28 : 1
        rules.seg(i, r.a[0], r.a[1], r.b[0], r.b[1], r.alpha * dim, r.tone)
      }
      rules.hideFrom(ruleDefs.length)
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
