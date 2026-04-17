import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

interface Props {
  value: number
  onChange?: (v: number) => void
  size?: 'sm' | 'md'
  className?: string
}

export default function StarRating({ value, onChange, size = 'md', className }: Props) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value
  const iconSize = size === 'sm' ? 13 : 20
  const readonly = !onChange

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={cn(
            'transition-transform',
            !readonly && 'cursor-pointer hover:scale-110',
            readonly && 'cursor-default pointer-events-none',
          )}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          <Star
            size={iconSize}
            className={cn(
              'transition-colors',
              star <= active
                ? 'fill-brand-400 stroke-brand-400'
                : 'fill-transparent stroke-slate-300 dark:stroke-slate-600',
            )}
          />
        </button>
      ))}
    </div>
  )
}
