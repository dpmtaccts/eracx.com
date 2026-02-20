import { motion } from "framer-motion";
import LoopDiagram from "./LoopDiagram";

interface CaseStudyQuote {
  text: string;
  name: string;
  title: string;
  photo?: string;
}

interface CaseStudy {
  client: string;
  clientLogo?: string;
  loopTag: string;
  headline: string;
  body: string;
  quote: CaseStudyQuote;
  metricValue: string;
  metricLabel: string;
}

interface LoopDetailProps {
  id: string;
  loopNumber: string;
  loopColor: string;
  diagramLabels: [string, string, string];
  variant: "dark" | "light";
  purposeLine: string;
  question: string;
  label: string;
  headline: string;
  body: string;
  mechanics: string[];
  caseStudy: CaseStudy;
}

export default function LoopDetailSection({
  id,
  loopNumber,
  loopColor,
  diagramLabels,
  variant,
  purposeLine,
  question,
  label,
  headline,
  body,
  mechanics,
  caseStudy,
}: LoopDetailProps) {
  const isDark = variant === "dark";
  const bg = isDark ? "bg-[#111111]" : "bg-[#F5F0E8]";
  const headingColor = isDark ? "text-[#F5F0E8]" : "text-[#111111]";
  const bodyColor = isDark ? "text-[#F5F0E8]/60" : "text-[#3C3C3C]";
  const mutedColor = isDark ? "text-[#F5F0E8]/30" : "text-[#6B6560]";
  const borderColor = isDark ? "border-[#F5F0E8]/10" : "border-[#111111]/10";

  return (
    <section id={id} className={`${bg} relative overflow-hidden px-6 py-[120px] md:px-10 md:py-[180px]`}>
      {/* Faint loop number watermark */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-black text-[20rem] leading-none md:text-[32rem] lg:text-[40rem]"
        aria-hidden="true"
        style={{ right: '-2%', color: loopColor, opacity: 0.05 }}
      >
        {loopNumber}
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* A) Loop identifier */}
        <motion.p
          className="mb-4 text-[11px] uppercase tracking-[0.2em]"
          style={{ color: loopColor }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {label}
        </motion.p>

        {/* B) Purpose line — dominant visual */}
        <motion.h2
          className={`text-4xl font-black leading-[0.95] ${headingColor} md:text-6xl lg:text-7xl`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          {purposeLine}
        </motion.h2>

        {/* C) Central question — reader prompt */}
        <motion.p
          className={`mt-6 max-w-2xl text-[22px] font-light italic leading-[1.4] ${isDark ? "text-[#F5F0E8]/65" : "text-[#111111]/65"}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {question}
        </motion.p>

        {/* Content area: headline + body + diagram */}
        <div className="mt-20 md:mt-28">
          {/* Loop diagram — mobile: centered */}
          <motion.div
            className="mb-10 flex justify-center md:hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <LoopDiagram
              loopColor={loopColor}
              loopNumber={loopNumber}
              labels={diagramLabels}
              variant={variant}
            />
          </motion.div>

          <div className="flex items-start justify-between gap-12">
            <div className="flex-1">
              {/* D) Section headline */}
              <motion.h3
                className={`max-w-4xl text-3xl font-semibold leading-[1.1] ${headingColor} md:text-5xl`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                {headline}
              </motion.h3>

              <motion.p
                className={`mt-8 max-w-3xl text-base leading-[1.7] ${bodyColor} md:text-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {body}
              </motion.p>
            </div>

            {/* Loop diagram — desktop */}
            <motion.div
              className="hidden flex-shrink-0 p-6 md:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <LoopDiagram
                loopColor={loopColor}
                loopNumber={loopNumber}
                labels={diagramLabels}
                variant={variant}
              />
            </motion.div>
          </div>
        </div>

        {/* Two-column: mechanics + case study */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-[55fr_45fr] md:gap-12">
          {/* Left — mechanics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-8 text-[11px] uppercase tracking-[0.2em]"
              style={{ color: loopColor }}
            >
              How It Runs
            </p>
            <ul className="space-y-5">
              {mechanics.map((item, i) => (
                <li key={i} className={`flex items-start gap-3 ${bodyColor}`}>
                  <span className={`mt-0.5 flex-shrink-0 text-sm ${mutedColor}`}>–</span>
                  <span className="text-base leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — case study card */}
          <motion.div
            className="border-l-2 bg-[#111111] px-8 py-10 md:px-10 md:py-12"
            style={{ borderLeftColor: loopColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.2em]" style={{ color: loopColor }}>
                  Client Result, {caseStudy.client}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/40">
                  {caseStudy.loopTag}
                </p>
              </div>
              {caseStudy.clientLogo && (
                <img
                  src={caseStudy.clientLogo}
                  alt={caseStudy.client}
                  className="h-6 w-auto flex-shrink-0 opacity-60"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}
            </div>

            <h3 className="text-2xl font-semibold leading-[1.1] text-[#F5F0E8] md:text-3xl">
              {caseStudy.headline}
            </h3>

            <p className="mt-6 text-base leading-[1.7] text-[#F5F0E8]/50">
              {caseStudy.body}
            </p>

            {/* Quote block */}
            <div className="mt-4">
              <div className="h-px w-full bg-[#F5F0E8]/15" />
              <div className="pt-6">
                <span
                  className="block text-5xl font-black leading-none"
                  style={{ color: loopColor }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="-mt-4 text-[15px] italic leading-[1.6] text-[#F5F0E8]">
                  {caseStudy.quote.text}
                </p>
                <div className="mt-4 h-px w-full bg-[#F5F0E8]/15" />
                <div className="mt-4 flex items-center gap-4">
                  {caseStudy.quote.photo && (
                    <img
                      src={caseStudy.quote.photo}
                      alt={caseStudy.quote.name}
                      className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-[14px] text-[#F5F0E8]">
                      {caseStudy.quote.name}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#F5F0E8]/60">
                      {caseStudy.quote.title}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/60">
                      {caseStudy.client}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric callout */}
            <div className={`mt-6 border-t ${borderColor} pt-8`}>
              <p className="text-5xl font-black md:text-6xl" style={{ color: loopColor }}>
                {caseStudy.metricValue}
              </p>
              <p className="mt-3 text-sm text-[#F5F0E8]/40">
                {caseStudy.metricLabel}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
