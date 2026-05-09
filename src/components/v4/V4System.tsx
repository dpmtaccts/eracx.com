/**
 * V4System — ▸02 of v4 marketing site.
 *
 * Magenta-ground "APPROACH TO GROWTH" section. Tight headline + subhead
 * pair followed by three full-width parchment cards, stacked:
 *   FIG.01  Campaign vs. loop (linear vs. cyclical)
 *   FIG.02  FRVRD warmth pentagon (five dimensions, one score)
 *   FIG.03  Account timeline (one account moving from unknown to known)
 *
 * The visuals carry the explanation. Body copy is intentionally minimal.
 *
 * Color rule inside parchment cards: ink + parchment only, with one
 * yellow column behind SIGNAL in the loop. Magenta only appears as the
 * section ground, never inside a card.
 */

import { V4Header } from './V4Header'
import { V4WarmthOverTime } from './V4WarmthOverTime'

export function V4System() {
  return (
    <section className="v4-section v4-section--system" id="warmth">
      <V4Header
        phase="▸02 · APPROACH TO GROWTH"
        meta={['ACCOUNT 047', 'WARMTH 88', '90 DAY VIEW']}
      />

      <div className="v4-system">
        <div className="v4-approach__header">
          <h2 className="v4-approach__display">
            Don't pitch strangers.<br />Get to know them.
          </h2>
          <p className="v4-approach__subhead">
            We turn cold accounts warm, so your sellers don't have to.
          </p>
        </div>

        {/* ============================================================
            FIG.01 — Campaign vs. Loop (two halves stacked in one card)
            ============================================================ */}
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

            {/* BRAND icon — antenna shortened, broadcast arcs removed so STEP 02 label sits cleanly above */}
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

            {/* CONTENT icon */}
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

            {/* CUSTOMER icon */}
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
            {/* Yellow column highlight (drawn first so it sits behind everything) */}
            <rect x="40" y="84" width="160" height="240" fill="#F4C430" />

            <text x="0" y="40" textAnchor="start" className="v4-card-title">A LOOP</text>
            <text x="160" y="40" textAnchor="start" className="v4-card-footnote">FIG.02 / CYCLICAL</text>
            <line x1="0" y1="64" x2="1280" y2="64" className="v4-section-rule" />

            <text x="120" y="100" textAnchor="middle" className="v4-card-start-marker">▼ STARTS HERE</text>

            <text x="120" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 01</text>
            <text x="500" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 02</text>
            <text x="800" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 03</text>
            <text x="1140" y="140" textAnchor="middle" className="v4-card-step-prefix">STEP 04</text>

            {/* SIGNAL icon */}
            <g transform="translate(120, 220)">
              <rect x="-32" y="32" width="64" height="8" fill="#0A0A0A" />
              <line x1="0" y1="32" x2="0" y2="-12" stroke="#0A0A0A" strokeWidth="3.5" />
              <path d="M -36 -10 A 36 36 0 0 1 36 -10" stroke="#0A0A0A" strokeWidth="3.5" fill="none" />
              <path d="M -24 -10 A 24 24 0 0 1 24 -10" stroke="#0A0A0A" strokeWidth="3" fill="none" />
              <path d="M -12 -10 A 12 12 0 0 1 12 -10" stroke="#0A0A0A" strokeWidth="2.5" fill="none" />
              <circle cx="0" cy="-10" r="3.5" fill="#0A0A0A" />
            </g>

            {/* BRAND icon — antenna shortened, broadcast arcs removed so STEP 02 label sits cleanly above */}
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

            {/* CONTENT icon (slightly smaller variant for the loop) */}
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

            {/* CUSTOMER icon */}
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

            {/* Cycle return path */}
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

        {/* ============================================================
            FIG.02 — Warmth Over Time (pentagon + timeline, animated)
            ============================================================ */}
        <V4WarmthOverTime />

      </div>
    </section>
  )
}
