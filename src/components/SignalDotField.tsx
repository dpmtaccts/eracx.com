type Loop = "connection" | "trust" | "loyalty";

interface SignalItem {
  label: string;
  loop: Loop;
  loopTag: string;
  source: string;
  informs: string;
}

const LOOP_COLORS: Record<Loop, string> = {
  connection: "#C8A96E",
  trust: "#2BBFAA",
  loyalty: "#D4367A",
};

const LOOP_LABELS: Record<Loop, string> = {
  connection: "CONNECTION",
  trust: "TRUST",
  loyalty: "LOYALTY",
};

function s(label: string, loop: Loop, source: string, informs: string): SignalItem {
  return { label, loop, loopTag: LOOP_LABELS[loop], source, informs };
}

const ROW_1: SignalItem[] = [
  s("JOB CHANGE", "connection", "Clay / LinkedIn", "Outreach sequence trigger"),
  s("EXEC HIRE", "connection", "Clay / Crunchbase", "Account re-prioritization"),
  s("FUNDING ROUND", "connection", "Crunchbase / Apollo", "ICP scoring update"),
  s("NEW HIRE", "connection", "LinkedIn / Clay", "Hiring signal sequence"),
  s("TECH INSTALL", "connection", "BuiltWith / Clay", "Competitor displacement play"),
  s("WEB INTENT", "connection", "RB2B / HockeyStack", "Warm outreach trigger"),
  s("GONE QUIET", "connection", "CRM / Apollo", "Re-engagement sequence"),
  s("SERIES A", "connection", "Crunchbase / Clay", "New ICP account flag"),
  s("BOARD CHANGE", "connection", "LinkedIn / Clay", "Relationship map update"),
  s("OFFICE EXPANSION", "connection", "Clay / LinkedIn", "Growth signal sequence"),
];

const ROW_2: SignalItem[] = [
  s("EMAIL OPEN", "trust", "Apollo / HockeyStack", "Follow-up timing"),
  s("DEAL STALL", "trust", "CRM / Apollo", "Re-engagement play"),
  s("CHAMPION ID", "trust", "LinkedIn / Clay", "Multi-thread expansion"),
  s("MULTI-THREAD", "trust", "CRM / Clay", "Stakeholder map update"),
  s("PROPOSAL SENT", "trust", "CRM / Apollo", "Committee sequence start"),
  s("CONTENT ENGAGE", "trust", "HockeyStack / RB2B", "Intent scoring update"),
  s("NO REPLY", "trust", "Apollo / CRM", "Silence detection play"),
  s("DEMO REQUEST", "trust", "HubSpot / Apollo", "High-intent sequence"),
  s("PRICING VIEW", "trust", "RB2B / HockeyStack", "Urgency sequence trigger"),
  s("SLACK CONNECT", "trust", "Clay / LinkedIn", "Champion warmth signal"),
];

const ROW_3: SignalItem[] = [
  s("90-DAY CHECK", "loyalty", "CRM / HubSpot", "Expansion conversation"),
  s("RENEWAL WINDOW", "loyalty", "CRM / HubSpot", "Renewal sequence start"),
  s("TEAM GROWTH", "loyalty", "LinkedIn / Clay", "Seat expansion trigger"),
  s("CHAMPION MOVE", "loyalty", "LinkedIn / Clay", "Relationship re-anchor"),
  s("LOW ENGAGE", "loyalty", "HubSpot / CRM", "Risk alert sequence"),
  s("REFERRAL SIGNAL", "loyalty", "CRM / HubSpot", "Referral ask trigger"),
  s("NPS RESPONSE", "loyalty", "HubSpot / Clay", "Advocate sequence"),
  s("SEAT EXPANSION", "loyalty", "CRM / HubSpot", "Upsell conversation"),
  s("USAGE DROP", "loyalty", "HubSpot / CRM", "Churn risk alert"),
  s("EXEC SPONSOR", "loyalty", "LinkedIn / CRM", "Executive alignment play"),
];

const ROW_4: SignalItem[] = [
  s("GONE QUIET", "connection", "CRM / Apollo", "Re-engagement sequence"),
  s("PRICING VIEW", "trust", "RB2B / HockeyStack", "Urgency sequence trigger"),
  s("CHAMPION MOVE", "loyalty", "LinkedIn / Clay", "Relationship re-anchor"),
  s("SERIES A", "connection", "Crunchbase / Clay", "New ICP account flag"),
  s("NO REPLY", "trust", "Apollo / CRM", "Silence detection play"),
  s("USAGE DROP", "loyalty", "HubSpot / CRM", "Churn risk alert"),
  s("DEMO REQUEST", "trust", "HubSpot / Apollo", "High-intent sequence"),
  s("OFFICE EXPANSION", "connection", "Clay / LinkedIn", "Growth signal sequence"),
  s("EXEC SPONSOR", "loyalty", "LinkedIn / CRM", "Executive alignment play"),
  s("WEB INTENT", "connection", "RB2B / HockeyStack", "Warm outreach trigger"),
];

const ROW_5: SignalItem[] = [
  s("BOARD CHANGE", "connection", "LinkedIn / Clay", "Relationship map update"),
  s("SLACK CONNECT", "trust", "Clay / LinkedIn", "Champion warmth signal"),
  s("LOW ENGAGE", "loyalty", "HubSpot / CRM", "Risk alert sequence"),
  s("FUNDING ROUND", "connection", "Crunchbase / Apollo", "ICP scoring update"),
  s("CONTENT ENGAGE", "trust", "HockeyStack / RB2B", "Intent scoring update"),
  s("NPS RESPONSE", "loyalty", "HubSpot / Clay", "Advocate sequence"),
  s("NEW HIRE", "connection", "LinkedIn / Clay", "Hiring signal sequence"),
  s("MULTI-THREAD", "trust", "CRM / Clay", "Stakeholder map update"),
  s("RENEWAL WINDOW", "loyalty", "CRM / HubSpot", "Renewal sequence start"),
  s("TECH INSTALL", "connection", "BuiltWith / Clay", "Competitor displacement play"),
];

const ROWS = [
  { signals: ROW_1, offset: -40 },
  { signals: ROW_2, offset: -120 },
  { signals: ROW_3, offset: -60 },
  { signals: ROW_4, offset: -160 },
  { signals: ROW_5, offset: -80 },
];

function Pill({ signal }: { signal: SignalItem }) {
  const color = LOOP_COLORS[signal.loop];
  return (
    <span
      style={{
        padding: "12px 20px",
        borderRadius: 22,
        border: `1px solid ${color}66`,
        background: `${color}1A`,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        flexShrink: 0,
        minWidth: 160,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#F5F0E8",
          opacity: 0.9,
          whiteSpace: "nowrap",
        }}
      >
        {signal.label}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: color,
          opacity: 0.8,
          whiteSpace: "nowrap",
        }}
      >
        {signal.loopTag} · {signal.source}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 400,
          color: "#F5F0E8",
          opacity: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        {signal.informs}
      </span>
    </span>
  );
}

export default function SignalDotField() {
  return (
    <div
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        overflow: "hidden",
        backgroundColor: "#1A1A1A",
        padding: "80px 0",
        mask: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMask: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ROWS.map((row, i) => (
          <div
            key={i}
            className={i >= 2 ? "hidden md:flex" : "flex"}
            style={{
              marginLeft: row.offset,
              gap: 14,
              flexWrap: "nowrap",
            }}
          >
            {[0, 1, 2].map((rep) =>
              row.signals.map((sig, j) => (
                <Pill key={`${rep}-${j}`} signal={sig} />
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
