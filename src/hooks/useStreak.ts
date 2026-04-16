import type { StreakInfo } from '@/types'

/**
 * useStreak — computes the current and longest practice streak from session history.
 * Uses date-fns for date arithmetic.
 */
export function useStreak(): StreakInfo {
  // TODO: implement streak calculation using date-fns
  return { current: 0, longest: 0 }
}
