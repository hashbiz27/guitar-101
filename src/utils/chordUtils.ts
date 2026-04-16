import type { Chord } from '@/types'

export function getChordById(chords: Chord[], id: string): Chord | undefined {
  return chords.find((c) => c.id === id)
}

export function groupChordsByRoot(chords: Chord[]): Record<string, Chord[]> {
  return chords.reduce<Record<string, Chord[]>>((acc, chord) => {
    const key = chord.root
    if (!acc[key]) acc[key] = []
    acc[key].push(chord)
    return acc
  }, {})
}

export interface ChordFilterOptions {
  query?: string
  difficulty?: Chord['difficulty']
}

export function filterChords(chords: Chord[], opts: ChordFilterOptions): Chord[] {
  const q = (opts.query ?? '').toLowerCase().trim()
  return chords.filter((c) => {
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.fullName.toLowerCase().includes(q) ||
      c.aliases.some((a) => a.toLowerCase().includes(q))
    const matchesDifficulty = !opts.difficulty || c.difficulty === opts.difficulty
    return matchesQuery && matchesDifficulty
  })
}
