import { cn } from '@/utils/cn'
import type { Chord } from '@/types'

export type DifficultyFilter = 'all' | Chord['difficulty']

interface Props {
  value: DifficultyFilter
  onChange: (v: DifficultyFilter) => void
}

const OPTIONS: { label: string; value: DifficultyFilter }[] = [
  { label: 'All',          value: 'all'          },
  { label: 'Beginner',     value: 'beginner'     },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced',     value: 'advanced'     },
]

export default function ChordFilters({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Filter by difficulty" className="flex flex-wrap gap-1.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            value === opt.value
              ? 'bg-brand-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
