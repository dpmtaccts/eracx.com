import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

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

// --- Helper to build signal items ---

function sig(label: string, name: string, description: string, loop: Loop): SignalItem {
  return { label, name, description, loop };
}

// --- Signal rows ---

const ROW_1: SignalItem[] = [
  sig("JOB CHANGE", "Job Change", "Contact changes roles. High-intent window, new budget authority.", "connection"),
  sig("EXEC HIRE", "Exec Hire", "New VP joins target account. 90-day window before priorities lock.", "connection"),
  sig("FUNDING ROUND", "Funding Round", "Series A/B/C closes. Growth mode triggers new infrastructure spend.", "connection"),
  sig("NEW HIRE", "New Hire", "Job postings in sales or RevOps. Indicates GTM investment and pain.", "connection"),
  sig("TECH INSTALL", "Tech Install", "Target adopts a tool in your category. Active evaluation window.", "connection"),
  sig("WEB INTENT", "Web Intent", "Account visits pricing pages. Invisible buying signal.", "connection"),
  sig("GONE QUIET", "Gone Quiet", "No touchpoint in 60 days. CRM flags for re-engagement.", "connection"),
  sig("SERIES A", "Series A", "Early-stage funding closes. New budget unlocks infrastructure spend.", "connection"),
  sig("BOARD CHANGE", "Board Change", "New board member signals strategic shift. Priorities may realign.", "connection"),
  sig("OFFICE EXPANSION", "Office Expansion", "New office opened. Headcount growth signals expanded opportunity.", "connection"),
];

const ROW_2: SignalItem[] = [
  sig("EMAIL OPEN", "Email Open", "Repeated opens on specific content. Signals topic relevance.", "trust"),
  sig("DEAL STALL", "Deal Stall", "Opportunity stagnant 30 days. Triggers stakeholder check-in.", "trust"),
  sig("CHAMPION ID", "Champion ID", "Internal advocate identified. Buying process gains momentum.", "trust"),
  sig("MULTI-THREAD", "Multi-Thread", "Multiple contacts from same account engage simultaneously.", "trust"),
  sig("PROPOSAL SENT", "Proposal Sent", "Deck opened multiple times without reply. Objection signal.", "trust"),
  sig("CONTENT ENGAGE", "Content Engage", "Specific asset downloaded. Intent mapped to buying stage.", "trust"),
  sig("NO REPLY", "No Reply", "Stakeholder goes silent after engagement. Re-entry play activates.", "trust"),
  sig("DEMO REQUEST", "Demo Request", "Inbound demo request from target account. High-intent moment.", "trust"),
  sig("PRICING VIEW", "Pricing View", "Pricing page visited multiple times. Active evaluation underway.", "trust"),
  sig("SLACK CONNECT", "Slack Connect", "Shared channel requested. Relationship deepening signal.", "trust"),
];

const ROW_3: SignalItem[] = [
  sig("90-DAY CHECK", "90-Day Check", "Standard expansion window. ROI is forming, ask is timely.", "loyalty"),
  sig("RENEWAL WINDOW", "Renewal Window", "90 days out. Triggers value review and upsell conversation.", "loyalty"),
  sig("TEAM GROWTH", "Team Growth", "Headcount increase signals expanded use case opportunity.", "loyalty"),
  sig("CHAMPION MOVE", "Champion Move", "Champion moves to new company. Highest-conversion new logo.", "loyalty"),
  sig("LOW ENGAGE", "Low Engage", "Underutilization detected. Churn risk triggers proactive outreach.", "loyalty"),
  sig("REFERRAL SIGNAL", "Referral Signal", "6-month mark. Structured referral ask activates in the loop.", "loyalty"),
  sig("NPS RESPONSE", "NPS Response", "Survey response received. Sentiment data routes to account owner.", "loyalty"),
  sig("SEAT EXPANSION", "Seat Expansion", "New users added to account. Usage growth signals upsell timing.", "loyalty"),
  sig("USAGE DROP", "Usage Drop", "Activity decline detected. Churn prevention sequence activates.", "loyalty"),
  sig("EXEC SPONSOR", "Executive Sponsor", "Executive engagement confirmed. Strategic account status elevated.", "loyalty"),
];

const ROW_4: SignalItem[] = [
  sig("GONE QUIET", "Gone Quiet", "No touchpoint in 60 days. CRM flags for re-engagement.", "connection"),
  sig("PRICING VIEW", "Pricing View", "Pricing page visited multiple times. Active evaluation underway.", "trust"),
  sig("CHAMPION MOVE", "Champion Move", "Champion moves to new company. Highest-conversion new logo.", "loyalty"),
  sig("SERIES A", "Series A", "Early-stage funding closes. New budget unlocks infrastructure spend.", "connection"),
  sig("NO REPLY", "No Reply", "Stakeholder goes silent after engagement. Re-entry play activates.", "trust"),
  sig("USAGE DROP", "Usage Drop", "Activity decline detected. Churn prevention sequence activates.", "loyalty"),
  sig("DEMO REQUEST", "Demo Request", "Inbound demo request from target account. High-intent moment.", "trust"),
  sig("OFFICE EXPANSION", "Office Expansion", "New office opened. Headcount growth signals expanded opportunity.", "connection"),
  sig("EXEC SPONSOR", "Executive Sponsor", "Executive engagement confirmed. Strategic account status elevated.", "loyalty"),
  sig("WEB INTENT", "Web Intent", "Account visits pricing pages. Invisible buying signal.", "connection"),
];

const ROW_5: SignalItem[] = [
  sig("BOARD CHANGE", "Board Change", "New board member signals strategic shift. Priorities may realign.", "connection"),
  sig("SLACK CONNECT", "Slack Connect", "Shared channel requested. Relationship deepening signal.", "trust"),
  sig("LOW ENGAGE", "Low Engage", "Underutilization detected. Churn risk triggers proactive outreach.", "loyalty"),
  sig("FUNDING ROUND", "Funding Round", "Series A/B/C closes. Growth mode triggers new infrastructure spend.", "connection"),
  sig("CONTENT ENGAGE", "Content Engage", "Specific asset downloaded. Intent mapped to buying stage.", "trust"),
  sig("NPS RESPONSE", "NPS Response", "Survey response received. Sentiment data routes to account owner.", "loyalty"),
  sig("NEW HIRE", "New Hire", "Job postings in sales or RevOps. Indicates GTM investment and pain.", "connection"),
  sig("MULTI-THREAD", "Multi-Thread", "Multiple contacts from same account engage simultaneously.", "trust"),
  sig("RENEWAL WINDOW", "Renewal Window", "90 days out. Triggers value review and upsell conversation.", "loyalty"),
  sig("TECH INSTALL", "Tech Install", "Target adopts a tool in your category. Active evaluation window.", "connection"),
];

// --- Row config ---

interface RowConfig {
  signals: SignalItem[];
  duration: number;
  reverse: boolean;
  hideOnMobile?: boolean;
}

const ROWS: RowConfig[] = [
  { signals: ROW_1, duration: 35, reverse: false },
  { signals: ROW_2, duration: 40, reverse: true },
  { signals: ROW_3, duration: 30, reverse: false, hideOnMobile: true },
  { signals: ROW_4, duration: 45, reverse: true, hideOnMobile: true },
  { signals: ROW_5, duration: 38, reverse: false, hideOnMobile: true },
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
        {pills.map((s, i) => (
          <SignalPill
            key={`a-${i}`}
            signal={s}
            isMobile={isMobile}
            onHover={onPillHover}
            onLeave={onPillLeave}
          />
        ))}
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

// --- Tooltip portal ---

function TooltipPortal({ signal, x, y }: { signal: SignalItem; x: number; y: number }) {
  const color = LOOP_COLORS[signal.loop];

  return createPortal(
    <div
      className="pointer-events-none"
      style={{
        position: "fixed",
        zIndex: 100,
        left: x,
        top: y - 12,
        transform: "translate(-50%, -100%)",
        animation: "sdf-tip-in 0.12s ease-out",
      }}
    >
      <div
        className="rounded-sm border"
        style={{
          backgroundColor: "#111111",
          borderColor: color,
          padding: "12px 16px",
          width: 220,
        }}
      >
        <p
          className="uppercase tracking-[0.12em]"
          style={{ color, fontSize: 9, marginBottom: 4 }}
        >
          {LOOP_LABELS[signal.loop]}
        </p>
        <p
          className="font-semibold text-[#F5F0E8]"
          style={{ fontSize: 13, marginBottom: 6 }}
        >
          {signal.name}
        </p>
        <p
          className="text-[#F5F0E8]/65"
          style={{ fontSize: 11, lineHeight: 1.5 }}
        >
          {signal.description}
        </p>
      </div>
    </div>,
    document.body
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
    <>
      <style>{`
        .sdf-pill:hover {
          border-color: color-mix(in srgb, currentColor 80%, transparent) !important;
          transform: scale(1.04);
        }
        @keyframes sdf-tip-in {
          from { opacity: 0; transform: translate(-50%, -100%) translateY(5px); }
          to { opacity: 1; transform: translate(-50%, -100%) translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="sdf-marquee"] { animation: none !important; }
        }
      `}</style>

      <div
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          padding: "48px 0",
          maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
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
      </div>

      {/* Tooltip rendered via portal to avoid clipping */}
      {mounted && tooltip && (
        <TooltipPortal signal={tooltip.signal} x={tooltip.x} y={tooltip.y} />
      )}
    </>
  );
}
