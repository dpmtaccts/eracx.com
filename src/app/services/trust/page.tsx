import { Metadata } from "next";
import { generatePageMetadata, webPageJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/metadata";
import { LOOP_PROGRAMS, TRUST_FAQS } from "@/lib/content";
import ServiceDetailPage from "@/components/service-detail-page";

const program = LOOP_PROGRAMS.trust;

export const metadata: Metadata = generatePageMetadata({
  title: "Trust Loops — Convert Pipeline With Reciprocal Trust",
  description:
    "Multi-thread buying committees for 6x win rate improvement. Strategic gifting, VIP events, and pipeline velocity tracking. $9,000/mo.",
  path: "/services/trust",
});

function CommitteeSection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          The Committee of 13
        </h2>
        <p className="text-muted mb-8 leading-relaxed">
          B2B buying decisions are made by committees, not individuals. Understanding and
          engaging the full committee is the single biggest lever for improving win rates.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card text-center">
            <p className="text-3xl font-bold bg-gradient-to-r from-glow-purple to-glow-cyan bg-clip-text text-transparent">
              6.8–13
            </p>
            <p className="mt-2 text-sm text-muted">Avg. buying group size</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card text-center">
            <p className="text-3xl font-bold text-muted">4–5%</p>
            <p className="mt-2 text-sm text-muted">Single-threaded win rate</p>
          </div>
          <div className="p-6 rounded-xl border border-glow-purple/30 bg-gradient-to-b from-glow-purple/10 to-transparent text-center">
            <p className="text-3xl font-bold text-glow-purple">30%</p>
            <p className="mt-2 text-sm text-muted">Multi-threaded win rate (5+ contacts)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TrustPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              "Trust Loops — Convert Pipeline With Reciprocal Trust",
              "Era Trust Loops: multi-thread buying committees, strategic gifting, and pipeline velocity tracking to increase close rates.",
              "/services/trust"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(
              "Trust Loops Program",
              "Reciprocal trust cycles that deepen with each interaction. Signal detection, sales enablement, pipeline velocity tracking, and RevOps integration.",
              "/services/trust"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(TRUST_FAQS)) }}
      />

      <ServiceDetailPage
        {...program}
        faqs={TRUST_FAQS}
        extraSection={<CommitteeSection />}
      />
    </>
  );
}
