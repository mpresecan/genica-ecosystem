import type * as THREE from "three"

/**
 * Tokens read off the live DOM, so a field inherits whichever accent the
 * `data-line` attribute on <html> has set. Nothing here is hard-coded: change
 * globals.css and every scene follows.
 */
export type Palette = {
  paper: THREE.Color
  paper2: THREE.Color
  dark: THREE.Color
  ink: THREE.Color
  hair: THREE.Color
  faint: THREE.Color
  muted: THREE.Color
  onDark: THREE.Color
  /** The property accent, on paper. */
  accent: THREE.Color
  /** The same line, lifted for the dark band. */
  accentDark: THREE.Color
  /** All four network accents, for the one scene that shows the whole map. */
  network: { genica: THREE.Color; aigenica: THREE.Color; edugenica: THREE.Color; flowgenica: THREE.Color }
}

/** Per-frame state handed to every scene. */
export type Frame = {
  /** Seconds since the scene woke. Frozen at a fixed value under reduced motion. */
  t: number
  /** Seconds since the previous frame, clamped so a backgrounded tab cannot jump. */
  dt: number
  /** Smoothed pointer, in units of half the host box from its centre. */
  px: number
  py: number
  /** 0 as the host's top crosses the viewport bottom, 1 once it has risen a
   *  fifth of the way down it, so a figure finishes while it is still in view. */
  scroll: number
  /** 0 to 1 once, on first intersection. The scene fades itself in with this. */
  reveal: number
  /** Host size in CSS pixels. */
  w: number
  h: number
  /**
   * The pointer in figure coordinates: x and y from 0 to 1 with y up, the same
   * box the drawing and its labels are authored in. `over` is false when the
   * pointer is elsewhere on the page, including on touch, where a figure is
   * driven by taps rather than by hovering.
   */
  fx: number
  fy: number
  over: boolean
}

export type StageContext = {
  renderer: THREE.WebGLRenderer
  palette: Palette
  width: number
  height: number
  dpr: number
  /** Coarse device tier. 0 phone, 1 laptop, 2 desktop. Scenes thin out at 0. */
  tier: 0 | 1 | 2
  /** Scene-specific knob, passed straight through from the React prop. */
  variant: string
  /** True when the host sits on the dark band. */
  onDark: boolean
  reducedMotion: boolean
  /**
   * Hand state back to the page. Whatever a figure reveals on hover has to be
   * readable as text as well as visible in the drawing, so the label layer
   * subscribes to this and renders it.
   */
  emit: (state: Record<string, unknown>) => void
}

export type StageScene = {
  frame(f: Frame): void
  resize(w: number, h: number): void
  dispose(): void
  /** A click at figure coordinates. Present only on figures that take one. */
  click?(fx: number, fy: number): void
  /** The CSS cursor for a position, so the drawing says what is clickable. */
  cursorAt?(fx: number, fy: number): string | null
  /** State owned by the page rather than by the scene, pushed on change. */
  input?(value: Record<string, unknown>): void
}

export type SceneFactory = (ctx: StageContext) => StageScene
export type SceneModule = { create: SceneFactory }
