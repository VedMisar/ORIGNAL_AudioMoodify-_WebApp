"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check initial theme
    const savedTheme = localStorage.getItem("audiomoodify-theme")
    const initialIsDark = savedTheme === "light" ? false : true
    setIsDark(initialIsDark)

    // Apply initial theme
    const root = document.documentElement
    if (initialIsDark) {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    // Update DOM and localStorage
    const root = document.documentElement
    const newTheme = newIsDark ? "dark" : "light"

    localStorage.setItem("audiomoodify-theme", newTheme)

    if (newIsDark) {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative overflow-hidden group hover:bg-primary/10 transition-all duration-300"
        disabled
      >
        <Sun className="h-5 w-5 text-primary" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group hover:bg-primary/10 transition-all duration-300"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun className={`h-5 w-5 transition-all text-primary ${isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon
        className={`absolute h-5 w-5 transition-all text-primary ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </Button>
  )
}
