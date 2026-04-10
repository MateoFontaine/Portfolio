"use client"

import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaPhp, 
  FaFigma, FaGitAlt, FaJs
} from "react-icons/fa"
import { SiAnthropic, SiGithubcopilot, SiOpenai, SiNextdotjs, SiTypescript, SiTailwindcss, SiAstro, SiMongodb, SiSupabase } from "react-icons/si"
import { DiMysql, DiFirebase } from "react-icons/di"

// Categories with colors
const categories = [
  {
    name: "AI Tools",
    color: "#D4A574",
    tools: [
      { label: "Claude", icon: SiAnthropic },
      { label: "Cursor", icon: SiOpenai },
      { label: "ChatGPT", icon: SiOpenai },
      { label: "Copilot", icon: SiGithubcopilot },
      { label: "OpenCode", icon: SiOpenai },
    ],
  },
  {
    name: "Frontend",
    color: "#61DAFB",
    tools: [
      { label: "React", icon: FaReact },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Astro", icon: SiAstro },
      { label: "TypeScript", icon: SiTypescript },
      { label: "JavaScript", icon: FaJs },
      { label: "Tailwind", icon: SiTailwindcss },
    ],
  },
  {
    name: "Backend",
    color: "#339933",
    tools: [
      { label: "Node.js", icon: FaNodeJs },
      { label: "Python", icon: FaPython },
      { label: "Java", icon: FaJava },
      { label: "Kotlin", icon: FaJava },
      { label: "PHP", icon: FaPhp },
    ],
  },
  {
    name: "Databases",
    color: "#FFCA28",
    tools: [
      { label: "Firebase", icon: DiFirebase },
      { label: "MongoDB", icon: SiMongodb },
      { label: "Supabase", icon: SiSupabase },
      { label: "SQL", icon: DiMysql },
    ],
  },
  {
    name: "Design & Tools",
    color: "#F24E1E",
    tools: [
      { label: "Figma", icon: FaFigma },
      { label: "Git", icon: FaGitAlt },
    ],
  },
]

// Single tool card
function ToolCard({ label, icon: Icon, color }: { label: string; icon: any; color: string }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-default"
      style={{
        backgroundColor: `${color}15`,
        border: `1px solid ${color}30`,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          backgroundColor: `${color}25`,
          color: color,
        }}
      >
        <Icon size={20} />
      </div>
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  )
}

// Category section
function CategorySection({ name, color, tools }: { name: string; color: string; tools: any[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
        <h3 
          className="text-lg font-semibold"
          style={{ color }}
        >
          {name}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <ToolCard key={tool.label} {...tool} color={color} />
        ))}
      </div>
    </div>
  )
}

export function SkillsNetwork() {
  return (
    <section id="arsenal" className="bg-[#0C1120] py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mi <span className="text-[#3B82FF]">Arsenal</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg">
            Herramientas que uso para construir
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((category) => (
            <CategorySection
              key={category.name}
              name={category.name}
              color={category.color}
              tools={category.tools}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
