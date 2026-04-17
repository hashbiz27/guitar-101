import { useState, useRef, useCallback } from 'react'
import { autocorrelate, frequencyToNoteInfo, type NoteInfo } from '@/utils/pitchUtils'

export type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable'

export interface PitchDetectorState {
  permission: PermissionState
  noteInfo: NoteInfo | null
  frequency: number | null
  start: () => Promise<void>
  stop: () => void
}

export function usePitchDetector(): PitchDetectorState {
  const [permission, setPermission] = useState<PermissionState>('idle')
  const [noteInfo, setNoteInfo] = useState<NoteInfo | null>(null)
  const [frequency, setFrequency] = useState<number | null>(null)

  const rafRef = useRef<number | null>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (contextRef.current) {
      contextRef.current.close()
      contextRef.current = null
    }
    analyserRef.current = null
    setNoteInfo(null)
    setFrequency(null)
    setPermission('idle')
  }, [])

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission('unavailable')
      return
    }

    setPermission('requesting')

    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    } catch {
      setPermission('denied')
      return
    }

    streamRef.current = stream
    const ctx = new AudioContext()
    contextRef.current = ctx

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    analyserRef.current = analyser

    const source = ctx.createMediaStreamSource(stream)
    source.connect(analyser)

    const buffer = new Float32Array(analyser.fftSize)

    setPermission('granted')

    const loop = () => {
      analyser.getFloatTimeDomainData(buffer)
      const freq = autocorrelate(buffer, ctx.sampleRate)
      if (freq !== null) {
        setFrequency(freq)
        setNoteInfo(frequencyToNoteInfo(freq))
      } else {
        setFrequency(null)
        setNoteInfo(null)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [])

  return { permission, noteInfo, frequency, start, stop }
}
