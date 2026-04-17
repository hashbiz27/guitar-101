import { useMemo } from 'react'
import { Calendar } from 'lucide-react'
import { useProgressStore } from '@/store'
import EmptyState from '@/components/ui/EmptyState'
import SessionHistoryItem from './SessionHistoryItem'

const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) =>
    new Date(Date.now() - (6 - i) * 86_400_000).toISOString().slice(0, 10),
  )
}

export default function SessionHistoryList() {
  const sessions = useProgressStore((state) => state.progress.sessionHistory)
  const today = new Date().toISOString().slice(0, 10)

  const last7 = useMemo(() => getLast7Days(), [])

  const minutesByDay = useMemo(
    () =>
      last7.map((date) =>
        Math.round(
          sessions
            .filter((s) => s.date === date)
            .reduce((sum, s) => sum + s.duration, 0) / 60,
        ),
      ),
    [last7, sessions],
  )

  const maxMinutes = Math.max(...minutesByDay, 1)

  return (
    <div className="space-y-8">
      {/* Weekly bar chart */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          This week
        </h2>
        <div className="flex h-24 items-end gap-1">
          {last7.map((date, i) => {
            const mins = minutesByDay[i]
            const barHeight = mins > 0 ? Math.max((mins / maxMinutes) * 100, 8) : 0
            const isToday = date === today
            const dayLabel = DAY_ABBR[new Date(date + 'T00:00:00').getDay()]

            return (
              <div key={date} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex w-full flex-col justify-end" style={{ height: '72px' }}>
                  {mins > 0 ? (
                    <div
                      title={`${mins} min`}
                      className={`w-full rounded-t transition-all ${
                        isToday
                          ? 'bg-brand-500'
                          : 'bg-brand-200 dark:bg-brand-900'
                      }`}
                      style={{ height: `${barHeight}%` }}
                    />
                  ) : (
                    <div className="w-full rounded-t bg-slate-100 dark:bg-slate-800" style={{ height: '3px' }} />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isToday
                      ? 'text-brand-500'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {dayLabel}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Session history */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Recent sessions
        </h2>
        {sessions.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No sessions yet"
            description="Complete a practice session and it will appear here."
          />
        ) : (
          <div>
            {sessions.slice(0, 30).map((session) => (
              <SessionHistoryItem key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
