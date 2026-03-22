import { useEffect, useRef, useState } from "react";

const SIGNALS = [
  // Row 1-2: Connection (#C8A96E)
  "JOB CHANGE", "FUNDING", "HIRING", "TECH INSTALL",
  "WEB INTENT", "EXEC HIRE", "ICP QUIET", "JOB CHANGE",
  // Row 3: Trust (#2BBFAA)
  "DEAL STALL", "CHAMPION", "EMAIL OPEN", "PROPOSAL",
  "CONTENT", "PROPOSAL", "CHAMPION", "EMAIL OPEN",
  // Row 4: Loyalty (#D4367A)
  "90-DAY", "RENEWAL", "TEAM GROWTH", "REFERRAL",
  "LOW ENGAGE", "RENEWAL", "REFERRAL", "90-DAY",
];

const COLORS = [
  // Row 1
  "#C8A96E", "#C8A96E", "#C8A96E", "#C8A96E",
  "#C8A96E", "#C8A96E", "#C8A96E", "#C8A96E",
  // Row 2 (trust)
  "#2BBFAA", "#2BBFAA", "#2BBFAA", "#2BBFAA",
  "#2BBFAA", "#2BBFAA", "#2BBFAA", "#2BBFAA",
  // Row 3 (loyalty)
  "#D4367A", "#D4367A", "#D4367A", "#D4367A",
  "#D4367A", "#D4367A", "#D4367A", "#D4367A",
];

// Varying opacities, no two adjacent the same
const OPACITIES = [
  0.8, 0.5, 1.0, 0.6, 0.9, 0.4, 0.7, 1.0,
  0.6, 1.0, 0.5, 0.8, 0.4, 0.9, 0.7, 0.5,
  1.0, 0.6, 0.8, 0.4, 0.7, 1.0, 0.5, 0.9,
];

// Desktop: 8 cols x 3 rows (24 signals). Mobile: 6 cols x 4 rows (24 signals).
const DESKTOP_COLS = 8;
const DESKTOP_ROWS = 3;
const MOBILE_COLS = 6;
const MOBILE_ROWS = 4;

const D_DOT_SPACING_X = 110;
const D_DOT_SPACING_Y = 44;
const D_LABEL_OFFSET = 14;

const M_DOT_SPACING_X = 56;
const M_DOT_SPACING_Y = 38;
const M_LABEL_OFFSET = 12;

export default function SignalGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const desktopCount = DESKTOP_COLS * DESKTOP_ROWS;
  const mobileCount = MOBILE_COLS * MOBILE_ROWS;

  const dW = (DESKTOP_COLS - 1) * D_DOT_SPACING_X + 80;
  const dH = (DESKTOP_ROWS - 1) * D_DOT_SPACING_Y + 50;
  const dOffX = 40;
  const dOffY = 10;

  const mW = (MOBILE_COLS - 1) * M_DOT_SPACING_X + 40;
  const mH = (MOBILE_ROWS - 1) * M_DOT_SPACING_Y + 44;
  const mOffX = 20;
  const mOffY = 8;

  return (
    <div ref={ref} aria-hidden="true">
      <style>{`
        @keyframes sg-dot-in {
          from { opacity: 0; transform: scale(0); }
          to { opacity: var(--dot-opacity); transform: scale(1); }
        }
        @keyframes sg-label-in {
          from { opacity: 0; }
          to { opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sg-dot, .sg-label { animation: none !important; }
          .sg-dot { opacity: var(--dot-opacity) !important; transform: scale(1) !important; }
          .sg-label { opacity: 0.5 !important; }
        }
      `}</style>

      {/* Desktop: 8x3 */}
      <svg
        viewBox={`0 0 ${dW} ${dH}`}
        className="hidden w-full md:block"
        style={{ height: 160 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: desktopCount }).map((_, i) => {
          const col = i % DESKTOP_COLS;
          const row = Math.floor(i / DESKTOP_COLS);
          const x = dOffX + col * D_DOT_SPACING_X;
          const y = dOffY + row * D_DOT_SPACING_Y;
          const color = COLORS[i % COLORS.length];
          const opacity = OPACITIES[i % OPACITIES.length];
          const label = SIGNALS[i % SIGNALS.length];
          const delay = i * 30;

          return (
            <g key={i}>
              <circle
                className="sg-dot"
                cx={x} cy={y} r={4}
                fill={color}
                style={{
                  opacity: visible ? opacity : 0,
                  transform: visible ? "scale(1)" : "scale(0)",
                  transformOrigin: `${x}px ${y}px`,
                  animation: visible ? `sg-dot-in 0.2s ease-out ${delay}ms forwards` : "none",
                  ["--dot-opacity" as string]: opacity,
                }}
              />
              <text
                className="sg-label"
                x={x} y={y + D_LABEL_OFFSET}
                textAnchor="middle"
                fill="#F5F0E8"
                fontSize="6.5"
                letterSpacing="0.08em"
                style={{
                  opacity: visible ? 0.5 : 0,
                  animation: visible ? `sg-label-in 0.2s ease-out ${delay}ms forwards` : "none",
                }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile: 6x4 */}
      <svg
        viewBox={`0 0 ${mW} ${mH}`}
        className="block w-full md:hidden"
        style={{ height: 140 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: mobileCount }).map((_, i) => {
          const col = i % MOBILE_COLS;
          const row = Math.floor(i / MOBILE_COLS);
          const x = mOffX + col * M_DOT_SPACING_X;
          const y = mOffY + row * M_DOT_SPACING_Y;
          const color = COLORS[i % COLORS.length];
          const opacity = OPACITIES[i % OPACITIES.length];
          const label = SIGNALS[i % SIGNALS.length];
          const delay = i * 30;

          return (
            <g key={i}>
              <circle
                className="sg-dot"
                cx={x} cy={y} r={3}
                fill={color}
                style={{
                  opacity: visible ? opacity : 0,
                  transform: visible ? "scale(1)" : "scale(0)",
                  transformOrigin: `${x}px ${y}px`,
                  animation: visible ? `sg-dot-in 0.2s ease-out ${delay}ms forwards` : "none",
                  ["--dot-opacity" as string]: opacity,
                }}
              />
              <text
                className="sg-label"
                x={x} y={y + M_LABEL_OFFSET}
                textAnchor="middle"
                fill="#F5F0E8"
                fontSize="5"
                letterSpacing="0.06em"
                style={{
                  opacity: visible ? 0.5 : 0,
                  animation: visible ? `sg-label-in 0.2s ease-out ${delay}ms forwards` : "none",
                }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
