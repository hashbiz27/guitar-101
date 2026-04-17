/**
 * useChordAudio — loads a Tone.js Sampler and provides a playChord callback.
 * Sampler is loaded lazily to avoid creating the audio context before user interaction.
 */
export function useChordAudio() {
  // TODO: implement Tone.js Sampler chord playback
  return {
    playChord: (_chordId: string) => {},
    isLoaded: false,
  }
}
