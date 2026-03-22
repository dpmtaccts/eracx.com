import { useState, useEffect, useMemo } from 'react'
import {
  computeProjection,
  getHeadcountByGroup,
  RISK_COLORS,
  FUNCTION_GROUPS,
  type GtmInputs,
  type Vertical,
  type RiskLevel,
  type BenchmarkMilestone,
  type MilestoneResult,
  type RoleRange,
} from '../lib/gtmEngine'

// ── Constants ──────────────────────────────────────────────────────────────

const COLORS = {
  charcoal: '#383838',
  charcoalLight: '#454545',
  offWhite: '#F6F5F2',
  pageBg: '#EFEDE8',
  cardBg: '#FFFFFF',
  divider: '#D7DADD',
  secondary: '#5B6670',
  teal: '#1FA7A2',
  oxide: '#B85C4A',
  sand: '#D6B26D',
}

const FONT = "'Source Sans 3', sans-serif"

const VERTICALS: Vertical[] = [
  'SaaS',
  'IT Services',
  'Staffing',
  'Healthcare IT',
  'Fintech',
  'Professional Services',
  'Manufacturing',
]

// ── Slider Component ───────────────────────────────────────────────────────

function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
  tooltip,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  format: (v: number) => string
  onChange: (v: number) => void
  tooltip?: string
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 6,
      }}>
        <span style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 10, letterSpacing: '0.1em',
          color: COLORS.secondary, textTransform: 'uppercase' as const,
        }}>
          {label}
          {tooltip && (
            <span title={tooltip} style={{
              marginLeft: 6, cursor: 'help', opacity: 0.5, fontSize: 11,
            }}>&#9432;</span>
          )}
        </span>
        <span style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 14, color: COLORS.offWhite,
        }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: COLORS.teal,
          height: 6,
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

// ── Stacked Bar Chart ──────────────────────────────────────────────────────

function OrgChart({
  milestones,
  userHeadcount,
}: {
  milestones: MilestoneResult[]
  userHeadcount: number
}) {
  if (milestones.length === 0) return null

  const W = 700
  const H = 320
  const PAD = { top: 30, right: 20, bottom: 60, left: 50 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  // Get headcount by function group for each milestone
  const barData = milestones.map(m => getHeadcountByGroup(m.milestone.roles))

  const maxCount = Math.max(...barData.map(groups => groups.reduce((s, g) => s + g.count, 0))) * 1.1
  const barWidth = Math.min(60, chartW / milestones.length * 0.55)
  const barGap = (chartW - barWidth * milestones.length) / (milestones.length + 1)

  const yScale = (v: number) => PAD.top + chartH - (v / maxCount) * chartH

  // Y-axis ticks
  const yTickCount = 5
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((maxCount / yTickCount) * i)
  )

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      {/* Grid lines */}
      {yTicks.map(v => (
        <g key={v}>
          <line
            x1={PAD.left} y1={yScale(v)} x2={W - PAD.right} y2={yScale(v)}
            stroke="rgba(56,56,56,0.08)" strokeDasharray="4 4"
          />
          <text
            x={PAD.left - 10} y={yScale(v) + 4}
            textAnchor="end" fill={COLORS.secondary}
            fontFamily={FONT} fontSize={10} fontWeight={300}
          >
            {v}
          </text>
        </g>
      ))}

      {/* Bars */}
      {barData.map((groups, barIdx) => {
        const x = PAD.left + barGap + barIdx * (barWidth + barGap)
        let yOffset = 0

        return (
          <g key={barIdx}>
            {groups.map((group) => {
              if (group.count === 0) return null
              const barH = (group.count / maxCount) * chartH
              const y = yScale(yOffset + group.count)
              yOffset += group.count

              return (
                <rect
                  key={group.key}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  fill={group.color}
                  rx={2}
                  opacity={barIdx === 0 ? 1 : 0.85}
                />
              )
            })}

            {/* Milestone label */}
            <text
              x={x + barWidth / 2}
              y={H - PAD.bottom + 18}
              textAnchor="middle" fill={COLORS.charcoal}
              fontFamily={FONT} fontSize={10} fontWeight={700}
            >
              ${milestones[barIdx].milestone.revenueFloor}M
            </text>
            <text
              x={x + barWidth / 2}
              y={H - PAD.bottom + 32}
              textAnchor="middle" fill={COLORS.secondary}
              fontFamily={FONT} fontSize={9} fontWeight={300}
            >
              {milestones[barIdx].milestone.label}
            </text>

            {/* Total headcount label above bar */}
            <text
              x={x + barWidth / 2}
              y={yScale(yOffset) - 6}
              textAnchor="middle" fill={COLORS.charcoal}
              fontFamily={FONT} fontSize={11} fontWeight={700}
            >
              {yOffset}
            </text>
          </g>
        )
      })}

      {/* User's current headcount marker */}
      {userHeadcount > 0 && (
        <g>
          <line
            x1={PAD.left}
            y1={yScale(userHeadcount)}
            x2={PAD.left + barGap + barWidth + barGap * 0.5}
            y2={yScale(userHeadcount)}
            stroke={COLORS.oxide}
            strokeWidth={2}
            strokeDasharray="6 3"
          />
          <text
            x={PAD.left + barGap + barWidth + barGap * 0.5 + 6}
            y={yScale(userHeadcount) + 4}
            fill={COLORS.oxide}
            fontFamily={FONT} fontSize={10} fontWeight={700}
          >
            YOU: {userHeadcount}
          </text>
        </g>
      )}

      {/* Y-axis label */}
      <text
        x={14} y={H / 2}
        textAnchor="middle" fill={COLORS.secondary}
        fontFamily={FONT} fontSize={11} fontWeight={700} letterSpacing="0.05em"
        transform={`rotate(-90, 14, ${H / 2})`}
      >
        GTM HEADCOUNT
      </text>
    </svg>
  )
}

// ── Chart Legend ────────────────────────────────────────────────────────────

function ChartLegend() {
  return (
    <div style={{
      display: 'flex', gap: 16, flexWrap: 'wrap',
      padding: '8px 0',
    }}>
      {FUNCTION_GROUPS.map(g => (
        <div key={g.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 10, height: 10, borderRadius: 2,
            backgroundColor: g.color,
          }} />
          <span style={{
            fontFamily: FONT, fontSize: 11, fontWeight: 300, color: COLORS.secondary,
          }}>
            {g.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Risk Badge ─────────────────────────────────────────────────────────────

function RiskBadge({ risk }: { risk: RiskLevel }) {
  const color = RISK_COLORS[risk]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px',
      background: color + '14',
      borderRadius: 2,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        backgroundColor: color,
      }} />
      <span style={{
        fontFamily: FONT, fontWeight: 700, fontSize: 10, letterSpacing: '0.06em',
        color,
        textTransform: 'uppercase' as const,
      }}>
        {risk}
      </span>
    </span>
  )
}

// ── Org Shape Table (inside milestone card) ────────────────────────────────

function OrgShapeTable({ milestone }: { milestone: BenchmarkMilestone }) {
  const rangeRoles: { key: string; label: string }[] = [
    { key: 'aes', label: 'Account Executives' },
    { key: 'sdrs', label: 'SDRs / Outbound' },
    { key: 'sdrManager', label: 'SDR Manager' },
    { key: 'marketingGeneralists', label: 'Marketing' },
    { key: 'demandGen', label: 'Demand Gen' },
    { key: 'revops', label: 'RevOps' },
    { key: 'csm', label: 'Customer Success' },
  ]
  const boolRoles: { key: string; label: string }[] = [
    { key: 'vpSales', label: 'VP Sales' },
    { key: 'cro', label: 'CRO' },
    { key: 'cmo', label: 'CMO' },
  ]

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
      {rangeRoles.map(r => {
        const range = (milestone.roles as unknown as Record<string, RoleRange | boolean>)[r.key] as RoleRange
        if (range.high === 0) return null
        return (
          <div key={r.key} style={{
            fontFamily: FONT, fontSize: 12, color: COLORS.charcoal,
            padding: '3px 0', minWidth: 160,
          }}>
            <span style={{ fontWeight: 300, color: COLORS.secondary }}>{r.label}: </span>
            <span style={{ fontWeight: 700 }}>
              {range.low === range.high ? range.low : `${range.low}-${range.high}`}
            </span>
          </div>
        )
      })}
      {boolRoles.map(r => {
        const present = (milestone.roles as unknown as Record<string, RoleRange | boolean>)[r.key] as boolean
        if (!present) return null
        return (
          <div key={r.key} style={{
            fontFamily: FONT, fontSize: 12, color: COLORS.charcoal,
            padding: '3px 0', minWidth: 160,
          }}>
            <span style={{ fontWeight: 300, color: COLORS.secondary }}>{r.label}: </span>
            <span style={{ fontWeight: 700 }}>Yes</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Milestone Card ─────────────────────────────────────────────────────────

function MilestoneCard({ result, isCurrentStage }: { result: MilestoneResult; isCurrentStage: boolean }) {
  const { milestone, decisions, riskLevel } = result

  return (
    <div style={{
      background: COLORS.cardBg,
      border: `1px solid ${isCurrentStage ? COLORS.teal + '50' : COLORS.divider}`,
      borderRadius: 6,
      padding: '24px 24px 20px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 14,
      }}>
        <div>
          <span style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 18, color: COLORS.charcoal,
          }}>
            ${milestone.revenueFloor}-${milestone.revenueCeiling}M
          </span>
          <span style={{
            fontFamily: FONT, fontWeight: 300, fontSize: 13, color: COLORS.secondary,
            marginLeft: 10,
          }}>
            {milestone.label}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isCurrentStage && (
            <span style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em',
              color: COLORS.teal, textTransform: 'uppercase' as const,
              padding: '3px 8px',
              background: COLORS.teal + '12',
              borderRadius: 2,
            }}>
              You are here
            </span>
          )}
          {riskLevel && <RiskBadge risk={riskLevel} />}
        </div>
      </div>

      {/* Org shape */}
      <div style={{
        padding: '12px 14px',
        background: COLORS.pageBg,
        borderRadius: 4,
        marginBottom: 14,
      }}>
        <div style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em',
          color: COLORS.secondary, textTransform: 'uppercase' as const,
          marginBottom: 8,
        }}>
          Benchmark Team Shape
        </div>
        <OrgShapeTable milestone={milestone} />
        <div style={{
          fontFamily: FONT, fontWeight: 300, fontSize: 11, color: COLORS.secondary,
          marginTop: 8, borderTop: `1px solid ${COLORS.divider}`, paddingTop: 8,
        }}>
          Total: {milestone.totalHeadcount.low}-{milestone.totalHeadcount.high} headcount
          {' · '}
          ${milestone.annualGtmCost.low >= 1000
            ? `${(milestone.annualGtmCost.low / 1000).toFixed(1)}M`
            : `${milestone.annualGtmCost.low}K`
          }-${milestone.annualGtmCost.high >= 1000
            ? `${(milestone.annualGtmCost.high / 1000).toFixed(1)}M`
            : `${milestone.annualGtmCost.high}K`
          }/yr fully loaded
        </div>
      </div>

      {/* Key transition */}
      <div style={{
        fontFamily: FONT, fontWeight: 300, fontSize: 13, color: COLORS.secondary,
        lineHeight: 1.6, marginBottom: decisions.length > 0 ? 16 : 0,
        paddingLeft: 12,
        borderLeft: `3px solid ${COLORS.divider}`,
      }}>
        {milestone.keyTransition}
      </div>

      {/* Investment decisions */}
      {decisions.length > 0 && (
        <div>
          <div style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em',
            color: COLORS.secondary, textTransform: 'uppercase' as const,
            marginBottom: 10,
          }}>
            Investment Decisions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {decisions.map(d => (
              <div key={d.function} style={{
                background: COLORS.pageBg,
                borderRadius: 4,
                padding: '10px 14px',
              }}>
                <div style={{
                  fontFamily: FONT, fontWeight: 700, fontSize: 13, color: COLORS.charcoal,
                  marginBottom: 6,
                }}>
                  {d.roleLabel}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {d.options.map((opt, i) => (
                    <div key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 10px',
                      background: opt.isEra ? COLORS.teal + '12' : 'rgba(255,255,255,0.7)',
                      border: `1px solid ${opt.isEra ? COLORS.teal + '40' : COLORS.divider}`,
                      borderRadius: 3,
                    }}>
                      <span style={{
                        fontFamily: FONT, fontWeight: 700, fontSize: 9, letterSpacing: '0.06em',
                        color: opt.path === 'HIRE' ? COLORS.sand
                          : opt.path === 'BUY' ? COLORS.secondary
                          : COLORS.teal,
                        textTransform: 'uppercase' as const,
                      }}>
                        {opt.path}
                      </span>
                      <span style={{
                        fontFamily: FONT, fontWeight: 400, fontSize: 11, color: COLORS.charcoal,
                      }}>
                        {opt.description}
                      </span>
                      <span style={{
                        fontFamily: FONT, fontWeight: 300, fontSize: 10, color: COLORS.secondary,
                      }}>
                        ${opt.annualCost >= 1000
                          ? `${(opt.annualCost / 1000).toFixed(1)}M`
                          : `${opt.annualCost}K`
                        }/yr · {opt.timeToProductive}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function GtmPlanner() {
  const [inputs, setInputs] = useState<GtmInputs>({
    currentRevenue: 12,
    targetRevenue: 36,
    vertical: 'SaaS',
    currentHeadcount: 8,
  })

  useEffect(() => {
    document.title = 'GTM Investment Planner | Era'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'See what the GTM org looks like at each revenue stage. Plan your team, investments, and tradeoffs from where you are to where you are going.')
    }
  }, [])

  const update = (patch: Partial<GtmInputs>) => setInputs(prev => ({ ...prev, ...patch }))

  const projection = useMemo(() => computeProjection(inputs), [inputs])
  const { currentStage, milestones, comparativeCallout, overallRisk, nudge } = projection

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.pageBg,
      color: COLORS.charcoal,
      fontFamily: FONT,
      fontWeight: 300,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 32px',
        borderBottom: `1px solid ${COLORS.divider}`,
        backgroundColor: COLORS.cardBg,
      }}>
        <a href="/" style={{
          fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: '0.3em',
          color: COLORS.oxide, textDecoration: 'none',
        }}>
          ERA
        </a>
        <span style={{
          fontFamily: FONT, fontWeight: 300, fontSize: 11, color: COLORS.secondary,
        }}>
          eracx.com
        </span>
      </div>

      {/* Main layout */}
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 61px)',
      }}
        id="gtm-planner-layout"
      >
        {/* ── Left Panel: Inputs (dark) ── */}
        <div style={{
          width: 340,
          minWidth: 300,
          flexShrink: 0,
          padding: '32px 28px',
          backgroundColor: COLORS.charcoal,
          overflowY: 'auto',
        }}
          className="gtm-input-panel"
        >
          {/* Title */}
          <div style={{
            background: COLORS.charcoalLight,
            borderRadius: 4,
            padding: '24px 20px',
            marginBottom: 24,
          }}>
            <h1 style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 22, color: COLORS.offWhite,
              margin: '0 0 8px',
            }}>
              GTM Investment Planner
            </h1>
            <p style={{
              fontFamily: FONT, fontWeight: 300, fontSize: 13, color: COLORS.secondary,
              margin: 0, lineHeight: 1.5,
            }}>
              See what your GTM org should look like at each revenue milestone. Plan your team, investments, and tradeoffs.
            </p>
          </div>

          {/* Your Company */}
          <div style={{
            background: COLORS.charcoalLight,
            borderRadius: 4,
            padding: '20px 20px 12px',
          }}>
            <h3 style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 13, color: COLORS.offWhite,
              margin: '0 0 16px',
            }}>
              Your Company
            </h3>

            <SliderInput
              label="Current Revenue"
              value={inputs.currentRevenue}
              min={5} max={80} step={1}
              format={v => `$${v}M`}
              onChange={v => update({ currentRevenue: v, targetRevenue: Math.max(inputs.targetRevenue, v + 5) })}
              tooltip="Current annual recurring revenue"
            />

            <SliderInput
              label="Target Revenue (3 years)"
              value={inputs.targetRevenue}
              min={inputs.currentRevenue + 5} max={200} step={1}
              format={v => `$${v}M`}
              onChange={v => update({ targetRevenue: v })}
            />

            {/* Vertical dropdown */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 6,
              }}>
                <span style={{
                  fontFamily: FONT, fontWeight: 700, fontSize: 10, letterSpacing: '0.1em',
                  color: COLORS.secondary, textTransform: 'uppercase' as const,
                }}>
                  Vertical
                </span>
              </div>
              <select
                value={inputs.vertical}
                onChange={e => update({ vertical: e.target.value as Vertical })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(215,218,221,0.2)',
                  borderRadius: 2,
                  color: COLORS.offWhite,
                  fontSize: 13,
                  fontFamily: FONT,
                  fontWeight: 300,
                  appearance: 'none' as const,
                  WebkitAppearance: 'none' as const,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%235B6670' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  backgroundSize: '12px 8px',
                  cursor: 'pointer',
                }}
              >
                {VERTICALS.map(v => (
                  <option key={v} value={v} style={{ backgroundColor: COLORS.charcoal }}>{v}</option>
                ))}
              </select>
            </div>

            <SliderInput
              label="Current GTM Headcount"
              value={inputs.currentHeadcount}
              min={0} max={50} step={1}
              format={v => v === 0 ? 'Not specified' : `${v}`}
              onChange={v => update({ currentHeadcount: v })}
              tooltip="Total sales, marketing, SDR, CS, RevOps headcount. Set to 0 to skip."
            />
          </div>
        </div>

        {/* ── Right Panel: Results (light) ── */}
        <div style={{
          flex: 1,
          padding: '32px 36px',
          overflowY: 'auto',
        }}
          className="gtm-results-panel"
        >
          {/* Path headline */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 24,
          }}>
            <span style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 20, color: COLORS.charcoal,
            }}>
              ${inputs.currentRevenue}M → ${inputs.targetRevenue}M
            </span>
            <span style={{
              fontFamily: FONT, fontWeight: 300, fontSize: 13, color: COLORS.secondary,
            }}>
              {currentStage.label} → {milestones[milestones.length - 1]?.milestone.label || currentStage.label}
            </span>
            {overallRisk && <RiskBadge risk={overallRisk} />}
          </div>

          {/* Comparative callout */}
          {comparativeCallout && (
            <div style={{
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.divider}`,
              borderLeft: `4px solid ${overallRisk === 'Critical' || overallRisk === 'At risk' ? COLORS.oxide : overallRisk === 'Watch' ? COLORS.sand : COLORS.teal}`,
              borderRadius: 4,
              padding: '18px 22px',
              marginBottom: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                fontFamily: FONT, fontWeight: 700, fontSize: 14, color: COLORS.charcoal,
                marginBottom: 6, lineHeight: 1.4,
              }}>
                {comparativeCallout.headline}
              </div>
              <div style={{
                fontFamily: FONT, fontWeight: 300, fontSize: 13, color: COLORS.secondary,
                lineHeight: 1.5,
              }}>
                {comparativeCallout.body}
              </div>
            </div>
          )}

          {/* Chart */}
          <div style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.divider}`,
            borderRadius: 6,
            padding: '20px 16px 12px',
            marginBottom: 28,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 8, padding: '0 8px',
            }}>
              <span style={{
                fontFamily: FONT, fontWeight: 700, fontSize: 14, color: COLORS.charcoal,
              }}>
                GTM Org Shape by Revenue Milestone
              </span>
            </div>
            <ChartLegend />
            <OrgChart
              milestones={milestones}
              userHeadcount={inputs.currentHeadcount}
            />
          </div>

          {/* Milestone cards */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{
              fontFamily: FONT, fontWeight: 700, fontSize: 14, color: COLORS.charcoal,
              margin: '0 0 14px',
            }}>
              Revenue Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {milestones.map((m, i) => (
                <MilestoneCard
                  key={m.milestone.stage}
                  result={m}
                  isCurrentStage={i === 0}
                />
              ))}
            </div>
          </div>

          {/* Bottom: Overall + Era Nudge */}
          <div style={{
            display: 'flex', gap: 16, flexWrap: 'wrap',
          }}>
            {/* Overall assessment */}
            {overallRisk && (
              <div style={{
                flex: '1 1 340px',
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.divider}`,
                padding: 24,
                borderRadius: 6,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginBottom: 12,
                }}>
                  <RiskBadge risk={overallRisk} />
                  <span style={{
                    fontFamily: FONT, fontWeight: 700, fontSize: 9, letterSpacing: '0.1em',
                    color: COLORS.secondary, textTransform: 'uppercase' as const,
                  }}>
                    Overall Assessment
                  </span>
                </div>
                <div style={{
                  fontFamily: FONT, fontWeight: 700, fontSize: 16, color: COLORS.charcoal,
                  marginBottom: 8, lineHeight: 1.4,
                }}>
                  {overallRisk === 'Critical' && `Your GTM org is structured for a smaller company than $${inputs.currentRevenue}M.`}
                  {overallRisk === 'At risk' && 'Significant structural gaps that are already limiting growth.'}
                  {overallRisk === 'Watch' && 'On the edge: a few gaps to close before the next stage.'}
                  {overallRisk === 'On track' && `Your GTM org is well-matched for $${inputs.currentRevenue}M.`}
                </div>
                <div style={{
                  fontFamily: FONT, fontWeight: 300, fontSize: 13, color: COLORS.secondary,
                  lineHeight: 1.5,
                }}>
                  {milestones.length - 1} stage transition{milestones.length - 1 !== 1 ? 's' : ''} between $
                  {inputs.currentRevenue}M and ${inputs.targetRevenue}M.
                  Each transition requires investment decisions across team, tools, and infrastructure.
                </div>
              </div>
            )}

            {/* Era Nudge Card */}
            <div style={{
              flex: '0 1 320px',
              background: COLORS.charcoal,
              border: '1px solid rgba(31,167,162,0.25)',
              padding: 24,
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{
                  fontFamily: FONT, fontWeight: 700, fontSize: 16, color: COLORS.offWhite,
                  marginBottom: 12, lineHeight: 1.3,
                }}>
                  {nudge.headline}
                </div>
                <div style={{
                  fontFamily: FONT, fontWeight: 300, fontSize: 13, color: COLORS.secondary,
                  lineHeight: 1.5, marginBottom: 20,
                }}>
                  {nudge.body}
                </div>
              </div>
              <a
                href="/#contact"
                style={{
                  display: 'inline-block',
                  fontFamily: FONT, fontWeight: 700, fontSize: 13,
                  color: COLORS.teal, textDecoration: 'none',
                  padding: '10px 0',
                  borderTop: `1px solid ${COLORS.teal}30`,
                  cursor: 'pointer',
                }}
              >
                {nudge.ctaLabel} →
              </a>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 40, paddingTop: 20,
            borderTop: `1px solid ${COLORS.divider}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{
              fontFamily: FONT, fontWeight: 300, fontSize: 10, color: COLORS.secondary,
              letterSpacing: '0.05em',
            }}>
              Connection Loops · Trust Loops · Loyalty Loops
            </span>
            <span style={{
              fontFamily: FONT, fontWeight: 300, fontSize: 10, color: COLORS.secondary,
            }}>
              eracx.com
            </span>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;700&display=swap');

        @media (max-width: 768px) {
          #gtm-planner-layout {
            flex-direction: column !important;
          }
          .gtm-input-panel {
            width: 100% !important;
            min-width: 0 !important;
            border-right: none !important;
            border-bottom: none !important;
            max-height: none !important;
          }
          .gtm-results-panel {
            padding: 24px 16px !important;
          }
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255,255,255,0.12);
          border-radius: 3px;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${COLORS.offWhite};
          cursor: pointer;
          border: 2px solid ${COLORS.teal};
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${COLORS.offWhite};
          cursor: pointer;
          border: 2px solid ${COLORS.teal};
        }
      `}</style>
    </div>
  )
}
