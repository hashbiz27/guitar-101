import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import type { SongSection } from '@/types'
import type { Chord } from '@/types'

interface ActiveEntry {
  sectionIndex: number
  progressionIndex: number
}

interface Props {
  sections: SongSection[]
  chordMap: Map<string, Chord>
  activeEntry?: ActiveEntry | null
}

export default function ChordProgression({ sections, chordMap, activeEntry }: Props) {
  return (
    <div className="space-y-5">
      {sections.map((section, sIdx) => (
        <div key={sIdx}>
          {/* Section header */}
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {section.label}
            </span>
            {section.repeatCount && section.repeatCount > 1 && (
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-xs text-slate-400 dark:text-slate-500">
                ×{section.repeatCount}
              </span>
            )}
          </div>

          {/* Chord boxes */}
          <div className="flex flex-wrap gap-2">
            {section.progression.map((chordBeat, pIdx) => {
              const chord = chordMap.get(chordBeat.chordId)
              const chordName = chord?.name ?? chordBeat.chordId
              const isActive =
                activeEntry?.sectionIndex === sIdx &&
                activeEntry?.progressionIndex === pIdx

              return (
                <Link
                  key={pIdx}
                  to={`/chords/${chordBeat.chordId}`}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    'relative flex min-w-[3.5rem] flex-col items-center rounded-xl border-2 px-3 py-2 text-center transition-all',
                    isActive
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30 shadow-md shadow-brand-500/20 scale-105'
                      : 'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700',
                  )}
                >
                  {isActive && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-500" />
                  )}
                  <span
                    className={cn(
                      'text-sm font-bold',
                      isActive
                        ? 'text-brand-700 dark:text-brand-300'
                        : 'text-slate-800 dark:text-slate-200',
                    )}
                  >
                    {chordName}
                  </span>
                  <span className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                    {chordBeat.beats}b
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
