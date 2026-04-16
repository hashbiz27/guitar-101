import { useProgressStore } from '@/store'
import { calculateStreak } from '@/utils/practiceUtils'
import type { StreakInfo } from '@/types'

export function useStreak(): StreakInfo {
  const sessions = useProgressStore((state) => state.progress.sessionHistory)
  return calculateStreak(sessions)
}
