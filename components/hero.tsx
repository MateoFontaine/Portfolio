"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { useTextScramble } from "@/hooks/use-text-scramble"

interface HeroProps {
  scrollToSection: (sectionId: string) => void
  parallaxOffset?: number
}

const fullText = "Transformo requerimientos en productos que funcionan."
const typingSpeed = 50 // ms per character

export function Hero({ scrollToSection, parallaxOffset = 0 }: HeroProps) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const { displayText: scrambledName } = useTextScramble({
    text: "Mateo Fontaine",
    duration: 2000,
  })

  useEffect(() => {
    let index = 0
    let direction: "forward" | "backward" = "forward"
    let timeoutId: NodeJS.Timeout

    const type = () => {
      if (direction === "forward") {
        if (index < fullText.length) {
          setDisplayText(fullText.slice(0, index + 1))
          index++
          timeoutId = setTimeout(type, typingSpeed)
        } else {
          // Pause at end, then start deleting
          timeoutId = setTimeout(() => {
            direction = "backward"
            type()
          }, 2000) // 2s pause at end
        }
      } else {
        if (index > 0) {
          index--
          setDisplayText(fullText.slice(0, index))
          timeoutId = setTimeout(type, typingSpeed / 2) // Faster delete
        } else {
          // Pause at start, then start typing again
          timeoutId = setTimeout(() => {
            direction = "forward"
            type()
          }, 500) // 0.5s pause at start
        }
      }
    }

    // Start typing after initial delay
    timeoutId = setTimeout(type, 500)

    // Cursor blink toggle
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative w-full bg-[#0C1120] overflow-hidden"
    >
      {/* Grid background with parallax */}
      <div
        className="bg-grid absolute inset-0"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
      />

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-on-scroll">
          {scrambledName}
        </h1>

        <p className="text-xl md:text-2xl text-[#A1A1AA] mb-8 font-medium animate-on-scroll stagger-1">
          Co-fundador de{" "}
          <a
            href="https://devoys.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82FF] hover:text-[#60A5FA] transition-colors duration-200 underline underline-offset-4 decoration-[#3B82FF]/50 hover:decoration-[#60A5FA]"
          >
            Devoys
          </a>
        </p>

        <p className="text-lg md:text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto">
          {displayText}
          <span className="typing-cursor" style={{ opacity: showCursor ? 1 : 0 }} />
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll stagger-3">
          <MagneticButton
            onClick={() => scrollToSection("trabajo")}
            className="bg-[#3B82FF] hover:bg-[#2563EB] text-white px-8 py-6 text-lg rounded-lg transition-colors duration-200"
          >
            Ver proyectos
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollToSection("contacto")}
            className="border-[#334155] text-white hover:bg-[#1E293B] hover:text-white px-8 py-6 text-lg rounded-lg transition-colors duration-200"
          >
            Contactar
          </MagneticButton>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("sobre-mi")}
        className="absolute bottom-8 w-full flex justify-center cursor-pointer text-[#A1A1AA] hover:text-white transition-colors"
        aria-label="Ir a sección sobre mí"
      >
        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </button>
    </section>
  )
}
