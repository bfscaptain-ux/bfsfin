import type { Metadata } from 'next';
import FounderClient from './FounderClient';
import { prisma } from "@/lib/prisma";

// Advanced SEO & AEO (Answer Engine Optimization) Metadata for the Founder Page
export const metadata: Metadata = {
  title: 'Founder & Leadership Team | Bhardwaj Financial Services',
  description: 'Meet the visionary founder of Bhardwaj Financial Services (BFS). With 15+ years of banking experience, our leadership team ensures India\'s fastest loan approvals.',
  keywords: [
    'Founder Finance', 'BFS Agra Founder', 'Loan DSA Director', 
    'Top Finance Consultant India', 'Home Loan Expert Agra', 'Bhardwaj Financial Services Team',
    'Pan India Banking Partner', 'DSA Approved Expert'
  ].join(', '),
  alternates: {
    canonical: 'https://bhardwajfinance.com/about/founder',
  },
  openGraph: {
    title: 'Leadership Team | Bhardwaj Financial Services',
    description: 'The visionary minds behind India\'s fastest 5-Day Loan Sanction process. Meet the core team changing the finance sector.',
    url: 'https://bhardwajfinance.com/about/founder',
    siteName: 'Bhardwaj Financial Services',
    type: 'profile',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder & Team | Bhardwaj Financial Services',
    description: 'Meet the founder and the core team behind India\'s fastest loan processing network.',
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
    name: settingsRecords.find(s => s.key === "ownerName")?.value || "Vineeta Sharma",
    role: settingsRecords.find(s => s.key === "ownerRole")?.value || "Founder & Managing Director, BFS",
    quote: settingsRecords.find(s => s.key === "ownerQuote")?.value || "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: settingsRecords.find(s => s.key === "ownerImage")?.value || "/owner.png"
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
        "description": `Founder of Bhardwaj Financial Services with over 15 years of deep expertise in the Indian banking and DSA sector.`,
        "url": "https://bhardwajfinance.com/about/founder",
        "alumniOf": "Banking Sector India",
        "knowsAbout": ["Home Loans", "Mortgage Processing", "DSA Partnerships", "Credit Risk Analysis"]
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
