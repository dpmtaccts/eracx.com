import { useEffect } from 'react'
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
  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <TopNav />

      <HeroSection />

      <section className="bg-[#111111] px-6 pt-12 pb-12 md:px-10">
        <div className="mx-auto w-full max-w-7xl" style={{ maxWidth: 680 }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, lineHeight: 1.7 }}>
            <span className="text-[#F5F0E8]" style={{ fontWeight: 700 }}>
              We work with teams who've built something special and know how to close.
            </span>{" "}
            <span className="text-[#F5F0E8]/70" style={{ fontWeight: 300 }}>
              Our team operates the growth system that fosters connection, trust, and customers who stay for years.
            </span>
          </p>
        </div>
      </section>

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
        question={'"We\'re doing outbound but nothing is converting. What are we missing?"'}
        label="01 Connection Loop"
        headline="Your buyers are already in-market. You're just not finding them in time."
        body="97% of your market isn't buying today — but the ones who will be are already sending signals. Job changes, funding events, hiring patterns, tech installs. Era's Connection Loop captures those signals and turns them into targeted outreach before a competitor gets the first meeting. It runs continuously, without a human initiating it."
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
        question={'"We had a great first meeting. Then it went silent for six weeks."'}
        label="02 Trust Loop"
        headline="Your champion said yes. But they're not the only one deciding."
        body="The average mid-market deal has 10+ people involved in the decision. Your rep is talking to one of them. The rest are evaluating you in conversations you're not part of. Era's Trust Loop builds presence across the full buying committee — champions, economic buyers, influencers — mapping every touchpoint to a stakeholder and a stage. When deals go quiet, the system re-engages. When new stakeholders appear, they get added automatically."
        mechanics={[
          "Behavior-triggered nurture sequences by role and stage",
          "Multi-thread engagement across the buying committee",
          "Champion tracking with automatic re-engagement on silence",
          "Deal stall detection with targeted re-entry plays",
          "Every stakeholder interaction updates the account record",
        ]}
        caseStudy={{
          client: "Enterprise Software Co.",
          loopTag: "TRUST LOOP",
          headline: "250 buyers. One coordinated system.",
          body: "A global enterprise software company operates in complex global accounts where the buying committee spans functions, geographies, and seniority levels. Era built a nurture infrastructure reaching 250 champions and economic buyers, each receiving content and touchpoints mapped to their role and stage. Deals that previously stalled at evaluation began to move.",
          quote: {
            text: "Era built something we didn't know we needed, a way to stay present with 250 buyers across our global accounts without adding headcount.",
            name: "Senior Leader",
            title: "Enterprise Software",
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
        question={'"Our customers love us but we have no idea when they\'re ready to buy more."'}
        label="03 Loyalty Loop"
        headline="Your best new pipeline source is the customers you've already closed."
        body="You have happy customers who would expand, refer, and renew — if someone asked at the right time. But nobody has a system for knowing when that is. Era's Loyalty Loop tracks post-close signals — engagement patterns, satisfaction indicators, team growth — and converts them into expansion conversations, referrals, and renewals automatically. No cold upsell calls. Every conversation is signal-triggered."
        mechanics={[
          "90-day post-close onboarding and expansion sequence",
          "Satisfaction and confidence signal tracking",
          "Cross-sell and upsell triggers based on account behavior",
          "Referral activation at the 6-month mark",
          "Renewal intelligence tied to relationship health score",
        ]}
        caseStudy={{
          client: "Ecommerce Operator",
          loopTag: "LOYALTY LOOP",
          headline: "Expansion revenue from signals, not guesswork.",
          body: "A mid-market ecommerce operator had strong customer relationships but no system to convert them into expansion revenue. Era built a post-close signal infrastructure tracking confidence and satisfaction indicators across their customer base. Cross-sell and upsell conversations triggered automatically when signals aligned, not when a rep remembered to check in.",
          quote: {
            text: "For the first time, our expansion conversations were triggered by the system, not by someone remembering to follow up.",
            name: "Senior Leader",
            title: "Ecommerce",
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
