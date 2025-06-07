"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function ThemeToggle({ darkMode, toggleDarkMode }: ThemeToggleProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleDarkMode}
        variant="outline"
        size="icon"
        className={`rounded-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  )
}
