import type { Song, Difficulty } from '@/types'

export function getSongById(songs: Song[], id: string): Song | undefined {
  return songs.find((s) => s.id === id)
}

export function filterSongs(
  songs: Song[],
  query: string,
  difficulty?: Difficulty,
  tag?: string,
): Song[] {
  const q = query.toLowerCase()
  return songs.filter((s) => {
    const matchesQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q)
    const matchesDifficulty = !difficulty || s.difficulty === difficulty
    const matchesTag = !tag || s.tags.includes(tag)
    return matchesQuery && matchesDifficulty && matchesTag
  })
}

export function getUniqueTags(songs: Song[]): string[] {
  return Array.from(new Set(songs.flatMap((s) => s.tags))).sort()
}

export interface FlatBeat {
  sectionIndex: number
  progressionIndex: number
  /** 0 = first beat of this chord */
  beatInChord: number
  chordId: string
}

/** Expand all sections (with repeatCount) into a flat beat-by-beat array. */
export function flattenSongBeats(song: Song): FlatBeat[] {
  const result: FlatBeat[] = []
  song.sections.forEach((section, sectionIndex) => {
    const repeats = section.repeatCount ?? 1
    for (let r = 0; r < repeats; r++) {
      section.progression.forEach((chordBeat, progressionIndex) => {
        for (let b = 0; b < chordBeat.beats; b++) {
          result.push({ sectionIndex, progressionIndex, beatInChord: b, chordId: chordBeat.chordId })
        }
      })
    }
  })
  return result
}
