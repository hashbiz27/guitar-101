import type { PracticeSession, SessionType } from './practice'

export interface StreakInfo {
  current: number
  longest: number
  /** ISO date of last session, used for streak validation */
  lastPracticeDate?: string
}

export interface MasteryRecord {
  chordId: string
  firstLearnedDate: string
  sessionCount: number
  /** 0–100; updated on each session save */
  masteryScore: number
}

export interface UserProgress {
  streak: StreakInfo
  totalPracticeSeconds: number
  totalSessionCount: number
  learnedChordIds: string[]
  masteryRecords: MasteryRecord[]
  favoriteSongIds: string[]
  /** Reverse-chronological, capped at 200 entries */
  sessionHistory: PracticeSession[]
  defaultSessionType: SessionType
  /** Last-used metronome BPM, persisted across sessions */
  preferredTempo: number
}
