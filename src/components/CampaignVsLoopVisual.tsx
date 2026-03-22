import { useEffect, useRef, useState } from "react";

function generateSpiralPath(
  cx: number,
  cy: number,
  startRadius: number,
  endRadius: number,
  rotations: number,
  points: number
): string {
  const parts: string[] = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const angle = t * rotations * 2 * Math.PI - Math.PI / 2;
    const r = startRadius + (endRadius - startRadius) * t;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    parts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return parts.join(" ");
}

export default function CampaignVsLoopVisual() {
  const ref = useRef<HTMLDivElement>(null);
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

  // Desktop SVG dimensions
  const dW = 1000;
  const dH = 200;
  const half = dW / 2;

  // Campaign line: left side
  const lineY = dH / 2;
  const lineStart = 40;
  const lineEnd = half * 0.68;
  const dotX = lineEnd + 24;
  const lineLen = lineEnd - lineStart;

  // Spiral: right side
  const spiralCx = half + half * 0.35;
  const spiralCy = dH / 2;
  const spiralPath = generateSpiralPath(spiralCx, spiralCy, 6, 70, 3, 300);

  // Mobile SVG dimensions (stacked)
  const mW = 400;
  const mHalf = 100;
  const mTotal = mHalf * 2;
  const mLineY = mHalf / 2;
  const mLineStart = 20;
  const mLineEnd = mW * 0.65;
  const mDotX = mLineEnd + 16;
  const mLineLen = mLineEnd - mLineStart;

  const mSpiralCx = mW / 2;
  const mSpiralCy = mHalf + mHalf / 2;
  const mSpiralPath = generateSpiralPath(mSpiralCx, mSpiralCy, 4, 40, 3, 300);

  return (
    <div ref={ref} aria-hidden="true">
      <style>{`
        @keyframes cvl-draw-line {
          from { stroke-dashoffset: var(--line-len); }
          to { stroke-dashoffset: 0; }
        }
        @keyframes cvl-dot-appear {
          from { opacity: 0; }
          to { opacity: 0.4; }
        }
        @keyframes cvl-spiral-rotate {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -1800; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cvl-line, .cvl-dot, .cvl-spiral { animation: none !important; }
          .cvl-line { stroke-dashoffset: 0 !important; }
          .cvl-dot { opacity: 0.4 !important; }
          .cvl-spiral { stroke-dashoffset: 0 !important; }
        }
      `}</style>

      {/* Desktop */}
      <svg
        viewBox={`0 0 ${dW} ${dH}`}
        className="hidden w-full md:block"
        style={{ height: 200 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dividing line */}
        <line x1={half} y1={0} x2={half} y2={dH} stroke="#F5F0E8" strokeWidth="1" opacity="0.2" />

        {/* Campaign line */}
        <line
          className="cvl-line"
          x1={lineStart} y1={lineY} x2={lineEnd} y2={lineY}
          stroke="#F5F0E8" strokeWidth="1.5" opacity="0.6"
          strokeDasharray={lineLen}
          style={{
            strokeDashoffset: visible ? 0 : lineLen,
            transition: visible ? "none" : undefined,
            animation: visible ? `cvl-draw-line 1.2s ease-out forwards` : "none",
            ["--line-len" as string]: lineLen,
          }}
        />

        {/* Campaign end dot */}
        <circle
          className="cvl-dot"
          cx={dotX} cy={lineY} r={3}
          fill="#F5F0E8"
          style={{
            opacity: visible ? 0.4 : 0,
            animation: visible ? `cvl-dot-appear 0.3s ease-out 1.2s forwards` : "none",
          }}
        />

        {/* Loop spiral */}
        <path
          className="cvl-spiral"
          d={spiralPath}
          fill="none" stroke="#C4522A" strokeWidth="1.5"
          strokeDasharray="600 1200"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? `cvl-spiral-rotate 8s linear infinite` : "none",
            transition: "opacity 0.6s",
          }}
        />
      </svg>

      {/* Mobile */}
      <svg
        viewBox={`0 0 ${mW} ${mTotal}`}
        className="block w-full md:hidden"
        style={{ height: 140 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dividing line (horizontal) */}
        <line x1={0} y1={mHalf} x2={mW} y2={mHalf} stroke="#F5F0E8" strokeWidth="1" opacity="0.2" />

        {/* Campaign line */}
        <line
          className="cvl-line"
          x1={mLineStart} y1={mLineY} x2={mLineEnd} y2={mLineY}
          stroke="#F5F0E8" strokeWidth="1.5" opacity="0.6"
          strokeDasharray={mLineLen}
          style={{
            strokeDashoffset: visible ? 0 : mLineLen,
            animation: visible ? `cvl-draw-line 1.2s ease-out forwards` : "none",
            ["--line-len" as string]: mLineLen,
          }}
        />

        {/* Campaign end dot */}
        <circle
          className="cvl-dot"
          cx={mDotX} cy={mLineY} r={2.5}
          fill="#F5F0E8"
          style={{
            opacity: visible ? 0.4 : 0,
            animation: visible ? `cvl-dot-appear 0.3s ease-out 1.2s forwards` : "none",
          }}
        />

        {/* Loop spiral */}
        <path
          className="cvl-spiral"
          d={mSpiralPath}
          fill="none" stroke="#C4522A" strokeWidth="1.5"
          strokeDasharray="400 800"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? `cvl-spiral-rotate 8s linear infinite` : "none",
            transition: "opacity 0.6s",
          }}
        />
      </svg>
    </div>
  );
}
