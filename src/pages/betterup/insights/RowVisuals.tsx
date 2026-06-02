import { useState, type CSSProperties } from 'react'
import { FONT } from '../theme'
import {
  IMPACT_PCT,
  SCOPE_PCT,
  IMPACT_LABEL,
  SCOPE_LABEL,
  type ImpactLevel,
  type ScopeLevel,
} from './types'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const HOT = '#E6195F'
const MUTED = 'rgba(10, 10, 10, 0.55)'

export function ImpactScopeBars({
  impact,
  scope,
}: {
  impact: ImpactLevel
  scope: ScopeLevel
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Row label="IMPACT" pct={IMPACT_PCT[impact]} levelLabel={IMPACT_LABEL[impact]} color={HOT} />
      <Row label="SCOPE" pct={SCOPE_PCT[scope]} levelLabel={SCOPE_LABEL[scope]} color={INK} />
    </div>
  )
}

function Row({
  label,
  pct,
  levelLabel,
  color,
}: {
  label: string
  pct: number
  levelLabel: string
  color: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: INK,
            fontWeight: 700,
          }}
        >
          {levelLabel}
        </span>
      </div>
      <div
        aria-hidden
        style={{
          height: 14,
          background: '#F4F1EA',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${pct}%`,
            background: color,
          }}
        />
      </div>
    </div>
  )
}

export function ShareButton({ anchor }: { anchor: string }) {
  const [copied, setCopied] = useState(false)
  const [hover, setHover] = useState(false)
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#${anchor}`
      : `#${anchor}`
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      }).catch(() => {})
    }
  }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title="Copy link to this insight"
      aria-label="Copy link to this insight"
      style={{
        background: 'transparent',
        border: 'none',
        color: hover || copied ? INK : MUTED,
        cursor: 'pointer',
        padding: 6,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: FONT.mono,
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 600,
        transition: 'color 0.2s ease',
      }}
    >
      <ArrowOutIcon />
      {copied ? 'link copied' : 'share'}
    </button>
  )
}

function ArrowOutIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 16 16" aria-hidden focusable={false}>
      <path
        d="M5 4 L12 4 L12 11 M12 4 L4 12"
        stroke="currentColor"
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function CaretControl({ open, onClick }: { open: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-expanded={open}
      aria-label={open ? 'Collapse insight' : 'Expand insight for full evidence'}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: FONT.mono,
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'lowercase',
        fontWeight: 600,
        color: hover ? INK : MUTED,
        transition: 'color 0.2s ease',
      }}
    >
      {open ? 'collapse' : 'expand'}
      <Chevron rotated={open} />
    </button>
  )
}

function Chevron({ rotated }: { rotated: boolean }) {
  return (
    <svg
      width={12}
      height={8}
      viewBox="0 0 12 8"
      aria-hidden
      focusable={false}
      style={{
        transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.25s ease',
      }}
    >
      <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="square" />
    </svg>
  )
}

export function Watermark({ n }: { n: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: -10,
        top: -40,
        fontFamily: FONT.mega,
        fontSize: 'clamp(180px, 22vw, 320px)',
        lineHeight: 0.85,
        color: INK,
        opacity: 0.05,
        letterSpacing: '-0.02em',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {String(n).padStart(2, '0')}
    </div>
  )
}

export function HighestLeverageFlag({ pillar }: { pillar: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: pillar,
        color: PAPER,
        padding: '6px 12px',
        fontFamily: FONT.mono,
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 700,
        marginBottom: 14,
      }}
    >
      ★ HIGHEST LEVERAGE
    </div>
  )
}

export const rowVisualsStyles: { ink: string; paper: string; hot: string; muted: string } = {
  ink: INK,
  paper: PAPER,
  hot: HOT,
  muted: MUTED,
}

export function mono(size: number, color: string = INK, weight: number = 600): CSSProperties {
  return {
    fontFamily: FONT.mono,
    fontSize: size,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color,
    fontWeight: weight,
  }
}
