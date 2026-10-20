import { CatmullRomCurve3, Vector3 } from "three"
import { caseStudies } from "@/data/case-studies"

/**
 * Camera keyframes, one per chapter (hero, about, services, stack, one per
 * project, contact). The scroll position is mapped to a fractional index into
 * this list, so the camera always lands on a keyframe when its section is
 * centered on screen.
 */
const PROJECT_GAP = 20
const lastProjectZ = -84 - (caseStudies.length - 1) * PROJECT_GAP

export const PROJECT_START = 4

export const KEYS: Vector3[] = [
  new Vector3(0, 0, 8),
  new Vector3(-1.4, 0.5, -14),
  new Vector3(1.4, -0.4, -36),
  new Vector3(0, 0.3, -58),
  ...caseStudies.map((_, i) => new Vector3(i % 2 ? 0.8 : -0.8, 0.1, -84 - i * PROJECT_GAP)),
  new Vector3(0, 0, lastProjectZ - 28),
]

export const CHAPTER_N = KEYS.length
export const CONTACT_INDEX = CHAPTER_N - 1

export const curve = new CatmullRomCurve3(KEYS, false, "centripetal")

/** t such that curve.getPoint(t) === KEYS[i] */
export const tOf = (chapterIndex: number) => chapterIndex / (CHAPTER_N - 1)

/** One [primary, secondary, accent] colour set per chapter. */
const PROJECT_PALETTES = [
  ["#3A82FF", "#6D5BFF", "#38D6FF"],
  ["#2F9BFF", "#B44CFF", "#FF7AC8"],
  ["#2DD4BF", "#3A82FF", "#A3E635"],
]

export const PALETTES: string[][] = [
  ["#3A82FF", "#7C3AED", "#22D3EE"],
  ["#0EA5E9", "#3A82FF", "#A78BFA"],
  ["#6366F1", "#EC4899", "#38BDF8"],
  ["#14B8A6", "#3A82FF", "#F472B6"],
  ...caseStudies.map((_, i) => PROJECT_PALETTES[i % PROJECT_PALETTES.length]),
  ["#FB923C", "#F43F5E", "#3A82FF"],
]
