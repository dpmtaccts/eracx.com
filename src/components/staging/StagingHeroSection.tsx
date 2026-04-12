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

export default function StagingHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

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
            alpha = 0.45;
          } else if (dist < 0.15) {
            alpha = 0.45 * (1 - (dist - 0.02) / 0.13);
          } else {
            alpha = 0.03;
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

      {/* ── Blueprint-style Era symbol background ── */}
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
        <svg
          viewBox="0 0 4386 4387"
          style={{
            width: "min(85vh, 85vw)",
            height: "min(85vh, 85vw)",
            opacity: 1,
          }}
        >
          {/* Construction grid lines */}
          {[0, 725, 1209, 2245, 3177, 3657, 4386].map((x) => (
            <line key={`vg${x}`} x1={x} y1={0} x2={x} y2={4387} stroke="rgba(246,245,242,0.02)" strokeWidth={0.5} />
          ))}
          {[0, 725, 1209, 1416, 1726, 2072, 2387, 3078, 3178, 4387].map((y) => (
            <line key={`hg${y}`} x1={0} y1={y} x2={4386} y2={y} stroke="rgba(246,245,242,0.02)" strokeWidth={0.5} />
          ))}

          {/* Construction circles at rounded corners */}
          <circle cx={3177} cy={1209} r={1209} fill="none" stroke="rgba(246,245,242,0.03)" strokeWidth={1} className="blueprint-circle" />
          <circle cx={1209} cy={3178} r={1209} fill="none" stroke="rgba(246,245,242,0.03)" strokeWidth={1} className="blueprint-circle" />
          {/* Internal cutout construction circles */}
          <circle cx={2935} cy={2387} r={691} fill="none" stroke="rgba(246,245,242,0.02)" strokeWidth={0.5} />
          <circle cx={1382} cy={1070} r={656} fill="none" stroke="rgba(246,245,242,0.02)" strokeWidth={0.5} />

          {/* Center crosshair */}
          <line x1={1993} y1={2194} x2={2393} y2={2194} stroke="rgba(246,245,242,0.03)" strokeWidth={0.5} />
          <line x1={2193} y1={1994} x2={2193} y2={2394} stroke="rgba(246,245,242,0.03)" strokeWidth={0.5} />

          {/* Era symbol outline — stroke only, no fill */}
          <path
            d="M3176.89 0C3844.43 0.000221299 4385.58 541.15 4385.58 1208.69V4387H1208.69C541.151 4387 0 3845.85 0 3178.31V0H3176.89ZM2244.51 2387.12C2244.51 2768.52 2553.7 3077.7 2935.1 3077.7H3657.25V2071.64H2244.51V2387.12ZM725.491 725.499V1069.83C725.491 1432.17 1019.22 1725.89 1381.55 1725.89H3657.24V1416.09C3657.24 1034.69 3348.06 725.499 2966.65 725.499H725.491Z"
            fill="none"
            stroke="rgba(246,245,242,0.04)"
            strokeWidth={2}
            className="blueprint-outline"
          />

          {/* Dimension dots at key intersections */}
          {[
            [0, 0], [4386, 0], [4386, 4387], [0, 4387],
            [3177, 0], [0, 3178], [4386, 1209], [1209, 4387],
            [725, 725], [3657, 725], [3657, 1726], [725, 1070],
            [2245, 2072], [3657, 2072], [3657, 3078], [2245, 2387],
            [2935, 3078], [1382, 1726],
          ].map(([x, y], i) => (
            <circle key={`dd${i}`} cx={x} cy={y} r={3} fill="rgba(246,245,242,0.04)" />
          ))}
        </svg>
      </div>

      {/* ── "SYSTEM" watermark ── */}
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
          Don't pitch strangers.
        </h1>

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
            href="#system"
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
              padding: "36px 28px",
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
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              +
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "rgba(245, 240, 232, 0.65)",
                lineHeight: 1.6,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ghostPulse {
          0%, 100% { -webkit-text-stroke-color: rgba(245, 240, 232, 0.04); }
          50%      { -webkit-text-stroke-color: rgba(245, 240, 232, 0.07); }
        }
        @keyframes blueprintPulse {
          0%, 100% { opacity: 0.03; }
          50%      { opacity: 0.055; }
        }
        .blueprint-circle {
          animation: blueprintPulse 10s ease-in-out infinite;
        }
        @keyframes blueprintDraw {
          from { stroke-dashoffset: 16000; }
          to   { stroke-dashoffset: 0; }
        }
        .blueprint-outline {
          stroke-dasharray: 16000;
          stroke-dashoffset: 0;
          animation: blueprintDraw 2.5s ease-out;
        }
      `}</style>
    </section>
  );
}
