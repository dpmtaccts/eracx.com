import { useEffect, useRef, useState } from "react";

interface LoopIdentityMotifProps {
  type: "connection" | "trust" | "loyalty";
  color: string;
}

export default function LoopIdentityMotif({ type, color }: LoopIdentityMotifProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes lim-trust-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes lim-loyalty-draw {
          from { stroke-dashoffset: 230; }
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lim-connection-line, .lim-trust-circles, .lim-trust-orbit,
          .lim-loyalty-arc, .lim-loyalty-arrow { animation: none !important; }
          .lim-connection-line { opacity: 1 !important; stroke-dashoffset: 0 !important; }
          .lim-trust-circles { opacity: 1 !important; }
          .lim-trust-orbit { animation: none !important; }
          .lim-loyalty-arc { stroke-dashoffset: 0 !important; opacity: 1 !important; }
          .lim-loyalty-arrow { opacity: 1 !important; }
        }
      `}</style>

      <svg
        ref={ref}
        viewBox="0 0 120 120"
        className="h-20 w-20 md:h-[120px] md:w-[120px]"
        aria-hidden="true"
      >
        {type === "connection" && <ConnectionMotif color={color} visible={visible} />}
        {type === "trust" && <TrustMotif color={color} visible={visible} />}
        {type === "loyalty" && <LoyaltyMotif color={color} visible={visible} />}
      </svg>
    </>
  );
}

function ConnectionMotif({ color, visible }: { color: string; visible: boolean }) {
  // Central node with 6 radiating lines at irregular angles
  const cx = 60;
  const cy = 60;
  const rays = [
    { angle: -70, len: 38 },
    { angle: -15, len: 44 },
    { angle: 35, len: 36 },
    { angle: 95, len: 42 },
    { angle: 155, len: 34 },
    { angle: 210, len: 40 },
  ];

  const endpoints = rays.map((r) => ({
    x: cx + r.len * Math.cos((r.angle * Math.PI) / 180),
    y: cy + r.len * Math.sin((r.angle * Math.PI) / 180),
    len: r.len,
  }));

  // Dashed arc connecting node 1 and node 4 (indices 1 and 4)
  const arcFrom = endpoints[1];
  const arcTo = endpoints[4];
  const arcMidX = (arcFrom.x + arcTo.x) / 2;
  const arcMidY = (arcFrom.y + arcTo.y) / 2;

  return (
    <g>
      {/* Central node */}
      <circle cx={cx} cy={cy} r={4} fill={color} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.4s" }} />

      {/* Radiating lines */}
      {rays.map((r, i) => {
        const ep = endpoints[i];
        return (
          <g key={i}>
            <line
              className="lim-connection-line"
              x1={cx} y1={cy} x2={ep.x} y2={ep.y}
              stroke={color} strokeWidth="1"
              strokeDasharray={r.len}
              style={{
                strokeDashoffset: visible ? 0 : r.len,
                transition: visible ? `stroke-dashoffset 0.4s ease-out ${i * 0.15}s, opacity 0.3s ${i * 0.15}s` : "none",
                opacity: visible ? 0.7 : 0,
              }}
            />
            <circle
              cx={ep.x} cy={ep.y} r={2}
              fill={color}
              style={{
                opacity: visible ? 0.8 : 0,
                transition: `opacity 0.3s ease-out ${0.15 + i * 0.15}s`,
              }}
            />
          </g>
        );
      })}

      {/* Dashed connecting arc */}
      <path
        d={`M ${arcFrom.x} ${arcFrom.y} Q ${arcMidX - 20} ${arcMidY + 20} ${arcTo.x} ${arcTo.y}`}
        fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3"
        style={{
          opacity: visible ? 0.3 : 0,
          transition: "opacity 0.6s ease-out 1s",
        }}
      />
    </g>
  );
}

function TrustMotif({ color, visible }: { color: string; visible: boolean }) {
  const cx = 60;
  const cy = 60;

  return (
    <g>
      {/* Three concentric circles */}
      <circle
        className="lim-trust-circles"
        cx={cx} cy={cy} r={16}
        fill="none" stroke={color} strokeWidth="1"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
      <circle
        className="lim-trust-circles"
        cx={cx} cy={cy} r={32}
        fill="none" stroke={color} strokeWidth="1"
        style={{
          opacity: visible ? 0.6 : 0,
          transition: "opacity 0.3s ease-out 0.1s",
        }}
      />
      <circle
        className="lim-trust-circles"
        cx={cx} cy={cy} r={48}
        fill="none" stroke={color} strokeWidth="1"
        style={{
          opacity: visible ? 0.3 : 0,
          transition: "opacity 0.3s ease-out 0.2s",
        }}
      />

      {/* Orbiting dot on outermost circle */}
      <g
        className="lim-trust-orbit"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: visible ? "lim-trust-orbit 6s linear infinite" : "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease-out 0.3s",
        }}
      >
        <circle cx={cx} cy={cy - 48} r={3} fill={color} />
      </g>
    </g>
  );
}

function LoyaltyMotif({ color, visible }: { color: string; visible: boolean }) {
  const cx = 60;
  const cy = 60;
  const r = 40;

  // Arc from ~20deg gap at top-right. Draw from 30deg clockwise to 350deg (320deg arc)
  const startAngle = 30;
  const endAngle = 350;
  const startRad = (startAngle * Math.PI) / 180 - Math.PI / 2;
  const endRad = (endAngle * Math.PI) / 180 - Math.PI / 2;

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const arcPath = `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`;

  // Arrowhead at end point, pointing clockwise
  const tangentAngle = endRad + Math.PI / 2;
  const arrowLen = 8;
  const arrowSpread = 0.5;
  const ax1 = x2 - arrowLen * Math.cos(tangentAngle - arrowSpread);
  const ay1 = y2 - arrowLen * Math.sin(tangentAngle - arrowSpread);
  const ax2 = x2 - arrowLen * Math.cos(tangentAngle + arrowSpread);
  const ay2 = y2 - arrowLen * Math.sin(tangentAngle + arrowSpread);

  // Approximate arc length for dasharray
  const arcLen = 230;

  return (
    <g>
      {/* Inner filled circle (customer) */}
      <circle
        cx={cx} cy={cy} r={6}
        fill={color}
        style={{
          opacity: visible ? 0.2 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Circular arrow arc */}
      <path
        className="lim-loyalty-arc"
        d={arcPath}
        fill="none" stroke={color} strokeWidth="1.5"
        strokeDasharray={arcLen}
        style={{
          strokeDashoffset: visible ? 0 : arcLen,
          transition: visible ? "stroke-dashoffset 1s ease-in-out" : "none",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Arrowhead */}
      <path
        className="lim-loyalty-arrow"
        d={`M ${ax1} ${ay1} L ${x2} ${y2} L ${ax2} ${ay2}`}
        fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease-out 0.9s",
        }}
      />
    </g>
  );
}
