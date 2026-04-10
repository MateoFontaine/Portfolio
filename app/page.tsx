"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { SkillsNetwork } from "@/components/skills-network"
import { Work } from "@/components/work"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"

export default function Portfolio() {
  const [parallaxOffset, setParallaxOffset] = useState(0)

  // Parallax effect for background - reduced on mobile
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768
      const speed = isMobile ? 0.1 : 0.3
      setParallaxOffset(window.scrollY * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll animation observer - adds 'is-visible' class to elements with 'animate-on-scroll'
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#0C1120]">
      <CustomCursor />
      <Navigation />

      <main>
        <Hero scrollToSection={scrollToSection} parallaxOffset={parallaxOffset} />
        <About />
        <SkillsNetwork />
        <Work />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
