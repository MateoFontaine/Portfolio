"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Billboard, Text } from "@react-three/drei"
import { Group } from "three"
import { TOOLS } from "@/data/stack"
import { KEYS } from "@/lib/path"
import { damp, world } from "@/lib/world"
import { Core } from "./core"

const AI_COLOR = "#8fb8ff"
const TOOL_COLOR = "#c7d2e4"
const STACK_CHAPTER = 3

/** The tech stack as words orbiting a small core, spinning with scroll. */
export function Orbit() {
  const narrow = useThree((s) => s.size.width < 768)
  const spin = useRef<Group>(null)
  const root = useRef<Group>(null)
  const key = KEYS[STACK_CHAPTER]
  const radius = narrow ? 2.5 : 4.3
  const center: [number, number, number] = narrow
    ? [key.x, key.y + 1.7, key.z - 12]
    : [key.x + 3.4, key.y, key.z - 12]

  useFrame((_, dt) => {
    const g = spin.current
    if (root.current) root.current.visible = Math.abs(world.chapterPos - STACK_CHAPTER) < 1.15
    if (!g) return
    g.rotation.y += Math.min(dt, 0.05) * 0.22 + world.vel * 0.03
    g.rotation.z = damp(g.rotation.z, world.mouse.sx * 0.12, 3, dt)
  })

  return (
    <group ref={root} position={center}>
      <Core position={[0, 0, 0]} scale={narrow ? 0.38 : 0.52} amp={0.2} freq={1.1} chapter={STACK_CHAPTER} rings={false} />
      <group ref={spin} rotation={[0.35, 0, 0.1]}>
        {TOOLS.map((tool, i) => {
          const a = (i / TOOLS.length) * Math.PI * 2
          return (
            <Billboard key={tool.name} position={[Math.cos(a) * radius, Math.sin(a * 2) * 0.55, Math.sin(a) * radius]}>
              <Text
                font="/fonts/space-grotesk-700.woff"
                fontSize={narrow ? 0.38 : 0.46}
                anchorX="center"
                anchorY="middle"
                letterSpacing={-0.02}
              >
                {tool.name}
                <meshBasicMaterial color={tool.ai ? AI_COLOR : TOOL_COLOR} toneMapped={false} />
              </Text>
            </Billboard>
          )
        })}
      </group>
    </group>
  )
}
