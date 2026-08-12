import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Bhardwaj Financial Services | India's #1 Loan Consultant",
  description: "Get your Home Loan approved in 5 days! Bhardwaj Financial Services offers the lowest interest rates starting at 6.50% across India. Zero physical branch visits required.",
  keywords: [
    "Bhardwaj Financial Services",
    "home loan consultant",
    "loan approval in 5 days",
    "lowest interest rate home loan",
    "loan agent Agra",
    "Vinita Sharma finance",
    "DSA partner banks",
    "loan against property",
    "balance transfer loan"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/",
  },
  openGraph: {
    title: "Bhardwaj Financial Services | Top Tier Mortgage Advisors",
    description: "Specializing in loans from ₹20 Lakhs to ₹1 Crore+. 100% digital processing with 7+ top banking partners.",
    url: "https://bhardwajfinance.com/",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://bhardwajfinance.com/og-image.jpg", // placeholder
        width: 1200,
        height: 630,
        alt: "Bhardwaj Financial Services",
      }
    ]
  }
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://bhardwajfinance.com/#organization",
    "name": "Bhardwaj Financial Services",
    "url": "https://bhardwajfinance.com",
    "logo": "https://bhardwajfinance.com/logo.png",
    "image": "https://bhardwajfinance.com/logo.png",
    "description": "Top-tier financial consultancy providing Home Loans, LAP, and Balance Transfers with a 5-day approval guarantee.",
    "founder": {
      "@type": "Person",
      "name": "Mrs. Vinita Sharma",
      "jobTitle": "Owner",
      "url": "https://bhardwajfinance.com/about/founder"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sanjay Place Commercial Hub",
      "addressLocality": "Agra",
      "addressRegion": "UP",
      "postalCode": "282002",
      "addressCountry": "IN"
    },
    "telephone": "+91-9999999999",
    "email": "info@bhardwajfinance.com",
    "areaServed": ["Agra", "Mathura", "Noida", "Gurgaon", "Mumbai", "Bangalore", "Jaipur", "Pan India"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Financial Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FinancialProduct",
            "name": "Home Loan",
            "description": "Fresh purchase or construction loans with lowest interest rates."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FinancialProduct",
            "name": "Loan Against Property",
            "description": "High-value cash by mortgaging property."
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
