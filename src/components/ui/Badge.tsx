import { cn } from '@/utils/cn'

export type BadgeVariant = 'default' | 'beginner' | 'intermediate' | 'advanced'

interface Props {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default:      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  beginner:     'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400',
  intermediate: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400',
  advanced:     'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400',
}

export default function Badge({ children, variant = 'default', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
