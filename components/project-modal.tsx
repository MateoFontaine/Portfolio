"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectModalProps {
  selectedProject: any
  setSelectedProject: (project: any) => void
  darkMode: boolean
}

export function ProjectModal({ selectedProject, setSelectedProject, darkMode }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`max-w-2xl w-full rounded-xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <Button
                onClick={() => setSelectedProject(null)}
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {selectedProject.title}
              </h3>
              <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {selectedProject.details}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-sm rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <Button
                  asChild
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ${darkMode ? "text-white" : "text-white"
                    }`}
                >
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Demo
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className={`${darkMode ? "text-white border-white hover:bg-gray-700 hover:text-white" : ""}`}
                >
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    Código
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
