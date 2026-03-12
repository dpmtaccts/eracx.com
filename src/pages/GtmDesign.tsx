import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav";
import CTAFooter from "../components/CTAFooter";

const RUST = "#C85A3A";
const BLUE = "#4AADE8";
const OFF_WHITE = "#F5F0EB";
const DARK = "#111111";
const GOLD = "#C8A96E";
const TEAL = "#2BBFAA";
const PINK = "#D4367A";

const MONO = "'JetBrains Mono', monospace";
const SANS = "'Instrument Sans', 'DM Sans', system-ui, sans-serif";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.5, delay: i * 0.1 },
});

/* ═══════════════════════════════════════════
   HERO GRID — blueprint/architectural grid background
   ═══════════════════════════════════════════ */
function HeroBlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const spacing = 48;

      // Minor grid
      ctx.strokeStyle = "rgba(60, 60, 60, 0.06)";
      ctx.lineWidth = 0.5;
      for (let x = spacing / 2; x < w; x += spacing / 2) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = spacing / 2; y < h; y += spacing / 2) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Major grid
      ctx.strokeStyle = "rgba(60, 60, 60, 0.10)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Intersection dots at major grid points
      ctx.fillStyle = "rgba(200, 90, 58, 0.18)";
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

/* ═══════════════════════════════════════════
   HERO PACKAGE VISUAL — floating deliverable stack
   ═══════════════════════════════════════════ */
function HeroPackageVisual({ visible }: { visible: boolean }) {
  const deliverables = [
    { num: "01", label: "PIPELINE MAP", desc: "Full revenue pipeline, end-to-end" },
    { num: "02", label: "ICP + SCORED LIST", desc: "Firmographic, behavioral, relational criteria" },
    { num: "03", label: "CAMPAIGN ARCHITECTURE", desc: "Channel logic, sequence, and message design" },
    { num: "04", label: "GTM BLUEPRINT DOC", desc: "Operator-ready system document" },
  ];

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
    }}>
      {/* Package container */}
      <div style={{
        background: "white",
        border: `1px solid rgba(60,60,60,0.10)`,
        borderRadius: 10,
        padding: "36px 32px 32px",
        maxWidth: 440,
        boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      }}>
        {/* Package header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          {/* Blueprint icon */}
          <svg viewBox="0 0 32 32" style={{ width: 32, height: 32, flexShrink: 0 }}>
            <rect x={2} y={2} width={28} height={28} rx={3} fill="none" stroke={RUST} strokeWidth="1.5" />
            <line x1={10} y1={2} x2={10} y2={30} stroke={RUST} strokeWidth="0.75" opacity={0.3} />
            <line x1={2} y1={11} x2={30} y2={11} stroke={RUST} strokeWidth="0.75" opacity={0.3} />
            <line x1={2} y1={21} x2={30} y2={21} stroke={RUST} strokeWidth="0.75" opacity={0.3} />
            <circle cx={10} cy={11} r={1.5} fill={RUST} opacity={0.4} />
            <circle cx={10} cy={21} r={1.5} fill={RUST} opacity={0.4} />
          </svg>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", color: RUST, fontFamily: MONO, margin: 0 }}>
              GTM DESIGN
            </p>
            <p style={{ fontSize: 12, color: "#6B6560", fontFamily: MONO, margin: "2px 0 0" }}>
              4 deliverables · 3 weeks · fixed scope
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "rgba(60,60,60,0.08)", marginBottom: 24 }} />

        {/* Deliverable cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {deliverables.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: 16,
                padding: "16px 18px",
                background: "#F5F0E8",
                borderRadius: 8,
                borderLeft: `3px solid ${RUST}`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 0.4s ease ${0.5 + i * 0.12}s, transform 0.4s ease ${0.5 + i * 0.12}s`,
              }}
            >
              <span style={{
                fontSize: 18, fontWeight: 700, color: RUST, fontFamily: MONO,
                lineHeight: 1.2, flexShrink: 0,
              }}>
                {d.num}
              </span>
              <div>
                <p style={{
                  fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: "#111111",
                  fontFamily: MONO, margin: 0,
                }}>
                  {d.label}
                </p>
                <p style={{
                  fontSize: 12, color: "#6B6560", margin: "4px 0 0", lineHeight: 1.4,
                }}>
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PIPELINE MAP VISUAL — nodes connected by lines
   showing signal → outreach → deal → expansion
   ═══════════════════════════════════════════ */
function PipelineMapVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stages = [
    { x: 60, label: "SIGNAL" },
    { x: 180, label: "OUTREACH" },
    { x: 300, label: "MEETING" },
    { x: 420, label: "DEAL" },
    { x: 540, label: "CLOSE" },
    { x: 660, label: "EXPAND" },
  ];
  const y = 60;

  return (
    <svg ref={ref} viewBox="0 0 720 120" className="w-full" style={{ maxWidth: 720 }}>
      {/* connecting lines */}
      {stages.slice(0, -1).map((s, i) => (
        <line
          key={i}
          x1={s.x + 14} y1={y} x2={stages[i + 1].x - 14} y2={y}
          stroke={RUST} strokeWidth="1.5"
          strokeDasharray={stages[i + 1].x - s.x - 28}
          style={{
            strokeDashoffset: vis ? 0 : stages[i + 1].x - s.x - 28,
            transition: `stroke-dashoffset 0.5s ease-out ${0.2 + i * 0.15}s`,
          }}
        />
      ))}
      {/* nodes */}
      {stages.map((s, i) => (
        <g key={i}>
          <circle
            cx={s.x} cy={y} r={12}
            fill="none" stroke={RUST} strokeWidth="1.5"
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${i * 0.15}s` }}
          />
          <circle
            cx={s.x} cy={y} r={4}
            fill={RUST}
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.1 + i * 0.15}s` }}
          />
          <text
            x={s.x} y={y + 30}
            textAnchor="middle" fill={OFF_WHITE} fontSize="9"
            letterSpacing="0.12em"
            style={{ fontFamily: MONO, opacity: vis ? 0.6 : 0, transition: `opacity 0.3s ease-out ${0.2 + i * 0.15}s` }}
          >
            {s.label}
          </text>
        </g>
      ))}
      {/* gap indicators (red dashes where gaps typically are) */}
      {[2, 4].map((idx) => (
        <g key={`gap-${idx}`}>
          <line
            x1={stages[idx].x - 6} y1={y - 22} x2={stages[idx].x + 6} y2={y - 22}
            stroke="#E8175D" strokeWidth="2"
            style={{ opacity: vis ? 0.7 : 0, transition: `opacity 0.4s ease-out ${0.6 + idx * 0.1}s` }}
          />
          <text
            x={stages[idx].x} y={y - 28}
            textAnchor="middle" fill="#E8175D" fontSize="7"
            letterSpacing="0.1em"
            style={{ fontFamily: MONO, opacity: vis ? 0.5 : 0, transition: `opacity 0.4s ease-out ${0.7 + idx * 0.1}s` }}
          >
            GAP
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   ICP SCORING VISUAL — ranked bars with scores
   ═══════════════════════════════════════════ */
function ICPScoringVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prospects = [
    { name: "Acme Corp", scores: { F: 9, R: 8, V: 9, Rp: 7, D: 8 }, total: 41 },
    { name: "Bolt Systems", scores: { F: 7, R: 9, V: 8, Rp: 6, D: 7 }, total: 37 },
    { name: "Cipher Inc", scores: { F: 6, R: 7, V: 7, Rp: 8, D: 6 }, total: 34 },
    { name: "Delta Group", scores: { F: 5, R: 6, V: 6, Rp: 5, D: 7 }, total: 29 },
    { name: "Echo Labs", scores: { F: 4, R: 5, V: 5, Rp: 4, D: 5 }, total: 23 },
  ];

  return (
    <div ref={ref} style={{ maxWidth: 420 }}>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr 50px",
          gap: 8,
          marginBottom: 8,
          opacity: vis ? 0.5 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      >
        <span style={{ fontSize: 9, fontFamily: MONO, color: OFF_WHITE, letterSpacing: "0.1em" }}>ACCOUNT</span>
        <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 4 }}>
          {["F", "R", "V", "Rp", "D"].map((l) => (
            <span key={l} style={{ fontSize: 9, fontFamily: MONO, color: BLUE, letterSpacing: "0.05em", width: 24, textAlign: "center" }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize: 9, fontFamily: MONO, color: RUST, letterSpacing: "0.1em", textAlign: "right" }}>SCORE</span>
      </div>

      {prospects.map((p, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "110px 1fr 50px",
            gap: 8,
            alignItems: "center",
            padding: "10px 0",
            borderTop: `1px solid rgba(245,240,235,0.06)`,
            opacity: vis ? 1 : 0,
            transform: vis ? "translateX(0)" : "translateX(-12px)",
            transition: `all 0.4s ease-out ${i * 0.1}s`,
          }}
        >
          <span style={{ fontSize: 12, fontFamily: MONO, color: `${OFF_WHITE}CC` }}>{p.name}</span>
          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 4 }}>
            {Object.values(p.scores).map((v, j) => (
              <div key={j} style={{ width: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div
                  style={{
                    width: 18, height: 18, borderRadius: 3,
                    backgroundColor: `rgba(74,173,232,${v / 12})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 8, fontFamily: MONO, color: OFF_WHITE, fontWeight: 600 }}>{v}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 16, fontFamily: MONO, fontWeight: 700, color: i === 0 ? RUST : `${OFF_WHITE}99` }}>{p.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CAMPAIGN ARCHITECTURE VISUAL — channel sequence
   ═══════════════════════════════════════════ */
function CampaignArchVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const channels = [
    { label: "LINKEDIN", y: 30, color: BLUE },
    { label: "EMAIL", y: 65, color: GOLD },
    { label: "CONTENT", y: 100, color: TEAL },
  ];

  const touchpoints = [
    { cx: 120, channel: 0 },
    { cx: 180, channel: 1 },
    { cx: 230, channel: 2 },
    { cx: 290, channel: 0 },
    { cx: 340, channel: 1 },
    { cx: 410, channel: 0 },
    { cx: 460, channel: 1 },
    { cx: 520, channel: 2 },
  ];

  return (
    <svg ref={ref} viewBox="0 0 600 135" className="w-full" style={{ maxWidth: 600 }}>
      {/* channel labels */}
      {channels.map((ch, i) => (
        <text
          key={i}
          x={10} y={ch.y + 4}
          fill={ch.color} fontSize="8" letterSpacing="0.12em"
          style={{ fontFamily: MONO, opacity: vis ? 0.7 : 0, transition: `opacity 0.3s ease-out ${i * 0.1}s` }}
        >
          {ch.label}
        </text>
      ))}
      {/* track lines */}
      {channels.map((ch, i) => (
        <line
          key={`line-${i}`}
          x1={95} y1={ch.y} x2={560} y2={ch.y}
          stroke={ch.color} strokeWidth="0.5" opacity={vis ? 0.15 : 0}
          style={{ transition: `opacity 0.3s ease-out ${0.1 + i * 0.1}s` }}
        />
      ))}
      {/* connecting paths between touchpoints */}
      {touchpoints.slice(0, -1).map((tp, i) => {
        const next = touchpoints[i + 1];
        const y1 = channels[tp.channel].y;
        const y2 = channels[next.channel].y;
        return (
          <line
            key={`conn-${i}`}
            x1={tp.cx} y1={y1} x2={next.cx} y2={y2}
            stroke={`${OFF_WHITE}30`} strokeWidth="1" strokeDasharray="3 3"
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.3 + i * 0.08}s` }}
          />
        );
      })}
      {/* touchpoint dots */}
      {touchpoints.map((tp, i) => {
        const ch = channels[tp.channel];
        return (
          <g key={`tp-${i}`}>
            <circle
              cx={tp.cx} cy={ch.y} r={6}
              fill={ch.color} opacity={vis ? 0.25 : 0}
              style={{ transition: `opacity 0.3s ease-out ${0.3 + i * 0.08}s` }}
            />
            <circle
              cx={tp.cx} cy={ch.y} r={3}
              fill={ch.color}
              style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.35 + i * 0.08}s` }}
            />
          </g>
        );
      })}
      {/* stage labels */}
      {[
        { x: 150, label: "AWARENESS" },
        { x: 310, label: "EVALUATION" },
        { x: 470, label: "DECISION" },
      ].map((s, i) => (
        <text
          key={i}
          x={s.x} y={125}
          textAnchor="middle" fill={`${OFF_WHITE}55`} fontSize="8" letterSpacing="0.1em"
          style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: `opacity 0.4s ease-out ${0.5 + i * 0.15}s` }}
        >
          {s.label}
        </text>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   BLUEPRINT DOCUMENT VISUAL — stylized doc preview
   ═══════════════════════════════════════════ */
function BlueprintDocVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 240 300" className="mx-auto w-full" style={{ maxWidth: 240 }}>
      {/* doc outline */}
      <rect
        x={20} y={10} width={200} height={280} rx={4}
        fill="none" stroke={`${OFF_WHITE}20`} strokeWidth="1"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.4s ease-out" }}
      />
      {/* header bar */}
      <rect
        x={20} y={10} width={200} height={40} rx={4}
        fill={`${RUST}22`}
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.3s ease-out 0.1s" }}
      />
      <text
        x={36} y={36} fill={RUST} fontSize="10" fontWeight="700" letterSpacing="0.08em"
        style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: "opacity 0.3s ease-out 0.2s" }}
      >
        GTM BLUEPRINT
      </text>
      {/* sections */}
      {[
        { y: 65, label: "ICP CRITERIA", w: 140 },
        { y: 90, label: "SCORING MODEL", w: 120 },
        { y: 115, label: "PIPELINE STAGES", w: 150 },
        { y: 140, label: "CAMPAIGN SEQUENCES", w: 160 },
        { y: 165, label: "NEXT ACTIONS", w: 110 },
      ].map((s, i) => (
        <g key={i} style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.25 + i * 0.08}s` }}>
          <rect x={36} y={s.y} width={4} height={12} rx={1} fill={RUST} opacity={0.6} />
          <text x={48} y={s.y + 10} fill={`${OFF_WHITE}88`} fontSize="8" letterSpacing="0.08em" style={{ fontFamily: MONO }}>
            {s.label}
          </text>
          {/* fake content lines */}
          {[0, 1].map((li) => (
            <rect
              key={li} x={48} y={s.y + 16 + li * 6} width={s.w - 20 - li * 30} height={2} rx={1}
              fill={`${OFF_WHITE}15`}
            />
          ))}
        </g>
      ))}
      {/* connector lines from sections to margin labels */}
      {[65, 115, 140].map((y, i) => (
        <line
          key={i}
          x1={200} y1={y + 6} x2={212} y2={y + 6}
          stroke={`${OFF_WHITE}15`} strokeWidth="1"
          style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.6 + i * 0.1}s` }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   TIMELINE VISUAL — animated 3-week engagement
   ═══════════════════════════════════════════ */
function TimelineVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Desktop */}
      <svg ref={ref} viewBox="0 0 800 100" className="mt-12 mb-4 hidden w-full md:block" aria-hidden="true">
        {/* track */}
        <line x1={40} y1={50} x2={760} y2={50} stroke={`${OFF_WHITE}30`} strokeWidth="1.5" />
        {/* animated fill */}
        <line
          x1={40} y1={50} x2={760} y2={50}
          stroke={RUST} strokeWidth="1.5"
          strokeDasharray={720}
          style={{ strokeDashoffset: vis ? 0 : 720, transition: "stroke-dashoffset 2s ease-in-out" }}
        />
        {/* milestones */}
        {[
          { x: 160, top: "DIAGNOSTIC", bottom: "WEEK 1" },
          { x: 400, top: "BUILD", bottom: "WEEKS 1–2" },
          { x: 640, top: "HANDOFF", bottom: "WEEK 3" },
        ].map((m, i) => (
          <g key={i}>
            <line
              x1={m.x} y1={42} x2={m.x} y2={58}
              stroke={OFF_WHITE} strokeWidth="1"
              style={{ opacity: vis ? 1 : 0.2, transition: `opacity 0.4s ease ${0.4 + i * 0.6}s` }}
            />
            <circle
              cx={m.x} cy={50} r={5}
              fill={RUST}
              style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease ${0.5 + i * 0.6}s` }}
            />
            <text
              x={m.x} y={28} textAnchor="middle" fill={OFF_WHITE} fontSize="10" letterSpacing="0.12em"
              style={{ fontFamily: MONO, opacity: vis ? 0.9 : 0, transition: `opacity 0.4s ease ${0.5 + i * 0.6}s` }}
            >
              {m.top}
            </text>
            <text
              x={m.x} y={78} textAnchor="middle" fill={OFF_WHITE} fontSize="9" letterSpacing="0.08em"
              style={{ fontFamily: MONO, opacity: vis ? 0.45 : 0, transition: `opacity 0.4s ease ${0.6 + i * 0.6}s` }}
            >
              {m.bottom}
            </text>
          </g>
        ))}
      </svg>

      {/* Mobile — vertical */}
      <svg viewBox="0 0 120 320" className="mx-auto mt-8 mb-4 block h-[260px] w-[120px] md:hidden" aria-hidden="true">
        <line x1={30} y1={20} x2={30} y2={300} stroke={`${OFF_WHITE}30`} strokeWidth="1.5" />
        <line
          x1={30} y1={20} x2={30} y2={300}
          stroke={RUST} strokeWidth="1.5"
          strokeDasharray={280}
          style={{ strokeDashoffset: vis ? 0 : 280, transition: "stroke-dashoffset 2s ease-in-out" }}
        />
        {[
          { y: 60, label: "DIAGNOSTIC", sub: "WEEK 1" },
          { y: 160, label: "BUILD", sub: "WEEKS 1–2" },
          { y: 260, label: "HANDOFF", sub: "WEEK 3" },
        ].map((m, i) => (
          <g key={i}>
            <circle
              cx={30} cy={m.y} r={5} fill={RUST}
              style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease ${0.5 + i * 0.6}s` }}
            />
            <text
              x={48} y={m.y - 6} fill={OFF_WHITE} fontSize="9" letterSpacing="0.1em"
              style={{ fontFamily: MONO, opacity: vis ? 0.9 : 0, transition: `opacity 0.4s ease ${0.5 + i * 0.6}s` }}
            >
              {m.label}
            </text>
            <text
              x={48} y={m.y + 10} fill={OFF_WHITE} fontSize="9" letterSpacing="0.08em"
              style={{ fontFamily: MONO, opacity: vis ? 0.45 : 0, transition: `opacity 0.4s ease ${0.6 + i * 0.6}s` }}
            >
              {m.sub}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
}

/* ═══════════════════════════════════════════
   PROBLEM VISUALS — large animated SVGs
   ═══════════════════════════════════════════ */
function useInView(threshold = 0.25) {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* Signal-based pipeline: signals radiating into a structured funnel */
function SignalPipelineVisual() {
  const { ref, vis } = useInView();
  const cx = 200, cy = 160;
  // Scattered signal sources on left
  const signals = [
    { x: 30, y: 40, label: "JOB CHANGE" },
    { x: 20, y: 100, label: "FUNDING" },
    { x: 40, y: 160, label: "TECH INSTALL" },
    { x: 25, y: 220, label: "INTENT" },
    { x: 35, y: 280, label: "HIRE BURST" },
  ];
  // Pipeline stages on right
  const stages = [
    { x: 260, y: 80, label: "DETECT" },
    { x: 320, y: 130, label: "QUALIFY" },
    { x: 360, y: 180, label: "REACH" },
    { x: 380, y: 230, label: "CONVERT" },
  ];

  return (
    <svg ref={ref} viewBox="0 0 420 320" className="w-full h-auto" style={{ maxHeight: 320 }}>
      {/* Funnel shape */}
      <path
        d={`M 240 50 L 400 150 L 400 230 L 280 280 Z`}
        fill={`${RUST}08`} stroke={`${RUST}25`} strokeWidth="1"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s ease-out 0.2s" }}
      />

      {/* Signal lines converging into funnel */}
      {signals.map((s, i) => (
        <g key={i}>
          <line
            x1={s.x + 60} y1={s.y} x2={240} y2={80 + i * 40}
            stroke={RUST} strokeWidth="1"
            strokeDasharray={220}
            style={{
              strokeDashoffset: vis ? 0 : 220,
              transition: `stroke-dashoffset 0.8s ease-out ${0.3 + i * 0.12}s`,
              opacity: vis ? 0.4 : 0,
            }}
          />
          {/* Signal dot */}
          <circle
            cx={s.x + 50} cy={s.y} r={4} fill={RUST}
            style={{ opacity: vis ? 0.8 : 0, transition: `opacity 0.3s ease-out ${0.2 + i * 0.1}s` }}
          />
          <circle
            cx={s.x + 50} cy={s.y} r={10} fill="none" stroke={RUST} strokeWidth="0.5"
            style={{ opacity: vis ? 0.2 : 0, transition: `opacity 0.3s ease-out ${0.25 + i * 0.1}s` }}
          />
          {/* Signal label */}
          <text
            x={s.x + 50} y={s.y - 14} textAnchor="middle"
            fill={`${OFF_WHITE}55`} fontSize="7" letterSpacing="0.1em"
            style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.3 + i * 0.1}s` }}
          >
            {s.label}
          </text>
        </g>
      ))}

      {/* Pipeline stage markers */}
      {stages.map((s, i) => (
        <g key={`stage-${i}`}>
          <circle
            cx={s.x} cy={s.y} r={6} fill={RUST}
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.7 + i * 0.15}s` }}
          />
          <text
            x={s.x + 14} y={s.y + 4}
            fill={`${OFF_WHITE}88`} fontSize="9" letterSpacing="0.1em"
            style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.8 + i * 0.15}s` }}
          >
            {s.label}
          </text>
        </g>
      ))}

      {/* Output arrow */}
      <line
        x1={340} y1={260} x2={380} y2={290}
        stroke={RUST} strokeWidth="2"
        style={{ opacity: vis ? 0.6 : 0, transition: "opacity 0.4s ease-out 1.3s" }}
      />
      <text
        x={385} y={298} fill={RUST} fontSize="9" fontWeight="700" letterSpacing="0.08em"
        style={{ fontFamily: MONO, opacity: vis ? 0.8 : 0, transition: "opacity 0.4s ease-out 1.4s" }}
      >
        PIPELINE
      </text>
    </svg>
  );
}

/* ICP Scoring: scattered dots → organized, scored clusters */
function ICPCriteriaVisual() {
  const { ref, vis } = useInView();

  // Clusters of accounts, scored and grouped
  const clusters = [
    { cx: 100, cy: 80, r: 50, score: "92", tier: "TIER 1", color: RUST, accounts: 5 },
    { cx: 250, cy: 120, r: 40, score: "74", tier: "TIER 2", color: BLUE, accounts: 8 },
    { cx: 350, cy: 80, r: 30, score: "51", tier: "TIER 3", color: `${OFF_WHITE}66`, accounts: 12 },
  ];

  // Criteria labels along the top
  const criteria = ["FIRMOGRAPHIC", "BEHAVIORAL", "RELATIONAL"];

  return (
    <svg ref={ref} viewBox="0 0 420 220" className="w-full h-auto" style={{ maxHeight: 260 }}>
      {/* Criteria axis labels */}
      {criteria.map((c, i) => (
        <text
          key={i}
          x={80 + i * 130} y={20} textAnchor="middle"
          fill={`${OFF_WHITE}44`} fontSize="8" letterSpacing="0.1em"
          style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${i * 0.1}s` }}
        >
          {c}
        </text>
      ))}
      {/* Divider */}
      <line x1={20} y1={30} x2={400} y2={30} stroke={`${OFF_WHITE}10`} strokeWidth="1"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 0.3s ease-out" }} />

      {/* Clusters */}
      {clusters.map((cl, i) => (
        <g key={i}>
          {/* Cluster boundary */}
          <circle
            cx={cl.cx} cy={cl.cy + 40} r={cl.r}
            fill={`${cl.color}08`} stroke={`${cl.color}30`} strokeWidth="1" strokeDasharray="4 3"
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.5s ease-out ${0.3 + i * 0.2}s` }}
          />
          {/* Account dots inside cluster */}
          {Array.from({ length: cl.accounts }).map((_, j) => {
            const angle = (j / cl.accounts) * Math.PI * 2 + i;
            const dist = cl.r * 0.3 + (j % 3) * cl.r * 0.2;
            const dx = cl.cx + Math.cos(angle) * dist;
            const dy = cl.cy + 40 + Math.sin(angle) * dist;
            return (
              <circle
                key={j} cx={dx} cy={dy} r={2.5}
                fill={cl.color}
                style={{
                  opacity: vis ? (0.4 + (cl.accounts - j) / cl.accounts * 0.5) : 0,
                  transition: `opacity 0.3s ease-out ${0.5 + i * 0.2 + j * 0.03}s`,
                }}
              />
            );
          })}
          {/* Score */}
          <text
            x={cl.cx} y={cl.cy + 40 + cl.r + 20}
            textAnchor="middle" fill={cl.color} fontSize="18" fontWeight="700"
            style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.6 + i * 0.2}s` }}
          >
            {cl.score}
          </text>
          {/* Tier label */}
          <text
            x={cl.cx} y={cl.cy + 40 + cl.r + 34}
            textAnchor="middle" fill={`${cl.color}`} fontSize="8" letterSpacing="0.12em"
            style={{ fontFamily: MONO, opacity: vis ? 0.6 : 0, transition: `opacity 0.3s ease-out ${0.7 + i * 0.2}s` }}
          >
            {cl.tier}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Outbound Architecture: structured channel sequencing */
function OutboundArchVisual() {
  const { ref, vis } = useInView();

  const channels = [
    { label: "LINKEDIN", y: 55, color: BLUE },
    { label: "EMAIL", y: 115, color: GOLD },
    { label: "CONTENT", y: 175, color: TEAL },
    { label: "EVENT", y: 235, color: PINK },
  ];

  // Sequenced touchpoints forming a deliberate path
  const path = [
    { cx: 120, ch: 2 }, { cx: 160, ch: 0 }, { cx: 200, ch: 1 },
    { cx: 240, ch: 0 }, { cx: 280, ch: 2 }, { cx: 310, ch: 1 },
    { cx: 350, ch: 3 }, { cx: 380, ch: 0 }, { cx: 410, ch: 1 },
  ];

  return (
    <svg ref={ref} viewBox="0 0 460 280" className="w-full h-auto" style={{ maxHeight: 280 }}>
      {/* Channel labels + tracks */}
      {channels.map((ch, i) => (
        <g key={i}>
          <text
            x={8} y={ch.y + 4} fill={ch.color} fontSize="7" letterSpacing="0.1em"
            style={{ fontFamily: MONO, opacity: vis ? 0.7 : 0, transition: `opacity 0.3s ease-out ${i * 0.08}s` }}
          >
            {ch.label}
          </text>
          <line
            x1={85} y1={ch.y} x2={440} y2={ch.y}
            stroke={ch.color} strokeWidth="0.5"
            style={{ opacity: vis ? 0.12 : 0, transition: `opacity 0.3s ease-out ${0.1 + i * 0.08}s` }}
          />
        </g>
      ))}

      {/* Connection path between touchpoints */}
      {path.slice(0, -1).map((tp, i) => {
        const next = path[i + 1];
        return (
          <line
            key={`c-${i}`}
            x1={tp.cx} y1={channels[tp.ch].y}
            x2={next.cx} y2={channels[next.ch].y}
            stroke={`${OFF_WHITE}20`} strokeWidth="1"
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.4 + i * 0.06}s` }}
          />
        );
      })}

      {/* Touchpoint nodes */}
      {path.map((tp, i) => {
        const ch = channels[tp.ch];
        return (
          <g key={`n-${i}`}>
            <circle
              cx={tp.cx} cy={ch.y} r={8} fill={ch.color}
              style={{ opacity: vis ? 0.15 : 0, transition: `opacity 0.3s ease-out ${0.4 + i * 0.06}s` }}
            />
            <circle
              cx={tp.cx} cy={ch.y} r={4} fill={ch.color}
              style={{ opacity: vis ? 0.9 : 0, transition: `opacity 0.3s ease-out ${0.45 + i * 0.06}s` }}
            />
          </g>
        );
      })}

      {/* Stage labels at bottom */}
      {[
        { x: 140, label: "AWARENESS" },
        { x: 265, label: "EVALUATION" },
        { x: 390, label: "DECISION" },
      ].map((s, i) => (
        <g key={i}>
          <line x1={s.x} y1={250} x2={s.x} y2={260} stroke={`${OFF_WHITE}20`} strokeWidth="1"
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.7 + i * 0.1}s` }} />
          <text
            x={s.x} y={273} textAnchor="middle" fill={`${OFF_WHITE}44`} fontSize="8" letterSpacing="0.1em"
            style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: `opacity 0.3s ease-out ${0.75 + i * 0.1}s` }}
          >
            {s.label}
          </text>
        </g>
      ))}

      {/* Sequence arrow */}
      <line x1={100} y1={265} x2={430} y2={265} stroke={RUST} strokeWidth="1" strokeDasharray="4 3"
        style={{ opacity: vis ? 0.3 : 0, transition: "opacity 0.5s ease-out 0.9s" }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   THREE LOOPS MINI — compact version for ERA Connection section
   ═══════════════════════════════════════════ */
function ThreeLoopsMini() {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const loops = [
    { cx: 100, cy: 90, r: 55, color: GOLD, label: "CONNECTION" },
    { cx: 220, cy: 90, r: 55, color: TEAL, label: "TRUST" },
    { cx: 340, cy: 90, r: 55, color: PINK, label: "LOYALTY" },
  ];

  const circ = (r: number) => 2 * Math.PI * r;

  return (
    <svg ref={ref} viewBox="0 0 440 180" className="w-full" style={{ maxWidth: 440 }}>
      <style>{`
        @keyframes gtm-loop-rotate { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -${circ(55)}; } }
        @media (prefers-reduced-motion: reduce) { .gtm-loop-arc { animation: none !important; } }
      `}</style>

      {/* connecting arrows between loops */}
      {[0, 1].map((i) => (
        <line
          key={i}
          x1={loops[i].cx + loops[i].r - 10} y1={loops[i].cy}
          x2={loops[i + 1].cx - loops[i + 1].r + 10} y2={loops[i + 1].cy}
          stroke={`${OFF_WHITE}25`} strokeWidth="1" strokeDasharray="4 3"
          style={{ opacity: vis ? 1 : 0, transition: `opacity 0.4s ease-out ${0.5 + i * 0.3}s` }}
        />
      ))}

      {loops.map((loop, i) => (
        <g key={i}>
          {/* track */}
          <circle cx={loop.cx} cy={loop.cy} r={loop.r} fill="none" stroke={loop.color} strokeWidth="1" opacity={vis ? 0.15 : 0}
            style={{ transition: `opacity 0.3s ease-out ${i * 0.15}s` }} />
          {/* animated arc */}
          <circle
            className="gtm-loop-arc"
            cx={loop.cx} cy={loop.cy} r={loop.r}
            fill="none" stroke={loop.color} strokeWidth="1"
            strokeDasharray="4 2"
            style={{
              opacity: vis ? 0.6 : 0,
              animation: vis ? `gtm-loop-rotate ${5 + i}s linear infinite` : "none",
              transition: "opacity 0.4s",
            }}
          />
          {/* label */}
          <text
            x={loop.cx} y={loop.cy + 4}
            textAnchor="middle" fill={loop.color} fontSize="9" letterSpacing="0.12em" fontWeight="600"
            style={{ fontFamily: MONO, opacity: vis ? 0.7 : 0, transition: `opacity 0.4s ease-out ${0.2 + i * 0.15}s` }}
          >
            {loop.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   REVENUE RANGE VISUAL — bar showing $2M-$50M
   ═══════════════════════════════════════════ */
function RevenueRangeVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 400 60" className="mb-8 w-full" style={{ maxWidth: 400 }}>
      {/* full range track */}
      <line x1={20} y1={30} x2={380} y2={30} stroke={`${OFF_WHITE}15`} strokeWidth="2" />
      {/* highlighted range */}
      <line
        x1={60} y1={30} x2={300} y2={30}
        stroke={RUST} strokeWidth="3"
        strokeDasharray={240}
        style={{ strokeDashoffset: vis ? 0 : 240, transition: "stroke-dashoffset 1s ease-in-out 0.2s" }}
      />
      {/* markers */}
      {[
        { x: 60, label: "$2M" },
        { x: 300, label: "$50M" },
      ].map((m, i) => (
        <g key={i}>
          <line x1={m.x} y1={22} x2={m.x} y2={38} stroke={RUST} strokeWidth="1.5"
            style={{ opacity: vis ? 1 : 0, transition: `opacity 0.3s ease ${0.4 + i * 0.3}s` }} />
          <text x={m.x} y={52} textAnchor="middle" fill={RUST} fontSize="11" fontWeight="700"
            style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: `opacity 0.3s ease ${0.5 + i * 0.3}s` }}
          >{m.label}</text>
        </g>
      ))}
      {/* context labels */}
      <text x={30} y={16} fill={`${OFF_WHITE}40`} fontSize="8" letterSpacing="0.08em" style={{ fontFamily: MONO }}>
        EARLY
      </text>
      <text x={350} y={16} fill={`${OFF_WHITE}40`} fontSize="8" letterSpacing="0.08em" style={{ fontFamily: MONO }}>
        ENTERPRISE
      </text>
      <text x={180} y={16} textAnchor="middle" fill={`${OFF_WHITE}60`} fontSize="8" letterSpacing="0.08em"
        style={{ fontFamily: MONO, opacity: vis ? 1 : 0, transition: "opacity 0.4s ease 0.6s" }}>
        GTM DESIGN RANGE
      </text>
    </svg>
  );
}


/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function GtmDesign() {
  const fontsLoaded = useRef(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    if (fontsLoaded.current) return;
    fontsLoaded.current = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{ fontFamily: SANS }} className="min-h-screen bg-[#111111]">
      <TopNav />

      {/* ── HERO ── */}
      <section id="gtm-hero" style={{
        position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden",
        backgroundColor: "#F5F0E8",
      }}>
        <HeroBlueprintGrid />

        <div style={{
          position: "relative", zIndex: 1,
          padding: "160px 24px 100px",
          maxWidth: 1200, margin: "0 auto", width: "100%",
        }}>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left — copy */}
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}>
              {/* Product badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 4,
                border: `1px solid ${RUST}33`,
                background: `${RUST}0D`,
                marginBottom: 28,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: 1, backgroundColor: RUST }} />
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: RUST, fontFamily: MONO,
                }}>
                  FIXED-SCOPE GTM SPRINT
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: DARK,
                letterSpacing: "-0.03em", lineHeight: 1.08,
              }}>
                Your pipeline shouldn't depend on who the founder knows.
              </h1>

              <p style={{ fontSize: 17, color: "#3C3C3C", lineHeight: 1.65, maxWidth: 520, marginTop: 24 }}>
                Set your growth trajectory with a complete go-to-market blueprint,
                designed for immediate implementation and scale.
              </p>

              <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <a
                  href="/#contact"
                  style={{
                    display: "inline-block", backgroundColor: RUST, color: "white",
                    fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                    padding: "16px 36px", textDecoration: "none",
                  }}
                >
                  Start the Conversation
                </a>
                <span style={{ fontSize: 13, color: "#6B6560", fontFamily: MONO }}>
                  3 weeks · 4 deliverables
                </span>
              </div>
            </div>

            {/* Right — package visual */}
            <div className="hidden md:flex" style={{ justifyContent: "flex-end" }}>
              <HeroPackageVisual visible={heroVisible} />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE SOLVE ── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="mb-6 max-w-3xl text-2xl font-bold leading-snug md:text-4xl"
            style={{ color: OFF_WHITE }}
            {...fadeUp}
          >
            Most B2B companies don't have a go-to-market problem. They have a clarity problem.
          </motion.h2>
          <motion.p
            className="mb-24 max-w-2xl text-base leading-relaxed md:mb-32"
            style={{ color: `${OFF_WHITE}66` }}
            {...stagger(1)}
          >
            GTM Design solves for the three gaps we see in nearly every B2B company between $5M and $50M.
          </motion.p>

          {/* ── Block 1: Signal-Based Pipeline ── */}
          <div className="mb-28 grid grid-cols-1 items-center gap-12 md:mb-36 md:grid-cols-2 md:gap-16">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <SignalPipelineVisual />
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: RUST, fontFamily: MONO }}>
                Signal-Based Pipeline
              </p>
              <h3 className="mb-5 text-xl font-bold leading-snug md:text-2xl" style={{ color: OFF_WHITE }}>
                Pipeline built on signals, not relationships
              </h3>
              <p className="mb-5 text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>
                Most B2B revenue at the $5{"\u2013"}50M stage is driven by founder relationships and referrals.
                That works — until it doesn't. When those relationships plateau, there's no underlying
                system to fall back on. The pipeline dries up and nobody knows why.
              </p>
              <div className="mb-5 border-l-2 py-2 pl-4" style={{ borderColor: `${RUST}44` }}>
                <p className="text-[13px] leading-snug" style={{ color: `${OFF_WHITE}66`, fontFamily: MONO }}>
                  <span style={{ color: OFF_WHITE, fontWeight: 700, fontSize: 22 }}>68%</span>{" "}
                  of B2B companies cite pipeline generation as their top growth challenge.
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider" style={{ color: `${OFF_WHITE}44` }}>
                  Forrester, 2025
                </p>
              </div>
              <p className="text-base font-semibold leading-snug" style={{ color: OFF_WHITE }}>
                We map your full pipeline from first signal to closed deal — so growth doesn't depend on who picks up the phone.
              </p>
            </motion.div>
          </div>

          {/* ── Block 2: ICP Criteria ── */}
          <div className="mb-28 grid grid-cols-1 items-center gap-12 md:mb-36 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: RUST, fontFamily: MONO }}>
                Defined ICP + Scored List
              </p>
              <h3 className="mb-5 text-xl font-bold leading-snug md:text-2xl" style={{ color: OFF_WHITE }}>
                ICP defined by criteria, not gut feel
              </h3>
              <p className="mb-5 text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>
                {"\u201C"}Companies like our best customers{"\u201D"} is not an ICP. Without defined firmographic,
                behavioral, and relational criteria, every rep qualifies differently, every campaign
                targets differently, and nothing compounds. You get inconsistency at scale.
              </p>
              <div className="mb-5 border-l-2 py-2 pl-4" style={{ borderColor: `${RUST}44` }}>
                <p className="text-[13px] leading-snug" style={{ color: `${OFF_WHITE}66`, fontFamily: MONO }}>
                  <span style={{ color: OFF_WHITE, fontWeight: 700, fontSize: 22 }}>Only 22%</span>{" "}
                  of B2B companies say they have a clearly defined and documented ICP.
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider" style={{ color: `${OFF_WHITE}44` }}>
                  Gartner, 2024
                </p>
              </div>
              <p className="text-base font-semibold leading-snug" style={{ color: OFF_WHITE }}>
                We define your ICP with scored criteria and deliver a ranked prospect list you can act on the day you receive it.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <ICPCriteriaVisual />
            </motion.div>
          </div>

          {/* ── Block 3: Outbound Architecture ── */}
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <OutboundArchVisual />
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: RUST, fontFamily: MONO }}>
                Campaign Architecture
              </p>
              <h3 className="mb-5 text-xl font-bold leading-snug md:text-2xl" style={{ color: OFF_WHITE }}>
                Outbound with a map, not just a message
              </h3>
              <p className="mb-5 text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>
                Most B2B outbound is launched before the pipeline architecture exists. Sequences go out,
                responses come back, and there's no system to route, score, or prioritize what happens
                next. Activity without architecture produces noise, not revenue.
              </p>
              <div className="mb-5 border-l-2 py-2 pl-4" style={{ borderColor: `${RUST}44` }}>
                <p className="text-[13px] leading-snug" style={{ color: `${OFF_WHITE}66`, fontFamily: MONO }}>
                  <span style={{ color: OFF_WHITE, fontWeight: 700, fontSize: 22 }}>&lt;5%</span>{" "}
                  of cold outreach gets a response. The volume playbook stopped working.
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider" style={{ color: `${OFF_WHITE}44` }}>
                  Belkins, 2025
                </p>
              </div>
              <p className="text-base font-semibold leading-snug" style={{ color: OFF_WHITE }}>
                We design the channel logic, sequence, and message architecture so every touchpoint has a reason and a next step.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT GTM DESIGN PRODUCES ── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-4 text-2xl font-bold leading-snug md:text-4xl"
            style={{ color: OFF_WHITE }}
            {...fadeUp}
          >
            A complete go-to-market system. Built in weeks, not quarters.
          </motion.h2>

          <motion.p
            className="mb-16 max-w-3xl text-lg leading-relaxed"
            style={{ color: `${OFF_WHITE}99` }}
            {...stagger(1)}
          >
            GTM Design is a fixed-scope sprint. Four interconnected deliverables
            that map, define, and sequence your entire revenue motion.
          </motion.p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* 01 — Pipeline Map */}
            <motion.div
              className="rounded-lg border border-white/[0.06] overflow-hidden"
              style={{ backgroundColor: "rgba(245,240,235,0.03)" }}
              {...stagger(0)}
            >
              {/* Screenshot hero */}
              <div className="overflow-hidden" style={{ borderBottom: `1px solid rgba(245,240,235,0.06)` }}>
                <img
                  src="/assets/signals-feed-cropped.png"
                  alt="ERA Signal Feed — real-time buyer signals with scores, tags, and sources"
                  className="w-full"
                  style={{ display: "block" }}
                />
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: RUST, fontFamily: MONO }}>01</span>
                  <h3 className="text-lg font-semibold" style={{ color: OFF_WHITE }}>Pipeline Map</h3>
                </div>
                <p className="text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>
                  We diagram your full revenue pipeline from first signal to closed deal to expansion motion.
                  Every stage, every handoff, every gap. Most companies have never seen their pipeline drawn
                  end-to-end — this alone changes how leadership thinks about where to invest.
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-wider" style={{ color: `${OFF_WHITE}33`, fontFamily: MONO }}>
                  Live signal feed from signals.eracx.com
                </p>
              </div>
            </motion.div>

            {/* 02 — ICP Definition */}
            <motion.div
              className="rounded-lg border border-white/[0.06] overflow-hidden"
              style={{ backgroundColor: "rgba(245,240,235,0.03)" }}
              {...stagger(1)}
            >
              {/* Screenshot hero */}
              <div className="overflow-hidden" style={{ borderBottom: `1px solid rgba(245,240,235,0.06)` }}>
                <img
                  src="/assets/signals-companies-cropped.png"
                  alt="ERA Companies — ranked by composite signal score with stages and signal counts"
                  className="w-full"
                  style={{ display: "block" }}
                />
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: RUST, fontFamily: MONO }}>02</span>
                  <h3 className="text-lg font-semibold" style={{ color: OFF_WHITE }}>ICP Definition and Scored Prospect List</h3>
                </div>
                <p className="text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>
                  We define your Ideal Customer Profile using firmographic, behavioral, and relational
                  criteria — then build a scored prospect list using ERA's FRVRD scoring model (Frequency,
                  Recency, Value, Responsiveness, Density). Delivered as a live, ranked list you can act on
                  immediately, tracked in real time at{" "}
                  <a
                    href="https://aux.eracx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: BLUE, textDecoration: "underline", textUnderlineOffset: 3 }}
                  >
                    aux.eracx.com
                  </a>.
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-wider" style={{ color: `${OFF_WHITE}33`, fontFamily: MONO }}>
                  Scored prospect list from signals.eracx.com
                </p>
              </div>
            </motion.div>

            {/* 03 — Campaign Architecture */}
            <motion.div
              className="rounded-lg border border-white/[0.06] overflow-hidden"
              style={{ backgroundColor: "rgba(245,240,235,0.03)" }}
              {...stagger(2)}
            >
              <div className="overflow-x-auto p-8 pb-4" style={{ borderBottom: `1px solid rgba(245,240,235,0.06)` }}>
                <CampaignArchVisual />
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: RUST, fontFamily: MONO }}>03</span>
                  <h3 className="text-lg font-semibold" style={{ color: OFF_WHITE }}>Campaign Architecture</h3>
                </div>
                <p className="text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>
                  We design the logic for your primary go-to-market motion: which channels, in what sequence,
                  with what message at each stage of the buying journey. Built specifically around your
                  pipeline map and ICP — not adapted from a template.
                </p>
              </div>
            </motion.div>

            {/* 04 — GTM Blueprint Document */}
            <motion.div
              className="rounded-lg border border-white/[0.06] overflow-hidden"
              style={{ backgroundColor: "rgba(245,240,235,0.03)" }}
              {...stagger(3)}
            >
              <div className="p-8 pb-4" style={{ borderBottom: `1px solid rgba(245,240,235,0.06)` }}>
                <BlueprintDocVisual />
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: RUST, fontFamily: MONO }}>04</span>
                  <h3 className="text-lg font-semibold" style={{ color: OFF_WHITE }}>GTM Blueprint Document</h3>
                </div>
                <p className="text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>
                  Everything tied together in a single operator-ready document: ICP criteria, scoring
                  rationale, pipeline stage definitions, campaign sequences, and prioritized next actions.
                  Formatted to hand off to an ops team, a new hire, or inform a full ERA engagement.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-4 text-2xl font-bold leading-snug md:text-4xl"
            style={{ color: OFF_WHITE }}
            {...fadeUp}
          >
            How the engagement works
          </motion.h2>

          <TimelineVisual />

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {[
              {
                step: "01",
                title: "Diagnostic Call",
                week: "Week 1",
                body: "We start by understanding your current revenue motion: what\u2019s working, what\u2019s stalled, and what\u2019s never been built. We map your existing pipeline, gather ICP input from sales and leadership, and identify the highest-leverage design decisions.",
              },
              {
                step: "02",
                title: "Blueprint Build",
                week: "Weeks 1\u20132",
                body: "We build the four deliverables in sequence \u2014 pipeline map first, ICP second, campaign architecture third, blueprint document last. Each informs the next. You receive a draft for review at the midpoint.",
              },
              {
                step: "03",
                title: "Handoff and Walkthrough",
                week: "Week 3",
                body: "We deliver the final GTM Blueprint package in a live working session. We walk through each component, answer questions, and document recommended next actions. You leave with a system ready to implement.",
              },
            ].map((step, i) => (
              <motion.div key={i} {...stagger(i)}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-sm font-bold" style={{ color: RUST, fontFamily: MONO }}>
                    {step.step}
                  </span>
                  <div className="hidden h-px flex-1 md:block" style={{ backgroundColor: `${OFF_WHITE}15` }} />
                </div>
                <h3 className="mb-1 text-lg font-semibold" style={{ color: OFF_WHITE }}>{step.title}</h3>
                <p className="mb-4 text-xs font-medium uppercase tracking-wider" style={{ color: `${OFF_WHITE}66`, fontFamily: MONO }}>
                  {step.week}
                </p>
                <p className="text-[15px] leading-[1.75]" style={{ color: `${OFF_WHITE}B3` }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-6 text-2xl font-bold leading-snug md:text-4xl"
            style={{ color: OFF_WHITE }}
            {...fadeUp}
          >
            Built for B2B companies that have traction but not a system
          </motion.h2>

          <motion.div {...stagger(0)}>
            <RevenueRangeVisual />
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
            <motion.p
              className="text-[15px] leading-[1.8]"
              style={{ color: `${OFF_WHITE}B3` }}
              {...stagger(0)}
            >
              GTM Design is designed for B2B companies between $2M and $50M in
              revenue — past early traction, short of a full growth
              infrastructure. You have a product that works and customers who
              bought it. What you don't have is a repeatable, scalable system for
              finding more of them. This engagement is the architectural starting
              point.
            </motion.p>

            <motion.div {...stagger(1)}>
              <p className="mb-6 text-xs font-semibold uppercase tracking-wider"
                style={{ color: `${OFF_WHITE}99`, fontFamily: MONO }}>
                You're a fit if...
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  "Your pipeline is inconsistent quarter to quarter",
                  "Your ICP is defined informally or not at all",
                  "Outbound exists but isn\u2019t producing predictable results",
                  "You\u2019re preparing for a hiring push and need a system before adding headcount",
                  "You\u2019ve tried tools and tactics but haven\u2019t built the underlying architecture",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-[1.6]"
                    style={{ color: `${OFF_WHITE}B3` }}
                  >
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: RUST }} />
                    <span style={{ fontFamily: SANS }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE ERA CONNECTION ── */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-8 text-2xl font-bold leading-snug md:text-4xl"
            style={{ color: OFF_WHITE }}
            {...fadeUp}
          >
            Designed inside the Three Loops framework
          </motion.h2>

          <motion.div className="mb-10" {...stagger(0)}>
            <ThreeLoopsMini />
          </motion.div>

          <motion.p
            className="max-w-3xl text-[15px] leading-[1.8]"
            style={{ color: `${OFF_WHITE}B3` }}
            {...stagger(1)}
          >
            Every GTM Design engagement is built on ERA's Three Loops model:
            Connection, Trust, and Loyalty. Your pipeline map reflects all three
            loops. Your ICP criteria are scored against loop-stage fit. Your
            campaign architecture is sequenced to move buyers through each loop
            in order. This means if you move into a full ERA engagement after GTM
            Design, there is no rebuild, no translation cost. Your blueprint
            becomes your operator's playbook.
          </motion.p>
        </div>
      </section>

      {/* ── FOOTER CTA BAND ── */}
      <section
        className="px-6 py-20 text-center md:px-10 md:py-28"
        style={{ backgroundColor: RUST }}
      >
        <motion.h2
          className="text-3xl font-bold md:text-4xl"
          style={{ color: "white" }}
          {...fadeUp}
        >
          Ready to build the system?
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-md text-lg"
          style={{ color: "rgba(255,255,255,0.8)" }}
          {...stagger(1)}
        >
          GTM Design is a fixed-scope engagement. Delivered in three weeks.
        </motion.p>

        <motion.div className="mt-8" {...stagger(2)}>
          <a
            href="/#contact"
            className="inline-block rounded-[4px] px-8 py-3.5 text-sm font-semibold transition-colors hover:bg-gray-100"
            style={{ backgroundColor: "white", color: DARK }}
          >
            Start the Conversation
          </a>
        </motion.div>
      </section>

      <CTAFooter />
    </div>
  );
}
