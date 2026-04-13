/* Brand health scorecard from the Pinwheel assessment.
   BetterUp scores are exact (from the assessment).
   Competitor scores are ERA estimates based on public signals
   (G2/Glassdoor sentiment, content volume, market presence). */

export interface BrandHealthDim {
  dim: string
  betterup: number
  coachhub: number
  torch: number
  ezra: number
}

export const BRAND_HEALTH: BrandHealthDim[] = [
  { dim: 'Awareness',         betterup: 72, coachhub: 58, torch: 42, ezra: 48 },
  { dim: 'Perception',        betterup: 55, coachhub: 60, torch: 58, ezra: 62 },
  { dim: 'Customer Experience',betterup: 58, coachhub: 62, torch: 65, ezra: 60 },
  { dim: 'Share of Voice',    betterup: 67, coachhub: 55, torch: 38, ezra: 42 },
  { dim: 'Loyalty',           betterup: 60, coachhub: 64, torch: 68, ezra: 65 },
  { dim: 'NPS',               betterup: 56, coachhub: 60, torch: 62, ezra: 58 },
  { dim: 'Consistency',       betterup: 52, coachhub: 60, torch: 64, ezra: 66 },
  { dim: 'Employee Brand',    betterup: 32, coachhub: 55, torch: 62, ezra: 58 },
  { dim: 'Relevance',         betterup: 62, coachhub: 58, torch: 52, ezra: 54 },
  { dim: 'Vulnerability',     betterup: 41, coachhub: 55, torch: 60, ezra: 62 },
]

export const BRAND_HEALTH_NOTE =
  'BetterUp leads on awareness and share of voice. It trails the category on employee brand, vulnerability, and consistency. The brand is louder than its peers, and more fragile.'
