import { useRef, useCallback } from 'react'
import { useMetronomeStore } from '@/store/metronomeStore'
import Button from '@/components/ui/Button'

const MAX_TAPS = 8
const RESET_AFTER_MS = 2000

export default function TapTempo() {
  const { setBpm } = useMetronomeStore()
  const tapsRef = useRef<number[]>([])
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTap = useCallback(() => {
    const now = performance.now()

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    resetTimerRef.current = setTimeout(() => {
      tapsRef.current = []
    }, RESET_AFTER_MS)

    tapsRef.current.push(now)
    if (tapsRef.current.length > MAX_TAPS) tapsRef.current.shift()
    if (tapsRef.current.length < 2) return

    const intervals: number[] = []
    for (let i = 1; i < tapsRef.current.length; i++) {
      intervals.push(tapsRef.current[i] - tapsRef.current[i - 1])
    }
    const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const newBpm = Math.round(60_000 / avgMs)
    setBpm(Math.max(30, Math.min(240, newBpm)))
  }, [setBpm])

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={handleTap}
      className="select-none active:scale-95 transition-transform"
    >
      Tap Tempo
    </Button>
  )
}
