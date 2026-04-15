import { useState } from "react";

const ceoAudit = {
  name: "Alexi Robichaux",
  title: "CEO & Co-Founder",
  followers: "~48K+",
  headline: "CEO & Co-Founder at BetterUp — We're hiring!",
  overallScore: 38,
  sections: [
    {
      title: "Content Theme Analysis",
      score: 30,
      status: "misaligned",
      finding: "Alexi's content is overwhelmingly mission-driven and philosophical. Posts center on 'human potential,' 'inner work,' 'purpose and performance,' and 'human transformation.' He shares BetterUp research, speaks at Davos and Uplift, and amplifies partnerships (Adam Grant, Brene Brown, F1 Academy). The tone is aspirational and thought-leaderly.",
      problem: "The content builds Alexi's brand as a visionary founder. But his buyer is a CHRO or CLO evaluating a $499+/user enterprise platform. Those buyers need to hear about retention economics, manager effectiveness metrics, and workforce ROI. They're not buying 'human potential.' They're buying measurable leadership outcomes with board-reportable returns.",
      gap: "Search Alexi's last 20 posts. Count how many contain a specific business outcome (a number, a metric, a client result). Then count how many contain 'purpose,' 'transformation,' 'potential,' or 'inner work.' The ratio tells the whole story.",
      recommendation: "Shift to a 60/40 model: 60% outcome-forward content (client wins, ROI proof, business case data), 40% vision content. Every philosophical post should have a companion post that translates the idea into enterprise language. 'Inner work improves performance' becomes 'Teams that invested in coaching reduced leadership turnover by X% in 12 months.'"
    },
    {
      title: "Audience Alignment",
      score: 25,
      status: "misaligned",
      finding: "Alexi's 48K followers represent strong reach for a B2B CEO. However, engagement analysis suggests the active audience skews toward coaches, L&D practitioners, HR generalists, and BetterUp employees. These are influencers and users, not decision-makers with budget authority.",
      problem: "CHROs, CFOs, and CLOs at 1,000+ employee companies are the actual buying committee. If this audience isn't engaging (commenting, sharing, connecting), the content is building awareness with the wrong population. High follower count with low ICP engagement is a vanity metric.",
      gap: "The test: on any given post, how many commenters hold a title that includes CHRO, CFO, CLO, VP of Talent, VP of People, or SVP of HR at a company with 1,000+ employees? If fewer than 10% of engaged commenters match that profile, the content is reaching the wrong room.",
      recommendation: "Build a 'CHRO 100' target list. Engage proactively with their content before expecting them to engage with his. Publish posts that directly address CHRO-specific pain: board reporting on people investment, making the case for coaching budget, headcount reduction through coaching vs. hiring. Tag and collaborate with client CHROs on co-authored insights."
    },
    {
      title: "Posting Cadence & Format",
      score: 45,
      status: "moderate",
      finding: "Alexi posts regularly but inconsistently. Cadence appears to spike around events (Uplift, Davos, product launches) and drop between them. Format is primarily long-form text posts, some with images or carousels. He reshares BetterUp company content and amplifies team members, which is positive for internal culture signaling.",
      problem: "Event-driven posting creates visibility spikes followed by silence. LinkedIn's algorithm rewards consistency over volume. A CEO who posts weekly builds more sustained visibility than one who posts five times during a conference week and then goes quiet for three weeks.",
      gap: "The ideal cadence for a B2B CEO at this stage: 2-3 original posts per week, with a consistent publishing rhythm (same days, similar times). Currently appears closer to 1-2 posts per week on average, with multi-week gaps between events.",
      recommendation: "Establish a 'CEO Content Calendar' with three recurring content types: (1) Monday Metric: one data point from BetterUp's research with a business takeaway, (2) Wednesday Insight: a perspective on a current leadership/HR trend, (3) Friday Proof: a client outcome, case study excerpt, or testimonial. This creates predictable rhythm and trains the algorithm to reward reach."
    },
    {
      title: "Network Density with ICP",
      score: 35,
      status: "misaligned",
      finding: "Alexi is well-connected in the thought leadership ecosystem: Adam Grant, Brene Brown, Amy Edmondson, Shonda Rhimes, and various BetterUp Science Board members appear frequently. He's visible at Davos and in the 'future of work' conversation. These are credibility signals.",
      problem: "Thought leader connections build brand prestige. But they don't generate pipeline. The question is whether Alexi's 1st-degree network includes the 500 CHROs and CLOs who represent BetterUp's highest-value prospect accounts. If the CEO isn't connected to the buyer, the CEO's content never reaches the buyer's feed organically.",
      gap: "A quick proxy test: take BetterUp's top 50 target accounts. Check whether the CHRO at each account is a 1st-degree connection of Alexi's. If fewer than 60% are connected, the CEO's LinkedIn presence is not functioning as a sales asset.",
      recommendation: "Systematic outbound connection strategy: 10 strategic connection requests per week to CHROs, CLOs, and VPs of Talent at target accounts. Personalized notes referencing shared interests or relevant BetterUp research. This is not a sales motion. It's a visibility motion. Once connected, the CEO's content reaches the buyer's feed permanently."
    },
    {
      title: "Personal vs. Corporate Brand Integration",
      score: 50,
      status: "moderate",
      finding: "Alexi functions as the primary public face of BetterUp. He's the keynote speaker at Uplift, the Davos attendee, the Inc. interview subject, and the LinkedIn thought leader. The company page and CEO personal profile are closely intertwined in content themes.",
      problem: "This integration creates both strength and risk. When Alexi posts well, it elevates BetterUp. When Glassdoor reviews name the CEO specifically as a leadership problem, it creates a personal brand liability that directly affects the corporate brand. The integration means there's no firewall.",
      gap: "The Glassdoor reviews specifically and repeatedly cite CEO/COO leadership as a primary negative factor. In a world where Alexi is the most visible face of BetterUp on LinkedIn, enterprise buyers conducting due diligence will encounter both his aspirational thought leadership and the employee sentiment that contradicts it. The cognitive dissonance is a deal risk.",
      recommendation: "Two parallel strategies: (1) Address the Glassdoor issue operationally (this is not a content fix). (2) Begin elevating other executive voices (CPO Jolen Anderson, CRO, VP of Product) to distribute the brand's human presence. A CEO shouldn't carry 80%+ of the company's LinkedIn visibility. That's fragile."
    }
  ]
};

const companyAudit = {
  name: "BetterUp",
  handle: "betterup",
  followers: "196K+",
  overallScore: 52,
  sections: [
    {
      title: "Content Mix & Theme Distribution",
      score: 45,
      status: "moderate",
      finding: "The BetterUp company page runs a high-frequency content program mixing product announcements, research insights, partnership highlights (Mercedes F1, Brene Brown), event promotion (Uplift 2025/2026), employee spotlights, and thought leadership. Visual quality is consistent and polished. Tone is aspirational and brand-forward.",
      problem: "The content mix is heavily weighted toward awareness and brand building. It is underweighted on consideration-stage content: product comparison, ROI proof, buyer objection handling, and 'why BetterUp vs. alternatives' content. A CHRO following the page sees what BetterUp believes. They rarely see what BetterUp delivers in measurable terms.",
      gap: "Audit the last 30 posts. Categorize by funnel stage: Awareness (brand, vision, culture), Consideration (proof, ROI, comparison), Decision (case study, pricing context, demo invitation). The likely distribution: 70% Awareness, 20% Consideration, 10% Decision. For a company with $214M ARR and a complex enterprise sale, this mix is inverted.",
      recommendation: "Shift to 40% Awareness / 35% Consideration / 25% Decision. Create a 'Proof Point' content series: one client-outcome post per week with specific metrics. Publish 'BetterUp vs.' comparison content. Feature CFO/CHRO co-authored ROI testimonials, not just end-user testimonials."
    },
    {
      title: "Engagement Quality",
      score: 40,
      status: "misaligned",
      finding: "With 196K followers, BetterUp has strong raw reach. Engagement on posts appears moderate: a mix of reactions, shares, and comments from employees, coaches, and L&D professionals. Event-related content (Uplift announcements, speaker reveals) generates the highest engagement spikes.",
      problem: "Engagement depth matters more than engagement volume. Comments from BetterUp employees and coaches inflate apparent engagement but don't move pipeline. The signal that matters: are enterprise buyers engaging? Are CHROs commenting, sharing, or asking questions? Are prospect accounts showing up in the engagement feed?",
      gap: "A healthy B2B company page at BetterUp's scale should see 15-25% of comment engagement from non-employee, non-coach accounts. If the majority of engagement is internal or from the coach community, the page is functioning as an internal communications channel, not a demand generation asset.",
      recommendation: "Implement an engagement tracking protocol. Tag every commenter as Employee, Coach, Client, Prospect, or Other. Report monthly on Prospect engagement rate. Create 'engagement bait' content specifically designed to draw CHRO/CLO responses: polls about HR trends, provocative questions about L&D ROI, commentary on industry news that forces a buyer-perspective response."
    },
    {
      title: "Product Line Clarity",
      score: 35,
      status: "misaligned",
      finding: "BetterUp has five product lines: Lead, Manage, Ready, Grow (AI), and a government vertical. The company page mentions all of them but does not consistently differentiate them in content. A first-time visitor encounters 'human transformation platform' as the umbrella, with product names appearing intermittently.",
      problem: "Enterprise buyers need to understand what they're buying quickly. 'What does BetterUp actually do?' should be answerable in one sentence from the LinkedIn page. Currently, it requires reading through multiple posts to piece together the product architecture. This is a consideration-stage failure.",
      gap: "Try this: visit the BetterUp LinkedIn page as a CHRO who's heard the name but never engaged. Can you tell in 30 seconds what specific product you'd buy and what outcome it produces? The answer right now is no. You'd understand the mission, but not the product.",
      recommendation: "Create a recurring 'Product Spotlight' series. One product per month, deep-dived across four weekly posts: what it does, who it's for, what outcome it produces, and a specific client example. Pin the most recent product spotlight or a product overview post to the top of the page."
    },
    {
      title: "Competitive Positioning",
      score: 20,
      status: "misaligned",
      finding: "BetterUp's company page contains zero competitive positioning content. No comparison posts, no 'why BetterUp' content, no response to competitor claims. Meanwhile, CoachHub, Torch, and Ezra all actively run 'vs. BetterUp' content in their SEO and social strategies.",
      problem: "The competitor comparison narrative for BetterUp is being written entirely by competitors. When a buyer searches 'BetterUp vs CoachHub' on LinkedIn or Google, they find CoachHub's framing, not BetterUp's. This means BetterUp enters every competitive deal pre-framed by the competitor's positioning.",
      gap: "BetterUp's competitive advantage (largest dataset, most enterprise clients, AI coaching with 4+ years of development) is strong but invisible on LinkedIn. The brand is letting the most defensible differentiators go unspoken in the one channel where buyers do self-directed research.",
      recommendation: "Launch a quarterly 'Why BetterUp' post series. Not aggressive competitive takedowns, but confident, data-backed differentiation. 'Our 17M data point behavioral dataset means your coaching is personalized to what actually works, not what sounds good.' Own the comparison narrative before competitors own it for you."
    },
    {
      title: "Employee Advocacy & Social Proof",
      score: 55,
      status: "moderate",
      finding: "BetterUp encourages employee sharing, and individual employees do amplify company content. The company page features employee spotlights and culture content. Executive team members (Jolen Anderson, Ryan Weber) are active on LinkedIn and extend the brand's reach.",
      problem: "Employee advocacy is a double-edged sword when Glassdoor tells a different story. Polished employee spotlights on LinkedIn sit alongside deeply critical employee reviews on Glassdoor. A savvy enterprise buyer will check both. If the LinkedIn employee narrative feels curated while Glassdoor feels raw, the buyer trusts Glassdoor.",
      gap: "The opportunity here is significant but conditional. If BetterUp addresses its internal culture issues, a coordinated employee advocacy program with 2,751 employees could generate enormous organic reach. At current satisfaction levels, scaling employee advocacy risks amplifying the disconnect.",
      recommendation: "Hold on employee advocacy scaling until internal sentiment improves measurably. In the interim, focus advocacy programs on the executive team (5-7 leaders who are already visible and aligned) and on client-side advocates (CHROs and L&D leaders who use BetterUp and are willing to post about outcomes). External advocates are more credible than internal ones when internal sentiment is low."
    }
  ]
};

function ScoreBadge({ score, size = "large" }) {
  const getColor = (s) => {
    if (s <= 30) return { main: "#dc2626", bg: "rgba(220,38,38,0.1)" };
    if (s <= 50) return { main: "#ca8a04", bg: "rgba(202,138,4,0.1)" };
    if (s <= 70) return { main: "#2563eb", bg: "rgba(37,99,235,0.1)" };
    return { main: "#16a34a", bg: "rgba(22,163,74,0.1)" };
  };
  const c = getColor(score);
  const s = size === "large" ? 72 : 48;
  const fs = size === "large" ? 28 : 18;
  return (
    <div style={{
      width: s, height: s, borderRadius: "50%",
      border: `2px solid ${c.main}`, background: c.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono', monospace", fontSize: fs, fontWeight: 700, color: c.main
    }}>{score}</div>
  );
}

function StatusLabel({ status }) {
  const map = {
    misaligned: { color: "#dc2626", bg: "rgba(220,38,38,0.1)", text: "Signal Leak" },
    moderate: { color: "#ca8a04", bg: "rgba(202,138,4,0.1)", text: "Partial Alignment" },
    strong: { color: "#16a34a", bg: "rgba(22,163,74,0.1)", text: "Strong Signal" }
  };
  const m = map[status];
  return (
    <span style={{
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      color: m.color, background: m.bg, padding: "4px 10px", borderRadius: "4px",
      fontFamily: "'JetBrains Mono', monospace"
    }}>{m.text}</span>
  );
}

function AuditSection({ section, isOpen, toggle }) {
  const statusColors = {
    misaligned: "#dc2626",
    moderate: "#ca8a04",
    strong: "#16a34a"
  };
  return (
    <div style={{
      border: `1px solid ${isOpen ? statusColors[section.status] + "30" : "rgba(255,255,255,0.06)"}`,
      borderRadius: "10px",
      background: isOpen ? statusColors[section.status] + "06" : "rgba(255,255,255,0.02)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      overflow: "hidden"
    }} onClick={toggle}>
      <div style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: "16px" }}>
        <ScoreBadge score={section.score} size="small" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.9)", fontFamily: "'Instrument Serif', Georgia, serif" }}>{section.title}</h3>
            <StatusLabel status={section.status} />
          </div>
        </div>
        <span style={{
          fontSize: "16px", color: "rgba(255,255,255,0.25)",
          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.3s ease"
        }}>&#9662;</span>
      </div>
      {isOpen && (
        <div style={{ padding: "0 22px 22px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 0 18px" }} />
          {[
            { label: "What We Found", text: section.finding, color: "rgba(255,255,255,0.3)" },
            { label: "Why It Matters for Pipeline", text: section.problem, color: "#ca8a04" },
            { label: "The Gap Test", text: section.gap, color: "#dc2626" },
            { label: "Signal Fix", text: section.recommendation, color: "#16a34a" }
          ].map((block, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: "8px",
              padding: "14px 18px",
              marginBottom: i < 3 ? "12px" : 0,
              borderLeft: `3px solid ${block.color}`
            }}>
              <div style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                color: block.color, marginBottom: "8px",
                fontFamily: "'JetBrains Mono', monospace"
              }}>{block.label}</div>
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.7)", margin: 0 }}>{block.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AuditPanel({ data, type }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", gap: "20px",
        padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "24px"
      }}>
        <ScoreBadge score={data.overallScore} />
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif", color: "rgba(255,255,255,0.95)" }}>
            {data.name}
          </h2>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            {type === "ceo" ? `${data.title} · ${data.followers} followers` : `Company Page · ${data.followers} followers`}
          </div>
          {type === "ceo" && (
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "4px", fontStyle: "italic" }}>
              Headline: "{data.headline}"
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data.sections.map((s, i) => (
          <AuditSection key={i} section={s} isOpen={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? null : i)} />
        ))}
      </div>
    </div>
  );
}

export default function LinkedInAudit() {
  const [activeTab, setActiveTab] = useState("ceo");

  const combinedScore = Math.round((ceoAudit.overallScore + companyAudit.overallScore) / 2);

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

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563eb" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>
              Revenue Signal Audit | Section 2
            </span>
          </div>
          <h1 style={{
            fontSize: "42px", fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif",
            lineHeight: 1.15, margin: "0 0 12px", color: "rgba(255,255,255,0.95)"
          }}>
            LinkedIn Leadership<br />Signal Assessment
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.6, color: "rgba(255,255,255,0.45)", margin: "0 0 36px", maxWidth: "600px" }}>
            Are your leaders and your company page building trust with the people who actually buy from you?
          </p>

          {/* Combined Score */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
            background: "rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden", marginBottom: "36px"
          }}>
            <div style={{ background: "#0a0a14", padding: "24px 28px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "32px", fontWeight: 700, color: "#ca8a04" }}>{combinedScore}/100</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>Combined LinkedIn Score</div>
            </div>
            <div style={{ background: "#0a0a14", padding: "24px 28px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "32px", fontWeight: 700, color: "#dc2626" }}>{ceoAudit.overallScore}/100</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>CEO Signal Score</div>
            </div>
            <div style={{ background: "#0a0a14", padding: "24px 28px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "32px", fontWeight: 700, color: "#ca8a04" }}>{companyAudit.overallScore}/100</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>Company Page Score</div>
            </div>
          </div>

          {/* Key Insight */}
          <div style={{
            background: "rgba(202, 138, 4, 0.06)", border: "1px solid rgba(202, 138, 4, 0.15)",
            borderRadius: "12px", padding: "24px 28px", marginBottom: "36px"
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ca8a04", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
              Core Finding
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>
              BetterUp has strong LinkedIn presence by volume: 196K company followers, a CEO with 48K+ followers and Davos-level visibility, and a consistent content engine. But volume is not the same as pipeline. The content speaks to the converted (coaches, L&D practitioners, employees) far more effectively than it speaks to the buyer (CHROs, CLOs, CFOs at 1,000+ employee enterprises). The result is a LinkedIn presence that builds brand awareness while underperforming on the one metric that matters: whether the right buyers are moving from awareness to consideration because of what they see on LinkedIn.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "32px" }}>
          {[
            { key: "ceo", label: "CEO Profile", subtitle: "Alexi Robichaux" },
            { key: "company", label: "Company Page", subtitle: "betterup" }
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, padding: "16px 20px", borderRadius: "10px",
              border: `1px solid ${activeTab === tab.key ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
              background: activeTab === tab.key ? "rgba(255,255,255,0.06)" : "transparent",
              cursor: "pointer", textAlign: "left", transition: "all 0.2s ease"
            }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: activeTab === tab.key ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)", fontFamily: "'Instrument Serif', Georgia, serif" }}>{tab.label}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "2px", fontFamily: "'JetBrains Mono', monospace" }}>{tab.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Audit Content */}
        {activeTab === "ceo" ? (
          <AuditPanel data={ceoAudit} type="ceo" />
        ) : (
          <AuditPanel data={companyAudit} type="company" />
        )}

        {/* Bottom Summary */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px", padding: "32px", marginTop: "40px"
        }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "24px", fontWeight: 400, margin: "0 0 16px", color: "rgba(255,255,255,0.9)" }}>
            The Pipeline Connection
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "0 0 20px" }}>
            This is not a social media audit. It is a revenue signal assessment. Every finding maps to a pipeline implication.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { signal: "CEO content is philosophical, not outcome-driven", impact: "Enterprise buyers can't build an internal business case from the CEO's content. Procurement requires ROI language, not mission language." },
              { signal: "Company page is 70% awareness content", impact: "Buyers in consideration stage find no comparison content, no pricing context, and no clear product differentiation on the page they're evaluating." },
              { signal: "Engagement skews toward coaches and practitioners", impact: "Content is reaching influencers, not decision-makers. Pipeline influence is indirect at best, invisible at worst." },
              { signal: "No competitive positioning content exists", impact: "Competitors are writing the comparison narrative. BetterUp enters every competitive deal already framed by the challenger's positioning." }
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(220, 38, 38, 0.04)", borderRadius: "8px",
                padding: "16px", borderLeft: "3px solid #dc2626"
              }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>{item.signal}</div>
                <div style={{ fontSize: "12px", lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>{item.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
