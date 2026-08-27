import { Metadata } from "next";
import CertificationsClient from "./CertificationsClient";

export const metadata: Metadata = {
  title: "RBI Registrations & Certifications | Bhardwaj Financial Services",
  description: "Bhardwaj Financial Services is an authorized DSA for 50+ Banks & NBFCs operating under strict RBI guidelines. We ensure 100% transparent and secure loan processing.",
  keywords: [
    "RBI approved loan consultant",
    "authorized DSA for banks",
    "certified loan agent India",
    "RBI guidelines home loans",
    "Bhardwaj Finance certifications",
    "secure loan processing Agra",
    "ISO compliant finance company",
    "trusted loan broker India"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/about/certifications",
  },
  openGraph: {
    title: "Official Registrations & Certifications - Bhardwaj Financial Services",
    description: "Your trust is our priority. Explore our DSA authorizations and compliance standards that guarantee a secure, 100% transparent loan process.",
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
            "credentialCategory": "Direct Selling Agent (DSA)",
            "recognizedBy": {
              "@type": "Organization",
              "name": "State Bank of India (SBI)"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Direct Selling Agent (DSA)",
            "recognizedBy": {
              "@type": "Organization",
              "name": "HDFC Bank"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Direct Selling Agent (DSA)",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Punjab National Bank (PNB)"
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
