import { useState } from 'react'

const STORAGE_KEY = 'guitar-101-theme'

/**
 * Reads and toggles the dark-mode class on <html>.
 * The initial state is read from the DOM — which is already correct because
 * index.html runs a blocking script before first paint to apply the stored pref.
 */
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(
    () => document.documentElement.classList.contains('dark'),
  )

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
      return next
    })
  }

  return { isDark, toggle }
}
