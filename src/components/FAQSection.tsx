import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I build a pipeline when my outbound isn't working?",
    answer: "Most outbound fails because it targets the wrong window. Signal-based pipeline works differently — instead of broadcasting to a static list, you monitor behavioral triggers like job changes, funding events, hiring bursts, and tech installs. When a signal fires, an outreach sequence launches automatically. Era builds these systems for mid-market B2B companies and runs them continuously.",
  },
  {
    question: "How do tools like Clay fit into a GTM system?",
    answer: "Clay is a data enrichment and automation platform that connects signals from dozens of sources and routes them into outreach sequences. Era uses Clay as part of a broader infrastructure that includes Apollo for sequencing, intent data for buying signals, and CRM integration so every touchpoint writes back to the account record.",
  },
  {
    question: "Why do deals stall before they close?",
    answer: "The most common reason: you're talking to one person in a buying committee of thirteen. Era's Trust Loop builds multi-threaded presence across champions, economic buyers, and influencers simultaneously. When deals stall, the system detects silence and re-engages automatically.",
  },
  {
    question: "How long does it take to build a pipeline from scratch?",
    answer: "Most clients see first results in months three and four. The first two months are infrastructure: signal architecture, trigger logic, sequence writing, CRM integration. Outreach goes live by week three. The system compounds over time — month ten looks structurally different from month four.",
  },
  {
    question: "What is the difference between a campaign and a loop?",
    answer: "A campaign fires once and measures results after the fact. A loop runs continuously and updates itself with every new signal. A campaign ends when the budget runs out. A loop has no end state — it becomes more accurate over time and compounds value across every cycle.",
  },
  {
    question: "What does Era actually build and run?",
    answer: "Era designs, installs, and operates GTM systems for mid-market B2B companies — typically 100 to 300 employees with $15M or more in revenue. We build three types of loops: a Connection Loop for signal-based pipeline generation, a Trust Loop for buying committee engagement, and a Loyalty Loop for post-close expansion and referral.",
  },
  {
    question: "Why isn't outbound working anymore?",
    answer: "Buyers are drowning in generic sequences. Spam filters are smarter. The volume game worked when competition was lower — it doesn't work in 2026. Signal-based outreach intercepts buyers at the moment of relevance. A prospect who just hired a VP of Sales or closed a Series B is in a fundamentally different state. Volume-based outreach hopes to catch them at the right time by accident.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-[#111111] px-6 py-[120px] md:px-10 md:py-[120px]">
      <div className="mx-auto max-w-[760px]">
        <motion.p
          className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Common Questions
        </motion.p>

        <motion.h2
          className="mb-16 text-[32px] font-black leading-[1.1] text-[#F5F0E8]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The questions we get asked most.
        </motion.h2>

        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {i > 0 && (
              <div className="mb-12 h-px w-full bg-[#F5F0E8]/10" />
            )}
            <h3
              className="mb-3 text-[18px] font-semibold text-[#F5F0E8]"
            >
              {faq.question}
            </h3>
            <p
              className="mb-12 text-[16px] leading-[1.7] text-[#F5F0E8]/70"
            >
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
