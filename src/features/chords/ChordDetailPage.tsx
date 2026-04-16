import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Volume2 } from 'lucide-react'
import { useChordStore } from '@/store'
import { useChordAudio } from '@/hooks/useChordAudio'
import ChordDiagram from '@/components/chord/ChordDiagram'
import Badge from '@/components/ui/Badge'
import LearnedToggle from './LearnedToggle'
import type { GuitarString, FingerNumber } from '@/types'

const STRING_NAMES: Record<GuitarString, string> = {
  6: 'E (low)',
  5: 'A',
  4: 'D',
  3: 'G',
  2: 'B',
  1: 'e (high)',
}

const FINGER_LABELS: Record<FingerNumber, string> = {
  1: 'Index',
  2: 'Middle',
  3: 'Ring',
  4: 'Pinky',
}

export default function ChordDetailPage() {
  const { chordId } = useParams<{ chordId: string }>()
  const { chords } = useChordStore()
  const { playChord } = useChordAudio()

  const chord = chords.find((c) => c.id === chordId)

  if (!chord) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500 dark:text-slate-400">Chord not found.</p>
        <Link
          to="/chords"
          className="mt-4 inline-block text-sm text-brand-500 hover:underline"
        >
          ← Back to chords
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {/* Back */}
      <Link
        to="/chords"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={15} />
        All chords
      </Link>

      {/* Title row */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {chord.fullName}
          </h1>
          {chord.aliases.length > 0 && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Also known as: {chord.aliases.join(', ')}
            </p>
          )}
          {chord.tags && chord.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chord.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs text-slate-500 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <Badge variant={chord.difficulty}>
          {chord.difficulty.charAt(0).toUpperCase() + chord.difficulty.slice(1)}
        </Badge>
      </div>

      {/* Diagram + finger list */}
      <div className="mb-8 flex flex-col sm:flex-row gap-8">
        {/* Large diagram */}
        <div className="flex shrink-0 flex-col items-center">
          <ChordDiagram chord={chord} className="w-48" />
          {chord.capoFret && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Capo fret {chord.capoFret}
            </p>
          )}
        </div>

        {/* Per-string breakdown */}
        <div className="flex-1">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Finger positions
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {([6, 5, 4, 3, 2, 1] as GuitarString[]).map((s) => {
              const muted = chord.mutedStrings.includes(s)
              const open = chord.openStrings.includes(s)
              const pos = chord.positions.find((p) => p.string === s)
              const barreCovered =
                chord.barre &&
                s >= chord.barre.toString &&
                s <= chord.barre.fromString

              let label: React.ReactNode

              if (muted) {
                label = (
                  <span className="text-slate-400 dark:text-slate-500">✕ muted</span>
                )
              } else if (pos) {
                label = (
                  <span>
                    Fret {pos.fret}{' '}
                    <span className="text-slate-500 dark:text-slate-400">
                      — {FINGER_LABELS[pos.finger]} ({pos.finger})
                    </span>
                  </span>
                )
              } else if (open) {
                label = (
                  <span className="text-slate-500 dark:text-slate-400">○ open</span>
                )
              } else if (barreCovered) {
                label = (
                  <span className="text-slate-500 dark:text-slate-400">
                    Fret {chord.barre!.fret} — barre (Index)
                  </span>
                )
              } else {
                return null
              }

              return (
                <div
                  key={s}
                  className="flex items-center gap-3 py-1.5 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="w-5 text-right text-xs font-mono text-slate-400 dark:text-slate-500 shrink-0">
                    {s}
                  </span>
                  <span className="w-16 text-xs text-slate-500 dark:text-slate-400 shrink-0">
                    {STRING_NAMES[s]}
                  </span>
                  <span>{label}</span>
                </div>
              )
            })}
          </div>

          {chord.barre && (
            <p className="mt-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
              Barre: press index finger across strings {chord.barre.toString}–
              {chord.barre.fromString} at fret {chord.barre.fret}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 dark:border-slate-800 pt-6">
        <button
          type="button"
          onClick={() => playChord(chord.id)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Volume2 size={16} />
          Play chord
          <span className="text-xs text-slate-400 dark:text-slate-500">(coming soon)</span>
        </button>
        <LearnedToggle chordId={chord.id} />
      </div>
    </div>
  )
}
