import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | Join India's Top Finance Team",
  description: "Build a high-growth career in finance with Bhardwaj Financial Services. We are hiring Relationship Managers, Telecallers, and Credit Analysts across India.",
  keywords: [
    "finance jobs India",
    "banking jobs Pan India",
    "Bhardwaj Financial Services careers",
    "sales executive jobs",
    "loan consultant jobs",
    "telecalling jobs India",
    "fresher jobs finance",
    "high incentive jobs India"
  ],
  alternates: {
    canonical: "https://bfsfin.com/careers",
  },
  openGraph: {
    title: "Careers at Bhardwaj Financial Services",
    description: "Accelerate your career in the financial sector. Join our dynamic team across India and work with 50+ top banks and NBFCs.",
    url: "https://bfsfin.com/careers",
    siteName: "Bhardwaj Financial Services",
    images: [
      {
        url: "/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Bhardwaj Financial Services",
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function CareersPage() {
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
            "item": "https://bfsfin.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Careers",
            "item": "https://bfsfin.com/careers"
          }
        ]
      },
      {
        "@type": "JobPosting",
        "title": "Relationship Manager - Home Loans",
        "description": "We are looking for an energetic Relationship Manager to drive home loan sales across India. You will be responsible for lead generation, client meetings, and loan file processing.",
        "identifier": {
          "@type": "PropertyValue",
          "name": "Bhardwaj Financial Services",
          "value": "RM-01"
        },
        "datePosted": "2024-01-01",
        "validThrough": "2025-12-31",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Bhardwaj Financial Services",
          "sameAs": "https://bfsfin.com",
          "logo": "https://bfsfin.com/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Multiple Locations",
            "addressCountry": "IN"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": 15000,
            "maxValue": 45000,
            "unitText": "MONTH"
          }
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersClient />
    </>
  );
}
