import { Metadata } from "next";
import CertificationsClient from "./CertificationsClient";

export const metadata: Metadata = {
  title: "Official Compliance & Certifications | Bhardwaj Financial Services",
  description: "Bhardwaj Financial Services (BFS) operates under strict RBI lending guidelines, IRDAI insurance compliance, and authorized banking distribution standards. 100% secure processing for Loans, Insurance & Credit Cards in Agra and Pan-India.",
  keywords: [
    "authorized DSA India",
    "RBI compliant loan partner",
    "IRDAI insurance distribution agra",
    "certified financial consultant agra",
    "bhardwaj financial services certifications",
    "secure loan processing agra sanjay place",
    "ISO compliant finance company",
    "trusted loan broker India"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/about/certifications",
  },
  openGraph: {
    title: "Official Registrations & Certifications - Bhardwaj Financial Services",
    description: "Your trust is our priority. Explore our DSA authorizations and regulatory compliance standards across Loans, Insurance, and Credit Cards.",
    url: "https://bhardwajfinance.com/about/certifications",
    siteName: "Bhardwaj Financial Services",
    images: [
      {
        url: "/og-certifications.jpg",
        width: 1200,
        height: 630,
        alt: "Bhardwaj Financial Services Certifications",
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function CertificationsPage() {
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
            "name": "Certifications",
            "item": "https://bhardwajfinance.com/about/certifications"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://bhardwajfinance.com/#organization",
        "name": "Bhardwaj Financial Services",
        "url": "https://bhardwajfinance.com",
        "logo": "https://bhardwajfinance.com/logo.png",
        "certification": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "RBI-Compliant Lending Distribution Partner",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Institutional Lending Network"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "IRDAI-Aligned Insurance Distribution & Claim Advisory",
            "recognizedBy": {
              "@type": "Organization",
              "name": "General & Health Insurance Desks"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Authorized Credit Card Sourcing Channel",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Banking Card Sourcing Bureau"
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
      <CertificationsClient />
    </>
  );
}
