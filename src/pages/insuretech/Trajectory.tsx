import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { FONT } from './theme'

/* Congruence over time. Full-width, background-free line graph that draws
   left to right when it scrolls into view. Overview shows each vendor's
   leader-brand congruence across Feb-Jul 2026. Select a vendor to compare its
   brand message (solid) with what its leaders carried on LinkedIn (dashed);
   the shaded gap between the two lines is the lag. Values are a directional
   index, not a measurement, and most dates come off relative LinkedIn stamps. */

const INK = '#0A0A0A'
const MUTED = 'rgba(10,10,10,0.55)'
const FAINT = 'rgba(10,10,10,0.10)'
const HOT = '#E6195F'

const mono = (extra?: CSSProperties): CSSProperties => ({ fontFamily: FONT.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', ...extra })

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

interface VLine {
  slug: string; name: string; color: string; temporal: number; lag: string
  congruence: number[]; brand: number[]; leader: number[]; note: string
}
const LINES: VLine[] = [
  { slug: 'sapiens', name: 'Sapiens', color: '#1845C2', temporal: 84, lag: 'about one week',
    congruence: [40, 55, 58, 60, 80, 84], brand: [46, 56, 60, 63, 88, 86], leader: [40, 49, 55, 57, 70, 83],
    note: 'Leaders adopt within about a week. By the June rebrand the brand and leader lines nearly meet.' },
  { slug: 'guidewire', name: 'Guidewire', color: '#0A0A0A', temporal: 58, lag: 'often no handoff',
    congruence: [46, 58, 48, 56, 50, 58], brand: [58, 66, 60, 64, 60, 66], leader: [40, 44, 40, 45, 42, 47],
    note: 'The brand publishes steadily. Its executives rarely carry it. The gap does not close.' },
  { slug: 'duckcreek', name: 'Duck Creek', color: '#DD5C20', temporal: 73, lag: 'same week around events',
    congruence: [28, 42, 66, 68, 54, 73], brand: [38, 48, 74, 70, 56, 82], leader: [30, 38, 58, 64, 50, 68],
    note: 'Leaders move on events, Formation and then the Send acquisition, and go quiet between them.' },
  { slug: 'majesco', name: 'Majesco', color: '#E6195F', temporal: 67, lag: 'days to three months',
    congruence: [40, 52, 64, 65, 58, 67], brand: [45, 58, 70, 68, 60, 74], leader: [38, 47, 58, 61, 55, 64],
    note: 'Campaigns transfer in days. The wider repositioning takes one to three months to reach the executives.' },
]

// geometry
const W = 1000, H = 420, PADL = 18, PADR = 128, PADT = 34, PADB = 42
const x = (i: number) => PADL + (i / (MONTHS.length - 1)) * (W - PADL - PADR)
const y = (v: number) => PADT + (1 - v / 100) * (H - PADT - PADB)
const line = (pts: number[]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p)}`).join(' ')
const area = (a: number[], b: number[]) =>
  a.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p)}`).join(' ') +
  ' ' + b.map((_, i) => `L ${x(b.length - 1 - i)} ${y(b[b.length - 1 - i])}`).join(' ') + ' Z'

function Chart({ selected, drawn }: { selected: string | null; drawn: boolean }) {
  const one = selected ? LINES.find((l) => l.slug === selected)! : null
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
      <style>{`
        @keyframes traj-draw { to { stroke-dashoffset: 0; } }
        @keyframes traj-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes traj-fade-dim { from { opacity: 0; } to { opacity: 0.85; } }
      `}</style>

      {/* faint reference lines */}
      {[40, 60, 80].map((v) => (
        <line key={v} x1={PADL} y1={y(v)} x2={W - PADR} y2={y(v)} stroke={FAINT} strokeWidth="1" />
      ))}
      {MONTHS.map((m, i) => (
        <text key={m} x={x(i)} y={H - PADB + 22} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="1.2" fill={MUTED}>{m.toUpperCase()}</text>
      ))}

      {drawn && !one && (
        <g key="all">
          {LINES.map((l, idx) => (
            <g key={l.slug}>
              <path d={line(l.congruence)} pathLength={1} fill="none" stroke={l.color} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round"
                strokeDasharray={1} style={{ strokeDashoffset: 1, animation: `traj-draw 1100ms ease ${idx * 90}ms forwards` }} />
              <circle cx={x(5)} cy={y(l.congruence[5])} r="3.5" fill={l.color} style={{ opacity: 0, animation: `traj-fade 300ms ease ${900 + idx * 90}ms forwards` }} />
              <text x={x(5) + 10} y={y(l.congruence[5]) + 4} fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="600" fill={l.color}
                style={{ opacity: 0, animation: `traj-fade 300ms ease ${900 + idx * 90}ms forwards` }}>{l.name} {l.temporal}</text>
            </g>
          ))}
        </g>
      )}

      {drawn && one && (
        <g key={one.slug}>
          {/* the lag: shaded gap between brand and leader */}
          <path d={area(one.brand, one.leader)} fill={one.color} fillOpacity={0.16} style={{ opacity: 0, animation: 'traj-fade 500ms ease 700ms forwards' }} />
          {/* brand line, solid */}
          <path d={line(one.brand)} pathLength={1} fill="none" stroke={one.color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"
            strokeDasharray={1} style={{ strokeDashoffset: 1, animation: 'traj-draw 1100ms ease forwards' }} />
          {/* leader line, dashed, trailing */}
          <path d={line(one.leader)} fill="none" stroke={one.color} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"
            style={{ strokeDasharray: '9 7', opacity: 0, animation: 'traj-fade-dim 700ms ease 500ms forwards' }} />
          {/* end labels */}
          <text x={x(5) + 10} y={y(one.brand[5]) + 4} fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="600" fill={one.color}
            style={{ opacity: 0, animation: 'traj-fade 300ms ease 1100ms forwards' }}>Brand</text>
          <text x={x(5) + 10} y={y(one.leader[5]) + 4} fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="600" fill={MUTED}
            style={{ opacity: 0, animation: 'traj-fade 300ms ease 1100ms forwards' }}>Leaders</text>
        </g>
      )}
    </svg>
  )
}

export function Trajectory() {
  const [selected, setSelected] = useState<string | null>(null)
  const [drawn, setDrawn] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setDrawn(true) }) },
      { rootMargin: '0px 0px -25% 0px', threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const one = selected ? LINES.find((l) => l.slug === selected)! : null

  const chip = (active: boolean, color?: string): CSSProperties => ({
    ...mono({ fontSize: 11, letterSpacing: '0.1em' }),
    padding: '8px 14px', cursor: 'pointer', background: active ? (color ?? INK) : 'transparent',
    color: active ? '#fff' : INK, border: `1px solid ${active ? (color ?? INK) : FAINT}`,
    transition: 'all 160ms ease',
  })

  return (
    <section id="trajectory" ref={ref} style={{ padding: '4vw 3vw', borderBottom: `1px solid ${INK}`, background: '#fff' }}>
      <div style={{ maxWidth: 820, marginBottom: 26 }}>
        <div style={mono({ color: HOT })}>▸ 04 · Congruence over time</div>
        <h2 style={{ fontFamily: FONT.display, fontSize: 'clamp(22px,3vw,40px)', lineHeight: 1.06, marginTop: 10 }}>
          The gap between brand message and leader adoption is closing for three vendors, and holding for Guidewire.
        </h2>
        <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: MUTED, marginTop: 14, lineHeight: 1.55 }}>
          Each vendor publishes a position, then its executives either carry it or they do not. The distance between the two lines is the lag. Select a vendor to see how far its leaders trail and whether the gap is closing.
        </p>
      </div>

      {/* controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
        <button onClick={() => setSelected(null)} style={chip(selected === null)}>All vendors</button>
        {LINES.map((l) => (
          <button key={l.slug} onClick={() => setSelected(l.slug)} style={chip(selected === l.slug, l.color)}>{l.name}</button>
        ))}
      </div>

      {/* full-width chart */}
      <Chart selected={selected} drawn={drawn} />

      {/* caption */}
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: one ? '1fr auto' : '1fr', gap: 20, alignItems: 'start', borderTop: `1px solid ${FAINT}`, paddingTop: 16 }}>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: INK, maxWidth: 760, margin: 0 }}>
          {one
            ? one.note
            : 'Each line is a vendor’s leader-brand congruence across the six-month window. Directional, not a measurement. Select a vendor to compare its brand message with what its leaders actually carried.'}
        </p>
        {one && (
          <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
            <div style={mono({ fontSize: 10, color: MUTED })}>Typical lag</div>
            <div style={{ fontFamily: FONT.display, fontSize: 18, marginTop: 4, color: one.color }}>{one.lag}</div>
          </div>
        )}
      </div>

      <div style={{ ...mono({ fontSize: 10, letterSpacing: '0.08em', color: MUTED }), marginTop: 14 }}>
        Directional index, 0 to 100 · monthly points interpolated from the categorical reads · dates approximate
      </div>
    </section>
  )
}
