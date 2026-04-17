import type { Chord, GuitarString } from '@/types'
import { getDefaultLayout, stringX, fretY, computeStartFret } from '@/utils/svgUtils'
import { cn } from '@/utils/cn'

const ALL_STRINGS: GuitarString[] = [6, 5, 4, 3, 2, 1]
const NUM_FRETS = 4

interface Props {
  chord: Chord
  className?: string
}

export default function ChordDiagram({ chord, className }: Props) {
  const layout = getDefaultLayout(NUM_FRETS)
  const { width, height, padding, fretSpacing, dotRadius } = layout
  const startFret = computeStartFret(chord)
  const showNut = startFret === 1

  /** Translate an actual fret number to a diagram-relative position (1-based) */
  const diagFret = (fret: number) => fret - startFret + 1

  const nutY = padding.top
  const bottomY = padding.top + NUM_FRETS * fretSpacing
  const leftX = stringX(6, layout)
  const rightX = stringX(1, layout)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-label={`${chord.fullName} chord diagram`}
      className={cn('overflow-visible', className)}
    >
      {/* ── X / O string indicators above the nut ─────────────────── */}
      {ALL_STRINGS.map((s) => {
        const muted = chord.mutedStrings.includes(s)
        const open = chord.openStrings.includes(s)
        if (!muted && !open) return null
        const cx = stringX(s, layout)
        const cy = padding.top / 2
        return muted ? (
          // Muted: two crossing lines
          <g key={s}>
            <line
              x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5}
              strokeWidth={1.8} strokeLinecap="round"
              className="stroke-slate-400 dark:stroke-slate-500"
            />
            <line
              x1={cx + 5} y1={cy - 5} x2={cx - 5} y2={cy + 5}
              strokeWidth={1.8} strokeLinecap="round"
              className="stroke-slate-400 dark:stroke-slate-500"
            />
          </g>
        ) : (
          // Open: small hollow circle
          <circle
            key={s}
            cx={cx} cy={cy} r={5}
            strokeWidth={1.8} fill="none"
            className="stroke-slate-400 dark:stroke-slate-500"
          />
        )
      })}

      {/* ── Nut (thick bar at top if chord starts at fret 1) ────────── */}
      {showNut && (
        <rect
          x={leftX - 1} y={nutY - 4}
          width={rightX - leftX + 2} height={6}
          rx={2}
          className="fill-slate-800 dark:fill-slate-200"
        />
      )}

      {/* ── Start-fret label (when diagram doesn't start at fret 1) ── */}
      {!showNut && (
        <text
          x={leftX - 8} y={fretY(1, layout)}
          textAnchor="end" dominantBaseline="central"
          fontSize={10} fontWeight={600}
          className="fill-slate-500 dark:fill-slate-400"
        >
          {startFret}fr
        </text>
      )}

      {/* ── Vertical string lines ───────────────────────────────────── */}
      {ALL_STRINGS.map((s) => (
        <line
          key={s}
          x1={stringX(s, layout)} y1={nutY}
          x2={stringX(s, layout)} y2={bottomY}
          strokeWidth={s === 6 ? 1.5 : 1}
          className="stroke-slate-300 dark:stroke-slate-600"
        />
      ))}

      {/* ── Horizontal fret lines ───────────────────────────────────── */}
      {Array.from({ length: NUM_FRETS }, (_, i) => i + 1).map((n) => (
        <line
          key={n}
          x1={leftX} y1={nutY + n * fretSpacing}
          x2={rightX} y2={nutY + n * fretSpacing}
          strokeWidth={0.75}
          className="stroke-slate-300 dark:stroke-slate-600"
        />
      ))}

      {/* ── Barre bar ───────────────────────────────────────────────── */}
      {chord.barre && (() => {
        const df = diagFret(chord.barre.fret)
        if (df < 1 || df > NUM_FRETS) return null
        const cy = fretY(df, layout)
        const x1 = stringX(chord.barre.fromString, layout)
        const x2 = stringX(chord.barre.toString, layout)
        return (
          <line
            x1={x1} y1={cy} x2={x2} y2={cy}
            strokeWidth={dotRadius * 2}
            strokeLinecap="round"
            className="stroke-slate-800 dark:stroke-slate-200"
          />
        )
      })()}

      {/* ── Finger position dots ────────────────────────────────────── */}
      {chord.positions.map((pos, i) => {
        if (pos.fret === 0) return null
        const df = diagFret(pos.fret)
        if (df < 1 || df > NUM_FRETS) return null
        const cx = stringX(pos.string, layout)
        const cy = fretY(df, layout)
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={dotRadius}
              className="fill-slate-800 dark:fill-slate-200"
            />
            <text
              x={cx} y={cy}
              textAnchor="middle" dominantBaseline="central"
              fontSize={11} fontWeight={600}
              className="fill-white dark:fill-slate-900 select-none pointer-events-none"
            >
              {pos.finger}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
