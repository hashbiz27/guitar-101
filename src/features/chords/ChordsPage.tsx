import { useState, useMemo } from 'react'
import { Music2 } from 'lucide-react'
import { useChordStore } from '@/store'
import ChordGrid from '@/components/chord/ChordGrid'
import EmptyState from '@/components/ui/EmptyState'
import ChordSearch from './ChordSearch'
import ChordFilters, { type DifficultyFilter } from './ChordFilters'
import { filterChords } from '@/utils/chordUtils'

export default function ChordsPage() {
  const { chords, learnedChordIds } = useChordStore()
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')

  const filtered = useMemo(
    () =>
      filterChords(chords, {
        query,
        difficulty: difficulty === 'all' ? undefined : difficulty,
      }),
    [chords, query, difficulty],
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Chords
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {chords.length} chords &middot; {learnedChordIds.size} learned
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        <ChordSearch value={query} onChange={setQuery} />
        <ChordFilters value={difficulty} onChange={setDifficulty} />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Music2}
          title="No chords found"
          description="Try a different search term or remove the difficulty filter."
        />
      ) : (
        <ChordGrid chords={filtered} learnedIds={learnedChordIds} />
      )}
    </div>
  )
}
