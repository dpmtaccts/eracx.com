import type { Metadata } from "next";

const SITE_URL = "https://eracx.com";
const SITE_NAME = "Era";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface PageMeta {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>[];
}

export function generatePageMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Era",
    url: SITE_URL,
    logo: `${SITE_URL}/erafull.png`,
    description:
      "Era designs, installs, and operates revenue systems for B2B companies. Modular loop programs replace ad-hoc growth teams with compounding relationship infrastructure.",
    founder: {
      "@type": "Person",
      name: "Justin Marshall",
      jobTitle: "Founder",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "justin@eracx.com",
      contactType: "sales",
      url: `${SITE_URL}/contact`,
    },
    areaServed: ["US", "GB", "CA", "AU"],
    knowsAbout: [
      "Revenue Operations",
      "B2B Sales",
      "Account-Based Marketing",
      "Customer Retention",
      "Growth Systems",
      "Signal-Based Outreach",
      "RevOps Automation",
    ],
  };
}

export function webPageJsonLd(headline: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline,
    description,
    url: `${SITE_URL}${path}`,
    publisher: {
      "@type": "Organization",
      name: "Era",
      url: SITE_URL,
    },
  };
}

export function serviceJsonLd(
  name: string,
  description: string,
  path: string,
  price: string = "9000"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "Organization",
      name: "Era",
      url: SITE_URL,
    },
    areaServed: ["US", "GB", "CA", "AU"],
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
