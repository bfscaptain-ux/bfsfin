import { Metadata } from "next";
import AppointmentClient from "./AppointmentClient";

export const metadata: Metadata = {
  title: "Book an Appointment | Home Loan Consultation | Bhardwaj Financial Services",
  description: "Schedule a free consultation with our loan experts. Book your appointment for Home Loans, LAP, Balance Transfer, or Real Estate advisory across India.",
  keywords: [
    "book loan appointment",
    "home loan consultation",
    "finance expert meeting",
    "Vinita Sharma appointment",
    "loan advisory India",
    "schedule loan meeting"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/appointment",
  },
  openGraph: {
    title: "Book a Consultation | Bhardwaj Financial Services",
    description: "Take the first step towards your dream home. Schedule a free, personalized consultation with our finance experts today.",
    url: "https://bhardwajfinance.com/appointment",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  }
};

export default function AppointmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Book an Appointment - Bhardwaj Financial Services",
    "description": "Schedule a free financial consultation for home loans and real estate advisory.",
    "url": "https://bhardwajfinance.com/appointment",
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://bhardwajfinance.com/appointment",
        "inLanguage": "en-IN",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Financial Consultation"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppointmentClient />
    </>
  );
}
