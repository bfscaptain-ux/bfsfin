import React from "react";

type JsonLdProps = {
  type: string;
  data: Record<string, any>;
};

/**
 * AI-SEO Component for injecting JSON-LD schema into the head of the page.
 * Crucial for Answer Engine Optimization (AEO) and LLM Optimization (LLMO).
 */
export default function JsonLd({ type, data }: JsonLdProps) {
  // Always ensure @context and @type are present
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
