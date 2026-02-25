import { Metadata } from "next";
import { generatePageMetadata, webPageJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/metadata";
import { LOOP_PROGRAMS, CONNECTION_FAQS } from "@/lib/content";
import ServiceDetailPage from "@/components/service-detail-page";

const program = LOOP_PROGRAMS.connection;

export const metadata: Metadata = generatePageMetadata({
  title: "Connection Loops — Signal-Based Pipeline Generation",
  description:
    "Signal-based targeting that creates self-reinforcing connection cycles. Multi-channel orchestration with 287% higher response rates. $9,000/mo.",
  path: "/services/connection",
});

export default function ConnectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              "Connection Loops — Signal-Based Pipeline Generation",
              "Era Connection Loops: signal-based outreach, multi-channel orchestration, and intent tracking to build predictable pipeline.",
              "/services/connection"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(
              "Connection Loops Program",
              "Signal-based targeting that creates self-reinforcing connection cycles. Includes surround strategy, list building, multi-channel orchestration, and signal monitoring.",
              "/services/connection"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(CONNECTION_FAQS)) }}
      />

      <ServiceDetailPage
        {...program}
        faqs={CONNECTION_FAQS}
      />
    </>
  );
}
