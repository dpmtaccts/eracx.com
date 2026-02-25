import { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata, webPageJsonLd, faqJsonLd } from "@/lib/metadata";
import { LOOP_PROGRAMS, SERVICES_FAQS } from "@/lib/content";
import ServiceCard from "@/components/service-card";
import FAQSection from "@/components/faq-section";
import CTASection from "@/components/cta-section";
import ServicesAnimations from "./animations";

export const metadata: Metadata = generatePageMetadata({
  title: "Loop Programs — Revenue System Services",
  description:
    "Three modular loop programs that replace ad-hoc growth teams: Connection Loops, Trust Loops, and Loyalty Loops. $9,000/mo each.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              "Era Loop Programs — Revenue System Services",
              "Three modular loop programs that replace ad-hoc growth teams with compounding infrastructure: Connection, Trust, and Loyalty.",
              "/services"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(SERVICES_FAQS)) }}
      />

      <ServicesAnimations />

      <FAQSection faqs={SERVICES_FAQS} />
      <CTASection />
    </>
  );
}
