import { Metadata } from "next";
import WhyUsClient from "./WhyUsClient";

export const metadata: Metadata = {
  title: "Why Choose Us | India's Trusted Loan Experts | Bhardwaj Financial Services",
  description: "Struggling with loan rejections or hidden fees? Discover why 2,500+ families chose Bhardwaj Financial Services. Fast 5-day approvals, zero hidden charges, and DSA partnerships with every major bank in India.",
  keywords: [
    "why choose bhardwaj financial services",
    "best loan consultant in Agra",
    "DSA approved loan agents in India",
    "home loan fast approval",
    "transparent loan process",
    "no hidden fees home loan",
    "best mortgage broker in Delhi NCR",
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
    title: "Why Choose Us - The Most Transparent Loan Experts in India",
    description: "Break down financial barriers with BFS. Get your dream home without the stress of rejections or hidden fees.",
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
        "description": "DSA approved partner for all major Indian banks and NBFCs, specializing in fast, transparent home loans with zero hidden fees.",
        "url": "https://bhardwajfinance.com",
        "logo": "https://bhardwajfinance.com/logo.png",
        "foundingDate": "2009",
        "founder": {
          "@type": "Person",
          "name": "Praveen Bhardwaj"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Agra"
          },
          {
            "@type": "City",
            "name": "Mathura"
          },
          {
            "@type": "City",
            "name": "Noida"
          },
          {
            "@type": "City",
            "name": "Gurgaon"
          },
          {
            "@type": "City",
            "name": "Mumbai"
          },
          {
            "@type": "City",
            "name": "Bangalore"
          },
          {
            "@type": "City",
            "name": "Jaipur"
          }
        ],
        "knowsAbout": ["Home Loans", "Mortgage Refinancing", "Loan Against Property", "Business Loans"],
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "5-Day Fast Track Home Loan Approval"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Zero Hidden Fee Loan Consultation"
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
