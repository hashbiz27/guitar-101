import { Check } from 'lucide-react'
import { useChordStore } from '@/store'
import { cn } from '@/utils/cn'

interface Props {
  chordId: string
  className?: string
}

export default function LearnedToggle({ chordId, className }: Props) {
  const { isLearned, toggleLearned } = useChordStore()
  const learned = isLearned(chordId)

  return (
    <button
      type="button"
      onClick={() => toggleLearned(chordId)}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        learned
          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200',
        className,
      )}
    >
      <Check size={15} className={cn('transition-opacity', !learned && 'opacity-30')} />
      {learned ? 'Learned!' : 'Mark as learned'}
    </button>
  )
}
