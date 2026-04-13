/* Per-profile presentation data: avatar initials, color, posting cadence, commenter mix. */

import type { GTMChannel } from './gtm'

export interface ProfileVisuals {
  initials: string
  color: 'rust' | 'sky' | 'magenta' | 'amber' | 'green'
  /** path under /public, or null for synthesized avatar */
  photo: string | null
  /** monthly post counts, oldest -> newest, ~12 months */
  cadence: number[]
}

export const PROFILE_VISUALS: Record<GTMChannel['id'], ProfileVisuals> = {
  ceo:        { initials: 'AR', color: 'rust',    photo: '/images/betterup/alexi.jpeg',         cadence: [0, 1, 0, 2, 0, 0, 1, 0, 3, 1, 0, 3] },
  marketing:  { initials: 'AS', color: 'magenta', photo: '/images/betterup/amy.jpeg',           cadence: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1] },
  sales:      { initials: 'JC', color: 'sky',     photo: '/images/betterup/jonathanchang.jpeg', cadence: [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1] },
  accounts:   { initials: 'WM', color: 'amber',   photo: '/images/betterup/willi.jpeg',         cadence: [1, 0, 1, 1, 0, 1, 0, 2, 1, 0, 2, 1] },
  coaches:    { initials: 'CN', color: 'green',   photo: null,                                  cadence: [4, 5, 3, 6, 4, 5, 5, 4, 6, 5, 5, 4] },
  champions:  { initials: 'CC', color: 'sky',     photo: null,                                  cadence: [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0] },
}

/* Note: Amy L. Cole has her own photo (amycole.jpeg) but isn't a current channel.
   Kept here so the tab can swap if the channel definition changes. */
export const ALT_PHOTOS = {
  amyCole: '/images/betterup/amycole.jpeg',
}

export const ALEXI_COMMENTER_MIX = [
  { label: 'BetterUp employees',  pct: 40, color: 'rust' as const },
  { label: 'Former employees',    pct: 22, color: 'red' as const },
  { label: 'Personal network',    pct: 11, color: 'amber' as const },
  { label: 'Investors',           pct: 9,  color: 'magenta' as const },
  { label: 'Coaches',             pct: 7,  color: 'sky' as const },
  { label: 'External practitioners', pct: 7, color: 'textMuted' as const },
  { label: 'Enterprise buyers',   pct: 0,  color: 'green' as const, ghost: true },
]

export const NETWORK_REACH = {
  brandPage: { label: 'Company page followers', value: 241000, format: '241K' },
  human: [
    { label: 'CEO',           value: 48000, format: '48K' },
    { label: 'Coach network', value: 800000, format: '~800K (4,000 coaches × ~200 connections)' },
    { label: 'Sales + Accounts', value: 12000, format: '~12K combined' },
    { label: 'Marketing leadership', value: 8000, format: '~8K' },
  ],
  combinedHuman: 868000,
  combinedHumanFormat: '~868K',
  multiplier: '3.6×',
}
