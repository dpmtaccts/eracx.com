interface SignalIndicatorProps {
  type: "job-change" | "deal-stall" | "funding" | "post-close";
  color: string;
}

export default function SignalIndicator({ type, color }: SignalIndicatorProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      className="h-10 w-10 md:h-[60px] md:w-[60px]"
      aria-hidden="true"
    >
      {type === "job-change" && (
        <>
          {/* Two overlapping circles — contact moving contexts */}
          <circle
            cx="22" cy="30" r="16"
            fill="none" stroke={color} strokeWidth="1" opacity="0.6"
          />
          <circle
            cx="38" cy="30" r="16"
            fill="none" stroke={color} strokeWidth="1" opacity="0.6"
            strokeDasharray="3 2"
          />
        </>
      )}

      {type === "deal-stall" && (
        <>
          {/* Interrupted line with dot in gap */}
          <line
            x1="4" y1="30" x2="22" y2="30"
            stroke={color} strokeWidth="1" opacity="0.6"
          />
          <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
          <line
            x1="38" y1="30" x2="56" y2="30"
            stroke={color} strokeWidth="1" opacity="0.6"
          />
        </>
      )}

      {type === "funding" && (
        <>
          {/* Three concentric 90° arcs radiating outward */}
          <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
          <path
            d="M 30 18 A 12 12 0 0 1 42 30"
            fill="none" stroke={color} strokeWidth="1" opacity="0.8"
          />
          <path
            d="M 30 12 A 18 18 0 0 1 48 30"
            fill="none" stroke={color} strokeWidth="1" opacity="0.5"
          />
          <path
            d="M 30 6 A 24 24 0 0 1 54 30"
            fill="none" stroke={color} strokeWidth="1" opacity="0.25"
          />
        </>
      )}

      {type === "post-close" && (
        <>
          {/* 75% arc with arrowhead */}
          <path
            d="M 30 8 A 22 22 0 1 1 8 30"
            fill="none" stroke={color} strokeWidth="1" opacity="0.6"
          />
          {/* Arrowhead at end of arc */}
          <path
            d="M 12 26 L 8 30 L 4 26"
            fill="none" stroke={color} strokeWidth="1" opacity="0.6"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
