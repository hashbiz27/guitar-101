import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileNav from './MobileNav'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  children: ReactNode
}

export default function AppShell({ children }: Props) {
  const { isDark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* ── Desktop sidebar (fixed, hidden below lg) ───────────────── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-sidebar flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        <Sidebar isDark={isDark} onThemeToggle={toggle} />
      </aside>

      {/* ── Main column, offset right of the sidebar on desktop ────── */}
      <div className="flex min-h-screen flex-col lg:pl-sidebar">
        {/* Mobile top header */}
        <Header isDark={isDark} onThemeToggle={toggle} />

        {/* Page content — extra bottom padding on mobile for the nav bar */}
        <main className="flex-1 px-4 py-6 pb-24 lg:px-8 lg:py-8 lg:pb-8">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom tab bar ────────────────────────────────────── */}
      <MobileNav />
    </div>
  )
}
