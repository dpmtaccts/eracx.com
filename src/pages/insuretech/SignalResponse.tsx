import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { FONT } from './theme'
import { EPISODES, WINDOW_START, WINDOW_END } from './data/episodes'
import type { VendorEpisodes, LeaderResponse, CorporateEvent, ResponseType, Confidence } from './data/episodes'

/* Signal-and-response map. Each corporate message is a node on a baseline; the
   individual leader posts that responded are plotted by x = date (time lag) and
   y = distance from the baseline (message incongruence), connected back to the
   message. Shape encodes what the leader did (repeat / translate / extend /
   prove / unrelated). Discrete events only: no monthly values are interpolated.
   Dates are approximate, converted from relative LinkedIn timestamps. */

const INK = '#0A0A0A'
const MUTED = 'rgba(10,10,10,0.55)'
const FAINT = 'rgba(10,10,10,0.10)'
const HOT = '#E6195F'
const mono = (e?: CSSProperties): CSSProperties => ({ fontFamily: FONT.mono, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 11, ...e })

// shared time scale
const T0 = Date.parse(WINDOW_START)
const SPAN = Date.parse(WINDOW_END) - T0
const frac = (d: string) => Math.max(0, Math.min(1, (Date.parse(d) - T0) / SPAN))
const MONTHS = ['2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01', '2026-06-01', '2026-07-01'].map((d) => ({ label: new Date(d).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(), f: frac(d) }))

// anchor labels that sit near a plot edge so they don't clip
const anchorFor = (x: number): 'start' | 'middle' | 'end' => (x < 90 ? 'start' : x > VW - 140 ? 'end' : 'middle')

// plot geometry (viewBox units); width maps to the plot column, height varies
const VW = 1000, PADL = 16, PADR = 20
const px = (d: string) => PADL + frac(d) * (VW - PADL - PADR)
const pxf = (f: number) => PADL + f * (VW - PADL - PADR)

// divergence: alignment 1 sits on the baseline, lower alignment rises away
const divergence = (align: number) => Math.max(0, Math.min(1, (1 - align) / 0.75))

// confidence -> connector treatment, tolerant of numeric or string values
function confKey(c: Confidence): 'high' | 'med' | 'low' {
  if (typeof c === 'number') return c >= 0.75 ? 'high' : c >= 0.5 ? 'med' : 'low'
  return c === 'high' ? 'high' : c === 'medium' ? 'med' : 'low'
}

// leader-response marks, grayscale-legible by shape
function Mark({ type, x, y, color, emph }: { type: ResponseType; x: number; y: number; color: string; emph?: boolean }) {
  const r = emph ? 5 : 4
  const sw = emph ? 2 : 1.5
  switch (type) {
    case 'repeat': return <circle cx={x} cy={y} r={r} fill="#fff" stroke={color} strokeWidth={sw} />
    case 'translate': return <circle cx={x} cy={y} r={r} fill={color} />
    case 'extend': return <path d={`M ${x} ${y - r - 1} L ${x + r + 1} ${y + r} L ${x - r - 1} ${y + r} Z`} fill={color} />
    case 'prove': return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill={color} />
    default: return <circle cx={x} cy={y} r={2.4} fill={color} opacity={0.4} />
  }
}

const TYPE_LABEL: Record<ResponseType, string> = { repeat: 'Repeat', translate: 'Translate', extend: 'Extend', prove: 'Prove', unrelated: 'Unrelated' }

interface Hover { r: LeaderResponse; ev?: CorporateEvent; color: string; left: number; top: number }

function Row({ v, expanded, onHover }: { v: VendorEpisodes; expanded: boolean; onHover: (h: Hover | null) => void }) {
  const H = expanded ? 320 : 182
  const baseY = expanded ? H - 66 : H - 58
  const topY = 14
  const vRange = baseY - topY
  const evX = useMemo(() => Object.fromEntries(v.corporateEvents.map((e) => [e.id, px(e.date)])), [v])
  const answered = useMemo(() => new Set(v.leaderResponses.map((r) => r.matchedCorporateEventId).filter(Boolean) as string[]), [v])

  // resolve leader-mark positions; in the enlarged view, fan near-coincident
  // points upward so their labels do not overprint (jitter, per spec, only to
  // separate collisions).
  const points = useMemo(() => {
    const placed: { x: number; y: number }[] = []
    return v.leaderResponses.map((r) => {
      const x = px(r.date)
      let y = baseY - divergence(r.semanticAlignment) * vRange
      if (expanded) {
        let n = 0
        while (n < 12 && placed.some((p) => Math.abs(p.x - x) < 54 && Math.abs(p.y - y) < 15)) { y -= 15; n++ }
      }
      placed.push({ x, y })
      return { r, x, y }
    })
  }, [v, expanded, baseY, vRange])

  // stagger corporate labels (placed below the baseline) so clustered events
  // do not overprint each other. Tier resets when a horizontal gap opens.
  const tiers = useMemo(() => {
    const out: Record<string, number> = {}
    let clusterX = -999, tier = 0
    ;[...v.corporateEvents].sort((a, b) => Date.parse(a.date) - Date.parse(b.date)).forEach((e) => {
      const x = px(e.date)
      if (x - clusterX < 150) tier += 1
      else { tier = 0; clusterX = x }
      out[e.id] = tier
    })
    return out
  }, [v])

  return (
    <svg viewBox={`0 0 ${VW} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
      {/* month gridlines */}
      {MONTHS.map((m) => <line key={m.label} x1={pxf(m.f)} y1={topY - 6} x2={pxf(m.f)} y2={baseY} stroke="rgba(10,10,10,0.05)" strokeWidth="1" />)}
      {/* brand baseline */}
      <line x1={PADL} y1={baseY} x2={VW - PADR} y2={baseY} stroke="rgba(10,10,10,0.25)" strokeWidth="1" />

      {/* halos */}
      {v.corporateEvents.map((e) => {
        const x = evX[e.id]
        const w = (e.persistenceDays / (SPAN / 86400000)) * (VW - PADL - PADR)
        const segs = [0.08, 0.055, 0.035, 0.018]
        return <g key={`h-${e.id}`}>{segs.map((op, i) => <rect key={i} x={x + (w * i) / segs.length} y={topY} width={w / segs.length} height={baseY - topY} fill={v.color} opacity={op} />)}</g>
      })}

      {/* connectors (leader response back to its brand message) */}
      {points.map(({ r, x, y }) => {
        if (!r.matchedCorporateEventId || evX[r.matchedCorporateEventId] == null) return null
        const ck = confKey(r.matchConfidence)
        return <line key={`c-${r.id}`} x1={evX[r.matchedCorporateEventId]} y1={baseY} x2={x} y2={y} stroke={v.color}
          strokeWidth={ck === 'high' ? 1.3 : 1} opacity={ck === 'high' ? 0.5 : ck === 'med' ? 0.36 : 0.24}
          strokeDasharray={ck === 'low' ? '2 3' : undefined} />
      })}

      {/* corporate nodes + labels below the baseline + unresolved tails */}
      {v.corporateEvents.map((e) => {
        const x = evX[e.id]
        const isAnswered = answered.has(e.id)
        const ly = baseY + 16 + tiers[e.id] * 12
        return (
          <g key={e.id}>
            <path d={`M ${x} ${baseY - 5} L ${x + 5} ${baseY} L ${x} ${baseY + 5} L ${x - 5} ${baseY} Z`} fill={v.color} />
            {!isAnswered && (() => { const flip = x > VW - 160; const dx = flip ? -22 : 22; return <>
              <line x1={x} y1={baseY} x2={x + dx} y2={baseY - 16} stroke={v.color} strokeWidth="1" strokeDasharray="2 3" opacity={0.55} />
              <text x={x + dx + (flip ? -3 : 3)} y={baseY - 18} textAnchor={flip ? 'end' : 'start'} style={mono({ fontSize: 8, letterSpacing: '0.05em' })} fill={MUTED}>no response</text>
            </> })()}
            {/* stem to staggered label */}
            <line x1={x} y1={baseY + 5} x2={x} y2={ly - 8} stroke={FAINT} strokeWidth="1" />
            <text x={x} y={ly} textAnchor={anchorFor(x)} style={mono({ fontSize: 9, letterSpacing: '0.05em' })} fill={INK}>{e.label}</text>
          </g>
        )
      })}

      {/* leader response marks */}
      {points.map(({ r, x, y }) => {
        const ev = r.matchedCorporateEventId ? v.corporateEvents.find((el) => el.id === r.matchedCorporateEventId) : undefined
        return (
          <g key={r.id} style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => onHover({ r, ev, color: v.color, left: e.clientX, top: e.clientY })}
            onMouseMove={(e) => onHover({ r, ev, color: v.color, left: e.clientX, top: e.clientY })}
            onMouseLeave={() => onHover(null)}>
            <circle cx={x} cy={y} r={11} fill="transparent" />
            <Mark type={r.responseType} x={x} y={y} color={v.color} />
            {expanded && (
              <text x={x + 8} y={y + 3} style={mono({ fontSize: 9, letterSpacing: '0.04em' })} fill={INK}>
                {r.leaderName.split(' ').slice(-1)[0]}{r.lagDays != null ? ` +${r.lagDays}d` : ''}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function Summary({ v }: { v: VendorEpisodes }) {
  const s = v.summary
  const stat = (label: string, val: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: `1px solid ${FAINT}`, padding: '5px 0' }}>
      <span style={mono({ fontSize: 9, letterSpacing: '0.08em', color: MUTED })}>{label}</span>
      <span style={{ fontFamily: FONT.mono, fontSize: 11, fontWeight: 600, textAlign: 'right' }}>{val}</span>
    </div>
  )
  return (
    <div>
      <div style={{ fontFamily: FONT.display, fontSize: 20, lineHeight: 1 }}>{v.name}</div>
      <div style={{ ...mono({ fontSize: 9, letterSpacing: '0.1em', color: v.color }), marginTop: 4, marginBottom: 8 }}>{v.model}</div>
      {stat('Median lag', s.medianLagDays == null ? 'no handoff' : `${s.medianLagDays} d`)}
      {stat('Answered', s.respondedEpisodes)}
      {stat('Interpret / prove', s.interpretationOrProof)}
      <div style={{ fontSize: 12.5, color: INK, marginTop: 10, lineHeight: 1.4 }}>{s.pattern}</div>
    </div>
  )
}

const LEGEND: { type: ResponseType; label: string }[] = [
  { type: 'repeat', label: 'Repeat' }, { type: 'translate', label: 'Translate' }, { type: 'extend', label: 'Extend' }, { type: 'prove', label: 'Prove' }, { type: 'unrelated', label: 'Unrelated' },
]

export function SignalResponse() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hover, setHover] = useState<Hover | null>(null)
  const [narrow, setNarrow] = useState(false)
  const secRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)')
    const sync = () => setNarrow(mq.matches)
    sync(); mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const rows = selected ? EPISODES.filter((v) => v.company === selected) : EPISODES

  const chip = (active: boolean, color?: string): CSSProperties => ({
    ...mono({ fontSize: 11, letterSpacing: '0.1em' }), padding: '8px 14px', cursor: 'pointer',
    background: active ? (color ?? INK) : 'transparent', color: active ? '#fff' : INK,
    border: `1px solid ${active ? (color ?? INK) : FAINT}`, transition: 'all 160ms ease',
  })

  return (
    <section id="trajectory" ref={secRef} style={{ padding: '4vw 3vw', borderBottom: `1px solid ${INK}`, background: '#fff', position: 'relative' }}>
      <div style={{ maxWidth: 860, marginBottom: 22 }}>
        <div style={mono({ color: HOT })}>▸ 04 · Congruence over time</div>
        <h2 style={{ fontFamily: FONT.display, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.06, marginTop: 10 }}>
          Brand messages create the signal. Leaders reveal whether it travels.
        </h2>
        <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: MUTED, marginTop: 14, lineHeight: 1.55 }}>
          Each corporate message begins a potential cascade. Horizontal distance shows how long leaders took to respond. Vertical distance shows how closely their message aligned. Shape distinguishes repetition, interpretation, extension, and proof.
        </p>
        <p style={{ ...mono({ fontSize: 10, letterSpacing: '0.08em', color: INK }), marginTop: 12 }}>Right = later &nbsp;·&nbsp; farther from the baseline = less congruent</p>
      </div>

      {/* legend + controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', marginBottom: 10 }}>
        {LEGEND.map((l) => (
          <span key={l.type} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><Mark type={l.type} x={7} y={7} color={INK} /></svg>
            <span style={mono({ fontSize: 9.5, letterSpacing: '0.08em', color: MUTED })}>{l.label}</span>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        <button onClick={() => setSelected(null)} style={chip(selected === null)}>All vendors</button>
        {EPISODES.map((v) => <button key={v.company} onClick={() => setSelected(v.company)} style={chip(selected === v.company, v.color)}>{v.name}</button>)}
      </div>

      {/* shared month axis */}
      <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) 220px', gap: narrow ? 0 : 28 }}>
        <svg viewBox={`0 0 ${VW} 22`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto' }}>
          {MONTHS.map((m) => <text key={m.label} x={pxf(m.f)} y={15} style={mono({ fontSize: 10, letterSpacing: '0.14em' })} fill={MUTED}>{m.label}</text>)}
        </svg>
        {!narrow && <div />}
      </div>

      {/* rows */}
      {rows.map((v) => (
        <div key={v.company} style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) 220px', gap: narrow ? 12 : 28, alignItems: 'start', borderTop: `1px solid ${FAINT}`, padding: '14px 0' }}>
          <Row v={v} expanded={selected === v.company} onHover={setHover} />
          <Summary v={v} />
        </div>
      ))}

      {/* caveats */}
      <div style={{ ...mono({ fontSize: 10, letterSpacing: '0.06em', color: MUTED }), marginTop: 16, lineHeight: 1.7, maxWidth: 900 }}>
        Messages are discrete events. No monthly values are interpolated.<br />
        LinkedIn dates derived from relative timestamps are approximate. The figure represents observed public communication, not total internal alignment. Semantic alignment and response type are ERA judgments.
      </div>

      {/* hover tooltip */}
      {hover && (
        <div style={{ position: 'fixed', left: Math.min(hover.left + 14, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 320), top: hover.top + 14, width: 300, background: INK, color: '#fff', padding: '12px 14px', zIndex: 50, pointerEvents: 'none', border: `2px solid ${hover.color}` }}>
          <div style={{ fontFamily: FONT.display, fontSize: 15 }}>{hover.r.leaderName}</div>
          {hover.r.leaderRole && <div style={mono({ fontSize: 9, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', marginTop: 2 })}>{hover.r.leaderRole}</div>}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8, ...mono({ fontSize: 9, letterSpacing: '0.06em', color: hover.color }) }}>
            <span>{TYPE_LABEL[hover.r.responseType]}</span>
            {hover.r.lagDays != null && <span>+{hover.r.lagDays}d lag</span>}
            <span>align {Math.round(hover.r.semanticAlignment * 100)}%</span>
          </div>
          {hover.ev && <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>on: {hover.ev.label}</div>}
          {hover.r.sourceExcerpt && <div style={{ fontSize: 12, color: '#fff', marginTop: 6, lineHeight: 1.4, fontStyle: 'italic' }}>“{hover.r.sourceExcerpt}”</div>}
          <div style={mono({ fontSize: 8.5, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.45)', marginTop: 8 })}>{hover.r.relativeTs ? `${hover.r.relativeTs} · ` : ''}date approximate</div>
        </div>
      )}
    </section>
  )
}
