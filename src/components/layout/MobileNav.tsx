import { NavLink } from 'react-router-dom'
import { navItems } from './navItems'
import { cn } from '@/utils/cn'

/**
 * Fixed bottom tab bar for mobile. Hidden on lg+ screens.
 */
export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex h-16 items-stretch border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 lg:hidden">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors',
              isActive
                ? 'text-brand-500 dark:text-brand-400'
                : 'text-slate-400 dark:text-slate-500',
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={22} className={cn(isActive && 'drop-shadow-sm')} />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
