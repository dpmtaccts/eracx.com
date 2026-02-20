type Loop = "connection" | "trust" | "loyalty";

interface SignalItem {
  label: string;
  loop: Loop;
}

const LOOP_COLORS: Record<Loop, string> = {
  connection: "#C8A96E",
  trust: "#2BBFAA",
  loyalty: "#D4367A",
};

function s(label: string, loop: Loop): SignalItem {
  return { label, loop };
}

const ROW_1: SignalItem[] = [
  s("JOB CHANGE", "connection"), s("EXEC HIRE", "connection"), s("FUNDING ROUND", "connection"),
  s("NEW HIRE", "connection"), s("TECH INSTALL", "connection"), s("WEB INTENT", "connection"),
  s("GONE QUIET", "connection"), s("SERIES A", "connection"), s("BOARD CHANGE", "connection"),
  s("OFFICE EXPANSION", "connection"),
];

const ROW_2: SignalItem[] = [
  s("EMAIL OPEN", "trust"), s("DEAL STALL", "trust"), s("CHAMPION ID", "trust"),
  s("MULTI-THREAD", "trust"), s("PROPOSAL SENT", "trust"), s("CONTENT ENGAGE", "trust"),
  s("NO REPLY", "trust"), s("DEMO REQUEST", "trust"), s("PRICING VIEW", "trust"),
  s("SLACK CONNECT", "trust"),
];

const ROW_3: SignalItem[] = [
  s("90-DAY CHECK", "loyalty"), s("RENEWAL WINDOW", "loyalty"), s("TEAM GROWTH", "loyalty"),
  s("CHAMPION MOVE", "loyalty"), s("LOW ENGAGE", "loyalty"), s("REFERRAL SIGNAL", "loyalty"),
  s("NPS RESPONSE", "loyalty"), s("SEAT EXPANSION", "loyalty"), s("USAGE DROP", "loyalty"),
  s("EXEC SPONSOR", "loyalty"),
];

const ROW_4: SignalItem[] = [
  s("GONE QUIET", "connection"), s("PRICING VIEW", "trust"), s("CHAMPION MOVE", "loyalty"),
  s("SERIES A", "connection"), s("NO REPLY", "trust"), s("USAGE DROP", "loyalty"),
  s("DEMO REQUEST", "trust"), s("OFFICE EXPANSION", "connection"), s("EXEC SPONSOR", "loyalty"),
  s("WEB INTENT", "connection"),
];

const ROW_5: SignalItem[] = [
  s("BOARD CHANGE", "connection"), s("SLACK CONNECT", "trust"), s("LOW ENGAGE", "loyalty"),
  s("FUNDING ROUND", "connection"), s("CONTENT ENGAGE", "trust"), s("NPS RESPONSE", "loyalty"),
  s("NEW HIRE", "connection"), s("MULTI-THREAD", "trust"), s("RENEWAL WINDOW", "loyalty"),
  s("TECH INSTALL", "connection"),
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
        height: 44,
        padding: "0 20px",
        borderRadius: 22,
        border: `1px solid ${color}66`,
        background: `${color}1A`,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "#F5F0E8",
          opacity: 0.9,
          whiteSpace: "nowrap",
        }}
      >
        {signal.label}
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
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ROWS.map((row, i) => (
          <div
            key={i}
            className={i >= 2 ? "hidden md:flex" : "flex"}
            style={{
              marginLeft: row.offset,
              gap: 12,
              flexWrap: "nowrap",
            }}
          >
            {row.signals.map((sig, j) => (
              <Pill key={j} signal={sig} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
