import { Metadata } from "next";
import { generatePageMetadata, webPageJsonLd } from "@/lib/metadata";
import { CONTACT_EMAIL } from "@/lib/content";
import ContactAnimations from "./animations";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact — Start Building Your Revenue System",
  description:
    "Get started with Era. Assessment call, program recommendation, and 30-day pilot. Contact justin@eracx.com or fill out the form.",
  path: "/contact",
});

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Era",
    description: "Get started with Era revenue systems. Assessment call, recommendation, and 30-day pilot.",
    url: "https://eracx.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Era",
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "sales",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <ContactAnimations />
    </>
  );
}
