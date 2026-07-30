import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { FONT } from './theme'

/* Five forces that move the buying system. A horizontal, click-through deck.
   Each card pairs a custom infographic (with a time axis, so the force reads as
   a system evolving) with the tension headline, source, and confidence.
   Arrows, dots, keyboard, and pointer swipe. Vendor-authored figures flagged. */

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const LINE = 'rgba(10,10,10,0.15)'
const FAINT = 'rgba(10,10,10,0.10)'
const MUTED = 'rgba(10,10,10,0.55)'
const HOT = '#E6195F'
const COBALT = '#1845C2'
const RUST = '#DD5C20'

const mono = (e?: CSSProperties): CSSProperties => ({ fontFamily: FONT.mono, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, ...e })
const MONO = 'JetBrains Mono, monospace'

// ---------- infographics (one per force, each with a time axis) ----------
const svgWrap = (children: ReactNode) => (
  <svg viewBox="0 0 300 150" style={{ width: '100%', height: 'auto', display: 'block' }}>{children}</svg>
)
function axis(labels: [string, string]) {
  return (
    <>
      <line x1="16" y1="126" x2="284" y2="126" stroke={LINE} strokeWidth="1" />
      <text x="16" y="142" fontFamily={MONO} fontSize="8" fill={MUTED}>{labels[0]}</text>
      <text x="284" y="142" textAnchor="end" fontFamily={MONO} fontSize="8" fill={MUTED}>{labels[1]}</text>
    </>
  )
}
// 1 · the coalition fractures: committees grow, the veto migrates
function IgCoalition(c: string) {
  const cols = [{ x: 58, r: 13, n: 3, l: 'WEEK 1' }, { x: 152, r: 22, n: 6, l: 'MONTH 3' }, { x: 246, r: 31, n: 11, l: 'BOARD' }]
  return svgWrap(<g>
    {cols.map((s, i) => (
      <g key={i}>
        <circle cx={s.x} cy={62} r={s.r} fill="none" stroke={INK} strokeWidth="1.4" />
        {Array.from({ length: s.n }).map((_, j) => { const a = (j / s.n) * Math.PI * 2; return <circle key={j} cx={s.x + Math.cos(a) * (s.r - 4)} cy={62 + Math.sin(a) * (s.r - 4)} r="1.7" fill={INK} /> })}
        <text x={s.x} y={112} textAnchor="middle" fontFamily={MONO} fontSize="8" fill={MUTED}>{s.l}</text>
        <rect x={s.x - 3} y={62 - s.r - 8} width="6" height="6" fill={c} opacity={0.4 + i * 0.3} />
      </g>
    ))}
    <text x="16" y="16" fontFamily={MONO} fontSize="8" fill={c} letterSpacing="1">VETO MIGRATES</text>
    {axis(['IT-led', 'Board-gated'])}
  </g>)
}
// 2 · the window narrows: legacy upkeep rises, room to act shrinks
function IgWindow(c: string) {
  return svgWrap(<g>
    <polygon points="16,126 284,126 284,44 16,58" fill="rgba(10,10,10,0.10)" />
    <polygon points="16,58 284,44 284,20 16,20" fill={c} fillOpacity="0.85" />
    <text x="150" y="98" textAnchor="middle" fontFamily={MONO} fontSize="8" fill={MUTED}>LEGACY UPKEEP</text>
    <text x="150" y="34" textAnchor="middle" fontFamily={MONO} fontSize="8" fill={PAPER}>ROOM TO ACT</text>
    {axis(['Now', 'Later'])}
  </g>)
}
// 3 · the knowledge leaves: 6 to 1, and the line falls
function IgKnowledge(c: string) {
  return svgWrap(<g>
    <text x="16" y="24" fontFamily={MONO} fontSize="8" fill={MUTED}>OVER 55</text>
    {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={40 + i * 30} cy={44} r="7.5" fill={INK} />)}
    <text x="16" y="74" fontFamily={MONO} fontSize="8" fill={MUTED}>UNDER 25</text>
    <circle cx={40} cy={92} r="7.5" fill="none" stroke={INK} strokeWidth="1.4" />
    <path d="M16 112 C 110 112, 170 122, 284 132" fill="none" stroke={c} strokeWidth="2" />
    <text x="284" y="108" textAnchor="end" fontFamily={MONO} fontSize="8" fill={c}>KNOWLEDGE</text>
    {axis(['Kickoff', 'Go-live'])}
  </g>)
}
// 4 · gravity toward delay: cost of waiting rises against a flat cost to act
function IgDelay(c: string) {
  return svgWrap(<g>
    <path d="M16 108 C 120 104, 200 96, 284 100" fill="none" stroke={INK} strokeWidth="1.6" strokeDasharray="4 3" />
    <path d="M16 108 C 120 96, 200 52, 284 26" fill="none" stroke={c} strokeWidth="2.4" />
    <path d="M16 108 C 120 96, 200 52, 284 26 L 284 100 C 200 96, 120 104, 16 108 Z" fill={c} fillOpacity="0.08" />
    {[80, 150, 220].map((x, i) => <g key={i}><line x1={x} y1="118" x2={x} y2="126" stroke={MUTED} /><path d={`M ${x + 5} 121 l -5 -3 l 5 -3`} fill="none" stroke={MUTED} strokeWidth="1" /></g>)}
    <text x="284" y="20" textAnchor="end" fontFamily={MONO} fontSize="8" fill={c}>WAIT · $30-150M</text>
    <text x="150" y="98" textAnchor="middle" fontFamily={MONO} fontSize="8" fill={MUTED}>ACT · $5-25M</text>
    {axis(['Year 1', 'Year 5'])}
  </g>)
}
// 5 · the message erodes: four claims converge to one
function IgErode(c: string) {
  const cols = [COBALT, INK, HOT, RUST]
  const ys = [26, 52, 78, 104]
  return svgWrap(<g>
    {ys.map((y, i) => <path key={i} d={`M16 ${y} C 120 ${y}, 150 66, 210 66 L 284 66`} fill="none" stroke={cols[i]} strokeWidth="2" opacity="0.9" />)}
    <circle cx="210" cy="66" r="3" fill={INK} />
    <text x="284" y="58" textAnchor="end" fontFamily={MONO} fontSize="8" fill={c}>ONE CLAIM</text>
    <text x="16" y="16" fontFamily={MONO} fontSize="8" fill={MUTED}>4 DISTINCT</text>
    {axis(['Distinct', 'Identical'])}
  </g>)
}
const IG = [IgCoalition, IgWindow, IgKnowledge, IgDelay, IgErode]

interface Force { kicker: string; stat: string; statSub: string; headline: string; body: string; source: string; conf: string; color: string }
const FORCES: Force[] = [
  { kicker: 'Force · the coalition fractures', stat: '74%', statSub: 'of buying teams are in open conflict, and the fracture deepens as more functions join',
    headline: 'The room re-forms, and the veto migrates.', color: COBALT,
    body: 'As the decision escalates from IT to finance to security to the board, the committee changes shape and the power to say no moves with it. You are never selling to the same room twice, and the stakeholders who can kill the deal join late, in a conversation you are locked out of.',
    source: 'Gartner 2024 · 632 buyers', conf: 'supported' },
  { kicker: 'Force · the window narrows', stat: '70-80%', statSub: 'of the IT budget maintains the legacy, and the share grows the longer the decision waits',
    headline: 'Every quarter of delay shrinks the room to act.', color: INK,
    body: 'Most of the budget keeps the platform they want gone alive, and that share climbs as the decision drags. The system races a trap that tightens while it deliberates, so the capacity to change is largest today and smaller every month the buyer waits.',
    source: 'Datos 2026 · Gartner, via Decerto 2026 (vendor-authored)', conf: 'directionally supported' },
  { kicker: 'Force · the knowledge leaves', stat: '6 : 1', statSub: 'insurance workers over 55 to those under 25; the core knowledge is walking out',
    headline: 'The team that scoped it will not be the team that finishes it.', color: RUST,
    body: 'Across a transformation that runs years, the people who understand the legacy core retire, and the cloud, data, and AI talent to replace them will not join an insurer that every industry outbids. The system loses its institutional memory mid-flight, so a vendor who carries the burden matters more the longer the project runs.',
    source: 'US Chamber and BLS (older) · Info-Tech 2026', conf: 'directionally supported' },
  { kicker: 'Force · gravity toward delay', stat: '$30-150M', statSub: 'five-year cost of waiting for a mid-tier carrier, against $5-25M to act',
    headline: 'At every gate, the system is pulled back toward waiting.', color: HOT,
    body: 'The career-safe move at each decision point is to wait, so momentum leaks at every stage even as the cost of inaction compounds. No executive is fired for running the system that works today. Many would be for a transformation that fails. The personal and corporate incentives point opposite ways, so the pull is always backward.',
    source: 'Decerto 2026 (vendor-authored, flagged) · McKinsey 2024', conf: 'plausible but unmeasured' },
  { kicker: 'Force · the message erodes', stat: '4 of 4', statSub: 'vendors now make the identical AI-native claim, so the claim decays as differentiation',
    headline: 'The claim loses meaning the moment everyone makes it.', color: COBALT,
    body: 'When all four assert the same modernized, AI-native platform, the assertion stops separating anyone and trust migrates off the vendor’s own surfaces to peers, analysts, and references. Over time only a consistent, externally validated presence survives the erosion. Whoever is merely loudest decays fastest.',
    source: 'ERA assessment · 6sense 2025 · ERA observed capture', conf: 'directionally supported' },
]

function ConfTag({ level }: { level: string }) {
  const col = level.startsWith('supported') || level.startsWith('directionally') ? COBALT : level.startsWith('plausible') ? MUTED : RUST
  return <span style={{ ...mono({ fontSize: 9, letterSpacing: '0.1em' }), color: col, border: `1px solid ${col}`, padding: '2px 7px', display: 'inline-block' }}>{level}</span>
}

export function BuyerTruths() {
  const [i, setI] = useState(0)
  const n = FORCES.length
  const ref = useRef<HTMLDivElement | null>(null)
  const drag = useRef<{ x: number; on: boolean }>({ x: 0, on: false })
  const go = (d: number) => setI((v) => Math.max(0, Math.min(n - 1, v + d)))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [])

  const arrow = (disabled: boolean): CSSProperties => ({
    ...mono({ fontSize: 14 }), width: 40, height: 40, border: `1px solid ${disabled ? LINE : INK}`, background: PAPER,
    color: disabled ? LINE : INK, cursor: disabled ? 'default' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  })

  return (
    <div ref={ref} tabIndex={0} style={{ outline: 'none' }}
      onPointerDown={(e) => { drag.current = { x: e.clientX, on: true } }}
      onPointerUp={(e) => { if (!drag.current.on) return; const dx = e.clientX - drag.current.x; if (dx < -50) go(1); if (dx > 50) go(-1); drag.current.on = false }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ fontFamily: FONT.display, fontSize: 'clamp(18px,2vw,24px)' }}>Five forces that move the system</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={mono({ fontSize: 11, color: MUTED })}>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button aria-label="Previous" onClick={() => go(-1)} style={arrow(i === 0)}>&#8249;</button>
            <button aria-label="Next" onClick={() => go(1)} style={arrow(i === n - 1)}>&#8250;</button>
          </div>
        </div>
      </div>

      <div style={{ overflow: 'hidden', border: `1px solid ${INK}`, touchAction: 'pan-y' }}>
        <div style={{ display: 'flex', transform: `translateX(-${i * 100}%)`, transition: 'transform 420ms cubic-bezier(0.22,1,0.36,1)' }}>
          {FORCES.map((t, idx) => (
            <div key={idx} style={{ flex: '0 0 100%', minWidth: '100%', background: PAPER }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 360px) 1fr' }}>
                {/* infographic panel */}
                <div style={{ background: PARCHMENT, borderRight: `1px solid ${INK}`, padding: '22px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={mono({ fontSize: 10, letterSpacing: '0.1em', color: t.color })}>{t.kicker}</div>
                  <div style={{ marginTop: 14, border: `1px solid ${FAINT}`, background: PAPER, padding: '10px 12px' }}>{IG[idx](t.color)}</div>
                  <div style={{ fontSize: 12.5, color: MUTED, marginTop: 12, lineHeight: 1.45 }}>
                    <span style={{ fontFamily: FONT.display, fontSize: 17, color: t.color }}>{t.stat}</span> {t.statSub}
                  </div>
                </div>
                {/* text panel */}
                <div style={{ padding: '26px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ height: 5, width: 40, background: t.color, marginBottom: 14 }} />
                  <div style={{ fontFamily: FONT.display, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.08, maxWidth: 620 }}>{t.headline}</div>
                  <p style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: INK, marginTop: 14, maxWidth: 640, lineHeight: 1.55 }}>{t.body}</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 18 }}>
                    <span style={mono({ fontSize: 9.5, letterSpacing: '0.08em', color: MUTED })}>{t.source}</span>
                    <ConfTag level={t.conf} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
        {FORCES.map((t, idx) => (
          <button key={idx} aria-label={`Force ${idx + 1}`} onClick={() => setI(idx)}
            style={{ width: idx === i ? 26 : 10, height: 10, border: `1px solid ${INK}`, background: idx === i ? t.color : PAPER, cursor: 'pointer', padding: 0, transition: 'background 220ms ease' }} />
        ))}
        <span style={{ ...mono({ fontSize: 9, letterSpacing: '0.08em', color: MUTED }), marginLeft: 8 }}>Click or swipe through</span>
      </div>
    </div>
  )
}
