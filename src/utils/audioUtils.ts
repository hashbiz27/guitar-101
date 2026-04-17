import type { FingerPosition, GuitarString } from '@/types'

/**
 * Standard tuning MIDI note numbers for each open string.
 * Index 0 = string 6 (low E), index 5 = string 1 (high E).
 */
const OPEN_STRING_MIDI: Record<GuitarString, number> = {
  6: 40, // E2
  5: 45, // A2
  4: 50, // D3
  3: 55, // G3
  2: 59, // B3
  1: 64, // E4
}

/** Convert a finger position to a MIDI note number */
export function positionToMidi(position: FingerPosition): number {
  return OPEN_STRING_MIDI[position.string] + position.fret
}

/** Build sorted MIDI note array from finger positions and open strings */
export function buildChordNotes(
  positions: FingerPosition[],
  openStrings: GuitarString[],
): number[] {
  const notes = [
    ...positions.map(positionToMidi),
    ...openStrings.map((s) => OPEN_STRING_MIDI[s]),
  ]
  return notes.sort((a, b) => a - b)
}

/** Convert MIDI note number to frequency in Hz */
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}
