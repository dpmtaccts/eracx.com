import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  COLORS,
  FONT,
  loadFonts,
  Section,
  HeroBreakout,
  InsetVisual,
  InsetStats,
  ScrollReveal,
  StaggerGroup,
  AnimatedCounter,
  Kicker,
  Headline,
  Callout,
  VerdictBox,
  Body,
  HorizontalBar,
  DonutChart,
  MiniBarChart,
  ProfileCard,
  NavalentLogo,
  CommenterIcon,
  LinkedInReactions,
  TimelineItem,
  SectionDivider,
  SideNav,
  BodyWithMargin,
  TransformationTable,
} from './navalent/components'

const PASSWORD = 'dontswe@tthejourney'
const SESSION_KEY = 'navalent-audit-auth'

/* ═══════════════════════════════════════════════════════════════
   PASSWORD GATE
   ═══════════════════════════════════════════════════════════════ */

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT.body,
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 400, padding: '0 24px', textAlign: 'center' }}
      >
        <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 300, color: 'rgba(246,245,242,0.5)', marginBottom: 16 }}>
          Go-to-Market Assessment built for:
        </div>
        <div style={{ marginBottom: 40 }}>
          <img
            src="/images/navalent/navalent-white-logo.svg"
            alt="Navalent"
            style={{ height: 28, width: 'auto', opacity: 0.85 }}
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.style.display = 'none'
            }}
          />
        </div>
        <input
          type="password"
          placeholder="Enter password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          autoFocus
          style={{
            width: '100%',
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${error ? '#e05a4a' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 6,
            color: COLORS.offWhite,
            fontFamily: FONT.body,
            fontSize: 16,
            fontWeight: 300,
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#e05a4a', fontSize: 14, marginTop: 12, textAlign: 'center' }}
          >
            Incorrect password
          </motion.div>
        )}
      </motion.div>
      {/* Bottom-left logos */}
      <div style={{ position: 'absolute', bottom: 32, left: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src="/images/era_final.png" alt="ERA" style={{ height: 18, width: 'auto', opacity: 0.4, filter: 'brightness(0) invert(1)' }} />
        <div style={{ width: 1, height: 14, background: 'rgba(246,245,242,0.15)' }} />
        <img src="/images/dpmt_logo.png" alt="Department of Loyalty" style={{ height: 18, width: 'auto', opacity: 0.4, filter: 'brightness(0) invert(1)' }} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1: COVER
   ═══════════════════════════════════════════════════════════════ */

function CoverSection() {
  return (
    <Section dark fullHeight>
      <div style={{ maxWidth: 800 }}>
        <ScrollReveal>
          <div style={{ marginBottom: 40 }}>
            <NavalentLogo size={200} />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Kicker color={COLORS.oxide}>PHASE 1 ASSESSMENT</Kicker>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Headline color={COLORS.offWhite} size="h1">
            Making the Invisible Visible
          </Headline>
        </ScrollReveal>
        <ScrollReveal delay={0.35}>
          <div
            className="text-xl md:text-2xl"
            style={{
              fontFamily: FONT.body,
              fontWeight: 300,
              fontStyle: 'italic',
              color: COLORS.oxide,
              marginBottom: 48,
            }}
          >
            Five hypotheses about what exists, what's missing, and what to build
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 300,
              fontSize: 14,
              color: 'rgba(246,245,242,0.7)',
              lineHeight: 1.8,
            }}
          >
            Phase 1 Relationship Infrastructure Assessment · March 2026 · Confidential
          </div>
        </ScrollReveal>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ color: 'rgba(246,245,242,0.3)', fontSize: 13, fontFamily: FONT.body, textAlign: 'center' }}
        >
          <div style={{ marginBottom: 4 }}>scroll</div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <img
          src="/images/era_final.png"
          alt="ERA"
          className="logo-adaptive"
          style={{ height: 18, width: 'auto', opacity: 0.4, filter: 'brightness(0) invert(1)' }}
        />
        <div style={{ width: 1, height: 14, background: 'rgba(246,245,242,0.15)' }} />
        <img
          src="/images/dpmt_logo.png"
          alt="Department of Loyalty"
          className="logo-adaptive"
          style={{ height: 18, width: 'auto', opacity: 0.4, filter: 'brightness(0) invert(1)' }}
        />
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2: ASSESSMENT FRAMING
   ═══════════════════════════════════════════════════════════════ */

function FramingSection() {
  const hypotheses = [
    { num: 1, title: 'The relationship is the revenue engine, not marketing', color: COLORS.oxide },
    { num: 2, title: 'HubSpot has a strong foundation; now it needs to determine next best action', color: COLORS.teal },
    { num: 3, title: 'You are underleveraged on your existing network', color: COLORS.teal },
    { num: 4, title: 'The biggest missed signal is when a champion changes companies', color: COLORS.oxide },
    { num: 5, title: "The firm's content builds brand, but there is no way to capture the demand it creates", color: COLORS.teal },
  ]

  return (
    <Section narrow id="framing">
      <ScrollReveal>
        <Kicker color={COLORS.teal}>ASSESSMENT FRAMING</Kicker>
        <Headline color={COLORS.charcoal}>Five Hypotheses</Headline>
      </ScrollReveal>

      <div>
        <ScrollReveal delay={0.1}>
          <Body>
            <p style={{ marginBottom: 20 }}>
              This assessment is organized around five hypotheses that surfaced across our conversations in January, February, and March. Each hypothesis is a testable statement about how Navalent's business actually works. The data either confirms or challenges it.
            </p>
            <p style={{ marginBottom: 20 }}>
              The goal is not a comprehensive audit of everything. It is a focused diagnostic that answers the questions Ron and Jarrod have been asking for 21 years: where does our business actually come from, what are we missing, and what would a system look like that makes the good patterns repeatable without adding more work to the partners.
            </p>
          </Body>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <Callout color={COLORS.teal} textColor={COLORS.charcoal}>
            Where the data confirms, we build infrastructure to protect and amplify the pattern. Where it challenges, we have a decision to make.
          </Callout>
        </ScrollReveal>

        <HeroBreakout accent={COLORS.teal} background="rgba(31,167,162,0.06)">
          <StaggerGroup stagger={0.15} className="flex flex-col gap-4">
            {hypotheses.map((h) => (
              <div
                key={h.num}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  padding: '16px 20px',
                  background: '#fff',
                  border: `1px solid ${COLORS.divider}`,
                  borderLeft: `4px solid ${h.color}`,
                  borderRadius: '0 6px 6px 0',
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 22,
                    color: h.color,
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {h.num}
                </div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontWeight: 400,
                    fontSize: 15,
                    color: COLORS.charcoal,
                    lineHeight: 1.4,
                  }}
                >
                  {h.title}
                </div>
              </div>
            ))}
          </StaggerGroup>
        </HeroBreakout>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3: HYPOTHESIS 1
   ═══════════════════════════════════════════════════════════════ */

function Hypothesis1Divider() {
  return (
    <SectionDivider
      number="HYPOTHESIS 01"
      title="The relationship is the revenue engine, not marketing."
      subtitle="21 years of growth driven by trust, not funnels."
      color={COLORS.teal}
      id="h1"
      scope="Pipeline & Revenue"
      impact="High"
      impactLevel="High"
    />
  )
}

function Hypothesis1Section() {
  return (
    <Section dark narrow>
      <ScrollReveal>
        <Kicker color={COLORS.oxide}>WHAT THE DATA SAYS</Kicker>
      </ScrollReveal>

      <div>
        <ScrollReveal>
          <Body dark>
            <p>Ron said it in our first call: 21 years without a reliable demand creation engine, and the business is approaching $6M. Previous partners delivered content, SEO, and campaigns. None of it connected to revenue. The hypothesis is that the business runs on relationships, and the infrastructure gap is not marketing. It is a system to maintain and activate those relationships over time.</p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <InsetVisual>
            <InsetStats
              dark
              stats={[
                { value: '6%', label: 'Website win rate', color: 'rgba(184,92,74,0.5)' },
                { value: '$5.5M', label: 'From existing clients (71.4%)', color: COLORS.oxide },
              ]}
            />
          </InsetVisual>
        </ScrollReveal>

        <ScrollReveal>
          <HeroBreakout accent={COLORS.oxide} background="rgba(184,92,74,0.08)">
            <AnimatedCounter value={79} suffix="%" color={COLORS.oxide} label="Win rate on returning client deals" />
          </HeroBreakout>
        </ScrollReveal>

        <ScrollReveal>
          <Body dark>
            <p>Of 93 deals in HubSpot, returning clients close at 79% with an average deal size of $239K. Website-originated leads close at 6%. Of the 20 website deals in the CRM, exactly 1 has closed won, and it had no revenue recorded. Referrals close at 22%.</p>
            <p>The repeat client pattern is even sharper in the lifetime data. Across 101 clients and $56.9M in total revenue, 13 clients ($1M+ each) account for 78.8% of all revenue. The top 5 alone: ConAgra, Scoular, Lamb Weston, Hershey, and Abbvie, represent 55% of lifetime billings.</p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <InsetVisual>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 14, color: COLORS.offWhite, marginBottom: 12 }}>
                Deal source performance
              </div>
              <HorizontalBar label="Returning clients" value={79} maxValue={100} color={COLORS.oxide} dark />
              <HorizontalBar label="Referrals" value={22} maxValue={100} color={COLORS.oxide} suffix="%" dark />
              <HorizontalBar label="Website / Inbound" value={6} maxValue={100} color="rgba(184,92,74,0.4)" suffix="%" dark />
            </div>
          </InsetVisual>
        </ScrollReveal>

        <ScrollReveal>
          <Callout color={COLORS.oxide} textColor="rgba(246,245,242,0.85)">
            Every dollar invested in relationship infrastructure compounds at 13x the rate of inbound lead generation.
          </Callout>
        </ScrollReveal>

        <ScrollReveal>
          <InsetVisual>
            <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 14, color: COLORS.offWhite, marginBottom: 12 }}>
              Revenue concentration: Top 13 clients ($1M+ each) = 78.8% of total revenue
            </div>
            <TopClientsViz />
          </InsetVisual>
        </ScrollReveal>
      </div>

      <VerdictBox
        verdict="Confirmed"
        detail="The revenue engine is relationships. The infrastructure gap is not 'how do we get more leads' but 'how do we systematically nurture the relationships that already produce 79% of our wins.' Every dollar invested in relationship infrastructure compounds at 13x the rate of inbound lead generation."
        accent={COLORS.oxide}
        dark
      />
    </Section>
  )
}

function TopClientsViz() {
  const clients = [
    { name: 'Client 1', pct: 12.1 },
    { name: 'Client 2', pct: 10.4 },
    { name: 'Client 3', pct: 8.7 },
    { name: 'Client 4', pct: 7.9 },
    { name: 'Client 5', pct: 7.2 },
    { name: 'Client 6', pct: 6.5 },
    { name: 'Client 7', pct: 5.8 },
    { name: 'Client 8', pct: 5.1 },
    { name: 'Client 9', pct: 4.2 },
    { name: 'Client 10', pct: 3.6 },
    { name: 'Client 11', pct: 3.0 },
    { name: 'Client 12', pct: 2.3 },
    { name: 'Client 13', pct: 2.0 },
  ]
  const remaining = 21.2

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {clients.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          style={{
            width: `${Math.max(c.pct * 2.5, 60)}px`,
            height: `${Math.max(c.pct * 5, 50)}px`,
            background: COLORS.oxide,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontFamily: FONT.body,
            fontWeight: 700,
            color: '#fff',
            opacity: 0.6 + (c.pct / 12.1) * 0.4,
          }}
        >
          {c.pct}%
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        style={{
          width: 80,
          height: 50,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontFamily: FONT.body,
          fontWeight: 400,
          color: 'rgba(246,245,242,0.75)',
        }}
      >
        +{remaining}% other
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4: HYPOTHESIS 2
   ═══════════════════════════════════════════════════════════════ */

function Hypothesis2Divider() {
  return (
    <SectionDivider
      number="HYPOTHESIS 02"
      title="The foundation is strong. Now it needs to tell you what to do next."
      subtitle="HubSpot is populated but not yet instrumented to surface next-best-action signals."
      color={COLORS.teal}
      id="h2"
      scope="CRM & Data"
      impact="High"
      impactLevel="High"
    />
  )
}

function Hypothesis2Section() {
  const contactSources = [
    { label: 'Initial import (10,300 records)', value: 75.5, color: COLORS.teal },
    { label: 'Outlook sync (1,756 records)', value: 12.9, color: '#3bc9c4' },
    { label: "Ron's network (243 contacts)", value: 1.8, color: COLORS.sand },
    { label: 'Other sources', value: 9.8, color: COLORS.divider },
  ]

  return (
    <Section narrow>
      <ScrollReveal>
        <Kicker color={COLORS.teal}>WHAT THE DATA SAYS</Kicker>
      </ScrollReveal>

      <div>
        <ScrollReveal>
          <Body>
            <p>The team got the CRM stood up and populated with a broad contact base, which was the right first step. The challenge now is one that every growing firm faces: normalizing the data, ensuring accuracy and consistency, and layering in the intelligence needed to turn a contact database into a true relationship management system. The path forward is not more hands on keyboards but greater automation and enrichment.</p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <InsetVisual>
            <InsetStats
              stats={[
                { value: '93.1%', label: 'of 13,647 contacts ready for activity tracking', color: COLORS.teal },
                { value: '38.8%', label: 'use personal email addresses (opportunity for corporate matching)', color: COLORS.teal },
              ]}
            />
          </InsetVisual>
        </ScrollReveal>

        <ScrollReveal>
          <HeroBreakout accent={COLORS.teal} background="rgba(31,167,162,0.06)">
            <AnimatedCounter value={0.1} suffix="%" decimals={1} color={COLORS.teal} dark={false} label="have lead status assigned (14 of 13,647 contacts)" />
          </HeroBreakout>
        </ScrollReveal>

        <ScrollReveal>
          <Body>
            <p style={{ marginBottom: 16 }}>
              The database holds 13,647 contacts with known email addresses. Currently 43.5% are personal emails, 42.7% have a company name, and only 95 have a job title. The lifecycle stage field defaults to 'Lead' for 96% of contacts, meaning it has not yet been configured to distinguish between segments.
            </p>
            <p>
              Activity tracking is the next frontier: 708 contacts (5.2%) currently show recorded activity, 116 (0.9%) are linked to deals, and 267 (2.0%) have web tracking. Marketing email engagement has not yet been activated.
            </p>
          </Body>
        </ScrollReveal>

        {/* Contact source donut */}
        <ScrollReveal>
          <InsetVisual>
            <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.charcoal, marginBottom: 20 }}>
              Contact source breakdown
            </div>
            <DonutChart segments={contactSources} />
          </InsetVisual>
        </ScrollReveal>

        {/* Field enrichment gaps */}
        <ScrollReveal>
          <InsetVisual>
            <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.charcoal, marginBottom: 20 }}>
              Data enrichment opportunity (% of contacts with field populated)
            </div>
            <HorizontalBar label="Phone number" value={10.7} maxValue={100} color={COLORS.teal} />
            <HorizontalBar label="Job title" value={6.8} maxValue={100} color={COLORS.teal} />
            <HorizontalBar label="LinkedIn URL" value={4.3} maxValue={100} color={COLORS.teal} />
            <HorizontalBar label="Industry" value={0} maxValue={100} color={COLORS.teal} suffix="% populated" />
            <HorizontalBar label="Seniority" value={0} maxValue={100} color={COLORS.teal} suffix="% populated" />
            <div style={{ marginTop: 12, fontFamily: FONT.body, fontSize: 13, color: COLORS.secondary, fontWeight: 300 }}>
              The gap between each bar and 100% represents the enrichment opportunity. Automated enrichment tools can close these gaps without manual data entry.
            </div>
          </InsetVisual>
        </ScrollReveal>
      </div>

      <VerdictBox
        verdict="Confirmed"
        detail="The CRM was set up well as a broad contact repository. The natural next step is to move from volume to precision. Automated enrichment of the 4,274 corporate-email contacts with name, company, title, seniority, and behavioral signals will transform the database into a segmentable, scoreable system of record, without requiring additional manual effort."
        accent={COLORS.teal}
      />
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5: HYPOTHESIS 3
   ═══════════════════════════════════════════════════════════════ */

function Hypothesis3Divider() {
  return (
    <SectionDivider
      number="HYPOTHESIS 03"
      title="You are underleveraged on your existing network."
      subtitle="Thousands of warm executive relationships are invisible to the system."
      color={COLORS.sand}
      id="h3"
      scope="Relationship Network"
      impact="Critical"
      impactLevel="Critical"
    />
  )
}

function Hypothesis3Section() {
  return (
    <Section dark narrow>
      <div>
        {/* 50 vs 3 visualization */}
        <ScrollReveal>
          <InsetVisual>
            <DotVisualization />
          </InsetVisual>
        </ScrollReveal>

        <ScrollReveal>
          <Body dark>
            <p style={{ marginBottom: 16 }}>
              The math is simple but the implication is significant. If 101 client engagements each touch roughly 50 people, that is 5,000+ executives with firsthand Navalent experience. Today, the CRM retains contact information for only 2-3 stakeholders per account. The rest go dark after the engagement ends.
            </p>
            <p>
              These are not cold contacts. They are people who sat in the room, experienced the work, and saw the results. Many of them have since moved to new organizations, carrying their experience of Navalent with them. The question is whether the system knows they exist.
            </p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <HeroBreakout accent={COLORS.teal} background="rgba(31,167,162,0.08)">
            <AnimatedCounter value={0} color={COLORS.teal} label="contacts in systematic nurture — out of 5,000+ executives touched" />
          </HeroBreakout>
        </ScrollReveal>

        {/* Client cluster comparison — full width breakout */}
        <ScrollReveal>
          <HeroBreakout accent={COLORS.teal} background="rgba(31,167,162,0.04)">
            <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.offWhite, marginBottom: 24, textAlign: 'left' }}>
              Client data quality comparison
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ textAlign: 'left' }}>
              <ClusterCard
                title="Scoular"
                subtitle="Gold Standard"
                contacts={74}
                titles={71}
                linkedIn={59}
                accent={COLORS.teal}
                quality="high"
                logo="S"
                logoSrc="/images/navalent/scoular-logo.png"
                logoColor="#2D6A4F"
              />
              <ClusterCard
                title="ConAgra"
                subtitle="High Volume, Low Quality"
                contacts={141}
                titles={18}
                linkedIn={0}
                accent={COLORS.oxide}
                quality="low"
                logo="C"
                logoSrc="/images/navalent/CAG_BIG.D-85d710b2.png"
                logoColor="#C92A2A"
              />
            </div>
          </HeroBreakout>
        </ScrollReveal>

        {/* Additional cluster data */}
        <ScrollReveal>
          <Body dark>
            <p style={{ marginBottom: 16 }}>
              The cluster analysis extends across major accounts: Cargill (80 contacts, 50 with titles), Chick-fil-A (97 contacts across three name variants, 7 with titles), Experian (39 contacts, 36 with titles), Lamb Weston (35 contacts, 1 title). These are $5M to $11M lifetime accounts where the CRM knows almost nothing about the people.
            </p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <Callout color={COLORS.teal} textColor="rgba(246,245,242,0.85)">
            If 101 clients x 50 discovery contacts = 5,000+ executives with firsthand Navalent experience, today zero are systematically nurtured. The 787 contacts at known revenue client companies are the highest-priority enrichment target.
          </Callout>
        </ScrollReveal>
      </div>

      <VerdictBox
        verdict="Confirmed"
        detail="Navalent touches roughly 50 people per engagement but only retains 2-3 in the CRM. Thousands of warm executive relationships are invisible to the system. Once enriched, they become the foundation for the post-engagement system Jarrod described."
        accent={COLORS.teal}
        dark
      />
    </Section>
  )
}

function DotVisualization() {
  const dots = Array.from({ length: 50 })

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 700, color: COLORS.teal, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
        50 contacts per engagement. Only 3 retained.
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, maxWidth: 400, margin: '0 auto' }}>
        {dots.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: i < 3 ? COLORS.teal : 'rgba(255,255,255,0.1)',
              border: i < 3 ? 'none' : '1px solid rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16, fontFamily: FONT.body, fontSize: 13 }}>
        <span style={{ color: COLORS.teal }}>&#9679; Retained in CRM</span>
        <span style={{ color: 'rgba(246,245,242,0.75)' }}>&#9675; Lost after engagement</span>
      </div>
    </div>
  )
}

function ClusterCard({
  title,
  subtitle,
  contacts,
  titles,
  linkedIn,
  accent,
  quality,
  logo,
  logoSrc,
  logoColor,
}: {
  title: string
  subtitle: string
  contacts: number
  titles: number
  linkedIn: number
  accent: string
  quality: 'high' | 'low'
  logo: string
  logoSrc?: string
  logoColor: string
}) {
  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.1)',
        borderTop: `3px solid ${accent}`,
        borderRadius: 8,
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      {/* Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {logoSrc ? (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: logoColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
              padding: 6,
            }}
          >
            <img
              src={logoSrc}
              alt={`${title} logo`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: logoColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT.body,
              fontWeight: 800,
              fontSize: 20,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {logo}
          </div>
        )}
        <div>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite }}>
            {title}
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 12, color: accent, fontWeight: 700 }}>
            {subtitle}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: FONT.body, fontSize: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(246,245,242,0.75)' }}>Contacts</span>
          <span style={{ fontWeight: 700, color: COLORS.offWhite }}>{contacts}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(246,245,242,0.75)' }}>With job titles</span>
          <span style={{ fontWeight: 700, color: accent }}>{titles}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(246,245,242,0.75)' }}>LinkedIn URLs</span>
          <span style={{ fontWeight: 700, color: linkedIn === 0 ? '#e05a4a' : accent }}>{linkedIn}</span>
        </div>
        <div
          style={{
            marginTop: 8,
            padding: '6px 10px',
            borderRadius: 4,
            background: quality === 'high' ? 'rgba(31,167,162,0.15)' : 'rgba(184,92,74,0.15)',
            fontSize: 12,
            fontWeight: 700,
            color: accent,
            textAlign: 'center',
          }}
        >
          {quality === 'high' ? 'Data-rich: actionable' : 'High volume, low quality'}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6: HYPOTHESIS 4
   ═══════════════════════════════════════════════════════════════ */

function Hypothesis4Divider() {
  return (
    <SectionDivider
      number="HYPOTHESIS 04"
      title="The biggest missed signal is when a champion changes companies."
      subtitle="Champion role changes are the highest-intent signal in your business."
      color={COLORS.magenta}
      id="h4"
      scope="Signal Detection"
      impact="Critical"
      impactLevel="Critical"
    />
  )
}

function Hypothesis4Section() {
  const champions = [
    {
      name: 'Shauna Nylund',
      previousRole: 'HR Director',
      previousCompany: 'Scoular ($6.6M lifetime)',
      newRole: 'Global Human Resources Director',
      newCompany: 'nVent',
      employees: '13,000',
      startDate: 'October 2025',
    },
    {
      name: 'Jennifer Hudson',
      previousRole: 'HR Director',
      previousCompany: 'Climatec (Navalent client)',
      newRole: 'HR Director (via Bosch acquisition of Climatec)',
      newCompany: 'Bosch Building Technologies North America',
      employees: '2,100',
      note: 'Corporate acquisition rather than personal move — places a Navalent champion inside a significantly larger organization with broader transformation needs.',
    },
    {
      name: 'Matt Klitus',
      previousRole: 'CFO',
      previousCompany: 'Lyra Health (5 deals)',
      newRole: 'CFO',
      newCompany: 'Honor',
      employees: '1,200',
      startDate: 'September 2025',
    },
    {
      name: 'Lindsay Olson',
      previousRole: 'Director of HR',
      previousCompany: 'Kohler Co. (Navalent client)',
      newRole: 'Sr. Director of HR',
      newCompany: 'Kohler Co.',
      employees: '30,000',
      startDate: 'July 2025',
    },
    {
      name: 'Tina Peng',
      previousRole: 'HR VP',
      previousCompany: 'Cargill ($1.3M lifetime)',
      newRole: 'CHRO',
      newCompany: 'Apache Footwear Group',
      employees: '51',
    },
  ]

  const hotSignals = [
    {
      name: 'Rana Elias',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'CHRO',
      newCompany: 'SRG',
      employees: '7,900',
      startDate: 'July 2025',
    },
    {
      name: 'Ruth Vetter',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'Chief Compliance & Legal Officer',
      newCompany: 'TriWest Healthcare Alliance',
      employees: '2,200',
      startDate: 'October 2025',
    },
    {
      name: 'Brian Stevenson',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'Global Chief Strategy Officer',
      newCompany: 'Village Farms International',
      employees: '1,400',
      startDate: 'December 2025',
    },
    {
      name: 'Kathleen Hofmann',
      previousRole: 'Chief of Staff',
      previousCompany: 'Geraldine R. Dodge Foundation',
      newRole: 'New role',
      newCompany: 'NBME',
      employees: '720',
      startDate: 'January 2026',
    },
    {
      name: 'Riz Chand',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'SVP HR',
      newCompany: 'TXU Corp',
      employees: '1,100',
    },
  ]

  return (
    <Section narrow>
      <div>
        <ScrollReveal>
          <Body>
            <p>This was implicit in every conversation: the executives who move companies and bring Navalent with them are the highest-value leads in the business. We enriched a sample of 200 corporate-email contacts through Apollo. 114 matched (57% match rate). The results validated the hypothesis immediately.</p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <HeroBreakout accent={COLORS.oxide} background="rgba(184,92,74,0.08)">
            <AnimatedCounter value={5} color={COLORS.oxide} dark={false} label="HOT opportunities from a 2.5% sample — new role + buyer seat + non-client ICP company" />
          </HeroBreakout>
        </ScrollReveal>

        <ScrollReveal>
          <InsetVisual>
            <InsetStats
              stats={[
                { value: '5', label: 'Champions who left a Navalent client', color: COLORS.sand },
                { value: '10', label: 'WARM buyer contacts at non-clients', color: COLORS.teal },
              ]}
            />
          </InsetVisual>
        </ScrollReveal>
      </div>

      {/* Champions who moved — heading + cards outside TwoCol for clean full-width layout */}
      <ScrollReveal>
        <div style={{ marginTop: 32, marginBottom: 16 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginBottom: 4 }}>
            Champions who moved
          </div>
          <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 14, color: COLORS.secondary }}>
            Five contacts who were at Navalent client companies have moved to new organizations in buyer-level roles.
          </div>
        </div>
      </ScrollReveal>
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {champions.map((c, i) => (
          <ProfileCard key={i} {...c} accent={COLORS.oxide} />
        ))}
      </StaggerGroup>

      <div>
        <ScrollReveal>
          <Body>
            <p>
              Each of these individuals has direct experience with Navalent's work and is now in a decision-making role at a new organization. In a system with champion tracking, these signals would have surfaced within 48 hours of the role change — not months later during a manual review.
            </p>
          </Body>
        </ScrollReveal>
      </div>

      {/* Net-new HOT — heading + cards outside TwoCol */}
      <ScrollReveal>
        <div style={{ marginTop: 32, marginBottom: 16 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginBottom: 4 }}>
            Net-new HOT opportunities
          </div>
          <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 14, color: COLORS.secondary }}>
            Five contacts in new buyer-level roles at ICP-sized companies that are not existing Navalent clients.
          </div>
        </div>
      </ScrollReveal>
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {hotSignals.map((c, i) => (
          <ProfileCard key={i} {...c} accent={COLORS.magenta} />
        ))}
      </StaggerGroup>

      <div>
        <ScrollReveal>
          <InsetVisual>
            <ExtrapolationViz />
          </InsetVisual>
        </ScrollReveal>

        <ScrollReveal>
          <Callout color={COLORS.oxide} textColor={COLORS.charcoal}>
            23.7% started a new role in the last 365 days. 31.5% are now at a different company than what is in the CRM.
          </Callout>
        </ScrollReveal>
      </div>

      <VerdictBox
        verdict="Confirmed with live data"
        detail="A 200-contact sample surfaced 5 HOT opportunities, 5 champion-moved signals, and 10 WARM buyer contacts. The full enrichment of the remaining 7,676 contacts is the single highest-ROI investment in this engagement."
        accent={COLORS.oxide}
      />
    </Section>
  )
}

function ExtrapolationViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inView])

  return (
    <div
      ref={ref}
      style={{
        marginTop: 40,
        padding: '28px',
        background: 'rgba(184,92,74,0.06)',
        border: `1px solid ${COLORS.divider}`,
        borderRadius: 8,
      }}
    >
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.charcoal, marginBottom: 8 }}>
        The extrapolation: from 200 to 7,876
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.secondary, marginBottom: 24 }}>
        This was a small (2.5%) sample. If the signal rates hold across the full database:
      </div>

      {/* Animated bar showing growth from sample to full */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.body, fontSize: 13, marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: COLORS.oxide }}>200 sampled</span>
          <span style={{ fontWeight: 700, color: phase >= 1 ? COLORS.oxide : COLORS.divider }}>7,876 total contacts</span>
        </div>
        <div style={{ height: 32, background: 'rgba(0,0,0,0.04)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
          <motion.div
            initial={{ width: '2.5%' }}
            animate={{ width: phase >= 1 ? '100%' : '2.5%' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${COLORS.oxide}, ${COLORS.magenta})`, borderRadius: 6 }}
          />
          {phase < 1 && (
            <div style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)', fontFamily: FONT.body, fontSize: 11, fontWeight: 700, color: COLORS.oxide }}>
              2.5% sampled
            </div>
          )}
        </div>
      </div>

      {/* Projected numbers */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedCounter value={197} color={COLORS.oxide} size="medium" label="Projected HOT signals" />
              <AnimatedCounter value={197} color={COLORS.sand} size="medium" label="Projected champion moves" />
              <AnimatedCounter value={591} color={COLORS.teal} size="medium" label="Projected WARM signals" />
            </div>
            <div style={{ marginTop: 16, fontFamily: FONT.body, fontSize: 14, color: COLORS.secondary, textAlign: 'center', fontWeight: 300 }}>
              Even at half those rates, that is 100+ actionable signals sitting in HubSpot today that nobody can see.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7: HYPOTHESIS 5
   ═══════════════════════════════════════════════════════════════ */

function Hypothesis5Divider() {
  return (
    <SectionDivider
      number="HYPOTHESIS 05"
      title="The firm's content builds brand, but there is no way to capture the demand it creates."
      subtitle="101K impressions per quarter with zero visibility into which came from ICP contacts."
      color={COLORS.oxide}
      id="h5"
      scope="Content & Capture"
      impact="High"
      impactLevel="High"
    />
  )
}

function Hypothesis5Section() {
  const commenterData = [
    { type: 'coach', label: 'Coach', value: 24.2, count: 48, color: '#7C3AED', icon: 'coach' as const },
    { type: 'csuite', label: 'C-Suite (unknown size)', value: 15.2, count: 30, color: COLORS.sand, icon: 'csuite' as const },
    { type: 'other', label: 'Other', value: 13.6, count: 27, color: COLORS.secondary, icon: 'other' as const },
    { type: 'consultant', label: 'Consultant/Advisor', value: 13.1, count: 26, color: '#3bc9c4', icon: 'consultant' as const },
    { type: 'author', label: 'Author/Speaker', value: 11.1, count: 22, color: COLORS.oxide, icon: 'author' as const },
    { type: 'csuite-small', label: 'C-Suite (small firm)', value: 6.1, count: 12, color: '#D6985A', icon: 'csuite' as const },
    { type: 'vp-other', label: 'VP/Director Other', value: 4.5, count: 9, color: '#059669', icon: 'vp' as const },
    { type: 'academic', label: 'Academic/Student', value: 3.0, count: 6, color: '#6B7280', icon: 'academic' as const },
    { type: 'hr', label: 'HR Practitioner', value: 3.0, count: 6, color: '#4A90D9', icon: 'hr' as const },
    { type: 'founder', label: 'Founder/Entrepreneur', value: 2.0, count: 4, color: COLORS.teal, icon: 'founder' as const },
    { type: 'vp-hr', label: 'VP/Director HR/People/OD', value: 2.0, count: 4, color: COLORS.magenta, icon: 'hr' as const },
    { type: 'manager', label: 'Manager/IC', value: 2.0, count: 4, color: '#8B8B8B', icon: 'other' as const },
  ]

  return (
    <Section dark narrow>
      <div>
        <ScrollReveal>
          <Body dark>
            <p>Ron's LinkedIn presence is substantial: 3,000+ posts, HBR contributor, Forbes contributor, 2x TEDx speaker, Amazon bestseller. His latest post hit 50K impressions, created two service requests, and neither was a good fit. The hypothesis is that his content reaches a large audience, and that audience likely contains buyers. But there is no system to identify, qualify, or nurture the people who engage.</p>
          </Body>
        </ScrollReveal>
      </div>

      {/* Ron's LinkedIn screenshot — full width */}
      <ScrollReveal>
        <div style={{ margin: '32px auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: 480, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <img
              src="/images/navalent/ron-linkedin.png"
              alt="Ron Carucci's LinkedIn profile"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
                t.parentElement!.innerHTML = '<div style="padding:40px;text-align:center;color:rgba(246,245,242,0.4);font-family:Source Sans 3,sans-serif;font-size:14px">Save Ron\'s LinkedIn screenshot to<br/>/public/images/navalent/ron-linkedin.png</div>'
              }}
            />
          </div>
        </div>
      </ScrollReveal>

      {/* LinkedIn stats — full width */}
      <ScrollReveal>
        <Kicker color={COLORS.teal}>90-DAY LINKEDIN PERFORMANCE (DEC 2025 - FEB 2026)</Kicker>
      </ScrollReveal>

      <div>
        <ScrollReveal>
          <Body dark>
            <p>We analyzed 90 days of Ron's LinkedIn activity to understand the reach, engagement patterns, and audience composition. The numbers tell a story about scale without infrastructure.</p>
          </Body>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <InsetStats dark stats={[
            { value: '101,399', label: 'Total views across 3 months', color: COLORS.teal },
            { value: '2,295', label: 'Reactions across the portfolio', color: COLORS.teal },
            { value: '484', label: 'Comments on LinkedIn', color: COLORS.teal },
          ]} />
        </div>
      </ScrollReveal>

      {/* Monthly trend — full width */}
      <ScrollReveal>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 20 }}>
            Monthly views trend
          </div>
          <MiniBarChart
            data={[
              { label: 'Dec', value: 41000 },
              { label: 'Jan', value: 27000 },
              { label: 'Feb', value: 33000 },
            ]}
            color={COLORS.teal}
            dark
          />
        </div>
      </ScrollReveal>

      {/* 12-month content analysis */}
      <ScrollReveal>
        <Kicker color={COLORS.oxide}>12-MONTH CONTENT ANALYSIS (333 POSTS)</Kicker>
      </ScrollReveal>

      <div>
        <ScrollReveal>
          <Body dark>
            <p>Across 333 posts captured over 12 months, the theme distribution reveals what Ron's content engine actually produces. The themes that map directly to what Navalent sells — Org Design and Structure (2 posts, 0.6%), Cross-Functional Alignment (3 posts, 0.9%), and Leadership Team Effectiveness (7 posts, 2.1%) — account for just 3.6% of Ron's LinkedIn content.</p>
            <p>Total engagement across 12 months: 10,024 reactions (30.1 average per post), 2,391 comments (7.2 average). Post type breakdown: 179 article shares (54%), 74 images (22%), 42 videos (13%), 38 text posts (11%).</p>
          </Body>
        </ScrollReveal>
      </div>

      {/* Content theme chart — full width */}
      <ScrollReveal>
        <ContentThemeBarChart />
      </ScrollReveal>

      <div>
        <ScrollReveal>
          <Body dark>
            <p>The content that goes viral is not the content that converts. The posts that earn the most views tend to be personal, emotional, or contrarian. The posts most relevant to Navalent's ICP — leadership team design, executive transitions, organizational transformation — reach a smaller but far more valuable audience. The gap between reach and relevance is where the system needs to focus.</p>
          </Body>
        </ScrollReveal>
      </div>

      {/* Reach vs ICP comparison — full width */}
      <ScrollReveal>
        <div style={{ margin: '32px 0' }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 20 }}>
            What gets reach vs. what maps to the buyer
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ padding: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontFamily: FONT.body, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.teal, marginBottom: 12 }}>VIRAL CONTENT</div>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite }}>12,674</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views (historical echoes / political blog)</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite, marginTop: 8 }}>7,760</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views (unsolicited sales tactic rant)</div>
            </div>
            <div style={{ padding: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontFamily: FONT.body, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.oxide, marginBottom: 12 }}>ICP-RELEVANT CONTENT</div>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite }}>2,174</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views ("Resolve Cross-Dept Rivalries" HBR)</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite, marginTop: 8 }}>2,866</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views ("Tell Your Boss to Stop Doing Your Job" HBR)</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Content funnel analysis */}
      <ScrollReveal>
        <div style={{ marginTop: 48 }}>
          <Kicker color={COLORS.oxide}>THE CONTENT FUNNEL: WHERE RON'S POSTS LAND</Kicker>
          <Body dark>
            <p style={{ marginBottom: 16 }}>Every post serves one of three roles in a content strategy. We mapped all 333 of Ron's posts against this framework to see where the current emphasis sits.</p>
          </Body>
        </div>
      </ScrollReveal>

      {/* Visual 1: Funnel tiers */}
      <ScrollReveal>
        <ContentFunnelViz />
      </ScrollReveal>

      <ScrollReveal>
        <Body dark>
          <p style={{ marginBottom: 16 }}>The data reveals a clear pattern: Ron's content engine is built for the middle of the funnel. 75% of posts are educational, expertise-building, authority-establishing content. This is what makes Ron synonymous with honest, rigorous leadership thinking. It is the right foundation.</p>
          <p>But the mix is lopsided. The top of funnel (personal stories, vulnerability, culturally resonant moments) that drives algorithmic reach represents only 20% of posts, despite generating the highest comment rates. And the bottom of funnel (org design, cross-functional alignment, leadership team effectiveness) that maps directly to what Navalent sells represents just 5%, with only 18 posts in an entire year.</p>
        </Body>
      </ScrollReveal>

      {/* Visual 2: Actual vs recommended mix */}
      <ScrollReveal>
        <FunnelMixComparison />
      </ScrollReveal>

      <ScrollReveal>
        <Body dark>
          <p style={{ marginBottom: 16 }}>The format data makes this sharper. 67% of BOFU posts are article shares containing external links, which the algorithm penalizes with 40–60% less reach. The posts most relevant to the buyer are being published in the format most suppressed by the algorithm. Zero BOFU posts use carousels, despite carousels generating 3x the reach of standard posts and being optimized for saves.</p>
        </Body>
      </ScrollReveal>

      {/* Visual 3: Link penalty */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ margin: '24px 0' }}>
          <div style={{ padding: 24, background: 'rgba(31,167,162,0.08)', border: `1px solid rgba(31,167,162,0.2)`, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontFamily: FONT.body, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.teal, marginBottom: 8 }}>NATIVE POSTS</div>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite }}>37.4</div>
            <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>avg reactions</div>
            <div style={{ fontSize: 12, color: COLORS.secondary, fontFamily: FONT.body, marginTop: 4 }}>46% of posts</div>
          </div>
          <div style={{ padding: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontFamily: FONT.body, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.secondary, marginBottom: 8 }}>ARTICLE SHARES</div>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: FONT.body, color: 'rgba(246,245,242,0.5)' }}>23.9</div>
            <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.5)', fontFamily: FONT.body, marginTop: 4 }}>avg reactions</div>
            <div style={{ fontSize: 12, color: COLORS.secondary, fontFamily: FONT.body, marginTop: 4 }}>54% of posts</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontFamily: FONT.body, fontSize: 14, marginBottom: 32 }}>
          <strong style={{ color: COLORS.magenta }}>-36%</strong> <span style={{ color: 'rgba(246,245,242,0.7)' }}>engagement on more than half the content. The algorithm penalizes external links with 40–60% less reach.</span>
        </div>
      </ScrollReveal>

      {/* Visual 4: Format distribution by stage */}
      <ScrollReveal>
        <FunnelFormatBreakdown />
      </ScrollReveal>

      <ScrollReveal>
        <Body dark>
          <p>The opportunity is not to change what Ron posts. It is to rebalance the mix and shift the format on BOFU content. Convert 2–3 key Navalent frameworks into carousel format. Publish 1–2 BOFU posts per month as native text or image posts instead of article shares. Increase TOFU personal storytelling from 2/month to 4/month to drive algorithmic reach that carries MOFU and BOFU content further.</p>
        </Body>
      </ScrollReveal>

      {/* Commenter breakdown — full width */}
      <ScrollReveal>
        <div style={{ marginTop: 48 }}>
          <Kicker color={COLORS.magenta}>COMMENTER ROLE ANALYSIS (12 MONTHS)</Kicker>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.offWhite, marginBottom: 8 }}>
            198 unique commenters analyzed across 12 months
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 14, color: 'rgba(246,245,242,0.7)', marginBottom: 20 }}>
            Role breakdown of Ron's highest-engagement post commenters:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {commenterData.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <CommenterIcon type={d.icon} color={d.color} />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontFamily: FONT.body, fontSize: 14, color: COLORS.offWhite, fontWeight: 400, minWidth: 200 }}>
                    {d.label}
                  </div>
                  <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.06 + 0.2 }}
                      style={{ height: '100%', background: d.color, borderRadius: 3 }}
                    />
                  </div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: d.color, minWidth: 45, textAlign: 'right' }}>
                    {d.value}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontFamily: FONT.body, fontSize: 14, fontWeight: 300, color: 'rgba(246,245,242,0.75)' }}>
            <strong style={{ color: COLORS.magenta }}>2.0%</strong> of commenters are VP/Director of HR/People/OD at any company (4 of 198 over 12 months). <strong style={{ color: COLORS.magenta }}>1</strong> commenter in 12 months works at a known Navalent client company.
          </div>
        </div>
      </ScrollReveal>

      {/* Commenter donut chart — full width */}
      <ScrollReveal>
        <CommenterDonutViz data={commenterData} />
      </ScrollReveal>

      {/* Hero breakout: Kim Cupelli finding */}
      <ScrollReveal>
        <HeroBreakout accent={COLORS.magenta} background="rgba(212,61,141,0.08)">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 900, fontSize: 'clamp(48px, 8vw, 80px)', color: COLORS.magenta, lineHeight: 1 }}>1</div>
            <div style={{ fontFamily: FONT.body, fontWeight: 400, fontSize: 16, color: 'rgba(246,245,242,0.85)', marginTop: 12 }}>
              commenter in 12 months at a client company — Kim Cupelli at Lamb Weston. The visible engagement layer and the buying layer are almost completely separate populations.
            </div>
          </div>
        </HeroBreakout>
      </ScrollReveal>

      <div>
        <ScrollReveal>
          <Body dark>
            <p>The commenter data reveals a pattern common in thought leadership: the people who engage publicly are peers, not buyers. Enterprise CHROs, COOs, and CEOs consume content silently. They do not like, comment, or share. They read, remember, and call when they are ready. The challenge is not getting them to engage — it is knowing they are there.</p>
          </Body>
        </ScrollReveal>
      </div>

      {/* Invisible buyer concept — full width */}
      <ScrollReveal>
        <InvisibleBuyerViz />
      </ScrollReveal>

      {/* Engagement gap — full width */}
      <ScrollReveal>
        <div style={{ margin: '32px 0' }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 20 }}>
            The engagement gap
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
              <div style={{ fontSize: 48, fontWeight: 800, fontFamily: FONT.body, color: COLORS.teal }}>374</div>
              <div style={{ fontSize: 14, fontFamily: FONT.body, color: 'rgba(246,245,242,0.75)' }}>reactions on "It's no secret you're facing things for the first time" (personal vulnerability)</div>
            </div>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
              <div style={{ fontSize: 48, fontWeight: 800, fontFamily: FONT.body, color: COLORS.oxide }}>1</div>
              <div style={{ fontSize: 14, fontFamily: FONT.body, color: 'rgba(246,245,242,0.75)' }}>reaction on "We've worked with hundreds of executive teams over two decades at Navalent"</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Partner data finding */}
      <div>
        <ScrollReveal>
          <Kicker color={COLORS.sand}>THE PARTNER DATA TELLS THE OTHER HALF OF THE STORY</Kicker>
          <Body dark>
            <p style={{ marginBottom: 20 }}>The partner with the most new-business revenue in the firm, $2.06M across 15 deals, has zero LinkedIn posts in the last 12 months. Mindy Millward's deals source entirely from past clients and referrals. Her latest traffic source on every deal is "Offline Sources." Only 1 of her 24 deals originated from the website.</p>
            <p style={{ marginBottom: 20 }}>Meanwhile, Ron, who generates 101K views per quarter and has 30,892 followers, sources 9 of his 20 new business deals from the website. His content generates deal flow for him. Mindy's relationships generate deal flow without any content at all.</p>
            <p>This is the strongest argument for relationship infrastructure over content marketing. Content is one input to the system. Relationships are the system.</p>
          </Body>
        </ScrollReveal>
      </div>

      {/* Partner visibility */}
      <div>
        <ScrollReveal>
          <Kicker color={COLORS.sand}>PARTNER VISIBILITY AND THE CONTENT CONCENTRATION</Kicker>
          <Body dark>
            <p style={{ marginBottom: 20 }}><strong style={{ color: COLORS.offWhite }}>Ron Carucci:</strong> 30,892 LinkedIn followers. 508 posts in 3 years (4–5 per week). 9+ HBR bylines (2024–2026). 4+ Fast Company articles. Active Forbes contributor. 42+ podcast appearances. 2 TEDx talks (including one with 1.3M views). 3 LinkedIn Learning courses. 3 books (including an Amazon bestselling study of 2,600+ executives).</p>
            <p style={{ marginBottom: 20 }}><strong style={{ color: COLORS.offWhite }}>Jarrod Shappell:</strong> 1,454 LinkedIn followers. 23 posts in 2 years. 3 HBR bylines. 1 podcast appearance. His personal storytelling posts outperform his article shares, with his top post generating 41 reactions vs. an average of 13. There is a foundation to build on.</p>
            <p style={{ marginBottom: 20 }}><strong style={{ color: COLORS.offWhite }}>Mindy Millward:</strong> 261 posts over 11 years, zero in the last 12 months. Average engagement: 3.0 reactions per post. 40% of her content shares Ron's articles. She functions as an occasional amplifier of Ron's content, not an independent thought leader. And yet: she has the highest new-business revenue of any partner ($2.06M from 15 deals, 100% sourced from past clients and referrals, zero from content).</p>
            <p style={{ marginBottom: 20 }}><strong style={{ color: COLORS.offWhite }}>Eric Hansen:</strong> 12 posts in a decade. Complete 7-year silence between 2018 and 2024. Zero original thought leadership.</p>
            <p style={{ marginBottom: 20 }}><strong style={{ color: COLORS.offWhite }}>Navalent company page:</strong> 1,586 followers. Only 2 posts in 11 months. Functionally dormant.</p>
            <p>Ron's personal brand is approximately 20x more visible than the firm brand and 50x more visible than any other partner. This is both an asset and a liability.</p>
          </Body>
        </ScrollReveal>
      </div>

      {/* Partner scorecard — full width */}
      <ScrollReveal>
        <PartnerVisibilityScorecard partners={[
          { name: 'Ron Carucci', followers: '30,892', posts: '508 in 3 years', hbr: '9+ bylines', podcasts: '42+', independence: 5, color: COLORS.teal },
          { name: 'Jarrod Shappell', followers: '1,454', posts: '23 in 2 years', hbr: '3 bylines', podcasts: '1', independence: 2, color: COLORS.sand },
          { name: 'Mindy Millward', followers: '~1,000', posts: '0 in 12 months', hbr: 'None', podcasts: 'None', independence: 0, color: COLORS.oxide },
          { name: 'Eric Hansen', followers: '~500', posts: '12 in a decade', hbr: 'None', podcasts: 'None', independence: 0, color: COLORS.magenta },
        ]} dark />
      </ScrollReveal>

      {/* The website gap */}
      <div>
        <ScrollReveal>
          <Kicker color={COLORS.oxide}>THE WEBSITE GAP</Kicker>
          <Body dark>
            <p>The navalent.com resource center contains an estimated 280+ blog posts. However, the website functions as a brochure: no gated content, no downloadable lead magnets, no assessment tools, no visible email nurture triggers. Blog posts have no visible CTA directing to contact or assessment. Every reader who doesn't proactively call (855) 949-1880 is lost.</p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <Callout color={COLORS.sand} textColor={COLORS.offWhite}>
            The succession question: If Ron stepped back from content tomorrow, what happens to Navalent's public presence? Right now, the answer is that it largely disappears. Building partner-independent visibility is not optional — it is an existential priority.
          </Callout>
        </ScrollReveal>
      </div>

      <VerdictBox
        verdict="Confirmed, but the problem is different than expected"
        detail="The content reaches the right audience, but the visible engagement comes from non-buyers (coaches, practitioners, peers). 101,399 views over 3 months with no way to identify which came from an ICP contact is not a content problem but a visibility problem. The infrastructure needs to connect LinkedIn reach to CRM intelligence so the silent buyer becomes a known contact."
        accent={COLORS.teal}
        dark
      />
    </Section>
  )
}

function InvisibleBuyerViz() {
  const visibleCount = 30
  const invisibleCount = 80

  return (
    <div style={{ margin: '40px 0', padding: '32px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 24, textAlign: 'center' }}>
        The invisible buyer: who sees vs. who engages
      </div>

      {/* Visible engagement layer */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <LinkedInReactions size={22} />
          <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: COLORS.teal, letterSpacing: '0.1em' }}>
            VISIBLE ENGAGEMENT ({visibleCount} people)
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
          {Array.from({ length: visibleCount }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: i < 14 ? '#7C3AED' : i < 20 ? '#3bc9c4' : i < 24 ? COLORS.sand : COLORS.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </motion.div>
          ))}
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 13, color: 'rgba(246,245,242,0.7)' }}>
          Coaches, consultants, peers. They react, comment, share. Their engagement drives the algorithm.
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '20px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(20,20,20,1)', padding: '4px 16px', fontFamily: FONT.body, fontSize: 11, fontWeight: 700, color: 'rgba(246,245,242,0.75)', letterSpacing: '0.15em' }}>
          TRUST HALO
        </div>
      </div>

      {/* Invisible audience layer */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(184,92,74,0.6)">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: COLORS.oxide, letterSpacing: '0.1em' }}>
            INVISIBLE AUDIENCE (50,000+ impressions)
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 8 }}>
          {Array.from({ length: invisibleCount }).map((_, i) => (
            <motion.div
              key={`i-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.01 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(184,92,74,0.12)',
                border: '1px solid rgba(184,92,74,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: i < 8 ? 'none' : 'blur(1px)',
                opacity: i < 5 ? 0.8 : i < 15 ? 0.5 : 0.25,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(184,92,74,0.4)">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </motion.div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8, fontFamily: FONT.body, fontSize: 13, color: 'rgba(184,92,74,0.5)', fontWeight: 700 }}>
            + thousands more
          </div>
        </div>
        <div style={{ fontFamily: FONT.body, fontSize: 13, color: 'rgba(246,245,242,0.75)', lineHeight: 1.6 }}>
          Enterprise buyers: CHROs, COOs, CEOs. They watch. They do not engage publicly. They call when they are ready. The 50K impression post reached enterprise executives. It just did not generate visible engagement from them, because that is not how they use the platform.
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CONTENT THEME BAR CHART (12-MONTH ANALYSIS)
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   CONTENT FUNNEL VISUALIZATIONS
   ═══════════════════════════════════════════════════════════════ */

function ContentFunnelViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const tiers = [
    { label: 'TOP OF FUNNEL', desc: 'Awareness and reach', posts: 65, pct: '19.5%', reactions: '32.4', comments: '11.8', color: COLORS.oxide, width: '100%' },
    { label: 'MIDDLE OF FUNNEL', desc: 'Education and credibility', posts: 250, pct: '75.1%', reactions: '30.3', comments: '6.1', color: COLORS.teal, width: '75%' },
    { label: 'BOTTOM OF FUNNEL', desc: 'Conversion and business', posts: 18, pct: '5.4%', reactions: '18.9', comments: '5.3', color: COLORS.charcoal, width: '50%' },
  ]

  return (
    <div ref={ref} style={{ margin: '24px 0 32px', padding: '28px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tiers.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ width: t.width, maxWidth: '100%' }}>
              <div style={{
                padding: '16px 20px',
                background: i === 2 ? 'rgba(246,245,242,0.08)' : `${t.color}18`,
                borderLeft: `4px solid ${t.color}`,
                borderRadius: '0 8px 8px 0',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: i === 2 ? COLORS.offWhite : t.color }}>{t.label}</span>
                    <span style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 300, color: 'rgba(246,245,242,0.7)', marginLeft: 12 }}>{t.desc}</span>
                  </div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: i === 2 ? COLORS.offWhite : t.color }}>{t.pct}</div>
                </div>
                <div style={{ fontFamily: FONT.body, fontSize: 12, color: COLORS.secondary, marginTop: 6 }}>
                  {t.posts} posts · {t.reactions} avg reactions · {t.comments} avg comments
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FunnelMixComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const stages = [
    { label: 'TOFU', actual: 20, targetLow: 30, targetHigh: 40, color: COLORS.oxide, status: 'under' },
    { label: 'MOFU', actual: 75, targetLow: 40, targetHigh: 50, color: COLORS.teal, status: 'over' },
    { label: 'BOFU', actual: 5, targetLow: 10, targetHigh: 20, color: COLORS.charcoal, status: 'under' },
  ]

  return (
    <div ref={ref} style={{ margin: '24px 0 32px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 14, color: COLORS.offWhite, marginBottom: 20 }}>Actual mix vs. recommended range</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {stages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * 0.15 + 0.2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 700, color: i === 2 ? COLORS.offWhite : s.color, width: 48, flexShrink: 0, letterSpacing: '0.08em' }}>{s.label}</div>
              <div style={{ flex: 1, position: 'relative', height: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                {/* Target range (faint) */}
                <div style={{
                  position: 'absolute',
                  left: `${s.targetLow}%`,
                  width: `${s.targetHigh - s.targetLow}%`,
                  top: 0, bottom: 0,
                  background: i === 2 ? 'rgba(246,245,242,0.06)' : `${s.color}10`,
                  borderLeft: `1px dashed ${i === 2 ? 'rgba(246,245,242,0.2)' : s.color + '40'}`,
                  borderRight: `1px dashed ${i === 2 ? 'rgba(246,245,242,0.2)' : s.color + '40'}`,
                }} />
                {/* Actual bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.actual}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', background: i === 2 ? COLORS.offWhite : s.color, borderRadius: 4, opacity: 0.8 }}
                />
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: i === 2 ? COLORS.offWhite : s.color, width: 36, textAlign: 'right' }}>{s.actual}%</div>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: COLORS.secondary, width: 80, textAlign: 'right' }}>{s.targetLow}–{s.targetHigh}%</div>
              <div style={{
                fontFamily: FONT.body, fontSize: 10, fontWeight: 700,
                color: s.status === 'over' ? COLORS.oxide : COLORS.magenta,
                width: 40, textAlign: 'right',
              }}>
                {s.status === 'over' ? '▲ over' : '▼ under'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 300, color: 'rgba(246,245,242,0.6)', marginTop: 16, lineHeight: 1.6 }}>
        More TOFU for reach, more BOFU for conversion. MOFU stays strong but becomes a smaller share of a larger, more balanced mix.
      </div>
    </div>
  )
}

function FunnelFormatBreakdown() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const stages = [
    { label: 'TOFU', color: COLORS.oxide, segments: [
      { type: 'Article', pct: 34, color: 'rgba(246,245,242,0.15)' },
      { type: 'Image', pct: 29, color: COLORS.oxide },
      { type: 'Text', pct: 22, color: `${COLORS.oxide}88` },
      { type: 'Video', pct: 15, color: `${COLORS.oxide}55` },
    ], note: 'Diverse formats' },
    { label: 'MOFU', color: COLORS.teal, segments: [
      { type: 'Article', pct: 58, color: 'rgba(246,245,242,0.15)' },
      { type: 'Image', pct: 22, color: COLORS.teal },
      { type: 'Video', pct: 10, color: `${COLORS.teal}88` },
      { type: 'Text', pct: 10, color: `${COLORS.teal}55` },
    ], note: 'Link-heavy' },
    { label: 'BOFU', color: COLORS.offWhite, segments: [
      { type: 'Article', pct: 67, color: 'rgba(246,245,242,0.15)' },
      { type: 'Video', pct: 33, color: 'rgba(246,245,242,0.4)' },
    ], note: 'Zero carousels, zero images' },
  ]

  return (
    <div ref={ref} style={{ margin: '24px 0 32px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 14, color: COLORS.offWhite, marginBottom: 20 }}>Format distribution by funnel stage</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {stages.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * 0.15 + 0.2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 700, color: i === 2 ? COLORS.offWhite : s.color, width: 48, flexShrink: 0, letterSpacing: '0.08em' }}>{s.label}</div>
              <div style={{ flex: 1, display: 'flex', height: 24, borderRadius: 4, overflow: 'hidden' }}>
                {s.segments.map((seg, j) => (
                  <motion.div
                    key={j}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${seg.pct}%` } : { width: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15 + j * 0.1 + 0.3 }}
                    style={{
                      height: '100%',
                      background: seg.type === 'Article' ? seg.color : seg.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontFamily: FONT.body,
                      fontWeight: 600,
                      color: seg.type === 'Article' ? 'rgba(246,245,242,0.5)' : '#fff',
                      borderRight: '1px solid rgba(0,0,0,0.2)',
                      // Hatching pattern for article shares
                      backgroundImage: seg.type === 'Article' ? 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(246,245,242,0.04) 3px, rgba(246,245,242,0.04) 6px)' : 'none',
                    }}
                  >
                    {seg.pct >= 15 ? `${seg.type} ${seg.pct}%` : ''}
                  </motion.div>
                ))}
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 11, color: i === 2 ? COLORS.magenta : COLORS.secondary, fontWeight: i === 2 ? 700 : 400, minWidth: 140, textAlign: 'right' }}>
                {s.note}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT.body, fontSize: 11, color: COLORS.secondary }}>
          <div style={{ width: 14, height: 14, borderRadius: 2, background: 'rgba(246,245,242,0.15)', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(246,245,242,0.06) 2px, rgba(246,245,242,0.06) 4px)' }} />
          Article shares (link penalty)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT.body, fontSize: 11, color: COLORS.secondary }}>
          <div style={{ width: 14, height: 14, borderRadius: 2, background: COLORS.teal }} />
          Native formats
        </div>
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 700, color: COLORS.magenta, marginTop: 12 }}>
        Zero carousels in BOFU. The format with 3x reach and highest save rate is completely absent from the content closest to the buyer.
      </div>
    </div>
  )
}

function ContentThemeBarChart() {
  const themes = [
    { label: 'Executive Coaching & Personal Development', posts: 119, pct: 35.7, core: false },
    { label: 'Culture & Employee Experience', posts: 47, pct: 14.1, core: false },
    { label: 'Ethical Leadership & Trust', posts: 44, pct: 13.2, core: false },
    { label: 'Personal Vulnerability & Storytelling', posts: 28, pct: 8.4, core: false },
    { label: 'Change Management', posts: 28, pct: 8.4, core: false },
    { label: 'Political/Social Commentary', posts: 12, pct: 3.6, core: false },
    { label: 'Strategic Decision-Making', posts: 11, pct: 3.3, core: false },
    { label: 'Workplace Relationships & Communication', posts: 10, pct: 3.0, core: false },
    { label: 'Power & Influence Dynamics', posts: 9, pct: 2.7, core: false },
    { label: 'Career Transitions & Growth', posts: 8, pct: 2.4, core: false },
    { label: 'Leadership Team Effectiveness', posts: 7, pct: 2.1, core: true },
    { label: 'Cross-Functional Alignment', posts: 3, pct: 0.9, core: true },
    { label: 'Org Design & Structure', posts: 2, pct: 0.6, core: true },
    { label: 'Other', posts: 5, pct: 1.5, core: false },
  ]

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <div ref={ref} style={{ margin: '32px 0', padding: '28px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 8 }}>
        Content theme distribution (333 posts, 12 months)
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 13, color: 'rgba(246,245,242,0.6)', marginBottom: 24 }}>
        <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 2, background: COLORS.oxide, marginRight: 6, verticalAlign: 'middle' }} /> General themes
        <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 2, background: COLORS.magenta, marginRight: 6, marginLeft: 16, verticalAlign: 'middle' }} /> Core Navalent service themes (3.6% combined)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {themes.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: FONT.body, fontSize: 13, color: t.core ? COLORS.magenta : COLORS.offWhite, fontWeight: t.core ? 700 : 400, minWidth: 260, textAlign: 'right', flexShrink: 0 }}>
              {t.label}
            </div>
            <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${(t.pct / 36) * 100}%` } : { width: 0 }}
                transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', background: t.core ? COLORS.magenta : COLORS.oxide, borderRadius: 4 }}
              />
            </div>
            <div style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 700, color: t.core ? COLORS.magenta : 'rgba(246,245,242,0.7)', minWidth: 70, textAlign: 'right' }}>
              {t.posts} ({t.pct}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   COMMENTER DONUT VISUALIZATION
   ═══════════════════════════════════════════════════════════════ */

function CommenterDonutViz({ data }: { data: { type: string; label: string; value: number; count: number; color: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const size = 240
  const strokeWidth = 36
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  let cumulativePercent = 0

  return (
    <div ref={ref} style={{ margin: '32px 0', padding: '28px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 24, textAlign: 'center' }}>
        Commenter role distribution (198 unique, 12 months)
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8" style={{ justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
          {data.map((d, i) => {
            const dashLength = (d.value / 100) * circumference
            const dashOffset = -(cumulativePercent / 100) * circumference
            cumulativePercent += d.value
            return (
              <motion.circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={dashOffset}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
            )
          })}
          <text
            x={size / 2}
            y={size / 2 - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontFamily: FONT.body, fontWeight: 800, fontSize: 28, fill: COLORS.offWhite }}
          >
            198
          </text>
          <text
            x={size / 2}
            y={size / 2 + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontFamily: FONT.body, fontWeight: 400, fontSize: 11, fill: 'rgba(246,245,242,0.6)' }}
          >
            commenters
          </text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ delay: i * 0.04 + 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <div style={{ fontFamily: FONT.body, fontSize: 13, color: d.type === 'vp-hr' ? COLORS.magenta : COLORS.offWhite, fontWeight: d.type === 'vp-hr' ? 700 : 400, whiteSpace: 'nowrap' }}>
                {d.label}: {d.count} ({d.value}%)
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 20, textAlign: 'center', fontFamily: FONT.body, fontSize: 14, color: COLORS.magenta, fontWeight: 700 }}>
        ICP buyer segment (VP/Director HR/People/OD): 2.0%
      </div>
    </div>
  )
}


function PartnerVisibilityScorecard({ partners, dark = false }: { partners: { name: string; followers: string; posts: string; hbr: string; podcasts: string; independence: number; color: string }[]; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const metrics = ['LinkedIn Followers', 'Posts', 'HBR Bylines', 'Podcast Appearances', 'Content Independence']
  const textColor = dark ? COLORS.offWhite : COLORS.charcoal
  const subtextColor = dark ? 'rgba(246,245,242,0.7)' : COLORS.secondary
  const stripeBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
  const emptyDot = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'

  const getMetricValue = (p: typeof partners[0], metric: string) => {
    switch (metric) {
      case 'LinkedIn Followers': return p.followers
      case 'Posts': return p.posts
      case 'HBR Bylines': return p.hbr
      case 'Podcast Appearances': return p.podcasts
      case 'Content Independence': return null
      default: return ''
    }
  }

  return (
    <div ref={ref} style={{ margin: '32px 0', overflowX: 'auto' }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: textColor, marginBottom: 20 }}>
        Partner visibility comparison
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT.body, fontSize: 14 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: `2px solid ${textColor}`, fontWeight: 700, color: textColor }} />
            {partners.map((p, i) => (
              <motion.th
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ delay: i * 0.15 }}
                style={{ textAlign: 'center', padding: '12px 16px', borderBottom: `3px solid ${p.color}`, fontWeight: 700, color: p.color, minWidth: 140 }}
              >
                {p.name}
              </motion.th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, mi) => (
            <tr key={mi} style={{ background: mi % 2 === 0 ? stripeBg : 'transparent' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600, color: subtextColor, fontSize: 13 }}>{metric}</td>
              {partners.map((p, pi) => (
                <motion.td
                  key={pi}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: pi * 0.15 + mi * 0.05 + 0.2 }}
                  style={{ textAlign: 'center', padding: '10px 16px', color: textColor, fontSize: 13 }}
                >
                  {metric === 'Content Independence' ? (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: dot <= p.independence ? p.color : emptyDot,
                            transition: 'background 0.3s',
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    getMetricValue(p, metric)
                  )}
                </motion.td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TWO-ENGINE ANIMATED VISUAL
   ═══════════════════════════════════════════════════════════════ */

function TwoEngineViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setPhase(1), 1000)
    const t2 = setTimeout(() => setPhase(2), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inView])

  return (
    <div ref={ref} style={{ margin: '48px 0', padding: '40px 24px', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', color: COLORS.sand, marginBottom: 8, textAlign: 'center' }}>
        {phase < 1 ? 'TODAY' : phase < 2 ? 'WITH INFRASTRUCTURE' : 'THE MULTIPLIER'}
      </div>

      <div className="two-engine-container" style={{ position: 'relative' }}>
        {/* Desktop: side-by-side / Mobile: stacked */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12" style={{ position: 'relative' }}>

          {/* Content Engine */}
          <motion.div
            animate={{
              x: phase >= 2 ? 20 : 0,
              scale: phase >= 2 ? 0.95 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 280,
              padding: '28px 24px',
              background: `rgba(184,92,74,0.08)`,
              border: `2px solid ${COLORS.oxide}`,
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ fontFamily: FONT.body, fontWeight: 800, fontSize: 13, letterSpacing: '0.12em', color: COLORS.oxide, marginBottom: 16, textAlign: 'center' }}>
              CONTENT ENGINE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: FONT.body, fontSize: 13, color: COLORS.charcoal }}>
              <div><strong>30,892</strong> followers</div>
              <div><strong>508</strong> posts</div>
              <div><strong>101K</strong> views/quarter</div>
              <div style={{ marginTop: 8, fontSize: 12, fontStyle: 'italic', color: COLORS.secondary }}>Reaches buyers who are invisible</div>
            </div>
          </motion.div>

          {/* Connection area */}
          <div style={{ position: 'relative', width: 160, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {/* Phase 0: faint dashed line */}
            {phase < 1 && (
              <svg width="160" height="80" viewBox="0 0 160 80" style={{ position: 'absolute', inset: 0 }}>
                <line x1="0" y1="40" x2="160" y2="40" stroke={COLORS.secondary} strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
                <text x="80" y="30" textAnchor="middle" style={{ fontFamily: FONT.body, fontSize: 8, fontWeight: 600, letterSpacing: '0.08em', fill: COLORS.secondary, opacity: 0.6 }}>
                  INFORMAL, INCONSISTENT
                </text>
                <text x="80" y="58" textAnchor="middle" style={{ fontFamily: FONT.body, fontSize: 8, fontWeight: 600, letterSpacing: '0.08em', fill: COLORS.secondary, opacity: 0.6 }}>
                  PERSON-DEPENDENT
                </text>
              </svg>
            )}

            {/* Phase 1+: solid glowing line with diamond */}
            {phase >= 1 && (
              <>
                <svg width="160" height="80" viewBox="0 0 160 80" style={{ position: 'absolute', inset: 0 }}>
                  <motion.line
                    x1="0" y1="40" x2="160" y2="40"
                    stroke={COLORS.sand}
                    strokeWidth="2"
                    strokeDasharray="160"
                    initial={{ strokeDashoffset: 160 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.line
                    x1="0" y1="40" x2="160" y2="40"
                    stroke={COLORS.sand}
                    strokeWidth="4"
                    strokeDasharray="160"
                    initial={{ strokeDashoffset: 160, opacity: 0.4 }}
                    animate={{ strokeDashoffset: 0, opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ filter: 'blur(4px)' }}
                  />
                </svg>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{
                    width: 14,
                    height: 14,
                    background: COLORS.sand,
                    transform: 'rotate(45deg)',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: `0 0 12px ${COLORS.sand}`,
                  }}
                />
              </>
            )}
          </div>

          {/* Relationship Engine */}
          <motion.div
            animate={{
              x: phase >= 2 ? -20 : 0,
              scale: phase >= 2 ? 0.95 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 280,
              padding: '28px 24px',
              background: `rgba(31,167,162,0.08)`,
              border: `2px solid ${COLORS.teal}`,
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ fontFamily: FONT.body, fontWeight: 800, fontSize: 13, letterSpacing: '0.12em', color: COLORS.teal, marginBottom: 16, textAlign: 'center' }}>
              RELATIONSHIP ENGINE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: FONT.body, fontSize: 13, color: COLORS.charcoal }}>
              <div><strong>$4.8M</strong> pipeline (Mindy)</div>
              <div><strong>$3.99M</strong> closed-won</div>
              <div><strong>100%</strong> offline sourcing</div>
              <div style={{ marginTop: 8, fontSize: 12, fontStyle: 'italic', color: COLORS.secondary }}>Closes deals no content touches</div>
            </div>
          </motion.div>
        </div>

        {/* Infrastructure label (phase 1+) */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ textAlign: 'center', marginTop: 24, fontFamily: FONT.body, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: COLORS.sand }}
          >
            RELATIONSHIP INFRASTRUCTURE
          </motion.div>
        )}
        {phase >= 1 && phase < 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{ textAlign: 'center', marginTop: 12, fontFamily: FONT.body, fontSize: 14, fontWeight: 300, color: COLORS.secondary, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}
          >
            What changes when you add infrastructure:
          </motion.div>
        )}

        {/* Multiplier (phase 2) */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ textAlign: 'center', marginTop: 16 }}
          >
            <div style={{ fontFamily: FONT.display, fontWeight: 900, fontSize: 48, color: COLORS.sand, marginBottom: 8 }}>
              1 + 1 = 3
            </div>
            <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 300, color: COLORS.secondary, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              Content creates air cover. The enriched CRM tells you who's underneath it. The partner who owns the relationship gets the signal. The system makes the connection repeatable.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PARTNER COMPARISON TABLE
   ═══════════════════════════════════════════════════════════════ */

function PartnerComparisonTable() {
  const partners = [
    { name: 'Ron Carucci', content: '30,892 followers, 508 posts, 42+ podcasts', relationship: '33 deals, $4.6M pipeline, $2.65M won' },
    { name: 'Jarrod Shappell', content: '1,454 followers, 23 posts, emerging', relationship: '27 deals, $1.9M pipeline, $785K won' },
    { name: 'Mindy Millward', content: 'Zero posts in 12 months, dormant', relationship: '24 deals, $4.8M pipeline, $3.99M won' },
    { name: 'Eric Hansen', content: '12 posts in a decade, invisible', relationship: '9 deals, $355K pipeline, $205K won' },
  ]

  return (
    <div style={{ margin: '32px 0' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT.body, fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: `2px solid ${COLORS.charcoal}`, fontWeight: 700, color: COLORS.charcoal }}>Partner</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: `2px solid ${COLORS.oxide}`, fontWeight: 700, color: COLORS.oxide }}>Content Engine</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: `2px solid ${COLORS.teal}`, fontWeight: 700, color: COLORS.teal }}>Relationship Engine</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: `2px solid ${COLORS.magenta}`, fontWeight: 700, color: COLORS.magenta }}>Systematic connection?</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                <td style={{ padding: '10px 16px', fontWeight: 700, color: COLORS.charcoal }}>{p.name}</td>
                <td style={{ padding: '10px 16px', color: COLORS.secondary, fontSize: 13 }}>{p.content}</td>
                <td style={{ padding: '10px 16px', color: COLORS.secondary, fontSize: 13 }}>{p.relationship}</td>
                <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 800, color: COLORS.magenta }}>None</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, fontFamily: FONT.body, fontSize: 15, fontWeight: 300, fontStyle: 'italic', color: COLORS.secondary, textAlign: 'center' }}>
        Four partners. Two growth levers. No system bringing them together.
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   APPENDICES
   ═══════════════════════════════════════════════════════════════ */

function AppendicesSection() {
  const auditItems = [
    { item: 'HubSpot contact export & schema review', status: 'Complete' },
    { item: 'Revenue client identification (13 companies)', status: 'Complete' },
    { item: '200-contact enrichment via Apollo', status: 'Complete' },
    { item: 'Role change detection across enriched sample', status: 'Complete' },
    { item: 'Champion movement tracking (5 confirmed)', status: 'Complete' },
    { item: 'Net-new HOT opportunity identification (5 confirmed)', status: 'Complete' },
    { item: 'LinkedIn 90-day performance analysis', status: 'Complete' },
    { item: 'LinkedIn 12-month content theme analysis (333 posts)', status: 'Complete' },
    { item: 'Commenter role analysis (198 unique, 12 months)', status: 'Complete' },
    { item: 'Commenter-to-client crosswalk', status: 'Complete' },
    { item: 'HubSpot deal pipeline extraction', status: 'Complete' },
    { item: 'Partner deal attribution by source', status: 'Complete' },
    { item: 'Partner revenue comparison (all 4 partners)', status: 'Complete' },
    { item: 'Contact source distribution analysis', status: 'Complete' },
    { item: 'Returning vs. new client revenue split', status: 'Complete' },
    { item: 'Client concentration analysis (top 13)', status: 'Complete' },
    { item: 'Thought leadership audit (all 4 partners)', status: 'Complete' },
    { item: 'Company page & website content audit', status: 'Complete' },
    { item: 'Post-type distribution analysis', status: 'Complete' },
    { item: 'Navalent company LinkedIn page review', status: 'Complete' },
    { item: 'Website conversion path analysis', status: 'Complete' },
    { item: 'Full engagement theme-to-service mapping', status: 'Complete' },
    { item: "Marie's analytics integration (website visitor → content attribution)", status: 'Partial' },
    { item: 'Full 7,876 contact enrichment', status: 'Partial' },
    { item: 'ICP contact identification within LinkedIn viewers', status: 'Partial' },
  ]

  const dealSummary = [
    { partner: 'Ron Carucci', deals: 33, pipeline: '$4.6M', won: '$2.65M', newBiz: 20, returning: 13, webSource: 9 },
    { partner: 'Jarrod Shappell', deals: 27, pipeline: '$1.9M', won: '$785K', newBiz: 12, returning: 15, webSource: 3 },
    { partner: 'Mindy Millward', deals: 24, pipeline: '$4.8M', won: '$3.99M', newBiz: 15, returning: 9, webSource: 1 },
    { partner: 'Eric Hansen', deals: 9, pipeline: '$355K', won: '$205K', newBiz: 5, returning: 4, webSource: 0 },
  ]

  const themeData = [
    { theme: 'Executive Coaching & Personal Development', posts: 119, pct: '35.7%' },
    { theme: 'Culture & Employee Experience', posts: 47, pct: '14.1%' },
    { theme: 'Ethical Leadership & Trust', posts: 44, pct: '13.2%' },
    { theme: 'Personal Vulnerability & Storytelling', posts: 28, pct: '8.4%' },
    { theme: 'Change Management', posts: 28, pct: '8.4%' },
    { theme: 'Political/Social Commentary', posts: 12, pct: '3.6%' },
    { theme: 'Strategic Decision-Making', posts: 11, pct: '3.3%' },
    { theme: 'Workplace Relationships & Communication', posts: 10, pct: '3.0%' },
    { theme: 'Power & Influence Dynamics', posts: 9, pct: '2.7%' },
    { theme: 'Career Transitions & Growth', posts: 8, pct: '2.4%' },
    { theme: 'Leadership Team Effectiveness', posts: 7, pct: '2.1%' },
    { theme: 'Cross-Functional Alignment', posts: 3, pct: '0.9%' },
    { theme: 'Org Design & Structure', posts: 2, pct: '0.6%' },
    { theme: 'Other', posts: 5, pct: '1.5%' },
  ]

  const roleData = [
    { role: 'Coach', count: 48, pct: '24.2%' },
    { role: 'C-Suite (unknown size)', count: 30, pct: '15.2%' },
    { role: 'Other', count: 27, pct: '13.6%' },
    { role: 'Consultant/Advisor', count: 26, pct: '13.1%' },
    { role: 'Author/Speaker', count: 22, pct: '11.1%' },
    { role: 'C-Suite (small firm)', count: 12, pct: '6.1%' },
    { role: 'VP/Director Other', count: 9, pct: '4.5%' },
    { role: 'Academic/Student', count: 6, pct: '3.0%' },
    { role: 'HR Practitioner', count: 6, pct: '3.0%' },
    { role: 'Founder/Entrepreneur', count: 4, pct: '2.0%' },
    { role: 'VP/Director HR/People/OD', count: 4, pct: '2.0%' },
    { role: 'Manager/IC', count: 4, pct: '2.0%' },
  ]

  const tableStyle = { width: '100%' as const, borderCollapse: 'collapse' as const, fontFamily: FONT.body, fontSize: 13 }
  const thStyle = { textAlign: 'left' as const, padding: '10px 12px', borderBottom: `2px solid ${COLORS.charcoal}`, fontWeight: 700 as const, color: COLORS.charcoal, fontSize: 12 }
  const tdStyle = { padding: '8px 12px', borderBottom: `1px solid ${COLORS.divider}`, color: COLORS.secondary }

  return (
    <Section narrow id="appendices">
      <ScrollReveal>
        <Kicker color={COLORS.secondary}>APPENDICES</Kicker>
        <Headline color={COLORS.charcoal}>Supporting data and methodology</Headline>
      </ScrollReveal>

      {/* Appendix A */}
      <ScrollReveal>
        <div style={{ marginTop: 48, marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginBottom: 16 }}>
            Appendix A: Audit Completion Tracker
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Data Item</th>
                  <th style={{ ...thStyle, textAlign: 'center', width: 100 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {auditItems.map((a, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                    <td style={tdStyle}>{a.item}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      {a.status === 'Complete' ? (
                        <span style={{ color: COLORS.teal, fontWeight: 700 }}>✓ Complete</span>
                      ) : (
                        <span style={{ color: COLORS.sand, fontWeight: 700 }}>◐ Partial</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Appendix B */}
      <ScrollReveal>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginBottom: 16 }}>
            Appendix B: Partner Deal Activity and Revenue Attribution
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Partner</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Total Deals</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Pipeline</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Won</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>New Biz</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Returning</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Web-Sourced</th>
                </tr>
              </thead>
              <tbody>
                {dealSummary.map((d, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                    <td style={{ ...tdStyle, fontWeight: 700, color: COLORS.charcoal }}>{d.partner}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{d.deals}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{d.pipeline}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{d.won}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{d.newBiz}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{d.returning}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{d.webSource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Body>
            <p style={{ marginTop: 16 }}>
              Mindy Millward's sourcing pattern is the clearest illustration of the relationship engine: $2.06M in new-business revenue across 15 deals, sourced entirely from past clients and referrals. Her latest traffic source on every deal is "Offline Sources." Only 1 of 24 deals originated from the website. Ron, by contrast, sources 9 of 20 new-business deals from the website — his content generates deal flow directly.
            </p>
          </Body>
        </div>
      </ScrollReveal>

      {/* Appendix C */}
      <ScrollReveal>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginBottom: 16 }}>
            Appendix C: Ron Carucci Content Theme Distribution
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Theme</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Posts</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {themeData.map((t, i) => {
                  const isCore = ['Leadership Team Effectiveness', 'Cross-Functional Alignment', 'Org Design & Structure'].includes(t.theme)
                  return (
                    <tr key={i} style={{ background: isCore ? 'rgba(212,61,141,0.06)' : i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                      <td style={{ ...tdStyle, fontWeight: isCore ? 700 : 400, color: isCore ? COLORS.magenta : COLORS.secondary }}>{t.theme}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: isCore ? 700 : 400, color: isCore ? COLORS.magenta : COLORS.secondary }}>{t.posts}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: isCore ? 700 : 400, color: isCore ? COLORS.magenta : COLORS.secondary }}>{t.pct}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Appendix D */}
      <ScrollReveal>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginBottom: 16 }}>
            Appendix D: Commenter Role Analysis
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Role Category</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Count</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {roleData.map((r, i) => {
                  const isICP = r.role === 'VP/Director HR/People/OD'
                  return (
                    <tr key={i} style={{ background: isICP ? 'rgba(212,61,141,0.06)' : i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                      <td style={{ ...tdStyle, fontWeight: isICP ? 700 : 400, color: isICP ? COLORS.magenta : COLORS.secondary }}>{r.role}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: isICP ? 700 : 400, color: isICP ? COLORS.magenta : COLORS.secondary }}>{r.count}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: isICP ? 700 : 400, color: isICP ? COLORS.magenta : COLORS.secondary }}>{r.pct}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <Body>
            <p style={{ marginTop: 16 }}>
              Client crosswalk finding: Of 198 unique commenters matched against Navalent's full client company list, 1 match was found — Kim Cupelli at Lamb Weston. The visible engagement layer and the buying layer are almost completely separate populations.
            </p>
          </Body>
        </div>
      </ScrollReveal>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8: MY THOUGHTS (EDITORIAL)
   ═══════════════════════════════════════════════════════════════ */

function EditorialDivider() {
  return (
    <div
      id="editorial"
      style={{
        background: COLORS.charcoal,
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '96px 32px',
      }}
    >
      {/* Animated arc — subtle architectural element */}
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        style={{
          position: 'absolute',
          right: -100,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.06,
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="300" cy="300" r="250" stroke={COLORS.oxide} strokeWidth="1" />
        <circle cx="300" cy="300" r="200" stroke={COLORS.oxide} strokeWidth="0.5" />
        <path d="M300 50 A250 250 0 0 1 550 300" stroke={COLORS.oxide} strokeWidth="2" />
      </motion.svg>

      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: COLORS.oxide,
              marginBottom: 24,
            }}
          >
            MY THOUGHTS
          </div>
          <div
            style={{
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 'clamp(48px, 10vw, 120px)',
              lineHeight: 0.95,
              color: COLORS.offWhite,
              letterSpacing: '-0.03em',
              maxWidth: 900,
            }}
          >
            What's happening here.
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function EditorialSection() {
  return (
    <Section narrow>
      {/* Byline — right-aligned */}
      <ScrollReveal>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="/images/justinmarshall_image.png"
              alt="Justin Marshall"
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: `2px solid ${COLORS.oxide}` }}
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
                const fallback = document.createElement('div')
                Object.assign(fallback.style, {
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: COLORS.oxide, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT.body, fontWeight: '700', fontSize: '16px', color: COLORS.offWhite,
                  letterSpacing: '0.05em',
                })
                fallback.textContent = 'JM'
                t.parentElement!.insertBefore(fallback, t)
              }}
            />
            <div>
              <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 15, color: COLORS.charcoal }}>Justin Marshall</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div>
        {/* Lead pull quote */}
        <ScrollReveal>
          <Callout color={COLORS.oxide} textColor={COLORS.charcoal}>
            Navalent is not a firm with a marketing problem. Navalent is a firm that has built one of the most valuable relationship assets in the consulting industry and didn't know it.
          </Callout>
        </ScrollReveal>

        <ScrollReveal>
          <BodyWithMargin
            stat="$56.9M"
            statLabel="Lifetime Revenue"
            statSublabel="79% win rate on returning clients"
            statColor={COLORS.sand}
          >
            <p style={{ marginBottom: 20 }}>
              $56.9 million in lifetime revenue. 79% win rate on returning clients. Thirteen organizations that account for nearly 80% of all billings. A founder whose content reaches 100,000 people a quarter. A client roster that includes some of the most recognizable logos in American business. And a CEO in Denmark who, after hearing Ron answer six hard questions honestly, said "just go do it" without asking for a proposal.
            </p>
            <p style={{ marginBottom: 20 }}>
              Navalent doesn't win on credentials, methodologies, or marketing. It wins because when people experience what Navalent does in a room, they don't want to hire anyone else. Impact begets impact.
            </p>
          </BodyWithMargin>
        </ScrollReveal>

        {/* The Two Growth Levers */}
        <ScrollReveal>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
            Two growth levers. No repeatable system connecting them.
          </div>
          <Body>
            <p style={{ marginBottom: 20 }}>
              This firm runs two powerful demand creation engines.
            </p>
            <p style={{ marginBottom: 20 }}>
              Engine one is Ron's content: 30,892 followers, 508 posts in 3 years, 42+ podcasts, 101K views per quarter. Broad reach, strong brand, zero capture infrastructure.
            </p>
            <p style={{ marginBottom: 20 }}>
              Engine two is the partner relationship network: Mindy alone has $4.8M in pipeline and $3.99M in closed-won revenue, sourced entirely through past clients and referrals. Zero LinkedIn posts in 12 months.
            </p>
            <p>
              There is no repeatable, scalable system that brings these two powerful growth levers together. The infrastructure we build creates the system that makes this connection consistent, visible, and scalable.
            </p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <HeroBreakout accent={COLORS.sand} background="rgba(214,178,109,0.06)">
            <TwoEngineViz />
          </HeroBreakout>
        </ScrollReveal>

        <ScrollReveal>
          <InsetVisual>
            <PartnerComparisonTable />
          </InsetVisual>
        </ScrollReveal>

        {/* Transition to From/To */}
        <ScrollReveal>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.charcoal, marginTop: 32, marginBottom: 16 }}>
            Here is what that looks like, specifically:
          </div>
        </ScrollReveal>

        {/* From / To transformation */}
        <ScrollReveal>
          <InsetVisual>
            <TransformationTable
              rows={[
                { today: "Relationships live in partners' heads and personal networks", future: 'Relationships are visible, mapped, and enriched in the CRM' },
                { today: 'Champions leave and nobody notices', future: 'Role changes surface within 48 hours as actionable signals' },
                { today: '50 people experience the work; 3 stay in touch', future: 'Every discovery contact enters a structured nurture path' },
                { today: "Ron's content reaches 100K per quarter with no capture layer", future: 'Content engagement by ICP contacts flows into HubSpot as relationship signals' },
                { today: 'Pipeline meetings ask "what deals are live?"', future: 'Relationship reviews ask "which accounts are getting warmer?"' },
                { today: 'The Greg Story happens by accident', future: 'The Greg Story happens by design, across thousands of contacts' },
              ]}
            />
          </InsetVisual>
        </ScrollReveal>

        {/* Making your impact sticky */}
        <ScrollReveal>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
            Making your impact sticky
          </div>
          <BodyWithMargin
            stat="~5,000"
            statLabel="Executives Touched"
            statSublabel="101 engagements × ~50 contacts"
            statColor={COLORS.teal}
          >
            <p style={{ marginBottom: 20 }}>
              If you have 101 client engagements, and each one touches roughly 50 people during discovery and delivery, you have somewhere around 5,000 executives who know what it feels like to be on the other side of Navalent's work. Some of them are still at those companies, some have moved, some are now CHROs at organizations twice the size, some are sitting in buyer seats at companies you've never heard of, but all remember their experience of Navalent.
            </p>
            <p style={{ marginBottom: 20 }}>
              Today, zero of them are in a systematic nurture program. They live in Ron's memory, in Mindy's phone, in email threads nobody will search, and a CRM that knows their name but not their current title, their current company, or whether they changed jobs six months ago.
            </p>
            <p>
              The 200-contact sample proved what this looks like when you actually look. Shauna Nylund left Scoular and is now running HR at nVent. Matt Klitus left Lyra Health and is now CFO at Honor. These are people who know Navalent's work intimately, leading in new seats with new budgets at new companies, and nobody has reached out.
            </p>
          </BodyWithMargin>
        </ScrollReveal>

        {/* Where the real leverage is */}
        <ScrollReveal>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
            Where the real leverage is
          </div>
          <BodyWithMargin
            stat="21"
            statLabel="Years of Trust"
            statSublabel="Built by Ron, owned by the firm"
            statColor={COLORS.oxide}
          >
            <p style={{ marginBottom: 20 }}>
              Ron's LinkedIn presence is not a marketing channel. It's a trust engine. The reach, engagement, and overall halo it creates makes Navalent synonymous with a particular kind of honest, rigorous, uncomfortable-in-the-best-way leadership consulting.
            </p>
            <p style={{ marginBottom: 20 }}>
              And let me speak to the 800lb elephant in the room: Ron will not be doing this forever. It's a fact partners at the firm have named openly, and as such, our engine needs to respect the trust he has built over 21 years and make it something the firm can see, measure, and maintain in the future.
            </p>
            <p style={{ marginBottom: 20 }}>
              The leverage is in making the relationships Navalent has already built visible, maintainable, and scalable without bloating weekly schedules with tedious tasks. Today, zero of the roughly 5,000 executives Navalent has touched are in a systematic nurture program. The infrastructure changes that.
            </p>
          </BodyWithMargin>
        </ScrollReveal>

        {/* The Greg Story */}
        <ScrollReveal>
          <div
            style={{
              margin: '32px 0',
              padding: '24px 28px',
              background: 'rgba(214,178,109,0.08)',
              borderLeft: `4px solid ${COLORS.sand}`,
              borderRadius: '0 8px 8px 0',
            }}
          >
            <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 14, color: COLORS.sand, letterSpacing: '0.1em', marginBottom: 12 }}>
              THE GREG STORY
            </div>
            <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: COLORS.secondary }}>
              <p style={{ marginBottom: 12 }}>
                Nine years ago, Greg read an HBR article, describing his situation perfectly. He read Ron's book that weekend, his company offered him a coach, and said, "I want him." That one relationship, originating from a single piece of content, became a multi-million dollar client for Navalent. And when Greg moved to a new company, he brought the firm with him.
              </p>
              <p>
                I know Mindy, Jarrod, and other partners have "Greg Stories" as well, filled with a decade of compounding value. The question is whether these happen by accident or by design. Right now, it is entirely by accident.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* System vision flow */}
        <ScrollReveal>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
            If we use "The Greg Story" as a model:
          </div>
          <InsetVisual>
            <SystemFlowDiagram />
          </InsetVisual>
        </ScrollReveal>

        <ScrollReveal>
          <Body>
            <p style={{ marginTop: 24 }}>
              Our system can use content to deepen a relationship with someone. The math we will create moving forward is not something that happens by accident, but as something that's intentional, tracked, nurtured, and activated systematically across thousands of contacts.
            </p>
          </Body>
        </ScrollReveal>

        {/* The bigger picture */}
        <ScrollReveal>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
            The bigger picture
          </div>
          <BodyWithMargin
            stat="$3-4M"
            statLabel="Nationwide Engagement"
            statSublabel="From one dinner conversation"
            statColor={COLORS.sand}
          >
            <p style={{ marginBottom: 20 }}>
              The partners at Navalent have built a thriving firm with the potential to maintain that scale or leave destiny to chance. (Or an email inbox or a chance meeting in a hallway ...)
            </p>
            <p style={{ marginBottom: 20 }}>
              My goal is to create an infrastructure: not a marketing strategy or an SEO/GEO play or a campaign. Relationship infrastructure that takes the patterns that produced $56.9 million in revenue, patterns that currently live in people's heads and personal networks, and makes them visible, measurable, and repeatable.
            </p>
            <p style={{ marginBottom: 20 }}>
              The Nationwide pitch tells you everything you need to know about what Navalent is capable of. Ron and Jarrod walked into a private dinner, answered hard questions honestly, and walked out with an invitation to build a $3-4 million engagement. The white paper they sent was gorgeous. The last page said, "We've earned your trust. We've changed your culture. Let us join you."
            </p>
            <p>
              That's the truth. And the infrastructure we build needs to make that truth available to every relationship in the system, not just the ones we happen to remember at 3 a.m.
            </p>
          </BodyWithMargin>
        </ScrollReveal>

        <ScrollReveal>
          <Callout color={COLORS.sand} textColor={COLORS.charcoal}>
            The data says you've been doing this right for 21 years. The opportunity is to make it sustainable for the next 21.
          </Callout>
        </ScrollReveal>
      </div>
    </Section>
  )
}

function SystemFlowDiagram() {
  const steps = [
    { label: 'Ron publishes an HBR article about executive team design', color: COLORS.teal },
    { label: 'The enriched CRM knows that 14 contacts across 5 accounts are at companies going through exactly that challenge right now', color: COLORS.teal },
    { label: 'The system surfaces the match to the partner who owns the relationship', color: COLORS.sand },
    { label: "A partner sends the article to one person with a note: 'This reminded me of what you're navigating.'", color: COLORS.oxide },
  ]

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      style={{ position: 'relative' }}
    >
      {/* Connecting lines (desktop only) */}
      <svg
        className="hidden md:block"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Top horizontal: 1 → 2 */}
        <line x1="50%" y1="25%" x2="50%" y2="25%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4">
          <animate attributeName="x1" from="38%" to="50%" dur="0s" fill="freeze" />
        </line>
        {/* Vertical left: 1 → 3 */}
        <line x1="25%" y1="42%" x2="25%" y2="58%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Vertical right: 2 → 4 */}
        <line x1="75%" y1="42%" x2="75%" y2="58%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Horizontal center line */}
        <line x1="38%" y1="25%" x2="62%" y2="25%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="38%" y1="75%" x2="62%" y2="75%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            padding: '20px 24px',
            background: '#fff',
            border: `1px solid ${COLORS.divider}`,
            borderRadius: 8,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: step.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 15,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 400,
              fontSize: 15,
              color: COLORS.charcoal,
              lineHeight: 1.55,
              paddingTop: 7,
            }}
          >
            {step.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9: WHAT WE SHOULD BUILD
   ═══════════════════════════════════════════════════════════════ */

function RecommendationsSection() {
  const buildItems = [
    {
      num: '01',
      title: 'Enrich every corporate contact',
      description: 'The 787 contacts at revenue client companies are the priority: append current title, current company, seniority, LinkedIn URL, and last role change date. This turns a flat list into a living map. Then conduct a full enrichment pull for 7,676 contacts.',
      sprint: 'Sprint 1 · Days 1–30',
      proves: 'Signal density holds beyond the 200-contact sample',
      gate: 'Do we have enough actionable signals to justify building the tracking layer?',
      color: COLORS.teal,
      highlight: true,
    },
    {
      num: '02',
      title: 'Build champion tracking as permanent capability',
      description: "Role changes at known contacts are the highest-intent signal in your business. When Shauna Nylund moves from Scoular to nVent, that should surface in someone's inbox within 48 hours, not whenever someone happens to remember her name.",
      sprint: 'Sprint 2 · Days 31–60',
      proves: 'Partners receive timely, actionable signals they would not otherwise see',
      gate: 'Are partners acting on the signals? Which signal types drive outreach?',
      color: COLORS.magenta,
    },
    {
      num: '03',
      title: "Connect Ron's content to the CRM",
      description: "When an ICP-matching executive engages with a post, that signal needs to flow into HubSpot. Not as a vanity metric. As a relationship signal. The goal is to see who's paying attention, so that when a partner reaches out, they have context.",
      sprint: 'Sprint 2 · Days 31–60',
      proves: 'Partners receive timely, actionable signals they would not otherwise see',
      color: COLORS.oxide,
    },
    {
      num: '04',
      title: 'Create post-engagement nurture system',
      description: 'Every person touched during discovery and delivery enters a quarterly nurture path. Not a newsletter. A warm, relevant, human-feeling touch that says "we remember you, we\'re still here, and we\'re still thinking about the kind of problems you face."',
      sprint: 'Sprint 3 · Days 61–90',
      proves: 'Relationships can be maintained at scale without adding headcount',
      gate: 'Is the warmth model producing scores the partners trust?',
      color: COLORS.sand,
    },
    {
      num: '05',
      title: 'Measure warmth, not pipeline',
      description: 'Stop measuring success by leads generated. Start measuring it by relationship depth across your top 100 accounts. How many contacts do you know? How recently have you touched them? Which accounts are getting warmer and which are cooling?',
      sprint: 'Sprint 4 · Days 91–120',
      proves: 'The system runs. Can Navalent sustain this independently?',
      gate: 'What does Phase 3 look like?',
      color: COLORS.teal,
    },
  ]

  return (
    <Section narrow>
      {/* Build cards — stacked vertically */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {buildItems.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div style={{
              background: '#fff',
              border: `0.5px solid ${COLORS.divider}`,
              borderLeft: `${item.highlight ? 5 : 4}px solid ${item.color}`,
              borderRadius: 8,
              padding: '24px 28px',
              boxShadow: item.highlight ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 700, letterSpacing: '3px', color: item.color, marginBottom: 4 }}>
                    {item.num}
                  </div>
                  <div style={{ fontFamily: FONT.body, fontSize: 20, fontWeight: 700, color: COLORS.charcoal }}>
                    {item.title}
                  </div>
                </div>
                <div style={{
                  fontFamily: FONT.body,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: COLORS.secondary,
                  border: `0.5px solid ${COLORS.divider}`,
                  borderRadius: 20,
                  padding: '3px 12px',
                  flexShrink: 0,
                }}>
                  {item.sprint}
                </div>
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.6, color: COLORS.charcoal, marginBottom: 12 }}>
                {item.description}
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 12, fontStyle: 'italic', color: COLORS.secondary }}>
                Prove: {item.proves}
              </div>
              {item.gate && (
                <div style={{ fontFamily: FONT.body, fontSize: 11, color: COLORS.divider, marginTop: 4 }}>
                  Gate: {item.gate}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Content mix note — compact callout */}
      <ScrollReveal>
        <div style={{
          marginTop: 32,
          padding: '20px 24px',
          background: COLORS.offWhite,
          border: `0.5px solid ${COLORS.divider}`,
          borderRadius: 8,
        }}>
          <div style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: COLORS.oxide, marginBottom: 8 }}>
            CONTENT MIX NOTE
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.7, color: COLORS.secondary }}>
            The current content mix is 20% TOFU / 75% MOFU / 5% BOFU. The recommended range is 30–40% / 40–50% / 10–20%. The shift is not about posting differently. It is about adding more reach-driving personal content (TOFU) and more Navalent-specific frameworks as native posts and carousels (BOFU) around the existing MOFU foundation. The infrastructure makes the BOFU content 10x more valuable by connecting each post to the specific contacts who need it.
          </div>
        </div>
      </ScrollReveal>

      {/* How we'll prove it */}
      <ScrollReveal>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 20, color: COLORS.charcoal, marginTop: 48, marginBottom: 8 }}>
          How we'll prove it
        </div>
        <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 15, color: COLORS.secondary, marginBottom: 24 }}>
          120 days. Four sprints. A decision gate at every stage.
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <SprintTimeline />
      </ScrollReveal>
    </Section>
  )
}

function SprintTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const sprints = [
    {
      num: 1,
      title: 'Full data enrichment + CRM foundation',
      days: 'Days 1–30',
      period: 'April',
      color: COLORS.teal,
      deliverable: 'Enriched contact database with signal tags for all 7,876 corporate contacts',
      proves: 'Signal density holds beyond the 200-contact sample',
      gate: 'Do we have enough actionable signals to justify building the tracking layer?',
    },
    {
      num: 2,
      title: 'Champion tracking + content-to-buyer connection',
      days: 'Days 31–60',
      period: 'May',
      color: COLORS.magenta,
      deliverable: 'Automated champion-move alerts + LinkedIn content linked to HubSpot contacts',
      proves: 'Partners receive timely, actionable signals they would not otherwise see',
      gate: 'Are partners acting on the signals? Which signal types drive outreach?',
    },
    {
      num: 3,
      title: 'Nurture system + relationship scoring',
      days: 'Days 61–90',
      period: 'June',
      color: COLORS.sand,
      deliverable: 'Post-engagement nurture sequences + warmth scoring model for top 100 accounts',
      proves: 'Relationships can be maintained at scale without adding headcount',
      gate: 'Is the warmth model producing scores the partners trust and use?',
    },
    {
      num: 4,
      title: 'Operating rhythm + measurement',
      days: 'Days 91–120',
      period: 'July',
      color: COLORS.oxide,
      deliverable: 'Monthly partner review cadence + quarterly relationship health dashboard',
      proves: 'The system runs',
      gate: 'Can the firm sustain this independently? What does Phase 3 look like?',
    },
  ]

  return (
    <div ref={ref}>
      {/* Readout marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 700, color: COLORS.oxide, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <span style={{ width: 8, height: 8, background: COLORS.oxide, transform: 'rotate(45deg)', display: 'inline-block', flexShrink: 0 }} />
        Phase 1 readout: April 3
      </motion.div>

      {/* Sprint rows — full width, stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {sprints.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              gap: 0,
              borderBottom: i < 3 ? `1px solid ${COLORS.divider}` : 'none',
            }}
          >
            {/* Left: sprint number + color bar */}
            <div style={{
              width: 56,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 24,
              position: 'relative',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: `${s.color}22`,
                border: `2px solid ${s.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.body,
                fontWeight: 800,
                fontSize: 14,
                color: s.color,
              }}>
                {s.num}
              </div>
              {/* Connecting line to next sprint */}
              {i < 3 && (
                <div style={{ width: 2, flex: 1, background: COLORS.divider, marginTop: 8 }} />
              )}
            </div>

            {/* Right: content */}
            <div style={{ flex: 1, padding: '20px 0 28px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 17, color: COLORS.charcoal }}>
                  {s.title}
                </div>
                <div style={{
                  fontFamily: FONT.body,
                  fontSize: 11,
                  fontWeight: 600,
                  color: s.color,
                  background: `${s.color}15`,
                  padding: '2px 10px',
                  borderRadius: 10,
                  letterSpacing: '0.04em',
                }}>
                  {s.days} · {s.period}
                </div>
              </div>
              <div style={{ fontFamily: FONT.body, fontSize: 14, fontWeight: 300, color: COLORS.secondary, marginBottom: 10, lineHeight: 1.6 }}>
                {s.deliverable}
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: s.color, marginBottom: 2 }}>WHAT WE PROVE</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 300, fontStyle: 'italic', color: COLORS.secondary, lineHeight: 1.5 }}>{s.proves}</div>
                </div>
                <div>
                  <div style={{ fontFamily: FONT.body, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: COLORS.divider, marginBottom: 2 }}>DECISION GATE</div>
                  <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 300, color: COLORS.secondary, lineHeight: 1.5 }}>{s.gate}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* End milestone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, marginLeft: 56 + 16, fontFamily: FONT.body, fontSize: 12, fontWeight: 700, color: COLORS.oxide }}
      >
        <span style={{ width: 8, height: 8, background: COLORS.oxide, transform: 'rotate(45deg)', display: 'inline-block' }} />
        Firm readout · End of 120-day build
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10: WHAT COMES NEXT (TIMELINE)
   ═══════════════════════════════════════════════════════════════ */

function TimelineDivider() {
  return (
    <SectionDivider
      number="WHAT COMES NEXT"
      title="From assessment to action."
      subtitle="A phased roadmap to turn these findings into infrastructure."
      color={COLORS.sand}
      id="next"
    />
  )
}

function TimelineSection() {
  return (
    <Section narrow>
      <ScrollReveal>
        <Kicker color={COLORS.sand}>WHAT COMES NEXT</Kicker>
        <Headline color={COLORS.charcoal}>From assessment to action</Headline>
      </ScrollReveal>

      <div>
        <ScrollReveal>
          <Body>
            <p>The Phase 1 readout is scheduled for April 3. This is not a slide deck presentation. It's a conversation about what we found, what it means for the firm, and whether the partners are ready to invest in making the patterns that built this firm visible and repeatable.</p>
            <p>The 120-day sprint plan provides a structure with testable outcomes and decision gates at every stage. If the data doesn't hold, we stop. If it does, we build.</p>
          </Body>
        </ScrollReveal>

        <ScrollReveal>
          <TimelineItem
            label="Immediate"
            period="Before April 3"
            color={COLORS.sand}
            items={[
              'Enrich the 787 contacts at revenue client companies first. Current title, current company, seniority, LinkedIn URL, last role change date.',
              'Follow immediately with the full 7,876 corporate contact enrichment. If the sample rates hold, roughly 200 actionable signals sitting in HubSpot today.',
              'Complete the content-to-buyer analysis using Marie\'s analytics data. The question: "Did our ideal customers see this?"',
              'First outreach is simple: "Congrats on the new role."',
            ]}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TimelineItem
            label="Phase 1 Readout"
            period="April 3, 2026"
            color={COLORS.sand}
            isLast
            items={[
              'Present these findings to the firm\'s leadership and align on priorities before Sprint 1 begins.',
              'Each sprint has a clear deliverable, a proof point, and a decision gate. The plan is designed to be stopped, adjusted, or accelerated at every stage.',
            ]}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Callout color={COLORS.sand} textColor={COLORS.charcoal}>
            The data says the firm has been doing this right for 21 years. The opportunity is to make it sustainable for the next 21.
          </Callout>
        </ScrollReveal>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11: CLOSE / CTA
   ═══════════════════════════════════════════════════════════════ */

function CloseSection() {
  return (
    <Section dark fullHeight>
      <div style={{ maxWidth: 700 }}>
        <ScrollReveal>
          <div
            className="text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: FONT.body,
              fontWeight: 300,
              fontStyle: 'italic',
              color: COLORS.offWhite,
              lineHeight: 1.4,
              marginBottom: 48,
            }}
          >
            <span style={{ display: 'inline-block', width: 4, height: '1em', background: COLORS.oxide, marginRight: 16, verticalAlign: 'middle' }} />
            You've been building Navalent with 1:1, thoughtful relationships for the last 21 years. Now is the time to scale those relationships, sustainably, for another 21 years of growth.
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <button
            className="no-print"
            onClick={() => window.print()}
            style={{
              marginTop: 32,
              background: 'none',
              border: `1px solid ${COLORS.divider}`,
              borderRadius: 8,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 24px',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.offWhite)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.divider)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v10M8 11L4 7.5M8 11l4-3.5" stroke={COLORS.offWhite} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 14h12" stroke={COLORS.offWhite} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.offWhite,
                letterSpacing: '0.08em',
              }}
            >
              Download PDF
            </span>
          </button>
        </ScrollReveal>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 24,
          right: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontFamily: FONT.body,
          fontSize: 12,
          color: 'rgba(246,245,242,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src="/images/era_final.png"
            alt="ERA"
            className="logo-adaptive"
            style={{ height: 18, width: 'auto', opacity: 0.4, filter: 'brightness(0) invert(1)' }}
          />
          <div style={{ width: 1, height: 14, background: 'rgba(246,245,242,0.15)' }} />
          <img
            src="/images/dpmt_logo.png"
            alt="Department of Loyalty"
            className="logo-adaptive"
            style={{ height: 18, width: 'auto', opacity: 0.4, filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          Confidential. Prepared for Navalent.
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PRINT STYLES
   ═══════════════════════════════════════════════════════════════ */

const globalStyles = `
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

/* ─── Smooth theme transitions ─── */
#audit-root section,
#audit-root div,
#audit-root table,
#audit-root th,
#audit-root td {
  transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
}

/* ─── Logo theme adaptation ─── */
#audit-root[data-theme="light"] .logo-adaptive {
  filter: none !important;
  opacity: 0.6 !important;
}

/* ─── Light theme: full inversion ─── */

/* Cover + Close (dark fullHeight sections → light) */
#audit-root[data-theme="light"] section[style*="min-height: 100vh"] {
  background: #F6F5F2 !important;
}
#audit-root[data-theme="light"] section[style*="min-height: 100vh"] * {
  color: #383838 !important;
}
#audit-root[data-theme="light"] section[style*="min-height: 100vh"] [style*="color: rgba(246,245,242"] {
  color: #5B6670 !important;
}
#audit-root[data-theme="light"] section[style*="min-height: 100vh"] button {
  border-color: #D7DADD !important;
}
#audit-root[data-theme="light"] section[style*="min-height: 100vh"] button span {
  color: #383838 !important;
}

/* Section dividers (Charcoal → white) */
#audit-root[data-theme="light"] > div > div[style*="background: rgb(56, 56, 56)"],
#audit-root[data-theme="light"] > div > div[style*="background: #383838"],
#audit-root[data-theme="light"] div[id][style*="background: rgb(56, 56, 56)"],
#audit-root[data-theme="light"] div[id][style*="background: #383838"] {
  background: #FFFFFF !important;
}
#audit-root[data-theme="light"] div[style*="background: rgb(56, 56, 56)"] *,
#audit-root[data-theme="light"] div[style*="background: #383838"] * {
  color: #383838 !important;
}
/* Ghost numbers on dividers: reduce opacity in light mode */
#audit-root[data-theme="light"] div[style*="background: rgb(56, 56, 56)"] [style*="fontSize: 240"],
#audit-root[data-theme="light"] div[style*="background: #383838"] [style*="fontSize: 240"],
#audit-root[data-theme="light"] div[style*="background: rgb(56, 56, 56)"] [style*="font-size: 240"],
#audit-root[data-theme="light"] div[style*="background: #383838"] [style*="font-size: 240"] {
  opacity: 0.06 !important;
}

/* Dark sections (bgDark #141414 → white) */
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"],
#audit-root[data-theme="light"] section[style*="background: #141414"] {
  background: #FFFFFF !important;
}
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] p,
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] div,
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] span,
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] h2,
#audit-root[data-theme="light"] section[style*="background: #141414"] p,
#audit-root[data-theme="light"] section[style*="background: #141414"] div,
#audit-root[data-theme="light"] section[style*="background: #141414"] span,
#audit-root[data-theme="light"] section[style*="background: #141414"] h2 {
  color: #383838 !important;
}
/* Secondary text in dark sections */
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="color: rgba(246, 245, 242"],
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="color: rgba(246,245,242"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="color: rgba(246, 245, 242"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="color: rgba(246,245,242"] {
  color: #5B6670 !important;
}

/* Light content sections (offWhite → white) */
#audit-root[data-theme="light"] section[style*="background: rgb(246, 245, 242)"],
#audit-root[data-theme="light"] section[style*="background: #F6F5F2"] {
  background: #FFFFFF !important;
}

/* Hero breakouts in dark sections */
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="column-span"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="column-span"] {
  background: rgba(0,0,0,0.03) !important;
}

/* Inset visuals in dark sections: darken for light bg */
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="background: rgba(255, 255, 255, 0.04)"],
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="background: rgba(255,255,255,0.04)"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="background: rgba(255, 255, 255, 0.04)"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="background: rgba(255,255,255,0.04)"],
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="background: rgba(255, 255, 255, 0.03)"],
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="background: rgba(255,255,255,0.03)"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="background: rgba(255, 255, 255, 0.03)"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="background: rgba(255,255,255,0.03)"] {
  background: rgba(0,0,0,0.03) !important;
}

/* Borders in dark sections */
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="border: 1px solid rgba(255"],
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="border: 1px solid rgba(255, 255, 255"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="border: 1px solid rgba(255"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="border: 1px solid rgba(255, 255, 255"] {
  border-color: #D7DADD !important;
}

/* Tables */
#audit-root[data-theme="light"] th {
  background: #F6F5F2 !important;
  color: #383838 !important;
}
#audit-root[data-theme="light"] td {
  color: #383838 !important;
  border-bottom-color: #D7DADD !important;
}

/* Build cards / sprint timeline bars in dark sections */
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] [style*="border-left: 4px"],
#audit-root[data-theme="light"] section[style*="background: #141414"] [style*="border-left: 4px"] {
  background: rgba(0,0,0,0.03) !important;
}

/* Two-engine viz boxes */
#audit-root[data-theme="light"] [style*="border: 2px solid rgb(184, 92, 74)"],
#audit-root[data-theme="light"] [style*="border: 2px solid #B85C4A"] {
  background: rgba(184,92,74,0.05) !important;
}
#audit-root[data-theme="light"] [style*="border: 2px solid rgb(31, 167, 162)"],
#audit-root[data-theme="light"] [style*="border: 2px solid #1FA7A2"] {
  background: rgba(31,167,162,0.05) !important;
}

/* SVG text and strokes in light mode */
#audit-root[data-theme="light"] section[style*="background: rgb(20, 20, 20)"] svg text,
#audit-root[data-theme="light"] section[style*="background: #141414"] svg text {
  fill: #383838 !important;
}

/* Password gate inherits the theme feel */
#audit-root[data-theme="light"] + div,
#audit-root[data-theme="light"] {
  background: #FFFFFF;
}

/* Animated arc on editorial divider */
#audit-root[data-theme="light"] div[style*="background: rgb(56, 56, 56)"] svg circle,
#audit-root[data-theme="light"] div[style*="background: rgb(56, 56, 56)"] svg path,
#audit-root[data-theme="light"] div[style*="background: #383838"] svg circle,
#audit-root[data-theme="light"] div[style*="background: #383838"] svg path {
  stroke: #D7DADD !important;
}

@media print {
  /* Reset animations and transitions */
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  /* Hide interactive/nav elements */
  .no-print { display: none !important; }

  /* Page setup — US Letter with 0.75in margins */
  @page {
    size: letter;
    margin: 0.75in;
  }

  /* Body reset */
  body {
    background: #fff !important;
    color: #383838 !important;
    font-size: 11pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Section layout */
  section {
    min-height: auto !important;
    display: block !important;
    padding: 24px 0 !important;
    background: #fff !important;
    color: #383838 !important;
    position: relative !important;
  }

  section > div {
    max-width: 100% !important;
    padding: 0 !important;
  }

  /* Force dark sections to print light */
  section[style*="background"] {
    background: #fff !important;
    color: #383838 !important;
  }

  /* Section dividers → simple styled headings */
  section[style*="min-height: 100vh"] {
    min-height: auto !important;
    padding: 32px 0 16px !important;
    page-break-before: always;
  }

  /* Page breaks before hypothesis sections */
  #h1, #h2, #h3, #h4, #h5, #editorial, #next, #appendices {
    page-break-before: always;
  }

  /* Keep content together */
  .grid { break-inside: avoid; }
  svg { break-inside: avoid; }

  /* Images */
  img {
    max-width: 100% !important;
    break-inside: avoid;
  }

  /* Links */
  a { text-decoration: underline; color: #383838 !important; }

  /* Text colors for dark-mode elements */
  [style*="color: rgb(246, 245, 242)"],
  [style*="color: #F6F5F2"] {
    color: #383838 !important;
  }

  /* All text within sections */
  section * {
    color: #383838 !important;
  }

  /* Preserve accent colors on key elements */
  section [style*="border-left"] {
    border-left-color: #B85C4A !important;
  }

  /* Running footer on each page */
  body::after {
    content: "Confidential — Prepared by ERA (eracx.com) for Navalent";
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 8pt;
    color: #A0A0A0 !important;
    font-family: 'Source Sans 3', sans-serif;
    padding: 8px 0;
  }
}
`

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function NavalentAudit() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    loadFonts()
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setAuthed(true)
    }
  }, [])

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />
  }

  return (
    <>
      <style>{globalStyles}</style>
      <SideNav />
      <div id="audit-root" style={{ fontFamily: FONT.body }}>
        <CoverSection />
        <FramingSection />
        <Hypothesis1Divider />
        <Hypothesis1Section />
        <Hypothesis2Divider />
        <Hypothesis2Section />
        <Hypothesis3Divider />
        <Hypothesis3Section />
        <Hypothesis4Divider />
        <Hypothesis4Section />
        <Hypothesis5Divider />
        <Hypothesis5Section />
        <EditorialDivider />
        <EditorialSection />
        <RecommendationsSection />
        <TimelineDivider />
        <TimelineSection />
        <AppendicesSection />
        <CloseSection />
      </div>
    </>
  )
}
