import type { StepperItem } from '../components'

// Inverted structure with §04 removed: the diagnostic depth now lives in the
// score breakdown drawer reachable from the gauge in §01.
export const SECTIONS: StepperItem[] = [
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'do', label: 'Do' },
  { id: 'dont', label: "Don't" },
  { id: 'proof', label: 'Proof' },
]
