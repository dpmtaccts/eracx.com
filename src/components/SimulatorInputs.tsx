import { type SimulatorInputs, type GrowthPlan, type SimIndustry, type DealRange, type SalesCycle, type InsightCopy, type ProfitComparison, type InputAnnotation, type IndustryTerminology, GROWTH_PLAN_LABELS, INDUSTRY_LIST, DEAL_RANGE_LABELS, SALES_CYCLE_OPTIONS } from '../lib/simulatorEngine'

// ── Constants ───────────────────────────────────────────────────────────────

const COLORS = {
  charcoal: '#383838',
  charcoalLight: '#454545',
  offWhite: '#F6F5F2',
  teal: '#1FA7A2',
  oxide: '#B85C4A',
  sand: '#D6B26D',
  gray: '#8A8A8A',
  divider: '#E0DDD8',
  cardBg: '#FFFFFF',
  labelText: '#5A5A5A',
}

const FONT = "'Source Sans 3', sans-serif"

// ── Industry Icons ──────────────────────────────────────────────────────────

function IndustryIcon({ industry, size = 24 }: { industry: SimIndustry; size?: number }) {
  const stroke = 'currentColor'
  const sw = 1.5
  const s = size

  switch (industry) {
    case 'SaaS':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="12" rx="1" /><line x1="8" y1="20" x2="16" y2="20" /><line x1="12" y1="16" x2="12" y2="20" /><polyline points="8,10 11,8 14,11 17,7" /></svg>)
    case 'Manufacturing':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10l4-4v4l4-4v4l4-4v4h4v10H4z" /><rect x="8" y="15" width="3" height="5" /><rect x="14" y="15" width="3" height="5" /></svg>)
    case 'Professional Services':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="1" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>)
    case 'Healthcare':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /><line x1="12" y1="7" x2="12" y2="13" /><line x1="9" y1="10" x2="15" y2="10" /></svg>)
    case 'Fintech':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M14.5 9.5c-.83-.83-2.17-.83-3 0s-.83 2.17 0 3 2.17.83 3 0" /><line x1="12" y1="5" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="19" /></svg>)
    case 'Staffing':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3" /><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" /><circle cx="17" cy="7" r="2" /><path d="M21 21v-1.5a3 3 0 00-2-2.83" /></svg>)
    case 'IT Services':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="1" /><polyline points="8,10 10,8 8,6" /><line x1="12" y1="10" x2="16" y2="10" /><line x1="6" y1="21" x2="18" y2="21" /><line x1="10" y1="17" x2="14" y2="21" /><line x1="14" y1="17" x2="10" y2="21" /></svg>)
    case 'Logistics':
      return (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="15" height="10" rx="1" /><path d="M16 10h4l3 3v3h-7V10z" /><circle cx="6.5" cy="18" r="2" /><circle cx="19.5" cy="18" r="2" /></svg>)
  }
}

// ── Pill Selector ───────────────────────────────────────────────────────────

function PillSelector<T extends string>({ options, value, onChange, labels }: {
  options: T[]; value: T; onChange: (v: T) => void; labels: Record<T, string>
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          style={{
            fontFamily: FONT, fontSize: 12,
            fontWeight: opt === value ? 700 : 400,
            color: opt === value ? COLORS.offWhite : COLORS.gray,
            backgroundColor: opt === value ? COLORS.charcoal : 'transparent',
            border: `1px solid ${opt === value ? COLORS.charcoal : COLORS.divider}`,
            borderRadius: 20, padding: '6px 14px', cursor: 'pointer',
            transition: 'all 0.2s ease', whiteSpace: 'nowrap',
          }}>
          {labels[opt]}
        </button>
      ))}
    </div>
  )
}

// ── Segmented Control ───────────────────────────────────────────────────────

function SegmentedControl({ options, value, onChange, format }: {
  options: number[]; value: number; onChange: (v: number) => void; format: (v: number) => string
}) {
  return (
    <div style={{ display: 'inline-flex', border: `1px solid ${COLORS.divider}`, borderRadius: 6, overflow: 'hidden' }}>
      {options.map((opt, i) => (
        <button key={opt} onClick={() => onChange(opt)}
          style={{
            fontFamily: FONT, fontSize: 11,
            fontWeight: opt === value ? 700 : 400,
            color: opt === value ? COLORS.offWhite : COLORS.gray,
            backgroundColor: opt === value ? COLORS.charcoal : 'transparent',
            border: 'none',
            borderRight: i < options.length - 1 ? `1px solid ${COLORS.divider}` : 'none',
            padding: '6px 12px', cursor: 'pointer', transition: 'all 0.2s ease',
          }}>
          {format(opt)}
        </button>
      ))}
    </div>
  )
}

// ── Slider ──────────────────────────────────────────────────────────────────

function CompactSlider({ label, value, min, max, onChange, suffix }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void; suffix?: string
}) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 400, color: COLORS.gray }}>{label}</span>
        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: COLORS.charcoal }}>{value}{suffix ?? ''}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: COLORS.teal, height: 4, cursor: 'pointer' }} />
    </div>
  )
}

// ── Mini Pie Chart Slice ────────────────────────────────────────────────────

function ProfitPieSlice({ conventional, system }: { conventional: number; system: number }) {
  const size = 56
  const cx = size / 2
  const cy = size / 2
  const r = (size / 2) - 3

  // Single muted arc showing the savings gap (system - conventional)
  const savingsAngle = Math.max(0, system - conventional) / 100 * 360
  const totalAngle = (system / 100) * 360

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  const totalStart = polarToCartesian(0)
  const totalEnd = polarToCartesian(totalAngle)
  const totalLargeArc = totalAngle > 180 ? 1 : 0

  // Savings slice starts where conventional ends
  const convAngle = (conventional / 100) * 360
  const convEnd = polarToCartesian(convAngle)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4A4A4A" strokeWidth={r - 4} opacity={0.15} />
      {/* Total system profit arc (muted) */}
      <path
        d={`M ${cx} ${cy} L ${totalStart.x} ${totalStart.y} A ${r} ${r} 0 ${totalLargeArc} 1 ${totalEnd.x} ${totalEnd.y} Z`}
        fill="#666" opacity={0.2}
      />
      {/* Savings slice: the gap between conventional and system (teal, muted) */}
      {savingsAngle > 0 && (
        <path
          d={`M ${cx} ${cy} L ${convEnd.x} ${convEnd.y} A ${r} ${r} 0 ${savingsAngle > 180 ? 1 : 0} 1 ${totalEnd.x} ${totalEnd.y} Z`}
          fill={COLORS.teal} opacity={0.35}
        />
      )}
    </svg>
  )
}

// ── Main Input Modules ──────────────────────────────────────────────────────

interface InputsProps {
  inputs: SimulatorInputs
  insight: InsightCopy
  profitComparison: ProfitComparison
  inputAnnotation: InputAnnotation
  terminology: IndustryTerminology
  onUpdate: (patch: Partial<SimulatorInputs>) => void
}

export default function SimulatorInputs({ inputs, insight, profitComparison, inputAnnotation, terminology, onUpdate }: InputsProps) {
  const moduleStyle: React.CSSProperties = {
    flex: '1 1 220px',
    minWidth: 200,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    padding: '20px 18px',
    border: `1px solid ${COLORS.divider}`,
  }

  const headingStyle: React.CSSProperties = {
    fontFamily: FONT, fontWeight: 400, fontSize: 13, color: COLORS.gray,
    margin: '0 0 12px', lineHeight: 1.4,
  }

  return (
    <div>
      {/* v12: Input-change annotation bar (Tufte: shows what changed and why) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        border: `1px solid ${COLORS.divider}`,
        minHeight: 36,
      }}>
        <div style={{
          width: 3, height: 28, borderRadius: 2,
          backgroundColor: COLORS.teal, flexShrink: 0,
        }} />
        <p style={{
          fontFamily: FONT, fontSize: 11, fontWeight: 400, color: COLORS.labelText,
          margin: 0, lineHeight: 1.5, flex: 1,
        }}>
          {inputAnnotation.text}
        </p>
        <span style={{
          fontFamily: FONT, fontSize: 9, fontWeight: 400, color: COLORS.gray,
          fontStyle: 'italic', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {inputAnnotation.source.split(' · ').slice(0, 2).join(' · ')}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: '0 0 40px' }}>
        {/* ── 1. Growth Plan ── */}
        <div style={moduleStyle}>
          <p style={headingStyle}>What does your growth look like?</p>
          <PillSelector<GrowthPlan>
            options={Object.keys(GROWTH_PLAN_LABELS) as GrowthPlan[]}
            value={inputs.growthPlan}
            onChange={v => onUpdate({ growthPlan: v })}
            labels={GROWTH_PLAN_LABELS}
          />
          <CompactSlider
            label="How many people sell today?"
            value={inputs.sellerCount} min={1} max={25}
            onChange={v => onUpdate({ sellerCount: v })}
          />
          <CompactSlider
            label="Client renewal rate"
            value={inputs.renewalRate} min={0} max={100}
            onChange={v => onUpdate({ renewalRate: v })}
            suffix="%"
          />
        </div>

        {/* ── 2. Industry ── */}
        <div style={moduleStyle}>
          <p style={headingStyle}>What industry are you in?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {INDUSTRY_LIST.map(ind => {
              const selected = ind.key === inputs.industry
              return (
                <button key={ind.key} onClick={() => onUpdate({ industry: ind.key })}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '10px 4px', borderRadius: 6,
                    border: `1px solid ${selected ? COLORS.charcoal : 'transparent'}`,
                    backgroundColor: selected ? COLORS.charcoal + '08' : 'transparent',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    color: selected ? COLORS.charcoal : COLORS.gray,
                  }}>
                  <IndustryIcon industry={ind.key} size={22} />
                  <span style={{
                    fontFamily: FONT, fontSize: 9, fontWeight: selected ? 700 : 400,
                    textAlign: 'center', lineHeight: 1.2,
                  }}>{ind.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 3. Deal Value ── */}
        <div style={moduleStyle}>
          <p style={headingStyle}>What is your average {terminology.deals === 'deals' ? 'deal size' : `${terminology.deals.slice(0, -1)} value`}?</p>
          <PillSelector<DealRange>
            options={Object.keys(DEAL_RANGE_LABELS) as DealRange[]}
            value={inputs.dealRange}
            onChange={v => onUpdate({ dealRange: v })}
            labels={DEAL_RANGE_LABELS}
          />
          <div style={{ marginTop: 14 }}>
            <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 400, color: COLORS.gray, display: 'block', marginBottom: 6 }}>
              Typical sales cycle
            </span>
            <SegmentedControl
              options={SALES_CYCLE_OPTIONS}
              value={inputs.salesCycle}
              onChange={v => onUpdate({ salesCycle: v as SalesCycle })}
              format={v => v >= 365 ? '365d' : `${v}d`}
            />
          </div>
        </div>

        {/* ── 4. Insight Card (v12: with pie chart) ── */}
        <div style={{
          ...moduleStyle,
          backgroundColor: COLORS.charcoal,
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 10,
              letterSpacing: '0.15em', color: COLORS.oxide,
              textTransform: 'uppercase', marginBottom: 10,
            }}>
              ERA INSIGHT
            </div>
            <h3 style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 15,
              color: COLORS.offWhite, margin: '0 0 8px', lineHeight: 1.4,
            }}>
              {insight.headline}
            </h3>

            {/* v12: Pie chart + savings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '12px 0' }}>
              <ProfitPieSlice
                conventional={profitComparison.conventionalMargin}
                system={profitComparison.systemMargin}
              />
              <div>
                <div style={{
                  fontFamily: FONT, fontSize: 20, fontWeight: 700, color: COLORS.teal,
                  lineHeight: 1,
                }}>
                  +{profitComparison.savingsPts}pts
                </div>
                <div style={{
                  fontFamily: FONT, fontSize: 10, fontWeight: 400, color: '#A0A0A0',
                  lineHeight: 1.3, marginTop: 2,
                }}>
                  profitability gained<br />
                  by system-led scaling
                </div>
                <div style={{
                  fontFamily: FONT, fontSize: 9, fontWeight: 400, color: '#777',
                  marginTop: 4,
                }}>
                  {profitComparison.conventionalMargin}% conventional vs {profitComparison.systemMargin}% system {terminology.cac}
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: FONT, fontWeight: 300, fontSize: 11,
              color: '#A0A0A0', margin: 0, lineHeight: 1.5,
              maxHeight: 60, overflow: 'hidden',
            }}>
              {insight.body}
            </p>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="/#contact" style={{
              display: 'block', textAlign: 'center',
              fontFamily: FONT, fontWeight: 700, fontSize: 13,
              color: COLORS.offWhite, backgroundColor: COLORS.teal,
              padding: '10px 20px', borderRadius: 4, textDecoration: 'none',
            }}>
              Build your GTM plan
            </a>
            <a href="/" style={{
              display: 'block', textAlign: 'center',
              fontFamily: FONT, fontWeight: 400, fontSize: 12,
              color: '#A0A0A0', textDecoration: 'none', padding: '4px 0',
            }}>
              Learn about Era
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
