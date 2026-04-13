import React, { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── Types ───

interface ThemeColors {
  bg: string;
  surface: string;
  card: string;
  cardAlt: string;
  border: string;
  borderLight: string;
  rust: string;
  rustDim: string;
  rustGlow: string;
  green: string;
  greenDim: string;
  blue: string;
  blueDim: string;
  amber: string;
  amberDim: string;
  magenta: string;
  magentaDim: string;
  highlight: string;
  text: string;
  textMuted: string;
  textDim: string;
  textSubtle: string;
}

interface AuditReportProps {
  data: {
    slug: string;
    profile: {
      name: string;
      headline: string;
      company: string;
      location: string;
      followers: number;
      bannerText: string;
      profilePhoto: string;
    };
    meta: {
      followers: number;
      postsAnalyzed: number;
      commentsAnalyzed: number;
      uniqueCommenters: number;
      estimatedImpressions: number;
      weeksCovered: number;
      icpMatches: number;
      pctAbove9Words: number;
      auditDate: string;
      auditWindow: string;
    };
    actionItems: { headline: string; explanation: string; dataPoint: string }[];
    scores: {
      dimension: string;
      score: number;
      benchmark: number;
      topDecile: number;
      label: string;
      question: string;
      findings: string[];
      topRecommendation: string;
      potentialImpact: string;
    }[];
    funnelTiers: {
      tier: "TOP" | "MIDDLE" | "BOTTOM";
      label: string;
      postCount: number;
      percentOfTotal: number;
      avgReactions: number;
      avgComments: number;
      currentMix: number;
      recommendedMix: number;
    }[];
    posts: {
      date: string;
      summary: string;
      theme: string;
      tier: "TOP" | "MIDDLE" | "BOTTOM";
      format: string;
      reactions: number;
      comments: number;
      reposts: number;
      estimatedImpressions: number;
      hookType: string;
    }[];
    commentWordCounts: { bucket: string; count: number }[];
    threadDepths: { postSummary: string; maxDepth: number; authorParticipated: boolean }[];
    replyScorecard: {
      totalAuthorReplies: number;
      avgReplyWordCount: number;
      repliesOver9Words: number;
      repliesOver15Words: number;
      replyRate: number;
      avgReplyTime: string;
      missedICPComments: { name: string; headline: string; commentWordCount: number; postTopic: string }[];
    };
    silentBuyer: {
      visibleEngagers: number;
      estimatedSilentReaders: number;
      icpAmongVisible: number;
      estimatedICPAmongSilent: number;
      visibleCategories: { label: string; count: number; color: string }[];
    };
    signalMap: {
      signal: string;
      weight: string;
      yourScore: "strong" | "moderate" | "weak" | "missing";
      note: string;
    }[];
    roadmap: { phase: string; timeframe: string; items: string[] }[];
    password?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editorial?: any;
  };
}

// ─── Theme constants ───

const LIGHT: ThemeColors = {
  bg: "#F7F5F2",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  cardAlt: "#FAFAF8",
  border: "#E8E4DE",
  borderLight: "#F0EDEA",
  rust: "#B8512D",
  rustDim: "rgba(184,81,45,0.07)",
  rustGlow: "rgba(184,81,45,0.14)",
  green: "#2E8B57",
  greenDim: "rgba(46,139,87,0.07)",
  blue: "#3A7EAA",
  blueDim: "rgba(58,126,170,0.08)",
  amber: "#B8862D",
  amberDim: "rgba(184,134,45,0.08)",
  magenta: "#D01450",
  magentaDim: "rgba(208,20,80,0.07)",
  highlight: "#6B6500",
  text: "#1C1916",
  textMuted: "#6B6560",
  textDim: "#9A948E",
  textSubtle: "#C4BEB6",
};

const DARK: ThemeColors = {
  bg: "#0A0A0A",
  surface: "#111111",
  card: "#151514",
  cardAlt: "#1A1A19",
  border: "#222221",
  borderLight: "#2A2A29",
  rust: "#C85A3A",
  rustDim: "rgba(200,90,58,0.12)",
  rustGlow: "rgba(200,90,58,0.2)",
  green: "#44C878",
  greenDim: "rgba(68,200,120,0.1)",
  blue: "#4AADE8",
  blueDim: "rgba(74,173,232,0.1)",
  amber: "#E8A834",
  amberDim: "rgba(232,168,52,0.1)",
  magenta: "#E8175D",
  magentaDim: "rgba(232,23,93,0.1)",
  highlight: "#D4E847",
  text: "#F5F0EB",
  textMuted: "#999",
  textDim: "#666",
  textSubtle: "#444",
};

const ThemeCtx = createContext<ThemeColors>(LIGHT);
function useTheme() { return useContext(ThemeCtx); }

// ─── Hooks ───

function useInView(t = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

// ─── Circular Gauge ───

function Gauge({ score, max = 100, label, color, size = 130 }: { score: number; max?: number; label: string; color: string; size?: number }) {
  const C = useTheme();
  const [pct, setPct] = useState(0);
  const [ref, inView] = useInView(0.3);
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;
  useEffect(() => { if (inView) setTimeout(() => setPct((score / max) * 100), 100); }, [inView, score, max]);
  const grade = pct >= 80 ? "A" : pct >= 65 ? "B" : pct >= 50 ? "C" : pct >= 35 ? "D" : "F";
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C === LIGHT ? "#E8E4DE" : C.border} strokeWidth={5} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: size * 0.22, fontWeight: 700, color: C.text }}>{grade}</span>
          <span style={{ fontSize: size * 0.1, color: C.textMuted }}>{score}/{max}</span>
        </div>
      </div>
      <span style={{ fontSize: 10, color: C.textDim, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: 9, fontWeight: 600, color: score >= 80 ? C.green : score >= 60 ? C.amber : C.rust }}>
        {score >= 80 ? "Strong" : score >= 60 ? "Developing" : "Needs work"}
      </span>
    </div>
  );
}

// ─── Signal / Noise Bar ───

function SignalBar({ signal, label }: { signal: number; label: string }) {
  const C = useTheme();
  const [ref, inView] = useInView(0.2);
  const noise = 100 - signal;
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: C.textDim, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ position: "relative", height: 36, borderRadius: 8, background: C === LIGHT ? "#F0EDEA" : C.cardAlt, overflow: "hidden", border: `1px solid ${C.border}` }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: inView ? `${signal}%` : "0%", background: `linear-gradient(90deg, ${C.rust}cc, ${C.rust})`,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          display: "flex", alignItems: "center", paddingLeft: 10,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>Signal {signal}%</span>
        </div>
        <div style={{ position: "absolute", right: 10, top: 0, height: "100%", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: C === LIGHT ? "#6B6500" : C.highlight, background: C === LIGHT ? "rgba(140,140,20,0.1)" : "rgba(212,232,71,0.12)", padding: "2px 8px", borderRadius: 4 }}>{noise}%</span>
          <span style={{ fontSize: 10, color: C.textDim, fontWeight: 500 }}>Noise</span>
        </div>
      </div>
    </div>
  );
}

// ─── Spark Bars ───

function SparkBars({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  const C = useTheme();
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 3, minHeight: 3,
          height: `${(v/max)*100}%`,
          background: i === data.length - 1 ? color : (C === LIGHT ? '#D4CFC8' : `${color}30`),
        }} />
      ))}
    </div>
  );
}

// ─── Rounded Bar Chart ───

function RoundedBarChart({ data, height = 180 }: { data: { label: string; value: number; highlight?: boolean }[]; height?: number }) {
  const C = useTheme();
  const [ref, inView] = useInView(0.2);
  const max = Math.max(...data.map(d => d.value));
  return (
    <div ref={ref}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height, padding: "0 2px" }}>
        {data.map((d, i) => {
          const h = inView ? (d.value / max) * height * 0.85 : 0;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              {d.highlight && inView && (
                <div style={{ background: C.rust, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, position: "relative" }}>
                  {d.value}
                  <div style={{ position: "absolute", bottom: -3, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderTop: `3px solid ${C.rust}` }} />
                </div>
              )}
              <div style={{
                width: "100%", height: h, borderRadius: "10px 10px 4px 4px",
                background: d.highlight ? `linear-gradient(180deg, ${C.rust}, ${C.rust}88)` : (C === LIGHT ? 'linear-gradient(180deg, #E2DDD7, #EBE7E2)' : `linear-gradient(180deg, ${C.border}aa, ${C.border}44)`),
                transition: `height 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.04}s`,
              }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 6, padding: "0 2px" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 9, color: d.highlight ? C.textMuted : C.textSubtle, fontWeight: d.highlight ? 600 : 400 }}>{d.label}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Metric card ───

function Metric({ value, label, sub, color, spark }: { value: string; label: string; sub?: string; color?: string; spark?: number[] }) {
  const C = useTheme();
  const resolvedColor = color ?? C.text;
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{
      padding: "18px 16px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, boxShadow: C === LIGHT ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)",
      transition: "all 0.4s ease",
    }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: resolvedColor, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 3 }}>{value}</div>
      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textDim, margin: "0 0 1px" }}>{label}</p>
      {sub && <p style={{ fontSize: 11, color: C.textSubtle, margin: 0 }}>{sub}</p>}
      {spark && <div style={{ marginTop: 8 }}><SparkBars data={spark} color={resolvedColor === C.text ? C.rust : resolvedColor} height={32} /></div>}
    </div>
  );
}

// ─── Signal Row ───

function SigRow({ mult, title, desc, str, penalty }: { mult: string; title: string; desc: string; str: string; penalty?: boolean }) {
  const C = useTheme();
  const c = str === "STRONG" ? { bg: C.greenDim, text: C.green } : str === "MODERATE" ? { bg: C.amberDim, text: C.amber } : { bg: C.rustDim, text: C.rust };
  return (
    <div style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start" }}>
      <div style={{ width: 40, textAlign: "right", flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: penalty ? C.rust : C.textMuted }}>{mult}</span>
        {penalty && <div style={{ fontSize: 8, fontWeight: 700, color: C.rust }}>(penalty)</div>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 1 }}>{title}</div>
        <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.5 }}>{desc}</div>
      </div>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: c.text, background: c.bg, padding: "3px 8px", borderRadius: 4, flexShrink: 0, alignSelf: "center" }}>{str}</span>
    </div>
  );
}

// ─── Dimension card ───

function DimCard({ name, q, score, bench, top, findings, rec, impact }: { name: string; q: string; score: number; bench: number; top: number; findings: string[]; rec: string; impact: string }) {
  const C = useTheme();
  const [open, setOpen] = useState(false);
  const lbl = score >= 80 ? { t: "STRONG", c: C.green } : score >= 60 ? { t: "DEVELOPING", c: C.amber } : { t: "NEEDS WORK", c: C.rust };
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12 }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div><div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{name}</div><div style={{ fontSize: 12, color: C.textDim }}>{q}</div></div>
        <div style={{ textAlign: "right", marginLeft: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: lbl.c, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: lbl.c, letterSpacing: "0.08em" }}>{lbl.t}</div>
        </div>
      </div>
      <div style={{ padding: "0 20px 12px" }}>
        {[{ l: "Your score", v: score, c: C.rust }, { l: "Benchmark", v: bench, c: C.textMuted }, { l: "Top decile", v: top, c: C.textSubtle }].map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 10, color: C.textDim, width: 64, textAlign: "right" }}>{b.l}</span>
            <div style={{ flex: 1, height: 12, borderRadius: 4, background: C.border, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 4, background: b.c, width: `${b.v}%` }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.text, width: 22, textAlign: "right" }}>{b.v}</span>
          </div>
        ))}
      </div>
      {open && (
        <div style={{ padding: "0 20px 16px", borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: "0 0 6px" }}>FINDINGS</p>
          <ul style={{ margin: "0 0 12px 14px", padding: 0, fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
            {findings.map((f, i) => <li key={i} style={{ marginBottom: 3 }}>{f}</li>)}
          </ul>
          <div style={{ background: C.rustDim, padding: "8px 12px", borderRadius: 8, marginBottom: 6, borderLeft: `3px solid ${C.rust}` }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: C.rust, margin: "0 0 3px", letterSpacing: "0.08em" }}>TOP RECOMMENDATION</p>
            <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>{rec}</p>
          </div>
          <div style={{ background: C.greenDim, padding: "8px 12px", borderRadius: 8, borderLeft: `3px solid ${C.green}` }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: C.green, margin: "0 0 3px", letterSpacing: "0.08em" }}>POTENTIAL IMPACT</p>
            <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>{impact}</p>
          </div>
        </div>
      )}
      <div onClick={() => setOpen(!open)} style={{ padding: "8px 20px", borderTop: `1px solid ${C.border}`, cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.rust, textAlign: "center", background: C.cardAlt }}>
        {open ? "Collapse" : "View findings & recommendations"}
      </div>
    </div>
  );
}

// ─── Funnel bar with target ───

function FunnelBar({ label, pct, target, color }: { label: string; pct: number; target: number; color: string }) {
  const C = useTheme();
  const [ref, inView] = useInView(0.2);
  const diff = pct - target;
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{label}</span>
        <span style={{ fontSize: 12, color: C.textDim }}>{pct}% → {target}%</span>
      </div>
      <div style={{ position: "relative", height: 28, borderRadius: 8, background: C.border, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 8, background: color, width: inView ? `${pct}%` : "0%", transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${target}%`, display: "flex", alignItems: "center" }}>
          <div style={{ width: 2, height: "100%", background: C.text, opacity: 0.7 }} />
          <span style={{ fontSize: 8, fontWeight: 700, color: C.text, background: C.bg, padding: "1px 5px", borderRadius: 3, marginLeft: 3, letterSpacing: "0.06em" }}>TARGET</span>
        </div>
      </div>
      <p style={{ fontSize: 11, fontWeight: 600, color: diff > 0 ? C.rust : C.green, margin: "3px 0 0" }}>
        {diff > 0 ? `Over-indexed by ${diff} points` : `Need ${Math.abs(diff)} points more`}
      </p>
    </div>
  );
}

// ─── Algo hierarchy bar ───

function AlgoBar({ label, w, mult, color }: { label: string; w: number; mult: string; color: string }) {
  const C = useTheme();
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <div style={{
        height: 30, borderRadius: 6, background: color,
        width: inView ? `${w}%` : "0%", transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", alignItems: "center", paddingLeft: 10, minWidth: 70,
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{label}</span>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: C.textDim }}>{mult}</span>
    </div>
  );
}

// ─── Section divider ───

function Divider({ label, title, sub, num }: { label: string; title: string; sub?: string; num?: string }) {
  const C = useTheme();
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{
      padding: "56px 32px 40px", background: C.surface, borderRadius: 20, marginBottom: 24, marginTop: 48,
      border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)",
      transition: "all 0.5s ease",
    }}>
      {num && (
        <span style={{ position: "absolute", top: -10, right: 20, fontSize: 120, fontWeight: 800, color: C === LIGHT ? "#F0EDEA" : C.border, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{num}</span>
      )}
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.rust, margin: "0 0 10px", textTransform: "uppercase", position: "relative", zIndex: 1 }}>{label}</p>
      <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1, margin: "0 0 10px", color: C.text, letterSpacing: "-0.03em", maxWidth: 560, position: "relative", zIndex: 1 }}>{title}</h2>
      {sub && <p style={{ fontSize: 14, color: C.textDim, margin: 0, maxWidth: 500, lineHeight: 1.6, position: "relative", zIndex: 1 }}>{sub}</p>}
    </div>
  );
}

// ─── Phase card ───

function Phase({ name, weeks, items, color }: { name: string; weeks: string; items: string[]; color: string }) {
  const C = useTheme();
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", background: color }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff" }}>{name}</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{weeks}</span>
      </div>
      <div style={{ padding: "10px 18px 14px" }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "baseline" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.textDim, width: 18 }}>{i+1}</span>
            <span style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Helper: get initials ───

function getInitials(name: string): string {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

// ─── Helper: compute posting cadence from posts ───

function computeWeeklyCadence(posts: AuditReportProps["data"]["posts"]): { label: string; value: number; highlight?: boolean }[] {
  if (posts.length === 0) return [];
  const sorted = [...posts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const firstDate = new Date(sorted[0].date);
  const lastDate = new Date(sorted[sorted.length - 1].date);
  const totalWeeks = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1);
  const weekCounts: number[] = new Array(totalWeeks).fill(0);
  for (const post of sorted) {
    const weekIdx = Math.floor((new Date(post.date).getTime() - firstDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    if (weekIdx >= 0 && weekIdx < totalWeeks) weekCounts[weekIdx]++;
  }
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return weekCounts.map((v, i) => {
    const weekDate = new Date(firstDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
    const isFirstOfMonth = i === 0 || weekDate.getMonth() !== new Date(firstDate.getTime() + (i - 1) * 7 * 24 * 60 * 60 * 1000).getMonth();
    const yearStr = weekDate.getFullYear() !== firstDate.getFullYear() ? ` '${String(weekDate.getFullYear()).slice(2)}` : "";
    return {
      label: isFirstOfMonth ? `${months[weekDate.getMonth()]}${yearStr}` : "",
      value: Math.max(v, 0.15),
      highlight: i === weekCounts.length - 1,
    };
  });
}

// ─── Helper: score color ───

function scoreColor(score: number, C: ThemeColors): string {
  if (score >= 80) return C.green;
  if (score >= 60) return C.amber;
  return C.rust;
}

// ─── Password Gate ───

function PasswordGate({ name, headline, slug, onUnlock }: { name: string; headline: string; profilePhoto: string; slug: string; onUnlock: (pw: string) => boolean }) {
  const C = useTheme();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ textAlign: "center", maxWidth: 340 }}>
        <div style={{ width: 64, height: 64, borderRadius: 14, background: C.rust, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff", overflow: "hidden" }}>
          {!imgFailed ? (
            <img src={`/data/${slug}/profile-photo.jpg`} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setImgFailed(true)} />
          ) : (
            getInitials(name)
          )}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 12, color: C.textDim, marginBottom: 24, lineHeight: 1.4 }}>{headline}</div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.rust, margin: "0 0 10px", textTransform: "uppercase" }}>ERACX LINKEDIN AUDIT</p>
        <p style={{ fontSize: 12, color: C.textDim, marginBottom: 20 }}>Enter your password to view the report.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") { const ok = onUnlock(pw); if (!ok) setError(true); } }}
          placeholder="Password"
          style={{
            width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 8,
            border: `1px solid ${error ? C.rust : C.border}`, background: C.card, color: C.text,
            outline: "none", marginBottom: 10, boxSizing: "border-box",
          }}
        />
        {error && <p style={{ fontSize: 11, color: C.rust, margin: "0 0 10px" }}>Incorrect password. Please try again.</p>}
        <button
          onClick={() => { const ok = onUnlock(pw); if (!ok) setError(true); }}
          style={{
            width: "100%", padding: "10px", fontSize: 13, fontWeight: 700, color: "#fff",
            background: C.rust, border: "none", borderRadius: 8, cursor: "pointer", letterSpacing: "0.04em",
          }}
        >
          Unlock Report
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════

export default function AuditReport({ data }: AuditReportProps) {
  const sections = ["START","FUNNEL","COMMENTS","SILENT","SIGNALS","SCORES","BUILD"];
  const [active, setActive] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [unlocked, setUnlocked] = useState(!data.password);
  const [profileImgFailed, setProfileImgFailed] = useState(false);

  const theme = isDark ? DARK : LIGHT;
  const C = theme;

  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (i: number) => (el: HTMLDivElement | null) => { refs.current[i] = el; };

  useEffect(() => {
    const h = () => {
      const y = window.scrollY + 200;
      for (let i = refs.current.length - 1; i >= 0; i--) {
        if (refs.current[i] && refs.current[i]!.offsetTop <= y) { setActive(i); break; }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Computed values from data
  const compositeScore = Math.round(data.scores.reduce((sum, s) => sum + s.score, 0) / data.scores.length);
  const postsPerWeek = data.meta.weeksCovered > 0 ? (data.meta.postsAnalyzed / data.meta.weeksCovered).toFixed(2) : "0";
  const postsSpark = data.posts.map(p => p.reactions || 1);
  const impressionsSpark = [...data.posts].reverse().map(p => p.estimatedImpressions);
  const cadenceData = computeWeeklyCadence(data.posts);
  const totalComments = data.commentWordCounts.reduce((s, c) => s + c.count, 0);
  const aboveCount = data.commentWordCounts.filter(c => {
    const first = parseInt(c.bucket);
    return first >= 9 || c.bucket.includes("26+") || c.bucket.includes("9-") || c.bucket.includes("16-");
  }).reduce((s, c) => s + c.count, 0);
  const belowCount = totalComments - aboveCount;

  const funnelTop = data.funnelTiers.find(f => f.tier === "TOP");
  const funnelMid = data.funnelTiers.find(f => f.tier === "MIDDLE");
  const funnelBot = data.funnelTiers.find(f => f.tier === "BOTTOM");

  const handleUnlock = (pw: string) => {
    if (pw === data.password) {
      setUnlocked(true);
      return true;
    }
    return false;
  };

  if (!unlocked) {
    return (
      <ThemeCtx.Provider value={theme}>
        <PasswordGate
          name={data.profile.name}
          headline={data.profile.headline}
          profilePhoto={data.profile.profilePhoto}
          slug={data.slug}
          onUnlock={handleUnlock}
        />
      </ThemeCtx.Provider>
    );
  }

  // Map signal scores to display strings
  const strengthLabel = (s: string): string => {
    switch (s) {
      case "strong": return "STRONG";
      case "moderate": return "MODERATE";
      case "weak": return "WEAK";
      case "missing": return "WEAK";
      default: return "WEAK";
    }
  };

  return (
    <ThemeCtx.Provider value={theme}>
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans', -apple-system, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: C === LIGHT ? "rgba(247,245,242,0.92)" : "rgba(10,10,10,0.88)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.rust, letterSpacing: "-0.02em" }}>era</span>
            <span style={{ color: C.textSubtle }}>|</span>
            <span style={{ fontSize: 12, color: C.textDim }}>LinkedIn Audit</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: C.textSubtle }}>{data.meta.auditDate} · Confidential</span>
            <button onClick={() => setIsDark(!isDark)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: C.textDim, padding: "2px 6px" }}>
              {isDark ? "\u2600" : "\u25CF"}
            </button>
          </div>
        </div>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 6px", display: "flex", alignItems: "center" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <button onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })} style={{
                fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                color: i <= active ? C.rust : C.textSubtle, background: "none", border: "none", cursor: "pointer", padding: "3px 0",
              }}>{s}</button>
              {i < sections.length - 1 && <div style={{ flex: 1, height: 1, margin: "0 6px", background: i < active ? C.rust : C.border, transition: "background 0.3s" }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* === START === */}
        <div ref={setRef(0)} style={{ paddingTop: 40 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.rust, margin: "0 0 6px", textTransform: "uppercase" }}>ERACX LINKEDIN AUDIT</p>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{data.meta.weeksCovered * 7 >= 350 ? "365" : data.meta.weeksCovered * 7} Days of LinkedIn Activity</h2>
          <p style={{ fontSize: 13, color: C.textDim, margin: "0 0 28px" }}>{data.meta.postsAnalyzed} posts · {data.meta.commentsAnalyzed} comments · {data.meta.uniqueCommenters} unique voices · {data.meta.auditWindow}</p>

          {/* Banner with profile */}
          <div style={{ position: "relative", height: 180, borderRadius: 16, overflow: "hidden", marginBottom: 10, background: C.surface }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/data/${data.slug}/banner.jpg`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: 16, left: 20, display: "flex", alignItems: "flex-end", gap: 12, zIndex: 1 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid #fff", overflow: "hidden", background: C.rust, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {!profileImgFailed ? (
                  <img src={`/data/${data.slug}/profile-photo.jpg`} alt={data.profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setProfileImgFailed(true)} />
                ) : (
                  getInitials(data.profile.name)
                )}
              </div>
              <div style={{ paddingBottom: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{data.profile.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.3 }}>{data.profile.headline.length > 60 ? data.profile.headline.slice(0, 60) + "..." : data.profile.headline}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{data.meta.followers.toLocaleString()} followers</div>
              </div>
            </div>
          </div>

          {/* Bento grid: pure data cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            <Metric value={String(data.meta.postsAnalyzed)} label="POSTS" spark={postsSpark} color={C.rust} />
            <Metric value={String(data.meta.commentsAnalyzed)} label="COMMENTS" sub={`avg ${(data.meta.commentsAnalyzed / Math.max(data.meta.postsAnalyzed, 1)).toFixed(1)} per post`} />
            <Metric value={String(data.meta.weeksCovered)} label="WEEKS" />
            <Metric value={String(data.meta.uniqueCommenters)} label="COMMENTERS" sub={`${data.meta.icpMatches} ICP matches`} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            <Metric value={`~${data.meta.estimatedImpressions.toLocaleString()}`} label="IMPRESSIONS" spark={impressionsSpark} color={C.rust} />
            <div style={{ padding: "18px 16px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, boxShadow: C === LIGHT ? "0 1px 3px rgba(0,0,0,0.04)" : "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: C.green }}>{data.meta.pctAbove9Words}%</div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: "3px 0", textTransform: "uppercase" }}>ABOVE 9-WORD THRESHOLD</p>
              <p style={{ fontSize: 10, color: C.textSubtle, margin: 0, textAlign: "center" }}>9+ words = 3x boost · 15+ = 2.5x</p>
            </div>
            <div style={{ padding: "16px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: "0 0 8px", textTransform: "uppercase" }}>CONTENT FUNNEL</p>
              {[
                { l: "TOP", p: funnelTop?.currentMix ?? 0, c: C.rust },
                { l: "MIDDLE", p: funnelMid?.currentMix ?? 0, c: C.amber },
                { l: "BOTTOM", p: funnelBot?.currentMix ?? 0, c: C.textDim },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: f.c, width: 46 }}>{f.l} {f.p}%</span>
                  <div style={{ flex: 1, height: 7, borderRadius: 4, background: C.border }}>
                    <div style={{ height: "100%", borderRadius: 4, background: f.c, width: `${f.p}%` }} />
                  </div>
                </div>
              ))}
              <p style={{ fontSize: 9, color: C.textSubtle, margin: "6px 0 0" }}>target: {funnelTop?.recommendedMix ?? 37}/{funnelMid?.recommendedMix ?? 38}/{funnelBot?.recommendedMix ?? 25}</p>
            </div>
          </div>

          {/* Gauge row */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${data.scores.length}, 1fr)`, gap: 8, padding: "28px 16px", background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, marginBottom: 28 }}>
            {data.scores.map((s, i) => (
              <Gauge key={i} score={s.score} label={s.dimension} color={scoreColor(s.score, C)} size={95} />
            ))}
          </div>

          {/* Top 3 action items */}
          <div style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.rust, margin: "0 0 6px", textTransform: "uppercase" }}>IF YOU READ ONLY THIS</p>
            <h3 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Three things that will move the needle.</h3>
            {(data.editorial?.actionItems || data.actionItems).map((item: { headline: string; paragraphs?: string[]; explanation?: string; dataPoint: string }, i: number) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 28 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: C.rust, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{i+1}</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 8px", lineHeight: 1.4 }}>{item.headline}</p>
                  {item.paragraphs ? (
                    item.paragraphs.map((para: string, j: number) => (
                      <p key={j} style={{ fontSize: 13, color: C.textMuted, margin: "0 0 10px", lineHeight: 1.7 }}>{para}</p>
                    ))
                  ) : (
                    <p style={{ fontSize: 12, color: C.textDim, margin: "0 0 8px", lineHeight: 1.6 }}>{item.explanation}</p>
                  )}
                  <div style={{ background: C.cardAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", marginTop: 8 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: C.textDim, margin: "0 0 3px", letterSpacing: "0.08em" }}>SUPPORTING DATA</p>
                    <p style={{ fontSize: 11, color: C.textMuted, margin: 0 }}>{item.dataPoint}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === FUNNEL === */}
        <div ref={setRef(1)}>
          <Divider label="CONTENT FUNNEL" title="You're building an audience. But you're not building trust." sub="Every post mapped to awareness, trust, or conversion. See where the gaps are." num="02" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px" }}>Content Funnel Balance</h4>
              {data.funnelTiers.map((ft, i) => (
                <FunnelBar key={i} label={`${ft.tier} (${ft.label})`} pct={ft.currentMix} target={ft.recommendedMix} color={ft.tier === "TOP" ? C.rust : ft.tier === "MIDDLE" ? C.amber : C.textDim} />
              ))}
            </div>
            <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px" }}>Signal Strength by Section</h4>
              {data.funnelTiers.map((ft, i) => (
                <SignalBar key={i} signal={ft.currentMix} label={`${ft.tier} — ${ft.label}`} />
              ))}
            </div>
          </div>
          {/* Funnel editorial callouts (from editorial.json) */}
          {data.editorial?.funnelEditorial && (
            <div style={{ marginBottom: 20 }}>
              {(["TOP", "MIDDLE", "BOTTOM"] as const).map((tier) => {
                const ed = data.editorial.funnelEditorial[tier];
                if (!ed?.callout) return null;
                const tierPosts = data.posts.filter(p => p.tier === tier);
                const tierColor = tier === "TOP" ? C.rust : tier === "MIDDLE" ? C.amber : C.textDim;
                return (
                  <div key={tier} style={{ padding: "18px 22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, borderLeft: `3px solid ${tierColor}`, marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: tierColor, textTransform: "uppercase" }}>{tier} FUNNEL</span>
                      <span style={{ fontSize: 11, color: C.textDim }}>{tierPosts.length} posts</span>
                    </div>
                    <p style={{ fontSize: 13, color: C.textMuted, margin: 0, lineHeight: 1.7 }}>{ed.callout}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>Posting Cadence</h4>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0" }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: C.text }}>{data.meta.postsAnalyzed}</span>
              <span style={{ fontSize: 13, color: C.textDim }}>posts in {data.meta.weeksCovered} weeks</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.rust, background: C.rustDim, padding: "2px 8px", borderRadius: 4 }}>{postsPerWeek}/week</span>
            </div>
            <RoundedBarChart data={cadenceData} height={100} />
          </div>
        </div>

        {/* === COMMENTS === */}
        <div ref={setRef(2)}>
          <Divider label="COMMENT INTELLIGENCE" title="Your comment section is a signal. Here's what it's saying." sub="Who's in your comments, and whether the algorithm cares." num="03" />
          {/* Subsection A: Who's in your comment section? */}
          <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>Who's in your comment section?</h4>
            <p style={{ fontSize: 12, color: C.textDim, margin: "0 0 14px" }}>
              {data.meta.icpMatches} of your {data.meta.uniqueCommenters} unique commenters match your ideal buyer profile.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {data.silentBuyer.visibleCategories.map((cat, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.cardAlt, borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: cat.color }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.textMuted }}>{cat.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: "0 0 10px", textTransform: "uppercase" }}>ARE THEY SAYING ENOUGH FOR THE ALGORITHM TO CARE?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            <div style={{ padding: "32px 22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: C.rust }}>{data.meta.pctAbove9Words}%</div>
              <p style={{ fontSize: 13, color: C.textDim, margin: "4px 0 14px" }}>exceed the 9-word threshold</p>
              <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ width: `${100 - data.meta.pctAbove9Words}%`, background: C.textSubtle }} />
                <div style={{ width: `${data.meta.pctAbove9Words}%`, background: C.rust }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 10, color: C.textSubtle }}>Below ({belowCount})</span>
                <span style={{ fontSize: 10, color: C.textSubtle }}>Above ({aboveCount})</span>
              </div>
            </div>
            <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>Word Count Distribution</h4>
              {data.commentWordCounts.map((d, i) => {
                const first = parseInt(d.bucket);
                const isHighlight = first >= 9 || d.bucket.includes("26+") || d.bucket.includes("9-") || d.bucket.includes("16-");
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: isHighlight ? C.rust : C.textDim, width: 36, textAlign: "right" }}>{d.count}</span>
                    <div style={{ flex: 1, height: 18, borderRadius: 5, background: C.border, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 5, background: isHighlight ? C.rust : C.textSubtle, width: `${(d.count / Math.max(totalComments, 1)) * 100}%` }} />
                    </div>
                    <span style={{ fontSize: 10, color: C.textSubtle, width: 60 }}>{d.bucket}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
            <Metric value={String(data.replyScorecard.avgReplyWordCount)} label="AVG REPLY WORDS" sub="Target: 15+" />
            <Metric value={`${data.replyScorecard.repliesOver9Words}%`} label="REPLIES >9 WORDS" sub="Target: 50%+" />
            <Metric value={`${data.replyScorecard.replyRate}%`} label="REPLY RATE" sub="Target: 90%+" color={data.replyScorecard.replyRate >= 80 ? C.green : C.rust} />
            <Metric value={data.replyScorecard.avgReplyTime || "?"} label="AVG REPLY TIME" sub="Target: <30 min" color={C.textDim} />
          </div>

          {/* Unreplied comments (from editorial.json) */}
          {data.editorial?.unrepliedComments && (() => {
            const uc = data.editorial.unrepliedComments;
            return (
              <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>Unreplied Comments Worth Revisiting</h4>
                <p style={{ fontSize: 11, color: C.textDim, margin: "0 0 14px" }}>Your biggest missed opportunity is not what you post. It is what happens after you post.</p>

                {uc.narrative && uc.narrative.split("\n\n").map((para: string, i: number) => (
                  <p key={i} style={{ fontSize: 12, color: C.textMuted, margin: "0 0 10px", lineHeight: 1.7 }}>{para}</p>
                ))}

                {uc.blockquote && (
                  <div style={{ borderLeft: `3px solid ${C.rust}`, padding: "10px 16px", margin: "14px 0", background: C.rustDim }}>
                    <p style={{ fontSize: 12, color: C.textMuted, margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>{uc.blockquote}</p>
                  </div>
                )}

                {uc.icpMissed && uc.icpMissed.length > 0 && (
                  <>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.rust, margin: "16px 0 8px", textTransform: "uppercase" }}>ICP MATCHES</p>
                    {uc.icpMissed.map((c: { name: string; headline: string; words: number; topic: string }, i: number) => (
                      <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}`, alignItems: "baseline" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{c.name}</span>
                        <span style={{ fontSize: 11, color: C.textDim }}>{c.headline}</span>
                        <span style={{ fontSize: 10, color: C.textSubtle, marginLeft: "auto" }}>{c.words} words on "{c.topic}"</span>
                      </div>
                    ))}
                  </>
                )}

                {uc.otherMissed && uc.otherMissed.length > 0 && (
                  <>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: "16px 0 8px", textTransform: "uppercase" }}>OTHER SUBSTANTIVE COMMENTS</p>
                    {uc.otherMissed.map((c: { name: string; headline: string; words: number; topic: string }, i: number) => (
                      <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}`, alignItems: "baseline" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{c.name}</span>
                        <span style={{ fontSize: 11, color: C.textDim }}>{c.headline}</span>
                        <span style={{ fontSize: 10, color: C.textSubtle, marginLeft: "auto" }}>{c.words} words on "{c.topic}"</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })()}
        </div>

        {/* === SILENT === */}
        <div ref={setRef(3)}>
          <Divider label="SILENT BUYER ANALYSIS" title="For every person who comments, four are watching in silence." sub="The gap between what you can see and what exists." num="04" />
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14, marginBottom: 20 }}>
            <div style={{ padding: "28px 22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: C.text }}>{data.silentBuyer.visibleEngagers}</div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: "3px 0 10px", textTransform: "uppercase" }}>VISIBLE ENGAGERS</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                {data.silentBuyer.visibleCategories.flatMap((cat) =>
                  Array.from({ length: cat.count }).map((_, j) => (
                    <div key={`${cat.label}-${j}`} style={{ width: 14, height: 14, borderRadius: 3, background: cat.color }} />
                  ))
                )}
              </div>
              <p style={{ fontSize: 10, color: C.textSubtle }}>{data.silentBuyer.visibleCategories.map(c => `${c.label} (${c.count})`).join(" · ")}</p>
            </div>
            <div style={{ padding: "28px 22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: C.rust }}>~{data.silentBuyer.estimatedSilentReaders}</div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: "3px 0 10px", textTransform: "uppercase" }}>ESTIMATED SILENT READERS</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
                {Array.from({length: 100}).map((_,i) => <div key={i} style={{ width: 7, height: 7, borderRadius: 2, background: C === LIGHT ? "#E2DDD7" : C.border }} />)}
              </div>
              <p style={{ fontSize: 10, color: C.textSubtle, lineHeight: 1.5 }}>These readers never react publicly. They screenshot and forward to buying committees.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            {[
              { v: `${data.silentBuyer.icpAmongVisible}%`, l: "ICP AMONG VISIBLE", c: C.text },
              { v: `~${data.silentBuyer.estimatedICPAmongSilent}%`, l: "EST. ICP AMONG SILENT", c: C.rust },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderLeft: `4px solid ${d.c}`, background: C.card, borderRadius: "0 12px 12px 0" }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: d.c }}>{d.v}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: C.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{d.l}</span>
              </div>
            ))}
          </div>
          {/* ICP reach calculation */}
          <div style={{ padding: "18px 22px", background: C.cardAlt, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.rust, margin: "0 0 8px", textTransform: "uppercase" }}>CONSERVATIVE ICP EXTRAPOLATION</p>
            <p style={{ fontSize: 13, color: C.textMuted, margin: "0 0 12px", lineHeight: 1.6 }}>
              An estimated <strong style={{ color: C.text }}>{Math.round(data.meta.estimatedImpressions * (data.silentBuyer.icpAmongVisible / 100) * 0.15).toLocaleString()}</strong> potential buyers see your content each month, including people outside your direct network who receive it through shares and algorithm distribution.
            </p>
            <div style={{ background: C.bg, padding: "12px 16px", borderRadius: 8, borderLeft: `3px solid ${C.rust}` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>WHAT THIS MEANS</p>
              <p style={{ fontSize: 12, color: C.textMuted, margin: 0, lineHeight: 1.6 }}>
                {Math.round(data.meta.estimatedImpressions * (data.silentBuyer.icpAmongVisible / 100) * 0.15).toLocaleString()} decision-makers at companies in your target market are reading your posts. They're not commenting. They're not reacting. They're screenshotting and forwarding to buying committees. The question isn't whether they see you. It's whether what they see makes them want to talk to you.
              </p>
            </div>
          </div>
        </div>

        {/* Compute signal headline */}
        {/* === SIGNALS === */}
        <div ref={setRef(4)}>
          <Divider label="ENGAGEMENT SIGNALS" title={
            data.signalMap.filter(s => s.yourScore === "strong").length >= data.signalMap.length / 2
              ? "You're doing the hard things right. Here's where the last 20% lives."
              : "LinkedIn's algorithm has a hierarchy. Your content is triggering the wrong signals."
          } sub="Your content scored against the engagement signals that actually drive distribution." num="05" />
          <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
            <AlgoBar label="Saves" w={28} mult="3-8x" color={C.green} />
            <AlgoBar label="Threaded replies" w={45} mult="15x" color="#5A8A6A" />
            <AlgoBar label="Long comments (9+)" w={62} mult="3-8x" color={C.rust} />
            <AlgoBar label="Short comments" w={82} mult="~1x" color={C === LIGHT ? "#C4BEB6" : C.textDim} />
            <AlgoBar label="Reactions" w={100} mult="1x" color={C === LIGHT ? "#DDD9D4" : C.textSubtle} />
          </div>
          <div style={{ padding: "2px 22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            {data.signalMap.map((sig, i) => (
              <SigRow
                key={i}
                mult={sig.weight}
                title={sig.signal}
                desc={sig.note}
                str={strengthLabel(sig.yourScore)}
                penalty={sig.weight.includes("0.5") || parseFloat(sig.weight) < 1}
              />
            ))}
          </div>
        </div>

        {/* === SCORES === */}
        <div ref={setRef(5)}>
          <Divider label="LINKEDIN BRAND HEALTH SCORE" title="Seven dimensions scored against 1.8M posts." sub="Here's where you stand." num="06" />
          <div style={{ padding: "24px 22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 44, fontWeight: 800 }}>{compositeScore}</span>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: C.textDim, margin: 0, textTransform: "uppercase" }}>COMPOSITE SCORE</p>
                <p style={{ fontSize: 11, color: C.textSubtle, margin: 0 }}>Average across {data.scores.length} dimensions</p>
              </div>
            </div>
            {data.scores.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: C.textDim, width: 88, textAlign: "right", fontWeight: 500 }}>{d.label || d.dimension}</span>
                <div style={{ flex: 1, position: "relative", height: 22, borderRadius: 5, background: C.border }}>
                  <div style={{ height: "100%", borderRadius: 5, background: scoreColor(d.score, C), width: `${d.score}%`, transition: "width 0.8s ease" }} />
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: `${d.benchmark}%`, width: 2, background: C.textDim, opacity: 0.5 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text, width: 24, textAlign: "right" }}>{d.score}</span>
              </div>
            ))}
          </div>
          {data.scores.map((s, i) => (
            <DimCard
              key={i}
              name={s.label || s.dimension}
              q={s.question}
              score={s.score}
              bench={s.benchmark}
              top={s.topDecile}
              findings={s.findings}
              rec={s.topRecommendation}
              impact={s.potentialImpact}
            />
          ))}
        </div>

        {/* === BUILD === */}
        <div ref={setRef(6)}>
          <Divider label="90-DAY BUILD" title="What the next 90 days should look like." sub="A phased plan that connects content to pipeline." num="07" />
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(data.roadmap.length, 3)}, 1fr)`, gap: 10, marginBottom: 20 }}>
            {data.roadmap.map((p, i) => {
              const phaseColor = i === 0 ? C.rust : i === 1 ? C.amber : C.green;
              return (
                <div key={i} style={{ padding: "18px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: phaseColor, margin: "0 0 3px" }}>{p.phase}</p>
                  <p style={{ fontSize: 11, color: C.textDim, margin: "0 0 6px" }}>{p.timeframe}</p>
                  <div style={{ width: 28, height: 2, background: phaseColor, margin: "0 auto 6px", borderRadius: 1 }} />
                </div>
              );
            })}
          </div>
          {data.roadmap.map((p, i) => {
            const phaseColor = i === 0 ? C.rust : i === 1 ? C.amber : C.green;
            return <Phase key={i} name={p.phase} weeks={p.timeframe} items={p.items} color={phaseColor} />;
          })}

          {/* Build additions from editorial.json */}
          {data.editorial?.buildAdditions && (() => {
            const ba = data.editorial.buildAdditions;
            return (
              <>
                {/* Content calendar */}
                {ba.contentCalendar && (
                  <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>The Content Mix (Funnel-Mapped)</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                      {ba.contentCalendar.weeks.map((w: { post1: { tier: string; desc: string }; post2: { tier: string; desc: string } }, i: number) => (
                        <div key={i} style={{ padding: "12px", background: C.cardAlt, borderRadius: 8, border: `1px solid ${C.border}` }}>
                          <p style={{ fontSize: 10, fontWeight: 700, color: C.textDim, margin: "0 0 6px" }}>Week {i + 1}</p>
                          {[w.post1, w.post2].map((p, j) => (
                            <div key={j} style={{ display: "flex", gap: 6, alignItems: "baseline", marginBottom: 4 }}>
                              <span style={{ fontSize: 9, fontWeight: 700, color: p.tier === "TOP" ? C.rust : p.tier === "MIDDLE" ? C.amber : C.green, letterSpacing: "0.06em" }}>{p.tier}</span>
                              <span style={{ fontSize: 11, color: C.textMuted }}>{p.desc}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    {ba.contentCalendar.narrative && ba.contentCalendar.narrative.split("\n\n").map((para: string, i: number) => (
                      <p key={i} style={{ fontSize: 12, color: C.textMuted, margin: "0 0 8px", lineHeight: 1.7 }}>{para}</p>
                    ))}
                  </div>
                )}

                {/* Format diversification */}
                {ba.formatDiversification && (
                  <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>Format Diversification</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                      {ba.formatDiversification.formats.map((f: { type: string; pct: number; note: string }, i: number) => (
                        <div key={i} style={{ padding: "12px", background: C.cardAlt, borderRadius: 8, textAlign: "center" }}>
                          <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{f.pct}%</div>
                          <p style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, margin: "3px 0 2px" }}>{f.type}</p>
                          <p style={{ fontSize: 10, color: C.textSubtle, margin: 0 }}>{f.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brand Day playbook */}
                {ba.brandDayPlaybook && (
                  <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px" }}>Brand Day Content Playbook</h4>
                    {ba.brandDayPlaybook.map((step: string, i: number) => (
                      <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: i < ba.brandDayPlaybook.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "baseline" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.rust, width: 18, flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Commenting strategy + compound math */}
                {(ba.commentingStrategy || ba.compoundMath) && (
                  <div style={{ padding: "22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                    {ba.commentingStrategy && (
                      <>
                        <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px" }}>The Commenting Strategy</h4>
                        <p style={{ fontSize: 12, color: C.textMuted, margin: "0 0 16px", lineHeight: 1.7 }}>{ba.commentingStrategy}</p>
                      </>
                    )}
                    {ba.compoundMath && (
                      <>
                        <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px" }}>The Compound Math</h4>
                        {ba.compoundMath.split("\n\n").map((para: string, i: number) => (
                          <p key={i} style={{ fontSize: 12, color: C.textMuted, margin: "0 0 8px", lineHeight: 1.7 }}>{para}</p>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </>
            );
          })()}

          {/* TODO: Replace with real client results */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.rust, margin: "0 0 8px", textTransform: "uppercase" }}>THE RESULTS</p>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Get Real Results</h3>
            <p style={{ fontSize: 14, color: C.textDim, margin: "0 0 24px", lineHeight: 1.6, maxWidth: 520 }}>LinkedIn should generate pipeline, not just impressions. Here is what happens when the system is running.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                {
                  quote: "We went from posting when we remembered to a system that runs itself. Four qualified leads came through LinkedIn last quarter. Two closed.",
                  attr: "CEO, B2B SaaS (Series A)",
                  badge: "4 qualified leads / quarter",
                  before: 41, after: 72,
                },
                {
                  quote: "I used to spend six hours a week trying to write posts. Now I spend twenty minutes reviewing drafts that sound like me. The ROI on my time alone was worth it before the leads started coming.",
                  attr: "Founder, Professional Services",
                  badge: "6 hrs/week → 20 min/week",
                  before: 38, after: 67,
                },
                {
                  quote: "Three enterprise deals in our pipeline right now started with someone seeing my LinkedIn post and forwarding it to their buying committee. I never would have known without the attribution.",
                  attr: "VP Sales, Health & Wellness Brand",
                  badge: "3 enterprise deals in pipeline",
                  before: 52, after: 78,
                },
              ].map((card, i) => (
                <div key={i} style={{ position: "relative", padding: "20px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.rust}` }}>
                  <span style={{ position: "absolute", top: 12, right: 12, fontSize: 11, fontWeight: 700, color: "#fff", background: C.rust, padding: "4px 10px" }}>{card.badge}</span>
                  <p style={{ fontSize: 14, fontStyle: "italic", color: C.text, margin: "0 0 12px", lineHeight: 1.6, paddingRight: 90 }}>&ldquo;{card.quote}&rdquo;</p>
                  <p style={{ fontSize: 12, color: C.textDim, margin: "0 0 8px" }}>{card.attr}</p>
                  <p style={{ fontSize: 12, margin: 0 }}>
                    <span style={{ color: C.textDim }}>Brand Health: </span>
                    <span style={{ color: C.textDim, textDecoration: "line-through" }}>{card.before}</span>
                    <span style={{ color: C.textDim }}> → </span>
                    <span style={{ color: C.green, fontWeight: 700 }}>{card.after}</span>
                    <span style={{ color: C.textDim }}> in 90 days</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing preamble + cards */}
          <div style={{ padding: "32px 22px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginTop: 28, marginBottom: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.rust, margin: "0 0 10px", textTransform: "uppercase" }}>THE NEXT STEP</p>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 6px", letterSpacing: "-0.02em" }}>Your time is valuable. Spend it on what only you can do.</h3>
            <p style={{ fontSize: 14, color: C.textDim, margin: "0 0 16px", lineHeight: 1.6, maxWidth: 520 }}>You are the reason people follow you. Your perspective, your experience, your voice. Let us handle the system that amplifies it.</p>
            <p style={{ fontSize: 12, color: C.textMuted, margin: "0 0 24px", lineHeight: 1.5 }}>Every program includes your audit insights, a voice-matched content engine, and performance tracking against the benchmarks in this report.</p>

            {/* Voice engine differentiator */}
            <div style={{ padding: "28px", background: C.cardAlt, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.rust, margin: "0 0 8px", textTransform: "uppercase" }}>AI brand voice</p>
              <h4 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Your voice, but the version that performs.</h4>

              {/* Problem/solution framing */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div style={{ padding: "16px", background: C.bg, borderRadius: 10 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.textDim, margin: "0 0 6px", textTransform: "uppercase" }}>What other tools do</p>
                  <p style={{ fontSize: 12, color: C.textDim, margin: 0, lineHeight: 1.7 }}>
                    Feed your old posts into a model. Get back a blurry copy. If your posts are already getting penalized for generic patterns, the tool reproduces the penalty. If your instincts bury the lede or default to corporate-speak, the tool encodes those instincts.
                  </p>
                </div>
                <div style={{ padding: "16px", background: C.bg, borderRadius: 10, borderLeft: `3px solid ${C.rust}` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: C.rust, margin: "0 0 6px", textTransform: "uppercase" }}>What ours does</p>
                  <p style={{ fontSize: 12, color: C.textMuted, margin: 0, lineHeight: 1.7 }}>
                    Shows you two well-written posts on a topic you care about. You pick the one that sounds like you. Fifteen rounds. Your pattern of choices maps a voice you could never have described in a brief. The system learns your instincts, not your habits.
                  </p>
                </div>
              </div>

              {/* Three pillars */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
                <div style={{ padding: "14px 16px", borderLeft: `3px solid ${C.rust}` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Preference, not description</p>
                  <p style={{ fontSize: 11, color: C.textDim, margin: 0, lineHeight: 1.6 }}>You cannot describe "direct but warm" in a way a machine can use. But you can pick between two posts in under five seconds. That gut reaction is the signal.</p>
                </div>
                <div style={{ padding: "14px 16px", borderLeft: `3px solid ${C.amber}` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Your topics, your industry</p>
                  <p style={{ fontSize: 11, color: C.textDim, margin: 0, lineHeight: 1.6 }}>The pairs use your real content themes from this audit. You are choosing between two versions of posts you would actually publish. The specificity makes the choices honest.</p>
                </div>
                <div style={{ padding: "14px 16px", borderLeft: `3px solid ${C.green}` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>One voice, three registers</p>
                  <p style={{ fontSize: 11, color: C.textDim, margin: 0, lineHeight: 1.6 }}>A personal story should not sound like an industry analysis. The system calibrates separate registers for awareness, trust, and conversion content. Same person. Different context.</p>
                </div>
              </div>

              {/* Anti-AI layer */}
              <div style={{ padding: "14px 16px", background: C.bg, borderRadius: 10, borderLeft: `3px solid ${C.text}` }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Built to be undetectable</p>
                <p style={{ fontSize: 11, color: C.textDim, margin: 0, lineHeight: 1.6 }}>
                  LinkedIn demotes AI-generated content by 30%. Every draft is structurally designed to avoid detection: no predictable three-point skeletons, sentence length that varies by 3x within a post, at least one detail only you would know. The litmus test: if you removed the author name, would a reader know a specific human wrote this?
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
              {[
                {t:"PUBLISH",p:"$1,800",d:`We rebalance your funnel from ${funnelTop?.currentMix ?? 54}/${funnelMid?.currentMix ?? 42}/${funnelBot?.currentMix ?? 4} to ${funnelTop?.recommendedMix ?? 37}/${funnelMid?.recommendedMix ?? 38}/${funnelBot?.recommendedMix ?? 25} and publish 8 voice-matched posts/month.`,items:["8 posts/month in your voice","Annual content calendar","TOFU/MOFU/BOFU management","Monthly performance snapshot"],time:"3-4 hrs/week back"},
                {t:"PUBLISH + ENGAGE",p:"$2,500",d:`Your reply rate is ${data.replyScorecard.replyRate}% but ${data.replyScorecard.missedICPComments.length} ICP comments went unanswered. We manage your comment strategy so every reply counts.`,items:["Everything in Publish","Comment monitoring + reply drafting","15-20 proactive comments/week","ICP commenter flagging"],time:"5-6 hrs/week back",pop:true},
                {t:"FULL ENGINE",p:"$3,500",d:`Your Distribution score is ${data.scores.find(s => s.dimension === "Distribution")?.score ?? "?"}. We target 50+ within two quarters through consistent publishing, engagement, and relationship orchestration.`,items:["Everything in Publish + Engage","Content-as-halo distribution","CRM bridge","Quarterly audit refresh + strategy call"],time:"8+ hrs/week back"},
              ].map((plan,i) => (
                <div key={i} style={{ background: C.cardAlt, borderRadius: 14, border: (plan as {pop?: boolean}).pop ? `2px solid ${C.rust}` : `1px solid ${C.border}`, padding: "18px 16px", position: "relative" }}>
                  {(plan as {pop?: boolean}).pop && <div style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)", background: C.rust, color: "#fff", fontSize: 8, fontWeight: 700, padding: "2px 8px", borderRadius: 3, letterSpacing: "0.08em" }}>MOST POPULAR</div>}
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: C.rust, margin: "0 0 3px" }}>{plan.t}</p>
                  <div style={{ fontSize: 26, fontWeight: 800, color: C.text, marginBottom: 3 }}>{plan.p}<span style={{ fontSize: 13, fontWeight: 400, color: C.textDim }}>/mo</span></div>
                  <p style={{ fontSize: 11, color: C.textDim, margin: "0 0 10px", lineHeight: 1.5 }}>{plan.d}</p>
                  {plan.items.map((it,j) => <p key={j} style={{ fontSize: 11, color: C.textMuted, margin: "0 0 3px" }}>· {it}</p>)}
                  <p style={{ fontSize: 10, color: C.textDim, marginTop: 10, fontStyle: "italic" }}>{plan.time}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button style={{ padding: "14px 36px", fontSize: 13, fontWeight: 700, color: "#fff", background: C.rust, border: "none", borderRadius: 8, cursor: "pointer", letterSpacing: "0.04em" }}>Schedule your onboarding call</button>
              <p style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>Or reply to the email that brought you here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px", textAlign: "center", fontSize: 10, color: C.textSubtle }}>
        <p style={{ margin: "0 0 3px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>ERACX LINKEDIN AUDIT</p>
        <p style={{ margin: 0 }}>Prepared for {data.profile.name}. All data based on publicly available LinkedIn activity.</p>
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}
