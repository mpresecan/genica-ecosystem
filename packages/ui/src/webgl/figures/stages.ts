import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, rng, clamp01 } from "./lib"

/* ---------------------------------------------------------------------------
   Where the gate sits                     aigenica.com/how-it-works, "Four stages"

   The page says the human gate belongs on the plan, where changing direction
   is still cheap. That is an assertion until you can move the gate and see
   what a rejection costs at each position.

   Work is weighted by what each stage actually consumes: naming an outcome is
   cheap, executing is not. Move the gate to the right and the same rejection
   rate throws away six times as much.
--------------------------------------------------------------------------- */

const STAGE_COST = [1, 2, 6, 1]
const TOTAL_COST = STAGE_COST.reduce((a, b) => a + b, 0)
const REJECT = 0.22
const N = 46
const DISCARD = 40

export const create: SceneFactory = (ctx) => {
  const { renderer, palette } = ctx
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()
  const squares = new Squares(N + DISCARD, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines(24, p3)
  scene.add(squares.mesh, rules.lines)

  const R = rng(11)
  const flow = Array.from({ length: N }, (_, i) => ({
    u: i / N,
    rate: 0.05 + R() * 0.02,
    lane: R() * 2 - 1,
    rejected: R() < REJECT,
  }))

  /* The gate sits after this stage. The page argues for 1. */
  let gate = 1
  let announced = ""
  let discarded = 0

  let L = { x0: 0.05, x1: 0.96, y: 0.6, pile: 0.18, s: 0.032, lane: 0.05 }

  function build(w: number, h: number) {
    const aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2
    L = {
      x0: 0.04,
      x1: 0.93,
      y: wide ? 0.62 : 0.66,
      pile: wide ? 0.16 : 0.18,
      s: wide ? 0.032 : 0.038,
      lane: wide ? 0.05 : 0.055,
    }
    squares.aspect(aspect)
  }
  build(ctx.width, ctx.height)

  const bound = (i: number) => L.x0 + ((i + 1) / STAGE_COST.length) * (L.x1 - L.x0)
  const stageAt = (fx: number) =>
    Math.max(0, Math.min(3, Math.floor(((fx - L.x0) / (L.x1 - L.x0)) * STAGE_COST.length)))

  return {
    cursorAt(fx, fy) {
      return fy > L.pile + 0.1 && fx > L.x0 && fx < L.x1 ? "pointer" : "default"
    },
    click(fx, fy) {
      if (fy <= L.pile + 0.1) return
      gate = stageAt(fx)
    },
    input(v) {
      if (typeof v.gate === "number") gate = Math.max(0, Math.min(3, v.gate))
    },
    frame(f) {
      squares.reveal(f.reveal)
      rules.reveal(f.reveal)

      const gx = bound(gate)
      const wasted = STAGE_COST.slice(0, gate + 1).reduce((a, b) => a + b, 0) / TOTAL_COST

      let ri = 0
      rules.seg(ri++, L.x0, L.y, L.x1, L.y, 0.6, 0)
      for (let i = 0; i < STAGE_COST.length - 1; i++) {
        const x = bound(i)
        rules.seg(ri++, x, L.y - 0.16, x, L.y + 0.17, 0.5, 0)
      }
      /* The gate, drawn once and heavily, wherever the reader has put it. */
      rules.seg(ri++, gx, L.y - 0.26, gx, L.y + 0.28, 1, 0.6)
      rules.seg(ri++, L.x0, L.pile, L.x1, L.pile, 0.5, 0)
      rules.hideFrom(ri)
      rules.commit()

      let si = 0
      for (let i = 0; i < N; i++) {
        const c = flow[i]
        c.u += c.rate * f.dt
        if (c.u >= 1) c.u -= 1
        const x = L.x0 + c.u * (L.x1 - L.x0)

        /* A rejected change travels to the gate, and stops being work there. */
        const past = x > gx
        const dead = c.rejected && past
        const fall = dead ? clamp01((x - gx) / 0.07) : 0
        const y = L.y + c.lane * L.lane - fall * (L.y - L.pile - 0.06)

        const enter = clamp01((x - L.x0) / 0.04)
        const exit = 1 - clamp01((x - (L.x1 - 0.05)) / 0.05)
        squares.set(
          si++,
          x,
          y,
          L.s,
          dead ? 1 : 0.5,
          enter * exit * (dead ? 0.95 - fall * 0.25 : 0.95)
        )
      }

      /* The pile: one mark per unit of work thrown away. The part of it that
         a gate on the plan would not have cost is the part in the accent, so
         the figure answers "how much worse is this" rather than "how much". */
      const marks = Math.round(DISCARD * wasted)
      const floorMarks = Math.round(
        (DISCARD * STAGE_COST.slice(0, 2).reduce((a, b) => a + b, 0)) / TOTAL_COST
      )
      discarded = marks
      const dx = (L.x1 - L.x0 - 0.02) / DISCARD
      for (let i = 0; i < DISCARD; i++) {
        const on = i < marks
        const excess = on && i >= floorMarks
        squares.set(
          si++,
          L.x0 + 0.01 + i * dx + dx * 0.5,
          L.pile - 0.055,
          L.s * 0.62,
          on ? (excess ? 1 : 0.5) : 0,
          on ? 0.9 : 0.14
        )
      }
      for (let i = si; i < N + DISCARD; i++) squares.set(i, 0, 0, 0, 0, 0)
      squares.commit()

      const note = `A rejection here discards ${Math.round(wasted * 100)}% of the work already done.`
      if (note !== announced) {
        announced = note
        ctx.emit({ active: gate, gate, note })
      }
      void discarded

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
