// ── GTM Investment Planner v4: Staffing Model by Revenue Milestone ──────────
// Pure TypeScript module. No UI dependencies.

// ── Types ──────────────────────────────────────────────────────────────────

export interface GtmInputs {
  currentRevenue: number     // in millions
  targetRevenue: number      // in millions
  vertical: Vertical
  currentHeadcount: number   // total GTM headcount (0 = not provided)
}

export type Vertical =
  | 'SaaS'
  | 'IT Services'
  | 'Staffing'
  | 'Healthcare IT'
  | 'Fintech'
  | 'Professional Services'
  | 'Manufacturing'

export type RiskLevel = 'On track' | 'Watch' | 'At risk' | 'Critical'
export type ActionPath = 'HIRE' | 'BUY' | 'OUTSOURCE'

export interface RoleRange {
  low: number
  high: number
}

export interface OrgShape {
  aes: RoleRange
  sdrs: RoleRange
  sdrManager: RoleRange
  marketingGeneralists: RoleRange
  demandGen: RoleRange
  revops: RoleRange
  csm: RoleRange
  vpSales: boolean
  cro: boolean
  cmo: boolean
}

export interface BenchmarkMilestone {
  stage: string
  label: string
  revenueFloor: number    // millions
  revenueCeiling: number  // millions
  roles: OrgShape
  totalHeadcount: RoleRange
  annualGtmCost: RoleRange  // thousands
  keyTransition: string
}

export interface InvestmentOption {
  path: ActionPath
  description: string
  annualCost: number    // thousands
  timeToProductive: string
  isEra: boolean
}

export interface InvestmentDecision {
  function: string
  roleLabel: string
  options: InvestmentOption[]
}

export interface MilestoneResult {
  milestone: BenchmarkMilestone
  decisions: InvestmentDecision[]
  riskLevel: RiskLevel | null  // null if user didn't provide headcount
}

export interface ComparativeCallout {
  headline: string
  body: string
  overbuiltAreas: string[]
  underbuiltAreas: string[]
}

export interface GtmProjection {
  currentStage: BenchmarkMilestone
  targetStage: BenchmarkMilestone
  milestones: MilestoneResult[]
  comparativeCallout: ComparativeCallout | null
  overallRisk: RiskLevel | null
  nudge: { headline: string; body: string; ctaLabel: string }
}

// ── Benchmark Data ─────────────────────────────────────────────────────────

// Base SaaS org shapes
const SAAS_BENCHMARKS: BenchmarkMilestone[] = [
  {
    stage: 'seed',
    label: 'Early Scale',
    revenueFloor: 5,
    revenueCeiling: 10,
    roles: {
      aes: { low: 2, high: 4 },
      sdrs: { low: 0, high: 1 },
      sdrManager: { low: 0, high: 0 },
      marketingGeneralists: { low: 1, high: 2 },
      demandGen: { low: 0, high: 0 },
      revops: { low: 0, high: 0 },
      csm: { low: 0, high: 1 },
      vpSales: false,
      cro: false,
      cmo: false,
    },
    totalHeadcount: { low: 3, high: 8 },
    annualGtmCost: { low: 450, high: 1100 },
    keyTransition: 'Founder-led sales transitions to a repeatable process. First dedicated sellers join. Marketing is brand and content only.',
  },
  {
    stage: 'growth',
    label: 'Growth',
    revenueFloor: 10,
    revenueCeiling: 18,
    roles: {
      aes: { low: 4, high: 6 },
      sdrs: { low: 1, high: 3 },
      sdrManager: { low: 0, high: 0 },
      marketingGeneralists: { low: 2, high: 4 },
      demandGen: { low: 0, high: 1 },
      revops: { low: 0, high: 1 },
      csm: { low: 1, high: 2 },
      vpSales: true,
      cro: false,
      cmo: false,
    },
    totalHeadcount: { low: 9, high: 18 },
    annualGtmCost: { low: 1400, high: 2800 },
    keyTransition: 'VP Sales brings structure: comp plans, territories, forecasting. First SDRs appear but often underperform without management. Marketing starts generating leads but is not pipeline-accountable.',
  },
  {
    stage: 'scale',
    label: 'Scaling',
    revenueFloor: 18,
    revenueCeiling: 30,
    roles: {
      aes: { low: 6, high: 10 },
      sdrs: { low: 3, high: 5 },
      sdrManager: { low: 1, high: 1 },
      marketingGeneralists: { low: 3, high: 5 },
      demandGen: { low: 1, high: 2 },
      revops: { low: 1, high: 1 },
      csm: { low: 2, high: 4 },
      vpSales: true,
      cro: false,
      cmo: false,
    },
    totalHeadcount: { low: 18, high: 30 },
    annualGtmCost: { low: 2800, high: 4700 },
    keyTransition: 'Dedicated SDR management changes outbound from a side project to a real channel. First RevOps hire owns the data layer and forecasting. Marketing becomes pipeline-accountable with demand gen.',
  },
  {
    stage: 'expansion',
    label: 'Expansion',
    revenueFloor: 30,
    revenueCeiling: 50,
    roles: {
      aes: { low: 8, high: 15 },
      sdrs: { low: 4, high: 8 },
      sdrManager: { low: 1, high: 2 },
      marketingGeneralists: { low: 5, high: 8 },
      demandGen: { low: 2, high: 3 },
      revops: { low: 1, high: 2 },
      csm: { low: 3, high: 6 },
      vpSales: true,
      cro: true,
      cmo: false,
    },
    totalHeadcount: { low: 26, high: 46 },
    annualGtmCost: { low: 4500, high: 8000 },
    keyTransition: 'CRO arrives and unifies sales, marketing, CS under one revenue number. Sales segments by deal size or vertical. Marketing specializes: content, product marketing, events emerge as distinct functions.',
  },
  {
    stage: 'enterprise',
    label: 'Enterprise',
    revenueFloor: 50,
    revenueCeiling: 100,
    roles: {
      aes: { low: 12, high: 25 },
      sdrs: { low: 6, high: 12 },
      sdrManager: { low: 2, high: 3 },
      marketingGeneralists: { low: 8, high: 15 },
      demandGen: { low: 3, high: 5 },
      revops: { low: 2, high: 3 },
      csm: { low: 5, high: 10 },
      vpSales: true,
      cro: true,
      cmo: true,
    },
    totalHeadcount: { low: 40, high: 76 },
    annualGtmCost: { low: 7500, high: 14000 },
    keyTransition: 'Full GTM apparatus. CMO builds a real marketing org. RevOps scales to a team. Sales enablement, partner programs, and expansion revenue become formal functions.',
  },
]

// Vertical multipliers applied to SaaS baseline
const VERTICAL_MULTIPLIERS: Record<Vertical, { sales: number; marketing: number; cs: number }> = {
  'SaaS':                  { sales: 1.0, marketing: 1.0, cs: 1.0 },
  'IT Services':           { sales: 0.8, marketing: 0.6, cs: 1.2 },
  'Staffing':              { sales: 1.3, marketing: 0.5, cs: 0.8 },
  'Healthcare IT':         { sales: 0.9, marketing: 0.8, cs: 1.1 },
  'Fintech':               { sales: 1.0, marketing: 1.1, cs: 0.9 },
  'Professional Services': { sales: 0.7, marketing: 0.7, cs: 1.3 },
  'Manufacturing':         { sales: 0.9, marketing: 0.6, cs: 1.0 },
}

// Fully loaded cost per role (annual, thousands)
const ROLE_COSTS: Record<string, RoleRange> = {
  aes:                   { low: 140, high: 180 },
  sdrs:                  { low: 120, high: 160 },
  sdrManager:            { low: 150, high: 180 },
  marketingGeneralists:  { low: 100, high: 130 },
  demandGen:             { low: 130, high: 160 },
  revops:                { low: 130, high: 160 },
  csm:                   { low: 110, high: 140 },
  vpSales:               { low: 250, high: 350 },
  cro:                   { low: 350, high: 500 },
  cmo:                   { low: 300, high: 450 },
}

export const ROLE_LABELS: Record<string, string> = {
  aes: 'Account Executives',
  sdrs: 'SDRs / Outbound',
  sdrManager: 'SDR Manager',
  marketingGeneralists: 'Marketing',
  demandGen: 'Demand Gen',
  revops: 'RevOps',
  csm: 'Customer Success',
  vpSales: 'VP Sales',
  cro: 'CRO',
  cmo: 'CMO',
}

// Chart color mapping for each function group
export const FUNCTION_COLORS: Record<string, string> = {
  aes: '#1FA7A2',       // teal
  sdrs: '#B85C4A',      // oxide
  sdrManager: '#B85C4A',
  marketingGeneralists: '#D6B26D', // sand
  demandGen: '#D6B26D',
  revops: '#5B6670',    // gray
  csm: '#64B5B0',       // lighter teal
  vpSales: '#1FA7A2',
  cro: '#1FA7A2',
  cmo: '#D6B26D',
}

// Simplified function groups for the chart
export const FUNCTION_GROUPS = [
  { key: 'sales', label: 'Sales', color: '#1FA7A2', roles: ['aes', 'vpSales', 'cro'] },
  { key: 'outbound', label: 'SDR / Outbound', color: '#B85C4A', roles: ['sdrs', 'sdrManager'] },
  { key: 'marketing', label: 'Marketing', color: '#D6B26D', roles: ['marketingGeneralists', 'demandGen', 'cmo'] },
  { key: 'revops', label: 'RevOps', color: '#5B6670', roles: ['revops'] },
  { key: 'cs', label: 'Customer Success', color: '#64B5B0', roles: ['csm'] },
]

// ── Helpers ─────────────────────────────────────────────────────────────────

function applyMultiplier(range: RoleRange, mult: number): RoleRange {
  return {
    low: Math.max(0, Math.round(range.low * mult)),
    high: Math.max(0, Math.round(range.high * mult)),
  }
}

function midpoint(r: RoleRange): number {
  return Math.round((r.low + r.high) / 2)
}

function getBenchmarkForVertical(vertical: Vertical): BenchmarkMilestone[] {
  if (vertical === 'SaaS') return SAAS_BENCHMARKS

  const mult = VERTICAL_MULTIPLIERS[vertical]

  return SAAS_BENCHMARKS.map(m => {
    const roles: OrgShape = {
      aes: applyMultiplier(m.roles.aes, mult.sales),
      sdrs: applyMultiplier(m.roles.sdrs, mult.sales),
      sdrManager: applyMultiplier(m.roles.sdrManager, mult.sales),
      marketingGeneralists: applyMultiplier(m.roles.marketingGeneralists, mult.marketing),
      demandGen: applyMultiplier(m.roles.demandGen, mult.marketing),
      revops: m.roles.revops, // RevOps doesn't scale by vertical
      csm: applyMultiplier(m.roles.csm, mult.cs),
      vpSales: m.roles.vpSales,
      cro: m.roles.cro,
      cmo: m.roles.cmo,
    }

    // Recompute totals
    const rangeRoles: (keyof OrgShape)[] = ['aes', 'sdrs', 'sdrManager', 'marketingGeneralists', 'demandGen', 'revops', 'csm']
    const boolRoles: (keyof OrgShape)[] = ['vpSales', 'cro', 'cmo']

    let totalLow = 0, totalHigh = 0
    for (const k of rangeRoles) {
      const r = roles[k] as RoleRange
      totalLow += r.low
      totalHigh += r.high
    }
    for (const k of boolRoles) {
      if (roles[k] as boolean) { totalLow += 1; totalHigh += 1 }
    }

    // Scale cost proportionally
    const costScale = (totalLow + totalHigh) / (m.totalHeadcount.low + m.totalHeadcount.high)
    const annualGtmCost: RoleRange = {
      low: Math.round(m.annualGtmCost.low * costScale),
      high: Math.round(m.annualGtmCost.high * costScale),
    }

    return { ...m, roles, totalHeadcount: { low: totalLow, high: totalHigh }, annualGtmCost }
  })
}

function findStage(revenue: number, benchmarks: BenchmarkMilestone[]): BenchmarkMilestone {
  for (let i = benchmarks.length - 1; i >= 0; i--) {
    if (revenue >= benchmarks[i].revenueFloor) return benchmarks[i]
  }
  return benchmarks[0]
}

export function getHeadcountByGroup(roles: OrgShape): { key: string; label: string; color: string; count: number }[] {
  return FUNCTION_GROUPS.map(g => {
    let count = 0
    for (const roleKey of g.roles) {
      const val = roles[roleKey as keyof OrgShape]
      if (typeof val === 'boolean') {
        count += val ? 1 : 0
      } else {
        count += midpoint(val as RoleRange)
      }
    }
    return { key: g.key, label: g.label, color: g.color, count }
  })
}

// ── Investment decisions ────────────────────────────────────────────────────

function generateDecisions(
  prev: BenchmarkMilestone,
  next: BenchmarkMilestone,
): InvestmentDecision[] {
  const decisions: InvestmentDecision[] = []
  const rangeRoles: (keyof OrgShape)[] = ['aes', 'sdrs', 'sdrManager', 'marketingGeneralists', 'demandGen', 'revops', 'csm']

  for (const key of rangeRoles) {
    const prevMid = midpoint(prev.roles[key] as RoleRange)
    const nextMid = midpoint(next.roles[key] as RoleRange)
    const delta = nextMid - prevMid

    if (delta <= 0) continue

    const cost = ROLE_COSTS[key]
    const label = ROLE_LABELS[key]
    const totalHireCost = delta * midpoint(cost)

    const options: InvestmentOption[] = [
      {
        path: 'HIRE',
        description: `${delta} ${label}`,
        annualCost: totalHireCost,
        timeToProductive: key === 'sdrs' ? '3-6 months' : key === 'aes' ? '4-6 months' : '2-3 months',
        isEra: false,
      },
    ]

    // Add BUY option for certain roles
    if (key === 'revops') {
      options.push({
        path: 'BUY',
        description: 'RevOps tooling (HubSpot, Salesforce admin, etc.)',
        annualCost: Math.round(totalHireCost * 0.3),
        timeToProductive: '1-2 months',
        isEra: false,
      })
    }
    if (key === 'demandGen') {
      options.push({
        path: 'BUY',
        description: 'Demand gen stack (paid, content syndication)',
        annualCost: Math.round(totalHireCost * 0.5),
        timeToProductive: '1-2 months',
        isEra: false,
      })
    }

    // Add OUTSOURCE option for SDR/outbound
    if (key === 'sdrs' || key === 'sdrManager') {
      options.push({
        path: 'OUTSOURCE',
        description: 'Managed outbound system (pipeline generation)',
        annualCost: 180, // ~$15K/mo
        timeToProductive: '2-4 weeks',
        isEra: true,
      })
    }

    // Add OUTSOURCE for marketing generalists
    if (key === 'marketingGeneralists') {
      options.push({
        path: 'OUTSOURCE',
        description: 'Fractional marketing team',
        annualCost: Math.round(totalHireCost * 0.6),
        timeToProductive: '2-4 weeks',
        isEra: false,
      })
    }

    decisions.push({ function: key, roleLabel: label, options })
  }

  // Leadership transitions
  const boolTransitions: { key: keyof OrgShape; label: string }[] = [
    { key: 'vpSales', label: 'VP Sales' },
    { key: 'cro', label: 'CRO' },
    { key: 'cmo', label: 'CMO' },
  ]

  for (const { key, label } of boolTransitions) {
    if (!prev.roles[key] && next.roles[key]) {
      const cost = ROLE_COSTS[key]
      decisions.push({
        function: key,
        roleLabel: label,
        options: [
          {
            path: 'HIRE',
            description: label,
            annualCost: midpoint(cost),
            timeToProductive: '3-6 months',
            isEra: false,
          },
          {
            path: 'OUTSOURCE',
            description: `Fractional ${label}`,
            annualCost: Math.round(midpoint(cost) * 0.4),
            timeToProductive: '2-4 weeks',
            isEra: false,
          },
        ],
      })
    }
  }

  return decisions
}

// ── Comparative callout ─────────────────────────────────────────────────────

function generateComparative(
  inputs: GtmInputs,
  currentBenchmark: BenchmarkMilestone,
): ComparativeCallout | null {
  if (inputs.currentHeadcount <= 0) return null

  const benchLow = currentBenchmark.totalHeadcount.low
  const benchHigh = currentBenchmark.totalHeadcount.high
  const actual = inputs.currentHeadcount

  const overbuiltAreas: string[] = []
  const underbuiltAreas: string[] = []

  // Determine overall position
  let headline: string
  let body: string

  if (actual > benchHigh) {
    headline = `You're at $${inputs.currentRevenue}M with ${actual} GTM headcount. Companies at your stage typically have ${benchLow}-${benchHigh}.`
    body = 'Your team is larger than the benchmark. This can mean strong investment ahead of growth, or it can mean the team is not producing proportional revenue. The question is whether adding more headcount or reallocating to different functions will unlock the next stage.'
    overbuiltAreas.push('total headcount')
  } else if (actual < benchLow) {
    headline = `You're at $${inputs.currentRevenue}M with ${actual} GTM headcount. Companies at your stage typically have ${benchLow}-${benchHigh}.`
    body = 'Your team is leaner than the benchmark. You may be running efficiently or underinvesting in the infrastructure your next revenue stage requires. The milestones below show what needs to be in place.'
    underbuiltAreas.push('total headcount')
  } else {
    headline = `You're at $${inputs.currentRevenue}M with ${actual} GTM headcount. That's within the benchmark range of ${benchLow}-${benchHigh} for your stage.`
    body = 'Your overall team size matches. The question is whether the composition is right: the right roles in the right ratios. The milestones below show what shifts at each stage.'
  }

  return { headline, body, overbuiltAreas, underbuiltAreas }
}

// ── Risk assessment ─────────────────────────────────────────────────────────

function assessRisk(headcount: number, benchmark: RoleRange): RiskLevel | null {
  if (headcount <= 0) return null

  const benchMid = midpoint(benchmark)
  const ratio = headcount / benchMid

  if (ratio >= 0.9) return 'On track'
  if (ratio >= 0.7) return 'Watch'
  if (ratio >= 0.5) return 'At risk'
  return 'Critical'
}

// ── Nudge copy ──────────────────────────────────────────────────────────────

function generateNudge(
  projection: Pick<GtmProjection, 'overallRisk' | 'comparativeCallout' | 'milestones'>,
): { headline: string; body: string; ctaLabel: string } {
  const { overallRisk, milestones } = projection
  const hasOutboundDecision = milestones.some(m =>
    m.decisions.some(d => d.function === 'sdrs' || d.function === 'sdrManager')
  )

  if (overallRisk === 'Critical' || overallRisk === 'At risk') {
    return {
      headline: 'Your GTM org is structured for a smaller company than you are.',
      body: hasOutboundDecision
        ? 'The biggest gap at your stage is pipeline generation. An in-house SDR takes 3-6 months to ramp and costs $150K+ fully loaded. A managed outbound system books meetings in 2-4 weeks at a fraction of the cost.'
        : 'Multiple structural gaps will constrain your path to target. The milestones above show where to invest first.',
      ctaLabel: 'See how Era builds pipeline infrastructure',
    }
  }

  if (overallRisk === 'Watch') {
    return {
      headline: 'You have time, but the next stage requires new infrastructure.',
      body: hasOutboundDecision
        ? 'Outbound pipeline is the most common gap between your current stage and the next one. Most companies at your size are either building in-house (slow, expensive) or outsourcing to get to first meetings faster.'
        : 'The milestones above show what changes. Companies that build ahead of the curve spend less and move faster.',
      ctaLabel: 'Talk to Era about the next stage',
    }
  }

  return {
    headline: 'Well-built foundation. Here is what comes next.',
    body: 'Your GTM org matches the benchmark for your stage. The question is whether the current shape scales to the next milestone or needs to evolve. Era helps companies like yours design the system that compounds.',
    ctaLabel: 'Explore Era',
  }
}

// ── Main engine ─────────────────────────────────────────────────────────────

export function computeProjection(inputs: GtmInputs): GtmProjection {
  const benchmarks = getBenchmarkForVertical(inputs.vertical)
  const currentStage = findStage(inputs.currentRevenue, benchmarks)
  const targetStage = findStage(inputs.targetRevenue, benchmarks)

  // Generate milestones between current and target (inclusive of both)
  const currentIdx = benchmarks.indexOf(currentStage)
  const targetIdx = benchmarks.indexOf(targetStage)
  const milestoneRange = benchmarks.slice(currentIdx, targetIdx + 1)

  // Build milestone results
  const milestones: MilestoneResult[] = milestoneRange.map((milestone, i) => {
    const prev = i > 0 ? milestoneRange[i - 1] : null
    const decisions = prev ? generateDecisions(prev, milestone) : []
    const riskLevel = inputs.currentHeadcount > 0 && i === 0
      ? assessRisk(inputs.currentHeadcount, milestone.totalHeadcount)
      : null

    return { milestone, decisions, riskLevel }
  })

  // Comparative callout
  const comparativeCallout = generateComparative(inputs, currentStage)

  // Overall risk
  const overallRisk = inputs.currentHeadcount > 0
    ? assessRisk(inputs.currentHeadcount, currentStage.totalHeadcount)
    : null

  // Nudge
  const nudge = generateNudge({ overallRisk, comparativeCallout, milestones })

  return {
    currentStage,
    targetStage,
    milestones,
    comparativeCallout,
    overallRisk,
    nudge,
  }
}

// ── Risk color mapping ──────────────────────────────────────────────────────

export const RISK_COLORS: Record<RiskLevel, string> = {
  'On track': '#1FA7A2',
  'Watch': '#D6B26D',
  'At risk': '#B85C4A',
  'Critical': '#8B3A2E',
}
