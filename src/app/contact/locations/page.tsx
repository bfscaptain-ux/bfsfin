import { Metadata } from "next";
import LocationsClient from "./LocationsClient";

export const metadata: Metadata = {
  title: "Office Locations | Bhardwaj Financial Services (BFS)",
  description: "Find Bhardwaj Financial Services near you. We operate our Home Loan consulting services in Agra (HQ), Mathura, Noida, Gurgaon, Mumbai, Bangalore, and Jaipur.",
  keywords: [
    "finance office Agra",
    "home loan consultant Noida",
    "DSA agent Mathura",
    "loan agency Gurgaon",
    "BFS Mumbai branch",
    "Praveen Bhardwaj office",
    "finance company Bangalore"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/contact/locations",
  },
  openGraph: {
    title: "Office Locations | Bhardwaj Financial Services",
    description: "Visit our Agra Headquarters or connect with our regional representatives across India. Serving 7+ major cities.",
    url: "https://bhardwajfinance.com/contact/locations",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  }
};

export default function LocationsPage() {
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
            "name": "Contact",
            "item": "https://bhardwajfinance.com/contact"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Locations",
            "item": "https://bhardwajfinance.com/contact/locations"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://bhardwajfinance.com/#hq",
        "name": "Bhardwaj Financial Services - Agra HQ",
        "image": "https://bhardwajfinance.com/logo.png",
        "telephone": "+91-9999999999",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sanjay Place Commercial Hub",
          "addressLocality": "Agra",
          "addressRegion": "UP",
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "areaServed": [
          "Agra", "Mathura", "Noida", "Gurgaon", "Mumbai", "Bangalore", "Jaipur"
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
      <LocationsClient />
    </>
  );
}
