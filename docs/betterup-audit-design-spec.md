# BetterUp Revenue Signal Audit — Design Spec
## Build Reference for Claude Code
### April 2026

---

## Overview

A single-page scrolling experience hosted at `/audit/betterup` with a companion summary at `/audit/betterup/summary`. Password-protected. The audit tells a single story across 8 sections: BetterUp's brand conviction is real at the product level but breaks before it reaches the people who carry it into the world, and the market (including generative AI) can see it. The result is a company with $214M ARR that is leaking pipeline because its go-to-market signals don't match its product reality.

**Design language:** Light mode by default (warm white #F7F5F2 background), with a dark mode toggle in the nav. All colors defined as CSS custom properties so every component respects the active theme. See CLAUDE.md for full light and dark palettes. ERA brand palette (rust #C85A3A, sky blue #4AADE8, magenta #E8175D). Typography: Instrument Serif for editorial headlines, DM Sans for UI/labels/body, JetBrains Mono for data/metrics. Cards on white (#FFFFFF in light, #151514 in dark) with subtle borders. Circular gauges, pill bars, signal bars, animated counters. Stepper nav fixed at top tracks scroll position. Theme preference persisted in localStorage.

**Target audience:** This is a sales tool. It will be shown to prospects, shared with partners (Todd/Jason at Pinwheel), and used as a case study for the Revenue Signal Audit product. The tone is confident, analytical, and direct. Not a report. A diagnostic argument.

---

## Navigation

**Stepper nav** (fixed, top): 8 sections connected by a progress line.

```
SUMMARY → CASCADE → LEADERS → SIGNALS → AUDIENCE → AI MIRROR → INVESTMENT → BUILD
```

Each section node fills with rust color as the user scrolls past. Clicking a node smooth-scrolls to that section.

---

## Section 1: Executive Summary

**Purpose:** Orient the reader. Establish credibility. Deliver the headline finding in 30 seconds.

### Content

**Section label:** `REVENUE SIGNAL AUDIT`
**Subtitle:** `BetterUp | betterup.com | April 2026`

**Company profile card:**
- Founded: 2013, Austin TX
- Category: B2B Enterprise AI + Human Coaching
- Revenue: ~$214.6M ARR (2024, est. ~14% YoY decline)
- Valuation: $4.7B (Oct 2021)
- Funding: $628M raised
- Employees: ~2,751
- Notable clients: Microsoft, Salesforce, Google, Hilton, NASA, Chevron, Adobe, SpaceX
- Primary buyer: CHRO, CLO, VP of Talent at 1,000+ employee enterprises

**Hero scorecard** (3 circular gauges in a row):
1. Brand Conviction Cascade: **41/100** (color: red/amber)
2. LinkedIn Signal Score: **45/100** (color: amber)
3. Content-to-Pipeline Alignment: **29/100** (color: red)

**Core finding box** (rust left border, light rust background):
> BetterUp has a genuinely strong product. The coaching works. The AI is thoughtfully built. The behavioral science is legitimate. But the conviction that drives the product doesn't flow through the organization into the market. The CEO speaks in philosophy when the buyer needs business proof. The company page builds audience with the converted, not pipeline with the undecided. Employees and coaches publicly describe a culture that contradicts the brand's core promise. And when a CHRO asks an AI model about BetterUp, all of these signals collapse into a single composite answer that balances product strength against organizational fracture. The result: a category pioneer leaking pipeline not because the product fails, but because the go-to-market doesn't carry the conviction far enough.

**Top 3 Strengths / Top 3 Vulnerabilities** (two-column card):

Strengths:
1. Category authority: invented digital coaching, still the benchmark
2. AI product momentum: BetterUp Grow at 95% satisfaction, 4+ years of responsible development
3. Data moat: 17M behavioral data points, largest professional development dataset in the world

Vulnerabilities:
1. Internal brand crisis: Glassdoor 3.2/5, values-reality gap is public and searchable
2. Leadership signal misalignment: CEO content speaks to coaches, not to enterprise buyers
3. Pricing opacity: $499+/user estimates circulate with no public context, "expensive" is a dominant brand attribute

---

## Section 2: The Brand Conviction Cascade

**Purpose:** Introduce the framework. Show where conviction flows and where it breaks. This is ERA's core IP.

### Content

**Section label:** `THE BRAND CONVICTION CASCADE`
**Headline:** "Most audits measure what you say. This one measures whether what you say, what you do, and what the market feels are the same thing."

**Framework explanation** (brief, 2-3 sentences):
Conviction doesn't stop at a tagline. It flows through leadership, product, frontline teams, and into the market. Where it stops flowing is where your pipeline starts leaking.

**Cascade visualization:**
A vertical flow diagram with 6 layers, each showing:
- Layer number + name
- Score (circular gauge, small)
- Status badge: "Strong Flow" / "Partial Flow" / "Weak Flow" / "Cascade Break"
- A flow line connecting each layer, colored by the score of the layer above

Layers and scores:
1. Declared Conviction (What you say you believe): **35/100** — Weak Flow
2. Leadership Embodiment (Do your leaders live it?): **40/100** — Weak Flow
3. Product Experience (Does the product prove it?): **62/100** — Partial Flow
4. Frontline Carrier (Do your people carry it?): **22/100** — Cascade Break
5. Market Resonance (Does the market feel it?): **45/100** — Weak Flow
6. The AI Mirror (What does generative search say?): **38/100** — Weak Flow

**Cascade break callout** (red border, emphasized):
> The cascade breaks at Layer 4. BetterUp sells psychological safety and human transformation. Its own employees describe neither. Glassdoor reviews explicitly name the irony. Coaches report pay disputes and communication breakdowns. Account managers churn 3+ times in 12 months. The conviction dies at the frontline, and the market can see it.

**Expandable cards** for each layer (click to reveal):
Each card contains:
- The question this layer answers
- Conviction signals we look for (bulleted list)
- BetterUp assessment (scored paragraph)
- Evidence (supporting details)

*All content for these cards exists in the brand-conviction-cascade.jsx artifact already built in this conversation.*

---

## Section 3: LinkedIn Leadership Signal Assessment

**Purpose:** Audit the CEO and company page against buyer alignment, not vanity metrics.

### Content

**Section label:** `LINKEDIN LEADERSHIP SIGNALS`
**Headline:** "Are your leaders and your company page building trust with the people who actually buy from you?"

**Combined score card** (3 metrics):
- Combined LinkedIn Score: **45/100**
- CEO Signal Score: **38/100**
- Company Page Score: **52/100**

**Tab navigation:** `CEO PROFILE` | `COMPANY PAGE`

### CEO Profile Tab: Alexi Robichaux

**Profile card:**
- Name: Alexi Robichaux
- Title: CEO & Co-Founder
- Followers: ~48K+
- Headline: "CEO & Co-Founder at BetterUp — We're hiring!"

**5 assessment dimensions** (expandable cards with scores):

1. Content Theme Analysis: **30/100** — Signal Leak
   - Finding: Content is mission-driven and philosophical. Posts center on "human potential," "inner work," "purpose and performance."
   - Pipeline impact: Enterprise buyers can't build an internal business case from philosophical content. CHROs need ROI language.
   - Recommendation: 60/40 model. 60% outcome-forward content, 40% vision. Every philosophical post needs a companion post translating the idea into enterprise language.

2. Audience Alignment: **25/100** — Signal Leak
   - Finding: 48K followers skew toward coaches, L&D practitioners, employees. Not decision-makers.
   - Pipeline impact: High follower count with low ICP engagement is a vanity metric.
   - Recommendation: Build a "CHRO 100" target list. Engage proactively. Publish CHRO-specific pain content.

3. Posting Cadence & Format: **45/100** — Partial Alignment
   - Finding: Posts spike around events (Uplift, Davos), drop between them. Algorithm rewards consistency.
   - Recommendation: 3-post weekly rhythm. Monday Metric, Wednesday Insight, Friday Proof.

4. Network Density with ICP: **35/100** — Signal Leak
   - Finding: Well-connected in thought leadership (Adam Grant, Brene Brown), weak connection to actual buyers.
   - Recommendation: 10 strategic connection requests per week to CHROs/CLOs at target accounts.

5. Personal vs. Corporate Brand: **50/100** — Partial Alignment
   - Finding: Alexi is 80%+ of BetterUp's LinkedIn human presence. Concentration risk.
   - Recommendation: Elevate 5-7 other executives. Distribute the brand's human presence.

### Company Page Tab: BetterUp

**Profile card:**
- Followers: 196K+
- Handle: betterup

**5 assessment dimensions** (expandable cards with scores):

1. Content Mix & Theme Distribution: **45/100** — Partial Alignment
   - Finding: 70% Awareness / 20% Consideration / 10% Decision. Inverted for an enterprise sale.
   - Recommendation: Shift to 40/35/25. Create weekly "Proof Point" posts.

2. Engagement Quality: **40/100** — Signal Leak
   - Finding: Engagement inflated by employees and coaches. ICP engagement unknown.
   - Recommendation: Track commenter profiles monthly. Create CHRO-targeted engagement content.

3. Product Line Clarity: **35/100** — Signal Leak
   - Finding: Lead, Manage, Ready, Grow, Government — unclear to a first-time visitor.
   - Recommendation: Monthly "Product Spotlight" series. Pin product overview.

4. Competitive Positioning: **20/100** — Signal Leak
   - Finding: Zero competitive content on the page. Competitors write the comparison narrative.
   - Recommendation: Quarterly "Why BetterUp" series. Own the comparison.

5. Employee Advocacy: **55/100** — Partial Alignment
   - Finding: Double-edged sword when Glassdoor tells a different story.
   - Recommendation: Hold scaling until internal sentiment improves. Focus on client advocates.

---

## Section 4: Content-to-Pipeline Signal Map

**Purpose:** Connect every major brand signal to a pipeline consequence. The "so what" section.

### Content

**Section label:** `CONTENT-TO-PIPELINE SIGNAL MAP`
**Headline:** "Where brand signals are connecting to buyer intent, where they're leaking pipeline, and what to fix first."

**Summary stats** (3 metrics):
- Average Signal Alignment: **29%**
- Critical Signal Gaps: **5**
- Strong Alignment: **1**

**Core finding box:**
> BetterUp is generating high-volume brand signals that attract practitioners and influencers, but critically misaligned with enterprise budget holders. Seven of eight signal categories score below 50% alignment with buyer intent. The brand is broadcasting when it should be connecting.

**8 signal cards** (expandable, each with):
- Category badge (Critical Gap / High Gap / Opportunity)
- Signal name
- Alignment bar (percentage, animated)
- What They're Signaling (current state)
- What The Buyer Needs to Hear (gap)
- Pipeline Impact (consequence)
- Signal Fix (recommendation)

Signal categories and scores:
1. Leadership Visibility: **18%** — Critical
2. Thought Leadership: **35%** — Critical
3. Brand Narrative: **25%** — Critical
4. Competitive Signal: **40%** — High
5. Employee Signal: **12%** — Critical
6. AI Product Signal: **65%** — Opportunity
7. Pricing Signal: **15%** — High
8. Community Signal: **20%** — Critical

*All content for these cards exists in the content-to-pipeline-signal-map.jsx artifact.*

---

## Section 5: Audience Reality

**Purpose:** Show BetterUp who their buyer actually is, how they behave, and what they ignore. Data sourced from Moodlight Audience Intelligence.

### Content

**Section label:** `AUDIENCE REALITY`
**Headline:** "The market your brand thinks it's talking to vs. the market that's actually listening."

**The real audience profile** (narrative card):
> Your buyer is a mid-career executive operator — CHRO, VP of L&D, or CPO — who entered their role believing they'd be a strategic partner to the CEO and now finds themselves defending their budget to a CFO who sees coaching as discretionary. They are emotionally locked in neutral: not hostile, not excited, profoundly tired of transformation promises from technology vendors.

**Key data points** (metric cards, 2x3 grid):
1. **84%** of conversation is emotionally neutral — not calm, emotional lockdown
2. **96.6%** neutral on AI coaching specifically — the "show me" phase
3. **35%** more disappointment than admiration in the dataset
4. **0.77** category density (saturated) — AI coaching is background noise
5. **66%** of geographic data has unknown attribution — global ambitions, US reality
6. **0.1/100** empathy score — coldest possible market environment

**Three active tensions** (expandable cards):
1. "AI will change everything" vs. "AI has changed nothing for me yet"
   - AI topic density: 0.83 (saturated). Neutral emotion: 96.6%. Buyer has heard the AI pitch 200 times this year.
2. "Invest in people" vs. "Cut costs now"
   - CPI at 3.26%, oil at $127, budget scrutiny at maximum. L&D measured like capex.
3. "Consolidate vendors" vs. "Don't bet on one platform"
   - Consolidation requires trust. Cultural moment defined by distrust. Mixing and matching is risk management.

**What they ignore** (dead zones):
- Inspirational coaching narratives without business outcomes
- Pure technology stories — enterprise AI coaching invisible in engagement data
- "Future of work" narrative — in decay
- Mental health as standalone value proposition — table stakes, not differentiation
- "Always-on" framing — sounds like another system demanding attention

**How they evaluate** (the buyer journey this audience actually follows):

A horizontal flow with 4 stages:
1. **Spanning the Horizon**: Consuming through financial/business press, not coaching communities. Passive. News-media-mediated. PR Newswire is a top-3 source. They're absorbing, not engaging.
2. **Exploring Options**: Operational language, not aspirational. "Measurable impact on manager effectiveness" not "unlock your leadership potential." They reference retention rates, ramp-time reduction, pipeline fill rates.
3. **Evaluating Partnerships**: Integration depth as trust credential (Workday, Oracle, SAP). Named enterprise outcomes with specifics. CFO-friendly language in CHRO-facing content. They will not share content that makes them sound like they drank the Kool-Aid.
4. **Building Partnership**: Human coaches as quality assurance. ROI data that keeps them employed. The CHRO who positions as performance infrastructure operator wins. The one who positions as cost center advocate loses.

**Where they're drifting** (3 velocity shifts):
1. From AI capability to AI regulation and ethics (scarcity 0.46, only 231 mentions — white space)
2. From wellness to resilience as economic survival (velocity 0.44, longevity 0.86 — strongest adjacent signal)
3. Social media regulation → enterprise trust architecture (scarcity 0.57 — platform skepticism rising)

**The turnoff** (callout box, red):
> Leading with AI before proving the human. Category density is 0.83. Neutral emotion is 96.6% of AI conversation. The warm empathy signal comes from the human coaching layer. Any campaign that opens with "AI-powered" before establishing human coaching credibility will be filtered as noise. Lead with human, substantiate with AI. Not the other way around.

---

## Section 6: The AI Mirror

**Purpose:** The demo section. Show what generative AI actually says about BetterUp when a buyer asks. This is the section that sells the audit.

### Content

**Section label:** `THE AI MIRROR`
**Headline:** "When your buyer asks an AI about you, does the answer reflect your conviction or your cascade failure?"

**Context card:**
> In 2025-2026, a growing share of B2B buyers start their research with a generative AI query. ChatGPT, Claude, Perplexity, Google AI Overview. The AI doesn't repeat your marketing copy. It synthesizes everything: website, Glassdoor, G2, press, competitor pages, LinkedIn, Reddit, analyst commentary. It creates a composite answer that reflects what the market actually thinks. For BetterUp's buyer — a CHRO evaluating a $499+/user platform — this AI-generated summary may be their first impression.

**The mirror** (two-column card, styled as a simulated AI chat interface):

Left column: "What BetterUp wants the AI to say"
- Category pioneer in digital coaching
- AI + human coaching at enterprise scale
- 95% satisfaction on BetterUp Grow
- Fortune 500 clients: Google, Salesforce, Microsoft, NASA
- 17M behavioral data points, largest dataset in the world
- Science-backed, evidence-based methodology

Right column: "What the AI actually says"
- Category pioneer — yes, consistently referenced as the benchmark
- Strong coaching quality, well-designed platform (Josh Bersin, G2 users)
- BetterUp Grow AI coaching at 95% early satisfaction — genuine differentiator
- BUT: Glassdoor 3.2/5, employees say company doesn't practice what it preaches
- BUT: Pricing described as "opaque" and "expensive" across review platforms
- BUT: 14% YoY revenue decline raises stability questions for enterprise procurement
- BUT: Prince Harry association noted as polarizing
- BUT: Account manager churn and coach community dissatisfaction cited in reviews
- Net AI impression: strong product, questionable organizational integrity, proceed with caution

**Score:** 38/100

**Why this matters** (callout):
> The AI synthesizes every layer of the cascade into one answer. Product conviction (Layer 3) shows up positively. Frontline failure (Layer 4) shows up as a counterweight. The AI is the ultimate mirror. It reflects what you actually are, not what you say you are. And you cannot control it. You can only fix the underlying signals it reads.

**The test you can run yourself** (action box):
Ask ChatGPT, Claude, Perplexity, or Google AI Overview:
- "Tell me about BetterUp"
- "Is BetterUp worth it for enterprise coaching?"
- "BetterUp vs CoachHub"
- "BetterUp employee reviews"

---

## Section 7: Investment vs. Return

**Purpose:** Show the gap between current state and what's possible. Make the business case.

### Content

**Section label:** `INVESTMENT VS. RETURN`
**Headline:** "What BetterUp is investing in today vs. what the return could look like if the signals connect."

**Current state** (left column of comparison):

Investment areas today:
- Uplift conference (Adam Grant, Brene Brown, Shonda Rhimes — high-profile, high-cost)
- Mercedes-AMG F1 partnership
- Prince Harry as Chief Impact Officer
- Thought leadership content engine (blog, research reports)
- Enterprise sales team (with 4-5 reorgs in recent years)
- AI product development (BetterUp Grow, MCP Server)

What the return looks like:
- Category awareness: STRONG (everyone knows BetterUp)
- Consideration conversion: WEAK (awareness doesn't translate to pipeline)
- Enterprise deal velocity: SLOW (opaque pricing, jargon positioning, 30-45 day extended cycles)
- Competitive win rate: DECLINING (competitors write the comparison narrative)
- Employee advocacy: NEGATIVE (net detractor among employees and coaches)
- AI search impression: MIXED (product praised, organization questioned)

**What connected signals would change** (right column):

If LinkedIn content management, executive engagement, community advocacy, ABM strategy, and audience intelligence were connected:

- CEO content shifts from philosophy to outcome language → CHRO engagement rises
- 5-7 executives carrying the brand, not just CEO → distributed trust, reduced concentration risk
- Company page shifts to 40/35/25 funnel mix → consideration-stage content reaches undecided buyers
- Competitive positioning content published → BetterUp controls the comparison narrative
- Coach ambassador program launched → 5,000 organic advocates instead of 5,000 detractors
- Pricing transparency introduced → self-directed buyer research unblocked
- Glassdoor addressed operationally → AI search results shift within 6-12 months
- Content aligned to buyer journey stages (Spanning → Exploring → Evaluating → Building) → right message reaches right buyer at right moment

**Projected impact** (metric cards showing current → projected):
- Brand Conviction Cascade: 41 → 62 (+51%)
- LinkedIn Signal Score: 45 → 68 (+51%)
- Content-to-Pipeline Alignment: 29 → 55 (+90%)
- AI Mirror Score: 38 → 58 (+53%)
- Estimated pipeline impact: 15-25% improvement in qualified opportunity conversion at due diligence stage

**Caveat** (small text):
> Projections based on ERA's experience with comparable B2B enterprise clients. Actual results depend on operational execution, particularly addressing the internal brand crisis (Layer 4) which is a prerequisite for sustainable signal improvement.

---

## Section 8: What We'd Build Together

**Purpose:** The ask. What ERA + Pinwheel would do, scoped and phased.

### Content

**Section label:** `WHAT WE'D BUILD TOGETHER`
**Headline:** "A 90-day signal alignment program connecting brand, content, executive presence, and pipeline."

**Phase 1: Weeks 1-4 — Signal Diagnostic & Strategy**
- Complete Revenue Signal Audit (what you're reading now)
- LinkedIn leadership audit for top 5 executives (not just CEO)
- Content-to-pipeline gap analysis with buyer journey mapping
- Competitive positioning strategy
- Deliverable: Signal Alignment Roadmap with prioritized action plan

**Phase 2: Weeks 5-8 — Content & Executive Activation**
- Executive content calendars for CEO + 4 additional leaders
- Company page content strategy shift (40/35/25 funnel mix)
- Competitive positioning content development
- Audience-aligned messaging framework (operational language, not aspirational)
- Coach ambassador program design

**Phase 3: Weeks 9-12 — Optimization & Measurement**
- Signal scorecard tracking (monthly)
- AI mirror monitoring (what generative search says, tracked quarterly)
- Engagement quality reporting (ICP engagement rate, not vanity metrics)
- Buyer journey content mapping and optimization
- ROI framework for CFO-ready budget justification

**Who's involved:**
- ERA: LinkedIn intelligence, content strategy, executive coaching on brand presence, signal measurement
- Pinwheel: Brand strategy and messaging, thought leadership content, design and visual identity, campaign development

**CTA card** (prominent, bottom):
> This audit was built using publicly available data in approximately [X] hours. Imagine what we could do with access to your CRM, your engagement data, and your leadership team's attention for 90 days.

**Contact:**
- Justin Marshall, ERA | justin@eracx.com
- S. Todd Anthony, Pinwheel Creative | todd@pinwheelcreative.com

---

## Summary Page (`/audit/betterup/summary`)

A stripped-down version containing:
1. Company profile card
2. Three hero gauges (Cascade, LinkedIn, Pipeline)
3. Core finding (one paragraph)
4. Cascade visualization (6 layers, scores only, no expandable detail)
5. Top 5 signal gaps (name + score + one-sentence impact)
6. The AI Mirror finding (one paragraph)
7. Investment vs. Return comparison (condensed)
8. CTA card with contact info

Designed to be sent as a standalone link. Under 3 minutes to read. Punchy. Visual. Ends with the ask.

---

## Technical Notes for Claude Code

- Framework: React (single .jsx file per page, or Next.js if deploying to Vercel)
- Styling: Tailwind or inline styles matching ERA brand system
- Fonts: Load from Google Fonts — Instrument Serif, DM Sans, JetBrains Mono
- Animations: IntersectionObserver for scroll-triggered reveals, CSS transitions for gauge fills and bar animations, requestAnimationFrame for number counters
- Password protection: Simple client-side gate (matching Navalent implementation)
- Responsive: Must work on desktop and tablet. Mobile is secondary but should be readable.
- Hosting: Vercel, matching eracx.com infrastructure

## File Structure

```
/audit/betterup/
  index.jsx          — Full audit (Section 1-8)
  summary.jsx        — Summary version
  components/
    StepperNav.jsx
    Gauge.jsx
    SignalBar.jsx
    MetricCard.jsx
    ExpandableCard.jsx
    CascadeFlow.jsx
    AIMirror.jsx
    BuyerJourney.jsx
```

---

## Data Sources Reference

| Section | Primary Data Source |
|---|---|
| Executive Summary | Brand Health Assessment (Pinwheel), Tracxn, Glassdoor |
| Conviction Cascade | Cross-referenced: all sources below |
| LinkedIn Leaders | LinkedIn search-indexed content, public profiles |
| Signal Map | LinkedIn data + Brand Health Assessment + competitive analysis |
| Audience Reality | Moodlight Audience Intelligence report |
| AI Mirror | Live generative AI queries (ChatGPT, Claude, Perplexity) |
| Investment vs. Return | ERA analysis, brand health data, competitive benchmarks |
| Build Plan | ERA + Pinwheel service scope |

---

*End of spec.*
