import { useEffect, useRef, useState, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Stage {
  name: string;
  description: string;
}

interface EngineData {
  number: string;
  label: string;
  headline: string;
  problem: string;
  idea: string;
  stages: Stage[];
  result: { metric: string; label: string; attribution: string };
  color: string;
  bgDark: boolean;
}

const ENGINES: EngineData[] = [
  {
    number: "01",
    label: "Acquisition",
    headline: "Fill the pipeline.",
    problem:
      "\u201CWe\u2019re doing outbound but nothing is converting. What are we missing?\u201D",
    idea: "Your buyers are already in-market. You\u2019re just not finding them in time.",
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
    result: {
      metric: "2\u00D7 qualified pipeline",
      label: "in 90 days",
      attribution: "\u2014 Lara Vandenberg, Founder, Publicist",
    },
    color: "#1FA7A2",
    bgDark: false,
  },
  {
    number: "02",
    label: "Engagement",
    headline: "Win the room.",
    problem:
      "\u201CWe had a great first meeting. Then it went silent for six weeks.\u201D",
    idea: "The average mid-market deal has 10+ people involved. Your rep is talking to one.",
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
    result: {
      metric: "250 stakeholders",
      label: "in active system",
      attribution: "\u2014 Senior Leader, Enterprise Software",
    },
    color: "#C4522A",
    bgDark: true,
  },
  {
    number: "03",
    label: "Expansion",
    headline: "Grow what you have.",
    problem:
      "\u201COur customers love us but we have no idea when they\u2019re ready to buy more.\u201D",
    idea: "Your best new pipeline source is the customers you\u2019ve already closed.",
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
    result: {
      metric: "0 cold upsell calls",
      label: "",
      attribution: "\u2014 Senior Leader, Ecommerce Operator",
    },
    color: "#E0247A",
    bgDark: false,
  },
];

const STAGE_NAMES = [
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

// ─── Spiral SVG Builder ──────────────────────────────────────────────────────

function buildSpiralPath(
  totalHeight: number,
  cx: number,
  amplitude: number
): string {
  const revolutionHeight = totalHeight / 3.4;
  const points: string[] = [];
  const steps = 300;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = t * revolutionHeight * 3;
    const x = cx + Math.sin(t * Math.PI * 2 * 3) * amplitude;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  // Return arc: curve right then arc back up with arrow feel
  const bottomY = revolutionHeight * 3;
  const returnPoints = [
    `C ${cx + amplitude * 1.5} ${bottomY + 40}, ${cx + amplitude * 2.2} ${bottomY + 20}, ${cx + amplitude * 2.2} ${bottomY - 30}`,
    `L ${cx + amplitude * 2.2} ${bottomY - 60}`,
  ];

  return points.join(" ") + " " + returnPoints.join(" ");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function V2MagazineSpreads() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set()
  );

  // Inject Source Sans 3
  useEffect(() => {
    if (!document.querySelector('link[href*="Source+Sans+3"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Scroll progress tracking
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    const totalScrollable = el.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // IntersectionObserver for section reveals
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setVisibleSections((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) next.add(i);
            return next;
          });
        },
        { threshold: 0.15 }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // SVG dimensions
  const spiralViewW = 200;
  const spiralViewH = 3600;
  const sCx = 100;
  const sAmp = 50;
  const spiralPath = buildSpiralPath(spiralViewH, sCx, sAmp);

  // Node positions along spiral for 9 stages
  const nodePositions = STAGE_NAMES.map((_, i) => {
    const t = (i + 0.5) / 9;
    const revH = spiralViewH / 3.4;
    const y = t * revH * 3;
    const x = sCx + Math.sin(t * Math.PI * 2 * 3) * sAmp;
    return { x, y };
  });

  // Gradient stops matching engine colors
  const gradientStops = [
    { offset: "0%", color: ENGINES[0].color },
    { offset: "32%", color: ENGINES[0].color },
    { offset: "34%", color: ENGINES[1].color },
    { offset: "65%", color: ENGINES[1].color },
    { offset: "67%", color: ENGINES[2].color },
    { offset: "88%", color: ENGINES[2].color },
    { offset: "100%", color: ENGINES[2].color },
  ];

  // Arrow tip coordinates
  const arrowX = sCx + sAmp * 2.2;
  const arrowY = (spiralViewH / 3.4) * 3 - 60;

  const reveal = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        color: "#383838",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* ─── Overview Section ─── */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        style={{
          minHeight: "100vh",
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            ...reveal(visibleSections.has(0)),
            maxWidth: 900,
            margin: "0 auto",
            padding: "80px 40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(48px, 5vw, 80px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.05,
              margin: "0 0 32px",
              letterSpacing: "-0.02em",
            }}
          >
            Each system compounds.
          </h1>
          <p
            style={{
              fontSize: 20,
              fontWeight: 300,
              color: "#A0A0A0",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Three engines. Nine stages. One spiral that goes deeper with every
            revolution. Acquisition feeds engagement. Engagement feeds expansion.
            Expansion feeds back into acquisition.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {ENGINES.map((e) => (
              <div key={e.number} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: e.color,
                    margin: "0 auto 8px",
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: e.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {e.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Main Spiral + Content Area ─── */}
      <div style={{ position: "relative" }}>
        {/* Sticky spiral column — left 15% */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "15%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox={`0 0 ${spiralViewW} ${spiralViewH}`}
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: "100%",
                height: "90vh",
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient
                  id="spiralGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  {gradientStops.map((s, i) => (
                    <stop key={i} offset={s.offset} stopColor={s.color} />
                  ))}
                </linearGradient>
                <filter id="spiralGlow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background spiral (dim) */}
              <path
                d={spiralPath}
                fill="none"
                stroke="url(#spiralGrad)"
                strokeWidth={22}
                strokeLinecap="round"
                opacity={0.18}
              />

              {/* Progress overlay (lit portion) */}
              <path
                d={spiralPath}
                fill="none"
                stroke="url(#spiralGrad)"
                strokeWidth={22}
                strokeLinecap="round"
                strokeDasharray="10000"
                strokeDashoffset={10000 - scrollProgress * 10000}
                filter="url(#spiralGlow)"
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />

              {/* Stage node dots + labels */}
              {nodePositions.map((pos, i) => {
                const engineIdx = Math.floor(i / 3);
                const isActive = scrollProgress > (i / 9) * 0.88;
                return (
                  <g key={i}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? 10 : 7}
                      fill={isActive ? ENGINES[engineIdx].color : "#2A2A2A"}
                      stroke={ENGINES[engineIdx].color}
                      strokeWidth={2}
                      style={{
                        transition: "r 0.3s ease, fill 0.3s ease",
                      }}
                    />
                    <text
                      x={pos.x + (pos.x > sCx ? 18 : -18)}
                      y={pos.y + 4}
                      textAnchor={pos.x > sCx ? "start" : "end"}
                      fill={isActive ? ENGINES[engineIdx].color : "#5B6670"}
                      fontSize={11}
                      fontWeight={600}
                      fontFamily="'Source Sans 3', sans-serif"
                      style={{ transition: "fill 0.3s ease" }}
                    >
                      {STAGE_NAMES[i]}
                    </text>
                  </g>
                );
              })}

              {/* Return arrow head */}
              <polygon
                points={`${arrowX},${arrowY} ${arrowX - 10},${arrowY + 14} ${arrowX + 10},${arrowY + 14}`}
                fill={ENGINES[2].color}
                opacity={scrollProgress > 0.9 ? 1 : 0.25}
                style={{ transition: "opacity 0.4s ease" }}
              />
            </svg>
          </div>
        </div>

        {/* ─── Engine Sections (right 80%) ─── */}
        {ENGINES.map((engine, engineIdx) => (
          <section
            key={engine.number}
            ref={(el) => {
              sectionRefs.current[engineIdx + 1] = el;
            }}
            style={{
              minHeight: "120vh",
              background: engine.bgDark ? "#1A1A1A" : "#F6F5F2",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Watermark number */}
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -40,
                fontSize: 200,
                fontWeight: 800,
                color: engine.bgDark ? "#FFFFFF" : "#383838",
                opacity: 0.05,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {engine.number}
            </div>

            {/* Editorial content */}
            <div
              style={{
                ...reveal(visibleSections.has(engineIdx + 1)),
                marginLeft: "18%",
                maxWidth: 700,
                padding: "80px 40px 80px 0",
              }}
            >
              {/* Engine label */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: engine.color,
                  marginBottom: 16,
                }}
              >
                {engine.label}
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontSize: "clamp(44px, 4.5vw, 72px)",
                  fontWeight: 800,
                  color: engine.bgDark ? "#FFFFFF" : "#383838",
                  lineHeight: 1.05,
                  margin: "0 0 40px",
                  letterSpacing: "-0.02em",
                }}
              >
                {engine.headline}
              </h2>

              {/* Problem pull-quote */}
              <blockquote
                style={{
                  borderLeft: `3px solid ${engine.color}`,
                  paddingLeft: 24,
                  marginLeft: 0,
                  marginBottom: 36,
                  marginTop: 0,
                  marginRight: 0,
                }}
              >
                <p
                  style={{
                    fontSize: 20,
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: engine.bgDark ? "#D7DADD" : "#5B6670",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {engine.problem}
                </p>
              </blockquote>

              {/* Core idea */}
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color: engine.bgDark ? "#A0A0A0" : "#5B6670",
                  maxWidth: 520,
                  lineHeight: 1.7,
                  marginBottom: 48,
                }}
              >
                {engine.idea}
              </p>

              {/* Three stages */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                {engine.stages.map((stage, stageIdx) => (
                  <div key={stage.name}>
                    <div
                      style={{
                        borderLeft: `4px solid ${engine.color}`,
                        paddingLeft: 20,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: engine.bgDark ? "#FFFFFF" : "#383838",
                          marginBottom: 6,
                        }}
                      >
                        {stage.name}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 300,
                          color: engine.bgDark ? "#A0A0A0" : "#5B6670",
                          lineHeight: 1.6,
                        }}
                      >
                        {stage.description}
                      </div>
                    </div>
                    {/* Flow arrow between stages */}
                    {stageIdx < engine.stages.length - 1 && (
                      <div
                        style={{
                          textAlign: "center",
                          color: engine.color,
                          fontSize: 18,
                          padding: "8px 0 0 20px",
                          opacity: 0.6,
                        }}
                      >
                        \u2193
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Client result */}
              <div style={{ marginTop: 56 }}>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: engine.color,
                    lineHeight: 1.1,
                  }}
                >
                  {engine.result.metric}
                </div>
                {engine.result.label && (
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: engine.bgDark ? "#A0A0A0" : "#5B6670",
                      marginTop: 4,
                    }}
                  >
                    {engine.result.label}
                  </div>
                )}
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: engine.bgDark ? "#5B6670" : "#A0A0A0",
                    marginTop: 8,
                    fontStyle: "italic",
                  }}
                >
                  {engine.result.attribution}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ─── Closing Section ─── */}
        <section
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
          style={{
            minHeight: "40vh",
            background: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              ...reveal(visibleSections.has(4)),
              textAlign: "center",
              padding: "60px 40px",
            }}
          >
            <p
              style={{
                fontSize: "clamp(32px, 3.5vw, 56px)",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Every cycle feeds the next.
            </p>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "center",
                gap: 12,
              }}
            >
              {ENGINES.map((e) => (
                <div
                  key={e.number}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: e.color,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
