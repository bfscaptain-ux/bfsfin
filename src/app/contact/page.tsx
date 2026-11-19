import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Agra's #1 Loan Consultant",
  description: "Get in touch with Bhardwaj Financial Services. We offer home loans, LAP, and balance transfers across Agra, Mathura, Noida, Gurgaon, Mumbai, Bangalore, and Jaipur. Direct DSA partner.",
  keywords: [
    "contact Bhardwaj Financial Services",
    "home loan consultant Agra",
    "finance company contact number",
    "loan agent near me",
    "DSA contact details",
    "home loan helpdesk India",
    "Praveen Bhardwaj contact",
    "Agra loan office"
  ],
  alternates: {
    canonical: "https://bfsfin.com/contact",
  },
  openGraph: {
    title: "Contact Bhardwaj Financial Services | Pan India Loan Experts",
    description: "Reach out for home loan consultation, site visits, or application support. We operate across major Indian cities including Agra, Delhi NCR, Mumbai, and Bangalore.",
    url: "https://bfsfin.com/contact",
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
            "item": "https://bfsfin.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact Us",
            "item": "https://bfsfin.com/contact"
          }
        ]
      },
      {
        "@type": "FinancialService",
        "@id": "https://bfsfin.com/#financialservice",
        "name": "Bhardwaj Financial Services",
        "image": "https://bfsfin.com/logo.png",
        "url": "https://bfsfin.com",
        "telephone": "+91-9258724227", 
        "email": "info@bfsfin.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place",
          "addressLocality": "Agra",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.199777,
          "longitude": 78.006699
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
          "telephone": "+91-9258724227",
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
