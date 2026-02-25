import { Metadata } from "next";
import { generatePageMetadata, webPageJsonLd } from "@/lib/metadata";
import { TEAM, IDEAL_PARTNER } from "@/lib/content";
import CTASection from "@/components/cta-section";
import AboutAnimations from "./animations";

export const metadata: Metadata = generatePageMetadata({
  title: "About Era — Revenue Systems Built on Relationships",
  description:
    "Era builds revenue systems for B2B companies in the messy middle. Founded by Justin Marshall with experience at Microsoft, Amazon, P&G, Intel, and T-Mobile.",
  path: "/about",
});

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: TEAM.founder.name,
    jobTitle: TEAM.founder.title,
    worksFor: { "@type": "Organization", name: "Era", url: "https://eracx.com" },
    knowsAbout: [
      "Revenue Operations",
      "B2B Growth Strategy",
      "Go-to-Market",
      "Account-Based Marketing",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd(
              "About Era — Revenue Systems Built on Relationship Infrastructure",
              "Era builds revenue systems for B2B companies. Founded by Justin Marshall with decades of enterprise experience.",
              "/about"
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <AboutAnimations />

      <CTASection
        heading="Ready to build your revenue system?"
        description="Start with an assessment call to understand your current state and goals."
      />
    </>
  );
}
