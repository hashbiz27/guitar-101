import { Home, Music2, ListMusic, Timer, Radio, Dumbbell, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Pass end={true} so the root "/" link only activates on exact match */
  end?: boolean
}

export const navItems: NavItem[] = [
  { to: '/',           label: 'Home',      icon: Home,        end: true },
  { to: '/chords',     label: 'Chords',    icon: Music2               },
  { to: '/songs',      label: 'Songs',     icon: ListMusic            },
  { to: '/metronome',  label: 'Metronome', icon: Timer                },
  { to: '/tuner',      label: 'Tuner',     icon: Radio                },
  { to: '/practice',   label: 'Practice',  icon: Dumbbell             },
  { to: '/progress',   label: 'Progress',  icon: TrendingUp           },
]
