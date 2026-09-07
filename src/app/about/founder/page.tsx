import type { Metadata } from 'next';
import FounderClient from './FounderClient';
import { prisma } from "@/lib/prisma";

// Advanced SEO & AEO (Answer Engine Optimization) Metadata for the Founder Page
export const metadata: Metadata = {
  title: 'Founder & Leadership Team | Bhardwaj Financial Services (BFS)',
  description: 'Meet the visionary leadership behind Bhardwaj Financial Services (BFS). Guiding India\'s premier 3-in-1 financial hub for Loans @ 7.15%* ROI, 100% Cashless Insurance with free claim support, and Lifetime-Free Credit Cards.',
  keywords: [
    'Founder BFS Agra', 'Praveen Bhardwaj BFS', 'Loan DSA Director Agra', 
    'Top Finance Consultant India', 'Home Loan Expert Agra 7.15', 'Cashless Health Insurance Agra',
    'Credit Card Advisory Agra', 'Bhardwaj Financial Services Team', 'Pan India Banking Partner'
  ].join(', '),
  alternates: {
    canonical: 'https://bhardwajfinance.com/about/founder',
  },
  openGraph: {
    title: 'Leadership Team | Bhardwaj Financial Services (BFS)',
    description: 'The visionary minds behind India\'s premier 3-in-1 financial hub: Loans @ 7.15%*, 100% Cashless Insurance, and Lifetime-Free Credit Cards.',
    url: 'https://bhardwajfinance.com/about/founder',
    siteName: 'Bhardwaj Financial Services',
    type: 'profile',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder & Team | Bhardwaj Financial Services',
    description: 'Meet the leadership team behind India\'s premier financial distribution hub.',
  }
};

export default async function FounderPage() {
  const settingsRecords = await prisma.systemSetting.findMany({
    where: {
      key: {
        in: ["ownerName", "ownerRole", "ownerQuote", "ownerImage"]
      }
    }
  });

  const ownerConfig = {
    name: settingsRecords.find(s => s.key === "ownerName")?.value || "Adv. Praveen Bhardwaj",
    role: settingsRecords.find(s => s.key === "ownerRole")?.value || "Founder & Managing Director, BFS",
    quote: settingsRecords.find(s => s.key === "ownerQuote")?.value || "We don't just secure loans; we legally protect your family's healthcare with cashless insurance and unlock smart credit cards. Total transparency, zero hidden brokerage.",
    image: settingsRecords.find(s => s.key === "ownerImage")?.value || "/praveen_bhardwaj.png"
  };

  // Rich JSON-LD Structured Data for AEO/GEO (Person & Organization schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://bhardwajfinance.com/about/founder#founder",
        "name": ownerConfig.name,
        "jobTitle": ownerConfig.role,
        "worksFor": {
          "@type": "Organization",
          "@id": "https://bhardwajfinance.com/#organization",
          "name": "Bhardwaj Financial Services"
        },
        "description": `Founder of Bhardwaj Financial Services with legal and financial expertise delivering Home Loans from 7.15%* ROI, Cashless Insurance, and Lifetime-Free Credit Cards.`,
        "url": "https://bhardwajfinance.com/about/founder",
        "alumniOf": "Legal & Financial Advisory India",
        "knowsAbout": ["Home Loans from 7.15% ROI", "Cashless Health Insurance", "Free Claim Settlement", "Lifetime Free Credit Cards", "Multi-Bank DSA Sanctions"]
      },
      {
        "@type": "Organization",
        "@id": "https://bhardwajfinance.com/#organization",
        "name": "Bhardwaj Financial Services",
        "founder": {
          "@id": "https://bhardwajfinance.com/about/founder#founder"
        },
        "areaServed": ["Agra", "Mathura", "Noida", "Gurgaon", "Mumbai", "Bangalore", "Jaipur", "Pan India"]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FounderClient ownerConfig={ownerConfig} />
    </>
  );
}
