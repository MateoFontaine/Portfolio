"use client"

interface FooterProps {
  darkMode: boolean
}

export function Footer({ darkMode }: FooterProps) {
  return (
    <footer className={`py-8 px-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} border-t`}>
      <div className="max-w-6xl mx-auto text-center">
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          © 2025 Mateo Fontaine. Hecho con tecnología, creatividad y café.
        </p>
      </div>
    </footer>
  )
}
