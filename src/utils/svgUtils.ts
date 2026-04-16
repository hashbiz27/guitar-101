import type { Chord, GuitarString } from '@/types'

export interface DiagramLayout {
  width: number
  height: number
  stringSpacing: number
  fretSpacing: number
  dotRadius: number
  padding: { top: number; right: number; bottom: number; left: number }
}

export function getDefaultLayout(numFrets = 4): DiagramLayout {
  const stringSpacing = 32
  const fretSpacing = 36
  const dotRadius = 10
  const padding = { top: 40, right: 20, bottom: 16, left: 28 }
  return {
    width: stringSpacing * 5 + padding.left + padding.right,
    height: fretSpacing * numFrets + padding.top + padding.bottom,
    stringSpacing,
    fretSpacing,
    dotRadius,
    padding,
  }
}

/** X coordinate for a string — string 6 (low E) on the left */
export function stringX(string: GuitarString, layout: DiagramLayout): number {
  return layout.padding.left + (6 - string) * layout.stringSpacing
}

/**
 * Y coordinate for a dot at a diagram-relative fret position.
 * diagFret=1 → between nut and first fret line.
 */
export function fretY(diagFret: number, layout: DiagramLayout): number {
  return layout.padding.top + (diagFret - 0.5) * layout.fretSpacing
}

/**
 * The fret at which to start the diagram.
 * Always 1 when the chord has open strings or uses fret 1.
 * Otherwise the lowest fret used (so the diagram doesn't waste space).
 */
export function computeStartFret(chord: Chord): number {
  if (chord.openStrings.length > 0) return 1
  const allFrets = [
    ...chord.positions.map((p) => p.fret).filter((f) => f > 0),
    ...(chord.barre ? [chord.barre.fret] : []),
  ]
  if (allFrets.length === 0) return 1
  const min = Math.min(...allFrets)
  return min <= 1 ? 1 : min
}
