import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const FONT = "'Source Sans 3', 'DM Sans', 'Inter', system-ui, sans-serif";
const BG = "#111111";

/* Active system colors for the outer ring */
const SYSTEM_COLORS = ["#D6B26D", "#C4522A", "#E0247A"];

/* Spotlight angle — where nodes align with the card */
const SPOTLIGHT_DEG = 310;

/* Node data: ALL 9 on the outer circle, 40° apart */
const STAGES = [
  { name: "Detect", desc: "Signal-based targeting matched to ICP. Job changes, funding, hiring surges, tech installs.", baseDeg: 0, system: 0 },
  { name: "Enrich", desc: "Every account mapped: buying committee, tech stack, active signals, CRM gaps filled.", baseDeg: 40, system: 0 },
  { name: "Reach", desc: "Multi-channel outreach fires automatically. Content, LinkedIn, email, personalized by signal.", baseDeg: 80, system: 0 },
  { name: "Map", desc: "Full buying committee identified. Champions, economic buyers, evaluators, influencers.", baseDeg: 120, system: 1 },
  { name: "Nurture", desc: "Behavior-triggered sequences by role and stage. Thought leadership mapped to each stakeholder.", baseDeg: 160, system: 1 },
  { name: "Close", desc: "Deal stall detection. Silence re-engagement. Multi-thread presence across the committee.", baseDeg: 200, system: 1 },
  { name: "Measure", desc: "Post-close signal tracking. Engagement, satisfaction, usage, team growth. All continuous.", baseDeg: 240, system: 2 },
  { name: "Grow", desc: "Cross-sell and upsell triggered by signals, not calendars. Expansion is data-driven.", baseDeg: 280, system: 2 },
  { name: "Refer", desc: "Structured referral activation at 6 months. Every referral feeds back into acquisition.", baseDeg: 320, system: 2 },
];

/* System editorial data */
interface SystemData {
  key: string; number: string; label: string; color: string;
  headline: string; question: string; bodyHeadline: string; overview: string;
  client: { metric: string; label: string; name: string; title: string };
}

const SYSTEMS: SystemData[] = [
  {
    key: "acquisition", number: "01", label: "ACQUISITION SYSTEM", color: "#D6B26D",
    headline: "Fill the pipeline.",
    question: "\u201CWe\u2019re doing outbound but nothing is converting. What are we missing?\u201D",
    bodyHeadline: "Your buyers are already in-market. You\u2019re just not finding them in time.",
    overview: "97% of your market isn\u2019t buying today \u2014 but the ones who will be are already sending signals. Job changes, funding events, hiring patterns, tech installs. Era captures those signals and turns them into targeted outreach before a competitor gets the first meeting. It runs continuously, without a human initiating it.",
    client: { metric: "2\u00D7", label: "qualified pipeline in 90 days", name: "Lara Vandenberg", title: "Founder, Publicist" },
  },
  {
    key: "engagement", number: "02", label: "ENGAGEMENT SYSTEM", color: "#C4522A",
    headline: "Win the room.",
    question: "\u201CWe had a great first meeting. Then it went silent for six weeks.\u201D",
    bodyHeadline: "Your champion said yes. But they\u2019re not the only one deciding.",
    overview: "The average mid-market deal has 10+ people involved in the decision. Your rep is talking to one of them. Era builds presence across the full buying committee: champions, economic buyers, influencers. When deals go quiet, the system re-engages. When new stakeholders appear, they get added automatically.",
    client: { metric: "250", label: "stakeholders in active system", name: "Senior Leader", title: "Enterprise Software" },
  },
  {
    key: "expansion", number: "03", label: "EXPANSION SYSTEM", color: "#E0247A",
    headline: "Grow what you have.",
    question: "\u201COur customers love us but we have no idea when they\u2019re ready to buy more.\u201D",
    bodyHeadline: "Your best new pipeline source is the customers you\u2019ve already closed.",
    overview: "You have happy customers who would expand, refer, and renew \u2014 if someone asked at the right time. Era tracks post-close signals and converts them into expansion conversations, referrals, and renewals automatically. No cold upsell calls. Every conversation is signal-triggered.",
    client: { metric: "0", label: "cold upsell calls", name: "Senior Leader", title: "Ecommerce Operator" },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   GEOMETRY — all in vw, converted to pixels at render time
   ═══════════════════════════════════════════════════════════════════════════

   Outer:  cx=-22vw, cy=50vh, r=50vw, stroke=8vw
           inner edge = r - stroke/2 = 50-4 = 46vw from center
           right edge of circle = cx+r = -22+50 = 28vw ✓

   Middle: cx=-20vw, cy=52vh, r=38vw, stroke=5vw
           outer edge = r + stroke/2 = 38+2.5 = 40.5vw from center
           absolute outer = cx + outer = -20+40.5 = 20.5vw
           GAP from outer inner (28-4=24vw absolute) to middle outer (20.5vw) = 3.5vw ✓

   Inner:  cx=-18vw, cy=48vh, r=28vw, stroke=3.5vw
           outer edge = 28+1.75 = 29.75vw from center
           absolute outer = -18+29.75 = 11.75vw
           Middle inner = -20+(38-2.5) = 15.5vw
           GAP = 15.5 - 11.75 = 3.75vw ✓
   ═══════════════════════════════════════════════════════════════════════════ */

function degToRad(d: number) { return (d * Math.PI) / 180; }

function spotlightDist(angleDeg: number) {
  let d = ((angleDeg - SPOTLIGHT_DEG) % 360 + 360) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

function currentAngle(i: number, rotationDeg: number) {
  return ((STAGES[i].baseDeg + rotationDeg) % 360 + 360) % 360;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HIGHLIGHT CARD — fixed at 16vw, 28vh
   ═══════════════════════════════════════════════════════════════════════════ */

function HighlightCard({ stage, color, visible }: {
  stage: { name: string; desc: string } | null;
  color: string;
  visible: boolean;
}) {
  if (!stage) return null;
  return (
    <div style={{
      position: "absolute",
      left: "16vw",
      top: "28vh",
      width: "18vw",
      maxWidth: 280,
      opacity: visible ? 1 : 0,
      pointerEvents: "none",
      zIndex: 10,
    }}>
      {/* Title box */}
      <div style={{
        background: "rgba(242,242,242,0.94)",
        height: 50,
        padding: "0 16px",
        borderLeft: `4px solid ${color}`,
        display: "flex",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: 28, fontWeight: 700, color: "#1A1A1A",
          fontFamily: FONT,
        }}>
          {stage.name}
        </span>
      </div>
      {/* Description box */}
      <div style={{
        background: "rgba(242,242,242,0.94)",
        padding: "12px 16px",
        borderLeft: `4px solid ${color}`,
        marginTop: 2,
        minHeight: 120,
      }}>
        <p style={{
          fontSize: 16, fontWeight: 500, color: "#333",
          lineHeight: 1.45, margin: 0, fontFamily: FONT,
        }}>
          {stage.desc}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL PANEL — positioned at exact vh offsets
   ═══════════════════════════════════════════════════════════════════════════ */

function EditorialPanel({ system, visible }: { system: SystemData; visible: boolean }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      position: "absolute",
      inset: 0,
      pointerEvents: visible ? "auto" : "none",
    }}>
      {/* Eyebrow — 5vh */}
      <p style={{
        position: "absolute", top: "5vh", left: 0,
        fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
        textTransform: "uppercase", color: system.color,
        margin: 0, fontFamily: FONT,
      }}>
        {system.number} {system.label}
      </p>

      {/* Headline — 8vh */}
      <h3 style={{
        position: "absolute", top: "9vh", left: 0,
        fontSize: "clamp(44px, 4.5vw, 56px)", fontWeight: 800,
        color: "#F6F5F2", lineHeight: 1.0,
        margin: 0, fontFamily: FONT,
      }}>
        {system.headline}
      </h3>

      {/* Problem quote — 20vh */}
      <p style={{
        position: "absolute", top: "20vh", left: 0,
        fontSize: 17, fontWeight: 400, fontStyle: "italic",
        color: "rgba(246,245,242,0.45)", lineHeight: 1.5,
        margin: 0, maxWidth: "50vw", fontFamily: FONT,
      }}>
        {system.question}
      </p>

      {/* Body headline — 28vh (ALIGNS WITH CARD) */}
      <p style={{
        position: "absolute", top: "28vh", left: 0,
        fontSize: "clamp(24px, 2.2vw, 32px)", fontWeight: 700,
        color: "#F6F5F2", lineHeight: 1.25,
        margin: 0, maxWidth: "50vw", fontFamily: FONT,
      }}>
        {system.bodyHeadline}
      </p>

      {/* Body copy — 38vh */}
      <p style={{
        position: "absolute", top: "38vh", left: 0,
        fontSize: 15, fontWeight: 300,
        color: "rgba(246,245,242,0.65)", lineHeight: 1.65,
        margin: 0, maxWidth: "48vw", fontFamily: FONT,
      }}>
        {system.overview}
      </p>

      {/* Client result — 58vh */}
      <div style={{
        position: "absolute", top: "58vh", left: 0,
        borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: system.color, lineHeight: 1, fontFamily: FONT }}>
            {system.client.metric}
          </span>
          <span style={{ fontSize: 15, fontWeight: 300, color: "rgba(246,245,242,0.55)", fontFamily: FONT }}>
            {system.client.label}
          </span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 400, color: "rgba(246,245,242,0.35)", margin: 0, fontFamily: FONT }}>
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
    <section style={{ background: BG, fontFamily: FONT, padding: "48px 24px" }}>
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
          {STAGES.filter((st) => st.system === SYSTEMS.indexOf(sys)).map((st) => (
            <div key={st.name} style={{ background: "#1A1A1A", borderRadius: 8, padding: "14px 16px", borderLeft: `3px solid ${sys.color}`, marginBottom: 8 }}>
              <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: "#F6F5F2", margin: "0 0 4px" }}>{st.name}</p>
              <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 300, color: "rgba(246,245,242,0.6)", lineHeight: 1.45, margin: 0 }}>{st.desc}</p>
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

export default function CompoundScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);
  const cacheRef = useRef({ top: 0, scrollable: 1 });

  // Load Source Sans 3
  useEffect(() => {
    if (!document.querySelector('link[href*="Source+Sans+3"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const cacheMeasurements = useCallback(() => {
    const w = wrapperRef.current;
    if (!w) return;
    const rect = w.getBoundingClientRect();
    cacheRef.current = {
      top: rect.top + window.scrollY,
      scrollable: Math.max(1, w.offsetHeight - window.innerHeight),
    };
    setVw(window.innerWidth);
    setVh(window.innerHeight);
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

  /* ── Convert vw/vh to pixels for SVG ── */
  const toVw = (n: number) => (n / 100) * vw;
  const toVh = (n: number) => (n / 100) * vh;

  /* ── Circle geometry in pixels ── */
  const outerCx = toVw(-22);
  const outerCy = toVh(50);
  const outerR = toVw(50);
  const outerStroke = toVw(8);

  const midCx = toVw(-20);
  const midCy = toVh(52);
  const midR = toVw(38);
  const midStroke = toVw(5);

  const innerCx = toVw(-18);
  const innerCy = toVh(48);
  const innerR = toVw(28);
  const innerStroke = toVw(3.5);

  /* ── Rotation ── */
  const rotation = progress * 360;

  /* ── Active system ── */
  const activeSystem = (() => {
    if (progress < 0.03) return 0;
    if (progress < 0.31) return 0;
    if (progress < 0.36) return -1;
    if (progress < 0.64) return 1;
    if (progress < 0.69) return -1;
    if (progress < 0.97) return 2;
    return 2;
  })();

  const visibleSystem = (() => {
    if (progress < 0.33) return 0;
    if (progress < 0.36) return progress < 0.345 ? 0 : 1;
    if (progress < 0.66) return 1;
    if (progress < 0.69) return progress < 0.675 ? 1 : 2;
    return 2;
  })();

  /* ── Spotlight: find closest node ── */
  let spotlightNodeIdx = -1;
  let minDist = 999;
  for (let i = 0; i < 9; i++) {
    const d = spotlightDist(currentAngle(i, rotation));
    if (d < minDist) { minDist = d; spotlightNodeIdx = i; }
  }
  const showCard = minDist < 15 && progress >= 0.03 && progress < 0.97;
  const activeStage = showCard ? STAGES[spotlightNodeIdx] : null;
  const activeStageColor = activeStage ? SYSTEM_COLORS[activeStage.system] : "#D6B26D";

  const outerColor = SYSTEM_COLORS[activeSystem >= 0 ? activeSystem : visibleSystem];

  /* ── Node positions on the outer circle ── */
  const nodeElements = STAGES.map((stage, i) => {
    const ang = currentAngle(i, rotation);
    const rad = degToRad(ang);
    const nx = outerCx + outerR * Math.cos(rad);
    const ny = outerCy + outerR * Math.sin(rad);

    // Only show nodes in the visible arc (right side of circle)
    const inVisible = ang > 250 || ang < 50;
    if (!inVisible) return null;

    const sysIdx = stage.system;
    const isOnActive = sysIdx === (activeSystem >= 0 ? activeSystem : visibleSystem);
    const isSpotlit = i === spotlightNodeIdx && showCard;
    const opacity = isSpotlit ? 1.0 : isOnActive ? 0.6 : 0.25;

    const dotR = toVw(1.5); // ~22px at 1440

    return (
      <circle
        key={`node-${i}`}
        cx={nx}
        cy={ny}
        r={dotR}
        fill="rgba(200,195,185,0.6)"
        opacity={opacity}
      />
    );
  });

  const sectionOpacity = progress > 0.97 ? 1 - ((progress - 0.97) / 0.03) : 1;

  return (
    <div ref={wrapperRef} id="how-it-works-radial" style={{ height: "450vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        background: BG,
        fontFamily: FONT,
        opacity: sectionOpacity,
      }}>

        {/* ── SVG: viewport-sized, circles positioned with pixel values ── */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${vw} ${vh}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            willChange: "transform",
          }}
        >
          {/* Outer circle — color changes with system */}
          <circle
            cx={outerCx} cy={outerCy} r={outerR}
            fill="none" stroke={outerColor}
            strokeWidth={outerStroke} opacity={1.0}
          />
          {/* Middle circle — decorative */}
          <circle
            cx={midCx} cy={midCy} r={midR}
            fill="none" stroke="#1FA7A2"
            strokeWidth={midStroke} opacity={0.3}
          />
          {/* Inner circle — decorative */}
          <circle
            cx={innerCx} cy={innerCy} r={innerR}
            fill="none" stroke="#E0247A"
            strokeWidth={innerStroke} opacity={0.25}
          />

          {/* Node markers on outer circle */}
          {nodeElements}
        </svg>

        {/* ── Highlight card — fixed at 16vw, 28vh ── */}
        <HighlightCard
          stage={activeStage}
          color={activeStageColor}
          visible={showCard}
        />

        {/* ── Overview text ── */}
        {progress < 0.05 && (
          <div style={{
            position: "absolute",
            left: "38vw",
            right: "5vw",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 1 - (progress / 0.05),
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#1FA7A2", margin: "0 0 8px", fontFamily: FONT }}>
              HOW IT WORKS
            </p>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, color: "#F6F5F2", lineHeight: 0.95, margin: "0 0 24px", fontFamily: FONT }}>
              Each system compounds.
            </h2>
            <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(246,245,242,0.6)", lineHeight: 1.65, maxWidth: 460, margin: "0 0 28px", fontFamily: FONT }}>
              The three systems aren&rsquo;t separate programs. They&rsquo;re one connected architecture.
              Signals from acquisition inform deal engagement. Deal signals trigger expansion.
              Expansion generates referrals that feed acquisition. Every cycle makes the next one smarter.
            </p>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(246,245,242,0.4)", fontFamily: FONT }}>
              Scroll to explore &darr;
            </p>
          </div>
        )}

        {/* ── Right editorial panels at 38vw ── */}
        <div style={{
          position: "absolute",
          left: "38vw",
          right: "5vw",
          top: 0,
          bottom: 0,
        }}>
          {SYSTEMS.map((sys, si) => (
            <EditorialPanel
              key={sys.key}
              system={sys}
              visible={progress >= 0.03 && visibleSystem === si}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
