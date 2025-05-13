"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Update the state initially
      setMatches(media.matches)

      // Define a callback function to handle changes
      const listener = (e) => {
        setMatches(e.matches)
      }

      // Add the listener
      media.addEventListener("change", listener)

      // Clean up
      return () => {
        media.removeEventListener("change", listener)
      }
    }
  }, [query])

  return matches
}

