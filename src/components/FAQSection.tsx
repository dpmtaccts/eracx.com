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
    answer: "Usually you are talking to one person in a buying committee of many. Era's Trust Loop works the champions, economic buyers, and influencers together. When a deal goes quiet, the system notices and reaches back out.",
  },
  {
    question: "How long does it take to build a pipeline from scratch?",
    answer: "Most clients see first results in months three and four. The first two months are infrastructure: signal setup, trigger logic, sequences, CRM. Outreach can go live by week three. Month ten should look different from month four because the loop has more signal history to work with.",
  },
  {
    question: "What is the difference between a campaign and a loop?",
    answer: "A campaign fires once and you measure after. A loop keeps running and updates when new signals arrive. A campaign ends when the budget ends. A loop does not; it gets more accurate as it runs.",
  },
  {
    question: "What does Era actually build and run?",
    answer: "Era designs, installs, and operates GTM systems for mid-market B2B companies — typically 100 to 300 employees with $15M or more in revenue. We build three types of loops: a Connection Loop for signal-based pipeline generation, a Trust Loop for buying committee engagement, and a Loyalty Loop for post-close expansion and referral.",
  },
  {
    question: "Why isn't outbound working anymore?",
    answer: "Buyers are buried in generic sequences, and spam filters are better than they were. Sending more mail does not fix that. Timing does. Signal-based pipeline watches for job changes, funding, hiring bursts, and tech installs, then starts outreach when the signal fires. Era builds these systems for mid-market B2B companies and runs them with your team.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white px-6 py-[120px] md:px-10 md:py-[120px]">
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
          className="mb-16 text-[32px] font-black leading-[1.1] text-[#1A1A1A]"
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
              <div className="mb-12 h-px w-full bg-[#1A1A1A]/10" />
            )}
            <h3
              className="mb-3 text-[18px] font-semibold text-[#1A1A1A]"
            >
              {faq.question}
            </h3>
            <p
              className="mb-12 text-[16px] leading-[1.7] text-[#1A1A1A]/70"
            >
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
