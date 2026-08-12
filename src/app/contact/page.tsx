import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Agra's #1 Loan Consultant | Bhardwaj Financial Services",
  description: "Get in touch with Bhardwaj Financial Services. We offer home loans, LAP, and balance transfers across Agra, Mathura, Noida, Gurgaon, Mumbai, Bangalore, and Jaipur. Direct DSA partner.",
  keywords: [
    "contact Bhardwaj Finance",
    "home loan consultant Agra",
    "finance company contact number",
    "loan agent near me",
    "DSA contact details",
    "home loan helpdesk India",
    "Vinita Sharma contact",
    "Agra loan office"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/contact",
  },
  openGraph: {
    title: "Contact Bhardwaj Financial Services | Pan India Loan Experts",
    description: "Reach out for home loan consultation, site visits, or application support. We operate across major Indian cities including Agra, Delhi NCR, Mumbai, and Bangalore.",
    url: "https://bhardwajfinance.com/contact",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  }
};

export default function ContactPage() {
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
            "name": "Contact Us",
            "item": "https://bhardwajfinance.com/contact"
          }
        ]
      },
      {
        "@type": "FinancialService",
        "@id": "https://bhardwajfinance.com/#financialservice",
        "name": "Bhardwaj Financial Services",
        "image": "https://bhardwajfinance.com/logo.png",
        "url": "https://bhardwajfinance.com",
        "telephone": "+91-9999999999", 
        "email": "info@bhardwajfinance.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sanjay Place Commercial Hub",
          "addressLocality": "Agra",
          "addressRegion": "UP",
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.1994,
          "longitude": 78.0044
        },
        "areaServed": [
          "Agra", "Mathura", "Noida", "Gurgaon", "Delhi NCR", "Mumbai", "Bangalore", "Jaipur", "Pan India"
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPage",
        "mainEntity": {
          "@type": "ContactPoint",
          "telephone": "+91-9999999999",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi"]
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
      <ContactClient />
    </>
  );
}
