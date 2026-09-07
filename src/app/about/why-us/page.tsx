import { Metadata } from "next";
import WhyUsClient from "./WhyUsClient";

export const metadata: Metadata = {
  title: "Why Choose Us | Loans @ 7.15%*, Insurance & Credit Cards | Bhardwaj Financial Services",
  description: "Discover why 10,000+ clients trust Bhardwaj Financial Services (BFS) across Agra and India. Express 5-day loan approvals from 7.15%* ROI, 100% Cashless Health Insurance with free claim settlement support, and Lifetime-Free Credit Cards with zero hidden fees.",
  keywords: [
    "why choose bhardwaj financial services",
    "best loan consultant in Agra",
    "cashless health insurance agra",
    "free claim settlement assistance",
    "lifetime free credit card agra",
    "home loan 7.15 agra",
    "DSA approved finance agra sanjay place",
    "mortgage broker in Delhi NCR",
    "home loan agent in Mathura",
    "home loan agent in Noida",
    "home loan agent in Gurgaon",
    "home loan agent in Mumbai",
    "home loan agent in Bangalore",
    "home loan agent in Jaipur"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/about/why-us",
  },
  openGraph: {
    title: "Why Choose Us - The Most Transparent Financial Hub in India",
    description: "Break down financial barriers with BFS. Access lowest interest Home Loans from 7.15%*, 100% Cashless Insurance, and Lifetime-Free Credit Cards under one roof.",
    url: "https://bhardwajfinance.com/about/why-us",
    siteName: "Bhardwaj Financial Services",
    images: [
      {
        url: "/og-why-us.jpg",
        width: 1200,
        height: 630,
        alt: "Why Choose Bhardwaj Financial Services",
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function WhyChooseUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bhardwajfinance.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About Us",
            "item": "https://bhardwajfinance.com/about"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Why Choose Us",
            "item": "https://bhardwajfinance.com/about/why-us"
          }
        ]
      },
      {
        "@type": "FinancialService",
        "@id": "https://bhardwajfinance.com/#organization",
        "name": "Bhardwaj Financial Services",
        "description": "Authorized institutional financial distribution partner across 50+ leading lending pools, specializing in transparent Home Loans from 7.15%* ROI, 100% Cashless Insurance with free claim support, and Lifetime-Free Credit Cards.",
        "url": "https://bhardwajfinance.com",
        "logo": "https://bhardwajfinance.com/logo.png",
        "foundingDate": "2010",
        "founder": {
          "@type": "Person",
          "name": "Adv. Praveen Bhardwaj"
        },
        "areaServed": [
          { "@type": "City", "name": "Agra" },
          { "@type": "City", "name": "Mathura" },
          { "@type": "City", "name": "Firozabad" },
          { "@type": "City", "name": "Noida" },
          { "@type": "City", "name": "Gurgaon" },
          { "@type": "City", "name": "Delhi NCR" },
          { "@type": "City", "name": "Mumbai" },
          { "@type": "City", "name": "Bangalore" },
          { "@type": "City", "name": "Jaipur" }
        ],
        "knowsAbout": [
          "Home Loans from 7.15% ROI",
          "Express 5-Day Loan Sanctions",
          "Cashless Health Insurance",
          "Term Life Insurance",
          "Free Insurance Claim Settlement Assistance",
          "Lifetime Free Credit Cards",
          "Airport Lounge Credit Cards",
          "CIBIL Improvement Strategies"
        ],
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "5-Day Express Home Loan Approval"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "100% Free Insurance Claim Settlement Concierge"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Lifetime Free Credit Card Curation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Zero Hidden Fee Financial Consultation"
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhyUsClient />
    </>
  );
}
