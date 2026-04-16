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
