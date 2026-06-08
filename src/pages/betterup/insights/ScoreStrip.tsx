import type { CSSProperties } from 'react'
import { FONT } from '../theme'
import { PAGE_LINE } from './types'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const MUTED = 'rgba(10, 10, 10, 0.55)'

/* Scale-of-the-evidence stats. Tells the CMO at a glance what the audit
   read, not what it concluded. The composite score lives in ▸ 01's dial
   now; this strip carries brand + scale only. */
const SCALE_STATS = [
  { label: 'Moments', value: '232', sub: 'captured' },
  { label: 'Channels', value: '11', sub: 'surfaces' },
  { label: 'Voices', value: '21', sub: 'analyzed' },
  { label: 'Window', value: '90', sub: 'days' },
] as const

export function ScoreStrip() {
  return (
    <div
      role="banner"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: PAPER,
        color: INK,
        borderBottom: `1px solid ${PAGE_LINE}`,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: 24,
          padding: '12px 24px',
        }}
      >
        {/* Brand mark + tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <a href="/" aria-label="ERA" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/era-symbol.png"
              alt="ERA"
              style={{ height: 22, width: 'auto', display: 'block' }}
            />
          </a>
          <span aria-hidden style={{ width: 1, height: 18, background: 'rgba(10,10,10,0.2)' }} />
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 14,
              fontStyle: 'italic',
              color: MUTED,
              fontWeight: 400,
            }}
          >
            Don’t pitch strangers.
          </span>
        </div>

        {/* Scale-of-the-evidence stats */}
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            gap: 20,
            alignItems: 'baseline',
            flexWrap: 'wrap',
          }}
        >
          {SCALE_STATS.map((s) => (
            <li key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={mono(9, MUTED)}>{s.label.toUpperCase()}</span>
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 18,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  color: INK,
                }}
              >
                {s.value}
              </span>
              <span style={mono(9, MUTED)}>· {s.sub.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function mono(size: number, color: string): CSSProperties {
  return {
    fontFamily: FONT.mono,
    fontSize: size,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color,
    fontWeight: 600,
  }
}
