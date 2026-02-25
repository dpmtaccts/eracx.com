import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eracx.com";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/connection`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/trust`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/loyalty`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
