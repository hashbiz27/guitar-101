import { Flame, Clock, BarChart2, BookOpen } from 'lucide-react'
import { useProgressStore, useChordStore } from '@/store'
import { useStreak } from '@/hooks/useStreak'
import { formatDuration } from '@/utils/practiceUtils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  sub?: string
}

function StatCard({ icon: Icon, label, value, sub }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <div className="mb-2 flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
        <Icon size={14} />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{sub}</div>
      )}
    </div>
  )
}

export default function StatsRow() {
  const { progress } = useProgressStore()
  const { learnedChordIds } = useChordStore()
  const streak = useStreak()

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard
        icon={Flame}
        label="Streak"
        value={streak.current}
        sub={streak.current === 1 ? 'day' : 'days'}
      />
      <StatCard
        icon={Clock}
        label="Total time"
        value={formatDuration(progress.totalPracticeSeconds)}
      />
      <StatCard
        icon={BarChart2}
        label="Sessions"
        value={progress.totalSessionCount}
      />
      <StatCard
        icon={BookOpen}
        label="Chords learned"
        value={learnedChordIds.size}
      />
    </div>
  )
}
