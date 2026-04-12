import { useState, useMemo } from "react";
import { motion } from "framer-motion";

/* ─── Types ─── */
type Loop = "connection" | "trust" | "loyalty";

interface SignalItem {
  label: string;
  loop: Loop;
  source: string;
  informs: string;
}

interface Scenario {
  title: string;
  loop: Loop;
  loopLabel: string;
  summary: string;
  buyerSees: string;
  objective: string;
  signalIds: string[];
  feedsLoop: Loop;
}

/* ─── Constants ─── */
const LOOP_COLORS: Record<Loop, string> = {
  connection: "#C8A96E",
  trust: "#2BBFAA",
  loyalty: "#D4367A",
};

const SYSTEM_LABELS: Record<Loop, string> = {
  connection: "ACQUISITION SYSTEM",
  trust: "ENGAGEMENT SYSTEM",
  loyalty: "EXPANSION SYSTEM",
};

/* ─── Signal Data (with new broader GTM signals) ─── */
function s(label: string, loop: Loop, source: string, informs: string): SignalItem {
  return { label, loop, source, informs };
}

const ROW_1: SignalItem[] = [
  s("LINKEDIN CHANGE", "connection", "Clay / LinkedIn", "Outreach sequence trigger"),
  s("EXEC HIRE", "connection", "Clay / Crunchbase", "Account re-prioritization"),
  s("FUNDING ROUND", "connection", "Crunchbase / Apollo", "ICP scoring update"),
  s("CONTENT ENGAGE", "trust", "HockeyStack / RB2B", "Intent scoring update"),
  s("TECH INSTALL", "connection", "BuiltWith / Clay", "Competitor displacement play"),
  s("LINKEDIN VIEW", "trust", "LinkedIn / Clay", "Warm outreach trigger"),
  s("CRM INACTIVITY", "connection", "CRM / Apollo", "Re-engagement sequence"),
  s("SERIES A", "connection", "Crunchbase / Clay", "New ICP account flag"),
  s("BLOG SHARE", "connection", "HockeyStack / Clay", "Authority signal tracking"),
  s("OFFICE EXPANSION", "connection", "Clay / LinkedIn", "Growth signal sequence"),
];

const ROW_2: SignalItem[] = [
  s("EMAIL OPEN", "trust", "Apollo / HockeyStack", "Follow-up timing"),
  s("DEAL STALL", "trust", "CRM / Apollo", "Re-engagement play"),
  s("CHAMPION ID", "trust", "LinkedIn / Clay", "Multi-thread expansion"),
  s("CRM UPDATE", "trust", "CRM / HubSpot", "Account record sync"),
  s("PROPOSAL SENT", "trust", "CRM / Apollo", "Committee sequence start"),
  s("THOUGHT LEADER", "connection", "LinkedIn / Clay", "Authority signal tracking"),
  s("NO REPLY", "trust", "Apollo / CRM", "Silence detection play"),
  s("PIPELINE MOVE", "trust", "CRM / HubSpot", "Stage progression tracking"),
  s("PRICING VIEW", "trust", "RB2B / HockeyStack", "Urgency sequence trigger"),
  s("WEBINAR ATTEND", "connection", "HubSpot / Clay", "Engagement scoring update"),
];

const ROW_3: SignalItem[] = [
  s("90-DAY CHECK", "loyalty", "CRM / HubSpot", "Expansion conversation"),
  s("RENEWAL WINDOW", "loyalty", "CRM / HubSpot", "Renewal sequence start"),
  s("TEAM GROWTH", "loyalty", "LinkedIn / Clay", "Seat expansion trigger"),
  s("CHAMPION MOVE", "loyalty", "LinkedIn / Clay", "Relationship re-anchor"),
  s("LOW ENGAGE", "loyalty", "HubSpot / CRM", "Risk alert sequence"),
  s("REFERRAL SIGNAL", "loyalty", "CRM / HubSpot", "Referral ask trigger"),
  s("NPS RESPONSE", "loyalty", "HubSpot / Clay", "Advocate sequence"),
  s("USAGE CHECK", "loyalty", "CRM / HubSpot", "Health score update"),
  s("USAGE DROP", "loyalty", "HubSpot / CRM", "Churn risk alert"),
  s("EXEC SPONSOR", "loyalty", "LinkedIn / CRM", "Executive alignment play"),
];

const ROW_4: SignalItem[] = [
  s("CRM INACTIVITY", "connection", "CRM / Apollo", "Re-engagement sequence"),
  s("PRICING VIEW", "trust", "RB2B / HockeyStack", "Urgency sequence trigger"),
  s("CHAMPION MOVE", "loyalty", "LinkedIn / Clay", "Relationship re-anchor"),
  s("LINKEDIN VIEW", "trust", "LinkedIn / Clay", "Warm outreach trigger"),
  s("NO REPLY", "trust", "Apollo / CRM", "Silence detection play"),
  s("USAGE DROP", "loyalty", "HubSpot / CRM", "Churn risk alert"),
  s("BLOG SHARE", "connection", "HockeyStack / Clay", "Authority signal tracking"),
  s("COMPETITOR EVAL", "connection", "HockeyStack / Clay", "Competitor displacement play"),
  s("CRM UPDATE", "trust", "CRM / HubSpot", "Account record sync"),
  s("WEBSITE VISIT", "connection", "RB2B / HockeyStack", "Warm outreach trigger"),
];

const ROW_5: SignalItem[] = [
  s("BOARD CHANGE", "connection", "LinkedIn / Clay", "Relationship map update"),
  s("THOUGHT LEADER", "connection", "LinkedIn / Clay", "Authority signal tracking"),
  s("LOW ENGAGE", "loyalty", "HubSpot / CRM", "Risk alert sequence"),
  s("FUNDING ROUND", "connection", "Crunchbase / Apollo", "ICP scoring update"),
  s("PIPELINE MOVE", "trust", "CRM / HubSpot", "Stage progression tracking"),
  s("NPS RESPONSE", "loyalty", "HubSpot / Clay", "Advocate sequence"),
  s("WEBINAR ATTEND", "connection", "HubSpot / Clay", "Engagement scoring update"),
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

/* ─── Scenario Data (updated with broader GTM scenarios) ─── */
const SCENARIOS: Scenario[] = [
  {
    title: "Content signals conversion.",
    loop: "connection",
    loopLabel: "ACQUISITION SYSTEM",
    summary:
      "Blog post drives 12 ICP visitors in 48 hours. System flags accounts, enriches contacts, triggers personalized outreach referencing the content they engaged with.",
    buyerSees:
      "An email arrives referencing the exact blog post they read, with a relevant follow-up insight. It feels like someone noticed them. It's the system.",
    objective:
      "Convert content engagement into pipeline. When ICP accounts consume content, the window for relevant outreach is 48-72 hours.",
    signalIds: ["CONTENT ENGAGE", "BLOG SHARE", "WEBSITE VISIT", "LINKEDIN VIEW"],
    feedsLoop: "trust",
  },
  {
    title: "LinkedIn engagement converts to pipeline.",
    loop: "connection",
    loopLabel: "ACQUISITION SYSTEM",
    summary:
      "Three decision-makers from a target account engage with LinkedIn content over two weeks. System detects the pattern, maps the buying committee, and activates a multi-thread sequence.",
    buyerSees:
      "Over a few weeks, they see relevant content in their feed, then a connection request from someone who clearly understands their space. The timing feels natural.",
    objective:
      "Detect multi-stakeholder LinkedIn engagement as a buying signal. When multiple people from one account engage, it indicates organizational interest.",
    signalIds: ["LINKEDIN VIEW", "THOUGHT LEADER", "CHAMPION ID", "MULTI-THREAD"],
    feedsLoop: "trust",
  },
  {
    title: "Deal stalls for 30 days.",
    loop: "trust",
    loopLabel: "ENGAGEMENT SYSTEM",
    summary:
      "Re-engagement activates. New context added to the account. The system continues.",
    buyerSees:
      "Their main contact sends a case study that mirrors their exact situation. A week later, a different team member reaches out to a VP they've been trying to loop in.",
    objective:
      "Break the stall by adding value and expanding the thread. Give the internal champion ammunition to re-engage their buying committee.",
    signalIds: ["DEAL STALL", "NO REPLY", "CHAMPION ID", "PIPELINE MOVE"],
    feedsLoop: "loyalty",
  },
  {
    title: "Contact changes jobs.",
    loop: "connection",
    loopLabel: "ACQUISITION SYSTEM",
    summary:
      "Clay detects it within 24 hours. Congrats sequence fires. Relationship preserved.",
    buyerSees:
      "Within a week of updating their LinkedIn, they get a thoughtful congratulations message. No ask attached. Three weeks later, a relevant resource shows up.",
    objective:
      "Preserve the relationship across job changes. A champion who moves companies is the highest-probability pipeline source we have.",
    signalIds: ["EXEC HIRE", "CHAMPION MOVE", "LINKEDIN CHANGE", "CRM UPDATE"],
    feedsLoop: "trust",
  },
  {
    title: "Customer hits 90 days post-close.",
    loop: "loyalty",
    loopLabel: "EXPANSION SYSTEM",
    summary:
      "Expansion conversation initiates. That conversation informs the renewal.",
    buyerSees:
      "A check-in call that actually asks about their experience, not upsell. A shared doc summarizing what's been accomplished.",
    objective:
      "Anchor the value story before renewal math starts. Expansion conversations that start from 'here's what's working' close 3x faster.",
    signalIds: ["RENEWAL WINDOW", "USAGE CHECK", "NPS RESPONSE", "TEAM GROWTH"],
    feedsLoop: "connection",
  },
  {
    title: "Engagement score drops below threshold.",
    loop: "loyalty",
    loopLabel: "EXPANSION SYSTEM",
    summary:
      "Risk alert triggers. Re-engagement play activates before the customer notices.",
    buyerSees:
      "An invitation to an executive roundtable with peers. A personal note from their account lead. Someone noticed before they had to raise a flag.",
    objective:
      "Catch churn signals before they become churn conversations. Every at-risk account that re-engages is worth 5x a new logo.",
    signalIds: ["LOW ENGAGE", "USAGE DROP", "NPS RESPONSE", "CRM UPDATE"],
    feedsLoop: "connection",
  },
];

/* ─── Pill Component ─── */
function Pill({
  signal,
  highlighted,
  dimmed,
}: {
  signal: SignalItem;
  highlighted: boolean;
  dimmed: boolean;
}) {
  const color = LOOP_COLORS[signal.loop];
  return (
    <span
      data-signal-label={signal.label}
      style={{
        padding: "12px 20px",
        borderRadius: 22,
        border: highlighted
          ? `1.5px solid ${color}aa`
          : `1px solid ${color}${dimmed ? "22" : "66"}`,
        background: highlighted ? `${color}30` : `${color}${dimmed ? "08" : "1A"}`,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        flexShrink: 0,
        minWidth: 160,
        opacity: dimmed ? 0.25 : 1,
        transform: highlighted ? "scale(1.02)" : "scale(1)",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#1A1A1A",
          opacity: highlighted ? 1 : 0.9,
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
          opacity: highlighted ? 1 : 0.8,
          whiteSpace: "nowrap",
        }}
      >
        {signal.loop.toUpperCase()} &middot; {signal.source}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 400,
          color: "#1A1A1A",
          opacity: highlighted ? 0.7 : 0.5,
          whiteSpace: "nowrap",
        }}
      >
        {signal.informs}
      </span>
    </span>
  );
}

/* ─── Scenario Card ─── */
function ScenarioCard({
  scenario,
  isActive,
  hasSomeActive,
  onClick,
}: {
  scenario: Scenario;
  isActive: boolean;
  hasSomeActive: boolean;
  onClick: () => void;
}) {
  const color = LOOP_COLORS[scenario.loop];
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "20px 24px",
        borderRadius: 8,
        border: isActive
          ? `1px solid ${color}44`
          : "1px solid rgba(60,60,60,0.10)",
        borderLeft: isActive ? `3px solid ${color}` : "1px solid rgba(60,60,60,0.10)",
        background: isActive ? `${color}14` : "rgba(60,60,60,0.03)",
        cursor: "pointer",
        opacity: hasSomeActive && !isActive ? 0.5 : 1,
        transition: "all 0.3s ease",
        width: "100%",
      }}
    >
      <p
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: color,
          opacity: isActive ? 0.9 : 0.5,
          margin: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {scenario.loopLabel}
      </p>
      <p
        style={{
          fontSize: 17,
          fontWeight: isActive ? 700 : 600,
          color: "#3C3C3C",
          margin: "8px 0 0",
          lineHeight: 1.25,
        }}
      >
        {scenario.title}
      </p>
      <p
        style={{
          fontSize: 13,
          fontWeight: 300,
          color: isActive ? "rgba(60,60,60,0.75)" : "#6B6560",
          margin: "6px 0 0",
          lineHeight: 1.4,
          transition: "color 0.3s ease",
        }}
      >
        {scenario.summary}
      </p>
    </button>
  );
}

/* ─── Light Pill ─── */
function LightPill({
  signal,
  highlighted,
}: {
  signal: SignalItem;
  highlighted: boolean;
}) {
  const color = LOOP_COLORS[signal.loop];
  return (
    <span
      style={{
        padding: "12px 16px",
        borderRadius: 8,
        border: highlighted
          ? `1.5px solid ${color}88`
          : "1px solid rgba(60,60,60,0.10)",
        background: highlighted ? `${color}0F` : "rgba(60,60,60,0.03)",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        flexShrink: 0,
        minWidth: 155,
        opacity: highlighted ? 1 : 0.35,
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#3C3C3C",
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
          whiteSpace: "nowrap",
        }}
      >
        {signal.loop.toUpperCase()} &middot; {signal.source}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 400,
          color: "#6B6560",
          whiteSpace: "nowrap",
        }}
      >
        {signal.informs}
      </span>
    </span>
  );
}

/* ─── Signal Row (for detail panel) ─── */
function SignalRow({ scenario }: { scenario: Scenario }) {
  const highlightSet = new Set(scenario.signalIds);
  const allSignals = [...ROW_1, ...ROW_2, ...ROW_3];
  const seen = new Set<string>();
  const unique: SignalItem[] = [];
  for (const sig of allSignals) {
    if (!seen.has(sig.label)) {
      seen.add(sig.label);
      unique.push(sig);
    }
  }

  const matched = unique.filter((s) => highlightSet.has(s.label));
  const others = unique.filter((s) => !highlightSet.has(s.label));

  const pills: SignalItem[] = [
    others[0], matched[0], others[1], others[2], matched[1],
    others[3], matched[2], others[4], others[5], matched[3],
    others[6], others[7], others[8], others[9],
  ].filter(Boolean);

  return (
    <div
      style={{
        overflow: "hidden",
        mask: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        WebkitMask:
          "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 4,
          scrollbarWidth: "none",
        }}
      >
        {pills.map((sig, j) => (
          <LightPill
            key={j}
            signal={sig}
            highlighted={highlightSet.has(sig.label)}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Detail Panel ─── */
function ScenarioDetail({ scenario }: { scenario: Scenario }) {
  const color = LOOP_COLORS[scenario.loop];
  const feedsColor = LOOP_COLORS[scenario.feedsLoop];
  const feedsLabel = SYSTEM_LABELS[scenario.feedsLoop];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        padding: "36px 0 0",
      }}
    >
      <div>
        <p
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: color,
            margin: "0 0 12px",
          }}
        >
          What the buyer sees
        </p>
        <p
          style={{
            fontSize: 14,
            fontWeight: 300,
            color: "#3C3C3C",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {scenario.buyerSees}
        </p>
      </div>

      <div>
        <p
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: color,
            margin: "0 0 12px",
          }}
        >
          The objective
        </p>
        <p
          style={{
            fontSize: 14,
            fontWeight: 300,
            color: "#3C3C3C",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {scenario.objective}
        </p>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <p
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: color,
            margin: "0 0 12px",
          }}
        >
          Signals we're monitoring
        </p>
        <SignalRow scenario={scenario} />

        <p
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6B6560",
            marginTop: 20,
          }}
        >
          Feeds{" "}
          <span style={{ color: feedsColor }}>{feedsLabel}</span>
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function StagingMechanismSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const highlightedSignals = useMemo(() => {
    if (selectedIndex === null) return new Set<string>();
    return new Set(SCENARIOS[selectedIndex].signalIds);
  }, [selectedIndex]);

  const hasActive = selectedIndex !== null;

  return (
    <>
      {/* ── Dark section: header + signal grid ── */}
      <section style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-7xl px-6 pt-[120px] md:px-10 md:pt-[180px]">
          <motion.p
            className="mb-4 text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "#C4522A" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.p>

          <motion.h2
            className="max-w-4xl text-3xl font-semibold leading-[1.1] md:text-5xl"
            style={{ color: "#1A1A1A" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Every signal becomes a move. Every move feeds the system.
          </motion.h2>
        </div>

        {/* Signal Pill Grid */}
        <div className="mt-16 md:mt-12">
          <div
            style={{
              overflow: "hidden",
              backgroundColor: "#F5F5F5",
              padding: "80px 0",
              mask: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              WebkitMask:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
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
                      <Pill
                        key={`${rep}-${j}`}
                        signal={sig}
                        highlighted={hasActive && highlightedSignals.has(sig.label)}
                        dimmed={hasActive && !highlightedSignals.has(sig.label)}
                      />
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cream section: scenarios ── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 pb-[120px] pt-[80px] md:px-10 md:pb-[180px] md:pt-[100px]">
          <motion.h3
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
            className="mb-12 font-semibold leading-[1.15] text-charcoal md:mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Some of what we're running right now.
          </motion.h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map((scenario, i) => (
              <ScenarioCard
                key={i}
                scenario={scenario}
                isActive={selectedIndex === i}
                hasSomeActive={hasActive}
                onClick={() =>
                  setSelectedIndex(selectedIndex === i ? null : i)
                }
              />
            ))}
          </div>

          {/* Expanded Detail Panel */}
          <div
            style={{
              maxHeight: selectedIndex !== null ? 800 : 0,
              overflow: "hidden",
              transition: "max-height 0.5s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {selectedIndex !== null && (
              <div
                style={{
                  borderTop: "1px solid rgba(60,60,60,0.10)",
                  marginTop: 24,
                  paddingTop: 0,
                }}
              >
                <ScenarioDetail scenario={SCENARIOS[selectedIndex]} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
