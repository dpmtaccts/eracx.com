import { useRef, useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

interface Stage {
  name: string;
  description: string;
}

interface EngineData {
  key: string;
  number: string;
  label: string;
  color: string;
  headline: string;
  problemQuote: string;
  coreIdea: string;
  stages: Stage[];
  resultMetric: string;
  resultAttribution: string;
  /** Angle in degrees for "home" position on the orbit (0 = 3 o'clock) */
  homeAngle: number;
}

const ENGINES: EngineData[] = [
  {
    key: "acquisition",
    number: "01",
    label: "ACQUISITION",
    color: "#1FA7A2",
    headline: "Fill the pipeline.",
    problemQuote:
      "\u201CWe\u2019re doing outbound but nothing is converting. What are we missing?\u201D",
    coreIdea:
      "Your buyers are already in-market. You\u2019re just not finding them in time. Era captures signals and turns them into targeted outreach before a competitor gets the first meeting.",
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
    resultMetric: "2\u00D7 qualified pipeline in 90 days",
    resultAttribution: "Lara Vandenberg, Founder, Publicist",
    homeAngle: 0,
  },
  {
    key: "engagement",
    number: "02",
    label: "ENGAGEMENT",
    color: "#C4522A",
    headline: "Win the room.",
    problemQuote:
      "\u201CWe had a great first meeting. Then it went silent for six weeks.\u201D",
    coreIdea:
      "The average mid-market deal has 10+ people involved. Your rep is talking to one. Era builds presence across the full buying committee so deals don\u2019t die in committee.",
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
    resultMetric: "250 stakeholders in active system",
    resultAttribution: "Senior Leader, Enterprise Software",
    homeAngle: 120,
  },
  {
    key: "expansion",
    number: "03",
    label: "EXPANSION",
    color: "#E0247A",
    headline: "Grow what you have.",
    problemQuote:
      "\u201COur customers love us but we have no idea when they\u2019re ready to buy more.\u201D",
    coreIdea:
      "Your best new pipeline source is the customers you\u2019ve already closed. Era tracks post-close signals and converts them into expansion conversations, referrals, and renewals automatically.",
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
    resultMetric: "0 cold upsell calls",
    resultAttribution: "Senior Leader, Ecommerce Operator",
    homeAngle: 240,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   COLORS & CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const BG = "#F6F5F2";
const CHARCOAL = "#383838";
const NEAR_BLACK = "#1A1A1A";
const SECONDARY = "#5B6670";
const DIVIDER = "#D7DADD";

const ORBIT_VIEWBOX = 500;
const ORBIT_CX = ORBIT_VIEWBOX / 2;
const ORBIT_CY = ORBIT_VIEWBOX / 2;
const ORBIT_R = 190;
const MARKER_R = 12;
const SPOTLIGHT_ANGLE = 0; // 3 o'clock = 0 degrees

/* ═══════════════════════════════════════════════════════════════════════════
   GEOMETRY HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Convert polar (degrees, 0 = 3 o'clock, CW) to cartesian SVG coords */
function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** Normalize angle to 0..360 */
function normAngle(a: number) {
  return ((a % 360) + 360) % 360;
}

/** Lerp between two angles on a circle (shortest path) */
function lerpAngle(from: number, to: number, t: number) {
  let diff = normAngle(to - from);
  if (diff > 180) diff -= 360;
  return normAngle(from + diff * t);
}

/** Generate a small arrowhead path pointing along the orbit at a given angle */
function arrowOnOrbit(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
  size: number,
) {
  // tangent direction (clockwise)
  const tangentRad = (angleDeg * Math.PI) / 180 + Math.PI / 2;
  const pos = polarToXY(cx, cy, r, angleDeg);
  const tipX = pos.x + Math.cos(tangentRad) * size;
  const tipY = pos.y + Math.sin(tangentRad) * size;
  const leftRad = tangentRad + Math.PI + 0.5;
  const rightRad = tangentRad + Math.PI - 0.5;
  const lx = tipX + Math.cos(leftRad) * size * 0.7;
  const ly = tipY + Math.sin(leftRad) * size * 0.7;
  const rx = tipX + Math.cos(rightRad) * size * 0.7;
  const ry = tipY + Math.sin(rightRad) * size * 0.7;
  return `M${lx},${ly} L${tipX},${tipY} L${rx},${ry}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL PHASE CALCULATION
   ═══════════════════════════════════════════════════════════════════════════ */

interface ScrollPhase {
  phase:
    | "overview"
    | "transition-to-acq"
    | "acquisition"
    | "transition-to-eng"
    | "engagement"
    | "transition-to-exp"
    | "expansion"
    | "loop-close";
  /** 0..1 progress within this phase */
  t: number;
  /** Which engine is in spotlight (-1 = none) */
  spotlightIdx: number;
}

function getScrollPhase(p: number): ScrollPhase {
  if (p < 0.08) return { phase: "overview", t: p / 0.08, spotlightIdx: -1 };
  if (p < 0.15)
    return {
      phase: "transition-to-acq",
      t: (p - 0.08) / 0.07,
      spotlightIdx: 0,
    };
  if (p < 0.35)
    return { phase: "acquisition", t: (p - 0.15) / 0.2, spotlightIdx: 0 };
  if (p < 0.42)
    return {
      phase: "transition-to-eng",
      t: (p - 0.35) / 0.07,
      spotlightIdx: 1,
    };
  if (p < 0.62)
    return { phase: "engagement", t: (p - 0.42) / 0.2, spotlightIdx: 1 };
  if (p < 0.69)
    return {
      phase: "transition-to-exp",
      t: (p - 0.62) / 0.07,
      spotlightIdx: 2,
    };
  if (p < 0.89)
    return { phase: "expansion", t: (p - 0.69) / 0.2, spotlightIdx: 2 };
  return { phase: "loop-close", t: (p - 0.89) / 0.11, spotlightIdx: -1 };
}

/* ═══════════════════════════════════════════════════════════════════════════
   MARKER ANGLE CALCULATION
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Return the current angles of the 3 markers based on scroll phase.
 * The "spotlight zone" is angle 0 (3 o'clock).
 * When an engine is spotlighted, its marker sits at angle 0.
 * Others are offset by their relative positions (120 apart).
 */
function getMarkerAngles(phase: ScrollPhase): [number, number, number] {
  const home: [number, number, number] = [0, 120, 240];

  if (phase.phase === "overview") {
    return home;
  }

  // Target angles when each engine is at spotlight (angle 0)
  // Engine 0 at 0: [0, 120, 240]
  // Engine 1 at 0: [240, 0, 120]  (rotate -120)
  // Engine 2 at 0: [120, 240, 0]  (rotate -240)
  const targets: [number, number, number][] = [
    [0, 120, 240],
    [240, 0, 120],
    [120, 240, 0],
  ];

  if (phase.phase === "transition-to-acq") {
    // From home to engine 0 in spotlight (same positions)
    return home.map((h, i) =>
      lerpAngle(h, targets[0][i], easeInOut(phase.t)),
    ) as [number, number, number];
  }

  if (phase.phase === "acquisition") {
    return targets[0];
  }

  if (phase.phase === "transition-to-eng") {
    return targets[0].map((from, i) =>
      lerpAngle(from, targets[1][i], easeInOut(phase.t)),
    ) as [number, number, number];
  }

  if (phase.phase === "engagement") {
    return targets[1];
  }

  if (phase.phase === "transition-to-exp") {
    return targets[1].map((from, i) =>
      lerpAngle(from, targets[2][i], easeInOut(phase.t)),
    ) as [number, number, number];
  }

  if (phase.phase === "expansion") {
    return targets[2];
  }

  // loop-close: rotate from expansion target back toward home (full loop)
  return targets[2].map((from, i) =>
    lerpAngle(from, home[i], easeInOut(Math.min(1, phase.t * 1.5))),
  ) as [number, number, number];
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL CONTENT PANEL
   ═══════════════════════════════════════════════════════════════════════════ */

function EngineContent({
  engine,
  opacity,
}: {
  engine: EngineData;
  opacity: number;
}) {
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * 40}px)`,
        pointerEvents: opacity < 0.1 ? "none" : "auto",
        position: "relative",
      }}
    >
      {/* Watermark number */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -20,
          fontSize: 160,
          fontWeight: 900,
          color: engine.color,
          opacity: 0.06,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}
      >
        {engine.number}
      </div>

      {/* Eyebrow */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: engine.color,
          marginBottom: 20,
        }}
      >
        {engine.label}
      </div>

      {/* Headline */}
      <h2
        style={{
          fontSize: "clamp(42px, 4vw, 56px)",
          fontWeight: 800,
          color: CHARCOAL,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          margin: "0 0 32px 0",
        }}
      >
        {engine.headline}
      </h2>

      {/* Problem quote */}
      <blockquote
        style={{
          fontSize: 18,
          fontStyle: "italic",
          color: SECONDARY,
          lineHeight: 1.6,
          margin: "0 0 28px 0",
          paddingLeft: 20,
          borderLeft: `2px solid ${engine.color}`,
        }}
      >
        {engine.problemQuote}
      </blockquote>

      {/* Body / core idea */}
      <p
        style={{
          fontSize: 16,
          fontWeight: 300,
          color: SECONDARY,
          lineHeight: 1.7,
          margin: "0 0 40px 0",
          maxWidth: 480,
        }}
      >
        {engine.coreIdea}
      </p>

      {/* Stages as stacked list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginBottom: 44,
        }}
      >
        {engine.stages.map((stage) => (
          <div
            key={stage.name}
            style={{
              paddingLeft: 16,
              borderLeft: `4px solid ${engine.color}`,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: NEAR_BLACK,
                marginBottom: 4,
              }}
            >
              {stage.name}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: SECONDARY,
                lineHeight: 1.6,
              }}
            >
              {stage.description}
            </div>
          </div>
        ))}
      </div>

      {/* Client result */}
      <div
        style={{
          borderTop: `1px solid ${DIVIDER}`,
          paddingTop: 24,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: engine.color,
            lineHeight: 1.2,
            marginBottom: 6,
            letterSpacing: "-0.02em",
          }}
        >
          {engine.resultMetric}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: SECONDARY,
          }}
        >
          {"\u2014 "}
          {engine.resultAttribution}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ORBIT SVG
   ═══════════════════════════════════════════════════════════════════════════ */

function OrbitSVG({
  markerAngles,
  phase,
  loopPulseT,
}: {
  markerAngles: [number, number, number];
  phase: ScrollPhase;
  loopPulseT: number;
}) {
  const isOverview = phase.phase === "overview";
  const isLoopClose = phase.phase === "loop-close";

  // Flow arrow positions (midpoints between markers, on the track)
  const arrowAngles = [60, 180, 300];

  // Loop-close glow: a dot traveling from Expansion (240 home) back around to Acquisition (0)
  const glowAngle = isLoopClose ? normAngle(240 + loopPulseT * 480) : 0;
  const glowPos = polarToXY(ORBIT_CX, ORBIT_CY, ORBIT_R, glowAngle);

  return (
    <svg
      viewBox={`0 0 ${ORBIT_VIEWBOX} ${ORBIT_VIEWBOX}`}
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        {/* Glow filter for the loop-close pulse */}
        <filter id="orbit-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Larger glow for loop close */}
        <filter
          id="orbit-glow-lg"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradient for the loop-close trail */}
        <linearGradient id="loop-trail-grad">
          <stop offset="0%" stopColor="#E0247A" stopOpacity="0" />
          <stop offset="60%" stopColor="#E0247A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1FA7A2" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* The orbit track line */}
      <circle
        cx={ORBIT_CX}
        cy={ORBIT_CY}
        r={ORBIT_R}
        fill="none"
        stroke={DIVIDER}
        strokeWidth={2}
        style={{
          opacity: isLoopClose ? 0.5 + loopPulseT * 0.5 : 1,
        }}
      />

      {/* During loop-close: illuminated track */}
      {isLoopClose && loopPulseT > 0 && (
        <circle
          cx={ORBIT_CX}
          cy={ORBIT_CY}
          r={ORBIT_R}
          fill="none"
          stroke="url(#loop-trail-grad)"
          strokeWidth={3}
          strokeDasharray={`${loopPulseT * 1200} 1200`}
          strokeDashoffset={0}
          style={{ opacity: Math.min(1, loopPulseT * 2) }}
          transform={`rotate(${240 - 90} ${ORBIT_CX} ${ORBIT_CY})`}
        />
      )}

      {/* Clockwise flow arrows (small chevrons on the track) */}
      {arrowAngles.map((angle, i) => (
        <path
          key={i}
          d={arrowOnOrbit(ORBIT_CX, ORBIT_CY, ORBIT_R, angle, 8)}
          fill="none"
          stroke={DIVIDER}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: isOverview ? 0.6 : 0.3 }}
        />
      ))}

      {/* Markers */}
      {ENGINES.map((eng, i) => {
        const pos = polarToXY(
          ORBIT_CX,
          ORBIT_CY,
          ORBIT_R,
          markerAngles[i],
        );
        const isSpotlit = phase.spotlightIdx === i;
        const markerSize = isSpotlit ? MARKER_R + 2 : MARKER_R;

        return (
          <g key={eng.key}>
            {/* Glow behind spotlit marker */}
            {isSpotlit && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={markerSize + 6}
                fill={eng.color}
                opacity={0.15}
                filter="url(#orbit-glow)"
              />
            )}
            {/* Marker dot */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={markerSize}
              fill={eng.color}
              style={{
                filter: isSpotlit ? "url(#orbit-glow)" : "none",
              }}
            />
            {/* Label near marker */}
            <LabelOnOrbit
              cx={ORBIT_CX}
              cy={ORBIT_CY}
              r={ORBIT_R}
              angle={markerAngles[i]}
              label={eng.label}
              color={isSpotlit ? eng.color : SECONDARY}
              bold={isSpotlit}
            />
          </g>
        );
      })}

      {/* Loop-close glowing dot */}
      {isLoopClose && loopPulseT > 0.05 && (
        <circle
          cx={glowPos.x}
          cy={glowPos.y}
          r={6}
          fill="#E8FF47"
          filter="url(#orbit-glow-lg)"
          style={{ opacity: Math.min(1, loopPulseT * 3) * (loopPulseT < 0.9 ? 1 : 1 - (loopPulseT - 0.9) * 10) }}
        />
      )}

      {/* Loop-close: "Refer -> Detect" label */}
      {isLoopClose && loopPulseT > 0.4 && (
        <text
          x={ORBIT_CX}
          y={ORBIT_CY - ORBIT_R - 28}
          textAnchor="middle"
          fill={SECONDARY}
          fontSize={11}
          fontWeight={600}
          letterSpacing="0.15em"
          style={{
            opacity: Math.min(1, (loopPulseT - 0.4) * 3),
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            textTransform: "uppercase" as never,
          }}
        >
          REFER {"\u2192"} DETECT
        </text>
      )}
    </svg>
  );
}

/** Small label positioned outside the orbit near a marker */
function LabelOnOrbit({
  cx,
  cy,
  r,
  angle,
  label,
  color,
  bold,
}: {
  cx: number;
  cy: number;
  r: number;
  angle: number;
  label: string;
  color: string;
  bold: boolean;
}) {
  const labelR = r + 30;
  const pos = polarToXY(cx, cy, labelR, angle);
  // Determine text-anchor based on position
  const normA = normAngle(angle);
  let anchor: "start" | "middle" | "end" = "middle";
  if (normA > 30 && normA < 150) anchor = "start";
  else if (normA > 210 && normA < 330) anchor = "end";

  return (
    <text
      x={pos.x}
      y={pos.y}
      textAnchor={anchor}
      dominantBaseline="central"
      fill={color}
      fontSize={10}
      fontWeight={bold ? 700 : 500}
      letterSpacing="0.15em"
      style={{
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
      }}
    >
      {label}
    </text>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function V1RingZoom() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>(0);

  // -- Google Fonts --
  useEffect(() => {
    const linkId = "source-sans-3-font";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // -- Scroll handler with rAF --
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperTop = -rect.top;
      const totalScroll =
        wrapperRef.current.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const raw = Math.max(0, Math.min(1, wrapperTop / totalScroll));
      setScrollProgress(raw);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // -- Derived values --
  const phase = getScrollPhase(scrollProgress);
  const markerAngles = getMarkerAngles(phase);

  const isOverview = phase.phase === "overview";
  const isLoopClose = phase.phase === "loop-close";
  const isSpotlight =
    phase.phase === "acquisition" ||
    phase.phase === "engagement" ||
    phase.phase === "expansion";
  const isTransition =
    phase.phase === "transition-to-acq" ||
    phase.phase === "transition-to-eng" ||
    phase.phase === "transition-to-exp";

  // Content opacity for the right editorial panel
  let contentOpacity = 0;
  if (isSpotlight) {
    // Fade in at start, fade out at end
    contentOpacity =
      phase.t < 0.08
        ? phase.t / 0.08
        : phase.t > 0.88
          ? (1 - phase.t) / 0.12
          : 1;
  } else if (isTransition) {
    // During transitions, fade out old and start fading in new
    contentOpacity = phase.t > 0.5 ? (phase.t - 0.5) * 2 * 0.3 : 0;
  }

  // Overview text opacity
  const overviewOpacity = isOverview ? 1 : 0;
  const overviewTextFade =
    phase.phase === "transition-to-acq" ? 1 - easeInOut(phase.t) : isOverview ? 1 : 0;

  // Loop close text
  const loopCloseOpacity = isLoopClose ? Math.min(1, phase.t * 2) : 0;

  const spotlightEngine =
    phase.spotlightIdx >= 0 ? ENGINES[phase.spotlightIdx] : null;

  return (
    <div
      ref={wrapperRef}
      style={{
        height: "500vh",
        fontFamily: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: BG,
          display: "flex",
        }}
      >
        {/* ── LEFT 1/3: Orbit ── */}
        <div
          style={{
            flex: "0 0 33.333%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 32,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              aspectRatio: "1 / 1",
              position: "relative",
            }}
          >
            <OrbitSVG
              markerAngles={markerAngles}
              phase={phase}
              loopPulseT={isLoopClose ? phase.t : 0}
            />

            {/* Center text in orbit */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
                width: "60%",
              }}
            >
              {/* Overview center text */}
              <div
                style={{
                  opacity: overviewTextFade,
                  transform: `scale(${0.9 + overviewTextFade * 0.1})`,
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 22px)",
                    fontWeight: 700,
                    color: NEAR_BLACK,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  One loop.
                  <br />
                  Three engines.
                </div>
              </div>

              {/* Loop-close center text */}
              {isLoopClose && (
                <div
                  style={{
                    opacity: loopCloseOpacity,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(13px, 1.1vw, 17px)",
                      fontWeight: 600,
                      color: NEAR_BLACK,
                      lineHeight: 1.4,
                    }}
                  >
                    Every cycle makes
                    <br />
                    the next one smarter.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Vertical divider ── */}
        <div
          style={{
            width: 1,
            background: DIVIDER,
            opacity: isOverview ? 0.3 : 0.6,
            alignSelf: "center",
            height: "60%",
          }}
        />

        {/* ── RIGHT 2/3: Content ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "80px clamp(48px, 5vw, 100px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Overview right content */}
          <div
            style={{
              opacity: overviewTextFade,
              transform: `translateY(${(1 - overviewTextFade) * 30}px)`,
              position: "absolute",
              maxWidth: 560,
              pointerEvents: isOverview ? "auto" : "none",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: SECONDARY,
                marginBottom: 24,
              }}
            >
              THE ERA SYSTEM
            </div>
            <h1
              style={{
                fontSize: "clamp(36px, 3.5vw, 52px)",
                fontWeight: 800,
                color: CHARCOAL,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                margin: "0 0 28px 0",
              }}
            >
              Three engines.
              <br />
              One system.
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 1.2vw, 19px)",
                lineHeight: 1.7,
                color: SECONDARY,
                fontWeight: 300,
                maxWidth: 480,
                margin: 0,
              }}
            >
              Signals from acquisition inform deal engagement. Deal signals
              trigger expansion. Expansion generates referrals that feed
              acquisition. Every cycle makes the next one smarter.
            </p>
          </div>

          {/* Engine editorial panels — render all three, control visibility via opacity */}
          {ENGINES.map((eng, i) => {
            let thisOpacity = 0;
            if (phase.spotlightIdx === i) {
              thisOpacity = contentOpacity;
            }
            return (
              <div
                key={eng.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  padding: "80px clamp(48px, 5vw, 100px)",
                  pointerEvents: thisOpacity < 0.1 ? "none" : "auto",
                }}
              >
                <div style={{ maxWidth: 540, width: "100%" }}>
                  <EngineContent engine={eng} opacity={thisOpacity} />
                </div>
              </div>
            );
          })}

          {/* Loop-close right content */}
          {isLoopClose && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "80px clamp(48px, 5vw, 100px)",
                opacity: phase.t > 0.3 ? Math.min(1, (phase.t - 0.3) * 2.5) : 0,
                pointerEvents: "none",
              }}
            >
              <div style={{ textAlign: "center", maxWidth: 500 }}>
                <div
                  style={{
                    fontSize: "clamp(32px, 3vw, 44px)",
                    fontWeight: 800,
                    color: CHARCOAL,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    marginBottom: 20,
                  }}
                >
                  The loop never stops.
                </div>
                <p
                  style={{
                    fontSize: 17,
                    fontWeight: 300,
                    color: SECONDARY,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Every referral feeds a new signal. Every signal starts
                  another cycle. Compounding, not campaigning.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Progress indicator (right edge) ── */}
        <div
          style={{
            position: "absolute",
            right: 28,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            zIndex: 20,
          }}
        >
          {/* Overview dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isOverview ? NEAR_BLACK : DIVIDER,
            }}
          />
          {ENGINES.map((eng, i) => (
            <div
              key={eng.key}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: phase.spotlightIdx === i ? eng.color : DIVIDER,
              }}
            />
          ))}
          {/* Loop dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isLoopClose ? "#E8FF47" : DIVIDER,
            }}
          />
        </div>

        {/* ── Top bar ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px clamp(32px, 4vw, 80px)",
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: NEAR_BLACK,
            }}
          >
            ERA
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: SECONDARY,
            }}
          >
            {isOverview
              ? "GTM System"
              : isLoopClose
                ? "The Loop"
                : spotlightEngine
                  ? `${spotlightEngine.number} / 03`
                  : ""}
          </span>
        </div>

        {/* ── Scroll hint (overview only) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: overviewOpacity * 0.5,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: SECONDARY,
            }}
          >
            Scroll to explore
          </span>
          <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
            <rect
              x="1"
              y="1"
              width="16"
              height="24"
              rx="8"
              stroke={SECONDARY}
              strokeWidth="1.5"
            />
            <circle cx="9" cy="8" r="2" fill={SECONDARY}>
              <animate
                attributeName="cy"
                values="8;16;8"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
