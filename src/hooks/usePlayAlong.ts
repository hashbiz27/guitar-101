import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import * as Tone from 'tone'
import type { Song } from '@/types'
import { flattenSongBeats, type FlatBeat } from '@/utils/songUtils'

// 6/8 uses eighth-note grid; everything else uses quarter-note grid
const TS_INTERVAL: Record<number, string> = { 4: '4n', 8: '8n' }

function playTick(ctx: AudioContext, time: number, isAccent: boolean) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = isAccent ? 1000 : 800
  gain.gain.setValueAtTime(isAccent ? 0.35 : 0.2, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04)
  osc.start(time)
  osc.stop(time + 0.04)
}

export function usePlayAlong(song: Song) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(song.tempo)
  const [currentFlatIndex, setCurrentFlatIndex] = useState(-1)

  const flatBeats = useMemo(() => flattenSongBeats(song), [song])

  const beatIndexRef = useRef(0)
  const eventIdRef = useRef<number | null>(null)
  const isStartingRef = useRef(false)
  const bpmRef = useRef(bpm)
  const isPlayingRef = useRef(isPlaying)
  const flatBeatsRef = useRef(flatBeats)
  const intervalRef = useRef(TS_INTERVAL[song.timeSignature.denominator] ?? '4n')
  bpmRef.current = bpm
  isPlayingRef.current = isPlaying
  flatBeatsRef.current = flatBeats

  const stopTransport = useCallback(() => {
    const transport = Tone.getTransport()
    if (eventIdRef.current !== null) {
      transport.clear(eventIdRef.current)
      eventIdRef.current = null
    }
    transport.stop()
    transport.cancel()
    beatIndexRef.current = 0
  }, [])

  const stop = useCallback(() => {
    stopTransport()
    setIsPlaying(false)
    setCurrentFlatIndex(-1)
  }, [stopTransport])

  const start = useCallback(async () => {
    if (isStartingRef.current) return
    isStartingRef.current = true
    try {
      await Tone.start()
      stopTransport()

      const transport = Tone.getTransport()
      transport.bpm.value = bpmRef.current

      const rawCtx = Tone.getContext().rawContext as AudioContext
      beatIndexRef.current = 0

      eventIdRef.current = transport.scheduleRepeat(
        (time: number) => {
          const beats = flatBeatsRef.current
          const i = beatIndexRef.current % beats.length
          playTick(rawCtx, time, beats[i].beatInChord === 0)

          const delay = Math.max(0, (time - rawCtx.currentTime) * 1000)
          const capturedI = i
          setTimeout(() => setCurrentFlatIndex(capturedI), delay)

          beatIndexRef.current = (beatIndexRef.current + 1) % beats.length
        },
        intervalRef.current,
      )

      transport.start()
      setIsPlaying(true)
    } finally {
      isStartingRef.current = false
    }
  }, [stopTransport])

  const toggle = useCallback(() => {
    if (isPlayingRef.current) stop()
    else void start()
  }, [start, stop])

  // Live BPM update without restarting the sequence
  useEffect(() => {
    if (isPlayingRef.current) Tone.getTransport().bpm.value = bpm
  }, [bpm])

  useEffect(() => () => stopTransport(), [stopTransport])

  const currentBeat: FlatBeat | null =
    currentFlatIndex >= 0 ? (flatBeats[currentFlatIndex] ?? null) : null

  // Next chord change (useful for "up next" preview)
  const nextChordBeat: FlatBeat | null = (() => {
    if (!currentBeat || flatBeats.length === 0) return null
    for (let offset = 1; offset < flatBeats.length; offset++) {
      const b = flatBeats[(currentFlatIndex + offset) % flatBeats.length]
      if (b.chordId !== currentBeat.chordId && b.beatInChord === 0) return b
    }
    return null
  })()

  return { isPlaying, bpm, setBpm, currentBeat, nextChordBeat, flatBeats, toggle, stop }
}
