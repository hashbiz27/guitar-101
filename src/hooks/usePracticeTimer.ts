import { useState, useRef, useCallback, useEffect } from 'react'

export function usePracticeTimer() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startAtRef = useRef<number | null>(null)

  const tick = useCallback(() => {
    if (startAtRef.current === null) return
    setElapsedSeconds(Math.floor((performance.now() - startAtRef.current) / 1000))
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const start = useCallback(() => {
    startAtRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    stop()
    startAtRef.current = null
    setElapsedSeconds(0)
  }, [stop])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return { elapsedSeconds, start, stop, reset }
}
