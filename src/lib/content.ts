export const CONTACT_EMAIL = "justin@eracx.com";
export const SITE_URL = "https://eracx.com";

export const STATS = {
  martechTools: { value: "14,106", label: "Martech Solutions", detail: "+27.8% YoY, 2025" },
  toolUtilization: { value: "33%", label: "Tool Utilization", detail: "Estimated active usage" },
  cacExplosion: { value: "+222%", label: "CAC Explosion", detail: "Over the last 8 years" },
  emailResponse: { value: "4.5%", label: "Email Response", detail: "Down from 8.5%" },
};

export const CLIENT_RESULTS = [
  {
    client: "Publicist",
    industry: "Professional Services",
    metric: "+340%",
    detail: "Pipeline from targeted accounts",
    description: "Multi-threaded ABM across 50 enterprise targets",
  },
  {
    client: "Netrush",
    industry: "E-commerce Services",
    metric: "+127%",
    detail: "Meeting conversion rate",
    description: "Signal-based outreach replacing cold outbound",
  },
  {
    client: "Lorikeet",
    industry: "B2B SaaS",
    metric: "63%",
    detail: "Reduction in CAC",
    description: "Referral infrastructure + systematic nurture",
  },
  {
    client: "High Fidelity",
    industry: "Technology",
    metric: "118%",
    detail: "Net Revenue Retention",
    description: "Customer success + expansion playbooks",
  },
];

export const COST_COMPARISON = {
  internal: {
    headcount: "$460k",
    techStack: "$120k",
    agencies: "$85k",
    total: "$665k",
  },
  era: {
    total: "$285k",
  },
  savings: "57%",
};

export const LOOP_PROGRAMS = {
  connection: {
    name: "Connection Loops",
    tagline: "Signal-Based Pipeline Generation",
    price: "$9,000/mo",
    description:
      "Signal-based targeting that creates self-reinforcing connection cycles. Each signal detected triggers engagement that produces new signals.",
    included: [
      "Surround Strategy Development — digital + physical touchpoint mapping",
      "List Building & Enrichment — target account identification and contact data",
      "Multi-Channel Orchestration — coordinated outreach across channels",
      "Signal Monitoring — track engagement and intent indicators",
      "Account Warmth Tracking — measure relationship progression over time",
    ],
    keyPlays: [
      "Stadium Pitch Content (97% engagement)",
      "6MPM Model: 6 touches/month across 4 channels",
      "Intent Signal Tracking (job changes, tech installs, hiring)",
      "Multi-channel orchestration (287% higher response)",
    ],
    tech: ["UnifyGTM", "Clay", "Apollo", "Dripify"],
    idealFor:
      "Teams starting to build proactive outbound or expand beyond inbound-only pipeline generation.",
    expectedResults:
      "Expanded reach beyond active buyers. Warmer initial conversations. Systematic relationship building.",
    feedsInto: "Trust Loops",
    feedsIntoPath: "/services/trust",
    color: "glow-cyan" as const,
  },
  trust: {
    name: "Trust Loops",
    tagline: "Convert Pipeline With Reciprocal Trust",
    price: "$9,000/mo",
    description:
      "Reciprocal trust cycles that deepen with each interaction. Each disclosure met with care unlocks the next deeper level.",
    included: [
      "Signal Detection & Monitoring — intent signals, engagement patterns, timing indicators",
      "Feed Pool Loop System — continuous engagement cycles based on readiness",
      "Sales Enablement — content, sequences, and tools for buyer engagement",
      "Pipeline Velocity Tracking — monitor deal progression and stall points",
      "RevOps Integration — process optimization and system alignment",
    ],
    keyPlays: [
      "Multi-threading the Committee (6x win rate improvement)",
      "Strategic Gifting & Direct Mail",
      "VIP Events & Executive Experiences",
      "Affiliate & Partner Programs",
    ],
    tech: ["HubSpot", "Clay", "Apollo", "Salesforge"],
    committee: {
      avgSize: "6.8–13 stakeholders",
      singleThreadedWin: "4–5%",
      multiThreadedWin: "30%",
      contacts: "5+",
    },
    idealFor:
      "Teams with existing pipeline that needs better qualification, faster velocity, or reduced stall rates.",
    expectedResults:
      "Higher conversion rates. Reduced sales cycle length. Fewer stalled deals.",
    feedsInto: "Loyalty Loops",
    feedsIntoPath: "/services/loyalty",
    color: "glow-purple" as const,
  },
  loyalty: {
    name: "Loyalty Loops",
    tagline: "Maximize Revenue Through Retention & Expansion",
    price: "$9,000/mo",
    description:
      "Each success realized generates advocacy that feeds acquisition. 70% of churn happens in the first 90 days — focus resources on the Retention Point.",
    included: [
      "Automation Loop Development — trigger-based workflows that scale outreach",
      "Call & Transcript Intelligence — extract insights from conversations at scale",
      "Engagement Scoring — prioritize accounts based on behavior patterns",
      "Champion Management — track and enable internal advocates",
      "Expert Series & Events — thought leadership content programs",
    ],
    keyPlays: [
      "Orchestrated Onboarding (6-stage framework)",
      "Time-to-Value Optimization (20% TTV cut = 18% ARR lift)",
      "Health Scoring & Proactive Intervention",
      "Advocacy & Referral Programs (37% higher LTV)",
    ],
    tech: ["HubSpot", "IQ Rush", "RB2B", "Replit"],
    retentionMath: {
      acquisitionCost: "5–25x more than retention",
      expansionCost: "$0.20 per $1 vs $1.16 for new logos",
      nrrGrowth: "NRR >100% = 2x faster growth",
    },
    idealFor:
      "Teams ready to systematize what's working and scale through automation rather than additional headcount.",
    expectedResults:
      "Scalable pipeline generation without proportional headcount. Stronger internal champions. Data-driven optimization.",
    feedsInto: "Connection Loops",
    feedsIntoPath: "/services/connection",
    color: "glow-rose" as const,
  },
};

export const HOME_FAQS = [
  {
    question: "What is a revenue system and how does Era build one?",
    answer:
      "A revenue system is integrated infrastructure that generates pipeline, converts deals, and retains customers through three interlocking loop programs: Connection Loops (acquisition), Trust Loops (conversion), and Loyalty Loops (expansion). Era designs, installs, and operates these systems so they compound over time — each loop's output becomes the next loop's input.",
  },
  {
    question: "What size company is Era built for?",
    answer:
      "Era works best with B2B companies in the 'messy middle' — typically 20 to 500 employees, Series A through Series C. These are companies too large for founder-led sales but too small to justify a full enterprise RevOps team. Our focus verticals include B2B SaaS, Fintech, Professional Services, and Transportation.",
  },
  {
    question: "How does Era's pricing compare to building an internal team?",
    answer:
      "An equivalent internal setup costs approximately $665,000 per year (headcount, tech stack, agencies). Era's three-loop system costs $285,000 per year — a 57% cost reduction with zero hiring risk and immediate deployment. We achieve this through shared specialist capacity, volume licensing on major tools, and zero ramp time.",
  },
  {
    question: "What results can I expect from Era's loop programs?",
    answer:
      "Results vary by program and starting point, but representative outcomes include: +340% pipeline from targeted accounts (Publicist), +127% meeting conversion rate (Netrush), 63% reduction in customer acquisition cost (Lorikeet), and 118% net revenue retention (High Fidelity). We offer a 30-day pilot to validate approach before full commitment.",
  },
  {
    question: "How is Era different from a traditional marketing agency?",
    answer:
      "Traditional agencies focus on the 3% of buyers actively in-market, using transactional tactics that cost $1,980 per acquisition. Era builds relationship infrastructure that engages the full 100% of your addressable market at $150 per acquisition through systematic trust-building. The result is compounding growth instead of linear spend.",
  },
];

export const CONNECTION_FAQS = [
  {
    question: "What is signal-based outreach and how does it work?",
    answer:
      "Signal-based outreach tracks intent indicators — job changes, technology installations, hiring patterns, content engagement — to identify when prospects are most receptive. Rather than cold outreach to everyone, Era targets the right people at the right moment, resulting in 287% higher response rates compared to traditional outbound.",
  },
  {
    question: "What is the 6MPM (6 touches per month) model?",
    answer:
      "The 6MPM model delivers six coordinated touches per month across four channels (email, LinkedIn, phone, direct mail). This multi-channel orchestration keeps your brand present without overwhelming prospects, systematically building warmth that converts to meetings when buying intent emerges.",
  },
  {
    question: "What technology powers the Connection Loops program?",
    answer:
      "Connection Loops runs on an integrated stack: UnifyGTM for intent data, Clay for data enrichment, Apollo for contact data and sequencing, and Dripify for LinkedIn automation. Era manages this entire stack as part of the program — no separate tool costs or internal administration required.",
  },
  {
    question: "How long before I see pipeline results from Connection Loops?",
    answer:
      "Most clients see measurable pipeline signals within 30-60 days. We offer a 30-day pilot specifically to validate the approach for your market and ICP before a full commitment. The compounding nature means results accelerate over time as the signal-feedback cycle strengthens.",
  },
];

export const TRUST_FAQS = [
  {
    question: "What does multi-threading mean in B2B sales?",
    answer:
      "Multi-threading means building relationships with multiple stakeholders in a buying committee, not just one champion. The average B2B buying group has 6.8 to 13 stakeholders. Single-threaded deals close at 4-5%, while multi-threaded deals with 5+ contacts close at 30% — a 6x improvement in win rate.",
  },
  {
    question: "How do Trust Loops accelerate sales cycles?",
    answer:
      "Trust Loops use signal detection to identify where each stakeholder sits in the buying process, then deploy targeted engagement — strategic gifting, VIP events, executive experiences, and custom content — to build reciprocal trust. This eliminates stalled deals by addressing committee-wide concerns proactively.",
  },
  {
    question: "What CRM and sales tools are included?",
    answer:
      "Trust Loops integrates with HubSpot (CRM), Clay (enrichment), Apollo (contact data), and Salesforge (email and LinkedIn automation). Era handles all tool configuration, sequence design, and ongoing optimization as part of the program.",
  },
  {
    question: "Can Trust Loops work with my existing sales team?",
    answer:
      "Absolutely. Trust Loops is designed to augment your existing sales process, not replace it. We provide sales enablement content, sequences, and tools that your team uses directly, while Era manages the system infrastructure, signal monitoring, and pipeline velocity tracking behind the scenes.",
  },
];

export const LOYALTY_FAQS = [
  {
    question: "Why does 70% of churn happen in the first 90 days?",
    answer:
      "Most churn occurs early because customers don't reach their first value milestone quickly enough. Loyalty Loops addresses this with a 6-stage orchestrated onboarding framework and time-to-value optimization. Cutting time-to-value by 20% has been shown to lift ARR by 18%.",
  },
  {
    question: "What is net revenue retention and why does it matter?",
    answer:
      "Net revenue retention (NRR) measures how much revenue you keep and expand from existing customers. NRR above 100% means your existing customer base grows even without new logos. Companies with NRR above 100% grow 2x faster, and expansion revenue costs just $0.20 per $1 compared to $1.16 for new customer acquisition.",
  },
  {
    question: "How do Loyalty Loops feed back into acquisition?",
    answer:
      "Loyalty Loops generate advocacy and referrals from successful customers, which directly feed the Connection Loops acquisition program. Referral-based customers have 37% higher lifetime value. This is how the system compounds — each loop's output becomes the next loop's input.",
  },
  {
    question: "What automation is included in Loyalty Loops?",
    answer:
      "Loyalty Loops includes trigger-based workflow development, call and transcript intelligence, engagement scoring, champion management, and expert series events. The technology stack includes HubSpot, IQ Rush (AEO), RB2B (visitor identity), and custom automation — all managed by Era.",
  },
];

export const SERVICES_FAQS = [
  {
    question: "Do I need to buy all three loop programs at once?",
    answer:
      "No. Era's programs are modular — you can start with whichever loop addresses your most pressing need. Start with Connection Loops if you're building outbound from scratch. Start with Trust Loops if you have pipeline but aren't converting. Start with Loyalty Loops if your process works but doesn't scale. Each program stands alone but compounds when combined.",
  },
  {
    question: "What is the total cost for all three programs?",
    answer:
      "Each program is $9,000 per month. The full three-loop system is $27,000 per month ($324,000 annually). Compared to the $665,000 annual cost of building equivalent internal capacity, this represents a 57% cost reduction with zero hiring risk, shared specialist capacity, and volume tool licensing.",
  },
  {
    question: "How do I know which program to start with?",
    answer:
      "Start with Connection Loops if you're relying only on inbound or building outbound from scratch. Start with Trust Loops if you're generating leads but not converting, experiencing long sales cycles, or seeing deals stall. Start with Loyalty Loops if your process is working but not scaling. Era offers an assessment call to recommend the right entry point.",
  },
  {
    question: "What does the 30-day pilot include?",
    answer:
      "The 30-day pilot validates Era's approach for your specific market and ICP before full commitment. It includes an assessment call to understand your current state and goals, a recommendation on which program fits your situation, and initial system deployment to demonstrate results within the first month.",
  },
];

export const TEAM = {
  founder: {
    name: "Justin Marshall",
    title: "Founder",
    bio: "Decades of experience building companies at all stages. The most effective go-to-market programs focus on creating repeatable, measurable human connection. Era was built to create systems that scale connection and reduce pipeline uncertainty.",
    experience: ["Microsoft", "Amazon", "P&G", "Intel", "T-Mobile", "Chase"],
  },
  leads: [
    {
      title: "Customer Intelligence Lead",
      background:
        "Former Head of Customer IQ at T-Mobile, Microsoft Strategy Consultant, SVP at Edelman.",
    },
    {
      title: "Client Services Lead",
      background:
        "Head of Client Services & Product at growth agency. Operations & Business Development background.",
    },
  ],
};

export const IDEAL_PARTNER = {
  headline: "Companies in the Messy Middle",
  description:
    "Too large for founder-led sales, but too small for enterprise RevOps teams.",
  size: "20–500 Employees",
  maturity: "Series A to Series C",
  painPoint: '"Leaky Bucket" Growth',
  verticals: ["B2B SaaS", "Fintech", "Professional Services", "Transportation"],
  tam: {
    us: "175,000",
    uk: "45,000",
    ca: "10,000",
    au: "9,000",
    total: "~239,000",
  },
};
