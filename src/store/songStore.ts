import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Song } from '@/types'
import songsData from '@/data/songs.json'

interface SongStore {
  songs: Song[]
  favoriteSongIds: Set<string>
  toggleFavorite: (songId: string) => void
  isFavorite: (songId: string) => boolean
}

export const useSongStore = create<SongStore>()(
  persist(
    (set, get) => ({
      songs: songsData as Song[],
      favoriteSongIds: new Set<string>(),
      toggleFavorite: (songId) =>
        set((state) => {
          const next = new Set(state.favoriteSongIds)
          if (next.has(songId)) {
            next.delete(songId)
          } else {
            next.add(songId)
          }
          return { favoriteSongIds: next }
        }),
      isFavorite: (songId) => get().favoriteSongIds.has(songId),
    }),
    {
      name: 'guitar-101-songs',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const parsed = JSON.parse(str)
          parsed.state.favoriteSongIds = new Set(parsed.state.favoriteSongIds)
          return parsed
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              favoriteSongIds: Array.from(value.state.favoriteSongIds),
            },
          }
          localStorage.setItem(name, JSON.stringify(serialized))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
)
