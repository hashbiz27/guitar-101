export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export interface NoteInfo {
  note: string
  octave: number
  cents: number // -50 to +50; negative = flat, positive = sharp
}

/** Normalized autocorrelation pitch detection. Returns Hz or null if signal too quiet. */
export function autocorrelate(buffer: Float32Array, sampleRate: number): number | null {
  // RMS noise gate
  let rms = 0
  for (let i = 0; i < buffer.length; i++) rms += buffer[i] * buffer[i]
  rms = Math.sqrt(rms / buffer.length)
  if (rms < 0.01) return null

  const n = buffer.length
  const c = new Float32Array(n)

  // Unnormalized autocorrelation
  for (let lag = 0; lag < n; lag++) {
    for (let i = 0; i < n - lag; i++) {
      c[lag] += buffer[i] * buffer[i + lag]
    }
  }

  // Find first dip then first peak after lag 0 (skip the trivial peak at 0)
  let d = 1
  while (d < n && c[d] > c[d - 1]) d++

  let maxVal = -Infinity
  let maxLag = -1
  for (let i = d; i < n; i++) {
    if (c[i] > maxVal) {
      maxVal = c[i]
      maxLag = i
    }
  }

  if (maxLag === -1 || maxVal < 0.01) return null

  // Parabolic interpolation for sub-sample accuracy
  const prev = c[maxLag - 1] ?? maxVal
  const next = c[maxLag + 1] ?? maxVal
  const refined = maxLag - (next - prev) / (2 * (2 * maxVal - prev - next))

  const freq = sampleRate / refined
  // Sanity-check: guitar range is roughly 70–1400 Hz
  if (freq < 70 || freq > 1400) return null
  return freq
}

/** Convert Hz to note name, octave, and cents deviation from nearest semitone. */
export function frequencyToNoteInfo(freq: number): NoteInfo {
  const midiFloat = 69 + 12 * Math.log2(freq / 440)
  const midiRound = Math.round(midiFloat)
  const cents = Math.round((midiFloat - midiRound) * 100)
  const octave = Math.floor(midiRound / 12) - 1
  const note = NOTE_NAMES[((midiRound % 12) + 12) % 12]
  return { note, octave, cents }
}
