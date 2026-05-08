/**
 * V4FAQ — §08 of v4 marketing site.
 *
 * White-ground section with 7 FAQs always visible. No accordion. No
 * expand/collapse. Bloomberg / NYT magazine FAQ treatment — static
 * Q&A list with strong typography hierarchy.
 *
 * Content ported from index.html JSON-LD FAQPage structured data
 * (the same FAQ content powers SEO and the on-page section). Three
 * voice corrections applied: Era → ERA, client → customer, em dashes
 * removed.
 *
 * If we change FAQ content here, also update the JSON-LD in
 * index.html so SEO data and on-page content stay in sync.
 */

import { V4Header } from './V4Header'

interface FAQ {
  question: string
  answer: string
}

const FAQS: FAQ[] = [
  {
    question: "Why isn't outbound working anymore?",
    answer:
      "Buyers are drowning in generic sequences while spam filters get smarter. The volume game worked when competition was lower, and it doesn't work in 2026. The fix isn't more outreach, it's better timing. Signal-based pipeline monitors behavioral triggers like job changes, funding events, hiring bursts, and tech installs. When a signal fires, the outreach goes out at the moment of relevance, not by accident. ERA builds these systems for mid-market B2B companies and runs them continuously.",
  },
  {
    question: 'Why do deals stall before they close?',
    answer:
      "The most common reason: you're talking to one person in a buying committee of thirteen. ERA's Trust Loop builds multi-threaded presence across champions, economic buyers, and influencers simultaneously. When deals stall, the system detects silence and re-engages automatically.",
  },
  {
    question: 'How long does it take to build a pipeline from scratch?',
    answer:
      'Most customers see first results in months three and four. The first two months are infrastructure: signal architecture, trigger logic, sequence writing, CRM integration. Outreach goes live by week three. The system compounds over time. Month ten looks structurally different from month four.',
  },
  {
    question: 'What is the difference between a campaign and a loop?',
    answer:
      'A campaign fires once and measures results after the fact. A loop runs continuously and updates itself with every new signal. A campaign ends when the budget runs out. A loop has no end state. It becomes more accurate over time and compounds value across every cycle.',
  },
  {
    question: 'What does ERA actually build and run?',
    answer:
      "ERA runs the operating layer between your market and your sellers. We capture buying signals across your accounts, route the right plays to the right buyer at the right moment, and run the loop with your team every week. Your sellers walk into conversations that started warming weeks before they arrived.",
  },
]

export function V4FAQ() {
  return (
    <section className="v4-section v4-section--faq" id="faq">
      <V4Header
        phase="▸08 · FAQ"
        meta={['WORTH ASKING', 'BEFORE YOU TALK TO US']}
      />

      <div className="v4-faq">
        <div className="v4-faq__header">
          <h2 className="v4-faq__display">
            Worth<br /><em>asking</em>.
          </h2>
          <p className="v4-faq__lede">
            These are the questions readers actually ask, answered
            directly. If yours isn't here, send it.
          </p>
        </div>

        <div className="v4-faq-list">
          {FAQS.map((faq, i) => (
            <article key={faq.question} className="v4-faq-item">
              <div className="v4-faq-item__num">Q{i + 1}</div>
              <h3 className="v4-faq-item__question">{faq.question}</h3>
              <div className="v4-faq-item__rule" aria-hidden="true" />
              <p className="v4-faq-item__answer">{faq.answer}</p>
            </article>
          ))}
        </div>

        <div className="v4-faq__cta">
          More questions?{' '}
          <a href="mailto:hello@eracx.com">hello@eracx.com</a>
        </div>
      </div>
    </section>
  )
}
