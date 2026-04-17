import { NavLink } from 'react-router-dom'
import { Moon, Sun, Music } from 'lucide-react'
import { navItems } from './navItems'
import { cn } from '@/utils/cn'

interface Props {
  isDark: boolean
  onThemeToggle: () => void
}

export default function Sidebar({ isDark, onThemeToggle }: Props) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo / wordmark */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-slate-200 dark:border-slate-800 px-5">
        <Music size={22} className="text-brand-500 shrink-0" />
        <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Guitar 101
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className={cn(
                    'shrink-0 transition-colors',
                    isActive
                      ? 'text-brand-500 dark:text-brand-400'
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300',
                  )}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Dark mode toggle */}
      <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 px-3 py-3">
        <button
          onClick={onThemeToggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
        >
          {isDark ? (
            <Sun size={18} className="shrink-0 text-slate-400 dark:text-slate-500" />
          ) : (
            <Moon size={18} className="shrink-0 text-slate-400" />
          )}
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </div>
  )
}
