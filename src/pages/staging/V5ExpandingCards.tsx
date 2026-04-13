// @ts-nocheck
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Google Fonts Injector ──────────────────────────────────────
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500&display=swap";

function useGoogleFont() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);
}

// ─── Brand Palette ──────────────────────────────────────────────
const COLOR = {
  charcoal: "#383838",
  nearBlack: "#1A1A1A",
  offwhite: "#F6F5F2",
  teal: "#1FA7A2",
  terracotta: "#C4522A",
  magenta: "#E0247A",
  secondary: "#5B6670",
} as const;

// ─── Content Data ───────────────────────────────────────────────
interface Stage {
  name: string;
  description: string;
}

interface Engine {
  number: string;
  label: string;
  systemLabel: string;
  headline: string;
  color: string;
  problemQuote: string;
  coreIdea: string;
  stages: Stage[];
  resultMetric: string;
  resultAttribution: string;
}

const ENGINES: Engine[] = [
  {
    number: "01",
    label: "Acquisition",
    systemLabel: "ACQUISITION SYSTEM",
    headline: "Fill the pipeline.",
    color: COLOR.teal,
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
  },
  {
    number: "02",
    label: "Engagement",
    systemLabel: "ENGAGEMENT SYSTEM",
    headline: "Win the room.",
    color: COLOR.terracotta,
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
  },
  {
    number: "03",
    label: "Expansion",
    systemLabel: "EXPANSION SYSTEM",
    headline: "Grow what you have.",
    color: COLOR.magenta,
    problemQuote:
      "\u201COur customers love us but we have no idea when they\u2019re ready to buy more.\u201D",
    coreIdea:
      "Your best new pipeline source is the customers you\u2019ve already closed. Era tracks post-close signals and converts them into expansion conversations, referrals, and renewals automatically.",
    stages: [
      {
        name: "Measure",
        description:
          "Post-close signal tracking. Engagement, satisfaction, usage, team growth. All continuous.",
      },
      {
        name: "Grow",
        description:
          "Cross-sell and upsell triggered by signals, not calendars. Expansion is data-driven.",
      },
      {
        name: "Refer",
        description:
          "Structured referral activation at 6 months. Every referral feeds back into acquisition.",
      },
    ],
    resultMetric: "0 cold upsell calls",
    resultAttribution: "Senior Leader, Ecommerce Operator",
  },
];

// Flatten all stages with parent engine reference
const ALL_STAGES = ENGINES.flatMap((engine, engineIdx) =>
  engine.stages.map((stage, stageIdx) => ({
    ...stage,
    engine,
    engineIdx,
    stageIdx,
    globalIdx: engineIdx * 3 + stageIdx,
    isFirstInEngine: stageIdx === 0,
    isLastInEngine: stageIdx === engine.stages.length - 1,
  }))
);

// ─── Utility ────────────────────────────────────────────────────
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

// ─── Circle SVG ─────────────────────────────────────────────────
function CircleRing({
  opacity,
  scale,
  glowing,
}: {
  opacity: number;
  scale?: { x: number; y: number };
  glowing?: boolean;
}) {
  const cx = 150;
  const cy = 150;
  const r = 130;
  const circumference = 2 * Math.PI * r;
  const arcLen = circumference / 3;
  const colors = [COLOR.teal, COLOR.terracotta, COLOR.magenta];
  const stageNames = [
    "Detect",
    "Enrich",
    "Reach",
    "Map",
    "Nurture",
    "Close",
    "Measure",
    "Grow",
    "Refer",
  ];

  const sx = scale?.x ?? 1;
  const sy = scale?.y ?? 1;

  return (
    <div
      style={{
        opacity,
        transform: `scaleX(${sx}) scaleY(${sy})`,
        transformOrigin: "center center",
        willChange: "transform, opacity",
        position: "relative",
        width: 300,
        height: 300,
      }}
    >
      <svg
        viewBox="0 0 300 300"
        width={300}
        height={300}
        style={{
          filter: glowing
            ? `drop-shadow(0 0 20px ${hexToRgba(COLOR.teal, 0.4)}) drop-shadow(0 0 40px ${hexToRgba(COLOR.magenta, 0.2)})`
            : "none",
        }}
      >
        {/* Three colored arcs */}
        {colors.map((color, i) => {
          const startAngle = -90 + i * 120;
          const gapDeg = 3;
          const effectiveArc = arcLen - (gapDeg / 360) * circumference;
          const dashOffset =
            -(i * arcLen) + (gapDeg / 720) * circumference;
          return (
            <circle
              key={color}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={`${effectiveArc} ${circumference - effectiveArc}`}
              strokeDashoffset={-i * arcLen}
              transform={`rotate(${startAngle - 90 + gapDeg / 2}, ${cx}, ${cy})`}
              style={{
                transition: "none",
              }}
            />
          );
        })}

        {/* Stage dots and labels */}
        {stageNames.map((name, i) => {
          const angle = ((i * 40 - 90) * Math.PI) / 180;
          const dotR = r;
          const dx = cx + dotR * Math.cos(angle);
          const dy = cy + dotR * Math.sin(angle);
          const labelR = r + 22;
          const lx = cx + labelR * Math.cos(angle);
          const ly = cy + labelR * Math.sin(angle);
          const engineColor = colors[Math.floor(i / 3)];

          return (
            <g key={name}>
              <circle cx={dx} cy={dy} r={4} fill={engineColor} />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={engineColor}
                fontSize={9}
                fontFamily="'Source Sans 3', sans-serif"
                fontWeight={600}
                letterSpacing="0.04em"
              >
                {name}
              </text>
            </g>
          );
        })}

        {/* Center text */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={COLOR.charcoal}
          fontSize={20}
          fontFamily="'Source Sans 3', sans-serif"
          fontWeight={700}
          letterSpacing="-0.02em"
        >
          One system.
        </text>
      </svg>

      {/* Glow pulse animation */}
      {glowing && (
        <style>{`
          @keyframes ringPulse {
            0%, 100% { filter: drop-shadow(0 0 15px ${hexToRgba(COLOR.teal, 0.3)}) drop-shadow(0 0 30px ${hexToRgba(COLOR.magenta, 0.15)}); }
            50% { filter: drop-shadow(0 0 30px ${hexToRgba(COLOR.teal, 0.5)}) drop-shadow(0 0 50px ${hexToRgba(COLOR.magenta, 0.3)}); }
          }
        `}</style>
      )}
    </div>
  );
}

// ─── Horizontal Strip ───────────────────────────────────────────
function HorizontalStrip({
  translateX,
  activeIdx,
  opacity,
  scale,
}: {
  translateX: number;
  activeIdx: number;
  opacity: number;
  scale?: { x: number; y: number };
}) {
  const segmentWidth = 30; // vw per segment
  const totalWidth = segmentWidth * 9; // 270vw
  const stripHeight = 80;
  const activeHeight = 92;

  const sx = scale?.x ?? 1;
  const sy = scale?.y ?? 1;

  // Determine which engine label to show
  const activeEngineIdx = Math.floor(activeIdx / 3);
  const activeEngine = ENGINES[activeEngineIdx];

  return (
    <div
      style={{
        opacity,
        transform: `scaleX(${sx}) scaleY(${sy})`,
        transformOrigin: "center center",
        willChange: "transform, opacity",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Engine label above strip */}
      <div
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: activeEngine.color,
          marginBottom: 20,
          textTransform: "uppercase",
          transition: "color 0.3s ease",
        }}
      >
        {activeEngine.systemLabel}
      </div>

      {/* The strip container */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transform: `translateX(${translateX}vw)`,
            willChange: "transform",
            borderRadius: 40,
            overflow: "visible",
          }}
        >
          {ALL_STAGES.map((stage, i) => {
            const isActive = i === activeIdx;
            const h = isActive ? activeHeight : stripHeight;

            return (
              <div
                key={stage.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: `${segmentWidth}vw`,
                    height: h,
                    background: stage.engine.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "height 0.3s ease",
                    position: "relative",
                    borderRadius:
                      i === 0
                        ? "40px 0 0 40px"
                        : i === 8
                          ? "0 40px 40px 0"
                          : 0,
                    boxShadow: isActive
                      ? `0 0 30px ${hexToRgba(stage.engine.color, 0.5)}`
                      : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {stage.name}
                  </span>
                </div>

                {/* Arrow between segments */}
                {i < 8 && (
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: -8,
                        top: -10,
                        fontSize: 18,
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 300,
                      }}
                    >
                      {"\u203A"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Stage Content Panel ────────────────────────────────────────
function StageContentPanel({
  stageData,
  opacity,
}: {
  stageData: (typeof ALL_STAGES)[number];
  opacity: number;
}) {
  const { engine, isFirstInEngine, isLastInEngine } = stageData;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
        willChange: "transform, opacity",
        maxWidth: 680,
        margin: "0 auto",
        padding: "0 48px",
      }}
    >
      {/* Engine headline (small, above) */}
      <div
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: engine.color,
          marginBottom: 12,
          letterSpacing: "0.02em",
        }}
      >
        {engine.headline}
      </div>

      {/* Stage name with left border */}
      <div
        style={{
          borderLeft: `4px solid ${engine.color}`,
          paddingLeft: 20,
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "clamp(28px, 2.5vw, 36px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: 0,
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {stageData.name}
        </h3>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: "#8A9099",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {stageData.description}
        </p>
      </div>

      {/* Extra content at first stage of each engine */}
      {isFirstInEngine && (
        <div style={{ marginTop: 28 }}>
          {/* Engine number watermark */}
          <div
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 80,
              fontWeight: 900,
              color: hexToRgba(engine.color, 0.1),
              lineHeight: 1,
              marginBottom: -20,
              position: "relative",
              zIndex: 0,
            }}
          >
            {engine.number}
          </div>
          {/* Problem quote */}
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 17,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#8A9099",
              lineHeight: 1.6,
              margin: 0,
              marginBottom: 14,
              position: "relative",
              zIndex: 1,
            }}
          >
            {engine.problemQuote}
          </p>
          {/* Core idea */}
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: "#B0B5BB",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {engine.coreIdea}
          </p>
        </div>
      )}

      {/* Result at last stage of each engine */}
      {isLastInEngine && (
        <div
          style={{
            marginTop: 28,
            background: hexToRgba(engine.color, 0.1),
            borderRadius: 6,
            padding: "24px 28px",
            display: "inline-flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "clamp(24px, 2vw, 32px)",
              fontWeight: 800,
              color: engine.color,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            {engine.resultMetric}
          </div>
          <div
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              color: "#8A9099",
              letterSpacing: "0.02em",
            }}
          >
            {"\u2014 "}
            {engine.resultAttribution}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────
export default function V5ExpandingCards() {
  useGoogleFont();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollableDistance = wrapperHeight - viewportHeight;
      if (scrollableDistance <= 0) return;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Phase Boundaries ──
  // 0.00 - 0.08: Circle visible
  // 0.08 - 0.18: Unfold transition
  // 0.18 - 0.78: Strip phase (9 stages, horizontal scroll)
  // 0.78 - 0.88: Refold transition
  // 0.88 - 1.00: Circle restored with glow

  const PHASE_CIRCLE_START = 0;
  const PHASE_UNFOLD_START = 0.08;
  const PHASE_STRIP_START = 0.18;
  const PHASE_STRIP_END = 0.78;
  const PHASE_REFOLD_START = 0.78;
  const PHASE_REFOLD_END = 0.88;
  const PHASE_RESTORED_START = 0.88;

  // ── Derived values ──

  // Circle phase: visible from 0 to ~0.18, fades during unfold
  const circleVisible = progress < PHASE_STRIP_START;
  const restoredVisible = progress >= PHASE_REFOLD_START;

  // Unfold transition (0.08 - 0.18)
  const unfoldT = clamp01(
    (progress - PHASE_UNFOLD_START) / (PHASE_STRIP_START - PHASE_UNFOLD_START)
  );

  // Refold transition (0.78 - 0.88)
  const refoldT = clamp01(
    (progress - PHASE_REFOLD_START) / (PHASE_REFOLD_END - PHASE_REFOLD_START)
  );

  // Circle opacity in initial phase
  const circleOpacity = circleVisible
    ? progress < PHASE_UNFOLD_START
      ? 1
      : 1 - unfoldT
    : 0;

  // Circle scale during unfold (stretches horizontally)
  const circleScaleX = circleVisible ? lerp(1, 4, unfoldT) : 1;
  const circleScaleY = circleVisible ? lerp(1, 0.15, unfoldT) : 1;

  // Strip opacity
  const stripOpacity =
    progress >= PHASE_UNFOLD_START && progress <= PHASE_REFOLD_END
      ? progress < PHASE_STRIP_START
        ? unfoldT
        : progress > PHASE_REFOLD_START
          ? 1 - refoldT
          : 1
      : 0;

  // Strip scale during unfold/refold
  const stripScaleX =
    progress < PHASE_STRIP_START
      ? lerp(0.2, 1, unfoldT)
      : progress > PHASE_REFOLD_START
        ? lerp(1, 0.2, refoldT)
        : 1;
  const stripScaleY =
    progress < PHASE_STRIP_START
      ? lerp(3, 1, unfoldT)
      : progress > PHASE_REFOLD_START
        ? lerp(1, 3, refoldT)
        : 1;

  // Strip horizontal translation (during 0.18-0.78)
  const stripProgress = clamp01(
    (progress - PHASE_STRIP_START) / (PHASE_STRIP_END - PHASE_STRIP_START)
  );
  // Each segment is 30vw. 9 segments = 270vw total. We need to translate
  // so first segment starts centered and last ends centered.
  // Start: translateX = 0 (first segment centered-ish)
  // End: translateX = -(8 * 30) = -240vw
  const maxTranslate = -8 * 30; // -240vw
  const stripTranslateX = lerp(0, maxTranslate, stripProgress);

  // Active stage index (0-8)
  const activeStageIdx = Math.min(
    8,
    Math.floor(stripProgress * 9)
  );
  const activeStage = ALL_STAGES[activeStageIdx];

  // Stage content opacity: fade in/out as we transition between stages
  const stageLocalProgress = (stripProgress * 9) % 1;
  const stageContentOpacity =
    stripOpacity > 0.5
      ? stageLocalProgress < 0.1
        ? clamp01(stageLocalProgress / 0.1)
        : stageLocalProgress > 0.9
          ? clamp01((1 - stageLocalProgress) / 0.1)
          : 1
      : 0;

  // Restored circle (0.88 - 1.0)
  const restoredCircleOpacity = restoredVisible ? refoldT : 0;
  const isGlowing = progress >= PHASE_RESTORED_START;

  // Restored circle scales in from compressed strip shape
  const restoredScaleX = restoredVisible ? lerp(4, 1, refoldT) : 1;
  const restoredScaleY = restoredVisible ? lerp(0.15, 1, refoldT) : 1;

  // Background: offwhite for circle phases, near-black for strip phase
  const bgIsLight = progress < PHASE_UNFOLD_START || progress > PHASE_REFOLD_END;
  const bgColor = bgIsLight ? COLOR.offwhite : COLOR.nearBlack;
  const bgTransition = (() => {
    if (progress >= PHASE_UNFOLD_START && progress < PHASE_STRIP_START) {
      // Transitioning to dark
      const t = unfoldT;
      return t > 0.5 ? COLOR.nearBlack : COLOR.offwhite;
    }
    if (progress >= PHASE_REFOLD_START && progress < PHASE_REFOLD_END) {
      // Transitioning to light
      const t = refoldT;
      return t > 0.5 ? COLOR.offwhite : COLOR.nearBlack;
    }
    return bgColor;
  })();

  // Text color adapts
  const textColor =
    bgTransition === COLOR.nearBlack ? "#FFFFFF" : COLOR.charcoal;

  // Intro text opacity (fades during unfold)
  const introTextOpacity =
    progress < PHASE_UNFOLD_START
      ? 1
      : progress < PHASE_STRIP_START
        ? 1 - unfoldT
        : 0;

  // Restored text
  const restoredTextOpacity = progress >= PHASE_RESTORED_START ? clamp01((progress - PHASE_RESTORED_START) / 0.06) : 0;

  return (
    <div
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      {/* ── Scroll Wrapper (600vh) ── */}
      <div
        ref={wrapperRef}
        style={{
          height: "600vh",
          position: "relative",
        }}
      >
        {/* ── Sticky Viewport (100vh) ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: bgTransition,
            transition: "background 0.4s ease",
          }}
        >
          {/* ── PHASE 1: Initial Circle ── */}
          {circleVisible && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 48,
                pointerEvents: circleOpacity > 0.1 ? "auto" : "none",
              }}
            >
              <CircleRing
                opacity={circleOpacity}
                scale={{ x: circleScaleX, y: circleScaleY }}
              />

              {/* Intro text below circle */}
              <div
                style={{
                  opacity: introTextOpacity,
                  textAlign: "center",
                  maxWidth: 640,
                  padding: "0 48px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "clamp(36px, 4vw, 56px)",
                    fontWeight: 800,
                    color: textColor,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    margin: 0,
                    marginBottom: 20,
                  }}
                >
                  Each system compounds.
                </h2>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "clamp(16px, 1.2vw, 19px)",
                    fontWeight: 400,
                    color: COLOR.secondary,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Era&rsquo;s GTM system has three engines that work together in
                  a cycle. Signals from acquisition inform deal engagement. Deal
                  signals trigger expansion. Expansion generates referrals that
                  feed acquisition. Every cycle makes the next one smarter.
                </p>

                {/* Scroll hint */}
                <div
                  style={{
                    marginTop: 48,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    opacity: 0.4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: COLOR.secondary,
                    }}
                  >
                    Scroll to explore
                  </div>
                  <div
                    style={{
                      width: 1,
                      height: 40,
                      background: COLOR.secondary,
                      opacity: 0.4,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── PHASE 3: Horizontal Strip ── */}
          {stripOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 40,
                pointerEvents: stripOpacity > 0.5 ? "auto" : "none",
              }}
            >
              {/* Strip positioned in upper portion */}
              <div
                style={{
                  marginTop: -60,
                }}
              >
                <HorizontalStrip
                  translateX={stripTranslateX}
                  activeIdx={activeStageIdx}
                  opacity={stripOpacity}
                  scale={{ x: stripScaleX, y: stripScaleY }}
                />
              </div>

              {/* Stage content panel below strip */}
              {stripOpacity > 0.5 && (
                <div
                  style={{
                    minHeight: 280,
                    width: "100%",
                    maxWidth: 900,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <StageContentPanel
                    stageData={activeStage}
                    opacity={stageContentOpacity}
                  />
                </div>
              )}
            </div>
          )}

          {/* ── PHASE 5: Restored Circle ── */}
          {restoredVisible && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 48,
                pointerEvents: restoredCircleOpacity > 0.1 ? "auto" : "none",
              }}
            >
              <CircleRing
                opacity={restoredCircleOpacity}
                scale={{ x: restoredScaleX, y: restoredScaleY }}
                glowing={isGlowing && restoredCircleOpacity > 0.8}
              />

              {/* Restored text */}
              <div
                style={{
                  opacity: restoredTextOpacity,
                  textAlign: "center",
                  maxWidth: 560,
                  padding: "0 48px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "clamp(28px, 3vw, 42px)",
                    fontWeight: 800,
                    color: textColor,
                    lineHeight: 1.15,
                    letterSpacing: "-0.025em",
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  Every cycle makes the next one smarter.
                </h2>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    color: COLOR.secondary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Referrals become signals. Signals become pipeline. Pipeline
                  becomes revenue. The loop never stops.
                </p>
              </div>
            </div>
          )}

          {/* ── Progress indicator (bottom) ── */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 4,
              opacity: 0.3,
            }}
          >
            {ALL_STAGES.map((stage, i) => (
              <div
                key={stage.name}
                style={{
                  width: i === activeStageIdx && stripOpacity > 0.5 ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === activeStageIdx && stripOpacity > 0.5
                      ? stage.engine.color
                      : bgTransition === COLOR.nearBlack
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(0,0,0,0.15)",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}