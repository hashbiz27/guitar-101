export type TimeSignatureNumerator = 2 | 3 | 4 | 5 | 6 | 7 | 9 | 12
export type TimeSignatureDenominator = 4 | 8

export interface TimeSignature {
  numerator: TimeSignatureNumerator
  denominator: TimeSignatureDenominator
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ChordBeat {
  chordId: string
  /** Number of beats this chord lasts */
  beats: number
}

export interface SongSection {
  label: string
  progression: ChordBeat[]
  repeatCount?: number
}

export interface Song {
  id: string
  title: string
  artist: string
  difficulty: Difficulty
  /** Tempo in BPM */
  tempo: number
  timeSignature: TimeSignature
  /** e.g. "G major" or "A minor" */
  key: string
  capo?: number
  sections: SongSection[]
  /** Unique chord IDs used across all sections */
  chordsUsed: string[]
  tags: string[]
  yearPublished?: number
  /** Human-readable strumming pattern, e.g. "D DU UDU" */
  strummingPattern?: string
}
