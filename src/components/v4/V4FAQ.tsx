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
      "Buyers are buried in generic sequences, and spam filters are better than they were. Sending more mail does not fix that. Timing does. Signal-based pipeline watches for job changes, funding, hiring bursts, and tech installs, then starts outreach when the signal fires. ERA builds these systems for mid-market B2B companies and runs them with your team.",
  },
  {
    question: 'Why do deals stall before they close?',
    answer:
      "Usually you are talking to one person in a buying committee of many. ERA's Trust Loop works the champions, economic buyers, and influencers together. When a deal goes quiet, the system notices and reaches back out.",
  },
  {
    question: 'How long does it take to build a pipeline from scratch?',
    answer:
      'Most customers see first results in months three and four. The first two months are infrastructure: signal setup, trigger logic, sequences, CRM. Outreach can go live by week three. Month ten should look different from month four because the loop has more signal history to work with.',
  },
  {
    question: 'What is the difference between a campaign and a loop?',
    answer:
      'A campaign fires once and you measure after. A loop keeps running and updates when new signals arrive. A campaign ends when the budget ends. A loop does not; it gets more accurate as it runs.',
  },
  {
    question: 'What does ERA actually build and run?',
    answer:
      "ERA sits between your market and your sellers. We catch buying signals across your accounts, send the right play to the right person when the timing is real, and run the loop with your team every week. Sellers walk into conversations that have been warming for weeks.",
  },
]

export function V4FAQ({ phase = '▸08 · FAQ' }: { phase?: string } = {}) {
  return (
    <section className="v4-section v4-section--faq" id="faq">
      <V4Header
        phase={phase}
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
          <a
            href="https://www.linkedin.com/company/eracx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
