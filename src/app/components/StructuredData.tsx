"use client";

import Script from "next/script";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    name: "Capiau",
    url: "https://capiau.org",
    logo: "https://capiau.org/og-image.jpg",
    description:
      "The results-driven, social-first agency you've been looking for. Elite thinkers specializing in growth, influencer marketing, and digital marketing.",
    email: "team@capiau.org",
    areaServed: "World",
    serviceType: ["Growth Marketing", "Influencer Marketing", "Digital Marketing", "Social Media Marketing"],
    sameAs: [
      // Adicione URLs de redes sociais quando disponíveis
      // "https://twitter.com/capiau",
      // "https://linkedin.com/company/capiau",
      // "https://instagram.com/capiau",
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

