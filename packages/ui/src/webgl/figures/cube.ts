import * as THREE from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import type { SceneFactory } from "../types"
import { easeInOut, easeOut, clamp01, rng } from "./lib"

/* ---------------------------------------------------------------------------
   The cube                                              genica.org, the hero

   Twenty-seven pieces, tumbling slowly as one body while, layer by layer, it
   is turned the way a puzzle cube is turned. Each piece keeps a faint tone on
   the faces that were its sides at home, so as the turns accumulate the cube
   is visibly out of square: that is the product that emerges, one reasonable
   local change at a time. Under the pointer, every piece goes back to where
   it belongs and the cube squares up: the one that was specified.

   The pieces are objects rather than marks: white lacquer over a softened
   edge, seen in true perspective from a little above, lit by one key light
   and a studio the scene builds for itself, so each face carries a moving
   reflection and every piece shades the one behind it. It is the one figure
   in the system rendered as a material rather than drawn with a hairline,
   and it is spent on the hero because that is the one place the argument is
   made by an object rather than a diagram. A tap squares it on a touch
   screen. Under reduced motion the cube is shown squared, which is the state
   carrying the claim.
--------------------------------------------------------------------------- */

/* The studio the pieces reflect: a sky that goes from the page's white above
   to a shade below, and soft lights, high on the left and low on the right,
   so a face turned toward either takes a slow bloom of light. */
const SKY_VERT = /* glsl */ `
varying vec3 vP;
void main(){
  vP = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const SKY_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uTop, uHorizon, uBottom;
varying vec3 vP;
void main(){
  float y = normalize(vP).y;
  vec3 c = y > 0.0 ? mix(uHorizon, uTop, pow(y, 0.6)) : mix(uHorizon, uBottom, pow(-y, 0.8));
  gl_FragColor = vec4(c, 1.0);
}
`

function buildEnvironment(
  renderer: THREE.WebGLRenderer,
  palette: { paper: THREE.Color; hair: THREE.Color; faint: THREE.Color }
) {
  const room = new THREE.Scene()

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(20, 24, 16),
    new THREE.ShaderMaterial({
      uniforms: {
        uTop: { value: palette.paper.clone() },
        uHorizon: { value: palette.hair.clone() },
        uBottom: { value: palette.hair.clone().lerp(palette.faint, 0.55) },
      },
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
    })
  )
  room.add(sky)

  const lamp = (w: number, h: number, x: number, y: number, z: number, k: number) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide })
    )
    m.position.set(x, y, z)
    m.lookAt(0, 0, 0)
    room.add(m)
  }
  lamp(14, 6, -6, 9, 5, 1.8)
  lamp(5, 9, 9, 0, 4, 1.2)
  lamp(8, 3, 2, 3, -10, 1.0)

  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromScene(room, 0.04).texture
  pmrem.dispose()
  room.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose()
      ;(o.material as THREE.Material).dispose()
    }
  })
  return env
}

type Axis = 0 | 1 | 2
type Piece = {
  home: THREE.Vector3
  cur: THREE.Vector3
  quat: THREE.Quaternion
  mesh: THREE.Mesh
  /* Where the piece was when the squaring-up began, so it can travel from
     there rather than from wherever the last frame left it. */
  fromPos: THREE.Vector3
  fromQuat: THREE.Quaternion
  delay: number
}

const AXES = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)]
const IDENTITY = new THREE.Quaternion()

/* The view: a lens a person might hold, a little above the cube and close
   enough that the near edges are larger than the far ones. The cube turns on
   its own vertical, but sways about the three-quarter view rather than going
   round: three faces stay in sight, it never flattens into a square, and the
   underside never shows. */
const FOV = 26
const DISTANCE = 11.5
const TILT_X = 0.34
const BASE_Y = Math.PI / 4

export const create: SceneFactory = (ctx) => {
  const { renderer, palette } = ctx

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60)
  camera.position.set(0, DISTANCE * 0.28, DISTANCE)
  camera.lookAt(0, -0.15, 0)

  scene.environment = buildEnvironment(renderer, palette)

  /* One key light from high on the left, throwing soft shadows piece to
     piece, which is what makes the gaps read as depth rather than as lines. */
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  const key = new THREE.DirectionalLight(0xffffff, 0.85)
  key.position.set(-5, 9, 6)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.near = 1
  key.shadow.camera.far = 30
  key.shadow.camera.left = -4
  key.shadow.camera.right = 4
  key.shadow.camera.top = 4
  key.shadow.camera.bottom = -4
  key.shadow.bias = -0.0008
  key.shadow.normalBias = 0.02
  key.shadow.radius = 4
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.12)
  fill.position.set(6, -2, 4)
  scene.add(fill)

  const group = new THREE.Group()
  scene.add(group)

  /* Three finishes, one per axis of the piece at home, so a turned piece
     shows on the face it now belongs to. All three are the same lacquer. */
  const lacquer = (color: THREE.Color) =>
    new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.22,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 0.6,
      transparent: true,
      opacity: 0,
    })
  const matY = lacquer(palette.paper.clone().lerp(palette.hair, 0.12))
  const matZ = lacquer(palette.paper.clone().lerp(palette.hair, 0.6))
  const matX = lacquer(palette.hair.clone().lerp(palette.faint, 0.12))
  /* BoxGeometry's groups run +x, -x, +y, -y, +z, -z. */
  const faces = [matX, matX, matY, matY, matZ, matZ]

  /* A softened edge is what catches the light; a sharp one would not. The
     rounded box shares BoxGeometry's face groups, so the finishes still land
     on the right sides. */
  const SIZE = 0.9
  const box = new RoundedBoxGeometry(SIZE, SIZE, SIZE, 4, 0.075)

  const R = rng(11)
  const pieces: Piece[] = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const mesh = new THREE.Mesh(box, faces)
        mesh.castShadow = true
        mesh.receiveShadow = true
        group.add(mesh)
        pieces.push({
          home: new THREE.Vector3(x, y, z),
          cur: new THREE.Vector3(x, y, z),
          quat: new THREE.Quaternion(),
          mesh,
          fromPos: new THREE.Vector3(),
          fromQuat: new THREE.Quaternion(),
          delay: R() * 0.35,
        })
      }
    }
  }

  /* The twist in progress, if any. */
  let move: { axis: Axis; layer: number; dir: number; t0: number; members: Piece[] } | null = null
  let nextMoveAt = 1.1
  let lastAxis: Axis = 1
  /* The squaring-up in progress, if any, and whether the cube is held square. */
  let solve: { t0: number } | null = null
  let held = false
  let tapped = false

  const MOVE_DUR = 0.62
  const SOLVE_DUR = 0.9
  const rot = new THREE.Quaternion()
  const tmpQ = new THREE.Quaternion()

  function startMove(t: number) {
    /* Never the same axis twice running: two turns on one axis read as one. */
    let axis = Math.floor(R() * 3) as Axis
    if (axis === lastAxis) axis = ((axis + 1 + Math.floor(R() * 2)) % 3) as Axis
    lastAxis = axis
    const layer = Math.floor(R() * 3) - 1
    const dir = R() < 0.5 ? -1 : 1
    const members = pieces.filter((p) => Math.round(p.cur.getComponent(axis)) === layer)
    move = { axis, layer, dir, t0: t, members }
  }

  function bakeMove() {
    if (!move) return
    rot.setFromAxisAngle(AXES[move.axis], move.dir * Math.PI * 0.5)
    for (const p of move.members) {
      p.cur.applyQuaternion(rot).round()
      p.quat.premultiply(rot).normalize()
    }
    move = null
  }

  function startSolve(t: number) {
    for (const p of pieces) {
      p.fromPos.copy(p.cur)
      p.fromQuat.copy(p.quat)
    }
    solve = { t0: t }
  }

  function bakeSolve() {
    for (const p of pieces) {
      p.cur.copy(p.home)
      p.quat.identity()
    }
    solve = null
  }

  function fit(w: number, h: number) {
    const aspect = w / Math.max(h, 1)
    camera.aspect = aspect
    /* A narrow box backs the lens off so the cube still fits across it. */
    const back = aspect >= 1 ? 1 : 1 / aspect
    camera.position.set(0, DISTANCE * back * 0.28, DISTANCE * back)
    camera.lookAt(0, -0.15, 0)
    camera.updateProjectionMatrix()
  }
  fit(ctx.width, ctx.height)

  /* Under reduced motion there is one frame, and it is the squared cube. */
  if (ctx.reducedMotion) held = true

  return {
    cursorAt() {
      return "default"
    },
    click() {
      tapped = !tapped
    },
    frame(f) {
      const alpha = easeOut(f.reveal)
      matX.opacity = alpha
      matY.opacity = alpha
      matZ.opacity = alpha

      const t = f.t
      const wantSquare = f.over || tapped || ctx.reducedMotion

      if (!ctx.reducedMotion) {
        /* A twist that has begun finishes; nothing is left half-turned. */
        if (move) {
          const a = clamp01((t - move.t0) / MOVE_DUR)
          const ang = move.dir * Math.PI * 0.5 * easeInOut(a)
          rot.setFromAxisAngle(AXES[move.axis], ang)
          for (const p of move.members) {
            p.mesh.position.copy(p.cur).applyQuaternion(rot)
            tmpQ.copy(rot).multiply(p.quat)
            p.mesh.quaternion.copy(tmpQ)
          }
          if (a >= 1) {
            bakeMove()
            nextMoveAt = t + 0.28 + R() * 0.5
          }
        }

        if (!move) {
          if (solve) {
            let done = true
            for (const p of pieces) {
              const a = easeInOut(clamp01((t - solve.t0 - p.delay) / SOLVE_DUR))
              if (a < 1) done = false
              p.mesh.position.lerpVectors(p.fromPos, p.home, a)
              p.mesh.quaternion.slerpQuaternions(p.fromQuat, IDENTITY, a)
            }
            if (done) {
              bakeSolve()
              held = true
            }
          } else if (wantSquare) {
            if (!held) startSolve(t)
          } else {
            /* Released: a beat of stillness before the first turn. */
            if (held) nextMoveAt = t + 0.9
            held = false
            if (t >= nextMoveAt) startMove(t)
          }
        }
      }

      /* Pieces not being animated sit where their state says they are. */
      for (const p of pieces) {
        if (move && move.members.includes(p)) continue
        if (solve) continue
        p.mesh.position.copy(p.cur)
        p.mesh.quaternion.copy(p.quat)
      }

      /* The whole body turns slowly, and leans a little toward the pointer. */
      const sway = ctx.reducedMotion ? 0 : Math.sin(t * 0.3) * 0.42
      const nod = ctx.reducedMotion ? 0 : Math.sin(t * 0.19 + 1.3) * 0.06
      group.rotation.set(TILT_X + nod + f.py * 0.08, BASE_Y + sway + f.px * 0.2, 0)

      /* It arrives by settling into scale rather than sliding in. */
      const s = 0.94 + 0.06 * easeOut(f.reveal)
      group.scale.setScalar(s)

      renderer.render(scene, camera)
    },
    resize(w, h) {
      fit(w, h)
    },
    dispose() {
      box.dispose()
      matX.dispose()
      matY.dispose()
      matZ.dispose()
      key.shadow.dispose()
      scene.environment?.dispose()
    },
  }
}
