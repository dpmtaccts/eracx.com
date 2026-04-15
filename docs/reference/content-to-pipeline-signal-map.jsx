import { useState } from "react";

const signalData = [
  {
    id: 1,
    category: "Leadership Visibility",
    signal: "CEO/Founder LinkedIn presence and executive visibility",
    currentState: "CEO Alexi Robichaux has 48K+ followers but content is heavily mission-driven and philosophical. Limited engagement from enterprise CHRO buyers. Co-founder Eddie Medina has minimal public presence.",
    buyerCares: "CHROs evaluating a $499+/user platform want to see the CEO speaking their language: workforce ROI, retention economics, leadership pipeline metrics. They want proof the leader understands their P&L pressure.",
    alignment: 18,
    pipelineImpact: "Enterprise buyers researching BetterUp leadership find inspiration content, not business content. This creates a trust gap at the executive sponsor level. Estimated impact: 15-20% of late-stage deals stall at exec alignment.",
    recommendation: "Shift 60% of CEO content from mission narrative to outcome narrative. Feature client CFO/CHRO co-authored content. Build a 'Leadership Signal Score' for the top 5 execs and track ICP engagement monthly.",
    impactLevel: "critical"
  },
  {
    id: 2,
    category: "Thought Leadership",
    signal: "Content theme alignment with buyer priorities",
    currentState: "BetterUp's content engine produces high-quality material on resilience, purpose, mental fitness, and belonging. The Brene Brown partnership amplifies this positioning. Blog cadence is consistent.",
    buyerCares: "In 2025-2026, CHROs are buying solutions for three problems: manager effectiveness, AI workforce readiness, and retention cost reduction. 'Resilience' and 'belonging' are secondary to operational outcomes.",
    alignment: 35,
    pipelineImpact: "Content attracts L&D practitioners (influencers) but underperforms with budget holders (decision-makers). Top-of-funnel volume looks healthy while mid-funnel conversion to pipeline lags. The content builds audience but not pipeline.",
    recommendation: "Create a parallel content track: 'The Business Case' series targeting CFO/CHRO co-buying. Every piece of thought leadership should have a companion asset that translates insight into ROI language.",
    impactLevel: "critical"
  },
  {
    id: 3,
    category: "Brand Narrative",
    signal: "'Human Transformation Platform' positioning",
    currentState: "BetterUp's core positioning centers on 'human transformation' across all major touchpoints. Website, LinkedIn, press releases, and sales materials all lead with this language.",
    buyerCares: "Enterprise procurement teams don't buy 'transformation.' They buy measurable outcomes with clear ROI timelines. The more abstract the positioning, the longer the sales cycle and the more competitive the evaluation.",
    alignment: 25,
    pipelineImpact: "Positioning creates initial curiosity but fails to convert to consideration. Buyers who can't quickly articulate what BetterUp does in business terms struggle to build internal consensus. This lengthens sales cycles by an estimated 30-45 days.",
    recommendation: "Replace 'human transformation' with three outcome-specific positioning statements mapped to buyer persona. CHRO: 'Retain your best leaders.' CFO: 'Reduce leadership turnover cost by X%.' CLO: 'Scale coaching without scaling headcount.'",
    impactLevel: "critical"
  },
  {
    id: 4,
    category: "Competitive Signal",
    signal: "Category ownership vs. competitor encroachment",
    currentState: "BetterUp is the default benchmark in competitor SEO strategies. CoachHub, Torch, and Ezra all position against BetterUp in comparison content. BetterUp does not actively counter-position.",
    buyerCares: "Buyers conducting self-directed research encounter competitor comparison pages before BetterUp's own differentiation content. The comparison narrative is being written by competitors, not by BetterUp.",
    alignment: 40,
    pipelineImpact: "Ceding the comparison conversation means BetterUp enters competitive deals already framed by competitor positioning. Buyers arrive at sales conversations with competitor talking points. Win rate in competitive deals likely 5-10% lower than it should be.",
    recommendation: "Build an owned comparison hub. Publish transparent 'BetterUp vs.' content that controls the narrative. Create a competitive intelligence brief for AEs updated quarterly.",
    impactLevel: "high"
  },
  {
    id: 5,
    category: "Employee Signal",
    signal: "Internal brand as external pipeline signal",
    currentState: "Glassdoor 3.2/5 from 688+ reviews. 'BetterUp culture' search returns negative employee sentiment as a top result. The values-reality gap is documented, public, and directly relevant to the buyer persona.",
    buyerCares: "CHROs purchasing a coaching and culture platform will absolutely check the vendor's own employee experience. A 3.2 Glassdoor for a company selling psychological safety is a category-specific deal killer.",
    alignment: 12,
    pipelineImpact: "This is the single highest-impact signal leak in the entire map. Every enterprise deal where the CHRO or procurement team googles 'BetterUp culture' encounters a direct contradiction of the product promise. Estimated pipeline impact: 10-15% of qualified opportunities lost at due diligence.",
    recommendation: "This is not a content fix. It is an operational fix that must precede any brand repair. Commit to a 12-month internal transformation with external accountability. Then tell that story authentically.",
    impactLevel: "critical"
  },
  {
    id: 6,
    category: "Product Signal",
    signal: "AI coaching product narrative (BetterUp Grow)",
    currentState: "BetterUp Grow launched Jan 2025 with strong press coverage. 95% early satisfaction reported. The 'responsible AI' development story (4+ years) is genuine but underdeveloped in market messaging.",
    buyerCares: "Enterprise buyers are actively seeking AI-augmented L&D solutions in 2025-2026. The buyer wants proof of safety, efficacy, and integration with existing HR tech stack. 'Responsible AI' is a differentiator if substantiated.",
    alignment: 65,
    pipelineImpact: "This is BetterUp's strongest signal-to-pipeline alignment. AI coaching is the conversation enterprise buyers want to have right now. The gap is in depth of proof, not direction. More substantiation creates more pipeline velocity.",
    recommendation: "Double down. Publish the AI safety methodology in detail. Create a 'Responsible AI in Coaching' certification or framework that positions BetterUp as the standard-setter. This is the one area where signal and buyer intent are already aligned.",
    impactLevel: "opportunity"
  },
  {
    id: 7,
    category: "Pricing Signal",
    signal: "Pricing transparency as a trust signal",
    currentState: "No public pricing. Market estimates of $499+/user/month circulate in review sites and competitor content. 'Expensive' and 'opaque' are dominant brand attributes in buyer perception research.",
    buyerCares: "Self-directed B2B buyers (70%+ of the buying journey happens before sales contact) expect pricing context. Opacity doesn't create exclusivity in enterprise HR tech. It creates friction and suspicion.",
    alignment: 15,
    pipelineImpact: "Pricing opacity is filtering out mid-market and budget-conscious enterprise buyers before they ever enter the pipeline. The buyers who do enter arrive skeptical about value, which lengthens negotiation cycles and compresses margins.",
    recommendation: "Publish 'starting from' pricing tiers and an ROI calculator. Even directional pricing reduces friction. Pair with case studies showing cost-per-outcome rather than cost-per-seat.",
    impactLevel: "high"
  },
  {
    id: 8,
    category: "Community Signal",
    signal: "Coach network as a brand amplification channel",
    currentState: "5,000+ coaches are BetterUp's most visible human touchpoint. Current sentiment: declining satisfaction, pay disputes, communication gaps. Coaches are generating detractor content on Indeed and social platforms.",
    buyerCares: "Buyers evaluate coaching platforms partly through the quality and enthusiasm of the coach network. A disengaged coach community signals product quality risk to sophisticated enterprise buyers.",
    alignment: 20,
    pipelineImpact: "Every dissatisfied coach who posts about BetterUp on LinkedIn or Indeed reaches the same professional network that contains BetterUp's buyers. Coach word-of-mouth is either an organic pipeline engine or an organic pipeline destroyer. Currently trending toward the latter.",
    recommendation: "Launch a formal Coach Ambassador program with fair compensation, communication transparency, and platform governance input. Treat coaches as the most important marketing channel, because they are.",
    impactLevel: "critical"
  }
];

const impactColors = {
  critical: { bg: "rgba(220, 38, 38, 0.08)", border: "#dc2626", badge: "#dc2626", text: "#991b1b", label: "Critical Gap" },
  high: { bg: "rgba(234, 179, 8, 0.08)", border: "#ca8a04", badge: "#ca8a04", text: "#854d0e", label: "High Gap" },
  opportunity: { bg: "rgba(22, 163, 74, 0.08)", border: "#16a34a", badge: "#16a34a", text: "#166534", label: "Opportunity" }
};

function AlignmentBar({ value }) {
  const getColor = (v) => {
    if (v <= 25) return "#dc2626";
    if (v <= 50) return "#ca8a04";
    if (v <= 75) return "#2563eb";
    return "#16a34a";
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ flex: 1, height: "8px", background: "#1a1a2e", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{
          width: `${value}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${getColor(value)}, ${getColor(value)}cc)`,
          borderRadius: "4px",
          transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
        }} />
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: getColor(value), minWidth: "36px" }}>{value}%</span>
    </div>
  );
}

function SignalCard({ signal, isExpanded, onToggle }) {
  const colors = impactColors[signal.impactLevel];
  return (
    <div style={{
      background: isExpanded ? colors.bg : "rgba(255,255,255,0.02)",
      border: `1px solid ${isExpanded ? colors.border + "40" : "rgba(255,255,255,0.06)"}`,
      borderRadius: "12px",
      overflow: "hidden",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }} onClick={onToggle}>
      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            <span style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.badge,
              background: colors.badge + "18",
              padding: "4px 10px",
              borderRadius: "4px",
              fontFamily: "'JetBrains Mono', monospace"
            }}>{colors.label}</span>
            <span style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'JetBrains Mono', monospace"
            }}>{signal.category}</span>
          </div>
          <span style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.3)",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
            lineHeight: 1
          }}>&#9662;</span>
        </div>
        <h3 style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          margin: "0 0 14px 0",
          lineHeight: 1.4,
          fontFamily: "'Instrument Serif', Georgia, serif"
        }}>{signal.signal}</h3>
        <AlignmentBar value={signal.alignment} />
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "6px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
          SIGNAL-TO-BUYER ALIGNMENT
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: "0 24px 24px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 0 20px" }} />
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>
                What They're Signaling
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: 0 }}>{signal.currentState}</p>
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>
                What The Buyer Needs to Hear
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: 0 }}>{signal.buyerCares}</p>
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "8px",
            padding: "16px 20px",
            marginBottom: "16px",
            borderLeft: `3px solid ${colors.border}`
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: colors.badge, marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>
              Pipeline Impact
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.75)", margin: 0 }}>{signal.pipelineImpact}</p>
          </div>

          <div style={{
            background: "rgba(22, 163, 74, 0.06)",
            borderRadius: "8px",
            padding: "16px 20px",
            borderLeft: "3px solid #16a34a"
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#16a34a", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>
              Signal Fix
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.75)", margin: 0 }}>{signal.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContentToPipelineSignalMap() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? signalData : signalData.filter(s => s.impactLevel === filter);
  const avgAlignment = Math.round(signalData.reduce((a, s) => a + s.alignment, 0) / signalData.length);
  const criticalCount = signalData.filter(s => s.impactLevel === "critical").length;

  return (
    <div style={{
      background: "#0a0a14",
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: "rgba(255,255,255,0.9)"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "48px 40px 0" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2626", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>
              Revenue Signal Audit | Section 3
            </span>
          </div>
          <h1 style={{
            fontSize: "42px",
            fontWeight: 400,
            fontFamily: "'Instrument Serif', Georgia, serif",
            lineHeight: 1.15,
            margin: "0 0 12px",
            color: "rgba(255,255,255,0.95)"
          }}>
            Content-to-Pipeline<br />Signal Map
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(255,255,255,0.45)", margin: "0 0 40px", maxWidth: "600px" }}>
            Where brand signals are connecting to buyer intent, where they are leaking pipeline, and what to fix first.
          </p>

          {/* Summary Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden", marginBottom: "40px" }}>
            <div style={{ background: "#0a0a14", padding: "24px 28px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "32px", fontWeight: 700, color: "#dc2626" }}>{avgAlignment}%</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>Avg Signal Alignment</div>
            </div>
            <div style={{ background: "#0a0a14", padding: "24px 28px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "32px", fontWeight: 700, color: "#dc2626" }}>{criticalCount}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>Critical Signal Gaps</div>
            </div>
            <div style={{ background: "#0a0a14", padding: "24px 28px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "32px", fontWeight: 700, color: "#16a34a" }}>1</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>Strong Alignment</div>
            </div>
          </div>

          {/* Key Insight Box */}
          <div style={{
            background: "rgba(220, 38, 38, 0.06)",
            border: "1px solid rgba(220, 38, 38, 0.15)",
            borderRadius: "12px",
            padding: "24px 28px",
            marginBottom: "40px"
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dc2626", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
              Core Finding
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>
              BetterUp is generating high-volume brand signals that attract practitioners and influencers, but critically misaligned with the language and priorities of enterprise budget holders. The result: strong top-of-funnel awareness that fails to convert to qualified pipeline. Seven of eight signal categories score below 50% alignment with buyer intent. The brand is broadcasting when it should be connecting.
            </p>
          </div>

          {/* Filter */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
            {[
              { key: "all", label: "All Signals" },
              { key: "critical", label: "Critical" },
              { key: "high", label: "High" },
              { key: "opportunity", label: "Opportunity" }
            ].map(f => (
              <button key={f.key} onClick={(e) => { e.stopPropagation(); setFilter(f.key); }} style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: `1px solid ${filter === f.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                background: filter === f.key ? "rgba(255,255,255,0.08)" : "transparent",
                color: filter === f.key ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.02em",
                transition: "all 0.2s ease"
              }}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Signal Cards */}
      <div style={{ padding: "0 40px 60px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map(signal => (
            <SignalCard
              key={signal.id}
              signal={signal}
              isExpanded={expandedId === signal.id}
              onToggle={() => setExpandedId(expandedId === signal.id ? null : signal.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Framework */}
      <div style={{ padding: "0 40px 80px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "32px"
          }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "24px", fontWeight: 400, margin: "0 0 8px", color: "rgba(255,255,255,0.9)" }}>
              How to Read This Map
            </h2>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>
              Each signal represents a message your brand sends into the market. Alignment measures how well that signal matches what your enterprise buyer needs to hear to move from awareness to pipeline.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              <div style={{ padding: "16px", background: "rgba(220, 38, 38, 0.06)", borderRadius: "8px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#dc2626", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>0-35% ALIGNMENT</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Signal is actively leaking pipeline. The gap between what you're saying and what the buyer needs creates friction, stalls deals, or loses them entirely.</div>
              </div>
              <div style={{ padding: "16px", background: "rgba(234, 179, 8, 0.06)", borderRadius: "8px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#ca8a04", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>36-60% ALIGNMENT</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Signal is partially connected. The brand is in the right conversation but not speaking the buyer's language precisely enough to convert attention to action.</div>
              </div>
              <div style={{ padding: "16px", background: "rgba(22, 163, 74, 0.06)", borderRadius: "8px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>61-100% ALIGNMENT</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Signal is generating pipeline. The brand message matches buyer intent. Invest more here. This is where acceleration happens.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
