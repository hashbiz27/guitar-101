/**
 * Geometry helpers for the ChordDiagram SVG renderer.
 */

export interface DiagramLayout {
  width: number
  height: number
  stringSpacing: number
  fretSpacing: number
  dotRadius: number
  padding: { top: number; right: number; bottom: number; left: number }
}

export function getDefaultLayout(
  numFrets = 4,
  overrides: Partial<DiagramLayout> = {},
): DiagramLayout {
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
    ...overrides,
  }
}

/** X coordinate of a string (1 = high E on the right side) */
export function stringX(string: number, layout: DiagramLayout): number {
  return layout.padding.left + (6 - string) * layout.stringSpacing
}

/** Y coordinate of a fret position (fret 1 = just below nut) */
export function fretY(fret: number, layout: DiagramLayout): number {
  return layout.padding.top + (fret - 0.5) * layout.fretSpacing
}
