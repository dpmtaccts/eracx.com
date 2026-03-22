import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ToolsLogoBar from "./ToolsLogoBar";

const rows = [
  ["Fires once", "Runs continuously"],
  ["Performance reviewed after the fact", "Every signal updates the next move"],
  ["Data sits in a dashboard", "Data triggers the next action"],
  ["Next step: pick who to blame", "Next step: automatic"],
  ["Resets every quarter", "Compounds every cycle"],
  ["Depends on timing being right", "Builds presence until timing arrives"],
];

export default function LoopsVsCampaignsSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#111111] px-6 py-[120px] md:px-10 md:py-[180px]">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="text-4xl font-black leading-[0.92] text-[#F5F0E8] md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Era is built on loops. Not campaigns.
        </motion.h2>

        <motion.p
          className="mt-6 max-w-2xl text-base text-[#F5F0E8]/50 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A campaign fires once. A loop learns every time it runs.
        </motion.p>

        {/* Contrast list */}
        <div ref={listRef} className="mx-auto mt-20 max-w-[900px] md:mt-28">
          {/* Column headers */}
          <div className="relative flex items-end pb-6">
            {/* Desktop headers */}
            <div className="hidden w-full md:flex">
              <div className="w-[40%] pr-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#C4522A]">
                  The Campaign
                </p>
              </div>
              <div className="w-[20%]" />
              <div className="w-[40%] pl-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#C4522A]">
                  The Loop
                </p>
              </div>
            </div>
            {/* Mobile headers */}
            <div className="flex w-full justify-between md:hidden">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#C4522A]">
                The Campaign
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#C4522A]">
                The Loop
              </p>
            </div>
          </div>

          {/* Rows */}
          <div className="relative">
            {/* Vertical center rule — desktop only */}
            <div
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
              style={{ backgroundColor: "rgba(245, 240, 232, 0.15)" }}
            />

            {rows.map(([campaign, loop], i) => {
              const rowDelay = i * 0.18;
              const ruleDelay = rowDelay;
              const campaignDelay = rowDelay + 0.05;
              const loopDelay = campaignDelay + 0.12;

              return (
                <div key={i}>
                  {/* Horizontal rule */}
                  <div
                    className="h-px w-full"
                    style={{
                      backgroundColor: "rgba(245, 240, 232, 0.08)",
                      opacity: revealed ? 1 : 0,
                      transition: `opacity 0.15s ease-out ${ruleDelay}s`,
                    }}
                  />

                  {/* Desktop row */}
                  <div className="hidden h-16 items-center md:flex">
                    <div className="w-[40%] pr-8">
                      <p
                        className="text-lg text-[#F5F0E8]/45"
                        style={{
                          opacity: revealed ? 0.45 : 0,
                          transform: revealed ? "translateY(0)" : "translateY(8px)",
                          transition: `opacity 0.2s ease-out ${campaignDelay}s, transform 0.2s ease-out ${campaignDelay}s`,
                        }}
                      >
                        {campaign}
                      </p>
                    </div>
                    <div className="w-[20%]" />
                    <div className="w-[40%] pl-8">
                      <p
                        className="text-lg text-[#F5F0E8]"
                        style={{
                          opacity: revealed ? 1 : 0,
                          transform: revealed ? "translateY(0)" : "translateY(8px)",
                          transition: `opacity 0.2s ease-out ${loopDelay}s, transform 0.2s ease-out ${loopDelay}s`,
                        }}
                      >
                        {loop}
                      </p>
                    </div>
                  </div>

                  {/* Mobile row */}
                  <div className="flex flex-col py-5 md:hidden">
                    <p
                      className="text-[15px] text-[#F5F0E8]/40"
                      style={{
                        opacity: revealed ? 0.4 : 0,
                        transform: revealed ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 0.2s ease-out ${campaignDelay}s, transform 0.2s ease-out ${campaignDelay}s`,
                      }}
                    >
                      {campaign}
                    </p>
                    <p
                      className="mt-2 text-[15px] text-[#F5F0E8]"
                      style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 0.2s ease-out ${loopDelay}s, transform 0.2s ease-out ${loopDelay}s`,
                      }}
                    >
                      {loop}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Bottom rule */}
            <div
              className="h-px w-full"
              style={{
                backgroundColor: "rgba(245, 240, 232, 0.08)",
                opacity: revealed ? 1 : 0,
                transition: `opacity 0.15s ease-out ${rows.length * 0.18}s`,
              }}
            />
          </div>
        </div>

        {/* Tools logo bar */}
        <div className="mt-20 md:mt-28">
          <ToolsLogoBar />
        </div>
      </div>
    </section>
  );
}
