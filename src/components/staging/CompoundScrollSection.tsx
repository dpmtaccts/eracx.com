import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

interface StageData {
  name: string;
  description: string;
  icon: (props: { size: number; color: string }) => JSX.Element;
}
interface ClientResult { metric: string; label: string; name: string; title: string; }
interface SystemData {
  key: string; number: string; label: string; color: string;
  headline: string; question: string; overview: string;
  stages: StageData[]; mechanics: string[]; client: ClientResult;
}

/* ── SVG Icon Components ── */

function IconSignal({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <path d="M12 20h.01" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M5 13a10 10 0 0 1 14 0" />
    </svg>
  );
}
function IconLayers({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}
function IconSend({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="m22 2-11 11" />
    </svg>
  );
}
function IconGrid({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function IconMessage({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconCheck({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
function IconChart({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function IconTrending({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
function IconShare({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

const SYSTEMS: SystemData[] = [
  {
    key: "acquisition", number: "01", label: "ACQUISITION SYSTEM", color: "#D6B26D",
    headline: "Fill the pipeline.",
    question: "\u201CWe\u2019re doing outbound but nothing is converting. What are we missing?\u201D",
    overview: "Your buyers are already in-market. You\u2019re just not finding them in time. Era captures signals and turns them into targeted outreach before a competitor gets the first meeting.",
    stages: [
      { name: "Detect", description: "Signal-based targeting matched to ICP. Job changes, funding, hiring surges, tech installs.", icon: IconSignal },
      { name: "Enrich", description: "Every account mapped: buying committee, tech stack, active signals, CRM gaps filled.", icon: IconLayers },
      { name: "Reach", description: "Multi-channel outreach fires automatically. Content, LinkedIn, email, personalized by signal.", icon: IconSend },
    ],
    mechanics: [
      "Signal-based account targeting matched to ICP",
      "Multi-channel outreach triggered by behavioral data",
      "Content that builds authority",
      "LinkedIn presence strategy",
      "Intent tracking across the full buying window",
      "Every touchpoint writes back to the account record",
    ],
    client: { metric: "2\u00D7", label: "qualified pipeline in 90 days", name: "Lara Vandenberg", title: "Founder, Publicist" },
  },
  {
    key: "engagement", number: "02", label: "ENGAGEMENT SYSTEM", color: "#1FA7A2",
    headline: "Win the room.",
    question: "\u201CWe had a great first meeting. Then it went silent for six weeks.\u201D",
    overview: "The average mid-market deal has 10+ people involved. Your rep is talking to one. Era builds presence across the full buying committee so deals don\u2019t die in committee.",
    stages: [
      { name: "Map", description: "Full buying committee identified. Champions, economic buyers, evaluators, influencers.", icon: IconGrid },
      { name: "Nurture", description: "Behavior-triggered sequences by role and stage. Thought leadership mapped to each stakeholder.", icon: IconMessage },
      { name: "Close", description: "Deal stall detection. Silence re-engagement. Multi-thread presence across the committee.", icon: IconCheck },
    ],
    mechanics: [
      "Behavior-triggered nurture sequences by role and stage",
      "Multi-thread engagement across the buying committee",
      "Thought leadership content delivered by role",
      "Champion tracking with automatic re-engagement on silence",
      "Deal stall detection with targeted re-entry plays",
      "RevOps integration: every interaction updates the CRM",
    ],
    client: { metric: "250", label: "stakeholders in active system", name: "Senior Leader", title: "Enterprise Software" },
  },
  {
    key: "expansion", number: "03", label: "EXPANSION SYSTEM", color: "#E0247A",
    headline: "Grow what you have.",
    question: "\u201COur customers love us but we have no idea when they\u2019re ready to buy more.\u201D",
    overview: "Your best new pipeline source is the customers you\u2019ve already closed. Era tracks post-close signals and converts them into expansion, referrals, and renewals automatically.",
    stages: [
      { name: "Measure", description: "Post-close signal tracking. Engagement, satisfaction, usage, team growth. All continuous.", icon: IconChart },
      { name: "Grow", description: "Cross-sell and upsell triggered by signals, not calendars. Expansion is data-driven.", icon: IconTrending },
      { name: "Refer", description: "Structured referral activation at 6 months. Every referral feeds back into acquisition.", icon: IconShare },
    ],
    mechanics: [
      "90-day post-close onboarding and expansion sequence",
      "Satisfaction and confidence signal tracking",
      "Cross-sell and upsell triggers based on account behavior",
      "Customer content strategy that deepens engagement",
      "Referral activation at the 6-month mark",
      "Every expansion signal writes back to the account",
    ],
    client: { metric: "0", label: "cold upsell calls", name: "Senior Leader", title: "Ecommerce Operator" },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SVG RING — Three thick arc segments, flat ends, bleeding off left edge
   ═══════════════════════════════════════════════════════════════════════════ */

const RING_VIEWBOX = 600;
const RING_CX = RING_VIEWBOX / 2;
const RING_CY = RING_VIEWBOX / 2;
const RING_R = 230;
const RING_STROKE = 65;
const GAP_DEG = 7; // gap between segments
const SEG_SPAN = 120 - GAP_DEG; // degrees per segment

// Segment start angles (0° = 3 o'clock, going clockwise)
// Segment 0 (Acquisition/Gold): top-right, centered at -30° (330°)
// Segment 1 (Engagement/Teal): bottom-right, centered at 90°
// Segment 2 (Expansion/Magenta): bottom-left, centered at 210°
const SEG_STARTS = [
  -90 + GAP_DEG / 2,              // top
  -90 + 120 + GAP_DEG / 2,        // bottom-right
  -90 + 240 + GAP_DEG / 2,        // bottom-left
];

function polarToXY(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polarToXY(cx, cy, r, startDeg);
  const e = polarToXY(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}

// Node positions: 3 per segment, evenly distributed along the arc
function getNodePositions(segIndex: number): { x: number; y: number; deg: number }[] {
  const start = SEG_STARTS[segIndex];
  const positions: { x: number; y: number; deg: number }[] = [];
  for (let i = 0; i < 3; i++) {
    const deg = start + (SEG_SPAN / 4) * (i + 1);
    const p = polarToXY(RING_CX, RING_CY, RING_R, deg);
    positions.push({ x: p.x, y: p.y, deg });
  }
  return positions;
}

interface RingSVGProps {
  activeSystem: number;
  activeStage: number;
}

function RingSVG({ activeSystem, activeStage }: RingSVGProps) {
  return (
    <svg
      viewBox={`0 0 ${RING_VIEWBOX} ${RING_VIEWBOX}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Arc segments */}
      {SYSTEMS.map((sys, si) => {
        const startDeg = SEG_STARTS[si];
        const endDeg = startDeg + SEG_SPAN;
        const isActive = activeSystem === si;
        return (
          <path
            key={`arc-${si}`}
            d={describeArc(RING_CX, RING_CY, RING_R, startDeg, endDeg)}
            fill="none"
            stroke={sys.color}
            strokeWidth={RING_STROKE}
            strokeLinecap="butt"
            opacity={isActive ? 1.0 : 0.25}
            style={{ transition: "opacity 0.5s ease" }}
          />
        );
      })}

      {/* Node markers */}
      {SYSTEMS.map((sys, si) => {
        const nodes = getNodePositions(si);
        const isActiveSys = activeSystem === si;
        return nodes.map((node, ni) => {
          const isActiveNode = isActiveSys && activeStage === ni;
          const nodeOpacity = isActiveSys
            ? (activeStage > ni ? 0.6 : isActiveNode ? 1.0 : 0.3)
            : 0.15;
          const StageIcon = sys.stages[ni].icon;
          return (
            <g key={`node-${si}-${ni}`} style={{ transition: "opacity 0.3s ease" }} opacity={nodeOpacity}>
              {/* Glow behind active node */}
              {isActiveNode && (
                <circle
                  cx={node.x} cy={node.y} r={28}
                  fill={sys.color} opacity={0.15}
                />
              )}
              {/* Dark circle background */}
              <circle
                cx={node.x} cy={node.y} r={22}
                fill="#2A2A2A"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1}
              />
              {/* Icon */}
              <foreignObject
                x={node.x - 10} y={node.y - 10}
                width={20} height={20}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20 }}>
                  <StageIcon size={18} color="rgba(246,245,242,0.8)" />
                </div>
              </foreignObject>
            </g>
          );
        });
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NODE DESCRIPTION CARD
   ═══════════════════════════════════════════════════════════════════════════ */

interface NodeCardProps {
  stage: StageData;
  color: string;
  position: { top: string; left: string };
  visible: boolean;
}

function NodeCard({ stage, color, position, visible }: NodeCardProps) {
  return (
    <div style={{
      position: "absolute",
      top: position.top,
      left: position.left,
      width: 240,
      background: "#FFFFFF",
      borderLeft: `4px solid ${color}`,
      borderRadius: 3,
      padding: "14px 18px",
      boxShadow: "2px 4px 16px rgba(0,0,0,0.2)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.25s ease, transform 0.25s ease",
      pointerEvents: "none",
      zIndex: 10,
    }}>
      <h4 style={{
        fontSize: 18, fontWeight: 700, color: "#1A1A1A",
        margin: "0 0 6px", lineHeight: 1.2,
        fontFamily: FONT,
      }}>
        {stage.name}
      </h4>
      <p style={{
        fontSize: 14, fontWeight: 400, color: "#5B6670",
        lineHeight: 1.5, margin: 0,
        fontFamily: FONT,
      }}>
        {stage.description}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL PANEL (right side)
   ═══════════════════════════════════════════════════════════════════════════ */

const FONT = "'Source Sans 3', 'DM Sans', 'Inter', system-ui, sans-serif";

function EditorialPanel({ system, visible }: { system: SystemData; visible: boolean }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      pointerEvents: visible ? "auto" : "none",
    }}>
      {/* Eyebrow */}
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
        textTransform: "uppercase", color: system.color,
        margin: "0 0 16px", fontFamily: FONT,
      }}>
        {system.number} {system.label}
      </p>

      {/* Headline */}
      <h3 style={{
        fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 800,
        color: "#F6F5F2", lineHeight: 1.0,
        margin: "0 0 20px", fontFamily: FONT,
      }}>
        {system.headline}
      </h3>

      {/* Problem quote */}
      <p style={{
        fontSize: 17, fontWeight: 400, fontStyle: "italic",
        color: "rgba(246,245,242,0.5)", lineHeight: 1.5,
        margin: "0 0 24px", maxWidth: 520, fontFamily: FONT,
      }}>
        {system.question}
      </p>

      {/* Body headline */}
      <p style={{
        fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 700,
        color: "#F6F5F2", lineHeight: 1.25,
        margin: "0 0 16px", maxWidth: 520, fontFamily: FONT,
      }}>
        {system.overview.split(".")[0]}.
      </p>

      {/* Body copy */}
      <p style={{
        fontSize: 15, fontWeight: 300,
        color: "rgba(246,245,242,0.7)", lineHeight: 1.65,
        margin: "0 0 32px", maxWidth: 520, fontFamily: FONT,
      }}>
        {system.overview}
      </p>

      {/* Client result */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: 20,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
          <span style={{
            fontSize: 36, fontWeight: 800, color: system.color,
            lineHeight: 1, fontFamily: FONT,
          }}>
            {system.client.metric}
          </span>
          <span style={{
            fontSize: 15, fontWeight: 300, color: "rgba(246,245,242,0.6)",
            fontFamily: FONT,
          }}>
            {system.client.label}
          </span>
        </div>
        <p style={{
          fontSize: 14, fontWeight: 400, color: "rgba(246,245,242,0.4)",
          margin: 0, fontFamily: FONT,
        }}>
          &mdash; {system.client.name}, {system.client.title}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE FALLBACK
   ═══════════════════════════════════════════════════════════════════════════ */

function MobileFallback() {
  return (
    <section style={{ background: "#1A1A1A", fontFamily: FONT, padding: "48px 24px" }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#1FA7A2", margin: "0 0 8px" }}>HOW IT WORKS</p>
      <h2 style={{ fontSize: 32, fontWeight: 900, color: "#F6F5F2", lineHeight: 0.95, margin: "0 0 12px" }}>Each system compounds.</h2>
      <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(246,245,242,0.6)", maxWidth: 440, margin: "0 0 36px", lineHeight: 1.55 }}>
        Signals from acquisition inform deal engagement. Deal signals trigger expansion. Expansion generates referrals that feed acquisition.
      </p>
      {SYSTEMS.map((sys) => (
        <div key={sys.key} style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 56, fontWeight: 200, color: sys.color, opacity: 0.2, lineHeight: 1, display: "block" }}>{sys.number}</span>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: sys.color, margin: "8px 0 8px" }}>{sys.label}</p>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: "#F6F5F2", margin: "0 0 6px" }}>{sys.headline}</h3>
          <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(246,245,242,0.6)", lineHeight: 1.5, margin: "0 0 16px" }}>{sys.overview}</p>
          {sys.stages.map((stage) => (
            <div key={stage.name} style={{ background: "#2A2A2A", borderRadius: 8, padding: "14px 16px", borderLeft: `3px solid ${sys.color}`, marginBottom: 8 }}>
              <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: "#F6F5F2", margin: "0 0 4px" }}>{stage.name}</p>
              <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 300, color: "rgba(246,245,242,0.6)", lineHeight: 1.45, margin: 0 }}>{stage.description}</p>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

// Node card positions (relative to the sticky viewport)
// These correspond to where the visible nodes sit on the ring's right edge
const CARD_POSITIONS = [
  // Acquisition (gold) — top segment, nodes in upper-right area
  [
    { top: "22vh", left: "24vw" },
    { top: "40vh", left: "28vw" },
    { top: "58vh", left: "26vw" },
  ],
  // Engagement (teal) — bottom-right segment
  [
    { top: "42vh", left: "28vw" },
    { top: "58vh", left: "26vw" },
    { top: "72vh", left: "20vw" },
  ],
  // Expansion (magenta) — bottom-left segment (partially off-screen, cards near left)
  [
    { top: "58vh", left: "18vw" },
    { top: "42vh", left: "14vw" },
    { top: "26vh", left: "16vw" },
  ],
];

export default function CompoundScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cacheRef = useRef({ top: 0, scrollable: 1 });

  // Load Source Sans 3
  useEffect(() => {
    if (!document.querySelector('link[href*="Source+Sans+3"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const cacheMeasurements = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    cacheRef.current = {
      top: rect.top + window.scrollY,
      scrollable: Math.max(1, wrapper.offsetHeight - window.innerHeight),
    };
  }, []);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    cacheMeasurements();
    window.addEventListener("resize", cacheMeasurements);
    return () => window.removeEventListener("resize", cacheMeasurements);
  }, [cacheMeasurements]);

  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { top, scrollable } = cacheRef.current;
        setProgress(Math.max(0, Math.min(1, (window.scrollY - top) / scrollable)));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) return <MobileFallback />;

  /* ── Phase calculation ──
     0.00-0.08: overview
     0.08-0.35: Acquisition (stages at 8-17%, 17-26%, 26-35%)
     0.35-0.42: transition 1→2
     0.42-0.65: Engagement (stages at 42-50%, 50-57%, 57-65%)
     0.65-0.72: transition 2→3
     0.72-0.92: Expansion (stages at 72-79%, 79-86%, 86-92%)
     0.92-1.00: exit
  */

  const activeSystem = (() => {
    if (progress < 0.08) return 0; // show Acquisition from the start
    if (progress < 0.385) return 0;
    if (progress < 0.42) return -1; // transition
    if (progress < 0.685) return 1;
    if (progress < 0.72) return -1; // transition
    if (progress < 0.92) return 2;
    return 2;
  })();

  // Which system's editorial content is visible (persists during transitions)
  const visibleSystem = (() => {
    if (progress < 0.385) return 0;
    if (progress < 0.42) return progress < 0.40 ? 0 : 1;
    if (progress < 0.685) return 1;
    if (progress < 0.72) return progress < 0.70 ? 1 : 2;
    return 2;
  })();

  // Active stage within the current system (0, 1, 2, or -1)
  const activeStage = (() => {
    if (activeSystem === 0) {
      if (progress < 0.08) return -1;
      if (progress < 0.17) return 0;
      if (progress < 0.26) return 1;
      if (progress < 0.35) return 2;
      return 2;
    }
    if (activeSystem === 1) {
      if (progress < 0.42) return -1;
      if (progress < 0.50) return 0;
      if (progress < 0.57) return 1;
      if (progress < 0.65) return 2;
      return 2;
    }
    if (activeSystem === 2) {
      if (progress < 0.72) return -1;
      if (progress < 0.79) return 0;
      if (progress < 0.86) return 1;
      if (progress < 0.92) return 2;
      return 2;
    }
    return -1;
  })();

  const sectionOpacity = progress > 0.95 ? 1 - ((progress - 0.95) / 0.05) : 1;

  // Ring sizing: large enough to bleed off left edge
  // Ring diameter = ~75vh, positioned so center is at ~18vw from left
  const ringSize = "max(70vh, 500px)";

  return (
    <div ref={wrapperRef} id="how-it-works-radial" style={{ height: "400vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        background: "#1A1A1A",
        fontFamily: FONT,
        opacity: sectionOpacity,
      }}>
        {/* The ring — positioned to bleed off the left edge */}
        <div style={{
          position: "absolute",
          width: ringSize,
          height: ringSize,
          left: `calc(18vw - ${ringSize} / 2)`,
          top: `calc(50vh - ${ringSize} / 2)`,
          willChange: "transform, opacity",
        }}>
          <RingSVG
            activeSystem={activeSystem >= 0 ? activeSystem : visibleSystem}
            activeStage={activeStage}
          />
        </div>

        {/* Node description cards */}
        {SYSTEMS.map((sys, si) =>
          sys.stages.map((stage, sti) => (
            <NodeCard
              key={`card-${si}-${sti}`}
              stage={stage}
              color={sys.color}
              position={CARD_POSITIONS[si][sti]}
              visible={activeSystem === si && activeStage === sti}
            />
          ))
        )}

        {/* Overview text (shown before first system detail) */}
        {progress < 0.08 && (
          <div style={{
            position: "absolute",
            left: "40vw",
            right: "5vw",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 1 - (progress / 0.08),
          }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "3px",
              textTransform: "uppercase", color: "#1FA7A2",
              margin: "0 0 12px", fontFamily: FONT,
            }}>
              HOW IT WORKS
            </p>
            <h2 style={{
              fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900,
              color: "#F6F5F2", lineHeight: 0.95,
              margin: "0 0 24px", fontFamily: FONT,
            }}>
              Each system compounds.
            </h2>
            <p style={{
              fontSize: 16, fontWeight: 300,
              color: "rgba(246,245,242,0.6)", lineHeight: 1.65,
              maxWidth: 460, margin: "0 0 28px", fontFamily: FONT,
            }}>
              The three systems aren&rsquo;t separate programs. They&rsquo;re one connected architecture.
              Signals from acquisition inform deal engagement. Deal signals trigger expansion.
              Expansion generates referrals that feed acquisition. Every cycle makes the next one smarter.
            </p>
            <p style={{
              fontSize: 13, fontWeight: 500,
              color: "rgba(246,245,242,0.4)", fontFamily: FONT,
            }}>
              Scroll to explore &darr;
            </p>
          </div>
        )}

        {/* Right side editorial panels */}
        <div style={{
          position: "absolute",
          left: "40vw",
          right: "5vw",
          top: "10vh",
          bottom: "10vh",
        }}>
          {SYSTEMS.map((sys, si) => (
            <EditorialPanel
              key={sys.key}
              system={sys}
              visible={progress >= 0.08 && visibleSystem === si}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
