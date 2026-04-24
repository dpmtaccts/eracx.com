// @ts-nocheck
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import StagingLayout from '../../components/StagingLayout';

/* ------------------------------------------------------------------ */
/*  V4 — The Infinity Scroll                                           */
/*  Scroll-driven lemniscate experience for ERA's three-engine system  */
/* ------------------------------------------------------------------ */

// --- Types ---
interface Stage {
  name: string;
  description: string;
}

interface EngineData {
  number: string;
  label: string;
  color: string;
  headline: string;
  problem: string;
  idea: string;
  stages: Stage[];
  resultMetric: string;
  resultLabel: string;
  resultAttribution: string;
}

// --- Constants ---
const COLORS = {
  teal: '#1FA7A2',
  terracotta: '#C4522A',
  magenta: '#E0247A',
  bg: '#1A1A1A',
  divider: '#D7DADD',
  cardBg: '#FFFFFF',
  textDark: '#383838',
  textMuted: '#5B6670',
};

const ENGINES: EngineData[] = [
  {
    number: '01',
    label: 'ACQUISITION',
    color: COLORS.teal,
    headline: 'Fill the pipeline.',
    problem: '"We\'re doing outbound but nothing is converting. What are we missing?"',
    idea: 'Your buyers are already in-market. You\'re just not finding them in time.',
    stages: [
      { name: 'Detect', description: 'Signal-based targeting matched to ICP. Job changes, funding, hiring surges, tech installs.' },
      { name: 'Enrich', description: 'Every account mapped: buying committee, tech stack, active signals, CRM gaps filled.' },
      { name: 'Reach', description: 'Multi-channel outreach fires automatically. Content, LinkedIn, email, personalized by signal.' },
    ],
    resultMetric: '2\u00D7',
    resultLabel: 'qualified pipeline in 90 days',
    resultAttribution: 'Lara Vandenberg, Founder, Publicist',
  },
  {
    number: '02',
    label: 'ENGAGEMENT',
    color: COLORS.terracotta,
    headline: 'Win the room.',
    problem: '"We had a great first meeting. Then it went silent for six weeks."',
    idea: 'The average mid-market deal has 10+ people involved. Your rep is talking to one.',
    stages: [
      { name: 'Map', description: 'Full buying committee identified. Champions, economic buyers, evaluators, influencers.' },
      { name: 'Nurture', description: 'Behavior-triggered sequences by role and stage. Thought leadership mapped to each stakeholder.' },
      { name: 'Close', description: 'Deal stall detection. Silence re-engagement. Multi-thread presence across the committee.' },
    ],
    resultMetric: '250',
    resultLabel: 'stakeholders in active system',
    resultAttribution: 'Senior Leader, Enterprise Software',
  },
  {
    number: '03',
    label: 'EXPANSION',
    color: COLORS.magenta,
    headline: 'Grow what you have.',
    problem: '"Our customers love us but we have no idea when they\'re ready to buy more."',
    idea: 'Your best new pipeline source is the customers you\'ve already closed.',
    stages: [
      { name: 'Measure', description: 'Post-close signal tracking. Engagement, satisfaction, usage, team growth.' },
      { name: 'Grow', description: 'Cross-sell and upsell triggered by signals, not calendars.' },
      { name: 'Refer', description: 'Structured referral activation at 6 months. Every referral feeds back into acquisition.' },
    ],
    resultMetric: '0',
    resultLabel: 'cold upsell calls',
    resultAttribution: 'Senior Leader, Ecommerce Operator',
  },
];

const SCROLL_HEIGHT = 500; // vh

/* ------------------------------------------------------------------ */
/*  Lemniscate Math                                                    */
/*  x = a*cos(t) / (1 + sin²(t))                                     */
/*  y = a*sin(t)*cos(t) / (1 + sin²(t))                              */
/* ------------------------------------------------------------------ */

function lemniscatePoint(t: number, a: number): { x: number; y: number } {
  const sinT = Math.sin(t);
  const cosT = Math.cos(t);
  const denom = 1 + sinT * sinT;
  return {
    x: (a * cosT) / denom,
    y: (a * sinT * cosT) / denom,
  };
}

/** Generate an SVG path string for the full lemniscate */
function buildLemniscatePath(a: number, cx: number, cy: number, steps = 360): string {
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const p = lemniscatePoint(t, a);
    const cmd = i === 0 ? 'M' : 'L';
    points.push(`${cmd}${cx + p.x},${cy + p.y}`);
  }
  return points.join(' ') + ' Z';
}

/** Get a point on the lemniscate for a given normalized parameter [0,1] */
function getLemniscatePointAt(
  progress: number,
  a: number,
  cx: number,
  cy: number
): { x: number; y: number } {
  const t = progress * 2 * Math.PI;
  const p = lemniscatePoint(t, a);
  return { x: cx + p.x, y: cy + p.y };
}

/**
 * Map scroll progress [0,1] to a parameter on the lemniscate path.
 * The path sections are:
 *   Acquisition (left-top):  t roughly from 0 to PI/2  (top-right of left loop going up & around)
 *   Engagement (right loop): t roughly from PI/2 to 3PI/2 (full right loop)
 *   Expansion (left-bottom): t roughly from 3PI/2 to 2PI (bottom of left loop)
 *
 * We map scroll ranges to path parameter ranges:
 *   0.00-0.08: overview (show full path, dot at center)
 *   0.08-0.35: Acquisition — left loop top half,  t: 0.75PI -> 0.25PI (going clockwise from top-left)
 *   0.35-0.40: transition through center
 *   0.40-0.63: Engagement — right loop, t: 0.25PI -> -0.25PI (= 1.75PI)
 *   0.63-0.68: transition through center
 *   0.68-0.90: Expansion — left loop bottom half, t: 1.75PI -> 1.25PI
 *   0.90-1.00: completion loop
 */

// Remap the lemniscate so the path flows naturally:
// Left-top (Acquisition): t in [PI/4, 3PI/4] — left loop upper half
// Right loop (Engagement): t in [-PI/4, PI/4] mapped via [7PI/4, 2PI] U [0, PI/4] — but simpler to use continuous
// Left-bottom (Expansion): t in [3PI/4, 5PI/4] — left loop lower half
//
// Actually, let's think about the lemniscate shape:
// At t=0: rightmost point (center-right area since x=a, y=0... wait)
// Let me recalculate. For standard lemniscate of Bernoulli:
//   t=0: x=a, y=0 (rightmost)
//   t=PI/4: x≈0.8a, y≈0.4a (upper-right)
//   t=PI/2: x=0, y=0 (center/crossing) — actually let's check: sin(PI/2)=1, cos(PI/2)=0, denom=2 → x=0, y=0. Yes, center.
//   t=3PI/4: left side
//   t=PI: x=-a, y=0... wait: cos(PI)=-1, sin(PI)=0, denom=1 → x=-a, y=0 (leftmost)
//   t=3PI/2: sin=-1, cos=0, denom=2 → x=0, y=0 (center again)
//
// So the path goes: right → upper-right → center → left-upper → leftmost → left-lower → center → lower-right → right
// That means:
//   Right loop (upper half): t in [0, PI/2]
//   Left loop: t in [PI/2, 3PI/2]
//   Right loop (lower half): t in [3PI/2, 2PI]
//
// For our mapping:
//   Acquisition = left loop top = t in [PI/2, PI] (center to leftmost going up)
//   Expansion = left loop bottom = t in [PI, 3PI/2] (leftmost to center going down)
//   Engagement = right loop = t in [3PI/2, 2PI] + [0, PI/2]
//
// Let's use a continuous parameter and remap.

function scrollToPathT(scroll: number): number {
  // Map scroll progress to lemniscate parameter t
  // We want the journey to feel like:
  //   Start at center crossing → go into left loop top (Acquisition) →
  //   come back to center → go into right loop (Engagement) →
  //   come back to center → go into left loop bottom (Expansion) →
  //   return to center

  // Lemniscate crossing is at t = PI/2 and t = 3PI/2
  // Left loop top: PI/2 → PI
  // Left loop bottom: PI → 3PI/2
  // Right loop: 3PI/2 → 2PI → 0 → PI/2 (wraps around)

  // Desired scroll mapping:
  //   0.00-0.08: at center (t = PI/2)
  //   0.08-0.35: Acquisition: t from PI/2 → PI (left loop, upper)
  //   0.35-0.40: transition: t from PI → 3PI/2 — wait, that's left-bottom

  // Let me reconsider. For visual clarity, let's define custom ranges:
  //   Acquisition (left-top): t from PI/2 to PI (going from center to leftmost, upper arc)
  //   Transition: t from PI (leftmost) then we need to go backwards through center to right loop
  //   This doesn't flow well with a single continuous parameter.

  // Better approach: just map scroll to t linearly around the full loop.
  // t=0 to 2PI traces the full figure-eight. We start at t=0 (rightmost).
  // But let's offset so we start at the center crossing.
  // Center is at t=PI/2. So offset = PI/2.
  // Full path: t from PI/2 to PI/2+2PI

  // Scroll 0-0.08: hold at start
  // Scroll 0.08-0.90: map linearly through full path
  // Scroll 0.90-1.00: hold at end / continue

  if (scroll <= 0.08) return Math.PI * 0.5;
  if (scroll >= 0.90) {
    // Complete the loop
    const localT = Math.min((scroll - 0.90) / 0.10, 1);
    return Math.PI * 0.5 + 2 * Math.PI * (1 + localT * 0.05);
  }

  const normalizedScroll = (scroll - 0.08) / (0.90 - 0.08); // 0 to 1
  return Math.PI * 0.5 + normalizedScroll * 2 * Math.PI;
}

/** Determine which engine is active based on scroll position */
function getActiveEngine(scroll: number): number {
  if (scroll < 0.08) return -1; // overview
  if (scroll < 0.35) return 0;  // Acquisition
  if (scroll < 0.40) return -1; // transition
  if (scroll < 0.63) return 1;  // Engagement
  if (scroll < 0.68) return -1; // transition
  if (scroll < 0.90) return 2;  // Expansion
  return -1; // completion
}

/** Get color for a point on the path based on its t parameter */
function getPathColor(t: number): string {
  // Normalize t to [0, 2PI]
  const tn = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  // Left loop: t in [PI/2, 3PI/2]
  //   Upper half (Acquisition): [PI/2, PI]
  //   Lower half (Expansion): [PI, 3PI/2]
  // Right loop: [0, PI/2] and [3PI/2, 2PI]

  if (tn >= Math.PI * 0.5 && tn < Math.PI) return COLORS.teal;       // Acquisition
  if (tn >= Math.PI && tn < Math.PI * 1.5) return COLORS.magenta;    // Expansion
  return COLORS.terracotta;                                            // Engagement
}

/** Build segmented path strings for each engine color */
function buildSegmentedPaths(
  a: number,
  cx: number,
  cy: number,
  steps = 360
): { color: string; path: string }[] {
  // We'll trace the full lemniscate and split into colored segments
  const segments: { color: string; points: string[] }[] = [];
  let currentColor = '';

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const p = lemniscatePoint(t, a);
    const color = getPathColor(t);
    const coord = `${cx + p.x},${cy + p.y}`;

    if (color !== currentColor) {
      // Start a new segment, but include the last point of previous for continuity
      if (segments.length > 0) {
        // Add current point to end of previous segment for seamless join
        segments[segments.length - 1].points.push(`L${coord}`);
      }
      segments.push({ color, points: [`M${coord}`] });
      currentColor = color;
    } else {
      segments[segments.length - 1].points.push(`L${coord}`);
    }
  }

  return segments.map(s => ({ color: s.color, path: s.points.join(' ') }));
}

/** Build the active (progress) stroke path from start to current scroll position */
function buildProgressPath(
  scrollProgress: number,
  a: number,
  cx: number,
  cy: number,
  steps = 360
): { path: string; color: string }[] {
  const startT = Math.PI * 0.5;
  const currentT = scrollToPathT(scrollProgress);
  const totalAngle = currentT - startT;

  if (totalAngle <= 0) return [];

  const numSteps = Math.max(2, Math.round((totalAngle / (2 * Math.PI)) * steps));
  const result: { color: string; points: string[] }[] = [];
  let currentColor = '';

  for (let i = 0; i <= numSteps; i++) {
    const t = startT + (i / numSteps) * totalAngle;
    const p = lemniscatePoint(t, a);
    const color = getPathColor(t);
    const coord = `${cx + p.x},${cy + p.y}`;

    if (color !== currentColor) {
      if (result.length > 0) {
        result[result.length - 1].points.push(`L${coord}`);
      }
      result.push({ color, points: [`M${coord}`] });
      currentColor = color;
    } else {
      result[result.length - 1].points.push(`L${coord}`);
    }
  }

  return result.map(s => ({ color: s.color, path: s.points.join(' ') }));
}

/* ------------------------------------------------------------------ */
/*  Styles (injected via <style> tag)                                  */
/* ------------------------------------------------------------------ */

const STYLE_ID = 'v4-infinity-styles';

const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,700&display=swap');

@keyframes infinityPulse {
  0% { offset-distance: 0%; opacity: 0.3; }
  10% { opacity: 1; }
  50% { opacity: 1; }
  90% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0.3; }
}

@keyframes pulseGlow {
  0%, 100% { filter: blur(4px) brightness(1.5); transform: scale(1); }
  50% { filter: blur(8px) brightness(2); transform: scale(1.4); }
}
`;

/* ------------------------------------------------------------------ */
/*  Editorial Card Component                                           */
/* ------------------------------------------------------------------ */

function EditorialCard({
  engine,
  opacity,
  side,
}: {
  engine: EngineData;
  opacity: number;
  side: 'left' | 'right';
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        [side]: side === 'right' ? '5%' : '5%',
        transform: `translateY(-50%) translateX(${side === 'left' ? '-10px' : '10px'})`,
        width: 440,
        maxWidth: '38vw',
        background: COLORS.cardBg,
        borderRadius: 12,
        padding: '36px 32px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        opacity,
        transition: 'opacity 0.3s ease',
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
        fontFamily: "'Source Sans 3', sans-serif",
        zIndex: 10,
      }}
    >
      {/* Engine number */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: engine.color,
          letterSpacing: 2,
          marginBottom: 4,
        }}
      >
        {engine.number}
      </div>
      {/* Label */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: engine.color,
          letterSpacing: 3,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        {engine.label}
      </div>
      {/* Headline */}
      <h2
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: COLORS.textDark,
          lineHeight: 1.05,
          margin: '0 0 20px 0',
        }}
      >
        {engine.headline}
      </h2>
      {/* Problem quote */}
      <div
        style={{
          borderLeft: `3px solid ${engine.color}`,
          paddingLeft: 16,
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: 17,
            fontStyle: 'italic',
            color: COLORS.textMuted,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {engine.problem}
        </p>
      </div>
      {/* Core idea */}
      <p
        style={{
          fontSize: 15,
          fontWeight: 300,
          color: COLORS.textMuted,
          lineHeight: 1.6,
          margin: '0 0 20px 0',
        }}
      >
        {engine.idea}
      </p>
      {/* Divider */}
      <div
        style={{
          height: 1,
          background: '#E5E7EB',
          margin: '0 0 20px 0',
        }}
      />
      {/* Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {engine.stages.map((stage) => (
          <div
            key={stage.name}
            style={{
              borderLeft: `3px solid ${engine.color}`,
              paddingLeft: 14,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: COLORS.textDark,
                marginBottom: 2,
              }}
            >
              {stage.name}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: COLORS.textMuted,
                lineHeight: 1.5,
              }}
            >
              {stage.description}
            </div>
          </div>
        ))}
      </div>
      {/* Result */}
      <div>
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: engine.color,
          }}
        >
          {engine.resultMetric}
        </span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: COLORS.textDark,
            marginLeft: 8,
          }}
        >
          {engine.resultLabel}
        </span>
        <div
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: COLORS.textMuted,
            marginTop: 4,
          }}
        >
          — {engine.resultAttribution}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage Labels along the path                                        */
/* ------------------------------------------------------------------ */

interface StageLabel {
  text: string;
  t: number;
  color: string;
}

const STAGE_LABELS: StageLabel[] = [
  // Acquisition stages along left-top arc
  { text: 'Detect', t: Math.PI * 0.58, color: COLORS.teal },
  { text: 'Enrich', t: Math.PI * 0.72, color: COLORS.teal },
  { text: 'Reach', t: Math.PI * 0.88, color: COLORS.teal },
  // Engagement stages along right loop
  { text: 'Map', t: Math.PI * 1.62, color: COLORS.terracotta },
  { text: 'Nurture', t: Math.PI * 1.88, color: COLORS.terracotta },
  { text: 'Close', t: Math.PI * 0.12, color: COLORS.terracotta },
  // Expansion stages along left-bottom arc
  { text: 'Measure', t: Math.PI * 1.12, color: COLORS.magenta },
  { text: 'Grow', t: Math.PI * 1.25, color: COLORS.magenta },
  { text: 'Refer', t: Math.PI * 1.38, color: COLORS.magenta },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function V4TimelineRibbon() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // SVG dimensions
  const svgWidth = 1200;
  const svgHeight = 500;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const a = 420; // lemniscate scale — makes it ~80vw wide

  // Inject font and keyframes
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = GLOBAL_STYLES;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    };
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const totalScroll = wrapperRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      setScrollProgress(progress);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Pre-compute paths
  const basePath = useMemo(() => buildLemniscatePath(a, cx, cy), [a, cx, cy]);
  const coloredSegments = useMemo(() => buildSegmentedPaths(a, cx, cy), [a, cx, cy]);

  // Current dot position
  const dotT = scrollToPathT(scrollProgress);
  const dotPos = getLemniscatePointAt((dotT % (2 * Math.PI)) / (2 * Math.PI), a, cx, cy);

  // Active engine
  const activeIdx = getActiveEngine(scrollProgress);
  const activeColor =
    activeIdx >= 0 ? ENGINES[activeIdx].color : COLORS.divider;

  // Progress stroke segments
  const progressSegments = useMemo(
    () => buildProgressPath(scrollProgress, a, cx, cy),
    [scrollProgress, a, cx, cy]
  );

  // Card side: Acquisition & Expansion show card on right, Engagement on left
  const cardSide = activeIdx === 1 ? 'left' : 'right';

  // Card opacity based on scroll ranges
  const cardOpacity = useMemo(() => {
    if (activeIdx < 0) return 0;
    // Fade in during first 15% of engine range, fade out during last 10%
    const ranges = [
      [0.08, 0.35],
      [0.40, 0.63],
      [0.68, 0.90],
    ];
    const [start, end] = ranges[activeIdx];
    const duration = end - start;
    const fadeIn = start + duration * 0.05;
    const fadeOut = end - duration * 0.08;

    if (scrollProgress < fadeIn) return (scrollProgress - start) / (fadeIn - start);
    if (scrollProgress > fadeOut) return (end - scrollProgress) / (end - fadeOut);
    return 1;
  }, [scrollProgress, activeIdx]);

  // Overview text opacity
  const overviewOpacity = scrollProgress < 0.04
    ? 1
    : scrollProgress < 0.10
    ? 1 - (scrollProgress - 0.04) / 0.06
    : 0;

  // Completion text opacity
  const completionOpacity = scrollProgress > 0.92
    ? Math.min(1, (scrollProgress - 0.92) / 0.06)
    : 0;

  // Build a path for the ambient pulse to follow using CSS offset-path
  // We need the path in the SVG coordinate space — we'll position a div and animate it
  const ambientPulsePath = useMemo(() => {
    const points: string[] = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 2 * Math.PI;
      const p = lemniscatePoint(t, a);
      const cmd = i === 0 ? 'M' : 'L';
      points.push(`${cmd}${p.x} ${p.y}`);
    }
    return points.join(' ') + ' Z';
  }, [a]);

  return (
    <StagingLayout stagingId="v4-timeline-ribbon">
    <div
      ref={wrapperRef}
      style={{
        height: `${SCROLL_HEIGHT}vh`,
        position: 'relative',
        background: COLORS.bg,
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* SVG Infinity Path */}
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{
            width: '88vw',
            maxWidth: 1400,
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          fill="none"
        >
          {/* Base stroke — full path in muted gray */}
          <path
            d={basePath}
            stroke={COLORS.divider}
            strokeWidth={6}
            strokeOpacity={0.3}
            fill="none"
          />

          {/* Colored segment strokes — always faintly visible */}
          {coloredSegments.map((seg, i) => (
            <path
              key={`seg-${i}`}
              d={seg.path}
              stroke={seg.color}
              strokeWidth={6}
              strokeOpacity={0.15}
              fill="none"
              strokeLinecap="round"
            />
          ))}

          {/* Active progress stroke */}
          {progressSegments.map((seg, i) => (
            <path
              key={`prog-${i}`}
              d={seg.path}
              stroke={seg.color}
              strokeWidth={20}
              strokeOpacity={0.85}
              fill="none"
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 8px ${seg.color}60)`,
              }}
            />
          ))}

          {/* Stage labels */}
          {STAGE_LABELS.map((label) => {
            const p = lemniscatePoint(label.t, a);
            const px = cx + p.x;
            const py = cy + p.y;
            // Offset label outward from center
            const dx = p.x;
            const dy = p.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const offsetX = (dx / dist) * 28;
            const offsetY = (dy / dist) * 28;

            return (
              <text
                key={label.text}
                x={px + offsetX}
                y={py + offsetY}
                fill={label.color}
                fontSize={11}
                fontFamily="'Source Sans 3', sans-serif"
                fontWeight={600}
                textAnchor="middle"
                dominantBaseline="middle"
                opacity={0.6}
                style={{ letterSpacing: '1.5px', textTransform: 'uppercase' } as React.CSSProperties}
              >
                {label.text}
              </text>
            );
          })}

          {/* Ambient pulse — small bright dot that orbits the path */}
          <circle r={6} fill="white" opacity={0.5}>
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path={buildLemniscatePath(a, 0, 0)}
              rotate="auto"
            >
              <mpath href="#ambientPath" />
            </animateMotion>
          </circle>
          {/* Define the path for animateMotion */}
          <path
            id="ambientPath"
            d={buildLemniscatePath(a, cx, cy)}
            fill="none"
            stroke="none"
          />
          {/* Actual ambient pulse using animateMotion on full path */}
          <circle r={5} fill="white" opacity={0}>
            {/* Hidden — we use the one below */}
          </circle>

          {/* Ambient pulse glow layer */}
          <g>
            <circle r={8} fill="white" opacity={0.25} style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}>
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
              >
                <mpath href="#ambientPath" />
              </animateMotion>
            </circle>
            <circle r={4} fill="white" opacity={0.7}>
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
              >
                <mpath href="#ambientPath" />
              </animateMotion>
            </circle>
          </g>

          {/* Traveling dot — scroll driven */}
          {scrollProgress > 0.06 && (
            <g>
              {/* Glow */}
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r={18}
                fill={activeColor}
                opacity={0.25}
                style={{
                  filter: `blur(6px)`,
                  transition: 'cx 0.05s, cy 0.05s',
                }}
              />
              {/* Dot */}
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r={12}
                fill={activeColor}
                stroke="white"
                strokeWidth={3}
                style={{
                  filter: `drop-shadow(0 0 6px ${activeColor})`,
                  transition: 'cx 0.05s, cy 0.05s',
                }}
              />
            </g>
          )}
        </svg>

        {/* Overview text */}
        {overviewOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              opacity: overviewOpacity,
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 16px 0',
                letterSpacing: '-1px',
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              One loop. Infinite leverage.
            </h1>
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: '#A0A0A0',
                maxWidth: 520,
                margin: '0 auto',
                lineHeight: 1.6,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Three engines. One continuous system. Every customer interaction compounds
              into the next — acquisition feeds engagement, engagement feeds expansion,
              expansion feeds acquisition. No dead ends. No wasted motion.
            </p>
          </div>
        )}

        {/* Completion text */}
        {completionOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              opacity: completionOpacity,
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <h2
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 12px 0',
                letterSpacing: '-0.5px',
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              No beginning. No end.
            </h2>
            <p
              style={{
                fontSize: 22,
                fontWeight: 300,
                color: '#A0A0A0',
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Just compounding.
            </p>
          </div>
        )}

        {/* Editorial Cards */}
        {ENGINES.map((engine, idx) => (
          <EditorialCard
            key={engine.label}
            engine={engine}
            opacity={activeIdx === idx ? cardOpacity : 0}
            side={idx === 1 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
    </StagingLayout>
  );
}