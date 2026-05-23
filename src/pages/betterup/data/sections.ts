import type { StepperItem } from '../components'

// Four-section spine for the Buyer View. ▶︎01 is a one-page bento that
// carries the headline, the score, and the four problems inline as
// diagnostic tiles. ▶︎03/▶︎04 hold the P1/P2 recommendation tiers (the
// anchor IDs "do" / "dont" stay for backwards compatibility with
// existing scroll targets). ▶︎05 holds the proof.
export const SECTIONS: StepperItem[] = [
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'do', label: 'P1' },
  { id: 'dont', label: 'P2' },
  { id: 'proof', label: 'Proof' },
]
