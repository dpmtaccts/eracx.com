import { useState } from "react";

const cascadeLayers = [
  {
    id: "declared",
    layer: "1",
    name: "Declared Conviction",
    subtitle: "What you say you believe",
    question: "Does the brand have a genuine point of view, or just a positioning statement?",
    description: "This is the top of the cascade: the tagline, the value proposition, the mission statement, the 'About' page. Every company has one. The question isn't whether it exists. The question is whether it carries real conviction or reads like it was assembled by committee.",
    signals: [
      "Value proposition is specific enough that it excludes someone (if it applies to everyone, it means nothing)",
      "Point of view is staked, not hedged (the brand believes something that a competitor would disagree with)",
      "Language is outcome-driven, not aspiration-driven ('we help you retain leaders' vs. 'we unlock human potential')",
      "The brand would be uncomfortable if you removed the tagline, because it actually means something to them"
    ],
    betterup: {
      score: 35,
      analysis: "BetterUp's declared conviction is 'Human Transformation Platform.' It's ambitious and distinctive in the abstract, but it fails the specificity test. Who is it for? What does it replace? What outcome does it produce? A CHRO can't take 'human transformation' to their CFO and get budget approved. The conviction is real (Alexi clearly believes in this mission), but the language insulates the belief from the buyer's reality. Conviction without translation is philosophy, not positioning.",
      evidence: "Website hero: 'Powering performance-ready workforces in the AI era.' LinkedIn About: 'Bringing the power of human transformation to individuals and workforces everywhere.' These are directionally aligned but neither creates urgency or specificity. Compare to Gong's 'Revenue Intelligence Platform' or Rippling's 'One place to run your business.' Those are declarations you can buy."
    }
  },
  {
    id: "leadership",
    layer: "2",
    name: "Leadership Embodiment",
    subtitle: "Do your leaders live the belief publicly?",
    question: "When your CEO, CMO, and CRO show up in the world, does the conviction come through, or do they sound like they're reciting a script?",
    description: "This is where brand becomes personal. A company's leaders are its most visible proof of conviction. When the CEO posts on LinkedIn, speaks at a conference, or talks to press, is the belief system alive in how they communicate? Or is it a talking point they deploy and then set aside?",
    signals: [
      "CEO content reflects the same conviction expressed in the brand's positioning, in their own authentic voice",
      "Other executives (CMO, CRO, CPO, VP of Product) carry the conviction independently, not just amplify the CEO",
      "Leaders speak about the product with the confidence of someone who uses it and believes in what it does",
      "Executive team's personal brands collectively reinforce the company's point of view, creating a surround-sound effect",
      "Leaders engage with the market (comment, respond, debate) rather than broadcast"
    ],
    betterup: {
      score: 40,
      analysis: "Alexi embodies the mission with genuine passion. The problem is twofold. First, his conviction shows up as philosophy rather than business proof. He talks about 'human potential' and 'inner work' the way a TED speaker does, not the way a CEO selling to a CHRO does. Second, the conviction is concentrated in one person. Co-founder Eddie Medina is nearly invisible publicly. New CPO Jolen Anderson is early. The CRO, VP of Product, and CMO are not carrying the point of view in market. If Alexi is the only person who sounds like he believes in BetterUp, the cascade stops at Layer 2.",
      evidence: "Scan the LinkedIn profiles of BetterUp's top 10 executives. How many of them have posted original content about BetterUp's value proposition in the last 90 days? How many of them have a personal brand that reflects the company's conviction? The CEO alone cannot be the brand's entire human presence."
    }
  },
  {
    id: "product",
    layer: "3",
    name: "Product Experience",
    subtitle: "Does the product prove the belief?",
    question: "When someone uses your product, do they feel the conviction? Does the experience itself communicate what you believe, without anyone having to explain it?",
    description: "This is where 'saying' becomes 'doing.' The product is the most honest expression of a company's beliefs. A company that truly believes in its mission builds a product that makes you feel it. The onboarding, the UX, the outcomes, the way you're treated as a user. This is where conviction either becomes tangible or gets exposed as marketing.",
    signals: [
      "Product experience matches the brand promise (if you say 'transformation,' the user should feel transformed)",
      "Value is experienced before the paywall, not just described behind it (swimming the product up the funnel)",
      "The product is generous: it gives before it asks, teaches before it sells, proves before it pitches",
      "User outcomes are visible and measurable, not claimed and vague",
      "The product carries a point of view in how it works (opinionated design, not generic tooling)"
    ],
    betterup: {
      score: 62,
      analysis: "This is BetterUp's strongest cascade layer, and it matters. The coaching product, when experienced, genuinely delivers. Coach matching works. Individual coachees report meaningful outcomes. BetterUp Grow (AI coaching) has 95% early satisfaction. The behavioral science underpinning is real. The 17M data points create personalization that competitors can't replicate. The conviction shows in the product. But it's locked behind an opaque enterprise gate. No one can experience BetterUp's goodness without a corporate contract. The product proves the belief, but the go-to-market prevents most buyers from feeling it before buying it.",
      evidence: "Contrast with a company like Navalent: the frameworks, the thinking, the value are public. You experience Ron's point of view before you ever hire him. Or Basecamp: the product has a free tier, the philosophy is documented in public books, the conviction is tangible before a dollar changes hands. BetterUp's product conviction is real but gatekept."
    }
  },
  {
    id: "frontline",
    layer: "4",
    name: "Frontline Carrier",
    subtitle: "Do your people carry the belief in every interaction?",
    question: "When your sales rep, your customer success manager, your support team, and your coaches interact with the market, does the conviction show up? Or does it stop at the marketing department?",
    description: "This is where most brands break. The conviction exists at the top. It's on the website. The CEO believes it. But then a prospect talks to an SDR who sounds like every other SDR. The customer gets handed to a third account manager in twelve months. The coach can't get a response from BetterUp support. The belief system evaporates at the point of human contact.",
    signals: [
      "Sales reps can articulate the company's point of view in their own words, not just pitch deck language",
      "Customer success managers embody the brand's values in how they manage relationships",
      "Support interactions reflect the brand promise (a company selling 'human transformation' should treat every human interaction as transformative)",
      "Frontline employees voluntarily talk about the company on LinkedIn, in their own voice, because they believe in it",
      "Account transitions are handled with the same care the brand promises to deliver to its clients' employees"
    ],
    betterup: {
      score: 22,
      analysis: "This is where BetterUp's cascade collapses. The company sells psychological safety and human transformation, but its own employees describe the opposite on Glassdoor (3.2/5, 688+ reviews). Coaches, who are literally the product, report pay disputes, declining volume, and communication breakdowns. Enterprise clients experience 3+ account manager transitions in 12 months. The sales team has been reorganized 4-5 times in recent years with 'impossible quotas' and 'zero sales enablement.' The frontline cannot carry a conviction they do not experience.",
      evidence: "Read the Glassdoor reviews through the lens of brand cascade. Employees explicitly and repeatedly name the irony: 'We sell coaching and psychological safety, but we don't practice it internally.' That's not an HR problem. That's a brand integrity crisis. The conviction dies at Layer 4, and the market can see it."
    }
  },
  {
    id: "market",
    layer: "5",
    name: "Market Resonance",
    subtitle: "Does the market feel what you believe?",
    question: "When your clients, your prospects, and your industry talk about you, do they describe the same conviction you declare? Or do they describe something different?",
    description: "This is the ultimate test. The market is the mirror. If your conviction cascade is intact (you say it, your leaders live it, your product proves it, your people carry it), then the market will reflect it back. Clients will describe you the way you describe yourself. Prospects will arrive already believing in your point of view. Your reputation will precede your pitch. If the cascade is broken, the market reflects that too: confusion, skepticism, price sensitivity, and competitive vulnerability.",
    signals: [
      "Clients describe the brand using the same language the brand uses about itself (organic echo)",
      "Prospects arrive pre-sold on the point of view, not just aware of the name",
      "The brand generates voluntary advocacy (clients, coaches, employees telling the story without being asked or incentivized)",
      "Industry analysts and media describe the brand's conviction accurately, not just its product features",
      "The brand's point of view has influenced the broader conversation in its category"
    ],
    betterup: {
      score: 45,
      analysis: "BetterUp has influenced the category conversation. 'Digital coaching' as a category exists because BetterUp created it. Analysts reference BetterUp as the benchmark. Enterprise coachees who experience the product do become advocates. But the market's composite perception is fractured. 'Expensive.' 'Opaque.' 'Says one thing, does another.' 'Great coaches, questionable company.' The market is reflecting back the cascade failure at Layers 3 and 4: the product works, but the surrounding experience (pricing, people, internal culture) undermines the conviction. The market feels the product but not the company.",
      evidence: "The strongest market resonance signal: individual coachees who love the experience. The weakest: coaches and employees who feel the brand promise is hypocritical. The net effect: a brand that has genuine product advocates but organizational detractors, creating a split signal that enterprise buyers perceive as risk."
    }
  },
  {
    id: "ai-mirror",
    layer: "6",
    name: "The AI Mirror",
    subtitle: "What does generative search say about you?",
    question: "When a buyer asks ChatGPT, Claude, Perplexity, or Google AI Overview about your company, does the answer reflect your conviction or your cascade failure?",
    description: "This is the newest and most unforgiving layer. Generative AI doesn't repeat your marketing copy. It synthesizes everything: your website, Glassdoor reviews, G2 ratings, press coverage, competitor comparison pages, LinkedIn content, Reddit threads, analyst commentary, and employee sentiment. The AI creates a composite answer that reflects what the market actually thinks, not what your marketing department published. For a growing number of B2B buyers, this AI-generated summary is the first impression. And unlike a Google search where the buyer chooses which link to click, the AI chooses what to emphasize.",
    signals: [
      "When asked 'tell me about [company],' does the AI lead with your conviction or your controversy?",
      "Does the AI describe your product the way you describe it, or reframe it in terms the market actually uses?",
      "Are your competitive differentiators visible in the AI's answer, or are competitor claims more prominent?",
      "Does employee sentiment (Glassdoor, Indeed) show up in the AI's description? How prominently?",
      "When asked 'is [company] worth it?' does the AI favor your positioning or undermine it?",
      "Is your pricing described accurately, or do third-party estimates and 'expensive' sentiment dominate?",
      "Does the AI surface your product's genuine value, or echo the loudest signals from review sites?"
    ],
    betterup: {
      score: 38,
      analysis: "Ask a generative AI model about BetterUp in 2026. Here is what comes back: strong category recognition as the pioneer of digital coaching, high coach quality, innovative AI product with 95% satisfaction, impressive enterprise clients. But then: 'expensive,' 'opaque pricing,' 'Glassdoor rating of 3.2,' 'values-reality gap,' 'Prince Harry association,' 'multiple rounds of layoffs,' and 'employees say the company doesn't practice what it preaches.' The AI surfaces the Layer 4 cascade failure with brutal efficiency. A CHRO asking Claude or ChatGPT 'should I consider BetterUp?' gets a balanced but damaging answer, because the AI weighs Glassdoor reviews, coach complaints, and competitor comparison pages equally alongside BetterUp's own claims. The brand cannot control this narrative. It can only fix the underlying signals the AI is reading.",
      evidence: "Test it yourself. Ask ChatGPT, Claude, Perplexity, or Google AI Overview 'tell me about BetterUp' or 'is BetterUp worth it for enterprise coaching?' The AI will mention strong coaching quality and innovative AI products. It will also mention pricing opacity, employee dissatisfaction, and the irony of a coaching company with poor internal culture scores. The ratio of positive to negative in the AI's answer is a direct reflection of cascade integrity. Product conviction (Layer 3) shows up positively. Frontline failure (Layer 4) shows up as a counterweight. The AI is the ultimate mirror: it reflects what you actually are, not what you say you are."
    }
  }
];

function CascadeScore({ score, size = 64 }) {
  const getColor = (s) => {
    if (s <= 30) return "#dc2626";
    if (s <= 50) return "#ca8a04";
    if (s <= 70) return "#2563eb";
    return "#16a34a";
  };
  const color = getColor(score);
  const circumference = 2 * Math.PI * 22;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 52 52" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle cx="26" cy="26" r="22" fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: size * 0.3, fontWeight: 700, color
      }}>{score}</div>
    </div>
  );
}

function LayerCard({ layer, isOpen, toggle }) {
  const getStatusColor = (s) => {
    if (s <= 30) return "#dc2626";
    if (s <= 50) return "#ca8a04";
    if (s <= 70) return "#2563eb";
    return "#16a34a";
  };
  const statusColor = getStatusColor(layer.betterup.score);
  const statusLabel = layer.betterup.score <= 30 ? "Cascade Break" : layer.betterup.score <= 50 ? "Weak Flow" : layer.betterup.score <= 70 ? "Partial Flow" : "Strong Flow";

  return (
    <div style={{
      border: `1px solid ${isOpen ? statusColor + "30" : "rgba(255,255,255,0.06)"}`,
      borderRadius: "12px",
      background: isOpen ? statusColor + "04" : "rgba(255,255,255,0.015)",
      transition: "all 0.3s ease",
      overflow: "hidden"
    }}>
      <div onClick={toggle} style={{ padding: "22px 26px", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: statusColor + "15", border: `1px solid ${statusColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace", fontSize: "16px", fontWeight: 700, color: statusColor
        }}>{layer.layer}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 400, color: "rgba(255,255,255,0.9)", fontFamily: "'Instrument Serif', Georgia, serif" }}>
              {layer.name}
            </h3>
            <span style={{
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: statusColor, background: statusColor + "15", padding: "3px 8px", borderRadius: "3px",
              fontFamily: "'JetBrains Mono', monospace"
            }}>{statusLabel}</span>
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{layer.subtitle}</div>
        </div>
        <CascadeScore score={layer.betterup.score} size={52} />
        <span style={{
          fontSize: "16px", color: "rgba(255,255,255,0.2)",
          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.3s ease"
        }}>&#9662;</span>
      </div>

      {isOpen && (
        <div style={{ padding: "0 26px 26px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 0 22px" }} />

          {/* Core Question */}
          <div style={{
            background: "rgba(255,255,255,0.03)", borderRadius: "10px",
            padding: "18px 22px", marginBottom: "18px",
            borderLeft: "3px solid rgba(255,255,255,0.15)"
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>
              The Question This Layer Answers
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(255,255,255,0.8)", margin: 0, fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic" }}>
              {layer.question}
            </p>
          </div>

          {/* What We Measure */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
              Conviction Signals We Look For
            </div>
            <div style={{ display: "grid", gap: "8px" }}>
              {layer.signals.map((signal, i) => (
                <div key={i} style={{
                  display: "flex", gap: "10px", alignItems: "flex-start",
                  fontSize: "13px", lineHeight: 1.55, color: "rgba(255,255,255,0.55)"
                }}>
                  <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "8px", marginTop: "6px" }}>&#9679;</span>
                  {signal}
                </div>
              ))}
            </div>
          </div>

          {/* BetterUp Assessment */}
          <div style={{
            background: statusColor + "08", borderRadius: "10px",
            padding: "20px 22px", marginBottom: "14px",
            borderLeft: `3px solid ${statusColor}`
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: statusColor, marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
              BetterUp Assessment: {layer.betterup.score}/100
            </div>
            <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", margin: 0 }}>
              {layer.betterup.analysis}
            </p>
          </div>

          {/* Evidence */}
          <div style={{
            background: "rgba(255,255,255,0.02)", borderRadius: "10px",
            padding: "18px 22px",
            borderLeft: "3px solid rgba(255,255,255,0.1)"
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace" }}>
              Evidence
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              {layer.betterup.evidence}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrandConvictionCascade() {
  const [openId, setOpenId] = useState(null);

  const avgScore = Math.round(cascadeLayers.reduce((a, l) => a + l.betterup.score, 0) / cascadeLayers.length);
  const weakestLayer = cascadeLayers.reduce((min, l) => l.betterup.score < min.betterup.score ? l : min);
  const strongestLayer = cascadeLayers.reduce((max, l) => l.betterup.score > max.betterup.score ? l : max);

  return (
    <div style={{
      background: "#08080f",
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: "rgba(255,255,255,0.9)"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "56px 44px" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "linear-gradient(135deg, #dc2626, #ca8a04)" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
              Revenue Signal Audit | Core Framework
            </span>
          </div>
          <h1 style={{
            fontSize: "48px", fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif",
            lineHeight: 1.1, margin: "0 0 16px", color: "rgba(255,255,255,0.95)"
          }}>
            The Brand<br />Conviction Cascade
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.65, color: "rgba(255,255,255,0.4)", margin: "0 0 12px", maxWidth: "640px" }}>
            Most brand assessments measure what you say. This one measures whether what you say, what you do, and what the market feels are the same thing.
          </p>
          <p style={{ fontSize: "15px", lineHeight: 1.65, color: "rgba(255,255,255,0.3)", margin: "0 0 44px", maxWidth: "640px" }}>
            Conviction doesn't stop at a tagline. It flows through leadership, product, frontline teams, and into the market. Where it stops flowing is where your pipeline starts leaking.
          </p>

          {/* Score Summary */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px",
            background: "rgba(255,255,255,0.05)", borderRadius: "14px", overflow: "hidden", marginBottom: "32px"
          }}>
            <div style={{ background: "#08080f", padding: "28px 32px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "36px", fontWeight: 700, color: "#ca8a04" }}>{avgScore}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "6px", fontFamily: "'JetBrains Mono', monospace" }}>Cascade Integrity Score</div>
            </div>
            <div style={{ background: "#08080f", padding: "28px 32px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 700, color: "#dc2626", lineHeight: 1.3 }}>
                Layer {weakestLayer.layer}: {weakestLayer.name}
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "8px", fontFamily: "'JetBrains Mono', monospace" }}>Cascade Break Point</div>
            </div>
            <div style={{ background: "#08080f", padding: "28px 32px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 700, color: "#2563eb", lineHeight: 1.3 }}>
                Layer {strongestLayer.layer}: {strongestLayer.name}
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "8px", fontFamily: "'JetBrains Mono', monospace" }}>Strongest Signal</div>
            </div>
          </div>

          {/* Core Insight */}
          <div style={{
            background: "rgba(202, 138, 4, 0.05)", border: "1px solid rgba(202, 138, 4, 0.12)",
            borderRadius: "14px", padding: "28px 32px"
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ca8a04", marginBottom: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
              The Story the Cascade Tells
            </div>
            <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.75)", margin: 0 }}>
              BetterUp has a genuine product that delivers real outcomes. The coaching works. The AI is thoughtfully built. The behavioral science is legitimate. But the conviction breaks at Layer 4: the people who carry the brand into the world every day (sales reps, account managers, coaches, support teams) do not experience the values the brand promises. And now, in 2026, that fracture is amplified by Layer 6: generative AI. When a CHRO asks ChatGPT or Claude about BetterUp, the AI synthesizes every signal in the cascade and returns a composite answer that reflects both the product's genuine strength and the organization's internal contradictions. The AI doesn't spin. It mirrors. And what it mirrors is a company with conviction at the top that breaks before reaching the people who carry it into the world.
            </p>
          </div>
        </div>

        {/* Cascade Visualization */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "4px", marginBottom: "28px",
            padding: "0 8px"
          }}>
            {cascadeLayers.map((layer, i) => {
              const getColor = (s) => s <= 30 ? "#dc2626" : s <= 50 ? "#ca8a04" : s <= 70 ? "#2563eb" : "#16a34a";
              const color = getColor(layer.betterup.score);
              return (
                <div key={layer.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{
                    flex: 1, height: "6px", borderRadius: "3px",
                    background: `linear-gradient(90deg, ${color}80, ${color}40)`,
                    transition: "all 0.5s ease"
                  }} />
                  {i < cascadeLayers.length - 1 && (
                    <div style={{
                      width: "20px", textAlign: "center",
                      fontSize: "10px", color: "rgba(255,255,255,0.15)"
                    }}>&#9654;</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Layer Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
          {cascadeLayers.map(layer => (
            <LayerCard
              key={layer.id}
              layer={layer}
              isOpen={openId === layer.id}
              toggle={() => setOpenId(openId === layer.id ? null : layer.id)}
            />
          ))}
        </div>

        {/* What Makes This Different */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px", padding: "36px", marginBottom: "36px"
        }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "26px", fontWeight: 400, margin: "0 0 8px", color: "rgba(255,255,255,0.9)" }}>
            Why This Framework Exists
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", margin: "0 0 24px", maxWidth: "700px" }}>
            Traditional brand audits measure perception. LinkedIn audits measure visibility. Neither answers the question that actually determines whether a company generates pipeline: does the market feel what the brand believes?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "10px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.25)", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>BRAND AUDITS MEASURE</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>What the market thinks about you. Perception. Awareness. Attribute associations. These are symptoms.</div>
            </div>
            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "10px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.25)", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>LINKEDIN AUDITS MEASURE</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>Whether your leaders are visible. Content cadence. Follower counts. Engagement rates. These are channels.</div>
            </div>
            <div style={{ padding: "20px", background: "rgba(37, 99, 235, 0.06)", borderRadius: "10px", border: "1px solid rgba(37, 99, 235, 0.15)" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb", marginBottom: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>THE CASCADE MEASURES</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>Whether what you believe flows through everything you do, and whether the market can feel it. This is the cause.</div>
            </div>
          </div>
        </div>

        {/* The Navalent Contrast */}
        <div style={{
          background: "rgba(22, 163, 74, 0.04)", border: "1px solid rgba(22, 163, 74, 0.1)",
          borderRadius: "14px", padding: "36px"
        }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "22px", fontWeight: 400, margin: "0 0 14px", color: "rgba(255,255,255,0.9)" }}>
            What Full Cascade Flow Looks Like
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>
            A company with full cascade integrity doesn't just say what it believes. Its leaders live the belief publicly and unapologetically. Its product lets you feel the conviction before you buy. Its frontline teams carry the point of view in every interaction, not because they were trained to, but because they believe it too. The market reflects it back: clients describe you the way you describe yourself, prospects arrive pre-sold on your worldview, and your reputation compounds faster than your sales team can call. And when a buyer asks an AI about you, the answer reads like a recommendation, not a risk assessment. The conviction is self-actualizing. The brand doesn't need to pitch because the work speaks, the people carry it, the market feels it, and the AI confirms it.
          </p>
        </div>
      </div>
    </div>
  );
}
