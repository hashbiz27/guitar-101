import { create } from 'zustand'
import type { SessionType } from '@/types'

interface PracticeStore {
  isActive: boolean
  sessionType: SessionType
  targetChordId: string | null
  targetSongId: string | null
  targetLabel: string | null
  tempoTarget: number | null
  startTime: number | null
  elapsedSeconds: number
  setSessionType: (type: SessionType) => void
  setTarget: (params: { chordId?: string; songId?: string; label: string }) => void
  setTempoTarget: (bpm: number | null) => void
  startSession: () => void
  stopSession: () => void
  updateElapsed: (seconds: number) => void
  reset: () => void
}

export const usePracticeStore = create<PracticeStore>()((set) => ({
  isActive: false,
  sessionType: 'free',
  targetChordId: null,
  targetSongId: null,
  targetLabel: null,
  tempoTarget: null,
  startTime: null,
  elapsedSeconds: 0,
  setSessionType: (type) => set({ sessionType: type }),
  setTarget: ({ chordId, songId, label }) =>
    set({ targetChordId: chordId ?? null, targetSongId: songId ?? null, targetLabel: label }),
  setTempoTarget: (bpm) => set({ tempoTarget: bpm }),
  startSession: () => set({ isActive: true, startTime: Date.now(), elapsedSeconds: 0 }),
  stopSession: () => set({ isActive: false }),
  updateElapsed: (seconds) => set({ elapsedSeconds: seconds }),
  reset: () =>
    set({
      isActive: false,
      sessionType: 'free',
      targetChordId: null,
      targetSongId: null,
      targetLabel: null,
      tempoTarget: null,
      startTime: null,
      elapsedSeconds: 0,
    }),
}))
