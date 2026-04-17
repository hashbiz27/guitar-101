import { Square } from 'lucide-react'
import { formatDuration } from '@/utils/practiceUtils'
import Button from '@/components/ui/Button'
import type { SessionType } from '@/types'

const TYPE_LABELS: Record<SessionType, string> = {
  chords: 'Chords',
  song: 'Song',
  scales: 'Scales',
  free: 'Free play',
}

interface Props {
  elapsedSeconds: number
  sessionType: SessionType
  targetLabel: string | null
  onStop: () => void
}

export default function ActiveSession({ elapsedSeconds, sessionType, targetLabel, onStop }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {/* Timer */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-7xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-slate-50 leading-none">
          {formatDuration(elapsedSeconds)}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {TYPE_LABELS[sessionType]}
          {targetLabel ? ` · ${targetLabel}` : ''}
        </span>
      </div>

      {/* Pulsing dot */}
      <div className="relative flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-brand-500" />
      </div>

      <Button variant="secondary" size="lg" onClick={onStop}>
        <Square size={14} className="fill-current" />
        Stop session
      </Button>
    </div>
  )
}
