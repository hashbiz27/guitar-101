import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProgress, PracticeSession } from '@/types'

const SESSION_HISTORY_LIMIT = 200

const initialProgress: UserProgress = {
  streak: { current: 0, longest: 0 },
  totalPracticeSeconds: 0,
  totalSessionCount: 0,
  learnedChordIds: [],
  masteryRecords: [],
  favoriteSongIds: [],
  sessionHistory: [],
  defaultSessionType: 'free',
  preferredTempo: 120,
}

interface ProgressStore {
  progress: UserProgress
  addSession: (session: PracticeSession) => void
  setPreferredTempo: (bpm: number) => void
  setDefaultSessionType: (type: UserProgress['defaultSessionType']) => void
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: initialProgress,
      addSession: (session) =>
        set((state) => {
          const history = [session, ...state.progress.sessionHistory].slice(
            0,
            SESSION_HISTORY_LIMIT,
          )
          return {
            progress: {
              ...state.progress,
              sessionHistory: history,
              totalSessionCount: state.progress.totalSessionCount + 1,
              totalPracticeSeconds:
                state.progress.totalPracticeSeconds + session.duration,
            },
          }
        }),
      setPreferredTempo: (bpm) =>
        set((state) => ({
          progress: { ...state.progress, preferredTempo: bpm },
        })),
      setDefaultSessionType: (type) =>
        set((state) => ({
          progress: { ...state.progress, defaultSessionType: type },
        })),
    }),
    { name: 'guitar-101-progress' },
  ),
)
