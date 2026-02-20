import TopNav from './components/TopNav'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import LoopsVsCampaignsSection from './components/LoopsVsCampaignsSection'
import SystemOverviewSection from './components/SystemOverviewSection'
import LoopDetailSection from './components/LoopDetailSection'
import MechanismSection from './components/MechanismSection'
import FAQSection from './components/FAQSection'
import TimelineSection from './components/TimelineSection'
import CTAFooter from './components/CTAFooter'
import CookieConsent from './components/CookieConsent'

function App() {
  return (
    <div className="min-h-screen">
      <TopNav />

      <HeroSection />

      <div id="why-era">
        <ProblemSection />
      </div>

      <LoopsVsCampaignsSection />

      <div id="the-system">
        <SystemOverviewSection />
      </div>

      {/* Loop detail sections */}
      <LoopDetailSection
        id="loop-connection"
        loopNumber="01"
        loopColor="#C8A96E"
        diagramLabels={["SIGNAL", "OUTREACH", "RECORD"]}
        variant="dark"
        purposeLine="Fill the pipeline."
        question="How do I build a pipeline for next quarter?"
        label="01 Connection Loop"
        headline="Find the right accounts before they're looking."
        body="Signal-based pipeline generation built for the 97% window, the period before a buyer raises a hand. Job changes, funding events, hiring signals, tech installs: every one is a trigger. Every trigger becomes a touchpoint. The loop runs without a human initiating it."
        mechanics={[
          "Signal-based account targeting matched to ICP",
          "Multi-channel outreach triggered by behavioral data",
          "Intent tracking across the full buying window",
          "Every touchpoint writes back to the account record",
          "Loop updates with every signal, open, reply, or silence",
        ]}
        caseStudy={{
          client: "Publicist",
          clientLogo: "/assets/clients/publicist.png",
          loopTag: "CONNECTION LOOP",
          headline: "2x qualified pipeline in 90 days.",
          body: "Publicist needed to reach enterprise accounts they'd never penetrated through traditional outreach. Era built a signal-based acquisition system targeting funding events, executive hires, and tech changes across their ICP. The loop ran continuously. In 90 days, qualified pipeline doubled, with no new hires and no increase in ad spend.",
          quote: {
            text: "Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, and customer success.",
            name: "Lara Vandenberg",
            title: "Founder, Publicist",
            photo: "/assets/clients/lara-vandenberg.jpeg",
          },
          metricValue: "2×",
          metricLabel: "qualified pipeline growth, 90 days",
        }}
      />

      <LoopDetailSection
        id="loop-trust"
        loopNumber="02"
        loopColor="#2BBFAA"
        diagramLabels={["STAKEHOLDER", "TOUCHPOINT", "STAGE"]}
        variant="light"
        purposeLine="Win the room."
        question="Why do our deals keep stalling before the close?"
        label="02 Trust Loop"
        headline="Build presence across the full buying committee."
        body="The average B2B purchase involves 13+ stakeholders. Most outreach reaches one. The Trust Loop builds relationships across champions, economic buyers, and influencers simultaneously, mapping every touchpoint to a stakeholder, a stage, and a next move. When deals stall, the loop re-engages. When new stakeholders appear, they get added to the map."
        mechanics={[
          "Behavior-triggered nurture sequences by role and stage",
          "Multi-thread engagement across the buying committee",
          "Champion tracking with automatic re-engagement on silence",
          "Deal stall detection with targeted re-entry plays",
          "Every stakeholder interaction updates the account record",
        ]}
        caseStudy={{
          client: "Lorikeet",
          clientLogo: "/assets/clients/lorikeet.png",
          loopTag: "TRUST LOOP",
          headline: "250 buyers. One coordinated system.",
          body: "Lorikeet operates in complex global accounts where the buying committee spans functions, geographies, and seniority levels. Era built a nurture infrastructure reaching 250 champions and economic buyers, each receiving content and touchpoints mapped to their role and stage. Deals that previously stalled at evaluation began to move.",
          quote: {
            text: "Era built something we didn't know we needed, a way to stay present with 250 buyers across our global accounts without adding headcount.",
            name: "Senior Leader",
            title: "Lorikeet",
          },
          metricValue: "250",
          metricLabel: "stakeholders in active loop, across global accounts",
        }}
      />

      <LoopDetailSection
        id="loop-loyalty"
        loopNumber="03"
        loopColor="#D4367A"
        diagramLabels={["CLOSE", "SIGNAL", "EXPAND"]}
        variant="dark"
        purposeLine="Grow what you have."
        question="We have great customer relationships. Why aren't they generating more revenue?"
        label="03 Loyalty Loop"
        headline="Turn closed customers into your highest-converting pipeline source."
        body="The relationship doesn't end at the close. Era tracks post-close signals, engagement patterns, product usage, satisfaction indicators, team growth, and converts them into expansion conversations, referrals, and renewals at the right moment. Your best new logos are already customers. The loop finds them."
        mechanics={[
          "90-day post-close onboarding and expansion sequence",
          "Satisfaction and confidence signal tracking",
          "Cross-sell and upsell triggers based on account behavior",
          "Referral activation at the 6-month mark",
          "Renewal intelligence tied to relationship health score",
        ]}
        caseStudy={{
          client: "Netrush",
          clientLogo: "/assets/clients/netrush.webp",
          loopTag: "LOYALTY LOOP",
          headline: "Expansion revenue from signals, not guesswork.",
          body: "Netrush had strong customer relationships but no system to convert them into expansion revenue. Era built a post-close signal infrastructure tracking confidence and satisfaction indicators across their customer base. Cross-sell and upsell conversations triggered automatically when signals aligned, not when a rep remembered to check in.",
          quote: {
            text: "For the first time, our expansion conversations were triggered by the system, not by someone remembering to follow up.",
            name: "Senior Leader",
            title: "Netrush",
          },
          metricValue: "0",
          metricLabel: "cold upsell calls, every expansion conversation was signal-triggered",
        }}
      />

      <div id="how-it-works">
        <MechanismSection />
      </div>

      <TimelineSection />

      <FAQSection />

      <CTAFooter />
      <CookieConsent />
    </div>
  )
}

export default App
