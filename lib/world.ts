import type Lenis from "lenis"

/**
 * Mutable shared state between the DOM layer (scroll, mouse) and the WebGL
 * layer. It is read inside requestAnimationFrame loops, so it deliberately
 * lives outside React state.
 */
export const world = {
  lenis: null as Lenis | null,
  lastScroll: 0,
  /** smoothed scroll velocity, in screens per second (signed) */
  vel: 0,
  /** fractional index of the current chapter (0 = hero) */
  chapterPos: 0,
  /** 0 → 1 once the intro has played */
  intro: 0,
  mouse: { x: 0, y: 0, sx: 0, sy: 0 },
  hover: -1,
  anchors: [] as number[],
  reduced: false,
}

export const damp = (a: number, b: number, lambda: number, dt: number) =>
  a + (b - a) * (1 - Math.exp(-lambda * dt))

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

function gate() {
  let open = false
  const cbs = new Set<() => void>()
  return {
    get open() {
      return open
    },
    fire() {
      if (open) return
      open = true
      cbs.forEach((cb) => cb())
      cbs.clear()
    },
    on(cb: () => void) {
      if (open) cb()
      else cbs.add(cb)
    },
  }
}

/** The WebGL scene rendered its first frame with every asset loaded. */
export const sceneReady = gate()
/** The loader finished; the hero can animate in. */
export const introGate = gate()

function chapterEls() {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"))
}

/** Scroll position at which each chapter is centered in the viewport. */
export function measureAnchors() {
  const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
  world.anchors = chapterEls().map((el) => {
    const r = el.getBoundingClientRect()
    const center = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2
    return clamp(center, 0, max)
  })
}

/** Maps a scroll position to a fractional chapter index. */
export function chapterAt(scroll: number) {
  const a = world.anchors
  const n = a.length
  if (n < 2 || scroll <= a[0]) return 0
  if (scroll >= a[n - 1]) return n - 1
  let i = 1
  while (i < n - 1 && scroll > a[i]) i++
  return i - 1 + (scroll - a[i - 1]) / Math.max(a[i] - a[i - 1], 1)
}

export function chapterLabels() {
  return chapterEls().map((el) => el.dataset.label ?? el.id)
}

export function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const r = el.getBoundingClientRect()
  const tall = r.height > window.innerHeight * 1.4
  const top = r.top + window.scrollY
  const target = tall ? top : top + r.height / 2 - window.innerHeight / 2
  if (world.lenis) world.lenis.scrollTo(Math.max(target, 0), { duration: 2 })
  else window.scrollTo({ top: Math.max(target, 0), behavior: "smooth" })
}
