"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects-data"

interface ProjectsSectionProps {
  darkMode: boolean
  filter: string
  setFilter: (filter: string) => void
  setSelectedProject: (project: any) => void
}

export function ProjectsSection({ darkMode, filter, setFilter, setSelectedProject }: ProjectsSectionProps) {
  const filteredProjects = filter === "all" ? projectsData : projectsData.filter((p) => p.category === filter)

  return (
    <section id="projects" className={`py-20 px-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-bold text-center mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Proyectos
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 space-x-4">
          {["all", "web"].map((filterType) => (
            <Button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`capitalize transition-all duration-300 ${filter === filterType
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              variant={filter === filterType ? "default" : "outline"}
            >
              {filterType === "all" ? "Todos" : filterType}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`rounded-xl overflow-hidden shadow-lg cursor-pointer ${darkMode ? "bg-gray-900" : "bg-white"}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
