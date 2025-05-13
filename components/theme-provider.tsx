"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  theme: string;
  setTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "system", setTheme: () => {} })

import { ReactNode } from "react"

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme", ...props }: { children: ReactNode, defaultTheme?: string, storageKey?: string }) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  interface ThemeContextType {
    theme: string;
    setTheme: (newTheme: string) => void;
  }

  const value: ThemeContextType = {
    theme,
    setTheme: (newTheme: string) => {
      setTheme(newTheme)
      localStorage.setItem(storageKey, newTheme)
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}

