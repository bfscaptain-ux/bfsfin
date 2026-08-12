import type { Metadata } from "next";
import ApplyClient from "./ApplyClient";

export const metadata: Metadata = {
  title: "Apply for a Loan Online - Personal, Business, Home & Auto | Bhardwaj Finance",
  description: "Apply for personal, business, home, or auto loans online in minutes. Enjoy instant approvals, lowest interest rates, zero hidden fees, and a 100% digital process. Apply now!",
  keywords: "loan application, personal loan apply online, business loan application, home loan apply, instant loan online, Bhardwaj finance apply",
  alternates: {
    canonical: "https://bhardwajfinance.com/apply"
  },
  openGraph: {
    title: "Apply for a Loan Online | Bhardwaj Finance",
    description: "Get funded in 5 days. Secure, fast, and 100% digital loan application for your personal and business needs.",
    url: "https://bhardwajfinance.com/apply",
    type: "website",
    siteName: "Bhardwaj Finance",
    images: [
      {
        url: "/og-image-apply.jpg",
        width: 1200,
        height: 630,
        alt: "Bhardwaj Finance Loan Application",
      },
    ],
  },
};

export default function ApplyPage() {
  return (
    <>
      {/* Schema Markup for Application Page (SEO & AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Loan Application - Bhardwaj Finance",
            "description": "Secure and fast online loan application form.",
            "url": "https://bhardwajfinance.com/apply",
            "mainEntity": {
              "@type": "Service",
              "name": "Financial Loan Services",
              "provider": {
                "@type": "FinancialService",
                "name": "Bhardwaj Finance",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Agra",
                  "addressRegion": "UP",
                  "addressCountry": "IN"
                }
              }
            }
          }),
        }}
      />
      <ApplyClient />
    </>
  );
}
