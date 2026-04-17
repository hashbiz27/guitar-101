import { useState, useMemo } from 'react'
import { Music2 } from 'lucide-react'
import { useSongStore } from '@/store'
import { filterSongs } from '@/utils/songUtils'
import EmptyState from '@/components/ui/EmptyState'
import SongCard from './SongCard'
import SongFilters, { type DifficultyFilter } from './SongFilters'

export default function SongsPage() {
  const { songs } = useSongStore()
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')

  const filtered = useMemo(
    () =>
      filterSongs(
        songs,
        query,
        difficulty === 'all' ? undefined : difficulty,
      ),
    [songs, query, difficulty],
  )

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Songs
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {songs.length} songs to practice
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search songs or artists…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <SongFilters value={difficulty} onChange={setDifficulty} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Music2}
          title="No songs found"
          description="Try a different search term or remove the difficulty filter."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  )
}
