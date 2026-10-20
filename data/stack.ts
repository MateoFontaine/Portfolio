export interface Tool {
  name: string
  ai?: boolean
}

/** Interleaved so the AI tools spread evenly around the 3D orbit. */
export const TOOLS: Tool[] = [
  { name: "Next.js" },
  { name: "Claude Code", ai: true },
  { name: "Tailwind" },
  { name: "Cursor", ai: true },
  { name: "Supabase" },
  { name: "Gemini", ai: true },
  { name: "Node.js" },
]
