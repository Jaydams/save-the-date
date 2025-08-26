"use client"

import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [colorMode, setColorMode] = useState<'teal' | 'purple'>('teal')

  useEffect(() => {
    setMounted(true)
    const savedColorMode = localStorage.getItem('colorMode') as 'teal' | 'purple'
    if (savedColorMode) {
      setColorMode(savedColorMode)
    }
  }, [])

  const toggleColorMode = () => {
    const newMode = colorMode === 'teal' ? 'purple' : 'teal'
    setColorMode(newMode)
    localStorage.setItem('colorMode', newMode)
    
    // Apply color mode to document
    document.documentElement.setAttribute('data-color-mode', newMode)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', colorMode)
  }, [colorMode])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={toggleColorMode}
        className={`relative overflow-hidden ${
          colorMode === 'teal' 
            ? 'text-teal-600 border-teal-300 hover:bg-teal-50' 
            : 'text-purple-600 border-purple-300 hover:bg-purple-50'
        }`}
      >
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <Palette className="h-4 w-4" />
        </motion.div>
      </Button>
    </div>
  )
}
