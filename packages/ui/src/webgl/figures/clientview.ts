import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, easeOut, clamp01 } from "./lib"

/* ---------------------------------------------------------------------------
   The same engagement, twice     flowgenica.com/product, "A client view worth
                                  sending"

   One engagement, one set of dates, two audiences. Switching the view does not
   move a stage or change a date: it removes the owners, the load and the
   margin, and leaves the one thing the client came to find out, which is what
   is waiting on them.

   The reason to draw this rather than describe it is that the objection to
   sending a client a link is always the same, and it is about what else they
   would be able to see.
--------------------------------------------------------------------------- */

const STAGES = 6
const OWNERS = STAGES * 3
const INTERNAL = 14
const N = STAGES + 1 + OWNERS + INTERNAL + STAGES

export const create: SceneFactory = (ctx) => {
  const { renderer, palette, reducedMotion } = ctx
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()
  const squares = new Squares(N, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines(48, p3)
  scene.add(squares.mesh, rules.lines)

  /** The stage the client is holding up. It is visible in both views. */
  const WAITING = 3

  let team = true
  let mix = 1
  let announced = ""
  let L = {
    x0: 0.06,
    x1: 0.95,
    row: 0.68,
    owners: 0.5,
    internal: 0.26,
    s: 0.03,
  }
  let aspect = 3

  function build(w: number, h: number) {
    aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2
    L = {
      x0: wide ? 0.05 : 0.06,
      x1: wide ? 0.95 : 0.94,
      row: wide ? 0.7 : 0.74,
      owners: wide ? 0.5 : 0.54,
      internal: wide ? 0.26 : 0.28,
      s: wide ? 0.03 : 0.034,
    }
    squares.aspect(aspect)
  }
  build(ctx.width, ctx.height)

  return {
    cursorAt() {
      return "pointer"
    },
    click() {
      team = !team
      mix = reducedMotion ? 1 : 0
      ctx.emit({ team })
    },
    input(v) {
      if (typeof v.team === "boolean" && v.team !== team) {
        team = v.team
        mix = reducedMotion ? 1 : 0
      }
    },
    frame(f) {
      squares.reveal(f.reveal)
      rules.reveal(f.reveal)

      mix = Math.min(1, mix + f.dt * 2.4)
      const shown = easeOut(team ? mix : 1 - mix)
      const t = team ? shown : 1 - easeOut(mix)
      const internalA = team ? easeOut(mix) : 1 - easeOut(mix)
      void t
      const enter = clamp01((f.scroll - 0.08) / 0.32)

      const span = L.x1 - L.x0
      const stageW = span / STAGES

      let ri = 0
      let si = 0

      /* The engagement. The same stages and the same dates in both views. */
      rules.seg(ri++, L.x0, L.row, L.x1, L.row, 0.85, 0)
      for (let i = 0; i <= STAGES; i++) {
        const x = L.x0 + i * stageW
        const here = i === WAITING
        squares.set(si++, x, L.row, L.s * (here ? 1.45 : 1), here ? 1 : 0.5, 0.95 * enter)
      }

      /* Owners and load. Your side of the link only. */
      for (let s = 0; s < STAGES; s++) {
        for (let k = 0; k < 3; k++) {
          const x = L.x0 + (s + 0.5) * stageW + (k - 1) * ((L.s * 1.8) / aspect)
          squares.set(
            si++,
            x,
            L.owners,
            L.s * 0.8,
            0.5,
            0.9 * internalA * enter * (k < 2 || s % 2 === 0 ? 1 : 0)
          )
        }
      }
      if (internalA > 0.02) {
        rules.seg(ri++, L.x0, L.owners + 0.075, L.x1, L.owners + 0.075, 0.4 * internalA, 0)
      }

      /* Margin, internal notes, and the other engagements this team is running.
         None of it survives the switch. */
      for (let i = 0; i < INTERNAL; i++) {
        const row = Math.floor(i / 7)
        const col = i % 7
        squares.set(
          si++,
          L.x0 + col * ((L.s * 2.6) / aspect),
          L.internal - row * (L.s * 2.2),
          L.s * 0.9,
          0.5,
          0.85 * internalA * enter
        )
      }
      if (internalA > 0.02) {
        rules.seg(
          ri++,
          L.x0,
          L.internal + 0.085,
          L.x0 + 0.36,
          L.internal + 0.085,
          0.4 * internalA,
          0
        )
      }

      /* Status, one mark per stage: done, running, not started. The client
         sees this too, because it is the answer to the question they asked. */
      for (let s = 0; s < STAGES; s++) {
        const x = L.x0 + (s + 0.5) * stageW
        const done = s < WAITING
        squares.set(
          si++,
          x,
          L.row + 0.1,
          L.s * (s === WAITING ? 1.1 : 0.8),
          s === WAITING ? 1 : done ? 0.5 : 0.12,
          0.9 * enter
        )
      }

      /* What the client is actually there for: the one stage waiting on them,
         marked in both views and the only thing left in theirs. */
      const wx = L.x0 + WAITING * stageW
      rules.seg(ri++, wx, L.row - 0.12, wx, L.row, 1, 1)
      rules.seg(ri++, wx, L.row - 0.12, wx + stageW * 0.7, L.row - 0.12, 1, 1)

      for (let i = si; i < N; i++) squares.set(i, 0, 0, 0, 0, 0)
      squares.commit()
      rules.hideFrom(ri)
      rules.commit()

      const note = team
        ? "Owners, load, margin and every other engagement: your side of the link."
        : "The same dates, and the one stage waiting on them. Nothing else."
      if (note !== announced) {
        announced = note
        ctx.emit({ note, team })
      }
      void shown

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
