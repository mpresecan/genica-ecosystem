import * as THREE from "three"
import type { SceneFactory } from "../types"
import { Squares, Hairlines, ortho, palette3, clamp01, rng } from "./lib"

/* ---------------------------------------------------------------------------
   The gate                                   aigenica.com, "What we install"

   The product, drawn. Work leaves the control plane as a queue, a scoped agent
   writes the change, and the change meets a gate. Most pass. The ones whose
   mandate requires a named human approval stop at the gate and wait, and those
   are the only marks in the accent, because those are the only moments in the
   pipeline where a person is actually required.

   Whatever passes writes a line into the record below, which is the claim the
   section makes: the record is a by-product of the work, not an artefact
   assembled afterwards for an audit.

   This one runs on its own clock rather than on scroll. A pipeline that stops
   when you stop reading would be making the wrong point.
--------------------------------------------------------------------------- */

const N = 40
const LEDGER = 46

export const create: SceneFactory = (ctx) => {
  const { renderer, palette } = ctx
  const p3 = palette3(palette)

  const scene = new THREE.Scene()
  const camera = ortho()

  const squares = new Squares(N + LEDGER + 8, p3, ctx.width / Math.max(ctx.height, 1))
  const rules = new Hairlines(24, p3)
  scene.add(squares.mesh, rules.lines)

  const R = rng(19)
  const flow = Array.from({ length: N }, (_, i) => ({
    u: i / N + R() * 0.006,
    rate: 0.030 + R() * 0.010,
    lane: Math.floor(R() * 5),
    /* A quarter of the changes carry a mandate that needs a named approval. */
    held: R() < 0.26,
    wait: 0.9 + R() * 1.4,
  }))

  let L = {
    x0: 0.06,
    x1: 0.96,
    y: 0.62,
    agent: 0.40,
    gate: 0.66,
    ledgerY: 0.2,
    laneGap: 0.055,
    s: 0.036,
  }

  function build(w: number, h: number) {
    const aspect = w / Math.max(h, 1)
    const wide = aspect > 2.2
    L = {
      x0: 0.05,
      x1: 0.96,
      y: wide ? 0.66 : 0.7,
      agent: 0.40,
      gate: 0.66,
      ledgerY: wide ? 0.22 : 0.24,
      laneGap: wide ? 0.055 : 0.062,
      s: wide ? 0.036 : 0.044,
    }
    squares.aspect(aspect)
  }

  build(ctx.width, ctx.height)

  /** Position along the lane, with a plateau where a held change waits. */
  function advance(u: number, held: boolean, wait: number) {
    const gateU = (L.gate - L.x0) / (L.x1 - L.x0)
    if (!held) return { x: L.x0 + u * (L.x1 - L.x0), waiting: 0 }
    const total = 1 + wait
    const t = u * total
    if (t < gateU) return { x: L.x0 + t * (L.x1 - L.x0), waiting: 0 }
    if (t < gateU + wait) {
      return { x: L.gate - L.s * 0.9, waiting: clamp01((t - gateU) / wait) }
    }
    return { x: L.x0 + (t - wait) * (L.x1 - L.x0), waiting: 0 }
  }

  let written = Math.round(LEDGER * 0.38)
  /* The gate can be switched off, which is the argument the section makes:
     without it the work still ships, and nothing is written down. */
  let enforced = true
  let note = ""
  let heldNow = 0

  return {
    frame(f) {
      squares.reveal(f.reveal)
      rules.reveal(f.reveal)

      let ri = 0
      /* The lane, the two stations, and the record's rule. */
      rules.seg(ri++, L.x0, L.y, L.x1, L.y, 0.7, 0)
      rules.seg(ri++, L.agent, L.y - 0.21, L.agent, L.y + 0.22, 0.85, 0)
      /* The gate is the only heavy rule in the figure, and the only one drawn
         in the line colour. Everything else here is structure. */
      rules.seg(ri++, L.gate, L.y - 0.25, L.gate, L.y + 0.27, enforced ? 1 : 0.16, enforced ? 0.5 : 0)
      rules.seg(ri++, L.x0, L.ledgerY, L.x1, L.ledgerY, 0.5, 0)
      rules.hideFrom(ri)
      rules.commit()

      let si = 0
      let held = 0
      for (let i = 0; i < N; i++) {
        const c = flow[i]
        c.u += c.rate * f.dt * (enforced ? 1 : 1.35)
        if (c.u >= 1) {
          c.u -= 1
          if (enforced) written = Math.min(written + 1, LEDGER)
        }
        const { x, waiting } = advance(c.u, enforced && c.held, c.wait)
        if (waiting > 0) held++

        /* Lanes pinch to almost nothing at the gate: everything passes
           through the same point, which is what makes it a gate. With the gate
           off they run straight past, side by side. */
        const span = L.x1 - L.x0
        const pinch = enforced
          ? 0.18 + 0.82 * Math.min(1, Math.abs(x - L.gate) / (span * 0.2))
          : 1
        const y = L.y + (c.lane - 2) * L.laneGap * pinch

        /* Before the agent the change is only a request, so it stays quiet.
           After it, it is a written change. At the gate, if it is held, it is
           the one thing here a person has to look at. */
        const tone = waiting > 0 ? 1 : x > L.agent ? 0.5 : 0.3
        const enter = clamp01((x - L.x0) / 0.05)
        const exit = 1 - clamp01((x - (L.x1 - 0.06)) / 0.06)

        squares.set(si++, x, y, L.s * (waiting > 0 ? 1.15 : 1), tone, enter * exit * 0.95)
      }

      /* The record. One line per change that passed, and it stays. With the
         gate off it stops growing, and what is already there goes quiet,
         because nothing after this point is attributable to anyone. */
      const dx = (L.x1 - L.x0 - 0.02) / LEDGER
      for (let i = 0; i < LEDGER; i++) {
        const on = i < written
        squares.set(
          si++,
          L.x0 + 0.01 + i * dx + dx * 0.5,
          L.ledgerY + 0.055,
          L.s * 0.62,
          on ? (enforced ? 0.5 : 0.1) : 0,
          on ? (enforced ? 0.9 : 0.35) : 0.18
        )
      }

      const next = enforced
        ? `${written} of ${LEDGER} changes recorded. ${held} waiting on a named approval.`
        : "Gate off. Work still ships, and nothing is being recorded."
      if (next !== note || held !== heldNow) {
        note = next
        heldNow = held
        ctx.emit({ note, enforced })
      }

      for (let i = si; i < N + LEDGER + 8; i++) squares.set(i, 0, 0, 0, 0, 0)
      squares.commit()
      renderer.render(scene, camera)
    },
    resize(w, h) {
      build(w, h)
    },
    cursorAt(fx) {
      return Math.abs(fx - L.gate) < 0.05 ? "pointer" : "default"
    },
    click(fx) {
      if (Math.abs(fx - L.gate) < 0.05) enforced = !enforced
    },
    input(v) {
      if (typeof v.enforced === "boolean") enforced = v.enforced
    },
    dispose() {
      squares.dispose()
      rules.dispose()
    },
  }
}
