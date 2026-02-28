import { useRef, useEffect, useState } from "react";

const COLUMNS = [
  "AI-driven signals and buying intent data",
  "Automated outreach and follow-up sequences",
  "Real-time sales intelligence and alerts",
  "Proven playbooks, already loaded",
  "A team of operators running all of it",
];

/* ── Sweep configuration ── */
const SWEEP_ROWS = [0.28, 0.35, 0.45, 0.62, 0.72];
const SWEEP_SPEEDS = [0.9, 1.3, 0.7, 1.1, 0.55];
const SWEEP_OFFSETS = [0, 0.35, 0.6, 0.15, 0.8];
const DOT_SPACING = 18;
const DOT_RADIUS = 1.4;

export default function HeroSection() {
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

    const sweeps = SWEEP_ROWS.map((_, i) => SWEEP_OFFSETS[i]);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let s = 0; s < SWEEP_ROWS.length; s++) {
        const y = SWEEP_ROWS[s] * h;
        const speed = SWEEP_SPEEDS[s];

        sweeps[s] = (sweeps[s] + speed / w) % 1;
        const head = sweeps[s];

        const cols = Math.ceil(w / DOT_SPACING);

        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const xNorm = x / w;

          let dist = head - xNorm;
          if (dist < 0) dist += 1;

          let alpha: number;
          if (dist < 0.02) {
            alpha = 0.9;
          } else if (dist < 0.15) {
            alpha = 0.9 * (1 - (dist - 0.02) / 0.13);
          } else {
            alpha = 0.06;
          }

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
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          borderTop: "1px solid rgba(245, 240, 232, 0.07)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
        }}
      >
        {COLUMNS.map((label, i) => (
          <div
            key={i}
            style={{
              padding: "28px 24px",
              textAlign: "center",
              borderRight:
                i < COLUMNS.length - 1
                  ? "1px solid rgba(245, 240, 232, 0.07)"
                  : "none",
            }}
          >
            <span
              style={{
                display: "block",
                color: "#C4522A",
                fontSize: "16px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              +
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(245, 240, 232, 0.45)",
                lineHeight: 1.5,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes ghostPulse {
          0%, 100% { -webkit-text-stroke-color: rgba(245, 240, 232, 0.04); }
          50%      { -webkit-text-stroke-color: rgba(245, 240, 232, 0.07); }
        }
      `}</style>
    </section>
  );
}
