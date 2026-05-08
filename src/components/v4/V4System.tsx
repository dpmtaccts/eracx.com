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
            FIG.02 — Warmth Pentagon (FRVRD)
            ============================================================ */}
        <div className="v4-system-card v4-system-card--parchment">
          <div className="v4-system-card__header">
            <span className="v4-system-card__label">FIG.02 / WARMTH SCORING</span>
            <span className="v4-system-card__label">FRVRD</span>
          </div>

          <div className="v4-system-card__pentagon-frame">
            <svg
              className="v4-pentagon"
              viewBox="-50 0 580 440"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="FRVRD pentagon: frequency 92, recency 88, value 90, responsiveness 84, density 86, composite 88"
            >
              {/* Reference pentagons */}
              <polygon
                points="240,40 411,164 346,376 134,376 69,164"
                fill="none"
                stroke="rgba(10,10,10,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="240,130 326,192 293,298 187,298 154,192"
                fill="none"
                stroke="rgba(10,10,10,0.08)"
                strokeWidth="1"
              />
              {/* Account 047 polygon — ink only */}
              <polygon
                points="240,54 397,170 335,358 144,355 95,170"
                fill="rgba(10,10,10,0.12)"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <circle cx="240" cy="54" r="6" fill="#0A0A0A" />
              <circle cx="397" cy="170" r="6" fill="#0A0A0A" />
              <circle cx="335" cy="358" r="6" fill="#0A0A0A" />
              <circle cx="144" cy="355" r="6" fill="#0A0A0A" />
              <circle cx="95" cy="170" r="6" fill="#0A0A0A" />

              <text x="240" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">FREQUENCY</text>
              <text x="240" y="38" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">92</text>

              <text x="430" y="170" textAnchor="start" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">RECENCY</text>
              <text x="430" y="186" textAnchor="start" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">88</text>

              <text x="365" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">VALUE</text>
              <text x="365" y="411" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">90</text>

              <text x="115" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">RESPONSIVENESS</text>
              <text x="115" y="411" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">84</text>

              <text x="50" y="170" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A" fontWeight="700" letterSpacing="0.14em">DENSITY</text>
              <text x="50" y="186" textAnchor="end" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A">86</text>

              <text x="240" y="225" textAnchor="middle" fontFamily="Archivo Black" fontSize="72" fill="#0A0A0A" letterSpacing="-0.04em">88</text>
              <text x="240" y="252" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.5)" fontWeight="700" letterSpacing="0.18em">COMPOSITE</text>
            </svg>
          </div>

          <p className="v4-system-card__footnote">
            FIVE DIMENSIONS. ONE WARMTH SCORE PER ACCOUNT, EVERY DAY.
          </p>
        </div>

        {/* ============================================================
            FIG.03 — Account Timeline (one account, 90 days)
            ============================================================ */}
        <div className="v4-system-card v4-system-card--parchment">
          <div className="v4-system-card__header">
            <span className="v4-system-card__label">FIG.03 / OVER TIME</span>
            <span className="v4-system-card__label">90 DAYS</span>
          </div>

          <div className="v4-chart-svg-wrap">
            <svg
              className="v4-chart-svg"
              viewBox="0 0 1400 720"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Account 047 trajectory across 90 days, rising from cold to warm with discrete signal events"
            >
              {/* Grid lines */}
              <line x1="100" y1="80" x2="1300" y2="80" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="215" x2="1300" y2="215" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="350" x2="1300" y2="350" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="485" x2="1300" y2="485" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="620" x2="1300" y2="620" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" />

              {/* Y-axis labels (warmth score) */}
              <text x="80" y="84" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">100</text>
              <text x="80" y="219" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">75</text>
              <text x="80" y="354" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">50</text>
              <text x="80" y="489" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">25</text>
              <text x="80" y="624" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">0</text>

              {/* X-axis labels (days) */}
              <text x="100" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 0</text>
              <text x="285" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 15</text>
              <text x="469" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 30</text>
              <text x="654" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 45</text>
              <text x="838" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 60</text>
              <text x="1023" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 75</text>
              <text x="1208" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">DAY 90</text>

              {/* Quiet stretch overlay */}
              <rect x="285" y="80" width="92" height="540" fill="rgba(10,10,10,0.04)" />
              <text x="331" y="675" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.14em">QUIET</text>

              {/* Warmth line */}
              <polyline
                points="100,620 192,598 285,555 377,555 469,523 562,501 654,512 746,480 838,415 931,361 1023,318 1115,242 1208,188 1300,145"
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Event markers — all ink */}
              <circle cx="192" cy="598" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="192" y1="591" x2="192" y2="555" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="192" y="540" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">NEWSLETTER</text>
              <text x="192" y="525" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+4</text>

              <circle cx="285" cy="555" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="285" y1="548" x2="285" y2="490" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="285" y="475" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">WEBINAR ATTENDED</text>
              <text x="285" y="460" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+8</text>

              <circle cx="469" cy="523" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="469" y1="516" x2="469" y2="425" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="469" y="410" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">REPORT DOWNLOADED</text>
              <text x="469" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+6</text>

              <circle cx="562" cy="501" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="562" y1="508" x2="562" y2="582" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="562" y="600" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">LINKEDIN COMMENT</text>
              <text x="562" y="615" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+5</text>

              <circle cx="654" cy="512" r="6" fill="rgba(10,10,10,0.5)" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="654" y1="519" x2="654" y2="625" stroke="rgba(10,10,10,0.25)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="654" y="640" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.55)" fontWeight="700" letterSpacing="0.08em">SIGNAL COOLING</text>
              <text x="654" y="655" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.5)" fontWeight="500">−2</text>

              <circle cx="746" cy="480" r="6" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />

              <circle cx="838" cy="415" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="838" y1="408" x2="838" y2="365" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="838" y="350" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">CONFERENCE</text>
              <text x="838" y="335" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+12</text>

              <circle cx="931" cy="361" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="931" y1="368" x2="931" y2="430" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="931" y="448" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">EMAIL REPLY</text>
              <text x="931" y="463" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+8</text>

              <circle cx="1023" cy="318" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="1023" y1="311" x2="1023" y2="270" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="1023" y="255" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">LINKEDIN × 3</text>
              <text x="1023" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+10</text>

              <circle cx="1115" cy="242" r="9" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="1115" y1="251" x2="1115" y2="305" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="1115" y="322" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">REFERRAL INTRO</text>
              <text x="1115" y="337" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+15</text>

              <circle cx="1208" cy="188" r="7" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="1208" y1="195" x2="1208" y2="215" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="1208" y="232" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">MEETING SCHEDULED</text>
              <text x="1208" y="247" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+12</text>

              <circle cx="1300" cy="145" r="10" fill="#0A0A0A" stroke="#F4F1EA" strokeWidth="2" />
              <line x1="1300" y1="135" x2="1300" y2="100" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="1300" y="85" textAnchor="end" fontFamily="Archivo Black" fontSize="14" fill="#0A0A0A" letterSpacing="-0.01em">DEAL MOVING</text>
            </svg>
          </div>

          <p className="v4-system-card__footnote">
            WHAT "WARM" LOOKS LIKE WHEN A SELLER FINALLY SHOWS UP.
          </p>
        </div>
      </div>
    </section>
  )
}
