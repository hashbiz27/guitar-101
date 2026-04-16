import { cn } from '@/utils/cn'
import type { TimeSignature } from '@/store/metronomeStore'

const BEAT_COUNTS: Record<TimeSignature, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
  '6/8': 6,
}

interface Props {
  isPlaying: boolean
  currentBeat: number
  timeSignature: TimeSignature
}

export default function BeatIndicator({ isPlaying, currentBeat, timeSignature }: Props) {
  const count = BEAT_COUNTS[timeSignature]

  return (
    <div
      className="flex items-center justify-center gap-3"
      aria-live="polite"
      aria-label={isPlaying ? `Beat ${currentBeat + 1} of ${count}` : 'Stopped'}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = isPlaying && currentBeat === i
        const isAccent = i === 0
        return (
          <div
            key={i}
            className={cn(
              'rounded-full transition-all duration-75',
              isAccent ? 'h-8 w-8' : 'h-5 w-5',
              isActive && isAccent && 'bg-brand-500 shadow-lg shadow-brand-500/40 scale-110',
              isActive && !isAccent && 'bg-slate-500 dark:bg-slate-300 scale-105',
              !isActive && isAccent && 'bg-slate-200 dark:bg-slate-700 ring-2 ring-slate-300 dark:ring-slate-600',
              !isActive && !isAccent && 'bg-slate-200 dark:bg-slate-700',
            )}
          />
        )
      })}
    </div>
  )
}
