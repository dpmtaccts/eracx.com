/* Generate the illustrative composite moments for /buyer-view-system from
   the JSON channel config. Deterministic via mulberry32 so the chart
   layout is stable across renders. No real client, no real brand. */

import config from './landing-illustrative.json'
import type { ChannelId, Moment } from '../pages/betterup/data/moments'

const PRIORITY_COUNT = 12

function mulberry32(seed: number) {
  let s = seed
  return function () {
    s = (s + 0x6d2b79f5) | 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Magnitude ranges mirror the audit defaults — only the channel counts,
// contradiction rates, and priority rates differ. Captions on the breaks
// come from the JSON's `captions` map.
const MAGNITUDE_RANGES: Record<string, [number, number]> = {
  ads: [1, 3],
  sponsored: [2, 4],
  owned: [3, 6],
  linkedin: [5, 12],
  agents: [8, 14],
  reviews: [9, 14],
  company: [3, 6],
  instagram: [2, 4],
  twitter: [2, 5],
  communities: [3, 7],
  thirdparty: [2, 5],
}

const SPREADS: Record<string, number> = {
  ads: 52, sponsored: 52, owned: 52, linkedin: 52,
  agents: 50, reviews: 52, company: 50,
  instagram: 48, twitter: 48, communities: 48, thirdparty: 48,
}

function generate(): Moment[] {
  const rand = mulberry32(2026)
  const rnd = (a: number, b: number) => a + rand() * (b - a)
  const out: Moment[] = []
  for (const ch of config.channels) {
    const range = MAGNITUDE_RANGES[ch.id] ?? [2, 6]
    const spread = SPREADS[ch.id] ?? 50
    for (let i = 0; i < ch.count; i++) {
      const magnitude = rnd(range[0], range[1])
      const reinforces = rand() >= ch.contradictionRate
      const x = ch.centerX + rnd(-spread, spread)
      const caption = (config.captions as Record<string, string>)[ch.id]
      out.push({
        id: `illustrative-${ch.id}-${String(i).padStart(3, '0')}`,
        channelId: ch.id as ChannelId,
        x,
        magnitude,
        reinforces,
        isPriority: false,
        capturedDay: Math.ceil(rand() * 90),
        // Generic per-channel description used in the hover tooltip + panel
        description: caption,
      })
    }
  }
  // Top contradictions by magnitude become priority breaks. This mirrors
  // the audit's logic so the chart's visual tier system reads the same.
  const contradicts = out.filter((m) => !m.reinforces).sort((a, b) => b.magnitude - a.magnitude)
  contradicts.slice(0, PRIORITY_COUNT).forEach((m) => (m.isPriority = true))
  return out
}

export const ILLUSTRATIVE_MOMENTS: readonly Moment[] = generate()
