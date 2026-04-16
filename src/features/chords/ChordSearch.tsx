import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface Props {
  value: string
  onChange: (v: string) => void
  className?: string
}

export default function ChordSearch({ value, onChange, className }: Props) {
  return (
    <div className={cn('relative flex-1', className)}>
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        placeholder="Search chords…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-8 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
