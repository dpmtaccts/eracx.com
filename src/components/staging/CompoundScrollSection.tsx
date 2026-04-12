import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const FONT = "'Source Sans 3', 'DM Sans', 'Inter', system-ui, sans-serif";
const BG = "#111111";

/* Ring definitions in SVG viewBox coordinates (1440×1080)
   Circles shifted far left so outer right edge is at ~30vw.
   Outer:  r=700, stroke=110 → outer edge 755, inner edge 645
   Middle: r=570, stroke=60  → outer edge 600, inner edge 540  (gap: 645-600 = 45px)
   Inner:  r=460, stroke=45  → outer edge 483, inner edge 438  (gap: 540-483 = 57px)
*/
const RINGS = [
  { cx: -380, cy: 540, r: 700, stroke: 110, color: "#D6B26D" }, // outer — color changes with active system
  { cx: -360, cy: 555, r: 570, stroke: 60, color: "#1FA7A2" },  // middle teal — decorative
  { cx: -340, cy: 575, r: 460, stroke: 45, color: "#E0247A" },  // inner magenta — decorative
];

/* Active system colors for the outer ring */
const SYSTEM_COLORS = ["#D6B26D", "#C4522A", "#E0247A"];

/* Spotlight angle — where nodes are "active" (upper-right visible area) */
const SPOTLIGHT_DEG = 330;

/* Node data: ALL 9 nodes on the OUTER circle, evenly spaced at 40° intervals.
   Middle and inner circles are purely visual — no interactive elements. */
const STAGES = [
  // Acquisition (angles 0°, 40°, 80°)
  { name: "Detect", desc: "Signal-based targeting matched to ICP. Job changes, funding, hiring surges, tech installs.", baseDeg: 0, system: 0 },
  { name: "Enrich", desc: "Every account mapped: buying committee, tech stack, active signals, CRM gaps filled.", baseDeg: 40, system: 0 },
  { name: "Reach", desc: "Multi-channel outreach fires automatically. Content, LinkedIn, email, personalized by signal.", baseDeg: 80, system: 0 },
  // Engagement (angles 120°, 160°, 200°)
  { name: "Map", desc: "Full buying committee identified. Champions, economic buyers, evaluators, influencers.", baseDeg: 120, system: 1 },
  { name: "Nurture", desc: "Behavior-triggered sequences by role and stage. Thought leadership mapped to each stakeholder.", baseDeg: 160, system: 1 },
  { name: "Close", desc: "Deal stall detection. Silence re-engagement. Multi-thread presence across the committee.", baseDeg: 200, system: 1 },
  // Expansion (angles 240°, 280°, 320°)
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
    key: "engagement", number: "02", label: "ENGAGEMENT SYSTEM", color: "#1FA7A2",
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
   GEOMETRY HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

function degToRad(d: number) { return (d * Math.PI) / 180; }

/** Get node position on the OUTER ring at a given angle (degrees) */
function nodeXY(angleDeg: number) {
  const ring = RINGS[0]; // all nodes on outer ring
  const rad = degToRad(angleDeg);
  return {
    x: ring.cx + ring.r * Math.cos(rad),
    y: ring.cy + ring.r * Math.sin(rad),
  };
}

/** Current angle for node i given rotation in degrees.
 *  baseDeg is the node's starting position on the circle.
 *  As rotation increases (clockwise), each node moves clockwise. */
function currentAngle(i: number, rotationDeg: number) {
  return ((STAGES[i].baseDeg + rotationDeg) % 360 + 360) % 360;
}

/** Angular distance from the spotlight (0 = at spotlight) */
function spotlightDist(angleDeg: number) {
  let d = ((angleDeg - SPOTLIGHT_DEG) % 360 + 360) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL PANEL
   ═══════════════════════════════════════════════════════════════════════════ */

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
        margin: "0 0 8px", fontFamily: FONT,
      }}>
        {system.number} {system.label}
      </p>

      {/* Headline */}
      <h3 style={{
        fontSize: "clamp(44px, 4.5vw, 64px)", fontWeight: 800,
        color: "#F6F5F2", lineHeight: 1.0,
        margin: "0 0 16px", fontFamily: FONT,
      }}>
        {system.headline}
      </h3>

      {/* Problem quote */}
      <p style={{
        fontSize: 17, fontWeight: 400, fontStyle: "italic",
        color: "rgba(246,245,242,0.45)", lineHeight: 1.5,
        margin: "0 0 28px", maxWidth: 520, fontFamily: FONT,
      }}>
        {system.question}
      </p>

      {/* Body headline */}
      <p style={{
        fontSize: "clamp(24px, 2.2vw, 32px)", fontWeight: 700,
        color: "#F6F5F2", lineHeight: 1.25,
        margin: "0 0 12px", maxWidth: 520, fontFamily: FONT,
      }}>
        {system.bodyHeadline}
      </p>

      {/* Body copy */}
      <p style={{
        fontSize: 15, fontWeight: 300,
        color: "rgba(246,245,242,0.65)", lineHeight: 1.65,
        margin: "0 0 32px", maxWidth: 520, fontFamily: FONT,
      }}>
        {system.overview}
      </p>

      {/* Client result */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
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
   HIGHLIGHT CARD — Two-part frosted card (title + description)
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
      left: "15vw",
      top: "35vh",
      width: "min(280px, 18vw)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.2s ease, transform 0.2s ease",
      pointerEvents: "none",
      zIndex: 10,
    }}>
      {/* Title rectangle */}
      <div style={{
        background: "rgba(242, 242, 242, 0.94)",
        padding: "16px 24px 16px 28px",
        borderLeft: `4px solid ${color}`,
        display: "flex",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: 36, fontWeight: 700, color: "#111111",
          fontFamily: FONT, lineHeight: 1.2,
        }}>
          {stage.name}
        </span>
      </div>
      {/* Description rectangle */}
      <div style={{
        background: "rgba(242, 242, 242, 0.94)",
        padding: "20px 24px 24px 28px",
        borderLeft: `4px solid ${color}`,
        marginTop: 2,
      }}>
        <p style={{
          fontSize: 19, fontWeight: 500, color: "#111111",
          lineHeight: 1.45, margin: 0, fontFamily: FONT,
        }}>
          {stage.desc}
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
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  /* ── Rotation: full 360° across the scroll range ──
     Node i reaches the spotlight at scrollProgress = i/9.
     Active system determined by which nodes are currently passing through.
  */
  const rotation = progress * 360;

  /* ── Active system (which ring is highlighted) ── */
  const activeSystem = (() => {
    if (progress < 0.03) return 0;   // start with Acquisition
    if (progress < 0.31) return 0;   // nodes 0,1,2
    if (progress < 0.36) return -1;  // transition
    if (progress < 0.64) return 1;   // nodes 3,4,5
    if (progress < 0.69) return -1;  // transition
    if (progress < 0.97) return 2;   // nodes 6,7,8
    return 2;
  })();

  const visibleSystem = (() => {
    if (progress < 0.33) return 0;
    if (progress < 0.36) return progress < 0.345 ? 0 : 1;
    if (progress < 0.66) return 1;
    if (progress < 0.69) return progress < 0.675 ? 1 : 2;
    return 2;
  })();

  /* ── Find the node closest to the spotlight ── */
  let spotlightNodeIdx = -1;
  let minDist = 999;
  for (let i = 0; i < 9; i++) {
    const ang = currentAngle(i, rotation);
    const d = spotlightDist(ang);
    if (d < minDist) { minDist = d; spotlightNodeIdx = i; }
  }
  // Only show card if the node is reasonably close to the spotlight (within 18°)
  const showCard = minDist < 18 && progress >= 0.03 && progress < 0.97;
  const activeStage = showCard ? STAGES[spotlightNodeIdx] : null;
  const activeStageColor = activeStage ? SYSTEM_COLORS[activeStage.system] : "#D6B26D";

  /* ── Outer ring color changes with active system ── */
  const outerColor = SYSTEM_COLORS[activeSystem >= 0 ? activeSystem : visibleSystem];

  /* ── Ring opacity: outer always full, middle/inner decorative ── */
  const ringOpacity = (ringIdx: number) => {
    return ringIdx === 0 ? 1.0 : 0.15;
  };

  /* ── Node visibility: all on outer ring, show when in visible arc ── */
  const nodeOpacity = (i: number) => {
    const sysIdx = STAGES[i].system;
    const ang = currentAngle(i, rotation);
    // Visible arc: roughly 260° to 40° (the right portion visible on screen)
    const inVisibleArc = ang > 260 || ang < 40;
    if (!inVisibleArc) return 0;
    const isOnActiveSystem = sysIdx === (activeSystem >= 0 ? activeSystem : visibleSystem);
    const isSpotlit = i === spotlightNodeIdx && showCard;
    if (isSpotlit) return 1.0;
    if (isOnActiveSystem) return 0.65;
    return 0.25;
  };

  const sectionOpacity = progress > 0.97 ? 1 - ((progress - 0.97) / 0.03) : 1;

  return (
    <div ref={wrapperRef} id="how-it-works-radial" style={{ height: "400vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        background: BG,
        fontFamily: FONT,
        opacity: sectionOpacity,
      }}>

        {/* ── SVG: Three concentric circles + node markers ── */}
        <svg
          viewBox="0 0 1440 1080"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* Three COMPLETE circles — no gaps, no segments */}
          {RINGS.map((ring, ri) => (
            <circle
              key={`ring-${ri}`}
              cx={ring.cx}
              cy={ring.cy}
              r={ring.r}
              fill="none"
              stroke={ri === 0 ? outerColor : ring.color}
              strokeWidth={ring.stroke}
              opacity={ringOpacity(ri)}
              style={ri === 0 ? undefined : { transition: "opacity 0.5s ease" }}
            />
          ))}

          {/* Node markers — all on outer ring, rotate with scroll */}
          {STAGES.map((stage, i) => {
            const ang = currentAngle(i, rotation);
            const pos = nodeXY(ang);
            const opacity = nodeOpacity(i);
            const isSpotlit = i === spotlightNodeIdx && showCard;
            if (opacity === 0) return null;
            return (
              <g key={`node-${i}`} style={{ transition: "opacity 0.3s ease" }} opacity={opacity}>
                {/* Outer ring */}
                <circle
                  cx={pos.x} cy={pos.y} r={44}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={1.5}
                />
                {/* Inner filled dot */}
                <circle
                  cx={pos.x} cy={pos.y} r={37}
                  fill={isSpotlit ? "#E8E4DC" : "#D4D0C8"}
                  opacity={0.85}
                />
                {/* Subtle inner shadow */}
                <circle
                  cx={pos.x} cy={pos.y} r={37}
                  fill="none"
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Highlight card (fixed position) ── */}
        <HighlightCard
          stage={activeStage}
          color={activeStageColor}
          visible={showCard}
        />

        {/* ── Overview text (before scroll starts) ── */}
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

        {/* ── Right editorial panels ── */}
        <div style={{
          position: "absolute",
          left: "38vw",
          right: "5vw",
          top: "8vh",
          bottom: "8vh",
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
