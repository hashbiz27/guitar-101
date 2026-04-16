import { cn } from '@/utils/cn'
import type { TimeSignature } from '@/store/metronomeStore'

const OPTIONS: TimeSignature[] = ['2/4', '3/4', '4/4', '6/8']

interface Props {
  value: TimeSignature
  onChange: (ts: TimeSignature) => void
}

export default function TimeSignaturePicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-1.5" role="group" aria-label="Time signature">
      {OPTIONS.map((ts) => (
        <button
          key={ts}
          type="button"
          onClick={() => onChange(ts)}
          aria-pressed={value === ts}
          className={cn(
            'rounded-lg px-3 py-2 text-sm font-medium font-mono transition-colors',
            value === ts
              ? 'bg-brand-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700',
          )}
        >
          {ts}
        </button>
      ))}
    </div>
  )
}
