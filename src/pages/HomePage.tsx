import { Link } from 'react-router-dom'
import { Music2, ListMusic, Timer, Dumbbell, TrendingUp, type LucideIcon } from 'lucide-react'

interface SectionCard {
  to: string
  icon: LucideIcon
  label: string
  description: string
  iconBg: string
  iconColor: string
}

const sections: SectionCard[] = [
  {
    to: '/chords',
    icon: Music2,
    label: 'Chords',
    description: 'Browse diagrams and learn finger positions for open and barre chords',
    iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-500',
  },
  {
    to: '/songs',
    icon: ListMusic,
    label: 'Songs',
    description: 'Learn beginner-friendly songs with chord progressions and strumming patterns',
    iconBg: 'bg-sky-50 dark:bg-sky-950/40',
    iconColor: 'text-sky-500',
  },
  {
    to: '/metronome',
    icon: Timer,
    label: 'Metronome',
    description: 'Keep steady time with an adjustable metronome and tap-tempo',
    iconBg: 'bg-violet-50 dark:bg-violet-950/40',
    iconColor: 'text-violet-500',
  },
  {
    to: '/practice',
    icon: Dumbbell,
    label: 'Practice',
    description: 'Log timed sessions, rate your performance, and add notes',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-500',
  },
  {
    to: '/progress',
    icon: TrendingUp,
    label: 'Progress',
    description: 'View your practice streak, total time, and session history',
    iconBg: 'bg-rose-50 dark:bg-rose-950/40',
    iconColor: 'text-rose-500',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Welcome to Guitar 101
        </h1>
        <p className="mt-1.5 text-slate-500 dark:text-slate-400">
          Your practice companion for beginner and intermediate guitarists.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map(({ to, icon: Icon, label, description, iconBg, iconColor }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm transition-colors"
          >
            <div className={`shrink-0 rounded-lg p-2.5 ${iconBg}`}>
              <Icon size={22} className={iconColor} />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {label}
              </div>
              <div className="mt-1 text-sm leading-snug text-slate-500 dark:text-slate-400">
                {description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
