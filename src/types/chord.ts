export type NoteValue =
  | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb'
  | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab'
  | 'A' | 'A#' | 'Bb' | 'B'

export type ChordQuality =
  | 'major' | 'minor' | 'dominant7' | 'major7' | 'minor7'
  | 'sus2' | 'sus4' | 'add9' | 'dim' | 'aug' | 'power'

/** String 1 = high E, string 6 = low E (standard guitar numbering) */
export type GuitarString = 1 | 2 | 3 | 4 | 5 | 6

/** 1 = index, 2 = middle, 3 = ring, 4 = pinky */
export type FingerNumber = 1 | 2 | 3 | 4

export interface FingerPosition {
  string: GuitarString
  /** 0 = open string; 1–24 = fretted position */
  fret: number
  finger: FingerNumber
  /** true if this is the anchor finger of a barre chord */
  isBarreRoot?: boolean
}

export interface BarreInfo {
  fret: number
  fromString: GuitarString
  toString: GuitarString
  finger: FingerNumber
}

export interface Chord {
  id: string
  /** Short display name, e.g. "G" */
  name: string
  /** Full display name, e.g. "G Major" */
  fullName: string
  aliases: string[]
  root: NoteValue
  quality: ChordQuality
  positions: FingerPosition[]
  openStrings: GuitarString[]
  mutedStrings: GuitarString[]
  barre?: BarreInfo
  /** Non-zero means diagram starts at this fret */
  capoFret?: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags?: string[]
  /** Pre-computed MIDI note numbers (low to high) for Tone.js playback */
  midiNotes?: number[]
}
