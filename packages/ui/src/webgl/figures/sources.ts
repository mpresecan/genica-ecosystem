import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, leg, easeInOut, rng } from "./lib"

/* ---------------------------------------------------------------------------
   Four rented tools, one owned list       edugenica.com, "Your audience is
                                           spread across four rented tools"

   Each box holds a piece of the audience. As the reader passes the argument,
   the pieces move into one database and sort into a single list. The marked
   ones are the people who were in more than one box: the buyer who also came
   to the conference, the attendee who bought the masterclass. They are the
   section's actual point, and until the lists are merged nobody can see them.
--------------------------------------------------------------------------- */

const PER_BOX = 26
const BOXES = 4
const N = PER_BOX * BOXES

export const create: SceneFactory = (ctx) => {
  const { renderer, palette } = ctx
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()

  const squares = new Squares(N, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines(48, p3)
  scene.add(squares.mesh, rules.lines)

  const R = rng(31)
  /* People who exist in more than one tool. The duplicate is absorbed on the
     way in, and the survivor is marked. */
  const dupe = new Set<number>()
  const twin = new Set<number>()
  /* Pairs are made deliberately across tools, two per pairing, so every tool
     has someone in it who is also somewhere else. That is the claim. */
  const PAIRS: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3], [0, 1], [2, 3],
  ]
  for (const [ba, bb] of PAIRS) {
    for (let tries = 0; tries < 40; tries++) {
      const a = ba * PER_BOX + Math.floor(R() * PER_BOX)
      const b = bb * PER_BOX + Math.floor(R() * PER_BOX)
      if (!dupe.has(a) && !dupe.has(b) && !twin.has(a) && !twin.has(b)) {
        twin.add(a)
        dupe.add(b)
        break
      }
    }
  }

  type Node = { from: [number, number]; to: [number, number]; s: number; delay: number }
  let nodes: Node[] = []
  let boxRect: { x0: number; x1: number; y0: number; y1: number }[] = []

  /* Which tool each record came from, and the second tool a merged record was
     also in. Highlighting a tool has to light both, or the merge is invisible. */
  const sourceOf = (i: number) => Math.floor(i / PER_BOX)
  const extra = new Map<number, number>()
  {
    const twins = [...twin]
    const dupes = [...dupe]
    for (let k = 0; k < dupes.length && k < twins.length; k++) {
      extra.set(twins[k], sourceOf(dupes[k]))
    }
  }
  const shared = [0, 0, 0, 0]
  for (const [tw, src] of extra) {
    shared[sourceOf(tw)]++
    shared[src]++
  }

  let pinned = -1
  let announced = -2

  function build(w: number, h: number) {
    const aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2
    const cols = wide ? 4 : 2
    const rowsOfBoxes = wide ? 1 : 2

    nodes = []
    boxRect = []
    let ri = 0

    const padX = 0.04
    const topY = wide ? 0.58 : 0.42
    const topH = wide ? 0.28 : 0.48
    const boxW = (1 - padX * 2) / cols
    const boxH = topH / rowsOfBoxes
    const s = wide ? 0.03 : 0.032

    /* The four boxes. Hairline rectangles, no fill, no corner radius. */
    for (let b = 0; b < BOXES; b++) {
      const c = wide ? b : b % 2
      const r = wide ? 0 : 1 - Math.floor(b / 2)
      const x0 = padX + c * boxW + boxW * 0.04
      const x1 = padX + (c + 1) * boxW - boxW * 0.04
      const y0 = topY + r * boxH + boxH * 0.06
      const y1 = topY + (r + 1) * boxH - boxH * 0.22
      boxRect[b] = { x0, x1, y0, y1 }
      rules.seg(ri++, x0, y0, x1, y0, 0.9, 0)
      rules.seg(ri++, x1, y0, x1, y1, 0.9, 0)
      rules.seg(ri++, x1, y1, x0, y1, 0.9, 0)
      rules.seg(ri++, x0, y1, x0, y0, 0.9, 0)

      for (let i = 0; i < PER_BOX; i++) {
        nodes.push({
          from: [x0 + 0.035 + R() * (x1 - x0 - 0.07), y0 + 0.03 + R() * (y1 - y0 - 0.06)],
          to: [0, 0],
          s,
          delay: R(),
        })
      }
    }

    /* The database. One box, and the list inside it is ordered. */
    /* The database is narrower than the row of boxes above it, so the list
       inside reads as a list rather than as a strip. */
    const dbPad = wide ? 0.17 : 0.06
    const dy0 = 0.06
    const dy1 = wide ? 0.42 : 0.30
    rules.seg(ri++, dbPad, dy0, 1 - dbPad, dy0, 0.9, 0)
    rules.seg(ri++, 1 - dbPad, dy0, 1 - dbPad, dy1, 0.9, 0)
    rules.seg(ri++, 1 - dbPad, dy1, dbPad, dy1, 0.9, 0)
    rules.seg(ri++, dbPad, dy1, dbPad, dy0, 0.9, 0)

    const survivors = nodes.length - dupe.size
    const inner = 1 - dbPad * 2 - 0.06
    const dx = (s * 1.9) / aspect
    const nx = Math.max(6, Math.floor(inner / dx))
    const ny = Math.ceil(survivors / nx)
    const dyStep = s * 1.9
    const gx = dbPad + 0.03 + (inner - (nx - 1) * dx) / 2
    const gy = dy0 + ((dy1 - dy0) - (ny - 1) * dyStep) / 2

    /* The short last row is centred, so the list ends on a line rather than
       trailing off to the left. */
    const lastRow = survivors - (ny - 1) * nx
    const lastPad = lastRow > 0 ? ((nx - lastRow) / 2) * dx : 0

    /* One list is not four lists stacked, so the arrivals interleave. Asking
       about a tool then shows its share running through the whole list rather
       than sitting in its own block, which would be the old arrangement with
       a new border round it. */
    const order: number[] = []
    for (let i = 0; i < nodes.length; i++) if (!dupe.has(i)) order.push(i)
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(R() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    order.forEach((idx, slot) => {
      const row = Math.floor(slot / nx)
      const cx = slot % nx
      const cy = ny - 1 - row
      nodes[idx].to = [gx + cx * dx + (row === ny - 1 ? lastPad : 0), gy + cy * dyStep]
    })
    /* Resolve duplicates to whichever twin slot is free, so the pair converges
       on one row rather than two. */
    const twins = [...twin]
    const dupes = [...dupe]
    for (let k = 0; k < dupes.length && k < twins.length; k++) {
      nodes[dupes[k]].to = [...nodes[twins[k]].to] as [number, number]
    }

    rules.hideFrom(ri)
    rules.commit()
    squares.aspect(aspect)
  }

  build(ctx.width, ctx.height)

  const hit = (fx: number, fy: number) =>
    boxRect.findIndex((r) => fx >= r.x0 && fx <= r.x1 && fy >= r.y0 - 0.06 && fy <= r.y1 + 0.06)

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
              ? `${PER_BOX} records, ${shared[active]} of them also in another tool.`
              : "",
        })
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const start = 0.16 + n.delay * 0.26
        const a = easeInOut(leg(f.scroll, start, start + 0.34))
        const x = n.from[0] + (n.to[0] - n.from[0]) * a
        const y = n.from[1] + (n.to[1] - n.from[1]) * a

        let tone = 0.5
        let alpha = 0.9
        if (dupe.has(i)) {
          /* Absorbed on arrival. */
          alpha = 0.9 * (1 - leg(a, 0.72, 1))
          tone = 0.3
        } else if (twin.has(i)) {
          tone = 0.5 + 0.5 * leg(a, 0.7, 1)
        }
        /* Asking about one tool pushes the rest of the list back, so what is
           left standing is that tool's share of the audience. */
        if (active >= 0) {
          const mine = sourceOf(i) === active || extra.get(i) === active
          if (!mine) {
            alpha *= 0.22
            tone = Math.min(tone, 0.3)
          } else if (extra.has(i)) {
            tone = 1
          }
        }
        squares.set(i, x, y, n.s * (twin.has(i) ? 1.3 : 1), tone, alpha)
      }
      squares.commit()
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
