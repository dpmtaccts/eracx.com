/* Insight-list types — the seven-statement spine of the BetterUp audit. */

export type ImpactLevel = 'low' | 'medium' | 'medium-high' | 'high' | 'very-high'
export type ScopeLevel = 'low' | 'low-medium' | 'medium' | 'high'

export type ExecuteStep = string | { title: string; body: string | readonly string[] }

export type ExecuteBlock = {
  from: string
  to: string
  steps: readonly ExecuteStep[]
  /** Derived effort line, anchored to the card's scope bar. */
  effort?: string
  /** Optional boundary statement (used on §03 — the integrity guardrail). */
  boundary?: string
}

export type BentoStub = {
  kind: 'stub'
  blocks: string[]
}

export type BentoSeismograph = {
  kind: 'seismograph'
}

export type BentoRich = {
  kind: 'rich'
  slot: 'leaders' | 'agents' | 'content' | 'employees' | 'buyers' | 'closer'
}

export type Bento = BentoStub | BentoSeismograph | BentoRich

export type StatementKind = 'frame' | 'move' | 'urgency' | 'closer'

export type Statement = {
  n: number
  kind: StatementKind
  anchor: string
  headline: string
  goDos?: readonly string[]
  leadLine?: string
  impact: ImpactLevel | null
  scope: ScopeLevel | null
  verdict: string
  highestLeverage?: boolean
  drawer: {
    insight: string
    meaning: string
    execute: ExecuteBlock
    assumptions: string
    bento: Bento
  }
}

export const IMPACT_PCT: Record<ImpactLevel, number> = {
  low: 20,
  medium: 45,
  'medium-high': 62,
  high: 70,
  'very-high': 90,
}

export const SCOPE_PCT: Record<ScopeLevel, number> = {
  low: 20,
  'low-medium': 30,
  medium: 45,
  high: 70,
}

export const IMPACT_LABEL: Record<ImpactLevel, string> = {
  low: 'LOW',
  medium: 'MEDIUM',
  'medium-high': 'MEDIUM-HIGH',
  high: 'HIGH',
  'very-high': 'VERY HIGH',
}

export const SCOPE_LABEL: Record<ScopeLevel, string> = {
  low: 'LOW',
  'low-medium': 'LOW-MEDIUM',
  medium: 'MEDIUM',
  high: 'HIGH',
}

/* Pillar accent per statement. Used only as a block accent — left keyline of
   the open band, TO-card top keyline, drawer-label tick. Never as body or
   label text. Neutral ink for the frame, urgency, and closer rows. */
export const PILLAR_COLOR: Record<number, string> = {
  1: '#0A0A0A',
  2: '#1845C2', // Leaders · cobalt
  3: '#E6195F', // Agents · hot
  4: '#F4C430', // Content · owned yellow
  5: '#DD5C20', // Employees · glassdoor rust
  6: '#0A0A0A',
  7: '#0A0A0A',
}

export const PAGE_LINE = 'rgba(10, 10, 10, 0.15)' // the single light keyline
