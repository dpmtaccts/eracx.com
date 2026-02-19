import { useEffect, useRef, useState, useCallback } from "react";

// --- Signal data ---

interface Signal {
  name: string;
  label: string;
  description: string;
  loop: "connection" | "trust" | "loyalty";
}

const CONNECTION_SIGNALS: Signal[] = [
  { name: "Job Change", label: "JOB CHANGE", description: "Contact changes roles. High-intent window, new budget authority.", loop: "connection" },
  { name: "New Executive Hire", label: "EXEC HIRE", description: "New VP joins target account. 90-day window before priorities lock.", loop: "connection" },
  { name: "Funding Event", label: "FUNDING", description: "Series A/B/C closes. Growth mode triggers new infrastructure spend.", loop: "connection" },
  { name: "Hiring Signal", label: "HIRING", description: "Job postings in sales or RevOps. Indicates GTM investment and pain.", loop: "connection" },
  { name: "Tech Install", label: "TECH INSTALL", description: "Target adopts a tool in your category. Active evaluation window.", loop: "connection" },
  { name: "Web Intent", label: "WEB INTENT", description: "Account visits pricing pages. Invisible buying signal.", loop: "connection" },
  { name: "ICP Goes Quiet", label: "GONE QUIET", description: "No touchpoint in 60 days. CRM flags for re-engagement.", loop: "connection" },
];

const TRUST_SIGNALS: Signal[] = [
  { name: "Email Open Pattern", label: "EMAIL OPEN", description: "Repeated opens on specific content. Signals topic relevance.", loop: "trust" },
  { name: "Deal Stall 30 Days", label: "DEAL STALL", description: "Opportunity stagnant 30 days. Triggers stakeholder check-in.", loop: "trust" },
  { name: "Champion Role Change", label: "CHAMPION", description: "Internal advocate changes title. Buying process at risk.", loop: "trust" },
  { name: "Multi-stakeholder Engagement", label: "MULTI-THREAD", description: "Multiple contacts from same account engage simultaneously.", loop: "trust" },
  { name: "Proposal Viewed", label: "PROPOSAL", description: "Deck opened multiple times without reply. Objection signal.", loop: "trust" },
  { name: "Content Download", label: "CONTENT", description: "Specific asset downloaded. Intent mapped to buying stage.", loop: "trust" },
];

const LOYALTY_SIGNALS: Signal[] = [
  { name: "90-Day Post-Close", label: "90-DAY", description: "Standard expansion window. ROI is forming, ask is timely.", loop: "loyalty" },
  { name: "Renewal 90 Days Out", label: "RENEWAL", description: "90 days out. Triggers value review and upsell conversation.", loop: "loyalty" },
  { name: "Team Growth at Account", label: "TEAM GROWTH", description: "Headcount increase signals expanded use case opportunity.", loop: "loyalty" },
  { name: "Customer Job Change", label: "CUST. MOVE", description: "Champion moves to new company. Highest-conversion new logo.", loop: "loyalty" },
  { name: "Low Engagement", label: "LOW ENGAGE", description: "Underutilization detected. Churn risk triggers proactive outreach.", loop: "loyalty" },
  { name: "Referral Trigger", label: "REFERRAL", description: "6-month mark. Structured referral ask activates in the loop.", loop: "loyalty" },
];

const LOOP_COLORS: Record<string, string> = {
  connection: "#C8A96E",
  trust: "#2BBFAA",
  loyalty: "#D4367A",
};

const LOOP_LABELS: Record<string, string> = {
  connection: "CONNECTION LOOP",
  trust: "TRUST LOOP",
  loyalty: "LOYALTY LOOP",
};

// --- Build dots across 200vw field ---

interface Dot {
  row: number;
  col: number;
  signal: Signal;
  // pixel position relative to the 200vw container
  px: number;
  py: number;
}

const ROWS = 3;
const H_SPACING = 80; // px between dots horizontally
const V_SPACING = 80; // px between row centers
const FIELD_H = 280;
const ROW_TOP = (FIELD_H - (ROWS - 1) * V_SPACING) / 2; // center rows

// We compute cols to fill 200vw at build time using a reference width.
// At runtime the SVG scales. We'll use a viewBox approach:
// viewBox width = 200vw equivalent. We pick 2800 (200% of ~1400px reference).
const VB_W = 2800;
const VB_H = FIELD_H;
const COLS_PER_ROW = Math.floor(VB_W / H_SPACING); // ~35
const TOTAL = ROWS * COLS_PER_ROW;

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  // Build interleaved pool
  const pool: Signal[] = [];
  let ci = 0, ti = 0, li = 0;
  for (let i = 0; i < TOTAL; i++) {
    const pick = i % 3;
    if (pick === 0) { pool.push(CONNECTION_SIGNALS[ci % CONNECTION_SIGNALS.length]); ci++; }
    else if (pick === 1) { pool.push(TRUST_SIGNALS[ti % TRUST_SIGNALS.length]); ti++; }
    else { pool.push(LOYALTY_SIGNALS[li % LOYALTY_SIGNALS.length]); li++; }
  }

  for (let i = 0; i < TOTAL; i++) {
    const row = Math.floor(i / COLS_PER_ROW);
    const col = i % COLS_PER_ROW;
    dots.push({
      row,
      col,
      signal: pool[i],
      px: (col + 0.5) * H_SPACING,
      py: ROW_TOP + row * V_SPACING,
    });
  }
  return dots;
}

const DOTS = buildDots();
const BASE_R = 3.5;
const BASE_DOT_OP = 0.4;
const BASE_LABEL_OP = 0.55;

// --- Component ---

export default function SignalDotField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [pulsingIdx, setPulsingIdx] = useState<number | null>(null);
  const pulseTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pulse every 2s
  useEffect(() => {
    if (!visible) return;
    const tick = () => {
      setPulsingIdx(Math.floor(Math.random() * DOTS.length));
      setTimeout(() => setPulsingIdx(null), 900);
    };
    pulseTimer.current = setInterval(tick, 2000);
    return () => { if (pulseTimer.current) clearInterval(pulseTimer.current); };
  }, [visible]);

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * VB_W;
    const vy = ((e.clientY - rect.top) / rect.height) * VB_H;

    let closest = -1;
    let closestDist = Infinity;
    for (let i = 0; i < DOTS.length; i++) {
      const dx = DOTS[i].px - vx;
      const dy = DOTS[i].py - vy;
      const d = dx * dx + dy * dy;
      if (d < closestDist) { closestDist = d; closest = i; }
    }

    // Hit area ~40px in viewBox units (covers 72×50 target)
    if (closestDist < 40 * 40) {
      setHoveredIdx(closest);
      const dot = DOTS[closest];
      setTooltipPos({
        x: rect.left + (dot.px / VB_W) * rect.width,
        y: rect.top + (dot.py / VB_H) * rect.height,
      });
    } else {
      setHoveredIdx(null);
    }
  }, []);

  const handlePointerLeave = useCallback(() => { setHoveredIdx(null); }, []);

  const dist = (i: number, j: number): number => {
    const dx = DOTS[i].px - DOTS[j].px;
    const dy = DOTS[i].py - DOTS[j].py;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getR = (i: number): number => {
    if (hoveredIdx !== null) {
      if (i === hoveredIdx) return 5.5;
      if (dist(i, hoveredIdx) < 120) return 4.5;
      return BASE_R;
    }
    if (pulsingIdx === i) return 5;
    return BASE_R;
  };

  const getDotOp = (i: number): number => {
    if (!visible) return 0;
    if (hoveredIdx !== null) {
      if (i === hoveredIdx) return 1;
      if (dist(i, hoveredIdx) < 120) return 0.65;
      return 0.18;
    }
    if (pulsingIdx === i) return 0.9;
    return BASE_DOT_OP;
  };

  const getLabelOp = (i: number): number => {
    if (!visible) return 0;
    if (hoveredIdx !== null) {
      if (i === hoveredIdx) return 1;
      if (dist(i, hoveredIdx) < 120) return 0.65;
      return 0.18;
    }
    if (pulsingIdx === i) return 0.8;
    return BASE_LABEL_OP;
  };

  const hoveredDot = hoveredIdx !== null ? DOTS[hoveredIdx] : null;

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible"
      style={{
        width: "200vw",
        marginLeft: "-50vw",
        height: FIELD_H,
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes sdf-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sdf-tip-in {
          from { opacity: 0; transform: translate(-50%, -100%) translateY(5px); }
          to { opacity: 1; transform: translate(-50%, -100%) translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sdf-g { animation: none !important; opacity: 1 !important; }
          .sdf-g circle, .sdf-g text { transition: none !important; }
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        style={{ cursor: hoveredIdx !== null ? "crosshair" : "default" }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {DOTS.map((dot, i) => {
          const color = LOOP_COLORS[dot.signal.loop];
          const delay = i * 6;

          return (
            <g
              key={i}
              className="sdf-g"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? `sdf-fade 0.15s ease-out ${delay}ms forwards` : "none",
              }}
            >
              <circle
                cx={dot.px}
                cy={dot.py}
                r={getR(i)}
                fill={color}
                style={{
                  opacity: getDotOp(i),
                  transition: "opacity 0.15s ease-out, r 0.15s ease-out",
                }}
              />
              <text
                x={dot.px}
                y={dot.py + 14}
                textAnchor="middle"
                fill={color}
                fontSize="6.5"
                fontWeight="500"
                letterSpacing="0.08em"
                style={{
                  opacity: getLabelOp(i),
                  transition: "opacity 0.15s ease-out",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {dot.signal.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredDot && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 16,
            transform: "translate(-50%, -100%)",
            animation: "sdf-tip-in 0.12s ease-out",
          }}
        >
          <div
            className="rounded-sm border"
            style={{
              backgroundColor: "#111111",
              borderColor: LOOP_COLORS[hoveredDot.signal.loop],
              padding: "12px 16px",
              width: 220,
            }}
          >
            <p
              className="uppercase tracking-[0.12em]"
              style={{
                color: LOOP_COLORS[hoveredDot.signal.loop],
                fontSize: 9,
                marginBottom: 4,
              }}
            >
              {LOOP_LABELS[hoveredDot.signal.loop]}
            </p>
            <p
              className="font-semibold text-[#F5F0E8]"
              style={{ fontSize: 13, marginBottom: 6 }}
            >
              {hoveredDot.signal.name}
            </p>
            <p
              className="text-[#F5F0E8]/65"
              style={{ fontSize: 11, lineHeight: 1.5 }}
            >
              {hoveredDot.signal.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
