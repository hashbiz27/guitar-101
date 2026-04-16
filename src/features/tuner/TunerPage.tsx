import { Mic, MicOff, Square, AlertCircle } from 'lucide-react'
import { usePitchDetector } from '@/hooks/usePitchDetector'
import { cn } from '@/utils/cn'

// Open string reference pitches shown as guide badges
const OPEN_STRINGS = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

/** Maps cents (-50..+50) to a needle rotation angle in degrees (-85..+85). */
function centsToAngle(cents: number): number {
  return Math.max(-85, Math.min(85, cents * 1.7))
}

/** SVG gauge: 180° arc background + colored needle + ±5 cent green zone markers */
function TunerNeedle({ cents, inTune }: { cents: number; inTune: boolean }) {
  const angle = centsToAngle(cents)
  // Needle end point — origin is (100, 105), needle length 80
  const rad = ((angle - 90) * Math.PI) / 180
  const x2 = 100 + 80 * Math.cos(rad)
  const y2 = 105 + 80 * Math.sin(rad)

  // Green zone arc endpoints (±5 cents → ±8.5°)
  const leftRad = ((-90 - 8.5) * Math.PI) / 180
  const rightRad = ((-90 + 8.5) * Math.PI) / 180
  const gx1 = 100 + 78 * Math.cos(leftRad)
  const gy1 = 105 + 78 * Math.sin(leftRad)
  const gx2 = 100 + 78 * Math.cos(rightRad)
  const gy2 = 105 + 78 * Math.sin(rightRad)

  return (
    <svg
      viewBox="0 0 200 110"
      aria-hidden="true"
      className="w-full max-w-xs"
    >
      {/* Background arc */}
      <path
        d="M 14 105 A 86 86 0 0 1 186 105"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        className="stroke-slate-200 dark:stroke-slate-700"
      />

      {/* Green in-tune zone arc */}
      <path
        d={`M ${gx1} ${gy1} A 78 78 0 0 1 ${gx2} ${gy2}`}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        className="stroke-emerald-400 dark:stroke-emerald-500"
      />

      {/* Center tick */}
      <line
        x1="100" y1="24" x2="100" y2="34"
        strokeWidth="2"
        className="stroke-slate-400 dark:stroke-slate-500"
      />

      {/* Flat / Sharp labels */}
      <text x="18" y="98" fontSize="10" className="fill-slate-400 dark:fill-slate-500">♭</text>
      <text x="178" y="98" fontSize="10" className="fill-slate-400 dark:fill-slate-500">♯</text>

      {/* Needle */}
      <line
        x1="100" y1="105"
        x2={x2} y2={y2}
        strokeWidth="2.5"
        strokeLinecap="round"
        className={cn(
          'transition-all duration-75',
          inTune ? 'stroke-emerald-500' : 'stroke-slate-600 dark:stroke-slate-300',
        )}
      />

      {/* Pivot dot */}
      <circle cx="100" cy="105" r="4" className={cn(inTune ? 'fill-emerald-500' : 'fill-slate-500 dark:fill-slate-400')} />
    </svg>
  )
}

export default function TunerPage() {
  const { permission, noteInfo, frequency, start, stop } = usePitchDetector()
  const isActive = permission === 'granted'
  const inTune = noteInfo !== null && Math.abs(noteInfo.cents) <= 5

  return (
    <div className="max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Tuner
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Chromatic tuner — standard tuning (E A D G B e)
        </p>
      </div>

      {/* Main panel */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col items-center gap-6">

        {/* ── IDLE ── */}
        {permission === 'idle' && (
          <>
            <button
              type="button"
              onClick={start}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-label="Start tuner"
            >
              <Mic size={32} />
            </button>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Tap to start tuning
            </p>
          </>
        )}

        {/* ── REQUESTING ── */}
        {permission === 'requesting' && (
          <div className="flex flex-col items-center gap-3">
            <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Mic size={32} className="text-slate-400 dark:text-slate-500 animate-pulse" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Waiting for microphone permission…</p>
          </div>
        )}

        {/* ── DENIED / UNAVAILABLE ── */}
        {(permission === 'denied' || permission === 'unavailable') && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertCircle size={28} className="text-red-500" />
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {permission === 'unavailable'
                  ? 'Microphone not available'
                  : 'Microphone access denied'}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {permission === 'unavailable'
                  ? 'Your browser or device does not support microphone access.'
                  : 'Allow microphone access in your browser settings and try again.'}
              </p>
            </div>
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <MicOff size={15} />
              Try again
            </button>
          </div>
        )}

        {/* ── ACTIVE ── */}
        {isActive && (
          <>
            {/* Needle */}
            <TunerNeedle cents={noteInfo?.cents ?? 0} inTune={inTune} />

            {/* Note display */}
            <div className="flex flex-col items-center gap-1">
              {noteInfo ? (
                <>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={cn(
                        'text-6xl font-bold tracking-tight transition-colors',
                        inTune
                          ? 'text-emerald-500'
                          : 'text-slate-900 dark:text-slate-50',
                      )}
                    >
                      {noteInfo.note}
                    </span>
                    <span className="text-2xl text-slate-400 dark:text-slate-500 font-semibold">
                      {noteInfo.octave}
                    </span>
                  </div>
                  <p
                    className={cn(
                      'text-sm font-medium tabular-nums',
                      inTune
                        ? 'text-emerald-500'
                        : noteInfo.cents < 0
                          ? 'text-sky-500'
                          : 'text-orange-500',
                    )}
                  >
                    {inTune
                      ? '✓ In tune'
                      : `${noteInfo.cents > 0 ? '+' : ''}${noteInfo.cents} cents`}
                  </p>
                  {frequency && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      {frequency.toFixed(1)} Hz
                    </p>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-5xl font-bold text-slate-300 dark:text-slate-600">–</span>
                  <p className="text-sm text-slate-400 dark:text-slate-500">Play a note…</p>
                </div>
              )}
            </div>

            {/* Stop button */}
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Square size={14} className="fill-current" />
              Stop
            </button>
          </>
        )}
      </div>

      {/* Open string reference */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Open strings
        </p>
        <div className="flex flex-wrap gap-2">
          {OPEN_STRINGS.map((s) => (
            <span
              key={s}
              className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-mono text-slate-600 dark:text-slate-400"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
