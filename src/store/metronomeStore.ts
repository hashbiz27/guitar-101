import { create } from 'zustand'

export type TimeSignature = '2/4' | '3/4' | '4/4' | '6/8'

interface MetronomeStore {
  bpm: number
  timeSignature: TimeSignature
  isPlaying: boolean
  currentBeat: number
  setBpm: (bpm: number) => void
  setTimeSignature: (ts: TimeSignature) => void
  setIsPlaying: (playing: boolean) => void
  setCurrentBeat: (beat: number) => void
}

export const useMetronomeStore = create<MetronomeStore>()((set) => ({
  bpm: 120,
  timeSignature: '4/4',
  isPlaying: false,
  currentBeat: 0,
  setBpm: (bpm) => set({ bpm }),
  setTimeSignature: (timeSignature) => set({ timeSignature, currentBeat: 0 }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentBeat: (currentBeat) => set({ currentBeat }),
}))
