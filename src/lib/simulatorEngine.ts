// ── GTM Growth Simulator Engine (v12) ───────────────────────────────────────
// P&L cost categories · Stepped staircase curves · QoQ lift annotations
// Profitability comparison data · Input-change annotation system

// ── Types ───────────────────────────────────────────────────────────────────

export type GrowthPlan =
  | 'slow_steady'
  | 'aggressive'
  | 'exit_prep'
  | 'recently_funded'
  | 'new_product'
  | 'post_acquisition'

export type SimIndustry =
  | 'SaaS'
  | 'Manufacturing'
  | 'Professional Services'
  | 'Healthcare'
  | 'Fintech'
  | 'Staffing'
  | 'IT Services'
  | 'Logistics'

export type DealRange =
  | '10k_25k'
  | '25k_75k'
  | '75k_150k'
  | '150k_300k'
  | '300k_plus'

export type SalesCycle = 30 | 90 | 180 | 365

// v12: renamed from 'hiring' | 'system'
export type ToggleMode = 'conventional' | 'system'

export interface SimulatorInputs {
  growthPlan: GrowthPlan
  industry: SimIndustry
  dealRange: DealRange
  salesCycle: SalesCycle
  sellerCount: number
  revenueTarget: number
  timelineQuarters: number
  toggleMode: ToggleMode
  renewalRate: number  // 0-100, client renewal/retention rate
}

export interface QuarterData {
  quarter: number
  label: string
  revenue: number
  baseRevenue: number   // recurring revenue from renewals
  newRevenue: number    // new logo revenue
  people: number
  advertising: number
  technology: number
  overhead: number
  cac: number
  profit: number
  profitMargin: number
  headcount: number
  adSpend: number
}

// v12: QoQ lift annotation per quarter
export interface QoQLift {
  quarter: number
  liftPct: number        // % revenue growth from previous quarter
  driver: string         // what drove it: "deal velocity", "ramp", etc.
  cycleFactor: string    // sales cycle context
}

export interface QuarterlyCard {
  quarter: number
  label: string
  isInflection: boolean
  items: CardItem[]
}

export interface CardItem {
  icon: 'people' | 'advertising' | 'technology'
  text: string
}

export interface InflectionPoint {
  quarter: number
  label: string
  kicker: string
  headline: string
  body: string
  metric: string
  metricLabel: string
  source: string
}

// v12: profitability comparison for pie chart
export interface ProfitComparison {
  conventionalMargin: number
  systemMargin: number
  savingsPts: number
  savingsDollars: number  // $K saved in final quarter
}

// v12: input-change annotation for Tufte callouts
export interface InputAnnotation {
  text: string
  source: string
  layer: string  // which chart layer it affects most
}

// P0: Industry-adaptive terminology
export interface IndustryTerminology {
  cac: string
  sdr: string
  arr: string
  acv: string
  pipeline: string
  deals: string
  seller: string
  sellerPlural: string
}

export interface SimulatorOutput {
  quarters: QuarterData[]
  qoqLifts: QoQLift[]
  quarterlyCards: QuarterlyCard[]
  conventionalAnnotation: string
  systemAnnotation: string
  profitCallout: string
  totalHires: number
  totalAdSpend: number
  insight: InsightCopy
  inflection: InflectionPoint
  conventionalProfitMargin: number
  systemProfitMargin: number
  profitComparison: ProfitComparison
  inputAnnotation: InputAnnotation
  terminology: IndustryTerminology
}

export interface InsightCopy {
  headline: string
  body: string
}

// ── Constants ───────────────────────────────────────────────────────────────

export const GROWTH_PLAN_LABELS: Record<GrowthPlan, string> = {
  slow_steady: 'Slow and steady',
  aggressive: 'Aggressive scale',
  exit_prep: 'Preparing for exit',
  recently_funded: 'Recently funded',
  new_product: 'New product launch',
  post_acquisition: 'Post-acquisition',
}

export const INDUSTRY_LIST: { key: SimIndustry; label: string }[] = [
  { key: 'SaaS', label: 'SaaS' },
  { key: 'Manufacturing', label: 'Manufacturing' },
  { key: 'Professional Services', label: 'Prof. Services' },
  { key: 'Healthcare', label: 'Healthcare' },
  { key: 'Fintech', label: 'Fintech' },
  { key: 'Staffing', label: 'Staffing' },
  { key: 'IT Services', label: 'IT Services' },
  { key: 'Logistics', label: 'Logistics' },
]

export const DEAL_RANGE_LABELS: Record<DealRange, string> = {
  '10k_25k': '$10K-$25K',
  '25k_75k': '$25K-$75K',
  '75k_150k': '$75K-$150K',
  '150k_300k': '$150K-$300K',
  '300k_plus': '$300K+',
}

export const SALES_CYCLE_OPTIONS: SalesCycle[] = [30, 90, 180, 365]

// ── Industry Profiles ───────────────────────────────────────────────────────

interface IndustryProfile {
  grossMargin: number
  peopleWeight: number
  advertisingWeight: number
  technologyWeight: number
  overheadWeight: number
  typicalDealVelocity: number
  stepSmoothing: number
}

const INDUSTRY_PROFILES: Record<SimIndustry, IndustryProfile> = {
  SaaS:                  { grossMargin: 0.78, peopleWeight: 1.0, advertisingWeight: 1.3, technologyWeight: 1.2, overheadWeight: 0.8, typicalDealVelocity: 4, stepSmoothing: 0.6 },
  Manufacturing:         { grossMargin: 0.30, peopleWeight: 0.9, advertisingWeight: 0.4, technologyWeight: 0.6, overheadWeight: 1.4, typicalDealVelocity: 2, stepSmoothing: 0.2 },
  'Professional Services': { grossMargin: 0.60, peopleWeight: 1.2, advertisingWeight: 0.3, technologyWeight: 0.5, overheadWeight: 1.2, typicalDealVelocity: 3, stepSmoothing: 0.3 },
  Healthcare:            { grossMargin: 0.65, peopleWeight: 1.0, advertisingWeight: 0.5, technologyWeight: 0.8, overheadWeight: 1.1, typicalDealVelocity: 2.5, stepSmoothing: 0.3 },
  Fintech:               { grossMargin: 0.70, peopleWeight: 0.9, advertisingWeight: 1.0, technologyWeight: 1.4, overheadWeight: 0.9, typicalDealVelocity: 3, stepSmoothing: 0.15 },
  Staffing:              { grossMargin: 0.28, peopleWeight: 1.4, advertisingWeight: 0.3, technologyWeight: 0.5, overheadWeight: 0.9, typicalDealVelocity: 6, stepSmoothing: 0.1 },
  'IT Services':         { grossMargin: 0.48, peopleWeight: 1.1, advertisingWeight: 0.4, technologyWeight: 1.0, overheadWeight: 1.2, typicalDealVelocity: 3, stepSmoothing: 0.35 },
  Logistics:             { grossMargin: 0.35, peopleWeight: 1.0, advertisingWeight: 0.4, technologyWeight: 0.6, overheadWeight: 1.3, typicalDealVelocity: 3.5, stepSmoothing: 0.2 },
}

// ── v12: Industry source citations for input annotations ────────────────────

const INDUSTRY_SOURCES: Record<SimIndustry, { source: string; annotation: string }> = {
  SaaS: { source: 'KeyBanc SaaS Survey 2024', annotation: 'SaaS GTM orgs average 63% of spend on people. CAC payback: 18-24 months at scale.' },
  Manufacturing: { source: 'Deloitte CMO Survey Fall 2024', annotation: 'Manufacturing GTM is 40% overhead. Longer sales cycles (6-12mo) require lower-volume, higher-touch models.' },
  'Professional Services': { source: 'SPI Research 2024', annotation: 'Services firms spend 4-7% of revenue on marketing vs 15-25% for SaaS. Relationships drive 70% of pipeline.' },
  Healthcare: { source: 'Gartner Healthcare IT 2025', annotation: 'Healthcare B2B has 2x compliance overhead. Average sales cycle: 9-14 months. Procurement gates add 30% to cycle length.' },
  Fintech: { source: 'McKinsey Banking Review 2024', annotation: 'Fintech GTM is technology-heavy: avg 22% of GTM budget on tools vs 12% cross-industry. Buyers are data-driven.' },
  Staffing: { source: 'SIA Staffing Report 2024', annotation: 'Staffing SDR turnover runs 34-40%/yr. Replacement cost: $100-115K per departure. Volume model requires constant recruiting.' },
  'IT Services': { source: 'Forrester B2B Tech 2024', annotation: 'IT Services GTM relies on relationship-driven pipeline. 60-70% of revenue comes from existing account expansion.' },
  Logistics: { source: 'Armstrong & Associates 2024', annotation: 'Logistics has high customer concentration: top 20% of accounts typically generate 80%+ of revenue. Diversification is the growth constraint.' },
}

const DEAL_SOURCES: Record<DealRange, { source: string; annotation: string }> = {
  '10k_25k': { source: 'Bridge Group 2024', annotation: 'At $10-25K ACV, you need 5-8 deals/AE/quarter. Pipeline-to-close ratio: 4:1. This is a volume play.' },
  '25k_75k': { source: 'Bridge Group 2024', annotation: '$25-75K deals average 60-90 day cycles. Pipeline:close ratio drops to 3:1. Sweet spot for SDR-generated pipeline.' },
  '75k_150k': { source: 'TOPO/Gartner 2024', annotation: '$75-150K deals shift to multithread selling. Average 4.2 stakeholders per deal. Signal data replaces cold outreach.' },
  '150k_300k': { source: 'Winning by Design 2024', annotation: '$150-300K deals require 2-3 quarter pipeline development. SDR model breaks down: AE-led prospecting produces 40% higher close rates.' },
  '300k_plus': { source: 'Bain Enterprise Sales 2024', annotation: '$300K+ deals are executive-sold. Average 6-8 stakeholders, 2-4 quarter cycles. Signal and timing matter more than outbound volume.' },
}

const GROWTH_SOURCES: Record<GrowthPlan, { source: string; annotation: string }> = {
  slow_steady: { source: 'SaaS Capital 2025', annotation: 'Companies growing 15-25% annually with <80% CAC ratio trade at 30%+ higher multiples than faster-burning peers.' },
  aggressive: { source: 'Bessemer Cloud Index 2024', annotation: 'Aggressive scaling (>40% YoY) requires CAC payback under 18 months to be sustainable. 60% of companies miss this threshold.' },
  exit_prep: { source: 'Vista Equity Partners 2024', annotation: 'Pre-exit: every 5pts of margin improvement adds 1-1.5x to revenue multiple. GTM efficiency is the fastest lever.' },
  recently_funded: { source: 'a16z Growth Benchmarks 2024', annotation: 'Post-funding, top-quartile companies spend 40-50% of new capital on GTM. Bottom quartile: 70%+, mostly on people.' },
  new_product: { source: 'First Round Capital 2024', annotation: 'New product GTM: companies that invest in signal/positioning first see 2x faster time to first 10 customers vs outbound-first.' },
  post_acquisition: { source: 'McKinsey M&A Playbook 2024', annotation: 'Post-acquisition: 65% of synergy targets are missed in first 18 months. GTM integration failures are the #1 cause.' },
}

const CYCLE_SOURCES: Record<SalesCycle, string> = {
  30: '30-day cycles: transactional velocity. Pipeline replenishment is the constraint. Automation ROI: 3-5x.',
  90: '90-day cycles: standard B2B. SDR pipeline covers 2-3x target. Ramp time: 3-4 months.',
  180: '180-day cycles: enterprise motion. AE-led prospecting. Signal timing replaces volume.',
  365: '365-day cycles: strategic enterprise. Pipeline is 12-18 months deep. Each deal justifies $10K+ in pursuit cost.',
}

// P0: Industry-adaptive terminology map ───────────────────────────────────────

const INDUSTRY_TERMINOLOGY: Record<SimIndustry, IndustryTerminology> = {
  SaaS: { cac: 'CAC', sdr: 'SDR', arr: 'ARR', acv: 'ACV', pipeline: 'pipeline', deals: 'deals', seller: 'AE', sellerPlural: 'AEs' },
  Manufacturing: { cac: 'Cost to Acquire Client', sdr: 'Business Development', arr: 'Annual Revenue', acv: 'Average Contract Value', pipeline: 'opportunity pipeline', deals: 'contracts', seller: 'sales rep', sellerPlural: 'sales reps' },
  'Professional Services': { cac: 'Client Acquisition Cost', sdr: 'Business Development', arr: 'Annual Revenue', acv: 'Engagement Value', pipeline: 'opportunity pipeline', deals: 'engagements', seller: 'partner/director', sellerPlural: 'partners' },
  Healthcare: { cac: 'Cost to Acquire Client', sdr: 'Business Development', arr: 'Annual Revenue', acv: 'Contract Value', pipeline: 'opportunity pipeline', deals: 'contracts', seller: 'account exec', sellerPlural: 'account execs' },
  Fintech: { cac: 'CAC', sdr: 'SDR', arr: 'ARR', acv: 'ACV', pipeline: 'pipeline', deals: 'deals', seller: 'AE', sellerPlural: 'AEs' },
  Staffing: { cac: 'Cost to Acquire Client', sdr: 'Business Development', arr: 'Annual Revenue', acv: 'Average Placement Value', pipeline: 'client pipeline', deals: 'placements', seller: 'account manager', sellerPlural: 'account managers' },
  'IT Services': { cac: 'Client Acquisition Cost', sdr: 'Business Development', arr: 'Annual Revenue', acv: 'Average SOW Value', pipeline: 'opportunity pipeline', deals: 'engagements', seller: 'account exec', sellerPlural: 'account execs' },
  Logistics: { cac: 'Cost to Acquire Client', sdr: 'Business Development', arr: 'Annual Revenue', acv: 'Average Contract Value', pipeline: 'client pipeline', deals: 'contracts', seller: 'sales rep', sellerPlural: 'sales reps' },
}

// ── Growth Plan Curve Shapes ────────────────────────────────────────────────

function growthCurve(plan: GrowthPlan, t: number): number {
  switch (plan) {
    case 'slow_steady': return t
    case 'aggressive': return Math.pow(t, 0.6)
    case 'exit_prep': return t < 0.6 ? t * 0.4 : 0.24 + (t - 0.6) * 1.9
    case 'recently_funded': return 1 / (1 + Math.exp(-8 * (t - 0.5)))
    case 'new_product': return t < 0.3 ? t * 0.2 : 0.06 + Math.pow((t - 0.3) / 0.7, 0.7) * 0.94
    case 'post_acquisition': return t < 0.2 ? t * 2.5 : 0.5 + (t - 0.2) * 0.625
  }
}

// ── Deal Size Mappings ──────────────────────────────────────────────────────

interface DealProfile {
  avgDealSize: number
  dealsPerAEPerQ: number
  headcountDensity: number
  adSpendMultiplier: number
}

const DEAL_PROFILES: Record<DealRange, DealProfile> = {
  '10k_25k':   { avgDealSize: 17.5, dealsPerAEPerQ: 6, headcountDensity: 5, adSpendMultiplier: 1.4 },
  '25k_75k':   { avgDealSize: 50, dealsPerAEPerQ: 4, headcountDensity: 4, adSpendMultiplier: 1.0 },
  '75k_150k':  { avgDealSize: 112, dealsPerAEPerQ: 2.5, headcountDensity: 3, adSpendMultiplier: 0.8 },
  '150k_300k': { avgDealSize: 225, dealsPerAEPerQ: 1.5, headcountDensity: 2, adSpendMultiplier: 0.6 },
  '300k_plus': { avgDealSize: 400, dealsPerAEPerQ: 0.8, headcountDensity: 1, adSpendMultiplier: 0.4 },
}

function cycleModifier(cycle: SalesCycle): number {
  switch (cycle) {
    case 30: return 1.3
    case 90: return 1.0
    case 180: return 0.7
    case 365: return 0.4
  }
}

// ── Cost Benchmarks ─────────────────────────────────────────────────────────

const COST_PER_PERSON = 155
const MGMT_OVERHEAD_PER_HEAD = 25
const SIGNAL_STACK_COST = 55
const BASE_AD_SPEND_PER_Q = 45
const TECH_STACK_BASE = 15

// ── Core Layer Computation ──────────────────────────────────────────────────

function computeQuarters(inputs: SimulatorInputs, mode: ToggleMode): QuarterData[] {
  const { growthPlan, industry, dealRange, salesCycle, sellerCount, revenueTarget, timelineQuarters, renewalRate } = inputs
  const profile = INDUSTRY_PROFILES[industry]
  const dealProfile = DEAL_PROFILES[dealRange]
  const cycleMod = cycleModifier(salesCycle)

  const dealsPerQ = sellerCount * dealProfile.dealsPerAEPerQ * cycleMod
  const startingRevenuePerQ = dealsPerQ * dealProfile.avgDealSize / 1000
  const startingRevenue = startingRevenuePerQ * 4
  const revenueGrowth = revenueTarget - startingRevenue
  const isConventional = mode === 'conventional'
  const renewalFraction = renewalRate / 100
  const quarters: QuarterData[] = []

  for (let q = 0; q < timelineQuarters; q++) {
    const t = timelineQuarters <= 1 ? 1 : q / (timelineQuarters - 1)
    const rawCurve = growthCurve(growthPlan, t)
    const stepT = timelineQuarters <= 1 ? 1 : Math.floor(q) / (timelineQuarters - 1)
    const stepCurve = growthCurve(growthPlan, stepT)
    const curveValue = stepCurve * (1 - profile.stepSmoothing) + rawCurve * profile.stepSmoothing

    const qRevenue = startingRevenue + revenueGrowth * curveValue

    // Renewal compounding: base revenue = recurring from prior quarter, new = fresh logos
    let baseRevenue: number
    let newRevenue: number
    if (q === 0) {
      baseRevenue = 0
      newRevenue = qRevenue
    } else {
      const prevTotal = quarters[q - 1].revenue
      baseRevenue = Math.min(prevTotal * renewalFraction, qRevenue)
      newRevenue = Math.max(0, qRevenue - baseRevenue)
    }

    const revenueScale = qRevenue / Math.max(startingRevenue, 1)

    // Conventional: costs grow faster than linear (recruiting cascades, management layers).
    // System: costs grow sublinearly (technology replaces headcount).
    const peopleGrowthRate = isConventional ? 0.95 : 0.25
    const gtmPeople = sellerCount * (1 + (revenueScale - 1) * peopleGrowthRate) * profile.peopleWeight
    const sdrRate = isConventional ? 0.45 : 0.08
    const sdrPeople = gtmPeople * sdrRate
    const totalPeople = gtmPeople + sdrPeople
    // Recruiting + ramp overhead: grows with sqrt of scale (diminishing returns on recruiting efficiency)
    const recruitRampOverhead = isConventional ? totalPeople * 0.08 * Math.sqrt(revenueScale) : totalPeople * 0.02
    const peopleCost = (totalPeople + recruitRampOverhead) * COST_PER_PERSON / 1000

    // Ad spend: conventional scales with revenue; system redirects most spend into signal
    const adFactor = isConventional ? 1.0 : 0.12
    const adSpendQ = BASE_AD_SPEND_PER_Q * dealProfile.adSpendMultiplier * revenueScale * adFactor * profile.advertisingWeight / 1000

    const baseTech = sellerCount * TECH_STACK_BASE / 1000 * profile.technologyWeight * (1 + (revenueScale - 1) * 0.3)
    const signalCost = !isConventional ? SIGNAL_STACK_COST / 1000 * (1 + (revenueScale - 1) * 0.15) : 0
    const techCost = baseTech + signalCost

    // Overhead: management layers add cost as team grows
    const mgmtLayers = isConventional ? 1 + Math.floor(totalPeople / 5) * 0.08 : 1
    const overheadCost = totalPeople * MGMT_OVERHEAD_PER_HEAD / 1000 * profile.overheadWeight * mgmtLayers

    // Bottom-up cost total
    const bottomUpCac = peopleCost + adSpendQ + techCost + overheadCost

    // Revenue-anchored cost floor: ensures margins stay realistic at all scales.
    // B2B GTM orgs typically spend 55-75% of revenue on GTM in conventional mode.
    // System-led orgs run 35-50% GTM cost ratios.
    const grossMarginPenalty = 1 - profile.grossMargin * 0.3  // lower-margin industries have higher cost ratios
    const conventionalFloor = qRevenue * (0.62 + grossMarginPenalty * 0.08)
    const systemFloor = qRevenue * (0.38 + grossMarginPenalty * 0.06)
    const costFloor = isConventional ? conventionalFloor : systemFloor

    // Use the higher of bottom-up or floor, then distribute proportionally across layers
    const cac = Math.max(bottomUpCac, costFloor)
    const costScale = bottomUpCac > 0 ? cac / bottomUpCac : 1
    const scaledPeople = peopleCost * costScale
    const scaledAds = adSpendQ * costScale
    const scaledTech = techCost * costScale
    const scaledOverhead = overheadCost * costScale

    const profit = qRevenue - cac
    const profitMargin = qRevenue > 0 ? profit / qRevenue : 0

    quarters.push({
      quarter: q + 1,
      label: `Q${q + 1}`,
      revenue: Math.max(0, qRevenue),
      baseRevenue: Math.max(0, baseRevenue),
      newRevenue: Math.max(0, newRevenue),
      people: Math.max(0, scaledPeople),
      advertising: Math.max(0, scaledAds),
      technology: Math.max(0, scaledTech),
      overhead: Math.max(0, scaledOverhead),
      cac: Math.max(0, cac),
      profit: Math.max(0, profit),
      profitMargin,
      headcount: Math.round(totalPeople),
      adSpend: scaledAds * 1000,
    })
  }
  return quarters
}

// v12: QoQ lift annotations ──────────────────────────────────────────────────

function computeQoQLift(quarters: QuarterData[], salesCycle: SalesCycle, growthPlan: GrowthPlan): QoQLift[] {
  const lifts: QoQLift[] = []
  const cycleDesc = salesCycle <= 30 ? 'transactional velocity' : salesCycle <= 90 ? 'standard cycle' : salesCycle <= 180 ? 'enterprise cycle' : 'strategic cycle'

  const drivers: Record<GrowthPlan, string[]> = {
    slow_steady: ['organic pipeline', 'steady ramp', 'referrals', 'expansion'],
    aggressive: ['outbound ramp', 'ad spend lift', 'new AE ramp', 'pipeline acceleration'],
    exit_prep: ['efficiency gains', 'cost optimization', 'pipeline focus', 'margin expansion'],
    recently_funded: ['headcount ramp', 'market expansion', 'demand gen', 'channel build'],
    new_product: ['market signal', 'positioning', 'early adopters', 'product-market fit'],
    post_acquisition: ['team integration', 'cross-sell', 'pipeline merge', 'synergy capture'],
  }

  for (let i = 1; i < quarters.length; i++) {
    const prev = quarters[i - 1]
    const curr = quarters[i]
    const liftPct = prev.revenue > 0 ? ((curr.revenue - prev.revenue) / prev.revenue) * 100 : 0
    const driverIdx = Math.min(i - 1, drivers[growthPlan].length - 1)

    lifts.push({
      quarter: curr.quarter,
      liftPct: Math.round(liftPct * 10) / 10,
      driver: drivers[growthPlan][driverIdx],
      cycleFactor: cycleDesc,
    })
  }
  return lifts
}

// ── Quarterly Investment Cards ──────────────────────────────────────────────

function computeQuarterlyCards(quarters: QuarterData[], inflectionQ: number, mode: ToggleMode): QuarterlyCard[] {
  const isConventional = mode === 'conventional'
  const cards: QuarterlyCard[] = []

  for (let i = 1; i < quarters.length; i++) {
    const prev = quarters[i - 1]
    const curr = quarters[i]
    const items: CardItem[] = []

    const headDiff = curr.headcount - prev.headcount
    if (headDiff > 0) {
      items.push({ icon: 'people', text: `+${headDiff} hire${headDiff > 1 ? 's' : ''} ($${Math.round(headDiff * 155)}K/yr)` })
    }

    const adDiff = curr.adSpend - prev.adSpend
    if (Math.abs(adDiff) > 5) {
      if (adDiff > 0) {
        items.push({ icon: 'advertising', text: `+$${Math.round(adDiff)}K/qtr ads` })
      } else if (!isConventional) {
        items.push({ icon: 'advertising', text: `$${Math.round(Math.abs(adDiff))}K/qtr redirected` })
      }
    }

    const techDiff = (curr.technology - prev.technology) * 1000
    if (!isConventional && i <= 3) {
      items.push({ icon: 'technology', text: i === 1 ? '+Intent platform' : '+Signal tuning' })
    } else if (techDiff > 3) {
      items.push({ icon: 'technology', text: `+$${Math.round(techDiff)}K tooling` })
    }

    if (items.length > 0) {
      cards.push({
        quarter: curr.quarter,
        label: curr.label,
        isInflection: curr.quarter === inflectionQ + 1,
        items,
      })
    }
  }
  return cards
}

// ── Inflection Point Calculator ─────────────────────────────────────────────

function computeInflection(
  inputs: SimulatorInputs, quarters: QuarterData[],
  conventionalQ: QuarterData[], systemQ: QuarterData[],
): InflectionPoint {
  const { toggleMode, industry, sellerCount, dealRange, growthPlan } = inputs
  const dealProfile = DEAL_PROFILES[dealRange]
  const terminology = INDUSTRY_TERMINOLOGY[industry]
  const isConventional = toggleMode === 'conventional'

  let inflectionQ = Math.max(2, Math.floor(quarters.length * 0.35))

  if (isConventional) {
    for (let i = 2; i < conventionalQ.length; i++) {
      const q = conventionalQ[i]
      const prevQ = conventionalQ[i - 1]
      const cacGrowth = q.cac / Math.max(prevQ.cac, 0.01)
      const revGrowth = q.revenue / Math.max(prevQ.revenue, 0.01)
      if (cacGrowth > revGrowth * 1.05) { inflectionQ = i; break }
    }
  } else {
    for (let i = 2; i < systemQ.length; i++) {
      if (systemQ[i].profitMargin > 0.30) { inflectionQ = i; break }
    }
  }

  inflectionQ = Math.min(inflectionQ, quarters.length - 1)
  const iQ = quarters[inflectionQ]
  const hQ = conventionalQ[inflectionQ]
  const sQ = systemQ[inflectionQ]
  const cacPct = Math.round((iQ.cac / Math.max(iQ.revenue, 0.01)) * 100)
  const convMargin = Math.round(hQ.profitMargin * 100)
  const sysMargin = Math.round(sQ.profitMargin * 100)

  const planContext: Record<GrowthPlan, string> = {
    slow_steady: 'steady growth compounds the cost gap over time',
    aggressive: 'aggressive targets amplify every investment dollar',
    exit_prep: 'pre-exit margin compression reduces valuation multiples',
    recently_funded: 'post-funding scaling accelerates burn without proportional pipeline',
    new_product: 'new market GTM requires signal before investment',
    post_acquisition: 'combined team overlap compounds cost without combined pipeline',
  }

  if (isConventional) {
    return {
      quarter: inflectionQ + 1, label: `Q${inflectionQ + 1}`,
      kicker: `INFLECTION POINT · Q${inflectionQ + 1}`,
      headline: `${terminology.pipeline.charAt(0).toUpperCase() + terminology.pipeline.slice(1)} generation breaks before revenue does.`,
      body: `At ${sellerCount} ${terminology.sellerPlural} closing ${DEAL_RANGE_LABELS[dealRange]} ${terminology.deals}, your costs need ${Math.round(dealProfile.dealsPerAEPerQ * sellerCount * 1.5)} qualified opportunities per quarter by Q${inflectionQ + 1}. Each new ${terminology.sdr} costs $150K fully loaded. By Q${inflectionQ + 1}, ${planContext[growthPlan]}.`,
      metric: `${cacPct}%`, metricLabel: `of new ${terminology.arr} consumed by cost`,
      source: 'Bridge Group SDR Metrics 2024',
    }
  } else {
    return {
      quarter: inflectionQ + 1, label: `Q${inflectionQ + 1}`,
      kicker: `INFLECTION POINT · Q${inflectionQ + 1}`,
      headline: `The inflection shifts. ${terminology.pipeline.charAt(0).toUpperCase() + terminology.pipeline.slice(1)} scales without adding cost.`,
      body: `Signal-driven ${terminology.pipeline} replaces ${Math.round((hQ.headcount - sQ.headcount) * 0.6)} roles by Q${inflectionQ + 1}. ${industry} companies using intent data reduce cost per meeting by 40-60%. Margin: ${sysMargin}% vs ${convMargin}% conventional. ${sysMargin - convMargin} points recovered.`,
      metric: `+${sysMargin - convMargin}pts`, metricLabel: `profit margin vs. conventional`,
      source: 'SaaS Capital 2025 · Gartner CMO Spend 2025',
    }
  }
}

// v12: Input annotation system ───────────────────────────────────────────────

function computeInputAnnotation(inputs: SimulatorInputs): InputAnnotation {
  const { industry, dealRange, growthPlan, salesCycle } = inputs

  // Combine the most relevant annotation based on the active input context
  const industryData = INDUSTRY_SOURCES[industry]
  const dealData = DEAL_SOURCES[dealRange]
  const growthData = GROWTH_SOURCES[growthPlan]
  const cycleNote = CYCLE_SOURCES[salesCycle]

  // Build a composite annotation prioritizing industry + deal
  return {
    text: `${industryData.annotation} ${cycleNote}`,
    source: `${industryData.source} · ${dealData.source} · ${growthData.source}`,
    layer: 'people',
  }
}

// ── Main Computation ────────────────────────────────────────────────────────

export function computeSimulation(inputs: SimulatorInputs): SimulatorOutput {
  const { toggleMode, sellerCount, industry } = inputs
  const terminology = INDUSTRY_TERMINOLOGY[industry]

  const conventionalQuarters = computeQuarters(inputs, 'conventional')
  const systemQuarters = computeQuarters(inputs, 'system')
  const quarters = toggleMode === 'conventional' ? conventionalQuarters : systemQuarters

  const lastConv = conventionalQuarters[conventionalQuarters.length - 1]
  const lastSys = systemQuarters[systemQuarters.length - 1]
  const conventionalProfitMargin = lastConv?.profitMargin ?? 0
  const systemProfitMargin = lastSys?.profitMargin ?? 0

  const lastQ = quarters[quarters.length - 1]
  const firstQ = quarters[0]
  const totalHires = lastQ ? lastQ.headcount - firstQ.headcount : 0
  const avgAdSpend = quarters.reduce((s, q) => s + q.adSpend, 0) / quarters.length

  const convHires = lastConv ? lastConv.headcount - conventionalQuarters[0].headcount : 0
  const sysHires = lastSys ? lastSys.headcount - systemQuarters[0].headcount : 0
  const conventionalAnnotation = `${Math.max(convHires, sellerCount + 2)} hires · $${Math.round(conventionalQuarters.reduce((s, q) => s + q.adSpend, 0) / conventionalQuarters.length)}K ad spend`
  const systemAnnotation = `${Math.max(sysHires, sellerCount)} hires · Signal replaces spend`

  const actualMargin = lastQ?.profitMargin ?? 0
  const cacPct = lastQ ? (lastQ.cac / Math.max(lastQ.revenue, 0.01)) * 100 : 0
  const marginDiff = Math.round(Math.abs(systemProfitMargin - conventionalProfitMargin) * 100)

  const profitCallout = toggleMode === 'conventional'
    ? `${Math.round(actualMargin * 100)}% profit. ${terminology.cac}: ${Math.round(cacPct)}% of new ${terminology.arr}.`
    : `${Math.round(actualMargin * 100)}% profit. ${terminology.cac}: ${Math.round(cacPct)}%. +${marginDiff}pts vs. conventional.`

  const insight = generateInsight(inputs, quarters)
  const inflection = computeInflection(inputs, quarters, conventionalQuarters, systemQuarters)
  const quarterlyCards = computeQuarterlyCards(quarters, inflection.quarter - 1, toggleMode)
  const qoqLifts = computeQoQLift(quarters, inputs.salesCycle, inputs.growthPlan)

  // v12: profitability comparison for pie chart
  const profitComparison: ProfitComparison = {
    conventionalMargin: Math.round(conventionalProfitMargin * 100),
    systemMargin: Math.round(systemProfitMargin * 100),
    savingsPts: marginDiff,
    savingsDollars: lastSys && lastConv ? Math.round((lastSys.profit - lastConv.profit) * 1000) : 0,
  }

  const inputAnnotation = computeInputAnnotation(inputs)

  return {
    quarters,
    qoqLifts,
    quarterlyCards,
    conventionalAnnotation,
    systemAnnotation,
    profitCallout,
    totalHires: Math.max(totalHires, 0),
    totalAdSpend: Math.round(avgAdSpend),
    insight,
    inflection,
    conventionalProfitMargin,
    systemProfitMargin,
    profitComparison,
    inputAnnotation,
    terminology,
  }
}

// ── Adaptive Insight Generator ──────────────────────────────────────────────

function generateInsight(inputs: SimulatorInputs, quarters: QuarterData[]): InsightCopy {
  const { growthPlan, industry, dealRange, sellerCount, revenueTarget, toggleMode } = inputs
  const profile = INDUSTRY_PROFILES[industry]
  const dealProfile = DEAL_PROFILES[dealRange]
  const terminology = INDUSTRY_TERMINOLOGY[industry]
  const lastQ = quarters[quarters.length - 1]

  const industryInsights: Record<SimIndustry, string> = {
    SaaS: `SaaS companies at your stage typically run ${Math.round(profile.grossMargin * 100)}% gross margins, but GTM costs eat most of the difference.`,
    Manufacturing: `Manufacturing GTM orgs are overhead-heavy. Your margins (${Math.round(profile.grossMargin * 100)}%) mean every hire needs to produce more revenue per head.`,
    'Professional Services': `Services firms grow through relationships. With ${Math.round(profile.grossMargin * 100)}% margins, the path is reducing the cost of those relationships.`,
    Healthcare: `Healthcare cycles are long and compliance-heavy. At ${Math.round(profile.grossMargin * 100)}% margins, mishire cost is amplified.`,
    Fintech: `Fintech buyers are sophisticated and research-heavy. At ${Math.round(profile.grossMargin * 100)}% margins, invest in technology over people.`,
    Staffing: `Staffing runs on volume at ${Math.round(profile.grossMargin * 100)}% margins. SDR turnover (34-40%/yr) makes conventional scaling expensive.`,
    'IT Services': `IT Services is relationship-driven at ${Math.round(profile.grossMargin * 100)}% margins. The path is predictable pipeline, not more people.`,
    Logistics: `Logistics has heavy overhead and high customer concentration at ${Math.round(profile.grossMargin * 100)}% margins.`,
  }

  const growthModifiers: Record<GrowthPlan, string> = {
    slow_steady: `Companies that invest in systems early spend 30-40% less on GTM by $${revenueTarget}M.`,
    aggressive: `At ${sellerCount} ${terminology.sellerPlural}, you need ${terminology.pipeline} faster than hiring can deliver. Each ${terminology.sdr}: $150K+ and 3-6 month ramp.`,
    exit_prep: `Pre-exit: a 38% margin tells a different story than 11%. The gap is how you build GTM infrastructure.`,
    recently_funded: `Post-funding pressure is headcount. But ${DEAL_RANGE_LABELS[dealRange]} ${terminology.deals} mean your constraint is ${terminology.pipeline} quality.`,
    new_product: `New product GTM: signal collection first, people investment second. First 2-3 quarters define the market.`,
    post_acquisition: `Post-acquisition: the question is shared ${terminology.pipeline} systems, not combined headcount.`,
  }

  const dealObs = dealProfile.avgDealSize >= 150
    ? `At ${DEAL_RANGE_LABELS[dealRange]} ${terminology.deals}, signal-driven targeting makes ${sellerCount} ${terminology.sellerPlural} more effective without growing the People line.`
    : `${DEAL_RANGE_LABELS[dealRange]} ${terminology.deals} require ${Math.round(dealProfile.dealsPerAEPerQ * sellerCount)} ${terminology.deals}/quarter. ${terminology.pipeline.charAt(0).toUpperCase() + terminology.pipeline.slice(1)} problem, not people problem.`

  const headline = toggleMode === 'system'
    ? `Your path to $${revenueTarget}M does not require ${lastQ ? lastQ.headcount : sellerCount + 5} people.`
    : `At ${sellerCount} ${terminology.sellerPlural} targeting $${revenueTarget}M, your biggest risk is cost growth.`

  return { headline, body: `${industryInsights[industry]} ${growthModifiers[growthPlan]} ${dealObs}` }
}

// ── Default Inputs ──────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: SimulatorInputs = {
  growthPlan: 'aggressive',
  industry: 'SaaS',
  dealRange: '25k_75k',
  salesCycle: 90,
  sellerCount: 5,
  revenueTarget: 36,
  timelineQuarters: 12,
  toggleMode: 'conventional',
  renewalRate: 85,
}
