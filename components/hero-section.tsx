"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  darkMode: boolean
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ darkMode, scrollToSection }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 px-4"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`text-6xl md:text-8xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Mateo Fontaine
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          className={`h-0.5 ${darkMode ? "bg-white" : "bg-gray-900"} mx-auto mb-8`}
          style={{ maxWidth: "300px" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={`text-xl md:text-2xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Construyo soluciones digitales a partir de ideas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            onClick={() => scrollToSection("about")}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full"
          >
            Conoce más sobre mí
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
        >
          <ChevronDown
            className={`w-8 h-8 ${darkMode ? "text-white" : "text-gray-900"} hover:scale-110 transition-transform`}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
