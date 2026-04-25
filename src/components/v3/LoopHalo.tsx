// LoopHalo.tsx — §02 centerpiece figure for the /v3 staging homepage.
// Concentric three-ring SVG: outer Halo layer, middle 9-stage Loop ring,
// inner negative space. Nine stage nodes are evenly distributed every 40°,
// each rendered as a white circle with a single-weight 2px line icon.
// Pure inline SVG, no client-side JS, no dependencies.

import type { ReactNode } from 'react'

interface Stage {
  label: string
  // Returns the icon's path geometry on a 24x24 viewBox. Stroke and color
  // come from the parent <g>; the icon body is just the geometry.
  paths: () => ReactNode
}

// Each icon body is rendered inside a <g> that already sets
// fill="none", stroke=currentColor, strokeWidth=2, linecap/linejoin=round.

const detectPaths = () => (
  <>
    <circle cx="12" cy="12" r="7" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <circle cx="12" cy="12" r="1.5" fill="var(--accent)" stroke="none" />
  </>
)

const enrichPaths = () => (
  <>
    <ellipse cx="12" cy="6" rx="7" ry="2.5" />
    <path d="M5 6 v12 a7 2.5 0 0 0 14 0 V6" />
    <path d="M5 12 a7 2.5 0 0 0 14 0" />
  </>
)

const scorePaths = () => (
  <>
    <path d="M3 16 a9 9 0 0 1 18 0" />
    <line x1="12" y1="16" x2="17" y2="9" />
    <circle cx="12" cy="16" r="1.5" fill="var(--accent)" stroke="none" />
  </>
)

const reachPaths = () => (
  <>
    <path d="M21 3 L3 11 L11 13 Z" />
    <path d="M21 3 L13 21 L11 13 Z" />
  </>
)

const respondPaths = () => (
  <path d="M4 5 h16 v11 h-9 l-5 4 v-4 H4 Z" />
)

const nurturePaths = () => (
  <>
    <path d="M12 21 V11" />
    <path d="M12 11 C 6 11 5 5 5 5 C 5 5 11 5 12 11 Z" />
    <path d="M12 11 C 18 11 19 6 19 6 C 19 6 13 7 12 11 Z" />
  </>
)

const closePaths = () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12 l3 3 l5 -6" />
  </>
)

const expandPaths = () => (
  <>
    <path d="M3 17 L9 11 L13 15 L21 7" />
    <path d="M15 7 H21 V13" />
  </>
)

const retainPaths = () => (
  <>
    <path d="M4 12 a8 8 0 0 1 14 -5" />
    <path d="M18 3 V7 H14" />
    <path d="M20 12 a8 8 0 0 1 -14 5" />
    <path d="M6 21 V17 H10" />
  </>
)

const STAGES: Stage[] = [
  { label: 'Detect', paths: detectPaths },
  { label: 'Enrich', paths: enrichPaths },
  { label: 'Score', paths: scorePaths },
  { label: 'Reach', paths: reachPaths },
  { label: 'Respond', paths: respondPaths },
  { label: 'Nurture', paths: nurturePaths },
  { label: 'Close', paths: closePaths },
  { label: 'Expand', paths: expandPaths },
  { label: 'Retain', paths: retainPaths },
]

export default function LoopHalo() {
  const cx = 360
  const cy = 360
  const rOuter = 320
  const rInner = 220
  const rLoop = 270
  const nodeR = 32
  const labelR = rLoop + 60
  const iconSize = 26

  return (
    <section id="loop">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02 &nbsp; The system</div>
            <h2 className="section-h2">
              The loop runs.<br />
              <span className="slab">Halo makes it visible.</span>
            </h2>
          </div>
          <p className="section-lede">
            Nine stages compound into warmth. Halo is the upper-funnel layer
            that amplifies the loop across LinkedIn, AEO, PR, and events.{' '}
            <strong>Signals from every stage feed back into the system.</strong>
          </p>
        </div>

        <div className="loop-figure">
          <svg
            className="loop-svg"
            viewBox="0 0 720 720"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="ERA loop with Halo amplification ring"
          >
            {/* Outer Halo ring fill — Chalk */}
            <circle cx={cx} cy={cy} r={rOuter} fill="var(--bg-alt)" />
            {/* Inner ring (Parchment over Chalk) where stages sit */}
            <circle cx={cx} cy={cy} r={(rOuter + rInner) / 2 + 28} fill="var(--bg)" />
            {/* Ring borders */}
            <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="var(--rule)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="var(--rule)" strokeWidth="1" />

            {/* Halo label at the top of the outer ring */}
            <text
              x={cx}
              y={cy - rOuter + 26}
              textAnchor="middle"
              fontFamily="Instrument Sans, sans-serif"
              fontSize="14"
              fontWeight="600"
              fill="var(--text)"
            >
              Halo
            </text>
            <text
              x={cx}
              y={cy - rOuter + 44}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              letterSpacing="0.16em"
              fill="var(--text-muted)"
            >
              LINKEDIN · AEO · PR · EVENTS
            </text>

            {STAGES.map((stage, i) => {
              const angleDeg = -90 + i * 40
              const angle = (angleDeg * Math.PI) / 180
              const nx = cx + rLoop * Math.cos(angle)
              const ny = cy + rLoop * Math.sin(angle)
              const lx = cx + labelR * Math.cos(angle)
              const ly = cy + labelR * Math.sin(angle)
              const scale = iconSize / 24
              return (
                <g key={stage.label}>
                  <circle
                    cx={nx}
                    cy={ny}
                    r={nodeR}
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth="1"
                  />
                  <g
                    transform={`translate(${nx - iconSize / 2}, ${ny - iconSize / 2}) scale(${scale})`}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2 / scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {stage.paths()}
                  </g>
                  <text
                    x={lx}
                    y={ly + 4}
                    textAnchor="middle"
                    fontFamily="Instrument Sans, sans-serif"
                    fontSize="13"
                    fontWeight="500"
                    fill="var(--text)"
                  >
                    {stage.label}
                  </text>
                </g>
              )
            })}
          </svg>

          <p className="loop-caption">
            The outer ring is where visibility gets earned. The inner ring
            is where revenue gets made.
          </p>
        </div>
      </div>
    </section>
  )
}
