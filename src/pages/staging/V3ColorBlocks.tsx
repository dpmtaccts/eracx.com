import { useRef, useState, useEffect, useCallback } from "react";

/* ─── Google Fonts injection ─── */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400&display=swap";

function useGoogleFont() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);
}

/* ─── Colors ─── */
const C = {
  nearBlack: "#1A1A1A",
  offwhite: "#F6F5F2",
  teal: "#1FA7A2",
  terracotta: "#C4522A",
  magenta: "#E0247A",
  secondary: "#5B6670",
  white: "#FFFFFF",
} as const;

/* ─── Font helper ─── */
const font = (
  weight: 300 | 400 | 600 | 700 | 800 | 900 = 400,
  italic = false
): React.CSSProperties => ({
  fontFamily: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
  fontWeight: weight,
  fontStyle: italic ? "italic" : "normal",
});

/* ─── Data ─── */
interface Stage {
  name: string;
  description: string;
}

interface EngineData {
  key: string;
  headline: string;
  problemQuote: string;
  coreIdea: string;
  stages: Stage[];
  resultMetric: string;
  resultLabel: string;
  resultAttribution: string;
  color: string;
  stageLabels: string[];
}

const engines: EngineData[] = [
  {
    key: "acquisition",
    headline: "Fill the pipeline.",
    problemQuote:
      "\u201CWe\u2019re doing outbound but nothing is converting. What are we missing?\u201D",
    coreIdea:
      "Your buyers are already in-market. You\u2019re just not finding them in time.",
    stages: [
      {
        name: "Detect",
        description:
          "Signal-based targeting matched to ICP. Job changes, funding, hiring surges, tech installs.",
      },
      {
        name: "Enrich",
        description:
          "Every account mapped: buying committee, tech stack, active signals, CRM gaps filled.",
      },
      {
        name: "Reach",
        description:
          "Multi-channel outreach fires automatically. Content, LinkedIn, email, personalized by signal.",
      },
    ],
    resultMetric: "2\u00D7",
    resultLabel: "qualified pipeline in 90 days",
    resultAttribution: "Lara Vandenberg, Founder, Publicist",
    color: C.teal,
    stageLabels: ["Detect", "Enrich", "Reach"],
  },
  {
    key: "engagement",
    headline: "Win the room.",
    problemQuote:
      "\u201CWe had a great first meeting. Then it went silent for six weeks.\u201D",
    coreIdea:
      "The average mid-market deal has 10+ people involved. Your rep is talking to one.",
    stages: [
      {
        name: "Map",
        description:
          "Full buying committee identified. Champions, economic buyers, evaluators, influencers.",
      },
      {
        name: "Nurture",
        description:
          "Behavior-triggered sequences by role and stage. Thought leadership mapped to each stakeholder.",
      },
      {
        name: "Close",
        description:
          "Deal stall detection. Silence re-engagement. Multi-thread presence across the committee.",
      },
    ],
    resultMetric: "250",
    resultLabel: "stakeholders in active system",
    resultAttribution: "Senior Leader, Enterprise Software",
    color: C.terracotta,
    stageLabels: ["Map", "Nurture", "Close"],
  },
  {
    key: "expansion",
    headline: "Grow what you have.",
    problemQuote:
      "\u201COur customers love us but we have no idea when they\u2019re ready to buy more.\u201D",
    coreIdea:
      "Your best new pipeline source is the customers you\u2019ve already closed.",
    stages: [
      {
        name: "Measure",
        description:
          "Post-close signal tracking. Engagement, satisfaction, usage, team growth.",
      },
      {
        name: "Grow",
        description:
          "Cross-sell and upsell triggered by signals, not calendars.",
      },
      {
        name: "Refer",
        description:
          "Structured referral activation at 6 months. Every referral feeds back into acquisition.",
      },
    ],
    resultMetric: "0",
    resultLabel: "cold upsell calls",
    resultAttribution: "Senior Leader, Ecommerce Operator",
    color: C.magenta,
    stageLabels: ["Measure", "Grow", "Refer"],
  },
];

/* ─── Clock geometry constants ─── */
const CLOCK_SIZE = 280;
const CLOCK_CX = CLOCK_SIZE / 2;
const CLOCK_CY = CLOCK_SIZE / 2;
const CLOCK_R = 120;
const CLOCK_INNER_R = 60;

// Segment angles (degrees, 0 = top/12-o'clock, clockwise)
// Teal: 330° to 90° (top-right)
// Terracotta: 90° to 210° (bottom)
// Magenta: 210° to 330° (top-left)
const SEGMENTS = [
  { startDeg: 330, endDeg: 90, color: C.teal, label: "Acquisition", stageLabels: ["Detect", "Enrich", "Reach"] },
  { startDeg: 90, endDeg: 210, color: C.terracotta, label: "Engagement", stageLabels: ["Map", "Nurture", "Close"] },
  { startDeg: 210, endDeg: 330, color: C.magenta, label: "Expansion", stageLabels: ["Measure", "Grow", "Refer"] },
];

/* ─── Scroll-based progress hook ─── */
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollableHeight = el.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));
    setProgress(p);
  }, [ref]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return progress;
}

/* ─── Angle helpers ─── */
function degToRad(deg: number) {
  return ((deg - 90) * Math.PI) / 180; // -90 so 0deg = top
}

function polarToCart(cx: number, cy: number, r: number, deg: number) {
  const rad = degToRad(deg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** Build an SVG arc path for a pie segment */
function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  // Normalize: if end < start, add 360
  let eDeg = endDeg;
  if (eDeg <= startDeg) eDeg += 360;
  const sweep = eDeg - startDeg;
  const largeArc = sweep > 180 ? 1 : 0;
  const s = polarToCart(cx, cy, r, startDeg);
  const e = polarToCart(cx, cy, r, startDeg + sweep);
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y} Z`;
}

/** Build an SVG arc stroke (no fill, just the outer rim) */
function arcStrokePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  let eDeg = endDeg;
  if (eDeg <= startDeg) eDeg += 360;
  const sweep = eDeg - startDeg;
  const largeArc = sweep > 180 ? 1 : 0;
  const s = polarToCart(cx, cy, r, startDeg);
  const e = polarToCart(cx, cy, r, startDeg + sweep);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

/** Convert scroll progress to clock hand angle */
function progressToAngle(progress: number): number {
  // 0-10%: overview, hand at 330 (start of teal)
  // 10-35%: teal zone 330->90 (maps to 330->450 = 330+120)
  // 35-38%: transition
  // 38-62%: terracotta zone 90->210
  // 62-65%: transition
  // 65-88%: magenta zone 210->330
  // 88-100%: loop close 330->330+90 (sweep back into teal)

  if (progress <= 0.10) {
    return 330; // parked at start
  }
  if (progress <= 0.35) {
    // Teal zone: 330 -> 450 (=90)
    const t = (progress - 0.10) / 0.25;
    return 330 + t * 120;
  }
  if (progress <= 0.38) {
    // Transition into terracotta
    const t = (progress - 0.35) / 0.03;
    return 90 + t * 0; // hold at 90
  }
  if (progress <= 0.62) {
    // Terracotta zone: 90 -> 210
    const t = (progress - 0.38) / 0.24;
    return 90 + t * 120;
  }
  if (progress <= 0.65) {
    // Transition into magenta
    return 210;
  }
  if (progress <= 0.88) {
    // Magenta zone: 210 -> 330
    const t = (progress - 0.65) / 0.23;
    return 210 + t * 120;
  }
  // 88-100%: loop close, sweep from 330 past boundary back to ~390 (=30)
  const t = (progress - 0.88) / 0.12;
  return 330 + t * 60; // sweep 60 deg past boundary back into teal
}

/** Determine active engine index from progress */
function getActiveEngine(progress: number): number {
  if (progress < 0.10) return -1; // overview
  if (progress < 0.38) return 0;
  if (progress < 0.65) return 1;
  if (progress < 0.88) return 2;
  return -2; // loop close
}

/** Determine the current stage label */
function getCurrentStageLabel(progress: number): string {
  if (progress <= 0.10) return "";
  // Teal stages
  if (progress <= 0.183) return "Detect";
  if (progress <= 0.267) return "Enrich";
  if (progress <= 0.38) return "Reach";
  // Terracotta stages
  if (progress <= 0.46) return "Map";
  if (progress <= 0.54) return "Nurture";
  if (progress <= 0.65) return "Close";
  // Magenta stages
  if (progress <= 0.727) return "Measure";
  if (progress <= 0.803) return "Grow";
  if (progress <= 0.88) return "Refer";
  return "";
}

/* ─── Flow arrow between segments ─── */
function FlowArrow({ deg, cx, cy, r }: { deg: number; cx: number; cy: number; r: number }) {
  const pos = polarToCart(cx, cy, r + 16, deg);
  const arrowDeg = deg; // Point tangentially clockwise
  return (
    <g transform={`translate(${pos.x}, ${pos.y}) rotate(${arrowDeg})`}>
      <path
        d="M -5 -3 L 2 0 L -5 3"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ─── The Clock SVG ─── */
function ClockSVG({ progress, glowing }: { progress: number; glowing: boolean }) {
  const angle = progressToAngle(progress);
  const normalizedAngle = ((angle % 360) + 360) % 360;
  const activeEngine = getActiveEngine(progress);

  // Hand endpoint
  const handEnd = polarToCart(CLOCK_CX, CLOCK_CY, CLOCK_R - 8, normalizedAngle);
  // Dot on edge
  const dotPos = polarToCart(CLOCK_CX, CLOCK_CY, CLOCK_R + 2, normalizedAngle);

  return (
    <svg
      viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
      width={CLOCK_SIZE}
      height={CLOCK_SIZE}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Glow filter for loop completion */}
        <filter id="clockGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="handGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Optional glow ring on loop completion */}
      {glowing && (
        <circle
          cx={CLOCK_CX}
          cy={CLOCK_CY}
          r={CLOCK_R + 6}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={3}
          filter="url(#clockGlow)"
          style={{
            opacity: glowing ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />
      )}

      {/* Segment fills */}
      {SEGMENTS.map((seg, i) => {
        const isActive = activeEngine === i || activeEngine === -1 || activeEngine === -2;
        const opacity = activeEngine === -1 ? 0.85 : isActive ? 1 : 0.3;
        return (
          <path
            key={seg.label}
            d={arcPath(CLOCK_CX, CLOCK_CY, CLOCK_R, seg.startDeg, seg.endDeg)}
            fill={seg.color}
            opacity={opacity}
            style={{ transition: "opacity 0.5s ease" }}
          />
        );
      })}

      {/* Inner circle cutout for donut look */}
      <circle cx={CLOCK_CX} cy={CLOCK_CY} r={CLOCK_INNER_R} fill={C.nearBlack} />

      {/* Segment border lines */}
      {SEGMENTS.map((seg) => {
        const s = polarToCart(CLOCK_CX, CLOCK_CY, CLOCK_INNER_R, seg.startDeg);
        const e = polarToCart(CLOCK_CX, CLOCK_CY, CLOCK_R, seg.startDeg);
        return (
          <line
            key={`border-${seg.startDeg}`}
            x1={s.x} y1={s.y} x2={e.x} y2={e.y}
            stroke={C.nearBlack}
            strokeWidth={2}
          />
        );
      })}

      {/* Stage labels on the outer rim */}
      {SEGMENTS.map((seg) => {
        let sDeg = seg.startDeg;
        if (seg.endDeg <= sDeg) sDeg = seg.startDeg;
        const span = ((seg.endDeg - seg.startDeg + 360) % 360) || 360;
        return seg.stageLabels.map((label, li) => {
          const labelDeg = sDeg + (span / 3) * (li + 0.5);
          const normalLabel = ((labelDeg % 360) + 360) % 360;
          const pos = polarToCart(CLOCK_CX, CLOCK_CY, CLOCK_R + 14, normalLabel);
          // Determine text-anchor based on position
          const isLeft = pos.x < CLOCK_CX - 20;
          const isRight = pos.x > CLOCK_CX + 20;
          const anchor = isLeft ? "end" : isRight ? "start" : "middle";
          return (
            <text
              key={label}
              x={pos.x}
              y={pos.y}
              textAnchor={anchor}
              dominantBaseline="central"
              fill="rgba(255,255,255,0.5)"
              fontSize={9}
              fontFamily="'Source Sans 3', system-ui, sans-serif"
              fontWeight={400}
              letterSpacing="0.04em"
            >
              {label}
            </text>
          );
        });
      })}

      {/* Segment labels inside the donut */}
      {SEGMENTS.map((seg, i) => {
        const span = ((seg.endDeg - seg.startDeg + 360) % 360) || 360;
        const midDeg = seg.startDeg + span / 2;
        const pos = polarToCart(CLOCK_CX, CLOCK_CY, (CLOCK_R + CLOCK_INNER_R) / 2, midDeg);
        const isActive = activeEngine === i || activeEngine === -1 || activeEngine === -2;
        return (
          <text
            key={`label-${seg.label}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={C.white}
            fontSize={11}
            fontFamily="'Source Sans 3', system-ui, sans-serif"
            fontWeight={700}
            letterSpacing="0.06em"
            opacity={isActive ? 1 : 0.35}
            style={{ transition: "opacity 0.5s ease", textTransform: "uppercase" }}
          >
            {seg.label}
          </text>
        );
      })}

      {/* Flow arrows at segment boundaries */}
      <FlowArrow deg={90} cx={CLOCK_CX} cy={CLOCK_CY} r={CLOCK_R} />
      <FlowArrow deg={210} cx={CLOCK_CX} cy={CLOCK_CY} r={CLOCK_R} />
      <FlowArrow deg={330} cx={CLOCK_CX} cy={CLOCK_CY} r={CLOCK_R} />

      {/* Clock hand */}
      <line
        x1={CLOCK_CX}
        y1={CLOCK_CY}
        x2={handEnd.x}
        y2={handEnd.y}
        stroke={C.white}
        strokeWidth={3}
        strokeLinecap="round"
        filter="url(#handGlow)"
        style={{ transition: "x2 0.08s linear, y2 0.08s linear" }}
      />

      {/* Center dot */}
      <circle cx={CLOCK_CX} cy={CLOCK_CY} r={5} fill={C.white} />

      {/* Edge position dot */}
      <circle
        cx={dotPos.x}
        cy={dotPos.y}
        r={4}
        fill={C.white}
        filter="url(#handGlow)"
        style={{ transition: "cx 0.08s linear, cy 0.08s linear" }}
      />

      {/* Outer rim stroke for definition */}
      <circle
        cx={CLOCK_CX}
        cy={CLOCK_CY}
        r={CLOCK_R}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
      />
    </svg>
  );
}

/* ─── Editorial Engine Section ─── */
function EngineEditorial({
  engine,
  isDark,
}: {
  engine: EngineData;
  isDark: boolean;
}) {
  const bgColor = isDark ? C.nearBlack : C.offwhite;
  const textColor = isDark ? C.white : "#1A1A1A";
  const textSecondary = isDark ? "rgba(255,255,255,0.7)" : "rgba(26,26,26,0.65)";
  const cardBg = isDark ? "#252525" : C.white;
  const cardShadow = isDark
    ? "0 2px 24px rgba(0,0,0,0.4)"
    : "0 2px 24px rgba(0,0,0,0.06)";

  return (
    <div
      style={{
        background: bgColor,
        padding: "100px 64px 120px",
        maxWidth: 1400,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Headline */}
      <h2
        style={{
          ...font(800),
          fontSize: "clamp(48px, 5vw, 72px)",
          lineHeight: 1.05,
          color: textColor,
          margin: 0,
          marginBottom: 48,
          letterSpacing: "-0.025em",
        }}
      >
        {engine.headline}
      </h2>

      {/* Problem pull-quote band */}
      <div
        style={{
          background: `${engine.color}14`,
          borderTop: `1px solid ${engine.color}40`,
          borderBottom: `1px solid ${engine.color}40`,
          padding: "40px 48px",
          marginBottom: 48,
          marginLeft: -64,
          marginRight: -64,
          paddingLeft: 112,
          paddingRight: 112,
          textAlign: "center",
        }}
      >
        <p
          style={{
            ...font(400, true),
            fontSize: 22,
            lineHeight: 1.6,
            color: textColor,
            margin: 0,
            opacity: 0.85,
          }}
        >
          {engine.problemQuote}
        </p>
      </div>

      {/* Core idea */}
      <p
        style={{
          ...font(300),
          fontSize: 16,
          lineHeight: 1.75,
          color: textSecondary,
          margin: 0,
          marginBottom: 64,
          maxWidth: 600,
        }}
      >
        {engine.coreIdea}
      </p>

      {/* Three stage cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          marginBottom: 64,
        }}
      >
        {engine.stages.map((stage, i) => (
          <div
            key={stage.name}
            style={{
              background: cardBg,
              borderRadius: 8,
              padding: "28px 24px",
              borderTop: `4px solid ${engine.color}`,
              boxShadow: cardShadow,
              position: "relative",
            }}
          >
            {/* Sequential number */}
            <span
              style={{
                ...font(700),
                fontSize: 14,
                color: engine.color,
                display: "block",
                marginBottom: 12,
              }}
            >
              {i + 1}
            </span>
            <div
              style={{
                ...font(700),
                fontSize: 18,
                color: textColor,
                marginBottom: 8,
              }}
            >
              {stage.name}
            </div>
            <div
              style={{
                ...font(300),
                fontSize: 14,
                lineHeight: 1.65,
                color: textSecondary,
              }}
            >
              {stage.description}
            </div>
          </div>
        ))}
      </div>

      {/* Client result bar */}
      <div
        style={{
          borderTop: `4px solid ${engine.color}`,
          paddingTop: 28,
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            ...font(700),
            fontSize: 44,
            color: engine.color,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {engine.resultMetric}
        </span>
        <span
          style={{
            ...font(400),
            fontSize: 18,
            color: textColor,
            opacity: 0.8,
          }}
        >
          {engine.resultLabel}
        </span>
        <span
          style={{
            ...font(300),
            fontSize: 14,
            color: textSecondary,
            marginLeft: "auto",
          }}
        >
          {engine.resultAttribution}
        </span>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Page Component — "The Clock"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function V3ColorBlocks() {
  useGoogleFont();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapperRef);

  const activeEngine = getActiveEngine(progress);
  const currentStage = getCurrentStageLabel(progress);
  const isLoopClose = progress >= 0.88;
  const glowing = progress >= 0.92;

  // Determine current engine label and color for the text indicator
  let currentLabel = "The Revenue Cycle";
  let currentColor = C.white;
  if (activeEngine === 0) {
    currentLabel = "Acquisition";
    currentColor = C.teal;
  } else if (activeEngine === 1) {
    currentLabel = "Engagement";
    currentColor = C.terracotta;
  } else if (activeEngine === 2) {
    currentLabel = "Expansion";
    currentColor = C.magenta;
  } else if (activeEngine === -2) {
    currentLabel = "The Loop Closes";
    currentColor = C.white;
  }

  // Determine background for current scroll position
  const getBgForProgress = (p: number) => {
    if (p < 0.10) return C.offwhite; // overview
    if (p < 0.38) return C.offwhite; // engine 1
    if (p < 0.65) return C.nearBlack; // engine 2
    if (p < 0.88) return C.offwhite; // engine 3
    return C.nearBlack; // loop close
  };
  const stickyBg = getBgForProgress(progress);
  const stickyTextDark = stickyBg === C.offwhite;

  return (
    <div
      style={{
        background: C.nearBlack,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .v3clock * { box-sizing: border-box; margin: 0; padding: 0; }
        .v3clock img { max-width: 100%; }

        @media (max-width: 960px) {
          .v3clock .engine-stages-grid {
            grid-template-columns: 1fr !important;
          }
          .v3clock .engine-editorial {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .v3clock .pull-quote-band {
            margin-left: -24px !important;
            margin-right: -24px !important;
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
        }
      `}</style>

      <div className="v3clock" ref={wrapperRef} style={{ height: "500vh", position: "relative" }}>
        {/* ─── Sticky Header with Clock ─── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Clock bar */}
          <div
            style={{
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 48,
              background: C.nearBlack,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
              padding: "0 48px",
              transition: "background 0.6s ease",
            }}
          >
            {/* Clock */}
            <div style={{ flexShrink: 0, transform: "scale(0.44)", transformOrigin: "center center" }}>
              <ClockSVG progress={progress} glowing={glowing} />
            </div>

            {/* Text indicator */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  ...font(300),
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {currentStage ? `Stage: ${currentStage}` : "ERA Revenue System"}
              </div>
              <div
                style={{
                  ...font(700),
                  fontSize: 20,
                  color: currentColor,
                  letterSpacing: "-0.01em",
                  transition: "color 0.4s ease",
                }}
              >
                {currentLabel}
              </div>
            </div>
          </div>

          {/* ─── Content area below the clock bar ─── */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              position: "relative",
              background: stickyBg,
              transition: "background 0.6s ease",
            }}
          >
            {/* Overview content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 64px",
                opacity: progress <= 0.08 ? 1 : 0,
                transform: progress <= 0.08 ? "translateY(0)" : "translateY(-40px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: progress <= 0.08 ? "auto" : "none",
              }}
            >
              <h1
                style={{
                  ...font(900),
                  fontSize: "clamp(56px, 5.5vw, 72px)",
                  lineHeight: 1.05,
                  color: C.nearBlack,
                  textAlign: "center",
                  letterSpacing: "-0.03em",
                  marginBottom: 28,
                }}
              >
                Each system compounds.
              </h1>
              <p
                style={{
                  ...font(400),
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "rgba(26,26,26,0.6)",
                  textAlign: "center",
                  maxWidth: 560,
                }}
              >
                Three engines work in a cycle. Signals from acquisition inform deal
                engagement. Deal signals trigger expansion. Expansion generates referrals
                that feed acquisition. Every cycle makes the next one smarter.
              </p>
              {/* Engine indicators */}
              <div style={{ display: "flex", gap: 24, marginTop: 48 }}>
                {SEGMENTS.map((seg) => (
                  <div
                    key={seg.label}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: seg.color,
                      }}
                    />
                    <span
                      style={{
                        ...font(400),
                        fontSize: 14,
                        color: "rgba(26,26,26,0.5)",
                      }}
                    >
                      {seg.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engine 1: Acquisition (offwhite bg) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflowY: "auto",
                opacity: activeEngine === 0 ? 1 : 0,
                transform: activeEngine === 0 ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: activeEngine === 0 ? "auto" : "none",
                background: C.offwhite,
              }}
            >
              <EngineEditorial engine={engines[0]} isDark={false} />
            </div>

            {/* Engine 2: Engagement (dark bg) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflowY: "auto",
                opacity: activeEngine === 1 ? 1 : 0,
                transform: activeEngine === 1 ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: activeEngine === 1 ? "auto" : "none",
                background: C.nearBlack,
              }}
            >
              <EngineEditorial engine={engines[1]} isDark={true} />
            </div>

            {/* Engine 3: Expansion (offwhite bg) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflowY: "auto",
                opacity: activeEngine === 2 ? 1 : 0,
                transform: activeEngine === 2 ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: activeEngine === 2 ? "auto" : "none",
                background: C.offwhite,
              }}
            >
              <EngineEditorial engine={engines[2]} isDark={false} />
            </div>

            {/* Loop close */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 64px",
                opacity: isLoopClose ? 1 : 0,
                transform: isLoopClose ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                pointerEvents: isLoopClose ? "auto" : "none",
                background: C.nearBlack,
              }}
            >
              <h2
                style={{
                  ...font(900),
                  fontSize: "clamp(40px, 4.5vw, 64px)",
                  lineHeight: 1.1,
                  color: C.white,
                  textAlign: "center",
                  letterSpacing: "-0.025em",
                  marginBottom: 24,
                }}
              >
                Every cycle makes<br />the next one smarter.
              </h2>
              <p
                style={{
                  ...font(300),
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  textAlign: "center",
                  maxWidth: 480,
                }}
              >
                Referrals feed acquisition. Usage data sharpens targeting.
                The system compounds because the loop never stops.
              </p>

              {/* Animated color dots */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 48,
                }}
              >
                {[C.teal, C.terracotta, C.magenta].map((color, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: color,
                      opacity: glowing ? 1 : 0.4,
                      transition: `opacity 0.6s ease ${i * 150}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
