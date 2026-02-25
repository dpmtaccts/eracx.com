import { Metadata } from "next";
import { generatePageMetadata, webPageJsonLd, faqJsonLd } from "@/lib/metadata";
import { HOME_FAQS } from "@/lib/content";
import EraExperience from "@/components/era-experience";
import ResultsGrid from "@/components/results-grid";
import CostComparison from "@/components/cost-comparison";
import FAQSection from "@/components/faq-section";
import CTASection from "@/components/cta-section";

export const metadata: Metadata = generatePageMetadata({
  title: "Revenue Systems for B2B Growth — Era",
  description:
    "Era designs, installs, and operates revenue systems. Three loop programs replace ad-hoc growth teams with compounding relationship infrastructure.",
  path: "/",
});

export default function HomePage() {
  const pageJsonLd = webPageJsonLd(
    "Era — Revenue Systems for B2B Growth",
    "Era designs, installs, and operates revenue systems. Modular loop programs that compound relationship infrastructure for B2B companies.",
    "/"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQS)) }}
      />

      {/* ── Scrollytelling Experience (Hero → Stats → Loops → Model Shift) ── */}
      <EraExperience />

      {/* ── Client Results ── */}
      <ResultsGrid />

      {/* ── The Efficiency Advantage ── */}
      <CostComparison />

      {/* ── FAQ ── */}
      <FAQSection faqs={HOME_FAQS} />

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
