import { motion } from "framer-motion";

const quotes = [
  {
    text: "Era is an asset to any high-growth company, impacting every aspect of revenue, marketing, and customer success.",
    name: "Lara Vandenberg",
    title: "Founder, Publicist",
    initials: "LV",
    badge: "2x qualified pipeline in 90 days",
    badgeColor: "#C8A96E",
  },
  {
    text: "For the first time, our expansion conversations were triggered by the system, not by someone remembering to follow up.",
    name: "Senior Leader",
    title: "Ecommerce Operator",
    initials: "SL",
    badge: "0 cold upsell calls",
    badgeColor: "#D4367A",
  },
];

export default function ClientEvidenceSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-[100px] md:px-10 md:py-[140px]">
      <div className="mx-auto max-w-4xl">
        {quotes.map((quote, i) => (
          <motion.div
            key={quote.name}
            className={i > 0 ? "mt-20 md:mt-24" : ""}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
          >
            {/* Large quotation mark */}
            <span
              className="block text-7xl font-black leading-none md:text-8xl"
              style={{ color: "#B85C4A" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Quote text */}
            <p className="-mt-4 max-w-3xl text-2xl font-light leading-[1.5] text-[#111111] md:text-3xl">
              {quote.text}
            </p>

            {/* Attribution */}
            <div className="mt-8 flex items-center gap-4">
              {/* Avatar circle with initials */}
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: "#6B6560" }}
              >
                {quote.initials}
              </div>
              <div>
                <p className="text-base font-semibold text-[#111111]">
                  {quote.name}
                </p>
                <p className="mt-0.5 text-sm text-[#6B6560]">
                  {quote.title}
                </p>
              </div>
            </div>

            {/* Result badge */}
            <div className="mt-5">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
                style={{ backgroundColor: quote.badgeColor }}
              >
                {quote.badge}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Problem narrative — preserved from original */}
        <div className="mt-20 md:mt-28">
          <motion.p
            className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Real Problem
          </motion.p>

          <motion.h2
            className="max-w-4xl text-3xl font-semibold leading-[1.1] text-[#111111] md:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Your team isn't the problem. Your system is.
          </motion.h2>

          <motion.p
            className="mt-8 max-w-3xl text-base leading-[1.7] text-[#3C3C3C] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            You've hired good people. You've tried the tools. But your pipeline
            still depends on whoever remembers to follow up, and your best
            prospects go dark between the first meeting and the close.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
