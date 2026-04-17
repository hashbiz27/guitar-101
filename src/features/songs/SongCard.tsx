import { Link } from 'react-router-dom'
import { Music2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import FavoriteButton from './FavoriteButton'
import type { Song } from '@/types'

interface Props {
  song: Song
}

export default function SongCard({ song }: Props) {
  return (
    <Link
      to={`/songs/${song.id}`}
      className="group flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3.5 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm transition-all"
    >
      {/* Icon */}
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
        <Music2 size={16} className="text-slate-500 dark:text-slate-400" />
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
              {song.title}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{song.artist}</p>
          </div>
          <FavoriteButton songId={song.id} className="-mt-1 -mr-1 shrink-0" />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span>{song.key}</span>
          <span>{song.tempo} BPM</span>
          <span>{song.timeSignature.numerator}/{song.timeSignature.denominator}</span>
          {song.capo && <span>Capo {song.capo}</span>}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge variant={song.difficulty}>
            {song.difficulty.charAt(0).toUpperCase() + song.difficulty.slice(1)}
          </Badge>
          {song.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
