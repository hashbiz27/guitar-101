import { formatDuration } from '@/utils/practiceUtils'
import StarRating from '@/components/ui/StarRating'
import type { PracticeSession } from '@/types'

const TYPE_LABELS: Record<string, string> = {
  chords: 'Chords',
  song: 'Song',
  scales: 'Scales',
  free: 'Free play',
}

const TYPE_COLORS: Record<string, string> = {
  chords:
    'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300',
  song: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300',
  scales:
    'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
  free: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
}

function formatRelativeDate(isoDate: string): string {
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
  if (isoDate === today) return 'Today'
  if (isoDate === yesterday) return 'Yesterday'
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoDate + 'T00:00:00'))
}

interface Props {
  session: PracticeSession
}

export default function SessionHistoryItem({ session }: Props) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 dark:border-slate-800 py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[session.type]}`}
          >
            {TYPE_LABELS[session.type]}
          </span>
          {session.targetLabel && (
            <span className="truncate text-sm text-slate-700 dark:text-slate-300">
              {session.targetLabel}
            </span>
          )}
        </div>
        {session.notes && (
          <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
            {session.notes}
          </p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {formatRelativeDate(session.date)}
        </span>
        <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300">
          {formatDuration(session.duration)}
        </span>
        <StarRating value={session.rating} size="sm" />
      </div>
    </div>
  )
}
