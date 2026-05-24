import type { StepperItem } from '../components'

// Four-section spine for the Buyer View. ▶︎01 is a one-page bento that
// carries the headline, the score, and the four problems inline as
// diagnostic tiles. ▶︎03 carries "The Four Decisions" (recommendations);
// ▶︎04 carries "The Four Motions" (resist these). The anchor IDs
// "do" / "dont" stay for backwards compatibility with existing scroll
// targets. ▶︎05 holds the proof.
export const SECTIONS: StepperItem[] = [
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'do', label: 'The Four Decisions' },
  { id: 'dont', label: 'The Four Motions' },
  { id: 'proof', label: 'Proof' },
]
