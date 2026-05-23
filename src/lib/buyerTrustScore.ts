export const BUYER_TRUST_WEIGHTS = {
  brandCascade: 0.25,
  gtmSignalChain: 0.35,
  contentToPipeline: 0.25,
  aiMirror: 0.15,
} as const

export type DiagnosticKey = keyof typeof BUYER_TRUST_WEIGHTS

export type DiagnosticScores = {
  brandCascade: number
  gtmSignalChain: number
  contentToPipeline: number
  aiMirror: number
}

export type ScoreBandId =
  | 'broken'
  | 'leaky'
  | 'holding'
  | 'aligned'
  | 'best-in-class'

export type ScoreBand = {
  id: ScoreBandId
  label: string
  range: [number, number]
  dragLow: number
  dragHigh: number
  shortVerdict: string
  fullVerdict: string
  costLine: string
}

export const SCORE_BANDS: ScoreBand[] = [
  {
    id: 'broken',
    label: 'Broken',
    range: [0, 25],
    dragLow: 25,
    dragHigh: 40,
    shortVerdict: 'Your pipeline is breaking.',
    fullVerdict:
      'The signal chain is failing in multiple places at once. The buyer is forming a negative impression before sales ever picks up the phone.',
    costLine: '25 to 40% of qualified pipeline, leaking before sales contact.',
  },
  {
    id: 'leaky',
    label: 'Leaky',
    range: [26, 45],
    dragLow: 15,
    dragHigh: 25,
    shortVerdict: 'Your pipeline is leaking.',
    fullVerdict:
      'There are material gaps in the signal chain, and the buyer is reading the breaks before she ever talks to your sales team.',
    costLine: '15 to 25% of qualified pipeline, leaking before sales contact.',
  },
  {
    id: 'holding',
    label: 'Holding',
    range: [46, 65],
    dragLow: 5,
    dragHigh: 15,
    shortVerdict: 'Your pipeline is holding.',
    fullVerdict:
      'The chain holds in most places, and specific links can still be sharpened to recover the remaining drag.',
    costLine: '5 to 15% of qualified pipeline, recoverable with targeted fixes.',
  },
  {
    id: 'aligned',
    label: 'Aligned',
    range: [66, 85],
    dragLow: 0,
    dragHigh: 5,
    shortVerdict: 'Your pipeline is aligned.',
    fullVerdict:
      'The chain is intact, and the work shifts from repair to the kind of optimization that compounds over time.',
    costLine: 'Drag is in the 0 to 5% range, which means the chain is doing its job.',
  },
  {
    id: 'best-in-class',
    label: 'Best in class',
    range: [86, 100],
    dragLow: 0,
    dragHigh: 2,
    shortVerdict: 'Your pipeline is best in class.',
    fullVerdict:
      'The signal chain operates at category-leading strength, and the score itself becomes a moat that newer competitors cannot copy without years of investment.',
    costLine: 'Drag is negligible, and the signal chain reads as a competitive advantage.',
  },
]

// v4 band spectrum: broken → leaky → holding → aligned → best-in-class
// maps to hot magenta → rust → yellow → cobalt → ink. The order encodes
// "warning side" (broken/leaky) vs "safe side" (aligned/best-in-class).
export const BAND_COLORS: Record<ScoreBandId, string> = {
  'broken': '#E6195F',
  'leaky': '#DD5C20',
  'holding': '#F4C430',
  'aligned': '#1845C2',
  'best-in-class': '#0A0A0A',
}

// Verdict text uses warning-side hot magenta for broken/leaky and ink for
// holding+. The yellow holding ground is too bright for verdict text.
export const BAND_VERDICT_COLORS: Record<ScoreBandId, string> = {
  'broken': '#E6195F',
  'leaky': '#E6195F',
  'holding': '#0A0A0A',
  'aligned': '#0A0A0A',
  'best-in-class': '#0A0A0A',
}

// Display labels for the four diagnostics. Internal keys preserved so the
// scoring math and audit instance data structures continue to work; only the
// rendered text changes. Full names appear in section headlines and opener
// blocks; short names appear in score anatomy, gauge drawer, navigation, and
// compact UI contexts.
export const DIAGNOSTIC_LABELS: Record<DiagnosticKey, { full: string; short: string }> = {
  brandCascade: {
    full: 'What employees say about you',
    short: 'Employees',
  },
  gtmSignalChain: {
    full: 'What your leaders publish',
    short: 'Leaders',
  },
  contentToPipeline: {
    full: 'What you publish about yourself',
    short: 'Your content',
  },
  aiMirror: {
    full: 'What agents say about you',
    short: 'Agents',
  },
} as const

// Diagnostic accent colors, one per diagnostic, used to tie ▶︎03 move
// cards to their ▶︎05 evidence sub-sections.
export const DIAGNOSTIC_COLORS: Record<DiagnosticKey, string> = {
  brandCascade: '#DD5C20', // rust
  gtmSignalChain: '#1845C2', // cobalt
  contentToPipeline: '#F4C430', // yellow
  aiMirror: '#E6195F', // hot magenta
}

export const DIAGNOSTIC_META: Record<
  DiagnosticKey,
  { label: string; weight: number; order: number }
> = {
  gtmSignalChain: { label: DIAGNOSTIC_LABELS.gtmSignalChain.short, weight: BUYER_TRUST_WEIGHTS.gtmSignalChain, order: 1 },
  brandCascade: { label: DIAGNOSTIC_LABELS.brandCascade.short, weight: BUYER_TRUST_WEIGHTS.brandCascade, order: 2 },
  contentToPipeline: { label: DIAGNOSTIC_LABELS.contentToPipeline.short, weight: BUYER_TRUST_WEIGHTS.contentToPipeline, order: 3 },
  aiMirror: { label: DIAGNOSTIC_LABELS.aiMirror.short, weight: BUYER_TRUST_WEIGHTS.aiMirror, order: 4 },
}

export function computeBuyerTrustScore(scores: DiagnosticScores): number {
  return Math.round(
    scores.brandCascade * BUYER_TRUST_WEIGHTS.brandCascade +
      scores.gtmSignalChain * BUYER_TRUST_WEIGHTS.gtmSignalChain +
      scores.contentToPipeline * BUYER_TRUST_WEIGHTS.contentToPipeline +
      scores.aiMirror * BUYER_TRUST_WEIGHTS.aiMirror
  )
}

export function getScoreBand(score: number): ScoreBand {
  return (
    SCORE_BANDS.find((band) => score >= band.range[0] && score <= band.range[1]) ?? SCORE_BANDS[0]
  )
}

export function getBandColor(score: number): string {
  return BAND_COLORS[getScoreBand(score).id]
}

export function getBandVerdictColor(score: number): string {
  return BAND_VERDICT_COLORS[getScoreBand(score).id]
}

export function computeWeightedContribution(diagnostic: DiagnosticKey, score: number): number {
  return Math.round(score * BUYER_TRUST_WEIGHTS[diagnostic] * 100) / 100
}

export type DiagnosticRow = {
  key: DiagnosticKey
  label: string
  score: number
  weight: number
  contribution: number
  bandColor: string
}

export function diagnosticRows(scores: DiagnosticScores): DiagnosticRow[] {
  const keys = (Object.keys(DIAGNOSTIC_META) as DiagnosticKey[]).sort(
    (a, b) => DIAGNOSTIC_META[a].order - DIAGNOSTIC_META[b].order
  )
  return keys.map((key) => ({
    key,
    label: DIAGNOSTIC_META[key].label,
    score: scores[key],
    weight: BUYER_TRUST_WEIGHTS[key],
    contribution: computeWeightedContribution(key, scores[key]),
    bandColor: getBandColor(scores[key]),
  }))
}

export function percentDelta(current: number, projected: number): number {
  if (!current) return 0
  return Math.round(((projected - current) / current) * 100)
}
