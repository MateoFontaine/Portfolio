"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactSectionProps {
  darkMode: boolean;
}

export function ContactSection({ darkMode }: ContactSectionProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  // Barra de progreso animada
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProgress(0);
    const form = e.currentTarget;
    const data = new FormData(form);

    // Animar la barra de progreso suavemente
    const duration = 1.6;
    let start: number | null = null;

    await new Promise<void>((resolve) => {
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = (timestamp - start) / 1000;
        const percent = Math.min((elapsed / duration) * 100, 100);
        setProgress(percent);
        if (percent < 100) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });

    try {
      const res = await fetch("https://formspree.io/f/mlekvbaw", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setError("Ocurrió un error. Intenta de nuevo.");
      }
    } catch {
      setError("Ocurrió un error. Intenta de nuevo.");
    }
    setLoading(false);
    setProgress(0);
  };

  return (
    <section
      id="contact"
      className={`py-20 px-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? "text-white" : "text-gray-900"
            }`}
        >
          Contacto
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              ¡Hablemos!
            </h3>
            <p className={`text-lg mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Estoy siempre abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:mateofontaine7@gmail.com"
                className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"} hover:shadow-md transition-all duration-300`}
              >
                <Mail className="w-5 h-5" />
                <span>mateofontaine7@gmail.com</span>
              </a>
              <a
                href="https://github.com/MateoFontaine"
                className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"} hover:shadow-md transition-all duration-300`}
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mateo-fontaine-b6a1b4238/"
                className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"} hover:shadow-md transition-all duration-300`}
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {sent ? (
              <div
                className={`p-4 rounded text-center font-semibold ${darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}`}
              >
                ¡Mensaje enviado con éxito! 🎉
              </div>
            ) : (
              <>
                <div>
                  <Input
                    name="name"
                    placeholder="Tu nombre"
                    className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tu mensaje"
                    rows={5}
                    className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500">
                    {error}
                  </div>
                )}
                <div className="relative w-full overflow-hidden">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center relative"
                    disabled={loading}
                  >
                    {loading && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute left-0 top-0 h-full bg-blue-400/40 z-0"
                        style={{ borderRadius: 8 }}
                      />
                    )}
                    <span className="relative z-10">
                      {loading ? "Enviando..." : "Enviar mensaje"}
                    </span>
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
