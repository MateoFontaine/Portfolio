"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ProjectModal } from "@/components/project-modal"
import { AnimatedBackground } from "@/components/animated-background"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState("all")

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <AnimatedBackground darkMode={darkMode} />

      <HeroSection darkMode={darkMode} scrollToSection={scrollToSection} />
      <AboutSection darkMode={darkMode} />
      <SkillsSection darkMode={darkMode} />
      <ProjectsSection
        darkMode={darkMode}
        filter={filter}
        setFilter={setFilter}
        setSelectedProject={setSelectedProject}
      />
      <ContactSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />

      <ProjectModal selectedProject={selectedProject} setSelectedProject={setSelectedProject} darkMode={darkMode} />
    </div>
  )
}
