import ChordCard from './ChordCard'
import type { Chord } from '@/types'

interface Props {
  chords: Chord[]
  learnedIds: Set<string>
}

export default function ChordGrid({ chords, learnedIds }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {chords.map((chord) => (
        <ChordCard key={chord.id} chord={chord} isLearned={learnedIds.has(chord.id)} />
      ))}
    </div>
  )
}
