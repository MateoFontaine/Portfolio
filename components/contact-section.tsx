"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactSectionProps {
  darkMode: boolean
}

export function ContactSection({ darkMode }: ContactSectionProps) {
  return (
    <section id="contact" className={`py-20 px-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Contacto
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>¡Hablemos!</h3>
            <p className={`text-lg mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Estoy siempre abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme.
            </p>
            <div className="space-y-4">
              <motion.a
                href="mailto:mateofontaine7@gmail.com"
                whileHover={{ scale: 1.05 }}
                className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"} hover:shadow-md transition-all duration-300`}
              >
                <Mail className="w-5 h-5" />
                <span>mateofontaine7@gmail.com</span>
              </motion.a>
              <motion.a
                href="https://github.com/MateoFontaine"
                whileHover={{ scale: 1.05 }}
                className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"} hover:shadow-md transition-all duration-300`}
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mateo-fontaine-b6a1b4238/"
                whileHover={{ scale: 1.05 }}
                className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"} hover:shadow-md transition-all duration-300`}
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <Input
                placeholder="Tu nombre"
                className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Tu email"
                className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
              />
            </div>
            <div>
              <Textarea
                placeholder="Tu mensaje"
                rows={5}
                className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Enviar mensaje
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
