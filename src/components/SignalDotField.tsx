import { useState, useRef } from "react";

// --- Types & Colors ---

type Loop = "connection" | "trust" | "loyalty";

interface SignalItem {
  label: string;
  name: string;
  description: string;
  loop: Loop;
}

const LOOP_COLORS: Record<Loop, string> = {
  connection: "#C8A96E",
  trust: "#2BBFAA",
  loyalty: "#D4367A",
};

const LOOP_LABELS: Record<Loop, string> = {
  connection: "CONNECTION LOOP",
  trust: "TRUST LOOP",
  loyalty: "LOYALTY LOOP",
};

// --- Signal rows ---

const ROW_CONNECTION: SignalItem[] = [
  { label: "JOB CHANGE", name: "Job Change", description: "Contact changes roles. High-intent window, new budget authority.", loop: "connection" },
  { label: "EXEC HIRE", name: "Exec Hire", description: "New VP joins target account. 90-day window before priorities lock.", loop: "connection" },
  { label: "FUNDING ROUND", name: "Funding Round", description: "Series A/B/C closes. Growth mode triggers new infrastructure spend.", loop: "connection" },
  { label: "NEW HIRE", name: "New Hire", description: "Job postings in sales or RevOps. Indicates GTM investment and pain.", loop: "connection" },
  { label: "TECH INSTALL", name: "Tech Install", description: "Target adopts a tool in your category. Active evaluation window.", loop: "connection" },
  { label: "WEB INTENT", name: "Web Intent", description: "Account visits pricing pages. Invisible buying signal.", loop: "connection" },
  { label: "GONE QUIET", name: "Gone Quiet", description: "No touchpoint in 60 days. CRM flags for re-engagement.", loop: "connection" },
  { label: "SERIES A", name: "Series A", description: "Early-stage funding closes. New budget unlocks infrastructure spend.", loop: "connection" },
  { label: "BOARD CHANGE", name: "Board Change", description: "New board member signals strategic shift. Priorities may realign.", loop: "connection" },
  { label: "OFFICE EXPANSION", name: "Office Expansion", description: "New office opened. Headcount growth signals expanded opportunity.", loop: "connection" },
];

const ROW_TRUST: SignalItem[] = [
  { label: "EMAIL OPEN", name: "Email Open", description: "Repeated opens on specific content. Signals topic relevance.", loop: "trust" },
  { label: "DEAL STALL", name: "Deal Stall", description: "Opportunity stagnant 30 days. Triggers stakeholder check-in.", loop: "trust" },
  { label: "CHAMPION ID", name: "Champion ID", description: "Internal advocate identified. Buying process gains momentum.", loop: "trust" },
  { label: "MULTI-THREAD", name: "Multi-Thread", description: "Multiple contacts from same account engage simultaneously.", loop: "trust" },
  { label: "PROPOSAL SENT", name: "Proposal Sent", description: "Deck opened multiple times without reply. Objection signal.", loop: "trust" },
  { label: "CONTENT ENGAGE", name: "Content Engage", description: "Specific asset downloaded. Intent mapped to buying stage.", loop: "trust" },
  { label: "NO REPLY", name: "No Reply", description: "Stakeholder goes silent after engagement. Re-entry play activates.", loop: "trust" },
  { label: "DEMO REQUEST", name: "Demo Request", description: "Inbound demo request from target account. High-intent moment.", loop: "trust" },
  { label: "PRICING VIEW", name: "Pricing View", description: "Pricing page visited multiple times. Active evaluation underway.", loop: "trust" },
  { label: "SLACK CONNECT", name: "Slack Connect", description: "Shared channel requested. Relationship deepening signal.", loop: "trust" },
];

const ROW_LOYALTY: SignalItem[] = [
  { label: "90-DAY CHECK", name: "90-Day Check", description: "Standard expansion window. ROI is forming, ask is timely.", loop: "loyalty" },
  { label: "RENEWAL WINDOW", name: "Renewal Window", description: "90 days out. Triggers value review and upsell conversation.", loop: "loyalty" },
  { label: "TEAM GROWTH", name: "Team Growth", description: "Headcount increase signals expanded use case opportunity.", loop: "loyalty" },
  { label: "CHAMPION MOVE", name: "Champion Move", description: "Champion moves to new company. Highest-conversion new logo.", loop: "loyalty" },
  { label: "LOW ENGAGE", name: "Low Engage", description: "Underutilization detected. Churn risk triggers proactive outreach.", loop: "loyalty" },
  { label: "REFERRAL SIGNAL", name: "Referral Signal", description: "6-month mark. Structured referral ask activates in the loop.", loop: "loyalty" },
  { label: "NPS RESPONSE", name: "NPS Response", description: "Survey response received. Sentiment data routes to account owner.", loop: "loyalty" },
  { label: "SEAT EXPANSION", name: "Seat Expansion", description: "New users added to account. Usage growth signals upsell timing.", loop: "loyalty" },
  { label: "USAGE DROP", name: "Usage Drop", description: "Activity decline detected. Churn prevention sequence activates.", loop: "loyalty" },
  { label: "EXEC SPONSOR", name: "Executive Sponsor", description: "Executive engagement confirmed. Strategic account status elevated.", loop: "loyalty" },
];

// --- Row config ---

interface RowConfig {
  signals: SignalItem[];
  duration: number;
  reverse: boolean;
  hideOnMobile?: boolean;
}

const ROWS: RowConfig[] = [
  { signals: ROW_CONNECTION, duration: 35, reverse: false },
  { signals: ROW_TRUST, duration: 40, reverse: true },
  { signals: ROW_LOYALTY, duration: 30, reverse: false, hideOnMobile: true },
];

// --- Pill component ---

function SignalPill({
  signal,
  isMobile,
  onHover,
  onLeave,
}: {
  signal: SignalItem;
  isMobile: boolean;
  onHover: (e: React.MouseEvent, signal: SignalItem) => void;
  onLeave: () => void;
}) {
  const color = LOOP_COLORS[signal.loop];
  const h = isMobile ? 32 : 36;
  const fs = isMobile ? 10 : 11;

  return (
    <span
      className="sdf-pill"
      style={{
        height: h,
        padding: "0 14px",
        borderRadius: h / 2,
        border: `1px solid ${color}59`,
        background: `${color}14`,
        marginRight: 10,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
        cursor: "default",
        transition: "border-color 0.15s, background 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => onHover(e, signal)}
      onMouseLeave={onLeave}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: 0.9,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: fs,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#F5F0E8",
          opacity: 0.85,
          whiteSpace: "nowrap",
        }}
      >
        {signal.label}
      </span>
    </span>
  );
}

// --- Marquee row ---

function MarqueeRow({
  config,
  rowIndex,
  isMobile,
  onPillHover,
  onPillLeave,
}: {
  config: RowConfig;
  rowIndex: number;
  isMobile: boolean;
  onPillHover: (e: React.MouseEvent, signal: SignalItem) => void;
  onPillLeave: () => void;
}) {
  const [paused, setPaused] = useState(false);
  const animName = `sdf-marquee-${rowIndex}`;
  const dir = config.reverse ? "reverse" : "normal";

  const handleRowEnter = () => setPaused(true);
  const handleRowLeave = () => {
    setPaused(false);
    onPillLeave();
  };

  const pills = config.signals;

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
    >
      <style>{`
        @keyframes ${animName} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${animName} ${config.duration}s linear infinite`,
          animationDirection: dir,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* First copy */}
        {pills.map((s, i) => (
          <SignalPill
            key={`a-${i}`}
            signal={s}
            isMobile={isMobile}
            onHover={onPillHover}
            onLeave={onPillLeave}
          />
        ))}
        {/* Second copy for seamless loop */}
        {pills.map((s, i) => (
          <SignalPill
            key={`b-${i}`}
            signal={s}
            isMobile={isMobile}
            onHover={onPillHover}
            onLeave={onPillLeave}
          />
        ))}
      </div>
    </div>
  );
}

// --- Main component ---

export default function SignalDotField() {
  const [tooltip, setTooltip] = useState<{
    signal: SignalItem;
    x: number;
    y: number;
  } | null>(null);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePillHover = (e: React.MouseEvent, signal: SignalItem) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      signal,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handlePillLeave = () => {
    tooltipTimeout.current = setTimeout(() => setTooltip(null), 80);
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        padding: "48px 0",
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <style>{`
        .sdf-pill:hover {
          border-color: color-mix(in srgb, currentColor 80%, transparent) !important;
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .sdf-marquee { animation: none !important; }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ROWS.map((row, i) => (
          <div
            key={i}
            className={row.hideOnMobile ? "hidden md:block" : ""}
          >
            <MarqueeRow
              config={row}
              rowIndex={i}
              isMobile={false}
              onPillHover={handlePillHover}
              onPillLeave={handlePillLeave}
            />
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: tooltip.x,
            top: tooltip.y - 12,
            transform: "translate(-50%, -100%)",
            animation: "sdf-tip-in 0.12s ease-out",
          }}
        >
          <style>{`
            @keyframes sdf-tip-in {
              from { opacity: 0; transform: translate(-50%, -100%) translateY(5px); }
              to { opacity: 1; transform: translate(-50%, -100%) translateY(0); }
            }
          `}</style>
          <div
            className="rounded-sm border"
            style={{
              backgroundColor: "#111111",
              borderColor: LOOP_COLORS[tooltip.signal.loop],
              padding: "12px 16px",
              width: 220,
            }}
          >
            <p
              className="uppercase tracking-[0.12em]"
              style={{
                color: LOOP_COLORS[tooltip.signal.loop],
                fontSize: 9,
                marginBottom: 4,
              }}
            >
              {LOOP_LABELS[tooltip.signal.loop]}
            </p>
            <p
              className="font-semibold text-[#F5F0E8]"
              style={{ fontSize: 13, marginBottom: 6 }}
            >
              {tooltip.signal.name}
            </p>
            <p
              className="text-[#F5F0E8]/65"
              style={{ fontSize: 11, lineHeight: 1.5 }}
            >
              {tooltip.signal.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
