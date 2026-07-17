import { useState } from 'react'
import type { CSSProperties } from 'react'
import { FONT } from './theme'

const OPEN_KEY = 'insuretech-internal-open'

/* Partner brief. Internal-only note from Justin to the ERA/Pinwheel partners.
   Gated separately from the client access code (see InsureTechBuyerView): it
   renders only when the browser is flagged internal via ?internal=1, so the
   URL shared with prospects never exposes it. Dark ground to make the boundary
   between "our working notes" and "the deliverable" unmistakable. */

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const DIM = 'rgba(255,255,255,0.62)'
const FAINT = 'rgba(255,255,255,0.16)'
const YELLOW = '#F4C430'

const mono = (extra?: CSSProperties): CSSProperties => ({ fontFamily: FONT.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', ...extra })

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: `1px solid ${FAINT}`, paddingTop: 16 }}>
      <div style={mono({ fontSize: 10, letterSpacing: '0.16em', color: YELLOW })}>{label}</div>
      <div style={{ fontSize: 15, lineHeight: 1.55, color: PAPER, marginTop: 10, maxWidth: 640 }}>{children}</div>
    </div>
  )
}

export function InternalBrief() {
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(OPEN_KEY) !== '0' } catch { return true }
  })
  const toggle = () => {
    setOpen((v) => {
      const next = !v
      try { localStorage.setItem(OPEN_KEY, next ? '1' : '0') } catch { /* private mode */ }
      return next
    })
  }

  return (
    <section id="partner-brief" style={{ background: INK, color: PAPER, padding: '4vw 3vw', borderBottom: `1px solid ${INK}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: open ? 22 : 0 }}>
        <span style={{ ...mono({ fontSize: 11, letterSpacing: '0.16em', color: INK }), background: YELLOW, padding: '5px 10px' }}>Internal · Not for circulation</span>
        <span style={mono({ fontSize: 11, letterSpacing: '0.12em', color: DIM })}>Partner brief · from Justin</span>
        <button
          onClick={toggle}
          aria-expanded={open}
          style={{ ...mono({ fontSize: 10, letterSpacing: '0.14em', color: PAPER }), marginLeft: 'auto', background: 'transparent', border: `1px solid ${FAINT}`, padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          {open ? 'Hide' : 'Show'} brief
          <span style={{ display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease', fontSize: 9 }}>▼</span>
        </button>
      </div>

      {!open ? null : <>
      <h2 style={{ fontFamily: FONT.display, fontSize: 'clamp(22px,3vw,38px)', lineHeight: 1.06, maxWidth: 880 }}>
        Read this before you read the rest. Then cut it before anyone outside the room does.
      </h2>
      <p style={{ fontSize: 16, color: DIM, maxWidth: 680, marginTop: 14, lineHeight: 1.55 }}>
        Where the piece stands, what I want your eyes on, and the assumptions we are standing behind. Everything below the masthead is client-facing. This block is not.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px 40px', marginTop: 30 }}>
        <Block label="Working title">
          I am running with <strong style={{ color: PAPER }}>“The core platform decision.”</strong> Plain, buyer-side, no cleverness, which is the point. Still on the board if someone has a sharper hook: “Who is actually AI-native” and “The promise and the proof.” Say so before we lock it.
        </Block>

        <Block label="The top line">
          One finding is carrying this: the snapshot and the trend disagree. Guidewire is ahead today and going nowhere. Sapiens is the only vendor strong on both level and slope. That is the sentence a CIO repeats in the hallway, and it is the sentence that sells the audit. Everything else is support.
        </Block>

        <Block label="Assumptions to sign off on">
          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8 }}>
            <li>Congruence numbers are a directional index, not a measurement. We present trajectory, not decimals. If a vendor pushes back on a number, we defend the direction, not the digit.</li>
            <li>Engagement counts are a floor. Comment capture was partial, so every count understates. We never call it complete.</li>
            <li>Dates come off relative LinkedIn timestamps. Approximate, and flagged that way on the page.</li>
            <li>Scores are not assigned yet. The draft banner stays up until we run the judgment pass.</li>
          </ul>
        </Block>

        <Block label="Still to land">
          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8 }}>
            <li>Numeric scores for the proof and credible-sources channels.</li>
            <li>Per-leader congruence on the person cards, not just the vendor roll-up.</li>
            <li>The Channel 6 verdict, one call per vendor.</li>
          </ul>
        </Block>

        <Block label="How we are positioning it">
          Sales instrument first, thought leadership second. The read has to feel like it cost something to produce, because it did. Keep the register analyst, not agency. No wallpaper, no hero adjectives. If a line could appear in a vendor’s own deck, it comes out.
        </Block>

        <Block label="Access note">
          This block is keyed to your browser, not to the access code. The link you send a prospect (<span style={{ fontFamily: FONT.mono, fontSize: 13, color: PAPER }}>/buyerview/insuretech</span>) will not show it. To toggle it off on this machine, load the page with <span style={{ fontFamily: FONT.mono, fontSize: 13, color: YELLOW }}>?internal=0</span>.
        </Block>
      </div>
      </>}
    </section>
  )
}
