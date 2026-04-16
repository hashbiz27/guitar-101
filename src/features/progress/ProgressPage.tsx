import StatsRow from './StatsRow'
import SessionHistoryList from './SessionHistoryList'

export default function ProgressPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Progress
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your practice history and statistics.
        </p>
      </div>

      <StatsRow />
      <SessionHistoryList />
    </div>
  )
}
