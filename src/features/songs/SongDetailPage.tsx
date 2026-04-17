import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, Square, Minus, Plus } from 'lucide-react'
import { useSongStore, useChordStore } from '@/store'
import { usePlayAlong } from '@/hooks/usePlayAlong'
import ChordDiagram from '@/components/chord/ChordDiagram'
import Badge from '@/components/ui/Badge'
import Slider from '@/components/ui/Slider'
import FavoriteButton from './FavoriteButton'
import ChordProgression from './ChordProgression'
import type { Chord } from '@/types'

export default function SongDetailPage() {
  const { songId } = useParams<{ songId: string }>()
  const { songs } = useSongStore()
  const { chords } = useChordStore()

  const song = songs.find((s) => s.id === songId)

  const chordMap = useMemo<Map<string, Chord>>(
    () => new Map(chords.map((c) => [c.id, c])),
    [chords],
  )

  const { isPlaying, bpm, setBpm, currentBeat, nextChordBeat, toggle } = usePlayAlong(
    song ?? songs[0],
  )

  if (!song) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500 dark:text-slate-400">Song not found.</p>
        <Link to="/songs" className="mt-4 inline-block text-sm text-brand-500 hover:underline">
          ← Back to songs
        </Link>
      </div>
    )
  }

  const currentChord = currentBeat ? chordMap.get(currentBeat.chordId) : null
  const nextChord = nextChordBeat ? chordMap.get(nextChordBeat.chordId) : null

  const activeEntry = currentBeat
    ? { sectionIndex: currentBeat.sectionIndex, progressionIndex: currentBeat.progressionIndex }
    : null

  return (
    <div className="max-w-2xl">
      {/* Back */}
      <Link
        to="/songs"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={15} />
        All songs
      </Link>

      {/* Title row */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {song.title}
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            {song.artist}
            {song.yearPublished && (
              <span className="ml-2 text-sm">· {song.yearPublished}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <FavoriteButton songId={song.id} />
          <Badge variant={song.difficulty}>
            {song.difficulty.charAt(0).toUpperCase() + song.difficulty.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Meta pills */}
      <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
        <span><span className="font-medium text-slate-700 dark:text-slate-300">Key</span> {song.key}</span>
        <span><span className="font-medium text-slate-700 dark:text-slate-300">Tempo</span> {song.tempo} BPM</span>
        <span><span className="font-medium text-slate-700 dark:text-slate-300">Time</span> {song.timeSignature.numerator}/{song.timeSignature.denominator}</span>
        {song.capo && <span><span className="font-medium text-slate-700 dark:text-slate-300">Capo</span> {song.capo}</span>}
        {song.strummingPattern && (
          <span><span className="font-medium text-slate-700 dark:text-slate-300">Strum</span> <span className="font-mono">{song.strummingPattern}</span></span>
        )}
      </div>
      {song.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          {song.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs text-slate-500 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Chords used */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Chords used
        </h2>
        <div className="flex flex-wrap gap-3">
          {song.chordsUsed.map((chordId) => {
            const chord = chordMap.get(chordId)
            if (!chord) return null
            return (
              <Link
                key={chordId}
                to={`/chords/${chordId}`}
                className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
              >
                <ChordDiagram chord={chord} className="w-16" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {chord.name}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Play along ───────────────────────────────────────────────────── */}
      <section className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Play along
        </h2>

        {/* BPM control */}
        <div className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setBpm(Math.max(30, bpm - 5))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Minus size={14} />
          </button>
          <div className="flex-1">
            <Slider min={30} max={240} value={bpm} onChange={setBpm} aria-label="Tempo" />
          </div>
          <button
            type="button"
            onClick={() => setBpm(Math.min(240, bpm + 5))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Plus size={14} />
          </button>
          <span className="w-16 text-right font-mono text-sm font-medium tabular-nums text-slate-700 dark:text-slate-300">
            {bpm} BPM
          </span>
        </div>

        {/* Start / Stop */}
        <button
          type="button"
          onClick={toggle}
          className={`mb-6 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            isPlaying
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              : 'bg-brand-500 hover:bg-brand-600 text-white'
          }`}
        >
          {isPlaying
            ? <><Square size={14} className="fill-current" /> Stop</>
            : <><Play size={14} className="fill-current" /> Start play along</>}
        </button>

        {/* Current chord display */}
        {isPlaying ? (
          <div className="flex items-center gap-6">
            {/* Current */}
            <div className="flex flex-1 flex-col items-center gap-2">
              {currentChord ? (
                <>
                  <ChordDiagram chord={currentChord} className="w-28" />
                  <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {currentChord.name}
                  </span>
                </>
              ) : (
                <div className="h-28 w-28 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
              )}
            </div>

            {/* Arrow + next chord preview */}
            {nextChord && (
              <>
                <div className="text-2xl text-slate-300 dark:text-slate-600 select-none">→</div>
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <ChordDiagram chord={nextChord} className="w-16" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {nextChord.name}
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500">
            Hit start — the current chord will highlight below as you play.
          </p>
        )}
      </section>

      {/* ── Chord progressions ───────────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Chord progressions
        </h2>
        <ChordProgression
          sections={song.sections}
          chordMap={chordMap}
          activeEntry={activeEntry}
        />
      </section>
    </div>
  )
}
