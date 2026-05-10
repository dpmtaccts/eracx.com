/**
 * SectionTheWork — /v4-preview only. Consolidated §02 absorbing the
 * production /v4's §02 (Approach), §03 (What ERA Is/Isn't), and §05
 * (How It Works).
 *
 * Five blocks:
 *   1. Opening claim   — "Don't pitch strangers." headline + lede.
 *   2. FIG.01          — Campaign vs. Loop (parchment card, duplicated
 *                        SVG from V4System so /v4 stays untouched).
 *   3. FIG.02          — Pentagon + FRVRD translation sidebar.
 *   4. FIG.03          — Lorikeet 90-day timeline (DIRECTIONAL EXAMPLE
 *                        label until customer sign-off).
 *   5. FIG.04          — Cadence: four phases + DETECT…RETAIN line.
 *
 * Visualizations are static (no scroll choreography). The point of the
 * preview is to test consolidation, not to re-implement animation. If
 * the consolidated §02 ships, the pentagon + timeline can be promoted
 * to V4WarmthOverTime's animated variants without a layout change.
 *
 * Magenta section ground only. Inside cards: ink + parchment + one
 * yellow SIGNAL column in FIG.01.
 */

import { V4Header } from './V4Header'

// ----- FIG.03 Lorikeet account journey (8 events across 90 days) -----
//
// Plot geometry: x=100 is day 0, x=1208 is day 90 (~12.31 SVG units per
// day, matching the production FIG.03 axis). Warmth on y axis: y=620 is
// 0, y=80 is 100 (~5.4 SVG units per warmth point). Final marker at
// day 89 emphasized with a yellow accent ring per spec.

interface LorikeetMarker {
  day: number
  warmth: number
  label: string
  descriptor: string
  highlight?: boolean
}

const LORIKEET_EVENTS: LorikeetMarker[] = [
  { day: 3,  warmth: 14, label: 'HIRING SURGE',     descriptor: 'New CX leader joins.' },
  { day: 11, warmth: 24, label: 'CONTENT ENGAGED',  descriptor: 'Trust report downloaded.' },
  { day: 18, warmth: 32, label: 'LINKEDIN COMMENT', descriptor: 'Public engagement.' },
  { day: 27, warmth: 40, label: 'REFERRAL SIGNAL',  descriptor: 'Mutual mention in Slack.' },
  { day: 41, warmth: 50, label: 'WEBSITE RETURN',   descriptor: 'Pricing page, three sessions.' },
  { day: 53, warmth: 60, label: 'MEETING ACCEPTED', descriptor: 'Reply within four hours.' },
  { day: 67, warmth: 72, label: 'COMMITTEE EXPAND', descriptor: 'Two stakeholders added.' },
  { day: 89, warmth: 88, label: 'DEAL MOVING',      descriptor: 'Pilot scoped. Warmth: 88.', highlight: true },
]

const dayToX = (day: number) => 100 + day * (1108 / 90)
const warmthToY = (warmth: number) => 620 - warmth * 5.4

// ----- FRVRD pentagon — static final state -----

const PENTAGON_CX = 240
const PENTAGON_CY = 224
const PENTAGON_R = 183

const VERTEX_ANGLES = [
  -Math.PI / 2,
  -Math.PI / 2 + (2 * Math.PI / 5),
  -Math.PI / 2 + (4 * Math.PI / 5),
  -Math.PI / 2 + (6 * Math.PI / 5),
  -Math.PI / 2 + (8 * Math.PI / 5),
]

// Order: Frequency, Recency, Value, Responsiveness, Density.
const SCORES = [92, 88, 90, 84, 86]
const COMPOSITE = 88

const PENTAGON_POINTS = SCORES
  .map((score, i) => {
    const r = (score / 100) * PENTAGON_R
    const x = PENTAGON_CX + r * Math.cos(VERTEX_ANGLES[i])
    const y = PENTAGON_CY + r * Math.sin(VERTEX_ANGLES[i])
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  .join(' ')

// ----- FRVRD sidebar translation table -----

const FRVRD_ROWS = [
  { label: 'FREQUENCY',       means: 'Touches per quarter' },
  { label: 'RECENCY',         means: 'Days since last reply' },
  { label: 'VALUE',           means: 'Buying committee fit' },
  { label: 'RESPONSIVENESS',  means: 'Reply rate and speed' },
  { label: 'DENSITY',         means: 'Contacts per account' },
]

// ----- FIG.04 cadence rows -----

const CADENCE_ROWS = [
  {
    weeks: 'WEEK 01–02',
    verb:  'INSTALL',
    body:  'Signal map. Account scoring. Tech stack wired. Top fifty plays drafted.',
  },
  {
    weeks: 'WEEK 03–04',
    verb:  'LAUNCH',
    body:  'Plays running. Sellers in the queue. First responses captured.',
  },
  {
    weeks: 'WEEK 05–08',
    verb:  'OPERATE',
    body:  'Loop running daily. Weekly tuning. Multi-threading begins.',
  },
  {
    weeks: 'ONGOING',
    verb:  'COMPOUND',
    body:  'We stay. The system gets sharper. Your pipeline gets predictable.',
  },
]

const NINE_STAGES = [
  'DETECT', 'ENRICH', 'SCORE', 'REACH', 'RESPOND', 'NURTURE', 'CLOSE', 'EXPAND', 'RETAIN',
]

// ============================================================================

export function SectionTheWork() {
  return (
    <section className="v4-section v4-section--system" id="warmth">
      <V4Header
        phase="▸02 · THE WORK"
        meta={['ACCOUNT 047', 'WARMTH 88']}
      />

      <div className="v4-system">

        {/* ====================================================
            BLOCK 1 — Opening claim
            ==================================================== */}
        <div className="v4-the-work__opening">
          <div className="v4-eyebrow">THE PRACTICE</div>
          <h2 className="v4-approach__display">
            Don't pitch strangers.<br />Get to know them.
          </h2>
          <p className="v4-the-work__lede">
            ERA reads twenty-four buyer signals across your accounts every day, builds the plays, and runs the loop with your sellers every week. We don't build and leave.
          </p>
        </div>

        {/* ====================================================
            BLOCK 2 — FIG.01 Campaign vs. Loop
            (Duplicated from V4System so /v4 stays untouched.)
            ==================================================== */}
        <div className="v4-system-card v4-system-card--parchment">
          <div className="v4-system-card__header">
            <span className="v4-system-card__label">FIG.01 / LINEAR VS. CYCLICAL</span>
          </div>

          {/* ----- Top half: A CAMPAIGN ----- */}
          <svg
            className="v4-system-card__svg"
            viewBox="0 0 1280 360"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="A campaign: brand sends content once, customer receives, ends"
          >
            <text x="0" y="40" textAnchor="start" className="v4-card-title">A CAMPAIGN</text>
            <text x="220" y="40" textAnchor="start" className="v4-card-footnote">FIG.01 / LINEAR</text>
            <line x1="0" y1="64" x2="1280" y2="64" className="v4-section-rule" />

            <text x="160" y="120" textAnchor="middle" className="v4-card-step-prefix">STEP 01</text>
            <text x="640" y="120" textAnchor="middle" className="v4-card-step-prefix">STEP 02</text>
            <text x="1120" y="120" textAnchor="middle" className="v4-card-step-prefix">STEP 03</text>

            <g transform="translate(160, 200)">
              <line x1="0" y1="-60" x2="0" y2="-44" stroke="#0A0A0A" strokeWidth="3.5" />
              <rect x="-10" y="-54" width="20" height="3" fill="#0A0A0A" />
              <rect x="-7" y="-48" width="14" height="3" fill="#0A0A0A" />
              <rect x="-32" y="-44" width="64" height="64" fill="#0A0A0A" />
              <rect x="-22" y="-34" width="10" height="10" fill="#F4F1EA" />
              <rect x="-5" y="-34" width="10" height="10" fill="#F4F1EA" />
              <rect x="12" y="-34" width="10" height="10" fill="#F4F1EA" />
              <rect x="-22" y="-18" width="10" height="10" fill="#F4F1EA" />
              <rect x="-5" y="-18" width="10" height="10" fill="#F4F1EA" />
              <rect x="12" y="-18" width="10" height="10" fill="#F4F1EA" />
              <rect x="-8" y="0" width="16" height="20" fill="#F4F1EA" />
            </g>

            <g transform="translate(640, 200)">
              <path d="M -36 -52 L 22 -52 L 40 -34 L 40 52 L -36 52 Z" fill="#0A0A0A" />
              <path d="M 22 -52 L 22 -34 L 40 -34 Z" fill="#F4F1EA" />
              <line x1="22" y1="-52" x2="40" y2="-34" stroke="#0A0A0A" strokeWidth="2" />
              <rect x="-22" y="-20" width="48" height="3" fill="#F4F1EA" />
              <rect x="-22" y="-8" width="48" height="3" fill="#F4F1EA" />
              <rect x="-22" y="4" width="40" height="3" fill="#F4F1EA" />
              <rect x="-22" y="16" width="48" height="3" fill="#F4F1EA" />
              <rect x="-22" y="28" width="32" height="3" fill="#F4F1EA" />
            </g>

            <g transform="translate(1120, 200)">
              <path d="M -42 -22 L 0 -56 L 42 -22 Z" fill="#0A0A0A" />
              <rect x="-36" y="-22" width="72" height="50" fill="#0A0A0A" />
              <rect x="-26" y="-12" width="12" height="12" fill="#F4F1EA" />
              <rect x="-6" y="-12" width="12" height="12" fill="#F4F1EA" />
              <rect x="14" y="-12" width="12" height="12" fill="#F4F1EA" />
              <rect x="-8" y="8" width="16" height="20" fill="#F4F1EA" />
            </g>

            <line x1="240" y1="200" x2="540" y2="200" stroke="#0A0A0A" strokeWidth="6" />
            <polygon points="540,182 580,200 540,218" fill="#0A0A0A" />
            <line x1="720" y1="200" x2="1020" y2="200" stroke="#0A0A0A" strokeWidth="6" />
            <polygon points="1020,182 1060,200 1020,218" fill="#0A0A0A" />

            <text x="160" y="284" textAnchor="middle" className="v4-card-node-label">BRAND</text>
            <text x="640" y="284" textAnchor="middle" className="v4-card-node-label">CONTENT</text>
            <text x="1120" y="284" textAnchor="middle" className="v4-card-node-label">CUSTOMER</text>

            <text x="160" y="306" textAnchor="middle" className="v4-card-node-descriptor">sends once</text>
            <text x="640" y="306" textAnchor="middle" className="v4-card-node-descriptor">delivered</text>
            <text x="1120" y="306" textAnchor="middle" className="v4-card-node-descriptor">receives</text>

            <text x="0" y="338" textAnchor="start" className="v4-card-caption">LINEAR · ENDS</text>
            <line x1="0" y1="345" x2="1280" y2="345" className="v4-hairline" />
            <line x1="1180" y1="328" x2="1180" y2="358" stroke="#0A0A0A" strokeWidth="3" />
            <line x1="1190" y1="328" x2="1190" y2="358" stroke="#0A0A0A" strokeWidth="3" />
            <line x1="1170" y1="343" x2="1200" y2="343" stroke="#0A0A0A" strokeWidth="3" />
          </svg>

          <div className="v4-system-card__divider" aria-hidden="true" />

          {/* ----- Bottom half: A LOOP ----- */}
          <svg
            className="v4-system-card__svg"
            viewBox="0 0 1280 440"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="A loop: signal arrives, brand acts, content learns, customer responds, response becomes a new signal"
          >
            <rect x="40" y="84" width="160" height="240" fill="#F4C430" />

            <text x="0" y="40" textAnchor="start" className="v4-card-title">A LOOP</text>
            <text x="160" y="40" textAnchor="start" className="v4-card-footnote">FIG.02 / CYCLICAL</text>
            <line x1="0" y1="64" x2="1280" y2="64" className="v4-section-rule" />

            <text x="120" y="100" textAnchor="middle" className="v4-card-start-marker">▼ STARTS HERE</text>

            <text x="120" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 01</text>
            <text x="500" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 02</text>
            <text x="800" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 03</text>
            <text x="1140" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 04</text>

            <g transform="translate(120, 220)">
              <rect x="-32" y="32" width="64" height="8" fill="#0A0A0A" />
              <line x1="0" y1="32" x2="0" y2="-12" stroke="#0A0A0A" strokeWidth="3.5" />
              <path d="M -36 -10 A 36 36 0 0 1 36 -10" stroke="#0A0A0A" strokeWidth="3.5" fill="none" />
              <path d="M -24 -10 A 24 24 0 0 1 24 -10" stroke="#0A0A0A" strokeWidth="3" fill="none" />
              <path d="M -12 -10 A 12 12 0 0 1 12 -10" stroke="#0A0A0A" strokeWidth="2.5" fill="none" />
              <circle cx="0" cy="-10" r="3.5" fill="#0A0A0A" />
            </g>

            <g transform="translate(500, 220)">
              <line x1="0" y1="-60" x2="0" y2="-44" stroke="#0A0A0A" strokeWidth="3.5" />
              <rect x="-10" y="-54" width="20" height="3" fill="#0A0A0A" />
              <rect x="-7" y="-48" width="14" height="3" fill="#0A0A0A" />
              <rect x="-32" y="-44" width="64" height="64" fill="#0A0A0A" />
              <rect x="-22" y="-34" width="10" height="10" fill="#F4F1EA" />
              <rect x="-5" y="-34" width="10" height="10" fill="#F4F1EA" />
              <rect x="12" y="-34" width="10" height="10" fill="#F4F1EA" />
              <rect x="-22" y="-18" width="10" height="10" fill="#F4F1EA" />
              <rect x="-5" y="-18" width="10" height="10" fill="#F4F1EA" />
              <rect x="12" y="-18" width="10" height="10" fill="#F4F1EA" />
              <rect x="-8" y="0" width="16" height="20" fill="#F4F1EA" />
            </g>

            <g transform="translate(800, 220)">
              <path d="M -32 -48 L 18 -48 L 36 -30 L 36 48 L -32 48 Z" fill="#0A0A0A" />
              <path d="M 18 -48 L 18 -30 L 36 -30 Z" fill="#F4F1EA" />
              <line x1="18" y1="-48" x2="36" y2="-30" stroke="#0A0A0A" strokeWidth="2" />
              <rect x="-20" y="-16" width="44" height="3" fill="#F4F1EA" />
              <rect x="-20" y="-4" width="44" height="3" fill="#F4F1EA" />
              <rect x="-20" y="8" width="36" height="3" fill="#F4F1EA" />
              <rect x="-20" y="20" width="44" height="3" fill="#F4F1EA" />
              <rect x="-20" y="32" width="28" height="3" fill="#F4F1EA" />
            </g>

            <g transform="translate(1140, 220)">
              <path d="M -42 -22 L 0 -56 L 42 -22 Z" fill="#0A0A0A" />
              <rect x="-36" y="-22" width="72" height="50" fill="#0A0A0A" />
              <rect x="-26" y="-12" width="12" height="12" fill="#F4F1EA" />
              <rect x="-6" y="-12" width="12" height="12" fill="#F4F1EA" />
              <rect x="14" y="-12" width="12" height="12" fill="#F4F1EA" />
              <rect x="-8" y="8" width="16" height="20" fill="#F4F1EA" />
            </g>

            <line x1="200" y1="220" x2="420" y2="220" stroke="#0A0A0A" strokeWidth="6" />
            <polygon points="420,202 460,220 420,238" fill="#0A0A0A" />
            <line x1="580" y1="220" x2="720" y2="220" stroke="#0A0A0A" strokeWidth="6" />
            <polygon points="720,202 760,220 720,238" fill="#0A0A0A" />
            <line x1="860" y1="220" x2="1060" y2="220" stroke="#0A0A0A" strokeWidth="6" />
            <polygon points="1060,202 1100,220 1060,238" fill="#0A0A0A" />

            <text x="120" y="304" textAnchor="middle" className="v4-card-node-label">SIGNAL</text>
            <text x="500" y="304" textAnchor="middle" className="v4-card-node-label">BRAND</text>
            <text x="800" y="304" textAnchor="middle" className="v4-card-node-label">CONTENT</text>
            <text x="1140" y="304" textAnchor="middle" className="v4-card-node-label">CUSTOMER</text>

            <text x="120" y="322" textAnchor="middle" className="v4-card-node-descriptor">arrives</text>
            <text x="500" y="322" textAnchor="middle" className="v4-card-node-descriptor">acts</text>
            <text x="800" y="322" textAnchor="middle" className="v4-card-node-descriptor">+ learns</text>
            <text x="1140" y="322" textAnchor="middle" className="v4-card-node-descriptor">responds</text>

            <line x1="1140" y1="248" x2="1140" y2="294" stroke="#0A0A0A" strokeWidth="4" />
            <line x1="1140" y1="332" x2="1140" y2="380" stroke="#0A0A0A" strokeWidth="4" />
            <line x1="1140" y1="380" x2="740" y2="380" stroke="#0A0A0A" strokeWidth="4" />
            <line x1="540" y1="380" x2="120" y2="380" stroke="#0A0A0A" strokeWidth="4" />
            <line x1="120" y1="380" x2="120" y2="332" stroke="#0A0A0A" strokeWidth="4" />
            <line x1="120" y1="294" x2="120" y2="268" stroke="#0A0A0A" strokeWidth="4" />
            <polygon points="108,268 120,244 132,268" fill="#0A0A0A" />

            <rect x="540" y="368" width="200" height="24" fill="#F4F1EA" />
            <text x="640" y="384" textAnchor="middle" className="v4-card-caption">▸ NEW SIGNAL</text>

            <text x="0" y="418" textAnchor="start" className="v4-card-caption">CYCLICAL · COMPOUNDS</text>
            <line x1="0" y1="425" x2="1280" y2="425" className="v4-hairline" />
          </svg>

          <p className="v4-system-card__footnote">
            ERA RUNS THIS LOOP DAILY ACROSS EVERY TARGET ACCOUNT. YOUR
            SELLERS WALK IN AFTER IT'S BEEN RUNNING FOR WEEKS.
          </p>
        </div>

        {/* ====================================================
            BLOCK 3 — FIG.02 Pentagon + FRVRD sidebar
            ==================================================== */}
        <div className="v4-system-card v4-system-card--parchment">
          <div className="v4-system-card__header">
            <span className="v4-system-card__label">FIG.02 / WARMTH SCORING</span>
            <span className="v4-system-card__label">FRVRD</span>
          </div>

          <div className="v4-fig02-pentagon-wrap">
            <svg
              className="v4-pentagon"
              viewBox="-50 0 580 440"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="FRVRD pentagon: frequency 92, recency 88, value 90, responsiveness 84, density 86, composite 88"
            >
                {/* Reference rings */}
                <polygon points="240,40 411,164 346,376 134,376 69,164" fill="none" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
                <polygon points="240,130 326,192 293,298 187,298 154,192" fill="none" stroke="rgba(10,10,10,0.08)" strokeWidth="1" />

                {/* Filled polygon at final state */}
                <polygon
                  points={PENTAGON_POINTS}
                  fill="#E6195F"
                  fillOpacity="0.12"
                  stroke="#E6195F"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Vertex circles */}
                <circle cx="240" cy="54" r="6" fill="#0A0A0A" />
                <circle cx="397" cy="170" r="6" fill="#0A0A0A" />
                <circle cx="335" cy="358" r="6" fill="#0A0A0A" />
                <circle cx="144" cy="355" r="6" fill="#0A0A0A" />
                <circle cx="95" cy="170" r="6" fill="#0A0A0A" />

                <text x="240" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">FREQUENCY</text>
                <text x="240" y="38" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{SCORES[0]}</text>

                <text x="430" y="170" textAnchor="start" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">RECENCY</text>
                <text x="430" y="186" textAnchor="start" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{SCORES[1]}</text>

                <text x="365" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">VALUE</text>
                <text x="365" y="411" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{SCORES[2]}</text>

                <text x="115" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">RESPONSIVENESS</text>
                <text x="115" y="411" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{SCORES[3]}</text>

                <text x="50" y="170" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">DENSITY</text>
                <text x="50" y="186" textAnchor="end" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">{SCORES[4]}</text>

              <text x="240" y="225" textAnchor="middle" fontFamily="Archivo Black" fontSize="72" letterSpacing="-0.04em" fill="#E6195F">{COMPOSITE}</text>
              <text x="240" y="252" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.5)" fontWeight="700" letterSpacing="0.18em">COMPOSITE</text>
            </svg>
          </div>

          {/* Thin rule between the pentagon and the translation list. */}
          <div className="v4-fig02-rule" aria-hidden="true" />

          <div className="v4-fig02-list">
            {FRVRD_ROWS.map(({ label, means }) => (
              <div key={label} className="v4-fig02-list__row">
                <span className="v4-fig02-list__label">{label}</span>
                <span className="v4-fig02-list__arrow" aria-hidden="true">→</span>
                <span className="v4-fig02-list__means">{means}</span>
              </div>
            ))}
          </div>

          <p className="v4-system-card__footnote">
            WARMTH IS BEHAVIOR YOU CAN MEASURE. WE TRACK IT DAILY ACROSS EVERY ACCOUNT.
          </p>
        </div>

        {/* ====================================================
            BLOCK 4 — FIG.03 Lorikeet 90-day timeline
            ==================================================== */}
        <div className="v4-system-card v4-system-card--parchment">
          <div className="v4-system-card__header">
            <span className="v4-system-card__label">FIG.03 / ONE ACCOUNT, NINETY DAYS</span>
            <span className="v4-system-card__label">LORIKEET</span>
          </div>

          <div className="v4-fig03-timeline-wrapper">
            <svg
              className="v4-system-card__svg"
              viewBox="0 0 1280 720"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Lorikeet account journey: eight signals across 90 days from unknown to deal moving."
            >
              {/* Grid lines */}
              <line x1="100" y1="80"  x2="1240" y2="80"  stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="215" x2="1240" y2="215" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="350" x2="1240" y2="350" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="485" x2="1240" y2="485" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="620" x2="1240" y2="620" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" />

              {/* Y-axis labels */}
              <text x="80" y="84"  textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">100</text>
              <text x="80" y="219" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">75</text>
              <text x="80" y="354" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">50</text>
              <text x="80" y="489" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">25</text>
              <text x="80" y="624" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">0</text>

              {/* X-axis labels */}
              <text x="100"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 0</text>
              <text x="285"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 15</text>
              <text x="469"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 30</text>
              <text x="654"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 45</text>
              <text x="838"  y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 60</text>
              <text x="1023" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 75</text>
              <text x="1208" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 90</text>

              {/* Warmth line through events */}
              <polyline
                points={`100,620 ${LORIKEET_EVENTS.map((e) => `${dayToX(e.day).toFixed(0)},${warmthToY(e.warmth).toFixed(0)}`).join(' ')}`}
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Event markers */}
              {LORIKEET_EVENTS.map((e) => {
                const x = dayToX(e.day)
                const y = warmthToY(e.warmth)
                return (
                  <g key={e.day}>
                    {/* Vertical guide */}
                    <line x1={x} y1={y} x2={x} y2={620} stroke="rgba(10,10,10,0.18)" strokeWidth="1" strokeDasharray="2,3" />
                    {/* Day label above */}
                    <text x={x} y={y - 38} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.5)" fontWeight="700" letterSpacing="0.14em">DAY {String(e.day).padStart(2, '0')}</text>
                    <text x={x} y={y - 22} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.10em">{e.label}</text>
                    {/* Marker */}
                    {e.highlight ? (
                      <>
                        <circle cx={x} cy={y} r="14" fill="#F4C430" />
                        <circle cx={x} cy={y} r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
                      </>
                    ) : (
                      <circle cx={x} cy={y} r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
                    )}
                    {/* Descriptor below */}
                    <text x={x} y={y + 28} textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="11" fill="rgba(10,10,10,0.7)">{e.descriptor}</text>
                  </g>
                )
              })}

              {/* Directional-example label, bottom-right of card */}
              <text x="1238" y="710" textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.45)" fontWeight="700" letterSpacing="0.18em">DIRECTIONAL EXAMPLE</text>
            </svg>
          </div>

          <p className="v4-system-card__footnote">
            EIGHT SIGNALS. ONE ACCOUNT. NINETY DAYS FROM UNKNOWN TO IN MOTION.
          </p>
        </div>

        {/* ====================================================
            BLOCK 5 — FIG.04 The Cadence
            ==================================================== */}
        <div className="v4-system-card v4-system-card--parchment">
          <div className="v4-system-card__header">
            <span className="v4-system-card__label">FIG.04 / THE CADENCE</span>
            <span className="v4-system-card__label">OPERATING RHYTHM</span>
          </div>

          <div className="v4-fig04-cadence">
            {CADENCE_ROWS.map(({ weeks, verb, body }) => (
              <div key={weeks} className="v4-fig04-row">
                <div className="v4-fig04-row__weeks">{weeks}</div>
                <div className="v4-fig04-row__verb">{verb}</div>
                <div className="v4-fig04-row__body">{body}</div>
              </div>
            ))}
          </div>

          <div className="v4-fig04-stages" aria-label="Operational stages: detect, enrich, score, reach, respond, nurture, close, expand, retain.">
            {NINE_STAGES.map((stage, i) => (
              <span key={stage} className="v4-fig04-stages__item">
                {i > 0 && <span className="v4-fig04-stages__sep" aria-hidden="true">·</span>}
                {stage}
              </span>
            ))}
          </div>

          <p className="v4-system-card__footnote">
            NOT A PROJECT. AN OPERATING LAYER.
          </p>
        </div>

      </div>
    </section>
  )
}
