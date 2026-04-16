import { Moon, Sun, Music } from 'lucide-react'

interface Props {
  isDark: boolean
  onThemeToggle: () => void
}

/**
 * Mobile-only top header. Hidden on lg+ screens where the sidebar takes over.
 */
export default function Header({ isDark, onThemeToggle }: Props) {
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 lg:hidden">
      <div className="flex items-center gap-2">
        <Music size={20} className="text-brand-500" />
        <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Guitar 101
        </span>
      </div>

      <button
        onClick={onThemeToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  )
}
