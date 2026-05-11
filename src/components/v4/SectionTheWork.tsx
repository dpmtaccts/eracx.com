/**
 * SectionTheWork — ▸02 of /v4. Consolidated section that absorbs the
 * earlier §02 (Approach), §02b (What you get), and §03 (What ERA Is/
 * Isn't). The "Run loops, not campaigns" 9-stage grid stays as a
 * separate cobalt §03 (V4HowItWorks) right after this one.
 *
 * Four blocks:
 *   1. Opening claim   — "Don't pitch strangers." headline + lede.
 *   2. FIG.01          — Campaign vs. Loop (parchment card).
 *   3. FIG.02 + FIG.03 — V4WarmthOverTime: animated pentagon with the
 *                        FRVRD translation list below it, side-by-side
 *                        with the panning 90-day timeline. The list
 *                        rows brighten axis-by-axis as the matching
 *                        axis fires on the pentagon.
 *   4. FIG.04          — Cadence: four phases + DETECT…RETAIN line.
 *
 * Magenta section ground only. Inside cards: ink + parchment + one
 * yellow SIGNAL column in FIG.01.
 */

import { V4Header } from './V4Header'
import { V4WarmthOverTime } from './V4WarmthOverTime'

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
            BLOCKS 3 + 4 — FIG.02 pentagon (with FRVRD translation
            list below) side-by-side with FIG.03 panning timeline.
            Single scroll-pinned card from V4WarmthOverTime. The
            pentagon and list animate axis-by-axis on scroll; the
            timeline pans through 90 days of signal events.
            ==================================================== */}
        <V4WarmthOverTime />

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
