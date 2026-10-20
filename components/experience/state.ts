import { Color } from "three"
import { PALETTES } from "@/lib/path"

/** Chapter palette, interpolated every frame by <Rig/> and read by the scene. */
export const pal = [new Color(), new Color(), new Color()]

const parsed = PALETTES.map((set) => set.map((hex) => new Color(hex)))

export function updatePalette(chapterPos: number) {
  const last = parsed.length - 1
  const i = Math.min(Math.floor(chapterPos), last - 1)
  const f = Math.min(Math.max(chapterPos - i, 0), 1)
  const e = f * f * (3 - 2 * f)
  for (let k = 0; k < 3; k++) pal[k].lerpColors(parsed[Math.max(i, 0)][k], parsed[Math.max(i, 0) + 1][k], e)
}
