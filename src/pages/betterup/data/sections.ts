import type { StepperItem } from '../components'

// Five-section spine for the Buyer View. The Problems section names what
// is broken at priority level (P1–P4) before the P1/P2 recommendation tiers
// explain how to address it. The "do" / "dont" anchor IDs are kept for
// backwards compatibility with existing scroll targets even though the nav
// labels now read P1 / P2.
export const SECTIONS: StepperItem[] = [
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'problems', label: 'Problems' },
  { id: 'do', label: 'P1' },
  { id: 'dont', label: 'P2' },
  { id: 'proof', label: 'Proof' },
]
