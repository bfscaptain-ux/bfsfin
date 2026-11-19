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
    canonical: "https://bfsfin.com/contact/locations",
  },
  openGraph: {
    title: "Office Locations",
    description: "Visit our Agra Headquarters or connect with our regional representatives across India. Serving 7+ major cities.",
    url: "https://bfsfin.com/contact/locations",
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
            "item": "https://bfsfin.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": "https://bfsfin.com/contact"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Locations",
            "item": "https://bfsfin.com/contact/locations"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://bfsfin.com/#hq",
        "name": "Bhardwaj Financial Services - Agra HQ",
        "image": "https://bfsfin.com/logo.png",
        "telephone": "+91-9258724227",
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
