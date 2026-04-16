import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDuration } from '@/utils/practiceUtils'
import StarRating from '@/components/ui/StarRating'
import Button from '@/components/ui/Button'
import type { PracticeSession } from '@/types'

const TYPE_LABELS: Record<string, string> = {
  chords: 'Chords',
  song: 'Song',
  scales: 'Scales',
  free: 'Free play',
}

interface Props {
  session: PracticeSession
  onNewSession: () => void
}

export default function SessionSummary({ session, onNewSession }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
        <Check className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Session saved!</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {TYPE_LABELS[session.type]}
          {session.targetLabel ? ` — ${session.targetLabel}` : ''}
        </p>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-50">
            {formatDuration(session.duration)}
          </div>
          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">duration</div>
        </div>
        <div className="text-center">
          <StarRating value={session.rating} size="sm" />
          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">your rating</div>
        </div>
      </div>

      {session.notes && (
        <p className="max-w-xs text-center text-sm italic text-slate-500 dark:text-slate-400">
          "{session.notes}"
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button onClick={onNewSession}>New session</Button>
        <Link
          to="/progress"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
        >
          View progress
        </Link>
      </div>
    </div>
  )
}
