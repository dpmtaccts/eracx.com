import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { FONT } from './theme'

/* Congruence over time. A scroll-driven trajectory of leader-brand congruence,
   month by month, Feb-Jul 2026. All four lines stay drawn (readable without
   scrolling); the story spotlights one vendor per scroll step, then lands on the
   snapshot-vs-trend reshuffle. Values are a directional index, not a measurement,
   and most dates are derived from relative LinkedIn timestamps. */

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const LINE = 'rgba(10,10,10,0.15)'
const MUTED = 'rgba(10,10,10,0.55)'
const HOT = '#E6195F'

const mono = (extra?: CSSProperties): CSSProperties => ({ fontFamily: FONT.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', ...extra })

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

interface VLine { slug: string; name: string; color: string; temporal: number; model: string; points: number[] }
const LINES: VLine[] = [
  { slug: 'sapiens', name: 'Sapiens', color: '#1845C2', temporal: 84, model: 'Cascade', points: [40, 55, 58, 60, 80, 84] },
  { slug: 'guidewire', name: 'Guidewire', color: '#0A0A0A', temporal: 58, model: 'Corporate-publisher', points: [46, 58, 48, 56, 50, 58] },
  { slug: 'duckcreek', name: 'Duck Creek', color: '#DD5C20', temporal: 73, model: 'Strategic-moment', points: [28, 42, 66, 68, 54, 73] },
  { slug: 'majesco', name: 'Majesco', color: '#E6195F', temporal: 67, model: 'Repositioning', points: [40, 52, 64, 65, 58, 67] },
]

interface Step { emph: string | null; title: string; text: string }
const STEPS: Step[] = [
  { emph: null, title: 'Six months, one question', text: 'Not who is ahead, but who is gaining. Each line is a vendor’s leader-brand congruence, month by month, February to July 2026. Read it as a direction, not a measurement.' },
  { emph: 'sapiens', title: 'Sapiens accelerates', text: 'The cascade compounds into the June rebrand. Leaders pick up hyper-relevance within the week and keep extending it. 40 to 84, and still climbing.' },
  { emph: 'guidewire', title: 'Guidewire flatlines', text: 'The strongest corporate evidence in the set, and no cascade forms. The line never leaves the mid-50s. Ahead on the snapshot, stalled on the trend.' },
  { emph: 'duckcreek', title: 'Duck Creek spikes on events', text: 'Formation, then the Send acquisition. Alignment jumps when there is a moment to rally around, and sags between them. Momentum you rent.' },
  { emph: 'majesco', title: 'Majesco climbs from the bottom', text: 'The lowest base and a positive slope. Spring ’26, then the AI-native repositioning. Improving, still mid-build.' },
  { emph: 'all', title: 'The snapshot and the trend disagree', text: 'Rank by today’s score and Guidewire is second. Rank by the slope and it is last, ahead but not moving. Sapiens is the only vendor strong on both level and trajectory.' },
]

// chart geometry
const W = 640, H = 430, PADL = 40, PADR = 96, PADT = 28, PADB = 38
const x = (i: number) => PADL + (i / (MONTHS.length - 1)) * (W - PADL - PADR)
const y = (v: number) => PADT + (1 - v / 100) * (H - PADT - PADB)

function Chart({ emph }: { emph: string | null }) {
  const showAll = emph === null || emph === 'all'
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* horizontal guides */}
      {[40, 60, 80].map((v) => (
        <g key={v}>
          <line x1={PADL} y1={y(v)} x2={W - PADR} y2={y(v)} stroke={LINE} strokeWidth="1" />
          <text x={PADL - 8} y={y(v) + 3} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#9a958c">{v}</text>
        </g>
      ))}
      {/* month guides + labels */}
      {MONTHS.map((m, i) => (
        <g key={m}>
          <line x1={x(i)} y1={PADT} x2={x(i)} y2={H - PADB} stroke="rgba(10,10,10,0.06)" strokeWidth="1" />
          <text x={x(i)} y={H - PADB + 20} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.2" fill="#6B6760">{m.toUpperCase()}</text>
        </g>
      ))}
      {/* lines */}
      {LINES.map((l) => {
        const on = showAll || emph === l.slug
        const d = l.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p)}`).join(' ')
        return (
          <g key={l.slug} style={{ transition: 'opacity 300ms ease' }} opacity={on ? 1 : 0.16}>
            <path d={d} fill="none" stroke={l.color} strokeWidth={emph === l.slug ? 3.2 : 2} strokeLinejoin="round" strokeLinecap="round" />
            {/* endpoint dot + label */}
            <circle cx={x(5)} cy={y(l.points[5])} r={emph === l.slug ? 4.5 : 3} fill={l.color} />
            <text x={x(5) + 9} y={y(l.points[5]) + 3} fontFamily="JetBrains Mono, monospace" fontSize={emph === l.slug ? 12 : 10} fontWeight="600" fill={l.color}>
              {l.name} {l.temporal}
            </text>
          </g>
        )
      })}
      <text x={PADL} y={PADT - 12} fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.2" fill="#9a958c">CONGRUENCE INDEX · DIRECTIONAL</text>
    </svg>
  )
}

export function Trajectory() {
  const [active, setActive] = useState(0)
  const [narrow, setNarrow] = useState(false)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)')
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step))
        })
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const emph = narrow ? null : STEPS[active]?.emph ?? null

  return (
    <section id="trajectory" style={{ padding: '4vw 3vw', borderBottom: `1px solid ${INK}`, background: PAPER }}>
      <div style={{ marginBottom: 24 }}>
        <div style={mono({ color: HOT })}>▸ 04 · Congruence over time</div>
        <h2 style={{ fontFamily: FONT.display, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.05, maxWidth: 900, marginTop: 10 }}>Who is gaining, not just who is ahead.</h2>
        <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: MUTED, maxWidth: 720, marginTop: 14 }}>
          The scores are a snapshot. The trend is the story. Each line traces a vendor’s leader-brand congruence across the six-month window. Scroll to spotlight each one.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '3vw', alignItems: 'start' }}>
        {/* sticky chart */}
        <div style={{ position: 'sticky', top: '12vh', alignSelf: 'start', zIndex: 1 }}>
          <div style={{ border: `1px solid ${LINE}`, background: PARCHMENT, padding: '18px 18px 8px' }}>
            <Chart emph={emph} />
          </div>
          <div style={{ ...mono({ fontSize: 10, letterSpacing: '0.1em', color: MUTED }), marginTop: 10 }}>
            {emph && emph !== 'all' ? (LINES.find((l) => l.slug === emph)?.model) + ' model' : 'Feb to Jul 2026 · index 0–100'}
          </div>
        </div>

        {/* scrolling steps */}
        <div>
          {STEPS.map((s, i) => (
            <div
              key={i}
              data-step={i}
              ref={(el) => { stepRefs.current[i] = el }}
              style={{ minHeight: narrow ? 'auto' : '74vh', padding: narrow ? '18px 0' : 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: narrow ? 1 : active === i ? 1 : 0.32, transition: 'opacity 300ms ease' }}
            >
              <div style={mono({ color: HOT, fontSize: 10 })}>{String(i + 1).padStart(2, '0')} / {STEPS.length}</div>
              <div style={{ fontFamily: FONT.display, fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.1, marginTop: 10 }}>{s.title}</div>
              <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', marginTop: 12, maxWidth: 460, lineHeight: 1.55 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${LINE}`, marginTop: 8, paddingTop: 16, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, maxWidth: 760, color: MUTED }}>
          Trend ranking by trajectory: Sapiens (accelerating), Duck Creek (rising, event-driven), Majesco (rising from a low base), Guidewire (flat). The snapshot ranks who is ahead; the trend ranks who is gaining.
        </span>
        <span style={mono({ fontSize: 10, letterSpacing: '0.08em', color: MUTED })}>Directional index · dates approximate</span>
      </div>
    </section>
  )
}
