"use client";

import { useRef, useEffect, useState } from "react";

const COLUMNS = [
  "AI-driven signals and buying intent data",
  "Automated outreach and follow-up sequences",
  "Real-time sales intelligence and alerts",
  "Proven playbooks, already loaded",
  "A team of operators running all of it",
];

/* ── Sweep configuration ── */
const SWEEP_ROWS = [0.28, 0.35, 0.45, 0.62, 0.72]; // vertical positions (vh fraction)
const SWEEP_SPEEDS = [0.9, 1.3, 0.7, 1.1, 0.55]; // px per frame at 60 fps
const SWEEP_OFFSETS = [0, 0.35, 0.6, 0.15, 0.8]; // starting offset 0-1
const DOT_SPACING = 18;
const DOT_RADIUS = 1.4;

export default function SignalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  /* entrance animation trigger */
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── Canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    /* sweep positions (0-1 normalised across width) */
    const sweeps = SWEEP_ROWS.map((_, i) => SWEEP_OFFSETS[i]);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let s = 0; s < SWEEP_ROWS.length; s++) {
        const y = SWEEP_ROWS[s] * h;
        const speed = SWEEP_SPEEDS[s];

        /* advance sweep head (normalised 0-1) */
        sweeps[s] = (sweeps[s] + speed / w) % 1;
        const head = sweeps[s];

        const cols = Math.ceil(w / DOT_SPACING);

        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const xNorm = x / w; // 0-1

          /* distance behind the sweep head (wrapping) */
          let dist = head - xNorm;
          if (dist < 0) dist += 1;

          /* bright leading edge, quick fade behind */
          let alpha: number;
          if (dist < 0.02) {
            /* leading edge — bright */
            alpha = 0.9;
          } else if (dist < 0.15) {
            /* tail — fade out */
            alpha = 0.9 * (1 - (dist - 0.02) / 0.13);
          } else {
            /* dormant dots */
            alpha = 0.06;
          }

          /* edge fade (left & right 10% of screen) */
          const edgeFade = Math.min(xNorm / 0.1, (1 - xNorm) / 0.1, 1);
          alpha *= edgeFade;

          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 82, 42, ${alpha})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#0d0d0d",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Animated canvas background ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* ── Ghost word ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <span
          style={{
            fontSize: "clamp(160px, 22vw, 320px)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1px rgba(245, 240, 232, 0.04)",
            userSelect: "none",
            animation: "ghostPulse 8s ease-in-out infinite",
          }}
        >
          SYSTEM
        </span>
      </div>

      {/* ── Centred hero content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(52px, 7.5vw, 108px)",
            fontWeight: 800,
            color: "#F5F0E8",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: "900px",
            margin: "0 0 28px",
          }}
        >
          The system behind your best quarter.
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: "17px",
            fontWeight: 400,
            color: "rgba(245, 240, 232, 0.4)",
            lineHeight: 1.75,
            maxWidth: "520px",
            margin: "0 0 40px",
          }}
        >
          We bring the data, automation, playbooks, and operators. You get the
          pipeline.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#"
            style={{
              background: "#C4522A",
              color: "#F5F0E8",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "16px 36px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            See the system
          </a>
          <a
            href="/#contact"
            style={{
              fontSize: "13px",
              color: "rgba(245, 240, 232, 0.3)",
              textDecoration: "none",
              background: "none",
              fontWeight: 400,
            }}
          >
            Talk to us
          </a>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div
        className="signal-bottom-row"
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(245, 240, 232, 0.07)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
        }}
      >
        {COLUMNS.map((label, i) => (
          <div key={i} className="signal-bottom-item">
            <span className="signal-bottom-icon">+</span>
            <span className="signal-bottom-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Keyframes + bottom-row styles ── */}
      <style>{`
        @keyframes ghostPulse {
          0%, 100% { -webkit-text-stroke-color: rgba(245, 240, 232, 0.04); }
          50%      { -webkit-text-stroke-color: rgba(245, 240, 232, 0.07); }
        }

        /* ── Bottom feature row ── */
        .signal-bottom-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          padding: 0 24px;
        }

        .signal-bottom-item {
          padding: 40px 32px;
          text-align: center;
          border-right: 1px solid rgba(245, 240, 232, 0.07);
        }

        .signal-bottom-item:last-child {
          border-right: none;
        }

        .signal-bottom-icon {
          display: block;
          color: #C4522A;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .signal-bottom-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(245, 240, 232, 0.45);
          line-height: 1.6;
        }

        /* ── Tablet: 2-column grid ── */
        @media (max-width: 767px) {
          .signal-bottom-row {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 24px;
          }

          .signal-bottom-item {
            padding: 28px 20px;
            border-right: none;
            border-bottom: 1px solid rgba(245, 240, 232, 0.07);
          }

          /* vertical divider between left and right columns */
          .signal-bottom-item:nth-child(odd):not(:last-child) {
            border-right: 1px solid rgba(245, 240, 232, 0.07);
          }

          /* 5th item spans full width */
          .signal-bottom-item:last-child {
            grid-column: 1 / -1;
            border-bottom: none;
          }

          /* last item in right column (4th) — no bottom border if next row is last */
          .signal-bottom-item:nth-child(4) {
            border-bottom: none;
          }
        }

        /* ── Mobile: single column ── */
        @media (max-width: 479px) {
          .signal-bottom-row {
            grid-template-columns: 1fr;
            padding: 0 24px;
          }

          .signal-bottom-item {
            padding: 24px 16px;
            border-right: none;
            border-bottom: 1px solid rgba(245, 240, 232, 0.07);
          }

          .signal-bottom-item:nth-child(odd) {
            border-right: none;
          }

          .signal-bottom-item:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
