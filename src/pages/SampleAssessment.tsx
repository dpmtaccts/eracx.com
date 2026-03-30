import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  COLORS,
  FONT,
  loadFonts,
  Section,
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
  CommenterIcon,
  LinkedInReactions,
  TimelineItem,
  SectionDivider,
  SideNav,
  BodyWithMargin,
  TransformationTable,
} from './navalent/components'

/* ═══════════════════════════════════════════════════════════════
   DISMISSIBLE SAMPLE BANNER
   ═══════════════════════════════════════════════════════════════ */

function SampleBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      style={{
        height: 40,
        background: COLORS.charcoal,
        color: COLORS.offWhite,
        fontFamily: FONT.body,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1100,
      }}
    >
      <span>
        This is a sample assessment. Client details have been anonymized. To discuss how this applies to your firm, contact{' '}
        <a href="mailto:hello@eracx.com" style={{ color: COLORS.oxide, textDecoration: 'underline' }}>hello@eracx.com</a>
      </span>
      <button
        onClick={onDismiss}
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: COLORS.offWhite,
          cursor: 'pointer',
          fontSize: 18,
          lineHeight: 1,
          padding: '0 4px',
        }}
        aria-label="Dismiss banner"
      >
        &times;
      </button>
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
          <img
            src="/images/riiser_line.png"
            alt="Riiser"
            style={{ maxWidth: 200, height: 'auto', marginBottom: 40 }}
          />
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
            Five hypotheses about how a relationship-driven consulting firm actually grows
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
            Phase 1 Relationship Infrastructure Assessment | Sample | 2026
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
          right: 32,
          fontFamily: FONT.body,
          fontSize: 12,
          color: 'rgba(246,245,242,0.3)',
        }}
      >
        ERA · eracx.com
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
    { num: 2, title: 'The CRM has a strong foundation; now it needs to determine the next best action', color: COLORS.teal },
    { num: 3, title: 'The firm is underleveraged on its existing network', color: COLORS.teal },
    { num: 4, title: 'The biggest missed signal is when a champion changes companies', color: COLORS.oxide },
    { num: 5, title: "The founder's content builds brand, but the firm has no way to capture the demand it creates", color: COLORS.teal },
  ]

  return (
    <Section id="framing">
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ScrollReveal>
          <Kicker color={COLORS.teal}>ASSESSMENT FRAMING</Kicker>
          <Headline color={COLORS.charcoal}>What we are testing</Headline>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Left: body text */}
          <div>
            <ScrollReveal delay={0.1}>
              <Body>
                <p style={{ marginBottom: 20 }}>
                  This assessment is organized around five hypotheses that surfaced across conversations with the firm's leadership in early 2026. Each hypothesis is a testable statement about how the business actually works. The data either confirms or challenges it. Where it confirms, we build infrastructure to protect and amplify the pattern. Where it challenges, we have a decision to make.
                </p>
                <p style={{ marginBottom: 20 }}>
                  The goal is not a comprehensive audit of everything. It is a focused diagnostic that answers the questions the firm's partners have been asking for two decades: where does our business actually come from, what are we missing, and what would a system look like that makes the good patterns repeatable without adding more work to the partners.
                </p>
              </Body>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <Callout color={COLORS.teal} textColor={COLORS.charcoal}>
                Where the data confirms, we build infrastructure to protect and amplify the pattern. Where it challenges, we have a decision to make.
              </Callout>
            </ScrollReveal>
          </div>

          {/* Right: Five hypotheses list */}
          <div>
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
          </div>
        </div>
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
      subtitle="20+ years of growth driven by trust, not funnels."
      color={COLORS.teal}
      id="h1"
      scope="Pipeline & Revenue"
      impact="Critical"
      impactLevel="Critical"
    />
  )
}

function Hypothesis1Section() {
  return (
    <Section dark>
      <ScrollReveal>
        <Kicker color={COLORS.oxide}>WHAT THE DATA SAYS</Kicker>
        <Body dark>
          <p>The firm's founder said it in our first call: more than twenty years without a reliable demand creation engine, and the business is approaching $6M. Previous partners delivered content, SEO, and campaigns. None of it connected to revenue. The hypothesis is that the business runs on relationships, and the infrastructure gap is not marketing. It is a system to maintain and activate those relationships over time.</p>
        </Body>
      </ScrollReveal>

      {/* Big stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <ScrollReveal delay={0}>
          <AnimatedCounter value={79} suffix="%" color={COLORS.oxide} label="Win rate on returning client deals" />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <AnimatedCounter value={6} suffix="%" color={COLORS.oxide} label="Win rate on website-originated deals" />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <AnimatedCounter value={5.5} prefix="$" suffix="M" decimals={1} color={COLORS.oxide} label="Closed-won from existing business (71.4% of total)" />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="columns-1 md:columns-2 gap-12">
          <Body dark>
            <p style={{ marginBottom: 16 }}>
              Of 93 deals in the CRM, returning clients close at 79% with an average deal size of $239K. Website-originated leads close at 6%. Of the 20 website deals in the system, exactly 1 has closed won, and it had no revenue recorded. Referrals close at 22%.
            </p>
            <p>
              The repeat client pattern is even sharper in the lifetime data. Across 101 clients and $56.9M in total revenue, 13 clients ($1M+ each) account for 78.8% of all revenue. The top 5 alone represent 55% of lifetime billings.
            </p>
          </Body>
        </div>
      </ScrollReveal>

      {/* Deal source comparison */}
      <ScrollReveal>
        <div style={{ marginTop: 40, marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 20 }}>
            Deal source performance
          </div>
          <HorizontalBar label="Returning clients" value={79} maxValue={100} color={COLORS.oxide} dark />
          <HorizontalBar label="Referrals" value={22} maxValue={100} color={COLORS.oxide} suffix="%" dark />
          <HorizontalBar label="Website / Inbound" value={6} maxValue={100} color="rgba(184,92,74,0.4)" suffix="%" dark />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <Callout color={COLORS.oxide} textColor="rgba(246,245,242,0.85)">
          Every dollar invested in relationship infrastructure compounds at 13x the rate of inbound lead generation.
        </Callout>
      </ScrollReveal>

      {/* Top clients treemap */}
      <ScrollReveal>
        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 16 }}>
            Revenue concentration: Top 13 clients ($1M+ each) account for 78.8% of total revenue
          </div>
          <TopClientsViz />
        </div>
      </ScrollReveal>

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
      title="The CRM has a strong foundation. Now it needs to determine the next best action."
      subtitle="Populated but not yet instrumented to surface next-best-action signals."
      color={COLORS.teal}
      id="h2"
      scope="CRM & Data Quality"
      impact="High"
      impactLevel="High"
    />
  )
}

function Hypothesis2Section() {
  const contactSources = [
    { label: 'Initial import (10,300 records)', value: 75.5, color: COLORS.teal },
    { label: 'Email client sync (1,756 records)', value: 12.9, color: '#3bc9c4' },
    { label: "Founder's network (243 contacts)", value: 1.8, color: COLORS.sand },
    { label: 'Other sources', value: 9.8, color: COLORS.divider },
  ]

  return (
    <Section>
      <ScrollReveal>
        <Kicker color={COLORS.teal}>WHAT THE DATA SAYS</Kicker>
        <Body>
          <p>The team got the CRM stood up and populated with a broad contact base, which was the right first step. The challenge now is one that every growing firm faces: normalizing the data, ensuring accuracy and consistency, and layering in the intelligence needed to turn a contact database into a true relationship management system. The path forward is not more hands on keyboards but greater automation and enrichment.</p>
        </Body>
      </ScrollReveal>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <ScrollReveal delay={0}>
          <AnimatedCounter value={93.1} suffix="%" decimals={1} color={COLORS.teal} dark={false} label="of 13,647 contacts ready for activity tracking" />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <AnimatedCounter value={38.8} suffix="%" decimals={1} color={COLORS.teal} dark={false} label="use personal email addresses (opportunity for corporate matching)" />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <AnimatedCounter value={0.1} suffix="%" decimals={1} color={COLORS.teal} dark={false} label="have lead status assigned (14 of 13,647 contacts)" />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="columns-1 md:columns-2 gap-12">
          <Body>
            <p style={{ marginBottom: 16 }}>
              The database holds 13,647 contacts with known email addresses, built primarily from a large initial import of 10,300 records (75.5%) supplemented by an email client sync (1,756 records) and the founder's personal network (243 contacts). This gave the CRM broad reach from day one. The opportunity now is data enrichment: currently 43.5% are personal emails, 42.7% have a company name, and 95 have a job title. Automated enrichment tools can rapidly close these gaps without requiring manual data entry.
            </p>
            <p style={{ marginBottom: 16 }}>
              The biggest enrichment opportunities are in key fields: job title (6.8% populated), phone (10.7%), LinkedIn (4.3%), industry (0%), and seniority (0%). The lifecycle stage field is universally populated but currently defaults to 'Lead' for 96% of contacts, which means it has not yet been configured to distinguish between segments. These are exactly the kinds of gaps that automated enrichment and smarter lifecycle rules can solve at scale.
            </p>
            <p>
              Activity tracking is the next frontier: 708 contacts (5.2%) currently show recorded activity, 116 (0.9%) are linked to deals, and 267 (2.0%) have web tracking. Marketing email engagement has not yet been activated. This represents a significant untapped opportunity to layer behavioral data on top of the contact foundation.
            </p>
          </Body>
        </div>
      </ScrollReveal>

      {/* Contact source donut */}
      <ScrollReveal>
        <div style={{ marginTop: 40, marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.charcoal, marginBottom: 20 }}>
            Contact source breakdown
          </div>
          <DonutChart segments={contactSources} />
        </div>
      </ScrollReveal>

      {/* Field enrichment gaps */}
      <ScrollReveal>
        <div>
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
        </div>
      </ScrollReveal>

      <VerdictBox
        verdict="Confirmed"
        detail="The CRM was set up well as a broad contact repository, pulling in data from multiple sources. The natural next step is to move from volume to precision. Automated enrichment of the 4,274 corporate-email contacts with name, company, title, seniority, and behavioral signals will transform the database into a segmentable, scoreable system of record, without requiring additional manual effort."
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
      title="The firm is underleveraged on its existing network."
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
    <Section dark>
      {/* 50 vs 3 visualization */}
      <ScrollReveal>
        <div style={{ margin: '48px 0' }}>
          <DotVisualization />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <Body dark>
          <p style={{ marginBottom: 16 }}>
            The math is simple but the implication is significant. If 101 client engagements each touch roughly 50 people, that is 5,000+ executives with firsthand experience of the firm's work. Today, the CRM retains contact information for only 2-3 stakeholders per account. The rest go dark after the engagement ends.
          </p>
          <p>
            These are not cold contacts. They are people who sat in the room, experienced the work, and saw the results. Many of them have since moved to new organizations, carrying their experience with them. The question is whether the system knows they exist.
          </p>
        </Body>
      </ScrollReveal>

      {/* Client cluster comparison */}
      <ScrollReveal>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 20 }}>
            Client data quality comparison
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ClusterCard
              title="Client B (Agriculture)"
              subtitle="Gold Standard"
              contacts={74}
              titles={71}
              linkedIn={59}
              accent={COLORS.teal}
              quality="high"
              logo="B"
              logoColor="#2D6A4F"
            />
            <ClusterCard
              title="Client A (CPG)"
              subtitle="High Volume, Low Quality"
              contacts={141}
              titles={18}
              linkedIn={0}
              accent={COLORS.oxide}
              quality="low"
              logo="A"
              logoColor="#C92A2A"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Additional cluster data */}
      <ScrollReveal>
        <Body dark>
          <p style={{ marginBottom: 16 }}>
            The cluster analysis extends across major accounts: [Client H] (80 contacts, 50 with titles), [Client F] (97 contacts across three name variants, 7 with titles), [Client G] (39 contacts, 36 with titles), [Client C] (35 contacts, 1 title). These are $5M to $11M lifetime accounts where the CRM knows almost nothing about the people.
          </p>
        </Body>
      </ScrollReveal>

      <ScrollReveal>
        <Callout color={COLORS.teal} textColor="rgba(246,245,242,0.85)">
          If 101 clients x 50 discovery contacts = 5,000+ executives with firsthand experience of the firm's work, today zero are systematically nurtured. The 787 contacts at known revenue client companies are the highest-priority enrichment target.
        </Callout>
      </ScrollReveal>

      <VerdictBox
        verdict="Confirmed"
        detail="The firm touches roughly 50 people per engagement but only retains 2-3 in the CRM. Thousands of warm executive relationships are invisible to the system. Once enriched, they become the foundation for the post-engagement engagement system the partners described."
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
      name: 'Contact 1',
      previousRole: 'HR Director',
      previousCompany: 'Client B ($6.6M lifetime)',
      newRole: 'Global HR Director',
      newCompany: '13,000-employee manufacturer',
      employees: '13,000',
      startDate: 'October 2025',
    },
    {
      name: 'Contact 2',
      previousRole: 'HR Director',
      previousCompany: 'Client D (client firm)',
      newRole: 'HR Director',
      newCompany: 'Global industrial company',
      employees: '2,100',
    },
    {
      name: 'Contact 3',
      previousRole: 'CFO',
      previousCompany: 'Client E (5 engagements)',
      newRole: 'CFO',
      newCompany: 'Healthcare company',
      employees: '1,200',
      startDate: 'September 2025',
    },
    {
      name: 'Contact 4',
      previousRole: 'Director of HR',
      previousCompany: 'Client F (current client)',
      newRole: 'Sr. Director of HR',
      newCompany: 'Client F',
      employees: '30,000',
      startDate: 'July 2025',
    },
    {
      name: 'Contact 5',
      previousRole: 'HR VP',
      previousCompany: 'Client H ($1.3M lifetime)',
      newRole: 'CHRO',
      newCompany: 'Small company',
      employees: '51',
    },
  ]

  const hotSignals = [
    {
      name: 'Contact 6',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'CHRO',
      newCompany: 'Investment management firm',
      employees: '7,900',
      startDate: 'July 2025',
    },
    {
      name: 'Contact 7',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'Chief Compliance & Legal Officer',
      newCompany: 'Healthcare organization',
      employees: '2,200',
      startDate: 'October 2025',
    },
    {
      name: 'Contact 8',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'Global Chief Strategy Officer',
      newCompany: 'Company in transition',
      employees: '1,400',
      startDate: 'December 2025',
    },
    {
      name: 'Contact 9',
      previousRole: 'Chief of Staff',
      previousCompany: 'Foundation',
      newRole: 'New role',
      newCompany: 'Professional services org',
      employees: '720',
      startDate: 'January 2026',
    },
    {
      name: 'Contact 10',
      previousRole: '(Previously in network)',
      previousCompany: 'Prior organization',
      newRole: 'SVP HR',
      newCompany: 'Utilities company',
      employees: '1,100',
    },
  ]

  return (
    <Section>
      <ScrollReveal>
        <Body>
          <p>This was implicit in every conversation: the executives who move companies and bring the firm with them are the highest-value leads in the business. The founder described a CEO abroad who, after hearing him answer six hard questions honestly, said 'just do whatever it takes' without asking for a proposal. Initial enrichment from data samples suggest there could be hundreds of contacts in the CRM that have moved into new roles in the last 365 days.</p>
        </Body>
      </ScrollReveal>

      {/* Signal stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <ScrollReveal delay={0}>
          <AnimatedCounter value={5} color={COLORS.oxide} dark={false} label="HOT: New role + buyer seat + non-client ICP company" />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <AnimatedCounter value={5} color={COLORS.sand} dark={false} label="Champions who left a client firm for a new company" />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <AnimatedCounter value={10} color={COLORS.teal} dark={false} label="WARM: Buyer-level contacts at non-client ICP companies" />
        </ScrollReveal>
      </div>

      {/* Champions who moved */}
      <ScrollReveal>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.charcoal, marginBottom: 4 }}>
          Champions who moved (highest-value signals)
        </div>
        <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 14, color: COLORS.secondary, marginBottom: 16 }}>
          Five contacts who were at client companies have moved to new organizations in buyer-level roles.
        </div>
      </ScrollReveal>
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {champions.map((c, i) => (
          <ProfileCard key={i} {...c} accent={COLORS.oxide} />
        ))}
      </StaggerGroup>

      <ScrollReveal>
        <Body>
          <p>
            Each of these individuals has direct experience with the firm's work and is now in a decision-making role at a new organization. In a system with champion tracking, these signals would have surfaced within 48 hours of the role change — not months later during a manual review.
          </p>
        </Body>
      </ScrollReveal>

      {/* Net-new HOT */}
      <ScrollReveal>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.charcoal, marginBottom: 4, marginTop: 32 }}>
          Net-new HOT opportunities
        </div>
        <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 14, color: COLORS.secondary, marginBottom: 16 }}>
          Five contacts in new buyer-level roles at ICP-sized companies that are not existing clients.
        </div>
      </ScrollReveal>
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {hotSignals.map((c, i) => (
          <ProfileCard key={i} {...c} accent={COLORS.magenta} />
        ))}
      </StaggerGroup>

      {/* Extrapolation */}
      <ScrollReveal>
        <ExtrapolationViz />
      </ScrollReveal>

      <ScrollReveal>
        <Callout color={COLORS.oxide} textColor={COLORS.charcoal}>
          23.7% started a new role in the last 365 days. 31.5% are now at a different company than what is in the CRM.
        </Callout>
      </ScrollReveal>

      <VerdictBox
        verdict="Confirmed with live data"
        detail="A 200-contact sample surfaced 5 HOT opportunities, 5 champion-moved signals, and 10 WARM buyer contacts. The full enrichment of the remaining 7,676 contacts is the single highest-ROI investment in this engagement. The infrastructure to detect these signals on an ongoing basis is what Phase 2 builds."
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
              Even at half those rates, that is 100+ actionable signals sitting in the CRM today that nobody can see.
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
      title="Content builds brand, but no way to capture the demand it creates."
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
    { type: 'other', label: 'Other (ICs, managers, mixed)', value: 42.7, color: COLORS.secondary, icon: 'other' as const },
    { type: 'coach', label: 'Coaches', value: 18.7, color: '#7C3AED', icon: 'coach' as const },
    { type: 'csuite', label: 'C-suite (coaches/fractional)', value: 17.3, color: COLORS.sand, icon: 'csuite' as const },
    { type: 'consultant', label: 'Consultants & advisors', value: 8.0, color: '#3bc9c4', icon: 'consultant' as const },
    { type: 'founder', label: 'Founders & entrepreneurs', value: 5.3, color: COLORS.teal, icon: 'founder' as const },
    { type: 'author', label: 'Authors & speakers', value: 2.7, color: COLORS.oxide, icon: 'author' as const },
    { type: 'hr', label: 'HR practitioners', value: 2.7, color: COLORS.magenta, icon: 'hr' as const },
    { type: 'vp', label: 'VP or Director level', value: 1.3, color: '#059669', icon: 'vp' as const },
    { type: 'academic', label: 'Academic/student', value: 1.3, color: '#6B7280', icon: 'academic' as const },
  ]

  return (
    <Section dark>
      <ScrollReveal>
        <Body dark>
          <p>The founder's LinkedIn presence is substantial: 3,000+ posts, contributor to two of the world's most prestigious business publications, 2x TEDx speaker, Amazon bestselling author. A recent post hit 50K impressions, created two service requests, and neither was a good fit. The hypothesis is that the content reaches a large audience, and that audience likely contains buyers at ideal companies. But there is no system to identify, qualify, or nurture the people who engage or are exposed to the thought leadership.</p>
        </Body>
      </ScrollReveal>

      {/* LinkedIn stats */}
      <ScrollReveal>
        <Kicker color={COLORS.teal}>90-DAY LINKEDIN PERFORMANCE</Kicker>
        <Body dark>
          <p>
            We analyzed 90 days of the founder's LinkedIn activity to understand the reach, engagement patterns, and audience composition. The numbers tell a story about scale without infrastructure.
          </p>
        </Body>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <ScrollReveal delay={0}>
          <AnimatedCounter value={101399} color={COLORS.teal} label="Total views across 3 months" />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <AnimatedCounter value={2295} color={COLORS.teal} label="Reactions across the portfolio" />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <AnimatedCounter value={484} color={COLORS.teal} label="Comments on LinkedIn" />
        </ScrollReveal>
      </div>

      {/* Monthly trend */}
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

      <ScrollReveal>
        <Body dark>
          <p>
            The content that goes viral is not the content that converts. The posts that earn the most views tend to be personal, emotional, or contrarian. The posts most relevant to the firm's ICP — leadership team design, executive transitions, organizational transformation — reach a smaller but far more valuable audience. The gap between reach and relevance is where the system needs to focus.
          </p>
        </Body>
      </ScrollReveal>

      {/* Reach vs ICP comparison */}
      <ScrollReveal>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 20 }}>
            What gets reach vs. what maps to the buyer
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ padding: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontFamily: FONT.body, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.teal, marginBottom: 12 }}>
                VIRAL CONTENT
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite }}>12,674</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views (personal/political blog)</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite, marginTop: 8 }}>7,760</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views (unsolicited sales tactic rant)</div>
            </div>
            <div style={{ padding: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontFamily: FONT.body, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.oxide, marginBottom: 12 }}>
                ICP-RELEVANT CONTENT
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite }}>2,174</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views (major publication article on cross-dept rivalries)</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: FONT.body, color: COLORS.offWhite, marginTop: 8 }}>2,866</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,242,0.7)', fontFamily: FONT.body, marginTop: 4 }}>views (major publication article on organizational performance)</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Commenter breakdown with icons */}
      <ScrollReveal>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 8 }}>
            Who is commenting? 75 unique commenters analyzed
          </div>
          <div style={{ fontFamily: FONT.body, fontSize: 14, color: 'rgba(246,245,242,0.7)', marginBottom: 20 }}>
            182 total comments across last 30 posts. Role breakdown:
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
            0% of commenters are VP/Director of HR at a 500+ employee enterprise. But that does not mean they are not watching.
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <Body dark>
          <p>
            The commenter data reveals a pattern common in thought leadership: the people who engage publicly are peers, not buyers. Enterprise CHROs, COOs, and CEOs consume content silently. They do not like, comment, or share. They read, remember, and call when they are ready. The challenge is not getting them to engage — it is knowing they are there.
          </p>
        </Body>
      </ScrollReveal>

      {/* Invisible buyer concept */}
      <ScrollReveal>
        <InvisibleBuyerViz />
      </ScrollReveal>

      {/* Post performance contrast */}
      <ScrollReveal>
        <div style={{ marginTop: 40, marginBottom: 16 }}>
          <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 16, color: COLORS.offWhite, marginBottom: 20 }}>
            The engagement gap
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
              <div style={{ fontSize: 48, fontWeight: 800, fontFamily: FONT.body, color: COLORS.teal }}>374</div>
              <div style={{ fontSize: 14, fontFamily: FONT.body, color: 'rgba(246,245,242,0.75)' }}>
                reactions on personal vulnerability post
              </div>
            </div>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
              <div style={{ fontSize: 48, fontWeight: 800, fontFamily: FONT.body, color: COLORS.oxide }}>1</div>
              <div style={{ fontSize: 14, fontFamily: FONT.body, color: 'rgba(246,245,242,0.75)' }}>
                reaction on "We've worked with hundreds of executive teams over two decades"
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <VerdictBox
        verdict="Confirmed, but the problem is different than expected"
        detail="The content reaches the right audience, but the visible engagement comes from non-buyers (coaches, practitioners, peers). 101,399 views over 3 months with no way to identify which came from an ICP contact is not a content problem but a visibility problem. The infrastructure needs to connect content reach to CRM intelligence so the silent buyer becomes a known contact."
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
   SECTION 8: EDITORIAL
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
      {/* Animated arc */}
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
            WHAT WE FOUND
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
    <Section>
      {/* Byline — right-aligned, ERA text badge */}
      <ScrollReveal>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 4,
                background: `${COLORS.oxide}15`,
                border: `1px solid ${COLORS.oxide}30`,
                fontFamily: FONT.body,
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: '0.2em',
                color: COLORS.oxide,
              }}
            >
              ERA
            </div>
            <div>
              <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 15, color: COLORS.charcoal }}>Assessment by Era | eracx.com</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Lead pull quote */}
      <ScrollReveal>
        <Callout color={COLORS.oxide} textColor={COLORS.charcoal}>
          This is not a firm with a marketing problem. This is a firm that has built one of the most valuable relationship assets in the consulting industry and didn't know it.
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
            $56.9 million in lifetime revenue. 79% win rate on returning clients. Thirteen organizations that account for nearly 80% of all billings. A founder whose content reaches 100,000 people a quarter. A client roster that includes some of the most recognizable names in American business. And a CEO abroad who, after hearing the founder answer six hard questions honestly, said 'just go do it' without asking for a proposal.
          </p>
          <p style={{ marginBottom: 20 }}>
            The firm doesn't win on credentials, methodologies, or marketing. It wins because when people experience what the firm does in a room, they don't want to hire anyone else. Impact begets impact.
          </p>
        </BodyWithMargin>
      </ScrollReveal>

      {/* From / To transformation */}
      <ScrollReveal>
        <TransformationTable
          rows={[
            { today: "Relationships live in partners' heads and personal networks", future: 'Relationships are visible, mapped, and enriched in the CRM' },
            { today: 'Champions leave and nobody notices', future: 'Role changes surface within 48 hours as actionable signals' },
            { today: '50 people experience the work; 3 stay in touch', future: 'Every discovery contact enters a structured nurture path' },
            { today: "The founder's content reaches 100K per quarter with no capture layer", future: 'Content engagement by ICP contacts flows into the CRM as relationship signals' },
            { today: 'Pipeline meetings ask "what deals are live?"', future: 'Relationship reviews ask "which accounts are getting warmer?"' },
            { today: 'The content-to-client story happens by accident', future: 'The content-to-client story happens by design, across thousands of contacts' },
          ]}
        />
      </ScrollReveal>

      {/* Making impact sticky */}
      <ScrollReveal>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
          Making impact sticky
        </div>
        <BodyWithMargin
          stat="~5,000"
          statLabel="Executives Touched"
          statSublabel="101 engagements x ~50 contacts"
          statColor={COLORS.teal}
        >
          <p style={{ marginBottom: 20 }}>
            If you have 101 client engagements, and each one touches roughly 50 people during discovery and delivery, you have somewhere around 5,000 executives who know what it feels like to be on the other side of Riiser's work. Some of them are still at those companies, some have moved, some are now CHROs at organizations twice the size, some are sitting in buyer seats at companies you've never heard of, but all remember their experience of the firm.
          </p>
          <p style={{ marginBottom: 20 }}>
            Today, zero of them are in a systematic nurture program. They live in the founder's memory, in the partners' phones, in email threads nobody will search, and a CRM that knows their name but not their current title, their current company, or whether they changed jobs six months ago.
          </p>
          <p>
            The 200-contact sample proved what this looks like when you actually look. [Contact 1] left Client B and is now running HR at a 13,000-employee manufacturer. [Contact 3] left Client E and is now CFO at a healthcare company. These are people who know the firm's work intimately, leading in new seats with new budgets at new companies, and nobody has reached out.
          </p>
        </BodyWithMargin>
      </ScrollReveal>

      {/* What the founder's content actually does */}
      <ScrollReveal>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
          What the founder's content actually does
        </div>
        <BodyWithMargin
          stat="21"
          statLabel="Years of Trust"
          statSublabel="Built by the founder, owned by the firm"
          statColor={COLORS.oxide}
        >
          <p style={{ marginBottom: 20 }}>
            The founder's LinkedIn presence is not a marketing channel. It's a trust engine. The reach, engagement, and overall halo it creates makes the firm synonymous with a particular kind of honest, rigorous, uncomfortable-in-the-best-way leadership consulting.
          </p>
          <p style={{ marginBottom: 20 }}>
            And the reality the partners have named openly: the founder will not be doing this forever. As such, the engine needs to respect the trust built over two decades and make it something the firm can see, measure, and maintain in the future.
          </p>
        </BodyWithMargin>
      </ScrollReveal>

      {/* Where the real leverage is */}
      <ScrollReveal>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
          Where the real leverage is
        </div>
        <BodyWithMargin
          stat="0"
          statLabel="In Nurture Today"
          statSublabel="of ~5,000 past contacts"
          statColor={COLORS.magenta}
        >
          <p style={{ marginBottom: 20 }}>
            Every firm in the consulting space is trying to solve the same problem: how do you stay relevant to buyers who aren't in-market right now but will be in 12, 18, or 36 months? Most of them try to solve it with content, campaigns, and outbound. That's a volume play. It works for firms that sell commodities.
          </p>
          <p>
            Riiser doesn't sell a commodity. It sells transformation. And transformation is bought on trust, not on a well-timed email or LinkedIn DM. The leverage is in making the relationships the firm has already built visible, maintainable, and scalable without bloating weekly schedules with tedious tasks.
          </p>
        </BodyWithMargin>
      </ScrollReveal>

      {/* The content-to-client story */}
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
            THE CONTENT-TO-CLIENT STORY
          </div>
          <div style={{ fontFamily: FONT.body, fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: COLORS.secondary }}>
            <p style={{ marginBottom: 12 }}>
              Nine years ago, an executive read an article in a major publication, describing his situation perfectly. He read the founder's book that weekend, his company offered him a coach, and he said, "I want him." That one relationship, originating from a single piece of content, became a multi-million dollar client for the firm. And when that executive moved to a new company, he brought the firm with him.
            </p>
            <p>
              The partners have stories like this too, filled with a decade of compounding value. The question is whether these happen by accident or by design. Right now, it is entirely by accident.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* System vision flow */}
      <ScrollReveal>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 18, color: COLORS.charcoal, marginTop: 32, marginBottom: 12 }}>
          If we use that story as a model:
        </div>
        <SystemFlowDiagram />
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
          statLabel="Single Engagement"
          statSublabel="From one dinner conversation"
          statColor={COLORS.sand}
        >
          <p style={{ marginBottom: 20 }}>
            The partners at Riiser have built a thriving firm with the potential to maintain that scale or leave destiny to chance. (Or an email inbox or a chance meeting in a hallway ...)
          </p>
          <p style={{ marginBottom: 20 }}>
            The goal is to create an infrastructure: not a marketing strategy or an SEO/GEO play or a campaign. Relationship infrastructure that takes the patterns that produced $56.9 million in revenue, patterns that currently live in people's heads and personal networks, and makes them visible, measurable, and repeatable.
          </p>
          <p style={{ marginBottom: 20 }}>
            The partners walked into a private dinner, answered hard questions honestly, and walked out with an invitation to build a $3-4 million engagement. The white paper they sent was gorgeous. The last page said, "We've earned your trust. We've changed your culture. Let us join you."
          </p>
          <p>
            That's the truth. And the infrastructure we build needs to make that truth available to every relationship in the system, not just the ones we happen to remember at 3 a.m.
          </p>
        </BodyWithMargin>
      </ScrollReveal>

      <ScrollReveal>
        <Callout color={COLORS.sand} textColor={COLORS.charcoal}>
          The data says this firm has been doing it right for over two decades. The opportunity is to make it sustainable for the next two.
        </Callout>
      </ScrollReveal>
    </Section>
  )
}

function SystemFlowDiagram() {
  const steps = [
    { label: 'The founder publishes an article about executive team design', color: COLORS.teal },
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
        <line x1="50%" y1="25%" x2="50%" y2="25%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4">
          <animate attributeName="x1" from="38%" to="50%" dur="0s" fill="freeze" />
        </line>
        <line x1="25%" y1="42%" x2="25%" y2="58%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="75%" y1="42%" x2="75%" y2="58%" stroke={COLORS.divider} strokeWidth="1.5" strokeDasharray="4 4" />
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
  return (
    <Section dark>
      <ScrollReveal>
        <Kicker color={COLORS.teal}>WHAT WE SHOULD BUILD</Kicker>
        <Body dark>
          <p style={{ marginBottom: 20 }}>
            <strong>Enrich every corporate contact.</strong> The 787 contacts at revenue client companies are the priority: append current title, current company, seniority, LinkedIn URL, and last role change date. This turns a flat list into a living map. Then conduct a full enrichment pull for 7,676 contacts.
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>Build champion tracking.</strong> Role changes at known contacts are the highest-intent signal in the business. When a champion moves from a client company to a new organization, that should surface within 48 hours, not whenever someone happens to remember their name.
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>Connect the founder's content to the CRM.</strong> When an ICP-matching executive engages with a post, that signal needs to flow into the CRM. Not as a vanity metric. As a relationship signal. The goal is to see who's paying attention, so that when a partner reaches out, they have context.
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>Create a post-engagement nurture system.</strong> Every person touched during discovery and delivery enters a quarterly nurture path. Not a newsletter. A warm, relevant, human-feeling touch that says "we remember you, we're still here, and we're still thinking about the kind of problems you face."
          </p>
          <p>
            <strong>Measure warmth, not pipeline.</strong> Stop measuring success by leads generated. Start measuring it by relationship depth across the top 100 accounts. How many contacts do you know? How recently have you touched them? Which accounts are getting warmer and which are cooling?
          </p>
        </Body>
      </ScrollReveal>
    </Section>
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
      color={COLORS.teal}
      id="next"
    />
  )
}

function TimelineSection() {
  return (
    <Section>
      <ScrollReveal>
        <Kicker color={COLORS.sand}>WHAT COMES NEXT</Kicker>
        <Headline color={COLORS.charcoal}>From assessment to action</Headline>
        <Body>
          <p>If we believe in the direction, here is what next steps look like leading into Q2:</p>
        </Body>
      </ScrollReveal>

      <div style={{ marginTop: 40 }}>
        <ScrollReveal>
          <TimelineItem
            label="Immediate"
            period="Next 2 weeks"
            color={COLORS.sand}
            items={[
              'Enrich the 787 contacts at revenue client companies first. Current title, current company, seniority, LinkedIn URL, last role change date.',
              'Follow immediately with the full 7,876 corporate contact enrichment. If the sample rates hold, roughly 200 actionable signals sitting in the CRM today.',
            ]}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TimelineItem
            label="Phase 2 Build"
            period="Months 1-2"
            color={COLORS.sand}
            items={[
              'Build champion tracking as a permanent capability. Role changes surface within 48 hours.',
              "Connect the founder's content to the CRM. When an ICP-matching executive engages with a LinkedIn post, that signal flows into the CRM as a relationship signal.",
              'Design the post-engagement nurture system. Engage the 50, not the 3. Quarterly nurture path for every person touched during delivery.',
            ]}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <TimelineItem
            label="Phase 2 Operating Rhythm"
            period="Month 3+"
            color={COLORS.sand}
            isLast
            items={[
              'Measure warmth, not pipeline. Shift the monthly partner meeting from "what deals are in motion" to "which relationships are getting warmer and which are cooling."',
              'Quarterly relationship health reviews. Walk through: which accounts deepened, which went cold, what did we learn, what should we change.',
            ]}
          />
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
            You've been building this firm with 1:1, thoughtful relationships for over two decades. Now is the time to scale those relationships, sustainably, for the next two decades of growth.
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
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '0.25em', marginBottom: 4 }}>ERA</div>
          <div>eracx.com</div>
        </div>
        <div style={{ textAlign: 'right', maxWidth: 400 }}>
          <div style={{ marginBottom: 4 }}>This is a sample assessment. Client details have been anonymized.</div>
          <div>To discuss how this applies to your firm, contact <span style={{ color: COLORS.oxide }}>hello@eracx.com</span></div>
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
  #h1, #h2, #h3, #h4, #h5, #editorial, #next {
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
    content: "Era | Sample Assessment | Confidential";
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

export default function SampleAssessment() {
  const [bannerDismissed, setBannerDismissed] = useState(false)

  useEffect(() => {
    loadFonts()
  }, [])

  return (
    <>
      <style>{globalStyles}</style>
      {!bannerDismissed && (
        <SampleBanner onDismiss={() => setBannerDismissed(true)} />
      )}
      <SideNav />
      <div style={{ fontFamily: FONT.body }}>
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
        <CloseSection />
      </div>
      {/* Footer */}
      <div
        style={{
          background: COLORS.bgDark,
          padding: '24px 32px',
          textAlign: 'center',
          fontFamily: FONT.body,
          fontSize: 13,
          color: 'rgba(246,245,242,0.3)',
        }}
      >
        ERA · eracx.com · Sample Assessment · Confidential
      </div>
    </>
  )
}
