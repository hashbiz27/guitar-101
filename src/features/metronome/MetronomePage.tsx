import { useEffect } from 'react'
import { Play, Square } from 'lucide-react'
import { useMetronomeStore } from '@/store/metronomeStore'
import { useMetronome } from '@/hooks/useMetronome'
import BeatIndicator from './BeatIndicator'
import TapTempo from './TapTempo'
import TimeSignaturePicker from './TimeSignaturePicker'
import Slider from '@/components/ui/Slider'
import Button from '@/components/ui/Button'

const BPM_MIN = 30
const BPM_MAX = 240

export default function MetronomePage() {
  const { bpm, timeSignature, isPlaying, currentBeat, setBpm, setTimeSignature } =
    useMetronomeStore()
  const { toggle } = useMetronome()

  // Spacebar shortcut — ignore when focus is inside a text input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      e.preventDefault()
      toggle()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle])

  return (
    <div className="max-w-sm">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Metronome
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Press <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1 font-mono text-xs">Space</kbd> or tap to start
        </p>
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col items-center gap-8">

        {/* BPM readout */}
        <div className="flex flex-col items-center gap-0.5 select-none">
          <span className="text-7xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-slate-50 leading-none">
            {bpm}
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
            BPM
          </span>
        </div>

        {/* Beat indicator dots */}
        <BeatIndicator
          isPlaying={isPlaying}
          currentBeat={currentBeat}
          timeSignature={timeSignature}
        />

        {/* Start / Stop */}
        <Button
          variant={isPlaying ? 'secondary' : 'primary'}
          size="lg"
          onClick={toggle}
          className="w-full"
          aria-label={isPlaying ? 'Stop metronome' : 'Start metronome'}
        >
          {isPlaying
            ? <Square size={15} className="fill-current" />
            : <Play size={15} className="fill-current" />}
          {isPlaying ? 'Stop' : 'Start'}
        </Button>

        {/* BPM slider */}
        <div className="w-full space-y-2">
          <Slider
            min={BPM_MIN}
            max={BPM_MAX}
            value={bpm}
            onChange={setBpm}
            aria-label="BPM"
          />
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 tabular-nums">
            <span>{BPM_MIN}</span>
            <span>{BPM_MAX}</span>
          </div>
        </div>

        {/* Time signature + Tap Tempo */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <TimeSignaturePicker value={timeSignature} onChange={setTimeSignature} />
          <TapTempo />
        </div>
      </div>
    </div>
  )
}
