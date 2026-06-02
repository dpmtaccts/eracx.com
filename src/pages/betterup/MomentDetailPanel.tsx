import { useEffect, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { FONT } from './theme'
import type { Moment } from './data/moments'

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const PARCHMENT = '#F4F1EA'
const RULE = 'rgba(10, 10, 10, 0.15)'
const MUTED = 'rgba(10, 10, 10, 0.55)'
const HOT = '#E6195F'
const COBALT = '#1845C2'
const RUST = '#DD5C20'

type ChannelMeta = {
  label: string
  zone: 'Periphery' | 'Mid' | 'Core' | 'Core break'
}

type Props = {
  moment: Moment | null
  channelMeta: Record<string, ChannelMeta>
  onClose: () => void
  onViewRecommendation: (recId: string) => void
}

export function MomentDetailPanel({ moment, channelMeta, onClose, onViewRecommendation }: Props) {
  useEffect(() => {
    if (!moment) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [moment, onClose])

  if (typeof document === 'undefined') return null

  const open = !!moment
  const meta = moment ? channelMeta[moment.channelId] : null
  const direction = moment?.reinforces ? 'REINFORCES' : moment?.isPriority ? 'PRIORITY BREAK' : 'CONTRADICTS'
  const directionColor = moment?.reinforces ? COBALT : moment?.isPriority ? HOT : RUST
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.22s ease',
          zIndex: 9998,
        }}
      />

      {/* Panel — side on desktop, bottom sheet on mobile */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={moment?.description ?? 'Moment detail'}
        style={
          isMobile
            ? {
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                height: '80vh',
                background: PAPER,
                borderTop: `1.5px solid ${INK}`,
                transform: open ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.28s cubic-bezier(0.2, 0.7, 0.2, 1)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }
            : {
                position: 'fixed',
                top: 0,
                right: 0,
                width: 480,
                height: '100vh',
                background: PAPER,
                borderLeft: `1.5px solid ${INK}`,
                transform: open ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.28s cubic-bezier(0.2, 0.7, 0.2, 1)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }
        }
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: `1px solid ${INK}`,
            background: moment?.isPriority ? HOT : PAPER,
            color: moment?.isPriority ? PAPER : INK,
            flexShrink: 0,
          }}
        >
          <span style={{ ...mono(11), fontWeight: 700 }}>
            {meta ? `${meta.label.toUpperCase()} · ${meta.zone.toUpperCase()}` : ''}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              ...mono(11),
              fontWeight: 600,
              padding: 4,
            }}
            aria-label="Close moment detail"
          >
            × CLOSE
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Artifact */}
          <div style={{ borderBottom: `1px solid ${RULE}` }}>
            {moment?.artifactPath ? (
              <div style={{ aspectRatio: '5 / 3', background: PARCHMENT }}>
                <img
                  src={moment.artifactPath}
                  alt={moment.artifactName ?? 'Artifact'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ) : (
              <div
                style={{
                  aspectRatio: '5 / 3',
                  background: PARCHMENT,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 14,
                    border: '1.5px dashed rgba(10, 10, 10, 0.22)',
                  }}
                />
                <span style={{ ...mono(9), color: MUTED, fontWeight: 600, position: 'relative' }}>
                  Replace with
                </span>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    fontWeight: 600,
                    color: INK,
                    textAlign: 'center',
                    maxWidth: '78%',
                    lineHeight: 1.35,
                    position: 'relative',
                  }}
                >
                  {moment?.artifactName ?? (meta ? `${meta.label} artifact` : 'Artifact')}
                </span>
              </div>
            )}
          </div>

          {/* Moment number + description */}
          <div style={{ padding: '22px 24px 18px' }}>
            <div style={{ ...mono(10), color: MUTED, marginBottom: 12, fontWeight: 600 }}>
              MOMENT {moment ? momentNumber(moment.id) : '—'} · CAPTURED DAY{' '}
              {moment?.capturedDay ?? '—'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ ...mono(11), color: directionColor, fontWeight: 700 }}>
                {moment?.reinforces ? '↑' : '↓'} {direction}
              </span>
              <MagnitudeBar value={moment?.magnitude ?? 0} color={directionColor} />
            </div>
            {moment?.description ? (
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 17,
                  lineHeight: 1.45,
                  color: INK,
                  margin: 0,
                }}
              >
                {moment.description}
              </p>
            ) : (
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: MUTED,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                A routine signal in this channel. Detail not captured at the moment level.
              </p>
            )}
          </div>

          {/* Promise / proof — contradictions only */}
          {(moment?.promise || moment?.proof) && (
            <div
              style={{
                padding: '20px 24px',
                borderTop: `1px solid ${RULE}`,
                background: PARCHMENT,
              }}
            >
              {moment.promise && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...mono(9), color: MUTED, marginBottom: 4, fontWeight: 600 }}>
                    PROMISE
                  </div>
                  <p
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: INK,
                      margin: 0,
                    }}
                  >
                    {moment.promise}
                  </p>
                </div>
              )}
              {moment.proof && (
                <div>
                  <div style={{ ...mono(9), color: HOT, marginBottom: 4, fontWeight: 600 }}>
                    PROOF
                  </div>
                  <p
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: INK,
                      margin: 0,
                    }}
                  >
                    {moment.proof}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Trust impact */}
          {moment?.trustImpact !== undefined && (
            <div
              style={{
                padding: '18px 24px',
                borderTop: `1px solid ${RULE}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ ...mono(10), color: MUTED, fontWeight: 600 }}>TRUST IMPACT</span>
              <span
                style={{
                  fontFamily: FONT.mega,
                  fontSize: 36,
                  lineHeight: 1,
                  color: moment.trustImpact < 0 ? (moment.isPriority ? HOT : RUST) : COBALT,
                  letterSpacing: '-0.01em',
                }}
              >
                {moment.trustImpact > 0 ? '+' : ''}
                {moment.trustImpact}
              </span>
            </div>
          )}

          {/* Affected buyers */}
          {moment?.buyerNames && moment.buyerNames.length > 0 && (
            <div style={{ padding: '18px 24px', borderTop: `1px solid ${RULE}` }}>
              <div style={{ ...mono(10), color: MUTED, marginBottom: 10, fontWeight: 600 }}>
                AFFECTED BUYERS
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {moment.buyerNames.slice(0, 2).map((name) => (
                  <li
                    key={name}
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 15,
                      color: INK,
                      padding: '4px 0',
                    }}
                  >
                    {name}
                  </li>
                ))}
                {moment.buyerNames.length > 2 && (
                  <li
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 13,
                      color: MUTED,
                      padding: '4px 0',
                    }}
                  >
                    + {moment.buyerNames.length - 2}{' '}
                    {moment.buyerNames.length - 2 === 1 ? 'other' : 'others'}
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* CTAs */}
          {(moment?.recommendationId || moment?.sourceUrl) && (
            <div
              style={{
                padding: '20px 24px 28px',
                borderTop: `1px solid ${RULE}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {moment?.recommendationId && (
                <button
                  onClick={() => onViewRecommendation(moment.recommendationId!)}
                  style={{
                    ...mono(11),
                    fontWeight: 700,
                    background: HOT,
                    color: PAPER,
                    border: 'none',
                    padding: '14px 18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  → VIEW THE RECOMMENDATION
                </button>
              )}
              {moment?.sourceUrl && (
                <a
                  href={moment.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...mono(11),
                    fontWeight: 700,
                    background: INK,
                    color: PAPER,
                    border: 'none',
                    padding: '14px 18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  → VIEW SOURCE
                </a>
              )}
            </div>
          )}
        </div>
      </aside>
    </>,
    document.body,
  )
}

function MagnitudeBar({ value, color }: { value: number; color: string }) {
  const pct = Math.max(0, Math.min(1, value / 14))
  return (
    <div
      aria-hidden
      style={{
        flex: 1,
        height: 8,
        background: PARCHMENT,
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
          width: `${pct * 100}%`,
          background: color,
        }}
      />
    </div>
  )
}

function mono(size: number): CSSProperties {
  return {
    fontFamily: FONT.mono,
    fontSize: size,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  }
}

function momentNumber(id: string): string {
  const match = id.match(/-(\d+)$/)
  return match ? String(parseInt(match[1], 10) + 1).padStart(3, '0') : '—'
}
