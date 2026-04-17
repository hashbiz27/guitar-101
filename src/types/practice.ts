export type SessionType = 'chords' | 'song' | 'scales' | 'free'

export interface PracticeSession {
  /** UUID v4 */
  id: string
  /** ISO 8601 date "YYYY-MM-DD" */
  date: string
  /** ISO 8601 datetime */
  startedAt: string
  /** Duration in seconds */
  duration: number
  type: SessionType
  chordId?: string
  songId?: string
  tempoTarget?: number
  tempoActual?: number
  /** Free-text notes, max ~500 chars */
  notes?: string
  rating: 1 | 2 | 3 | 4 | 5
  /** Display snapshot at save time, e.g. "G Major" or "Wonderwall" */
  targetLabel?: string
}
