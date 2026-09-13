import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, leg, easeInOut, rng } from "./lib"

/* ---------------------------------------------------------------------------
   Template, then engagements          flowgenica.com, "Define it once. Run
                                       every client on it."

   The template is the top row. Every client row below is a copy of it, placed
   against its own start date, so the shape is identical and the dates are not.
   A marker crosses the field: that is today.

   Partway through the section, one client returns feedback late. That stage
   stretches, and every stage after it on that row moves, and only on that row.
   The moved dates are the only accent in the figure. This is the difference
   the section is selling: a date that moves because a dependency moved, in
   front of everyone, rather than slack absorbed silently by whoever is last.
--------------------------------------------------------------------------- */

const STAGES = 5
const CLIENTS = 6

export const create: SceneFactory = (ctx) => {
  const { renderer, palette, onDark } = ctx
  void onDark
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()

  const squares = new Squares((CLIENTS + 1) * (STAGES + 1) + 4, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines((CLIENTS + 1) * STAGES + 8, p3)
  scene.add(squares.mesh, rules.lines)

  const R = rng(53)
  /* Each client starts on its own date and runs the same shape at its own
     pace, which is what a working calendar does to a template. */
  const clients = Array.from({ length: CLIENTS }, () => ({
    start: R() * 0.11,
    pace: 0.82 + R() * 0.28,
  }))
  const SLIP_ROW = 2
  const SLIP_STAGE = 2

  let L = { x0: 0.16, x1: 0.965, templateY: 0.88, rowTop: 0.7, rowGap: 0.1, s: 0.028 }
  let rows = CLIENTS

  function build(w: number, h: number) {
    const aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2
    rows = wide ? CLIENTS : 4
    L = {
      x0: wide ? 0.155 : 0.1,
      x1: wide ? 0.965 : 0.94,
      templateY: 0.89,
      rowTop: wide ? 0.68 : 0.66,
      rowGap: (wide ? 0.68 : 0.66) / (rows + 0.6),
      s: wide ? 0.026 : 0.03,
    }
    squares.aspect(aspect)
  }

  build(ctx.width, ctx.height)

  /** The template's stage widths. Every row is this shape, scaled. */
  const SHAPE = [0.17, 0.22, 0.19, 0.24, 0.18]

  return {
    frame(f) {
      squares.reveal(f.reveal)
      rules.reveal(f.reveal)

      const span = L.x1 - L.x0
      const slip = easeInOut(leg(f.scroll, 0.40, 0.70)) * 0.15

      let ri = 0
      let si = 0

      const drawRow = (y: number, start: number, pace: number, extra: number, slipStage: number) => {
        let x = L.x0 + start * span
        squares.set(si++, x, y, L.s, 0.5, 0.95)
        for (let s = 0; s < STAGES; s++) {
          let wStage = SHAPE[s] * pace * span * 0.66
          const moved = slipStage >= 0 && s > slipStage
          if (slipStage >= 0 && s === slipStage) wStage += extra * span
          const x2 = Math.min(x + wStage, L.x1)
          rules.seg(ri++, x, y, x2, y, moved ? 1 : 0.85, moved ? 1 : 0)
          x = x2
          squares.set(si++, x, y, L.s, moved ? 1 : 0.5, 0.95)
          if (x >= L.x1) break
        }
      }

      /* The template, and the rule that separates it from its copies. */
      drawRow(L.templateY, 0, 1, 0, -1)
      rules.seg(ri++, 0.02, L.templateY - L.rowGap * 0.55, 0.98, L.templateY - L.rowGap * 0.55, 0.9, 0)

      /* Its copies. */
      for (let c = 0; c < rows; c++) {
        const y = L.rowTop - c * L.rowGap
        const isSlipping = c === SLIP_ROW
        drawRow(y, clients[c].start, clients[c].pace, isSlipping ? slip : 0, isSlipping ? SLIP_STAGE : -1)
      }

      /* Today, crossing the field. */
      const today = L.x0 + (0.18 + ((f.t * 0.012) % 0.6)) * span
      rules.seg(ri++, today, L.rowTop - rows * L.rowGap - 0.04, today, L.templateY + 0.05, 0.7, 0)

      rules.hideFrom(ri)
      rules.commit()
      for (let i = si; i < (CLIENTS + 1) * (STAGES + 1) + 4; i++) squares.set(i, 0, 0, 0, 0, 0)
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
