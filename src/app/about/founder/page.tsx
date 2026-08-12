import type { Metadata } from 'next';
import FounderClient from './FounderClient';

// Advanced SEO & AEO (Answer Engine Optimization) Metadata for the Founder Page
export const metadata: Metadata = {
  title: 'Founder & Leadership Team | Bhardwaj Financial Services',
  description: 'Meet Mrs. Vinita Sharma, the Owner of Bhardwaj Financial Services (BFS). With 15+ years of banking experience, our leadership team ensures India\'s fastest loan approvals.',
  keywords: [
    'Praveen Bhardwaj Finance', 'BFS Agra Founder', 'Loan DSA Director', 
    'Top Finance Consultant India', 'Home Loan Expert Agra', 'Bhardwaj Financial Services Team',
    'Pan India Banking Partner', 'DSA Approved Expert'
  ].join(', '),
  alternates: {
    canonical: 'https://bhardwajfinance.com/about/founder',
  },
  openGraph: {
    title: 'Leadership Team | Bhardwaj Financial Services',
    description: 'The visionary minds behind India\'s fastest 5-Day Loan Sanction process. Meet Mrs. Vinita Sharma and the core team changing the finance sector.',
    url: 'https://bhardwajfinance.com/about/founder',
    siteName: 'Bhardwaj Financial Services',
    type: 'profile',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Owner & Team | Bhardwaj Financial Services',
    description: 'Meet Mrs. Vinita Sharma and the core team behind India\'s fastest loan processing network.',
  }
};

export default function FounderPage() {
  // Rich JSON-LD Structured Data for AEO/GEO (Person & Organization schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://bhardwajfinance.com/about/founder#praveenbhardwaj",
        "name": "Praveen Bhardwaj",
        "jobTitle": "Owner",
        "worksFor": {
          "@type": "Organization",
          "@id": "https://bhardwajfinance.com/#organization",
          "name": "Bhardwaj Financial Services"
        },
        "description": "Owner of Bhardwaj Financial Services with over 15 years of deep expertise in the Indian banking and DSA sector.",
        "url": "https://bhardwajfinance.com/about/founder",
        "alumniOf": "Banking Sector India",
        "knowsAbout": ["Home Loans", "Mortgage Processing", "DSA Partnerships", "Credit Risk Analysis"]
      },
      {
        "@type": "Organization",
        "@id": "https://bhardwajfinance.com/#organization",
        "name": "Bhardwaj Financial Services",
        "founder": {
          "@id": "https://bhardwajfinance.com/about/founder#praveenbhardwaj"
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
      <FounderClient />
    </>
  );
}
