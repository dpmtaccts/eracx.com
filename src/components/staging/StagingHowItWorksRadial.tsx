import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — Updated: CONNECTION→ACQUIRE, TRUST→ENGAGE, LOYALTY→EXPAND
   ═══════════════════════════════════════════════════════════════════════════ */

interface Stage {
  name: string;
  description: string;
  tools: string[];
}

interface LoopData {
  key: string;
  number: string;
  label: string;
  color: string;
  problem: string;
  solution: string;
  stages: Stage[];
}

const LOOPS: LoopData[] = [
  {
    key: "acquire",
    number: "01",
    label: "ACQUIRE",
    color: "#1FA7A2",
    problem: "We need more pipeline but outbound isn't working.",
    solution:
      "Detect, enrich, reach. Signal-based targeting finds accounts showing buying intent. Content builds authority. LinkedIn creates visibility. Outreach fires automatically, personalized by role and signal.",
    stages: [
      {
        name: "Detect",
        description:
          "Intent data, visitor identification, and market signals surface accounts showing buying behavior.",
        tools: ["Bombora", "RB2B", "G2"],
      },
      {
        name: "Enrich",
        description:
          "Every signal gets layered with contact, firmographic, and technographic data automatically.",
        tools: ["Clay", "Apollo", "Databar"],
      },
      {
        name: "Reach",
        description:
          "Multi-channel outbound sequences personalized to the signal context and buying stage.",
        tools: ["Outreach", "Dripify", "LinkedIn"],
      },
    ],
  },
  {
    key: "engage",
    number: "02",
    label: "ENGAGE",
    color: "#B85C4A",
    problem: "Our deals keep stalling and we can't figure out why.",
    solution:
      "Map, nurture, close. Every stakeholder gets presence. Thought leadership mapped to role. Champion tracking, silence detection, re-engagement plays. RevOps keeps every interaction in the record.",
    stages: [
      {
        name: "Map",
        description:
          "Identify every stakeholder in the buying committee and their role in the decision.",
        tools: ["HockeyStack", "Fireflies", "Claude"],
      },
      {
        name: "Nurture",
        description:
          "Decision-support content and touchpoints tailored to each stakeholder's concerns.",
        tools: ["HubSpot", "Salesforce", "Resend"],
      },
      {
        name: "Close",
        description:
          "Deal acceleration through consensus building and objection resolution across the committee.",
        tools: ["CRM", "Claude", "Fireflies"],
      },
    ],
  },
  {
    key: "expand",
    number: "03",
    label: "EXPAND",
    color: "#D43D8D",
    problem: "We have happy customers but no expansion revenue.",
    solution:
      "Measure, grow, refer. Post-close signals trigger expansion conversations. Customer content deepens relationships. Satisfaction scoring drives upsell timing. Referral activations create new pipeline from existing customers.",
    stages: [
      {
        name: "Measure",
        description:
          "Track value realization signals and customer health scores from day one.",
        tools: ["Fireflies", "CRM", "HockeyStack"],
      },
      {
        name: "Grow",
        description:
          "Identify expansion triggers and upsell opportunities through usage and engagement signals.",
        tools: ["Claude", "Bombora", "RB2B"],
      },
      {
        name: "Refer",
        description:
          "Systematically activate advocates and automate referral pathways.",
        tools: ["CRM", "Claude", "Resend"],
      },
    ],
  },
];

const ALL_STAGES = LOOPS.flatMap((loop, li) =>
  loop.stages.map((stage, si) => ({ loop, loopIndex: li, stageIndex: si, stage }))
);

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const FONT = "'DM Sans', 'Inter', system-ui, sans-serif";
const C = {
  charcoal: "#383838",
  offWhite: "#F6F5F2",
  divider: "#D7DADD",
  secondary: "#5B6670",
  white: "#FFFFFF",
  oxide: "#B85C4A",
};

const CX = 300;
const CY = 300;
const RING_R = 210;
const HUB_R = 48;
const NODE_R_INACTIVE = 10;
const NODE_R_ACTIVE = 14;
const DOT_R_INACTIVE = 3.5;
const DOT_R_ACTIVE = 5;
const LABEL_OFFSET = 32;
const INNER_LABEL_R = 115;

const LOOP_CENTERS_DEG = [-90, 30, 150];
const STAGE_OFFSETS_DEG = [-36, 0, 36];

function stageAngleDeg(loopIdx: number, stageIdx: number): number {
  return LOOP_CENTERS_DEG[loopIdx] + STAGE_OFFSETS_DEG[stageIdx];
}
function degToRad(d: number) {
  return (d * Math.PI) / 180;
}
function polarToXY(cx: number, cy: number, r: number, deg: number) {
  const rad = degToRad(deg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function ProgressDots({
  activeIndex,
  onDotClick,
  playing,
  onTogglePlay,
}: {
  activeIndex: number;
  onDotClick: (idx: number) => void;
  playing: boolean;
  onTogglePlay: () => void;
}) {
  const activeLoopIdx = Math.floor(activeIndex / 3);
  const activeColor = LOOPS[activeLoopIdx].color;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 28 }}>
      {ALL_STAGES.map((s, i) => {
        const isActive = i === activeIndex;
        const sameLoop = s.loopIndex === activeLoopIdx;
        const color = isActive ? s.loop.color : sameLoop ? s.loop.color : C.divider;
        const opacity = isActive ? 1 : sameLoop ? 0.4 : 0.25;
        return (
          <span key={i} style={{ display: "inline-flex" }}>
            {i > 0 && i % 3 === 0 && <span style={{ width: 8 }} />}
            <button
              onClick={() => onDotClick(i)}
              aria-label={`Go to ${s.stage.name}`}
              style={{
                width: isActive ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: color,
                opacity,
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s ease",
              }}
            />
          </span>
        );
      })}
      <span style={{ width: 12 }} />
      <button
        onClick={onTogglePlay}
        aria-label={playing ? "Pause" : "Play"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          flexShrink: 0,
          color: activeColor,
          fontSize: 14,
          lineHeight: 1,
          transition: "color 0.4s ease",
        }}
      >
        {playing ? "\u23F8" : "\u25B6"}
      </button>
    </div>
  );
}

function StageDetail({ activeIndex }: { activeIndex: number }) {
  const { loop, stage } = ALL_STAGES[activeIndex];
  return (
    <div style={{ fontFamily: FONT, position: "relative" }}>
      <span
        style={{
          fontSize: 80,
          fontWeight: 300,
          color: loop.color,
          opacity: 0.15,
          lineHeight: 1,
          display: "block",
          transition: "color 0.4s ease",
        }}
      >
        {loop.number}
      </span>
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase" as const,
          color: loop.color,
          margin: "4px 0 12px",
          transition: "color 0.4s ease",
        }}
      >
        {loop.label}
      </p>
      <h3
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: C.charcoal,
          margin: "0 0 12px",
          lineHeight: 1.15,
        }}
      >
        {stage.name}
      </h3>
      <p
        style={{
          fontSize: 15,
          fontWeight: 300,
          color: C.secondary,
          lineHeight: 1.55,
          maxWidth: 340,
          margin: "0 0 20px",
        }}
      >
        {stage.description}
      </p>
      <a
        href="#how-it-works-radial"
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: loop.color,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          transition: "opacity 0.2s ease",
        }}
      >
        See how it runs &rarr;
      </a>
    </div>
  );
}

function MobileLoopSection({ loop }: { loop: LoopData }) {
  return (
    <div>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 56,
          fontWeight: 300,
          color: loop.color,
          opacity: 0.2,
          lineHeight: 1,
          display: "block",
        }}
      >
        {loop.number}
      </span>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase" as const,
          color: loop.color,
          margin: "8px 0 10px",
        }}
      >
        {loop.label}
      </p>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 300,
          fontStyle: "italic",
          color: C.secondary,
          margin: "0 0 8px",
        }}
      >
        "{loop.problem}"
      </p>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 400,
          color: C.charcoal,
          maxWidth: 400,
          margin: "0 0 16px",
        }}
      >
        {loop.solution}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {loop.stages.map((stage) => (
          <div
            key={stage.name}
            style={{
              background: C.white,
              borderRadius: 8,
              padding: "16px 18px",
              borderLeft: `3px solid ${loop.color}`,
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 700,
                color: C.charcoal,
                margin: "0 0 6px",
              }}
            >
              {stage.name}
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 300,
                color: C.secondary,
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              {stage.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RADIAL SVG DIAGRAM
   ═══════════════════════════════════════════════════════════════════════════ */

function RadialDiagram({ activeIndex }: { activeIndex: number }) {
  const activeLoopIdx = Math.floor(activeIndex / 3);

  return (
    <svg viewBox="0 0 600 600" style={{ width: "100%", maxWidth: 520, display: "block" }}>
      {LOOPS.map((loop, li) => {
        const startDeg = LOOP_CENTERS_DEG[li] - 50;
        const endDeg = LOOP_CENTERS_DEG[li] + 50;
        const isActiveLoop = li === activeLoopIdx;
        return (
          <path
            key={`arc-band-${li}`}
            d={describeArc(CX, CY, RING_R, startDeg, endDeg)}
            fill="none"
            stroke={loop.color}
            strokeWidth={34}
            strokeLinecap="round"
            opacity={isActiveLoop ? 0.1 : 0.04}
            style={{ transition: "opacity 0.4s ease" }}
          />
        );
      })}

      {LOOPS.map((loop, li) => {
        const startDeg = stageAngleDeg(li, 0);
        const endDeg = stageAngleDeg(li, 2);
        const isActiveLoop = li === activeLoopIdx;
        return (
          <path
            key={`arc-thin-${li}`}
            d={describeArc(CX, CY, RING_R, startDeg, endDeg)}
            fill="none"
            stroke={loop.color}
            strokeWidth={1.5}
            opacity={isActiveLoop ? 0.35 : 0.12}
            style={{ transition: "opacity 0.4s ease" }}
          />
        );
      })}

      {ALL_STAGES.map((s, i) => {
        const deg = stageAngleDeg(s.loopIndex, s.stageIndex);
        const p = polarToXY(CX, CY, RING_R, deg);
        const hubEdge = polarToXY(CX, CY, HUB_R + 4, deg);
        const isActiveLoop = s.loopIndex === activeLoopIdx;
        return (
          <line
            key={`spoke-${i}`}
            x1={hubEdge.x}
            y1={hubEdge.y}
            x2={p.x}
            y2={p.y}
            stroke={isActiveLoop ? s.loop.color : C.divider}
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={isActiveLoop ? 0.2 : 0.12}
            style={{ transition: "all 0.4s ease" }}
          />
        );
      })}

      <image href="/era-symbol.png" x={CX - 22} y={CY - 22} width={44} height={44} />

      {LOOPS.map((loop, li) => {
        const deg = LOOP_CENTERS_DEG[li];
        const p = polarToXY(CX, CY, INNER_LABEL_R, deg);
        const isActiveLoop = li === activeLoopIdx;
        const rot = deg + 90;
        return (
          <text
            key={`loop-label-${li}`}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={8}
            fontWeight={700}
            fontFamily={FONT}
            letterSpacing="2.5px"
            fill={loop.color}
            fillOpacity={isActiveLoop ? 0.6 : 0.25}
            transform={`rotate(${rot}, ${p.x}, ${p.y})`}
            style={{ transition: "fill-opacity 0.4s ease" }}
          >
            {loop.label}
          </text>
        );
      })}

      {ALL_STAGES.map((s, i) => {
        const deg = stageAngleDeg(s.loopIndex, s.stageIndex);
        const p = polarToXY(CX, CY, RING_R, deg);
        const isActive = i === activeIndex;
        const isActiveLoop = s.loopIndex === activeLoopIdx;
        const r = isActive ? NODE_R_ACTIVE : NODE_R_INACTIVE;
        const dotR = isActive ? DOT_R_ACTIVE : DOT_R_INACTIVE;
        const borderW = isActive ? 2 : 1.5;

        return (
          <g key={`node-${i}`} style={{ transition: "all 0.4s ease" }}>
            <circle
              cx={p.x}
              cy={p.y}
              r={r}
              fill={C.white}
              stroke={s.loop.color}
              strokeWidth={borderW}
              opacity={isActiveLoop ? 1 : 0.4}
              style={{ transition: "all 0.4s ease" }}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={dotR}
              fill={s.loop.color}
              opacity={isActiveLoop ? 1 : 0.4}
              style={{ transition: "all 0.4s ease" }}
            />
          </g>
        );
      })}

      {ALL_STAGES.map((s, i) => {
        const deg = stageAngleDeg(s.loopIndex, s.stageIndex);
        const p = polarToXY(CX, CY, RING_R + LABEL_OFFSET, deg);
        const isActive = i === activeIndex;
        const isActiveLoop = s.loopIndex === activeLoopIdx;

        let anchor: "start" | "middle" | "end" = "middle";
        const normDeg = ((deg % 360) + 360) % 360;
        if (normDeg > 20 && normDeg < 160) anchor = "start";
        else if (normDeg > 200 && normDeg < 340) anchor = "end";

        return (
          <text
            key={`label-${i}`}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            dominantBaseline="central"
            fontSize={isActive ? 16 : 13}
            fontWeight={isActive ? 700 : 600}
            fontFamily={FONT}
            fill={isActiveLoop ? C.charcoal : C.divider}
            style={{ transition: "all 0.4s ease" }}
          >
            {s.stage.name}
          </text>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function StagingHowItWorksRadial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearAuto();
    if (playing && inView && !isMobile) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 9);
      }, 3000);
    }
    return clearAuto;
  }, [playing, inView, isMobile, clearAuto]);

  const handleDotClick = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      setPlaying(false);
      clearAuto();
    },
    [clearAuto]
  );

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works-radial"
      style={{
        background: C.offWhite,
        fontFamily: FONT,
        padding: isMobile ? "48px 24px" : "72px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: isMobile ? 0 : "0 24px",
        }}
      >
        {!isMobile && (
          <>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: LOOPS[0].color,
                margin: "0 0 8px",
              }}
            >
              HOW IT WORKS
            </p>
            <h2
              className="text-4xl font-black leading-[0.95] text-[#111111] md:text-6xl lg:text-7xl"
              style={{ margin: "0 0 48px" }}
            >
              Each system compounds.
            </h2>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 64 }}>
              <div style={{ flex: "0 0 520px" }}>
                <RadialDiagram activeIndex={activeIndex} />
              </div>
              <div style={{ flex: 1, minWidth: 300, paddingTop: 40 }}>
                <StageDetail activeIndex={activeIndex} />
                <ProgressDots
                  activeIndex={activeIndex}
                  onDotClick={handleDotClick}
                  playing={playing}
                  onTogglePlay={togglePlay}
                />
              </div>
            </div>
          </>
        )}

        {isMobile && (
          <>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: LOOPS[0].color,
                margin: "0 0 8px",
              }}
            >
              HOW IT WORKS
            </p>
            <h2
              className="text-3xl font-black leading-[0.95] text-[#111111]"
              style={{ margin: "0 0 10px" }}
            >
              Each system compounds.
            </h2>
            <p
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: C.secondary,
                maxWidth: 440,
                margin: "0 0 32px",
                lineHeight: 1.5,
              }}
            >
              Each system is designed independently and operates as part of one
              connected infrastructure.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {LOOPS.map((loop) => (
                <MobileLoopSection key={loop.key} loop={loop} />
              ))}
            </div>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: isMobile ? 48 : 64 }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: C.secondary,
              margin: "0 0 20px",
            }}
          >
            Operational in 2 to 4 weeks. Signal infrastructure included.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 600,
              color: C.white,
              background: C.oxide,
              padding: "14px 32px",
              borderRadius: 4,
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
          >
            See pricing &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
