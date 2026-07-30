import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { FONT } from './theme'

/* Persistent buyer-beliefs drawer. A slim tab docked to the right edge across
   the whole report; click to slide open a panel holding the buyer's core
   beliefs (a running reminder of who the report is for) and the study behind
   them. Non-modal and persistent: open/closed state is remembered. */

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const LINE = 'rgba(10,10,10,0.15)'
const MUTED = 'rgba(10,10,10,0.55)'
const HOT = '#E6195F'
const YELLOW = '#F4C430'
const KEY = 'insuretech-beliefs-open'
const mono = (e?: CSSProperties): CSSProperties => ({ fontFamily: FONT.mono, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 11, ...e })

const BELIEFS: { b: string; g: string; t: string }[] = [
  { b: 'No claim is true until a peer confirms it.', g: 'Credibility lives off the vendor’s own surfaces, with peers, analysts, and references.', t: 'Trust' },
  { b: 'The reference is worth more than the demo.', g: 'The buyer trusts the carrier leader who did this and lived over any pitch.', t: 'Proof' },
  { b: 'Everyone says AI, so AI says nothing.', g: 'All four make the same claim, so the claim stopped separating anyone.', t: 'Claim decay' },
  { b: 'Waiting feels safe. It is not.', g: 'Inertia is the career-safe choice and the company-fatal one.', t: 'Inertia' },
  { b: 'The team that starts this will not finish it.', g: 'The people who know the core retire mid-transformation; the plan outlasts them.', t: 'Capacity' },
  { b: 'The decision is made in a room the vendor never enters.', g: 'A shifting committee debates and vetoes the choice out of the vendor’s sight.', t: 'The system' },
  { b: 'Consistency reads as safety.', g: 'To a committee deciding under risk, a brand that holds steady beats a bigger promise.', t: 'The constant' },
]

export function BuyerBeliefsDrawer() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    try { setOpen(localStorage.getItem(KEY) === '1') } catch { /* private mode */ }
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') set(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const set = (v: boolean) => { setOpen(v); try { localStorage.setItem(KEY, v ? '1' : '0') } catch { /* private mode */ } }

  return (
    <>
      {/* docked tab (persistent) */}
      <button aria-label="Open buyer beliefs" onClick={() => set(true)}
        style={{
          position: 'fixed', right: 0, top: '42%', transform: 'translateY(-50%)', zIndex: 55,
          background: INK, color: PAPER, border: 'none', borderRight: 'none', cursor: 'pointer',
          padding: '14px 9px', writingMode: 'vertical-rl', ...mono({ fontSize: 11, letterSpacing: '0.18em' }),
          opacity: open ? 0 : 1, pointerEvents: open ? 'none' : 'auto', transition: 'opacity 180ms ease',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
        <span style={{ color: YELLOW, transform: 'rotate(180deg)' }}>&#8249;</span> Buyer beliefs
      </button>

      {/* panel */}
      <aside role="dialog" aria-label="Buyer beliefs and the study"
        style={{
          position: 'fixed', top: 0, right: 0, height: '100vh', width: 'min(420px, 100vw)', background: PAPER,
          borderLeft: `1px solid ${INK}`, zIndex: 60, display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(101%)', transition: 'transform 260ms cubic-bezier(0.22,1,0.36,1)',
          boxShadow: open ? '-18px 0 40px rgba(10,10,10,0.14)' : 'none',
        }}>
        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: `1px solid ${INK}`, background: INK, color: PAPER }}>
          <span style={mono({ fontSize: 11, color: YELLOW })}>Buyer beliefs</span>
          <button onClick={() => set(false)} aria-label="Close" style={{ background: 'transparent', border: 'none', color: PAPER, cursor: 'pointer', ...mono({ fontSize: 11 }), display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span aria-hidden>&times;</span> close
          </button>
        </div>

        {/* body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 40px' }}>
          <p style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.55, marginTop: 0 }}>
            Keep the buyer in the room. This is what the insurance core-platform buyer believes, and the study behind it. It stays one click away through the whole report.
          </p>

          <div style={{ ...mono({ fontSize: 10, letterSpacing: '0.12em', color: HOT }), margin: '18px 0 10px' }}>What the buyer believes</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {BELIEFS.map((x) => (
              <div key={x.b} style={{ borderTop: `1px solid ${LINE}`, paddingTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                  <div style={{ fontFamily: FONT.display, fontSize: 15.5, lineHeight: 1.2 }}>{x.b}</div>
                  <span style={mono({ fontSize: 8.5, letterSpacing: '0.08em', color: MUTED, whiteSpace: 'nowrap' })}>{x.t}</span>
                </div>
                <div style={{ fontSize: 12.5, color: MUTED, marginTop: 5, lineHeight: 1.45 }}>{x.g}</div>
              </div>
            ))}
          </div>

          <div style={{ ...mono({ fontSize: 10, letterSpacing: '0.12em', color: HOT }), margin: '26px 0 10px' }}>The study behind it</div>
          <div style={{ background: PARCHMENT, border: `1px solid ${LINE}`, padding: '14px 15px' }}>
            <div style={{ fontFamily: FONT.display, fontSize: 15 }}>The 2026 B2B Buyer, myth versus fact</div>
            <p style={{ fontSize: 12.5, color: INK, marginTop: 8, lineHeight: 1.5 }}>
              More than 35,000 buyers and buying interactions across nine studies from six firms, Forrester, Gartner, McKinsey, 6sense, TrustRadius, and G2, spanning North America, Europe, and Asia Pacific.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px', marginTop: 10 }}>
              {[['Forrester', '~18,000 · Jan 2026'], ['6sense', '~4,760 · Nov 2025'], ['Gartner', '646 · 2025; 632 · 2024'], ['McKinsey', '3,942 · Sep 2024'], ['TrustRadius', '2,164 · Jun 2024'], ['G2', '1,169 · Apr 2025']].map(([f, s]) => (
                <div key={f}><div style={mono({ fontSize: 9, letterSpacing: '0.06em', color: INK })}>{f}</div><div style={{ fontSize: 11, color: MUTED }}>{s}</div></div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 12.5, color: INK, marginTop: 16, lineHeight: 1.55 }}>
            <b>The insurance layer.</b> The general research is cross-industry. This report tests it against a roster of 277 carrier executives, a segment-separated pressure map, and a divergence pass that scores the eight general findings for the insurance buyer: one holds, two break, three partial, two unknown.
          </div>
          <div style={{ fontSize: 12.5, color: INK, marginTop: 12, lineHeight: 1.55 }}>
            <b>How to read confidence.</b> Every claim carries a grade: supported, directionally supported, plausible but unmeasured, insufficiently supported, or contradicted. Vendor-authored figures are flagged. First-party observed capture is graded as its own source type, not against survey standards.
          </div>
          <div style={{ fontSize: 11.5, color: MUTED, marginTop: 12, lineHeight: 1.5 }}>
            Honest flags: the round "80 percent before sales" shorthand is avoided for the defensible primary figures; the G2 software-buyer numbers are not generalized to all B2B; the demographics-versus-behavior tension is presented, not resolved.
          </div>
        </div>
      </aside>
    </>
  )
}
