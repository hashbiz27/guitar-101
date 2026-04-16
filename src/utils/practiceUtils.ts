import type { PracticeSession, StreakInfo } from '@/types'

/** Format seconds into "m:ss" or "h:mm:ss" string */
export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Calculate streak from a reverse-chronological list of sessions */
export function calculateStreak(sessions: PracticeSession[]): StreakInfo {
  if (sessions.length === 0) {
    return { current: 0, longest: 0 }
  }

  const uniqueDates = Array.from(new Set(sessions.map((s) => s.date))).sort(
    (a, b) => b.localeCompare(a),
  )

  let current = 0
  let longest = 0
  let streak = 1
  const today = new Date().toISOString().slice(0, 10)

  // Start streak from today or yesterday
  if (uniqueDates[0] !== today) {
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
    if (uniqueDates[0] !== yesterday) {
      return { current: 0, longest: 1, lastPracticeDate: uniqueDates[0] }
    }
  }

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1])
    const curr = new Date(uniqueDates[i])
    const diffDays = Math.round((prev.getTime() - curr.getTime()) / 86_400_000)
    if (diffDays === 1) {
      streak++
    } else {
      if (streak > longest) longest = streak
      streak = 1
    }
  }

  if (streak > longest) longest = streak
  current = streak

  return { current, longest, lastPracticeDate: uniqueDates[0] }
}
