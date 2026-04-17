import { useState } from 'react'
import { formatDuration } from '@/utils/practiceUtils'
import StarRating from '@/components/ui/StarRating'
import Button from '@/components/ui/Button'
import type { SessionType } from '@/types'

const TYPE_LABELS: Record<SessionType, string> = {
  chords: 'Chords',
  song: 'Song',
  scales: 'Scales',
  free: 'Free play',
}

export interface SessionFormData {
  notes: string
  rating: 1 | 2 | 3 | 4 | 5
  tempoActual?: number
}

interface Props {
  elapsedSeconds: number
  sessionType: SessionType
  targetLabel: string | null
  tempoTarget: number | null
  onSave: (data: SessionFormData) => void
  onDiscard: () => void
}

export default function SessionForm({
  elapsedSeconds,
  sessionType,
  targetLabel,
  tempoTarget,
  onSave,
  onDiscard,
}: Props) {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [notes, setNotes] = useState('')
  const [tempoActual, setTempoActual] = useState(tempoTarget ? String(tempoTarget) : '')

  const handleSave = () => {
    const tempo = Number(tempoActual)
    onSave({
      notes: notes.trim(),
      rating,
      tempoActual: tempo >= 30 ? tempo : undefined,
    })
  }

  return (
    <div className="space-y-6">
      {/* Session summary header */}
      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-sm">
        <div className="font-medium text-slate-700 dark:text-slate-300">
          {TYPE_LABELS[sessionType]}
          {targetLabel ? ` — ${targetLabel}` : ''}
        </div>
        <div className="mt-0.5 font-mono text-slate-500 dark:text-slate-400">
          {formatDuration(elapsedSeconds)}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">How did it go?</p>
        <StarRating value={rating} onChange={(v) => setRating(v as 1 | 2 | 3 | 4 | 5)} />
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label
          htmlFor="session-notes"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Notes{' '}
          <span className="font-normal text-slate-400 dark:text-slate-500">(optional)</span>
        </label>
        <textarea
          id="session-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value.slice(0, 500))}
          placeholder="What went well? What needs work?"
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <p className="text-right text-xs text-slate-400">{notes.length}/500</p>
      </div>

      {/* Actual tempo — only shown when a target was set */}
      {tempoTarget !== null && (
        <div className="space-y-1.5">
          <label
            htmlFor="session-tempo"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Actual tempo{' '}
            <span className="font-normal text-slate-400 dark:text-slate-500">(BPM)</span>
          </label>
          <input
            id="session-tempo"
            type="number"
            min={30}
            max={240}
            value={tempoActual}
            onChange={(e) => setTempoActual(e.target.value)}
            placeholder={String(tempoTarget)}
            className="w-28 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <Button onClick={handleSave}>Save session</Button>
        <Button variant="ghost" onClick={onDiscard}>
          Discard
        </Button>
      </div>
    </div>
  )
}
