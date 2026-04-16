import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Chord } from '@/types'
import chordsData from '@/data/chords.json'

interface ChordStore {
  chords: Chord[]
  learnedChordIds: Set<string>
  toggleLearned: (chordId: string) => void
  isLearned: (chordId: string) => boolean
}

export const useChordStore = create<ChordStore>()(
  persist(
    (set, get) => ({
      chords: chordsData as Chord[],
      learnedChordIds: new Set<string>(),
      toggleLearned: (chordId) =>
        set((state) => {
          const next = new Set(state.learnedChordIds)
          if (next.has(chordId)) {
            next.delete(chordId)
          } else {
            next.add(chordId)
          }
          return { learnedChordIds: next }
        }),
      isLearned: (chordId) => get().learnedChordIds.has(chordId),
    }),
    {
      name: 'guitar-101-chords',
      // Serialize Set to array for localStorage
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const parsed = JSON.parse(str)
          parsed.state.learnedChordIds = new Set(parsed.state.learnedChordIds)
          return parsed
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              learnedChordIds: Array.from(value.state.learnedChordIds),
            },
          }
          localStorage.setItem(name, JSON.stringify(serialized))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
)
