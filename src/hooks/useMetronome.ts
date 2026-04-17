import { useEffect, useRef, useCallback } from 'react'
import * as Tone from 'tone'
import { useMetronomeStore, type TimeSignature } from '@/store/metronomeStore'

const BEAT_COUNTS: Record<TimeSignature, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
  '6/8': 6,
}

// Quarter-note grid for x/4 signatures; eighth-note grid for 6/8
const BEAT_INTERVALS: Record<TimeSignature, string> = {
  '2/4': '4n',
  '3/4': '4n',
  '4/4': '4n',
  '6/8': '8n',
}

function playTick(ctx: AudioContext, time: number, isAccent: boolean) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = isAccent ? 1000 : 800
  gain.gain.setValueAtTime(isAccent ? 0.4 : 0.25, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045)
  osc.start(time)
  osc.stop(time + 0.045)
}

export function useMetronome() {
  const { bpm, timeSignature, isPlaying, setCurrentBeat, setIsPlaying } = useMetronomeStore()

  const beatRef = useRef(0)
  const eventIdRef = useRef<number | null>(null)
  const isStartingRef = useRef(false)

  // Keep mutable refs so callbacks always see the latest values without re-creating
  const bpmRef = useRef(bpm)
  const timeSignatureRef = useRef(timeSignature)
  const isPlayingRef = useRef(isPlaying)
  bpmRef.current = bpm
  timeSignatureRef.current = timeSignature
  isPlayingRef.current = isPlaying

  const stopTransport = useCallback(() => {
    const transport = Tone.getTransport()
    if (eventIdRef.current !== null) {
      transport.clear(eventIdRef.current)
      eventIdRef.current = null
    }
    transport.stop()
    transport.cancel()
    beatRef.current = 0
  }, [])

  const stop = useCallback(() => {
    stopTransport()
    setCurrentBeat(0)
    setIsPlaying(false)
  }, [stopTransport, setCurrentBeat, setIsPlaying])

  const start = useCallback(async () => {
    if (isStartingRef.current) return
    isStartingRef.current = true
    try {
      await Tone.start()
      stopTransport()

      const transport = Tone.getTransport()
      transport.bpm.value = bpmRef.current

      const currentTimeSig = timeSignatureRef.current
      const beats = BEAT_COUNTS[currentTimeSig]
      const interval = BEAT_INTERVALS[currentTimeSig]
      const rawCtx = Tone.getContext().rawContext as AudioContext

      beatRef.current = 0

      eventIdRef.current = transport.scheduleRepeat(
        (time: number) => {
          const beat = beatRef.current
          playTick(rawCtx, time, beat === 0)

          // Schedule visual update to fire at audio time
          const delayMs = Math.max(0, (time - rawCtx.currentTime) * 1000)
          const capturedBeat = beat
          setTimeout(() => setCurrentBeat(capturedBeat), delayMs)

          beatRef.current = (beat + 1) % beats
        },
        interval,
      )

      transport.start()
      setIsPlaying(true)
    } finally {
      isStartingRef.current = false
    }
  }, [stopTransport, setCurrentBeat, setIsPlaying])

  const toggle = useCallback(() => {
    if (isPlayingRef.current) {
      stop()
    } else {
      void start()
    }
  }, [start, stop])

  // Live BPM change — update transport without restarting the sequence
  useEffect(() => {
    if (isPlayingRef.current) {
      Tone.getTransport().bpm.value = bpm
    }
  }, [bpm])

  // Time signature change while playing — must restart to get new beat count/interval
  useEffect(() => {
    if (isPlayingRef.current) {
      void start()
    }
  }, [timeSignature, start])

  // Stop and clean up when the page unmounts
  useEffect(() => {
    return () => {
      stopTransport()
      setIsPlaying(false)
      setCurrentBeat(0)
    }
  }, [stopTransport, setIsPlaying, setCurrentBeat])

  return { toggle, start, stop }
}
