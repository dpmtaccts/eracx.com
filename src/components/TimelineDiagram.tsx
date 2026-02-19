import { useEffect, useRef, useState } from "react";

const milestones = [
  { label: "DESIGN + INSTALL", period: "MONTHS 1–2" },
  { label: "FIRST RESULTS", period: "MONTHS 3–4" },
  { label: "COMPOUNDS", period: "MONTHS 5–12+" },
];

export default function TimelineDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Milestone x positions (percentage-based, mapped to viewBox 1000 wide)
  const positions = [166, 500, 833];

  return (
    <>
      {/* Desktop: horizontal */}
      <svg
        ref={ref}
        viewBox="0 0 1000 120"
        className="mb-16 hidden w-full md:mb-24 md:block"
        aria-hidden="true"
      >
        <style>{`
          @keyframes fill-line {
            from { width: 0; }
            to { width: 100%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .tl-fill { transition: none !important; }
            .tl-tick, .tl-label { opacity: 1 !important; transition: none !important; }
          }
        `}</style>

        {/* Base track */}
        <line
          x1="40" y1="60" x2="960" y2="60"
          stroke="#F5F0E8" strokeWidth="1.5" opacity="0.3"
        />

        {/* Animated fill line */}
        <line
          x1="40" y1="60" x2="960" y2="60"
          stroke="#F5F0E8" strokeWidth="1.5"
          className="tl-fill"
          style={{
            strokeDasharray: 920,
            strokeDashoffset: visible ? 0 : 920,
            transition: 'stroke-dashoffset 2s ease-in-out',
          }}
        />

        {/* Milestones */}
        {positions.map((x, i) => {
          const delays = [0.5, 1.2, 2.0];
          return (
            <g key={i}>
              {/* Tick mark */}
              <line
                x1={x} y1="54" x2={x} y2="66"
                stroke="#F5F0E8" strokeWidth="1"
                style={{
                  opacity: visible ? 1 : 0.3,
                  transition: `opacity 0.4s ease ${delays[i]}s`,
                }}
              />
              {/* Label above */}
              <text
                x={x} y="38"
                textAnchor="middle"
                fill="#F5F0E8"
                fontSize="10"
                letterSpacing="0.15em"
                style={{
                  fontFamily: 'var(--font-sans)',
                  opacity: visible ? 1 : 0.3,
                  transition: `opacity 0.4s ease ${delays[i]}s`,
                }}
              >
                {milestones[i].label}
              </text>
              {/* Period below */}
              <text
                x={x} y="88"
                textAnchor="middle"
                fill="#F5F0E8"
                fontSize="10"
                letterSpacing="0.1em"
                style={{
                  fontFamily: 'var(--font-sans)',
                  opacity: visible ? 0.5 : 0.15,
                  transition: `opacity 0.4s ease ${delays[i]}s`,
                }}
              >
                {milestones[i].period}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile: vertical */}
      <svg
        viewBox="0 0 120 400"
        className="mx-auto mb-12 block h-[300px] w-[120px] md:hidden"
        aria-hidden="true"
      >
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .tl-fill-v { transition: none !important; }
          }
        `}</style>

        {/* Base track */}
        <line
          x1="60" y1="20" x2="60" y2="380"
          stroke="#F5F0E8" strokeWidth="1.5" opacity="0.3"
        />

        {/* Animated fill line */}
        <line
          x1="60" y1="20" x2="60" y2="380"
          stroke="#F5F0E8" strokeWidth="1.5"
          className="tl-fill-v"
          style={{
            strokeDasharray: 360,
            strokeDashoffset: visible ? 0 : 360,
            transition: 'stroke-dashoffset 2s ease-in-out',
          }}
        />

        {/* Milestones — vertical */}
        {[80, 200, 320].map((y, i) => {
          const delays = [0.5, 1.2, 2.0];
          return (
            <g key={i}>
              <line
                x1="54" y1={y} x2="66" y2={y}
                stroke="#F5F0E8" strokeWidth="1"
                style={{
                  opacity: visible ? 1 : 0.3,
                  transition: `opacity 0.4s ease ${delays[i]}s`,
                }}
              />
              <text
                x="78" y={y - 6}
                fill="#F5F0E8"
                fontSize="9"
                letterSpacing="0.12em"
                style={{
                  fontFamily: 'var(--font-sans)',
                  opacity: visible ? 1 : 0.3,
                  transition: `opacity 0.4s ease ${delays[i]}s`,
                }}
              >
                {milestones[i].label}
              </text>
              <text
                x="78" y={y + 10}
                fill="#F5F0E8"
                fontSize="9"
                letterSpacing="0.08em"
                style={{
                  fontFamily: 'var(--font-sans)',
                  opacity: visible ? 0.5 : 0.15,
                  transition: `opacity 0.4s ease ${delays[i]}s`,
                }}
              >
                {milestones[i].period}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
}
