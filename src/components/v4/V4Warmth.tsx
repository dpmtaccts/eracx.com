/**
 * V4Warmth — §02 of v4 marketing site.
 *
 * Magenta-ground section. Two visualizations: static FRVRD pentagon
 * showing dimension breakdown for one anonymized account (Account 047,
 * composite warmth 88), and multi-input timeline chart showing how that
 * account compounded warmth over 14 weeks across 5 channels.
 *
 * Pentagon scores: F=92, R=88, V=90, R=84, D=86 → composite 88
 * Timeline events: 10 distinct signals from Content / Social / Email /
 * Event / Referral channels, with one quiet stretch (W4) and one
 * signal-cooling moment (W7).
 *
 * Synthetic data, clearly labeled. Will swap to real customer data
 * later when available.
 *
 * Pentagon eventually shares rendering with Aux platform's account
 * detail view. Don't extract until that integration is real.
 */

import { V4Header } from './V4Header'

const FRVRD = [
  { letter: 'F', score: 92, label: 'Frequency' },
  { letter: 'R', score: 88, label: 'Recency' },
  { letter: 'V', score: 90, label: 'Value' },
  { letter: 'R', score: 84, label: 'Responsiveness' },
  { letter: 'D', score: 86, label: 'Density' },
]

const STATS = [
  { num: '10', label: 'Distinct signals\nfrom 5 channels' },
  { num: '14', label: 'Weeks from\ncold to warm' },
  { num: '3', label: 'Quiet weeks\nno activity' },
  { num: '88', label: 'Final warmth\nready to close' },
]

export function V4Warmth() {
  return (
    <section className="v4-section v4-section--warmth" id="warmth">
      <V4Header
        phase="§02 · WARMTH / FRVRD"
        meta={['ACCOUNT 047', 'MULTI-INPUT TRAJECTORY', '14 WEEKS']}
      />

      <div className="v4-warmth">
        <div className="v4-warmth__header">
          <h2 className="v4-warmth__display">
            Warmth<br />compounds.
          </h2>
          <p className="v4-warmth__lede">
            Buyers don't move because of one post. They move because{' '}
            <strong>your content stack is doing its job</strong> across many
            channels at once. ERA captures every signal from every source,
            scores them together, and acts when the pattern is real.
          </p>
        </div>

        {/* --------- Pentagon card --------- */}
        <div className="v4-pentagon-card">
          <div className="v4-frvrd-card__heading">
            <p className="v4-frvrd-card__eyebrow">
              FRVRD BREAKDOWN · ACCOUNT 047
            </p>
            <h3 className="v4-frvrd-card__title">
              Relationship growth, not campaign metrics.
            </h3>
            <p className="v4-frvrd-card__subhead">
              5 DIMENSIONS · SCORED DAILY · COMPOSITE 88
            </p>
          </div>

          <svg
            className="v4-pentagon"
            viewBox="-50 0 580 440"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="FRVRD pentagon for Account 047, composite warmth 88"
          >
            {/* Background reference pentagon (full = 100) */}
            <polygon
              points="240,40 411,164 346,376 134,376 69,164"
              fill="none"
              stroke="rgba(10,10,10,0.1)"
              strokeWidth="1"
            />
            {/* Mid reference pentagon (50 line) */}
            <polygon
              points="240,130 326,192 293,298 187,298 154,192"
              fill="none"
              stroke="rgba(10,10,10,0.08)"
              strokeWidth="1"
            />
            {/* Account 047 scored polygon */}
            <polygon
              points="240,54 397,170 335,358 144,355 95,170"
              fill="rgba(230, 25, 95, 0.12)"
              stroke="#E6195F"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Vertex points */}
            <circle cx="240" cy="54" r="6" fill="#E6195F" />
            <circle cx="397" cy="170" r="6" fill="#E6195F" />
            <circle cx="335" cy="358" r="6" fill="#E6195F" />
            <circle cx="144" cy="355" r="6" fill="#E6195F" />
            <circle cx="95" cy="170" r="6" fill="#E6195F" />

            {/* F - top */}
            <text
              x="240" y="22" textAnchor="middle"
              fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A"
              fontWeight="700" letterSpacing="0.14em"
            >FREQUENCY</text>
            <text
              x="240" y="38" textAnchor="middle"
              fontFamily="Archivo Black" fontSize="14" fill="#E6195F"
            >92</text>

            {/* R - top-right */}
            <text
              x="430" y="170" textAnchor="start"
              fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A"
              fontWeight="700" letterSpacing="0.14em"
            >RECENCY</text>
            <text
              x="430" y="186" textAnchor="start"
              fontFamily="Archivo Black" fontSize="14" fill="#E6195F"
            >88</text>

            {/* V - bottom-right */}
            <text
              x="365" y="395" textAnchor="middle"
              fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A"
              fontWeight="700" letterSpacing="0.14em"
            >VALUE</text>
            <text
              x="365" y="411" textAnchor="middle"
              fontFamily="Archivo Black" fontSize="14" fill="#E6195F"
            >90</text>

            {/* R - bottom-left */}
            <text
              x="115" y="395" textAnchor="middle"
              fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A"
              fontWeight="700" letterSpacing="0.14em"
            >RESPONSIVENESS</text>
            <text
              x="115" y="411" textAnchor="middle"
              fontFamily="Archivo Black" fontSize="14" fill="#E6195F"
            >84</text>

            {/* D - top-left */}
            <text
              x="50" y="170" textAnchor="end"
              fontFamily="JetBrains Mono" fontSize="11" fill="#0A0A0A"
              fontWeight="700" letterSpacing="0.14em"
            >DENSITY</text>
            <text
              x="50" y="186" textAnchor="end"
              fontFamily="Archivo Black" fontSize="14" fill="#E6195F"
            >86</text>

            {/* Composite */}
            <text
              x="240" y="225" textAnchor="middle"
              fontFamily="Archivo Black" fontSize="72" fill="#E6195F"
              letterSpacing="-0.04em"
            >88</text>
            <text
              x="240" y="252" textAnchor="middle"
              fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.5)"
              fontWeight="700" letterSpacing="0.18em"
            >COMPOSITE</text>
          </svg>

          <div className="v4-frvrd-breakdown">
            {FRVRD.map(({ letter, score, label }, i) => (
              <div key={i} className="v4-frvrd-cell">
                <div className="v4-frvrd-cell__letter">{letter}</div>
                <div className="v4-frvrd-cell__score">{score}</div>
                <div className="v4-frvrd-cell__label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* --------- Timeline card --------- */}
        <div className="v4-chart-card">
          <div className="v4-chart-card__header">
            <div>
              <div className="v4-chart-card__title">Account 047 · How warmth was earned.</div>
              <div className="v4-chart-card__subtitle">14-week trajectory · 10 distinct signals · 5 channels</div>
            </div>
            <div className="v4-chart-card__final-score">
              <div className="v4-chart-card__final-score-num">88</div>
              <div className="v4-chart-card__final-score-label">FINAL WARMTH SCORE</div>
            </div>
          </div>

          <div className="v4-chart-legend">
            <div className="v4-chart-legend__item">
              <div className="v4-chart-legend__dot v4-chart-legend__dot--content" />
              <span>Content</span>
            </div>
            <div className="v4-chart-legend__item">
              <div className="v4-chart-legend__dot v4-chart-legend__dot--social" />
              <span>Social</span>
            </div>
            <div className="v4-chart-legend__item">
              <div className="v4-chart-legend__dot v4-chart-legend__dot--email" />
              <span>Email</span>
            </div>
            <div className="v4-chart-legend__item">
              <div className="v4-chart-legend__dot v4-chart-legend__dot--event" />
              <span>Event</span>
            </div>
            <div className="v4-chart-legend__item">
              <div className="v4-chart-legend__dot v4-chart-legend__dot--referral" />
              <span>Referral</span>
            </div>
          </div>

          <div className="v4-chart-scroll-hint">scroll →</div>

          <div className="v4-chart-svg-wrap">
            <svg
              className="v4-chart-svg"
              viewBox="0 0 1400 720"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="14-week multi-input warmth trajectory for Account 047"
            >
              {/* Grid lines */}
              <line x1="100" y1="80" x2="1300" y2="80" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="215" x2="1300" y2="215" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="350" x2="1300" y2="350" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="485" x2="1300" y2="485" stroke="rgba(10,10,10,0.1)" strokeWidth="1" />
              <line x1="100" y1="620" x2="1300" y2="620" stroke="rgba(10,10,10,0.4)" strokeWidth="1.5" />

              {/* Y-axis labels */}
              <text x="80" y="84" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">100</text>
              <text x="80" y="219" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">75</text>
              <text x="80" y="354" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">50</text>
              <text x="80" y="489" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">25</text>
              <text x="80" y="624" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(10,10,10,0.5)" fontWeight="600">0</text>

              {/* X-axis labels */}
              <text x="100" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">W1</text>
              <text x="285" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">W3</text>
              <text x="469" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">W5</text>
              <text x="654" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">W7</text>
              <text x="838" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">W9</text>
              <text x="1023" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">W11</text>
              <text x="1208" y="650" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.4)" fontWeight="600" letterSpacing="0.12em">W13</text>

              {/* Quiet stretch */}
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

              {/* W2 Newsletter */}
              <circle cx="192" cy="598" r="7" fill="#1845C2" stroke="white" strokeWidth="2" />
              <line x1="192" y1="591" x2="192" y2="555" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="192" y="540" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">NEWSLETTER</text>
              <text x="192" y="525" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+4</text>

              {/* W3 Webinar */}
              <circle cx="285" cy="555" r="7" fill="#B8860B" stroke="white" strokeWidth="2" />
              <line x1="285" y1="548" x2="285" y2="490" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="285" y="475" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">WEBINAR ATTENDED</text>
              <text x="285" y="460" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+8</text>

              {/* W5 Report */}
              <circle cx="469" cy="523" r="7" fill="#1845C2" stroke="white" strokeWidth="2" />
              <line x1="469" y1="516" x2="469" y2="425" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="469" y="410" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">REPORT DOWNLOADED</text>
              <text x="469" y="395" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+6</text>

              {/* W6 LinkedIn comment */}
              <circle cx="562" cy="501" r="7" fill="#E6195F" stroke="white" strokeWidth="2" />
              <line x1="562" y1="508" x2="562" y2="582" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="562" y="600" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">LINKEDIN COMMENT</text>
              <text x="562" y="615" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+5</text>

              {/* W7 Signal cooling */}
              <circle cx="654" cy="512" r="6" fill="#999" stroke="white" strokeWidth="2" />
              <line x1="654" y1="519" x2="654" y2="582" stroke="rgba(10,10,10,0.25)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="654" y="600" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(10,10,10,0.55)" fontWeight="700" letterSpacing="0.08em">SIGNAL COOLING</text>
              <text x="654" y="615" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.5)" fontWeight="500">−2</text>

              {/* W8 Newsletter (small) */}
              <circle cx="746" cy="480" r="6" fill="#1845C2" stroke="white" strokeWidth="2" />

              {/* W9 Conference */}
              <circle cx="838" cy="415" r="7" fill="#B8860B" stroke="white" strokeWidth="2" />
              <line x1="838" y1="408" x2="838" y2="365" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="838" y="350" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">CONFERENCE</text>
              <text x="838" y="335" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+12</text>

              {/* W10 Email reply */}
              <circle cx="931" cy="361" r="7" fill="#DD5C20" stroke="white" strokeWidth="2" />
              <line x1="931" y1="368" x2="931" y2="430" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="931" y="448" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">EMAIL REPLY</text>
              <text x="931" y="463" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+8</text>

              {/* W11 LinkedIn x3 */}
              <circle cx="1023" cy="318" r="7" fill="#E6195F" stroke="white" strokeWidth="2" />
              <line x1="1023" y1="311" x2="1023" y2="270" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="1023" y="255" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">LINKEDIN × 3</text>
              <text x="1023" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+10</text>

              {/* W12 Referral */}
              <circle cx="1115" cy="242" r="9" fill="#1F7A3D" stroke="white" strokeWidth="2" />
              <line x1="1115" y1="251" x2="1115" y2="305" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="1115" y="322" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">REFERRAL INTRO</text>
              <text x="1115" y="337" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+15</text>

              {/* W13 Meeting */}
              <circle cx="1208" cy="188" r="7" fill="#0A0A0A" stroke="white" strokeWidth="2" />
              <line x1="1208" y1="181" x2="1208" y2="120" stroke="rgba(10,10,10,0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="1208" y="105" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#0A0A0A" fontWeight="700" letterSpacing="0.08em">MEETING SCHEDULED</text>
              <text x="1208" y="90" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(10,10,10,0.6)" fontWeight="500">+12</text>

              {/* W14 Terminus */}
              <circle cx="1300" cy="145" r="10" fill="#E6195F" stroke="#0A0A0A" strokeWidth="2" />
              <line x1="1300" y1="135" x2="1300" y2="100" stroke="#E6195F" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="1300" y="85" textAnchor="end" fontFamily="Archivo Black" fontSize="14" fill="#E6195F" letterSpacing="-0.01em">DEAL MOVING</text>
            </svg>
          </div>

          <div className="v4-chart-card__caption">
            <div className="v4-chart-card__caption-text">
              One real-world account, anonymized. Started cold. Earned warmth across newsletters, webinars, downloaded reports, LinkedIn engagement, a conference touchpoint, and a referral. Some weeks were quiet. Some signals cooled. The line still bent toward warm because the inputs compounded.
            </div>
            <div className="v4-chart-card__caption-tag">
              SAMPLE TRAJECTORY<br />SYNTHETIC DATA
            </div>
          </div>
        </div>

        {/* --------- Stat band --------- */}
        <div className="v4-warmth-stats">
          {STATS.map(({ num, label }) => {
            const [line1, line2] = label.split('\n')
            return (
              <div key={num} className="v4-warmth-stat">
                <div className="v4-warmth-stat__num">{num}</div>
                <div className="v4-warmth-stat__label">
                  {line1.toUpperCase()}<br />{line2.toUpperCase()}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
