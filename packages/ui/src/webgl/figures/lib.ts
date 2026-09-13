import * as THREE from "three"

/* ---------------------------------------------------------------------------
   Figure primitives

   Every figure in this system is drawn from two things, and deliberately only
   two: a square and a hairline. That is the same vocabulary the components use,
   so a diagram sits beside a ruled list without announcing that it came from a
   different toolbox.

   Figures are authored in a normalised box, x and y from 0 to 1, with y up.
   The HTML label layer uses the same coordinates, so a label can be pinned to
   a part of the drawing and stay pinned at every width.
--------------------------------------------------------------------------- */

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)

/** Progress through one leg of a multi-stage figure. */
export const leg = (t: number, from: number, to: number) => clamp01((t - from) / (to - from))

/** Deterministic noise, so a figure looks the same on every render. */
export function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function ortho() {
  return new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1)
}

const SQUARE_VERT = /* glsl */ `
uniform float uAspect;
attribute vec2 aPos;
attribute float aSize;
attribute float aTone;
attribute float aAlpha;
varying float vTone;
varying float vAlpha;
void main(){
  vTone = aTone;
  vAlpha = aAlpha;
  /* Sizes are given in y units and corrected in x, so a square stays square
     however the figure is proportioned. */
  vec2 p = aPos + vec2(position.x * aSize / uAspect, position.y * aSize);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 0.0, 1.0);
}
`

const SQUARE_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uQuiet, uInk, uAccent;
uniform float uReveal;
varying float vTone;
varying float vAlpha;
void main(){
  /* One tone channel: 0 is the quiet state, 0.5 the active ink, 1 the accent.
     Keeping it to one number is what stops a figure drifting into a palette. */
  vec3 col = vTone < 0.5
    ? mix(uQuiet, uInk, vTone * 2.0)
    : mix(uInk, uAccent, (vTone - 0.5) * 2.0);
  gl_FragColor = vec4(col, vAlpha * uReveal);
  #include <colorspace_fragment>
}
`

export type Palette3 = { quiet: THREE.Color; ink: THREE.Color; accent: THREE.Color }

export class Squares {
  readonly mesh: THREE.Mesh
  readonly pos: Float32Array
  readonly size: Float32Array
  readonly tone: Float32Array
  readonly alpha: Float32Array
  private geo: THREE.InstancedBufferGeometry
  private mat: THREE.ShaderMaterial

  constructor(count: number, p: Palette3, aspect: number) {
    const base = new THREE.PlaneGeometry(1, 1)
    const geo = new THREE.InstancedBufferGeometry()
    geo.index = base.index
    geo.setAttribute("position", base.attributes.position)
    base.dispose()

    this.pos = new Float32Array(count * 2)
    this.size = new Float32Array(count)
    this.tone = new Float32Array(count)
    this.alpha = new Float32Array(count)

    geo.setAttribute("aPos", new THREE.InstancedBufferAttribute(this.pos, 2))
    geo.setAttribute("aSize", new THREE.InstancedBufferAttribute(this.size, 1))
    geo.setAttribute("aTone", new THREE.InstancedBufferAttribute(this.tone, 1))
    geo.setAttribute("aAlpha", new THREE.InstancedBufferAttribute(this.alpha, 1))
    geo.instanceCount = count

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uAspect: { value: aspect },
        uReveal: { value: 0 },
        uQuiet: { value: p.quiet.clone() },
        uInk: { value: p.ink.clone() },
        uAccent: { value: p.accent.clone() },
      },
      vertexShader: SQUARE_VERT,
      fragmentShader: SQUARE_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    this.geo = geo
    this.mat = mat
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.frustumCulled = false
  }

  set(i: number, x: number, y: number, size: number, tone: number, alpha: number) {
    this.pos[i * 2] = x
    this.pos[i * 2 + 1] = y
    this.size[i] = size
    this.tone[i] = tone
    this.alpha[i] = alpha
  }

  commit() {
    for (const k of ["aPos", "aSize", "aTone", "aAlpha"]) {
      ;(this.geo.getAttribute(k) as THREE.InstancedBufferAttribute).needsUpdate = true
    }
  }

  reveal(v: number) {
    this.mat.uniforms.uReveal.value = v
  }

  aspect(a: number) {
    this.mat.uniforms.uAspect.value = a
  }

  dispose() {
    this.geo.dispose()
    this.mat.dispose()
  }
}

const LINE_VERT = /* glsl */ `
attribute float aAlpha;
attribute float aTone;
varying float vAlpha;
varying float vTone;
void main(){
  vAlpha = aAlpha;
  vTone = aTone;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, 0.0, 1.0);
}
`

const LINE_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uQuiet, uInk, uAccent;
uniform float uReveal;
varying float vAlpha;
varying float vTone;
void main(){
  vec3 col = vTone < 0.5
    ? mix(uQuiet, uInk, vTone * 2.0)
    : mix(uInk, uAccent, (vTone - 0.5) * 2.0);
  gl_FragColor = vec4(col, vAlpha * uReveal);
  #include <colorspace_fragment>
}
`

/** Hairlines. One pixel wide by construction, which is the house width. */
export class Hairlines {
  readonly lines: THREE.LineSegments
  readonly pos: Float32Array
  readonly alpha: Float32Array
  readonly tone: Float32Array
  private geo: THREE.BufferGeometry
  private mat: THREE.ShaderMaterial
  private count: number

  constructor(maxSegments: number, p: Palette3) {
    this.count = maxSegments
    this.pos = new Float32Array(maxSegments * 2 * 3)
    this.alpha = new Float32Array(maxSegments * 2)
    this.tone = new Float32Array(maxSegments * 2)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3))
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(this.alpha, 1))
    geo.setAttribute("aTone", new THREE.BufferAttribute(this.tone, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uReveal: { value: 0 },
        uQuiet: { value: p.quiet.clone() },
        uInk: { value: p.ink.clone() },
        uAccent: { value: p.accent.clone() },
      },
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    this.geo = geo
    this.mat = mat
    this.lines = new THREE.LineSegments(geo, mat)
    this.lines.frustumCulled = false
  }

  seg(i: number, x1: number, y1: number, x2: number, y2: number, alpha: number, tone = 0) {
    if (i >= this.count) return
    const o = i * 6
    this.pos[o] = x1
    this.pos[o + 1] = y1
    this.pos[o + 2] = 0
    this.pos[o + 3] = x2
    this.pos[o + 4] = y2
    this.pos[o + 5] = 0
    this.alpha[i * 2] = alpha
    this.alpha[i * 2 + 1] = alpha
    this.tone[i * 2] = tone
    this.tone[i * 2 + 1] = tone
  }

  /** Segments past `used` are collapsed to a point so nothing stale is drawn. */
  hideFrom(used: number) {
    for (let i = used; i < this.count; i++) this.seg(i, 0, 0, 0, 0, 0)
  }

  commit() {
    for (const k of ["position", "aAlpha", "aTone"]) {
      ;(this.geo.getAttribute(k) as THREE.BufferAttribute).needsUpdate = true
    }
  }

  reveal(v: number) {
    this.mat.uniforms.uReveal.value = v
  }

  dispose() {
    this.geo.dispose()
    this.mat.dispose()
  }
}

export function palette3(p: {
  hair: THREE.Color
  faint: THREE.Color
  accent: THREE.Color
}): Palette3 {
  return { quiet: p.hair.clone(), ink: p.faint.clone(), accent: p.accent.clone() }
}
