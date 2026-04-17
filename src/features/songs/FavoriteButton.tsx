import { Heart } from 'lucide-react'
import { useSongStore } from '@/store'
import { cn } from '@/utils/cn'

interface Props {
  songId: string
  className?: string
}

export default function FavoriteButton({ songId, className }: Props) {
  const { isFavorite, toggleFavorite } = useSongStore()
  const active = isFavorite(songId)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        toggleFavorite(songId)
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-2 transition-colors',
        'hover:bg-rose-50 dark:hover:bg-rose-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        className,
      )}
    >
      <Heart
        size={18}
        className={cn(
          'transition-colors',
          active
            ? 'fill-rose-500 stroke-rose-500'
            : 'stroke-slate-400 dark:stroke-slate-500',
        )}
      />
    </button>
  )
}
