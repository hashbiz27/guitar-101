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

export function filterChords(
  chords: Chord[],
  query: string,
  quality?: string,
): Chord[] {
  const q = query.toLowerCase()
  return chords.filter((c) => {
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.fullName.toLowerCase().includes(q) ||
      c.aliases.some((a) => a.toLowerCase().includes(q))
    const matchesQuality = !quality || c.quality === quality
    return matchesQuery && matchesQuality
  })
}
