// Loop.tsx — §05 centerpiece for the /v3 staging homepage.
// Two-column layout at desktop (loop diagram on left, interactive stage
// detail card on right). Stacks on mobile. Single ring with 9 evenly-
// spaced stage nodes. Card content updates on click/dot/keyboard. No
// auto-advance. The prior outer "Halo" ring + annotation + channel list
// were removed in commit 11.

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Stage {
  label: string
  overline: 'CONNECT' | 'TRUST' | 'LOYALTY'
  claim: string
  body: string
  paths: () => ReactNode
}

const detectPaths = () => (
  <>
    <circle cx="12" cy="12" r="7" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
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
    <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
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
  {
    label: 'Detect',
    overline: 'CONNECT',
    claim: 'Signals the moment a buying window opens.',
    body:
      'Exec hires, funding rounds, tech installs, hiring bursts. The real intent, before the form fill.',
    paths: detectPaths,
  },
  {
    label: 'Enrich',
    overline: 'CONNECT',
    claim: "Builds context the rep doesn't have time to build.",
    body:
      "Account size, buying committee, current stack, recent press. Everything you need to start a conversation that doesn't sound automated.",
    paths: enrichPaths,
  },
  {
    label: 'Score',
    overline: 'CONNECT',
    claim: 'Ranks the heat. Knows when to wait.',
    body:
      'Warmth updated daily. Frequency, recency, density of engagement. The accounts ready get the first move. The rest stay in the loop.',
    paths: scorePaths,
  },
  {
    label: 'Reach',
    overline: 'TRUST',
    claim: 'Outreach with a reason, not a quota.',
    body:
      'Multi-channel sequences triggered by signals, not calendars. The right person, the right message, the moment something changed.',
    paths: reachPaths,
  },
  {
    label: 'Respond',
    overline: 'TRUST',
    claim: "Replies that sound like the buyer's question, not your script.",
    body:
      'Inbound replies handled in tone. Objections answered with specifics. Meetings booked without the back-and-forth.',
    paths: respondPaths,
  },
  {
    label: 'Nurture',
    overline: 'TRUST',
    claim: "Stays useful when they're not ready.",
    body:
      "Buyers who aren't buying this quarter still need value. LinkedIn posts, AEO content, peer intros. Warmth that compounds.",
    paths: nurturePaths,
  },
  {
    label: 'Close',
    overline: 'LOYALTY',
    claim: 'Pushes through the last ten yards.',
    body:
      'Procurement, security review, exec sign-off. The stages where deals stall. We unstick them with the right intel at the right step.',
    paths: closePaths,
  },
  {
    label: 'Expand',
    overline: 'LOYALTY',
    claim: 'Grows the account after the win.',
    body:
      "New users, new departments, new product lines. Existing customers buy more when someone is paying attention. Most teams aren't.",
    paths: expandPaths,
  },
  {
    label: 'Retain',
    overline: 'LOYALTY',
    claim: 'Keeps the relationship warm past renewal.',
    body:
      'Churn signals fire before the cancellation email. Save plays trigger automatically. Renewal stops being a fire drill.',
    paths: retainPaths,
  },
]

export default function Loop() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  // Track viewport visibility so arrow keys only cycle stages when this
  // section is on screen — otherwise they'd hijack the user's scroll.
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setActive((i) => (i + 1) % STAGES.length)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setActive((i) => (i - 1 + STAGES.length) % STAGES.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView])

  // Geometry — viewBox 720x720, center (360, 360).
  const cx = 360
  const cy = 360
  const rInner = 220
  const rLoop = 270
  const nodeR = 32
  const labelR = rLoop + 60
  const iconSize = 26

  const stage = STAGES[active]

  return (
    <section id="loop" ref={sectionRef}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">05 &nbsp; The loop</div>
            <h2 className="section-h2">
              Run loops, not campaigns.
            </h2>
          </div>
          <p className="section-lede">
            Nine stages, end to end. From detect to retain.{' '}
            <strong>
              Each stage feeds the next, and warmth compounds across all of
              them.
            </strong>
          </p>
        </div>

        <div className="loop-layout">
          <div className="loop-figure">
            <svg
              className="loop-svg"
              viewBox="0 0 720 720"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="ERA loop, nine stages"
            >
              {/* Inner reference ring — keeps the nodes visually anchored */}
              <circle
                cx={cx}
                cy={cy}
                r={rInner}
                fill="var(--bg)"
                stroke="var(--rule)"
                strokeWidth="1"
              />

              {STAGES.map((s, i) => {
                const angleDeg = -90 + i * 40
                const angle = (angleDeg * Math.PI) / 180
                const nx = cx + rLoop * Math.cos(angle)
                const ny = cy + rLoop * Math.sin(angle)
                const lx = cx + labelR * Math.cos(angle)
                const ly = cy + labelR * Math.sin(angle)
                const scale = iconSize / 24
                const isActive = i === active
                return (
                  <g
                    key={s.label}
                    className="loop-node"
                    onClick={() => setActive(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={s.label}
                    aria-pressed={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActive(i)
                      }
                    }}
                  >
                    <circle
                      cx={nx}
                      cy={ny}
                      r={nodeR}
                      fill={isActive ? 'var(--accent)' : 'var(--surface)'}
                      stroke="var(--accent)"
                      strokeWidth="1"
                    />
                    <g
                      transform={`translate(${nx - iconSize / 2}, ${ny - iconSize / 2}) scale(${scale})`}
                      fill="none"
                      stroke={isActive ? 'var(--bg)' : 'var(--accent)'}
                      strokeWidth={2 / scale}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: isActive ? 'var(--bg)' : 'var(--accent)' }}
                    >
                      {s.paths()}
                    </g>
                    <text
                      x={lx}
                      y={ly + 4}
                      textAnchor="middle"
                      fontFamily="Instrument Sans, sans-serif"
                      fontSize="13"
                      fontWeight={isActive ? 600 : 500}
                      fill="var(--text)"
                    >
                      {s.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="loop-card" aria-live="polite">
            <div className="loop-card-overline">{stage.overline}</div>
            <div className="loop-card-title">{stage.label}</div>
            <p className="loop-card-claim">{stage.claim}</p>
            <p className="loop-card-body">{stage.body}</p>
            <div className="loop-card-rule" />
            <div className="loop-card-pagination" role="tablist" aria-label="Loop stages">
              {STAGES.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={s.label}
                  className={`loop-dot${i === active ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <div className="loop-card-footer">EXPLORE EACH STAGE</div>
          </div>
        </div>
      </div>
    </section>
  )
}
