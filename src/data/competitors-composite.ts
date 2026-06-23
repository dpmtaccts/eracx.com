/* Illustrative composite competitor data for the /buyerview "Competitors"
   column. THIS IS NOT A REAL AUDIT and these are NOT real competitors — the
   per-channel values are hand-authored so each silhouette reads differently
   (two brands ahead of the audited brand, one behind). The minis reuse the
   hero seismograph's channel geometry and congruence envelope; only the
   per-channel direction and magnitude live here. No visible disclosure is
   rendered for these (intentionally), so this comment is the record. */

import type { ChannelId } from '../pages/betterup/data/moments'

/** One channel reading for a mini silhouette.
 *  d = direction (1 up / reinforcing, -1 down / contradicting).
 *  m = magnitude 0..1, before the shared envelope scales it by x. */
export type MiniChannel = { id: ChannelId; d: 1 | -1; m: number }

/** A competitor's standing versus the audited brand. */
export type CompetitorStatus = 'ahead' | 'behind'

export type Competitor = {
  name: string
  status: CompetitorStatus
  channels: MiniChannel[]
}

/** Status → silhouette + band + arrow color. */
export const STATUS_COLOR: Record<CompetitorStatus, string> = {
  ahead: '#E6195F', // magenta
  behind: '#0A0A0A', // ink
}

/** Status → arrow glyph shown in the mini header. */
export const STATUS_ARROW: Record<CompetitorStatus, string> = {
  ahead: '↑',
  behind: '↓',
}

export const COMPETITORS: readonly Competitor[] = [
  // Competitor A — strong, full bell; the core reinforces hard.
  {
    name: 'Competitor A',
    status: 'ahead',
    channels: [
      { id: 'ads', d: 1, m: 0.55 },
      { id: 'sponsored', d: 1, m: 0.55 },
      { id: 'owned', d: 1, m: 0.7 },
      { id: 'linkedin', d: 1, m: 0.85 },
      { id: 'agents', d: 1, m: 0.95 },
      { id: 'reviews', d: 1, m: 0.82 },
      { id: 'company', d: 1, m: 0.65 },
      { id: 'instagram', d: 1, m: 0.5 },
      { id: 'twitter', d: 1, m: 0.55 },
      { id: 'communities', d: 1, m: 0.62 },
      { id: 'thirdparty', d: 1, m: 0.55 },
    ],
  },
  // Competitor B — also ahead, but weighted toward reviews so its silhouette
  // differs from A (reviews peak, agents a touch lower).
  {
    name: 'Competitor B',
    status: 'ahead',
    channels: [
      { id: 'ads', d: 1, m: 0.5 },
      { id: 'sponsored', d: 1, m: 0.5 },
      { id: 'owned', d: 1, m: 0.62 },
      { id: 'linkedin', d: 1, m: 0.8 },
      { id: 'agents', d: 1, m: 0.78 },
      { id: 'reviews', d: 1, m: 0.9 },
      { id: 'company', d: 1, m: 0.6 },
      { id: 'instagram', d: 1, m: 0.48 },
      { id: 'twitter', d: 1, m: 0.5 },
      { id: 'communities', d: 1, m: 0.58 },
      { id: 'thirdparty', d: 1, m: 0.5 },
    ],
  },
  // Competitor C — behind: the credible core breaks down (agents, reviews,
  // communities and twitter contradict).
  {
    name: 'Competitor C',
    status: 'behind',
    channels: [
      { id: 'ads', d: 1, m: 0.45 },
      { id: 'sponsored', d: -1, m: 0.45 },
      { id: 'owned', d: 1, m: 0.42 },
      { id: 'linkedin', d: 1, m: 0.42 },
      { id: 'agents', d: -1, m: 0.72 },
      { id: 'reviews', d: -1, m: 0.68 },
      { id: 'company', d: 1, m: 0.35 },
      { id: 'instagram', d: 1, m: 0.32 },
      { id: 'twitter', d: -1, m: 0.5 },
      { id: 'communities', d: -1, m: 0.55 },
      { id: 'thirdparty', d: -1, m: 0.45 },
    ],
  },
]
