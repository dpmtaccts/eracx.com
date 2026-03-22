import { motion } from "framer-motion";
import SignalIndicator from "./SignalIndicator";

interface Signal {
  title: string;
  description: string;
}

interface Column {
  header: string;
  subtitle: string;
  color: string;
  signals: Signal[];
}

const columns: Column[] = [
  {
    header: "Connection Loop",
    subtitle: "Signals that identify the right moment to initiate",
    color: "#C8A96E",
    signals: [
      { title: "Job Change — Target Contact", description: "Contact at a prospect account changes roles — high-intent window, new budget authority" },
      { title: "New Executive Hire", description: "New VP or C-suite joins a target account — 90-day window before priorities lock in" },
      { title: "Funding Event", description: "Series A/B/C or strategic investment — growth mode triggers new infrastructure spend" },
      { title: "Hiring Signal", description: "Job postings in sales, marketing, or RevOps indicate GTM investment and pain" },
      { title: "Tech Install / Uninstall", description: "Target adopts or drops a tool in your category — active evaluation window" },
      { title: "Web Intent Signal", description: "Account visits pricing, comparison, or solution pages — invisible buying signal" },
      { title: "ICP Account Goes Quiet (60 days)", description: "No touchpoint in 60 days — CRM flags for re-engagement before the relationship cools" },
    ],
  },
  {
    header: "Trust Loop",
    subtitle: "Signals that guide the buying process",
    color: "#2BBFAA",
    signals: [
      { title: "Deal Stall — 30 Days", description: "Opportunity stagnant for 30 days — triggers re-engagement and stakeholder check-in" },
      { title: "Champion Role Change", description: "Internal advocate changes title or team — buying process at risk, needs fast response" },
      { title: "Email Open / Click Pattern", description: "Repeated opens or clicks on specific content — signals topic relevance and interest level" },
      { title: "Multi-stakeholder Engagement", description: "Multiple contacts from same account engage — signals active internal evaluation" },
      { title: "Proposal Viewed — No Response", description: "Deck or proposal opened multiple times without reply — timing or objection signal" },
      { title: "Content Download", description: "Specific asset downloaded — intent signal mapped to buying stage and message track" },
    ],
  },
  {
    header: "Loyalty Loop",
    subtitle: "Signals that drive expansion and retention",
    color: "#D4367A",
    signals: [
      { title: "90-Day Post-Close", description: "Standard expansion window — relationship is warm, ROI is forming, ask is timely" },
      { title: "Customer Job Change", description: "Existing champion moves to new company — highest-conversion new logo opportunity" },
      { title: "Renewal — 90 Days Out", description: "Automated renewal signal triggers value review, risk assessment, and upsell conversation" },
      { title: "Team Growth at Customer Account", description: "Headcount increase signals expanded use case and licensing opportunity" },
      { title: "Low Engagement Post-Onboarding", description: "Product or service underutilization — churn risk signal, triggers proactive outreach" },
      { title: "Referral Trigger — 6 Month Mark", description: "Satisfaction window — structured referral ask built into the relationship loop" },
    ],
  },
];

// Map of signal titles that get an indicator, with their SVG type
const signalIndicators: Record<string, "job-change" | "deal-stall" | "funding" | "post-close"> = {
  "Job Change — Target Contact": "job-change",
  "Funding Event": "funding",
  "Deal Stall — 30 Days": "deal-stall",
  "Champion Role Change": "deal-stall",
  "90-Day Post-Close": "post-close",
  "Customer Job Change": "job-change",
};

export default function SignalLibrarySection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-[120px] md:px-10 md:py-[180px]">
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Signal Library
        </motion.p>

        <motion.h2
          className="mb-20 max-w-4xl text-3xl font-semibold leading-[1.1] text-[#111111] md:mb-28 md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Every signal triggers a connection moment in a loop.
        </motion.h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {columns.map((col, i) => (
            <motion.div
              key={col.header}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="border-t-2 border-[#111111] pb-5 pt-5">
                <h3 className="text-base font-semibold text-[#111111]">
                  {col.header}
                </h3>
                <p className="mt-1 text-sm text-[#6B6560]">
                  {col.subtitle}
                </p>
              </div>

              <div className="divide-y divide-[#111111]/8">
                {col.signals.map((signal) => {
                  const indicatorType = signalIndicators[signal.title];
                  return (
                    <div key={signal.title} className="relative py-5">
                      {indicatorType && (
                        <div className="absolute right-0 top-5">
                          <SignalIndicator type={indicatorType} color={col.color} />
                        </div>
                      )}
                      <h4 className={`text-sm font-semibold text-[#111111] ${indicatorType ? 'pr-16 md:pr-20' : ''}`}>
                        {signal.title}
                      </h4>
                      <p className={`mt-1.5 text-sm leading-[1.6] text-[#6B6560] ${indicatorType ? 'pr-16 md:pr-20' : ''}`}>
                        {signal.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
