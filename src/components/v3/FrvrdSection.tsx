// FrvrdSection.tsx — §02 framework section. Pinned 4×100vh container
// that teaches FRVRD via a scroll-driven visual metaphor, phased into
// four moments timed to scrollProgress (0..1):
//
//   Phase 0 (0.00–0.20): noise + big static statement.
//     "Clicks don't close. Relationships do." holds at full opacity.
//     The pentagon, axis labels, and center label are all hidden. The
//     5 FRVRD dots are visually indistinguishable from background dots.
//
//   Phase 1 (0.20–0.30): statement fades, pentagon previews.
//     The statement + sub fade from 1 → 0. The 5 FRVRD dots ramp from
//     bg-blended to highlighted (size + opacity grow). The pentagon
//     stroke draws in faintly as a "ghost" outline (alpha 0 → 0.15).
//
//   Phase 2 (0.30–0.80): dimensions arrive sequentially.
//     Each FRVRD dot owns a 0.10-wide migration window
//     (0.30/0.40/0.50/0.60/0.70). When a dot reaches its vertex, the
//     axis label fades in and the center label slot-machines to that
//     dimension's name + definition.
//
//   Phase 3 (0.80–1.00): warmth closes.
//     Pentagon polygon fills in (0.80–0.90). Color completes its
//     cold→warm shift to magenta (≈0.95). Center label slot-machines
//     to "Warmth. / Ready to close." in magenta.
//
// Below 820px the pin disables (height: auto) and the inner content
// scrolls normally; the canvas still renders and the dots still
// migrate based on whatever scrollProgress lands on.

import { useEffect, useRef, useState } from 'react'
import BuildingFrvrdRadar, { VERTICES } from './BuildingFrvrdRadar'

// Color stops for the static headline — same arc as the radar layer
// so the word reaches magenta at the end of the section.
const WORD_STOPS: { p: number; rgb: [number, number, number] }[] = [
  { p: 0.0, rgb: [53, 80, 95] }, // deep steel
  { p: 0.7, rgb: [53, 80, 95] }, // hold
  { p: 1.0, rgb: [196, 74, 122] }, // hot magenta
]

function wordColorAt(progress: number): string {
  const x = Math.max(0, Math.min(1, progress))
  for (let i = 0; i < WORD_STOPS.length - 1; i++) {
    const a = WORD_STOPS[i]
    const b = WORD_STOPS[i + 1]
    if (x <= b.p) {
      const t = (x - a.p) / Math.max(1e-6, b.p - a.p)
      const r = Math.round(a.rgb[0] + (b.rgb[0] - a.rgb[0]) * t)
      const g = Math.round(a.rgb[1] + (b.rgb[1] - a.rgb[1]) * t)
      const bl = Math.round(a.rgb[2] + (b.rgb[2] - a.rgb[2]) * t)
      return `rgb(${r}, ${g}, ${bl})`
    }
  }
  const last = WORD_STOPS[WORD_STOPS.length - 1].rgb
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`
}

interface VertexPos {
  x: number
  y: number
}

// Migration end thresholds, kept in sync with BuildingFrvrdRadar's
// MIGRATION_WINDOWS. Drives axis-label fade-in + bottom progress dots.
const MIGRATION_END = [0.4, 0.5, 0.6, 0.7, 0.8]

// Center-label timing: -1 (hidden) until 0.30, then 5 dimensions every
// 0.10 of progress, then the closing card from 0.80 onward.
const CENTER_BOUNDARIES = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
function centerCardIndex(p: number): number {
  if (p < CENTER_BOUNDARIES[0]) return -1
  for (let i = 0; i < CENTER_BOUNDARIES.length - 1; i++) {
    if (p < CENTER_BOUNDARIES[i + 1]) return i
  }
  return 5
}

interface CenterCard {
  name: string
  detail: string
  isClosing?: boolean
}
const CENTER_CARDS: CenterCard[] = [
  { name: 'Frequency.', detail: 'How often the account engages.' },
  { name: 'Recency.', detail: 'How recent the last engagement was.' },
  { name: 'Value.', detail: 'The dollar value this account represents.' },
  {
    name: 'Responsiveness.',
    detail: 'How fast they respond when reached out to.',
  },
  {
    name: 'Density.',
    detail: 'How widely the account engages across the org.',
  },
  { name: 'Warmth.', detail: 'Ready to close.', isClosing: true },
]

// Phase 1 statement fade: opacity ramps from 1 → 0 across this window.
const STATEMENT_FADE_START = 0.2
const STATEMENT_FADE_END = 0.3

function statementOpacity(p: number): number {
  if (p <= STATEMENT_FADE_START) return 1
  if (p >= STATEMENT_FADE_END) return 0
  return 1 - (p - STATEMENT_FADE_START) / (STATEMENT_FADE_END - STATEMENT_FADE_START)
}

export default function FrvrdSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [vertices, setVertices] = useState<VertexPos[]>([])
  const [pentagonRadius, setPentagonRadius] = useState(0)

  useEffect(() => {
    let rafId: number | null = null
    const update = () => {
      const node = wrapperRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) {
        const visible = Math.max(
          0,
          Math.min(rect.height, window.innerHeight - rect.top),
        )
        setScrollProgress(Math.max(0, Math.min(1, visible / rect.height)))
        return
      }
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setScrollProgress(p)
    }
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  // When the canvas reports new vertex positions, also derive the
  // pentagon radius (distance from center to any vertex) so the center
  // label can size itself to fit inside.
  const handleVertexPositions = (vs: VertexPos[]) => {
    setVertices(vs)
    if (vs.length === 5) {
      const cx = (vs[0].x + vs[2].x + vs[3].x) / 3
      const cy = (vs[0].y + vs[2].y + vs[3].y) / 3
      const dx = vs[0].x - cx
      const dy = vs[0].y - cy
      setPentagonRadius(Math.sqrt(dx * dx + dy * dy))
    }
  }

  const labelOffset = (side: (typeof VERTICES)[number]['side']) => {
    switch (side) {
      case 'top':
        return { transform: 'translate(-50%, calc(-100% - 16px))' }
      case 'right':
        return { transform: 'translate(16px, -50%)' }
      case 'br':
        return { transform: 'translate(8px, 8px)' }
      case 'bl':
        return { transform: 'translate(calc(-100% - 8px), 8px)' }
      case 'left':
        return { transform: 'translate(calc(-100% - 16px), -50%)' }
    }
  }

  // Center label position = pentagon centroid; max width sized so the
  // label nests inside the polygon without overlapping vertex labels.
  const centerX = vertices.length === 5 ? vertices.reduce((s, v) => s + v.x, 0) / 5 : 0
  const centerY = vertices.length === 5 ? vertices.reduce((s, v) => s + v.y, 0) / 5 : 0
  const centerMaxWidth = pentagonRadius > 0 ? pentagonRadius * 1.2 : 320

  const centerActive = centerCardIndex(scrollProgress)
  const statementOp = statementOpacity(scrollProgress)
  const closingColor = wordColorAt(Math.max(scrollProgress, 0.95))

  return (
    <div className="frvrd-pinned" ref={wrapperRef}>
      <div className="frvrd-pinned-sticky">
        <header className="frvrd-pinned-top">
          <div className="eyebrow">02 &nbsp; The framework</div>
          <a className="frvrd-pinned-skip" href="#how">
            Skip the framework &rarr;
          </a>
        </header>

        <div className="frvrd-pinned-stage">
          <BuildingFrvrdRadar
            scrollProgress={scrollProgress}
            onVertexPositions={handleVertexPositions}
          />

          {/* Vertex labels — fade in when the matching dot arrives. */}
          {vertices.length === 5 && (
            <div className="frvrd-pinned-labels" aria-hidden="true">
              {VERTICES.map((v, i) => {
                const opacity = scrollProgress >= MIGRATION_END[i] ? 1 : 0
                return (
                  <span
                    key={v.name}
                    className="frvrd-pinned-label"
                    style={{
                      left: `${vertices[i].x}px`,
                      top: `${vertices[i].y}px`,
                      opacity,
                      ...labelOffset(v.side),
                    }}
                  >
                    {v.name}
                  </span>
                )
              })}
            </div>
          )}

          {/* Phase 0 — the big statement. Fades during Phase 1. */}
          <div
            className="frvrd-pinned-text"
            style={{ opacity: statementOp, pointerEvents: statementOp > 0.05 ? 'auto' : 'none' }}
            aria-hidden={statementOp <= 0.05}
          >
            <h2
              className="frvrd-statement"
              style={{ color: wordColorAt(scrollProgress) }}
            >
              Clicks don&rsquo;t close.<br />
              Relationships do.
            </h2>
            <p className="frvrd-statement-sub">
              We score the warmth of every named buyer, so you know which
              relationships are ready to close.
            </p>
          </div>

          {/* Phase 2/3 — center label nested inside the pentagon. */}
          {vertices.length === 5 && centerActive >= 0 && (
            <div
              className="frvrd-center-label"
              style={{
                left: `${centerX}px`,
                top: `${centerY}px`,
                width: `${centerMaxWidth}px`,
              }}
              aria-live="polite"
            >
              {CENTER_CARDS.map((card, i) => {
                const offset = (i - centerActive) * 100
                const isActive = i === centerActive
                const closing = card.isClosing && isActive
                return (
                  <div
                    key={card.name}
                    className={`frvrd-center-card${isActive ? ' is-active' : ''}${
                      closing ? ' is-closing' : ''
                    }`}
                    style={{
                      transform: `translate(-50%, calc(-50% + ${offset}%))`,
                      opacity: isActive ? 1 : 0,
                      color: closing ? closingColor : undefined,
                    }}
                    aria-hidden={!isActive}
                  >
                    <div className="frvrd-center-name">{card.name}</div>
                    <div className="frvrd-center-detail">{card.detail}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="frvrd-pinned-progress">
          <span className="frvrd-pinned-progress-cap frvrd-pinned-progress-cap--cold">
            COLD
          </span>
          <div className="frvrd-pinned-progress-track">
            <div
              className="frvrd-pinned-progress-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="frvrd-pinned-progress-cap frvrd-pinned-progress-cap--warm">
            WARM
          </span>
          <div className="frvrd-pinned-progress-dots" aria-hidden="true">
            {MIGRATION_END.map((end, i) => (
              <span
                key={i}
                className={`frvrd-pinned-progress-dot${
                  scrollProgress >= end ? ' is-filled' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
