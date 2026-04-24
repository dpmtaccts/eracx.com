// InteractionSequence.tsx — Figure 01 of How it works.
// Horizontal 5-touchpoint SVG (Post → Comment → Landing → Email → Meeting)
// drawn on a single cold→warm baseline. Paths and coordinates copied
// verbatim from design/era-v3-staging.html; attributes converted to React
// conventions (className, camelCase dashed attributes where required).

export default function InteractionSequence() {
  return (
    <div className="sequence-wrap">
      <svg className="sequence-svg" viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg">
        <line x1="80" y1="160" x2="1120" y2="160" stroke="var(--cold)" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.55" />
        <text x="80" y="304" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="var(--cold)" fontWeight="700" letterSpacing="1">COLD ►</text>
        <text x="1120" y="304" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="var(--hot)" fontWeight="700" letterSpacing="1">► WARM</text>

        {/* Touchpoint 1 — Post */}
        <g transform="translate(140, 160)">
          <g transform="translate(-14, -92)">
            <rect x="0" y="0" width="28" height="28" fill="var(--text)" />
            <text x="14" y="20" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fontWeight="700" fill="var(--bg)">1</text>
          </g>
          <rect x="-26" y="-36" width="52" height="62" fill="var(--surface)" stroke="var(--cold)" strokeWidth="2" />
          <line x1="-17" y1="-22" x2="17" y2="-22" stroke="var(--cold)" strokeWidth="1.4" />
          <line x1="-17" y1="-10" x2="17" y2="-10" stroke="var(--cold)" strokeWidth="1.4" />
          <line x1="-17" y1="2" x2="17" y2="2" stroke="var(--cold)" strokeWidth="1.4" />
          <line x1="-17" y1="14" x2="8" y2="14" stroke="var(--cold)" strokeWidth="1.4" />
          <g stroke="var(--cold)" strokeWidth="1.1" opacity="0.55" strokeDasharray="2 3">
            <line x1="26" y1="-22" x2="46" y2="-40" />
            <line x1="26" y1="-4" x2="50" y2="-4" />
            <line x1="26" y1="14" x2="46" y2="32" />
          </g>
          <text x="16" y="24" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--cold)" fontWeight="700" opacity="0.75">W1</text>
          <text y="74" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="18" fill="var(--text)" fontWeight="600">Post</text>
          <text y="94" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="var(--text-2)">founder-authored</text>
        </g>

        {/* Touchpoint 2 — Comment */}
        <g transform="translate(380, 160)">
          <g transform="translate(-14, -92)">
            <rect x="0" y="0" width="28" height="28" fill="var(--text)" />
            <text x="14" y="20" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fontWeight="700" fill="var(--bg)">2</text>
          </g>
          <path d="M -32 -28 L 28 -28 Q 34 -28 34 -22 L 34 10 Q 34 16 28 16 L 6 16 L -2 26 L 0 16 L -32 16 Q -38 16 -38 10 L -38 -22 Q -38 -28 -32 -28 Z" fill="var(--surface)" stroke="var(--cold)" strokeWidth="2" />
          <line x1="-28" y1="-16" x2="22" y2="-16" stroke="var(--cold)" strokeWidth="1.4" />
          <line x1="-28" y1="-5" x2="26" y2="-5" stroke="var(--cold)" strokeWidth="1.4" />
          <line x1="-28" y1="6" x2="12" y2="6" stroke="var(--cold)" strokeWidth="1.4" />
          <text x="22" y="24" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--cold)" fontWeight="700" opacity="0.75">W2</text>
          <text y="74" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="18" fill="var(--text)" fontWeight="600">Comment</text>
          <text y="94" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="var(--text-2)">VP Growth, public</text>
        </g>

        {/* Touchpoint 3 — Landing page */}
        <g transform="translate(620, 160)">
          <g transform="translate(-14, -92)">
            <rect x="0" y="0" width="28" height="28" fill="var(--text)" />
            <text x="14" y="20" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fontWeight="700" fill="var(--bg)">3</text>
          </g>
          <rect x="-36" y="-32" width="72" height="56" fill="var(--surface)" stroke="var(--warming)" strokeWidth="2" />
          <rect x="-36" y="-32" width="72" height="11" fill="var(--bg-alt)" stroke="var(--warming)" strokeWidth="1.6" />
          <circle cx="-29" cy="-26.5" r="1.8" fill="var(--accent)" />
          <circle cx="-22" cy="-26.5" r="1.8" fill="var(--warming)" />
          <circle cx="-15" cy="-26.5" r="1.8" fill="var(--mist)" />
          <rect x="-27" y="-14" width="54" height="2.5" fill="var(--warming)" />
          <rect x="-27" y="-6" width="36" height="2.5" fill="var(--warming)" opacity="0.55" />
          <rect x="-27" y="2" width="48" height="2.5" fill="var(--warming)" opacity="0.55" />
          <rect x="-27" y="11" width="28" height="8" fill="var(--accent)" />
          <text x="30" y="24" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--warming)" fontWeight="700" opacity="0.8">W3</text>
          <text y="74" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="18" fill="var(--text)" fontWeight="600">Landing page</text>
          <text y="94" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="var(--text-2)">2 visits · 4m dwell</text>
        </g>

        {/* Touchpoint 4 — Email (parallel) */}
        <g transform="translate(860, 160)">
          <g transform="translate(-14, -92)">
            <rect x="0" y="0" width="28" height="28" fill="var(--text)" />
            <text x="14" y="20" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fontWeight="700" fill="var(--bg)">4</text>
          </g>
          <g transform="translate(10, 5)">
            <rect x="-26" y="-20" width="52" height="36" fill="var(--bg-alt)" stroke="var(--warm)" strokeWidth="1.6" strokeDasharray="4 3" />
            <path d="M -26 -20 L 0 0 L 26 -20" fill="none" stroke="var(--warm)" strokeWidth="1.4" strokeDasharray="4 3" />
          </g>
          <g transform="translate(-10, -10)">
            <rect x="-26" y="-20" width="52" height="36" fill="var(--surface)" stroke="var(--warm)" strokeWidth="2" />
            <path d="M -26 -20 L 0 0 L 26 -20" fill="none" stroke="var(--warm)" strokeWidth="1.6" />
          </g>
          <g transform="translate(22, -30)">
            <circle r="12" fill="var(--warm)" />
            <text y="4" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="var(--bg)">×2</text>
          </g>
          <text x="30" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--warm)" fontWeight="700" opacity="0.8">W4-5</text>
          <text y="74" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="18" fill="var(--text)" fontWeight="600">Email · parallel</text>
          <text y="94" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="var(--text-2)">VP Growth + CRO</text>
        </g>

        {/* Touchpoint 5 — Meeting */}
        <g transform="translate(1080, 160)">
          <g transform="translate(-14, -92)">
            <rect x="0" y="0" width="28" height="28" fill="var(--text)" />
            <text x="14" y="20" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fontWeight="700" fill="var(--bg)">5</text>
          </g>
          <rect x="-32" y="-34" width="64" height="62" fill="var(--surface)" stroke="var(--hot)" strokeWidth="2" />
          <line x1="-32" y1="-20" x2="32" y2="-20" stroke="var(--hot)" strokeWidth="1.4" />
          <g transform="translate(-12, 3)">
            <circle cx="0" cy="-6" r="4" fill="none" stroke="var(--hot)" strokeWidth="1.4" />
            <path d="M -6 8 Q 0 2 6 8" fill="none" stroke="var(--hot)" strokeWidth="1.4" />
          </g>
          <g transform="translate(12, 3)">
            <circle cx="0" cy="-6" r="4" fill="none" stroke="var(--hot)" strokeWidth="1.4" />
            <path d="M -6 8 Q 0 2 6 8" fill="none" stroke="var(--hot)" strokeWidth="1.4" />
          </g>
          <text y="22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--hot)" fontWeight="700">30 MIN</text>
          <circle r="44" fill="none" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="3 4" opacity="0.8" />
          <text y="74" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="18" fill="var(--text)" fontWeight="600">Meeting</text>
          <text y="94" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="13" fill="var(--text-2)">VP Growth + CRO</text>
        </g>
      </svg>
    </div>
  )
}
