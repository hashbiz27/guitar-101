import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import ChordDiagram from './ChordDiagram'
import Badge from '@/components/ui/Badge'
import type { Chord } from '@/types'
import { cn } from '@/utils/cn'

interface Props {
  chord: Chord
  isLearned?: boolean
}

export default function ChordCard({ chord, isLearned }: Props) {
  return (
    <Link
      to={`/chords/${chord.id}`}
      className={cn(
        'group relative flex flex-col items-center gap-2 rounded-xl border bg-white dark:bg-slate-900 p-4',
        'hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700 transition-all',
        isLearned
          ? 'border-emerald-200 dark:border-emerald-800'
          : 'border-slate-200 dark:border-slate-800',
      )}
    >
      {/* Learned checkmark badge */}
      {isLearned && (
        <CheckCircle2
          size={16}
          className="absolute top-2.5 right-2.5 text-emerald-500 dark:text-emerald-400"
        />
      )}

      {/* SVG diagram — fixed display width */}
      <ChordDiagram chord={chord} className="w-28 shrink-0" />

      {/* Name + difficulty */}
      <div className="text-center w-full">
        <div className="font-bold text-slate-900 dark:text-slate-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {chord.name}
        </div>
        <div className="mt-0.5">
          <Badge variant={chord.difficulty}>
            {chord.difficulty.charAt(0).toUpperCase() + chord.difficulty.slice(1)}
          </Badge>
        </div>
      </div>
    </Link>
  )
}
