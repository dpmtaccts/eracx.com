import { FONT } from '../../pages/betterup/theme'
import {
  BAND_COLORS,
  SCORE_BANDS,
  computeBuyerTrustScore,
  getScoreBand,
  type DiagnosticScores,
} from '../../lib/buyerTrustScore'
import { useScoreDrawer } from './ScoreDrawerContext'
import { ScoreAnatomy } from '../revenueSignal/ScoreAnatomy'

const INK = '#0A0A0A'
const HOT = '#E6195F'
const YELLOW = '#F4C430'
const PARCHMENT = '#F4F1EA'
const RULE = 'rgba(10, 10, 10, 0.15)'
const TEXT_MUTED = 'rgba(10, 10, 10, 0.65)'

type BridgeParagraph = {
  diagnostic: string
  score: string
  body: string
}

const BRIDGE: BridgeParagraph[] = [
  {
    diagnostic: 'Leaders',
    score: '24/100',
    body: "When the buyer searches LinkedIn for your team, she expects to find a chain of voices: the CEO, the marketing leader, the sales leader, the account managers, senior account executives, and client champions. Right now she finds the CEO and almost no one else. Five of the six profile types she expects to encounter publish nothing she can use, which is why this score sits at 24. This is the reading behind the recommendation to get your executives publishing original content.",
  },
  {
    diagnostic: 'Employees',
    score: '41/100',
    body: 'Before the buyer talks to your sales team, she checks Glassdoor. Today she finds a 3.2 of 5 rating, coaches surfacing pay disputes in the same forums prospective buyers search, and account managers who churn through accounts. The contradiction between what your marketing says and what your own employees publicly describe is searchable, which is why this score sits at 41. This is the reading behind the recommendation to treat the audit as a quarterly measurement of whether internal experience repair is landing externally.',
  },
  {
    diagnostic: 'Your content',
    score: '29/100',
    body: 'The content your marketing team is producing is reaching buyers who already believe in coaching, not the ones still deciding. Seven of eight content categories score below 50 percent alignment with what buyers actually search for at the decision stage, which is why this score sits at 29. This is the reading behind the recommendation to make it easy for your executives and sellers to publish, so the content the cascade produces lands where buyers are actually looking.',
  },
  {
    diagnostic: 'Agents',
    score: '38/100',
    body: "When a CHRO asks ChatGPT, Claude, or Perplexity about BetterUp, the answer balances praise for the product with caution about the organization. The agent reads discontinued D2C offerings, outdated employee counts, and old client logos in the same query that surfaces the Glassdoor rating. That mixed answer reaches the buyer before any human on your team does, which is why this score sits at 38. This is the reading behind the recommendation to fix the wrong data that agents are repeating.",
  },
]

const METHODOLOGY =
  "The Buyer Trust Score is a weighted composite of four diagnostic readings. Leaders carries the heaviest weight because the buyer encounters your leadership voices first when she opens LinkedIn. Employees and Your content are weighted equally as the upstream signals that produce what she reads about you. Agents sits lightest because the AI answer is largely the synthesis of the other three. The weights are calibrated against ERA's pattern recognition across comparable B2B engagements and updated as the dataset grows."

type Props = {
  scores: DiagnosticScores
  projectedScores: DiagnosticScores
  /** Selector to scroll to when "→ SEE THE ROADMAP" is clicked. */
  roadmapAnchor?: string
}

export function ScoreBreakdownDrawer({ scores, projectedScores, roadmapAnchor = 'proof' }: Props) {
  const { open, setOpen } = useScoreDrawer()
  const score = computeBuyerTrustScore(scores)
  const band = getScoreBand(score)
  const projected = computeBuyerTrustScore(projectedScores)
  const mvpScore = 41 // declared in roadmap stages — surfaced here for the trajectory
  const thenScore = 51

  const onSeeRoadmap = () => {
    setOpen(false)
    requestAnimationFrame(() => {
      document.getElementById(roadmapAnchor)?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <>
      {/* Dim overlay */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.4)',
          zIndex: 100,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 240ms ease-out',
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Buyer Trust Score breakdown"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 'min(560px, 100vw)',
          background: PARCHMENT,
          zIndex: 101,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 240ms ease-out',
          overflowY: 'auto',
          color: INK,
          fontFamily: FONT.body,
        }}
      >
        {/* Header with close */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            background: PARCHMENT,
            padding: '20px 32px 16px',
            borderBottom: `1px solid ${RULE}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: TEXT_MUTED,
              fontWeight: 600,
            }}
          >
            Buyer Trust Score · Breakdown
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              fontFamily: FONT.mono,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: INK,
              border: `2px solid ${INK}`,
              padding: '6px 12px',
              transition: 'background 120ms ease, color 120ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = HOT
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.borderColor = HOT
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = INK
              e.currentTarget.style.borderColor = INK
            }}
          >
            → Close
          </button>
        </header>

        <div style={{ padding: '32px 32px 64px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Drawer headline */}
          <div>
            <h2
              style={{
                fontFamily: FONT.mega,
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: INK,
                margin: 0,
              }}
            >
              How the score is built.
            </h2>
          </div>

          {/* Section A: The four diagnostic components (ScoreAnatomy) */}
          <ScoreAnatomy scores={scores} />

          {/* Section B: Four bridge paragraphs */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: TEXT_MUTED,
                fontWeight: 600,
              }}
            >
              What each diagnostic measures
            </div>
            {BRIDGE.map((p) => (
              <article key={p.diagnostic}>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 18,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: '-0.005em',
                    color: INK,
                    marginBottom: 4,
                  }}
                >
                  {p.diagnostic}
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: HOT,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  {p.score}
                </div>
                <p
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: INK,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </article>
            ))}
          </section>

          {/* Section C: Methodology */}
          <section>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: TEXT_MUTED,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Methodology
            </div>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: 14,
                lineHeight: 1.65,
                color: INK,
                margin: 0,
              }}
            >
              {METHODOLOGY}
            </p>
          </section>

          {/* Section D: Band system + cost callout */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: TEXT_MUTED,
                fontWeight: 600,
              }}
            >
              The band system
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${SCORE_BANDS.length}, minmax(0, 1fr))`,
                gap: 6,
              }}
            >
              {SCORE_BANDS.map((b) => {
                const isActive = b.id === band.id
                const color = BAND_COLORS[b.id]
                return (
                  <div
                    key={b.id}
                    style={{
                      border: `1px solid ${isActive ? color : RULE}`,
                      background: isActive ? color + '14' : 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ height: 3, background: color }} />
                    <div style={{ padding: '6px 6px 8px', textAlign: 'center' }}>
                      <div
                        style={{
                          fontFamily: FONT.body,
                          fontSize: 10,
                          fontWeight: 600,
                          color: isActive ? color : INK,
                          lineHeight: 1.2,
                          marginBottom: 2,
                        }}
                      >
                        {b.label}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT.mono,
                          fontSize: 9,
                          color: TEXT_MUTED,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {b.range[0]}&ndash;{b.range[1]}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              style={{
                marginTop: 8,
                background: INK,
                color: '#FFFFFF',
                padding: '18px 22px',
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: YELLOW,
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                What it's costing you
              </div>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: 1.25,
                  letterSpacing: '-0.005em',
                  color: '#FFFFFF',
                }}
              >
                {band.costLine}
              </div>
            </div>
          </section>

          {/* Section E: Compressed trajectory + roadmap link */}
          <section>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: TEXT_MUTED,
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              Where the score moves
            </div>
            <CompressedTrajectory
              nodes={[
                { label: 'Now', score },
                { label: 'Post-MVP', score: mvpScore },
                { label: 'Post-Then', score: thenScore },
                { label: 'Post-Full Build', score: projected },
              ]}
            />
            <button
              type="button"
              onClick={onSeeRoadmap}
              style={{
                marginTop: 18,
                all: 'unset',
                cursor: 'pointer',
                fontFamily: FONT.mono,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: INK,
                border: `2px solid ${INK}`,
                padding: '10px 16px',
                display: 'inline-block',
                transition: 'background 120ms ease, color 120ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = HOT
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.borderColor = HOT
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = INK
                e.currentTarget.style.borderColor = INK
              }}
            >
              → See the roadmap
            </button>
          </section>
        </div>
      </aside>
    </>
  )
}

function CompressedTrajectory({
  nodes,
}: {
  nodes: ReadonlyArray<{ label: string; score: number }>
}) {
  return (
    <div style={{ position: 'relative', padding: '6px 0 4px' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          top: 14,
          height: 1,
          background: INK,
        }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${nodes.length}, 1fr)`,
          position: 'relative',
        }}
      >
        {nodes.map((node, i) => {
          const color = BAND_COLORS[getScoreBand(node.score).id]
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: color,
                  color: color === INK ? '#FFFFFF' : INK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  border: `2px solid ${PARCHMENT}`,
                  letterSpacing: '0.04em',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {node.score}
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: TEXT_MUTED,
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                {node.label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
