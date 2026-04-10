"use client"

import { useState, useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { caseStudies } from "@/data/case-studies"
import { Button } from "@/components/ui/button"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("")
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / centerY * -8 // Max 8 degrees
    const rotateY = (x - centerX) / centerX * 8 // Max 8 degrees

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setTransform("")
    setMousePos({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      className={`card-3d relative ${className}`}
      style={{
        transform,
        "--mouse-x": `${mousePos.x}%`,
        "--mouse-y": `${mousePos.y}%`,
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-glow" />
      {children}
    </div>
  )
}

export function Work() {
  return (
    <section id="trabajo" className="py-20 md:py-32 px-4 bg-[#0C1120]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-on-scroll">
          Trabajo
        </h2>
        <p className="text-[#A1A1AA] text-lg mb-12 max-w-2xl animate-on-scroll stagger-1">
          Proyectos donde transformé requerimientos en productos funcionales.
        </p>

        <div className="space-y-8">
          {caseStudies.map((project, index) => (
            <article
              key={project.id}
              className="animate-on-scroll"
            >
              <TiltCard className="bg-[#1E293B] border border-[#334155] rounded-lg overflow-hidden hover:border-[#3B82FF]/50 transition-colors duration-200">
                <div className="grid md:grid-cols-[1fr_300px] gap-0">
                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[#3B82FF] text-sm mb-6">
                      {project.tagline}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wide">
                          Problema
                        </h4>
                        <p className="text-[#A1A1AA] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wide">
                          Enfoque
                        </h4>
                        <p className="text-[#A1A1AA] leading-relaxed">
                          {project.approach}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wide">
                          Resultado
                        </h4>
                        <p className="text-[#A1A1AA] leading-relaxed">
                          {project.result}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-[#0C1120] text-[#A1A1AA] rounded-full border border-[#334155]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image & Links */}
                  <div className="bg-[#0C1120] p-6 md:p-8 flex flex-col">
                    <div className="flex-1 flex items-center justify-center mb-6">
                      <div className="w-full h-40 bg-[#1E293B] rounded-lg flex items-center justify-center overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[#64748B] text-sm">
                            Sin imagen
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            className="w-full border-[#334155] text-white hover:bg-[#1E293B] hover:border-[#3B82FF] transition-colors duration-200"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver proyecto
                          </Button>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="ghost"
                            className="w-full text-[#A1A1AA] hover:text-white hover:bg-[#1E293B] transition-colors duration-200"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}