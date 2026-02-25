import { Metadata } from "next";
import { generatePageMetadata, webPageJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/metadata";
import { LOOP_PROGRAMS, LOYALTY_FAQS } from "@/lib/content";
import ServiceDetailPage from "@/components/service-detail-page";

const program = LOOP_PROGRAMS.loyalty;

export const metadata: Metadata = generatePageMetadata({
  title: "Loyalty Loops — Maximize Revenue Through Retention",
  description:
    "70% of churn happens in the first 90 days. Orchestrated onboarding, health scoring, and advocacy programs. NRR >100% = 2x faster growth. $9,000/mo.",
  path: "/services/loyalty",
});

function RetentionMathSection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          The Math of Retention
        </h2>
        <p className="text-muted mb-8 leading-relaxed">
          Retention is the most efficient growth lever available. Expansion revenue from
          existing customers costs a fraction of new logo acquisition, and compounds
          over time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card text-center">
            <p className="text-3xl font-bold bg-gradient-to-r from-glow-rose to-glow-purple bg-clip-text text-transparent">
              5–25x
            </p>
            <p className="mt-2 text-sm text-muted">Acquisition costs more than retention</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card text-center">
            <p className="text-3xl font-bold bg-gradient-to-r from-glow-rose to-glow-cyan bg-clip-text text-transparent">
              $0.20
            </p>
            <p className="mt-2 text-sm text-muted">Per $1 expansion vs $1.16 for new logos</p>
          </div>
          <div className="p-6 rounded-xl border border-glow-rose/30 bg-gradient-to-b from-glow-rose/10 to-transparent text-center">
            <p className="text-3xl font-bold text-glow-rose">&gt;100%</p>
            <p className="mt-2 text-sm text-muted">NRR = 2x faster company growth</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LoyaltyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              "Loyalty Loops — Maximize Revenue Through Retention & Expansion",
              "Era Loyalty Loops: orchestrated onboarding, health scoring, champion management, and advocacy programs to maximize NRR.",
              "/services/loyalty"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(
              "Loyalty Loops Program",
              "Each success realized generates advocacy that feeds acquisition. Automation, engagement scoring, champion management, and expert events.",
              "/services/loyalty"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(LOYALTY_FAQS)) }}
      />

      <ServiceDetailPage
        {...program}
        faqs={LOYALTY_FAQS}
        extraSection={<RetentionMathSection />}
      />
    </>
  );
}
