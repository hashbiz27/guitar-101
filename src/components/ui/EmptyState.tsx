import type { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  title: string
  description?: string
}

export default function EmptyState({ icon: Icon, title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 rounded-full bg-slate-100 dark:bg-slate-800 p-4">
        <Icon size={28} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-xs text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
