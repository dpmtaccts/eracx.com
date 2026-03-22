interface LoopDiagramProps {
  loopColor: string;
  loopNumber: string;
  labels: [string, string, string];
  variant: "dark" | "light";
}

export default function LoopDiagram({
  loopColor,
  loopNumber,
  labels,
  variant,
}: LoopDiagramProps) {
  const isDark = variant === "dark";
  const centerColor = isDark ? "#F5F0E8" : "#111111";
  const labelColor = isDark ? "#F5F0E8" : "#111111";

  const cx = 160;
  const cy = 160;
  const r = 110;

  const angles = [-90, 30, 150];
  const nodes = angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  const labelOffset = 30;
  const labelPositions = angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + (r + labelOffset) * Math.cos(rad),
      y: cy + (r + labelOffset) * Math.sin(rad),
    };
  });

  const circumference = 2 * Math.PI * r;

  return (
    <svg
      viewBox="0 0 320 320"
      className="h-[220px] w-[220px] md:h-[320px] md:w-[320px]"
      aria-hidden="true"
    >
      <style>{`
        @keyframes loop-rotate {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -${circumference}; }
        }
        .loop-arc {
          animation: loop-rotate 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .loop-arc { animation: none; }
        }
      `}</style>

      {/* Track circle */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke={loopColor} strokeWidth="1" opacity="0.15"
      />

      {/* Animated dashed arc */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke={loopColor} strokeWidth="1"
        strokeDasharray="4 2"
        className="loop-arc"
      />

      {/* Center number */}
      <text
        x={cx} y={cy + 18}
        textAnchor="middle"
        fill={centerColor}
        fontSize="52" fontWeight="900" opacity="0.05"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {loopNumber}
      </text>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r="5" fill={loopColor} />
      ))}

      {/* Labels */}
      {labelPositions.map((pos, i) => (
        <text
          key={i}
          x={pos.x} y={pos.y + 4}
          textAnchor="middle"
          fill={labelColor}
          fontSize="10" letterSpacing="0.15em" opacity="0.6"
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'uppercase' as const }}
        >
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}
