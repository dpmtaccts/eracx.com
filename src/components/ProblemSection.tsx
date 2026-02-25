import { motion } from "framer-motion";

const stats = [
  { value: "97%", label: "of your market isn't buying right now. But they will be.", source: "6Sense, 2024" },
  { value: "86%", label: "of deals stall before they close. Most never recover.", source: "Forrester, 2024" },
  { value: "<5%", label: "of cold outreach gets a response. The old playbook is dead.", source: "Belkins, 2024" },
  { value: "84%", label: "of buying decisions are made before you're in the room.", source: "Forrester, 2024" },
];

export default function ProblemSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 pt-[80px] pb-[60px] md:px-10 md:pt-[100px] md:pb-[80px]">
      <div className="mx-auto max-w-6xl">
        {/* Stats first — immediately after hero */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="border-t border-[#111111]/10 pt-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="text-6xl font-black text-[#111111] md:text-8xl">
                {stat.value}
              </p>
              <p className="mt-4 text-base font-medium leading-snug text-[#111111] md:text-lg">
                {stat.label}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-[#6B6560]">
                {stat.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Problem narrative — after stats */}
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
            prospects go dark between the first meeting and the close. The issue
            isn't effort — it's that you don't have a system designed for how
            mid-market deals actually work: long cycles, multiple stakeholders,
            and buyers who've made up their mind before you get the call.
          </motion.p>
        </div>

        <motion.div
          style={{
            maxWidth: 720,
            margin: "72px auto",
            padding: "48px 0",
            borderTop: "1px solid rgba(196, 82, 42, 0.2)",
            borderBottom: "1px solid rgba(196, 82, 42, 0.2)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              fontStyle: "italic",
              color: "rgba(17, 17, 17, 0.8)",
              lineHeight: 1.5,
            }}
          >
            Does your sales team run on SOPs and a prompt garden?
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(196, 82, 42, 0.7)",
              marginTop: 16,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"; }}
          >
            If not, let's talk.
          </a>
        </motion.div>

      </div>
    </section>
  );
}
