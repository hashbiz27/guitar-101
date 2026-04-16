import { useState } from 'react'
import { cn } from '@/utils/cn'
import { usePracticeStore, useProgressStore } from '@/store'
import { usePracticeTimer } from '@/hooks/usePracticeTimer'
import ActiveSession from './ActiveSession'
import SessionForm, { type SessionFormData } from './SessionForm'
import SessionSummary from './SessionSummary'
import type { PracticeSession, SessionType } from '@/types'

type Step = 'setup' | 'active' | 'review' | 'done'

const SESSION_TYPES: { value: SessionType; label: string }[] = [
  { value: 'chords', label: 'Chords' },
  { value: 'song', label: 'Song' },
  { value: 'scales', label: 'Scales' },
  { value: 'free', label: 'Free play' },
]

const NEEDS_TARGET = new Set<SessionType>(['chords', 'song', 'scales'])

const TARGET_PLACEHOLDER: Record<SessionType, string> = {
  chords: 'e.g. G Major, barre chords…',
  song: 'Song title…',
  scales: 'e.g. C major pentatonic…',
  free: '',
}

const STEP_SUBTITLES: Record<Step, string> = {
  setup: 'Set up your session and hit start.',
  active: "Session in progress — stop when you're done.",
  review: 'How did it go?',
  done: 'Great work!',
}

export default function PracticePage() {
  const [step, setStep] = useState<Step>('setup')
  const [sessionStartISO, setSessionStartISO] = useState('')
  const [savedSession, setSavedSession] = useState<PracticeSession | null>(null)

  const {
    sessionType,
    targetLabel,
    targetChordId,
    targetSongId,
    tempoTarget,
    setSessionType,
    setTarget,
    setTempoTarget,
    reset: resetPractice,
  } = usePracticeStore()

  const { addSession } = useProgressStore()
  const { elapsedSeconds, start, stop, reset: resetTimer } = usePracticeTimer()

  const handleStart = () => {
    setSessionStartISO(new Date().toISOString())
    start()
    setStep('active')
  }

  const handleStop = () => {
    stop()
    setStep('review')
  }

  const handleSave = (data: SessionFormData) => {
    const session: PracticeSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      startedAt: sessionStartISO,
      duration: elapsedSeconds,
      type: sessionType,
      chordId: targetChordId ?? undefined,
      songId: targetSongId ?? undefined,
      targetLabel: targetLabel ?? undefined,
      tempoTarget: tempoTarget ?? undefined,
      tempoActual: data.tempoActual,
      notes: data.notes || undefined,
      rating: data.rating,
    }
    addSession(session)
    setSavedSession(session)
    resetTimer()
    resetPractice()
    setStep('done')
  }

  const handleDiscard = () => {
    resetTimer()
    resetPractice()
    setStep('setup')
  }

  const handleNewSession = () => {
    setSavedSession(null)
    setStep('setup')
  }

  return (
    <div className="max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Practice
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {STEP_SUBTITLES[step]}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        {step === 'setup' && (
          <div className="space-y-5">
            {/* Session type */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Session type
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SESSION_TYPES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSessionType(value)}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      sessionType === value
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target */}
            {NEEDS_TARGET.has(sessionType) && (
              <div className="space-y-1.5">
                <label
                  htmlFor="practice-target"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  What are you practicing?
                </label>
                <input
                  id="practice-target"
                  type="text"
                  value={targetLabel ?? ''}
                  onChange={(e) => setTarget({ label: e.target.value })}
                  placeholder={TARGET_PLACEHOLDER[sessionType]}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            )}

            {/* Tempo target */}
            <div className="space-y-1.5">
              <label
                htmlFor="practice-tempo"
                className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Target tempo{' '}
                <span className="normal-case font-normal text-slate-400">(optional)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="practice-tempo"
                  type="number"
                  min={30}
                  max={240}
                  value={tempoTarget ?? ''}
                  onChange={(e) =>
                    setTempoTarget(e.target.value ? Number(e.target.value) : null)
                  }
                  placeholder="BPM"
                  className="w-24 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleStart}
              className="w-full rounded-lg bg-brand-500 hover:bg-brand-600 py-3 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              Start session
            </button>
          </div>
        )}

        {step === 'active' && (
          <ActiveSession
            elapsedSeconds={elapsedSeconds}
            sessionType={sessionType}
            targetLabel={targetLabel}
            onStop={handleStop}
          />
        )}

        {step === 'review' && (
          <SessionForm
            elapsedSeconds={elapsedSeconds}
            sessionType={sessionType}
            targetLabel={targetLabel}
            tempoTarget={tempoTarget}
            onSave={handleSave}
            onDiscard={handleDiscard}
          />
        )}

        {step === 'done' && savedSession && (
          <SessionSummary session={savedSession} onNewSession={handleNewSession} />
        )}
      </div>
    </div>
  )
}
