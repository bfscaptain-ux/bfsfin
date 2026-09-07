import AboutClient from './AboutClient';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Bhardwaj Financial Services (BFS) | Loans @ 7.15%*, Insurance & Credit Cards in Agra & Pan-India',
  description: 'Bhardwaj Financial Services (BFS) is Agra\'s premier financial hub offering 3 core products: Home Loans (min ROI 7.15%) & Business/Personal Loans, 100% Cashless Health, Term Life & Motor Insurance with free claim assistance, and Lifetime-Free Credit Cards with lounge access. Sanjay Place, Agra HQ & Pan-India service.',
  keywords: 'bhardwaj financial services, bfs agra, best finance company in agra, home loans agra 7.15, insurance services agra, cashless health insurance agra, term life cover agra, motor bima, lifetime free credit cards, airport lounge credit card, low cibil loan, dsa approved finance agra sanjay place, loan against property, business loan agra, mathura, noida, gurgaon, delhi ncr, mumbai, bangalore, jaipur',
  openGraph: {
    title: 'Bhardwaj Financial Services (BFS) - Loans, Insurance & Credit Cards',
    description: 'Agra\'s premier financial institution with 15+ years of trust and 10,000+ satisfied clients. Lowest Home Loan ROI starting from 7.15%, 100% Cashless Insurance with Free Claim Support, and Lifetime-Free Credit Cards.',
    url: 'https://bfsfin.com/about',
    siteName: 'Bhardwaj Financial Services',
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function AboutPage() {
  const settingsRecords = await prisma.systemSetting.findMany({
    where: {
      key: {
        in: ["ownerName", "ownerRole", "ownerAboutDesc", "ownerImage"]
      }
    }
  });

  const ownerConfig = {
    name: settingsRecords.find(s => s.key === "ownerName")?.value || "Adv. Praveen Bhardwaj",
    role: settingsRecords.find(s => s.key === "ownerRole")?.value || "Founder & Managing Director",
    desc: settingsRecords.find(s => s.key === "ownerAboutDesc")?.value || "With deep expertise in Law and Finance, Adv. Praveen Bhardwaj established BFS in Sanjay Place, Agra to deliver a transparent, single-window destination for Loans, Insurance, and Credit Cards.",
    image: settingsRecords.find(s => s.key === "ownerImage")?.value || "/praveen_bhardwaj.png"
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialService',
        '@id': 'https://bfsfin.com/#organization',
        name: 'Bhardwaj Financial Services',
        alternateName: 'BFS',
        image: 'https://bfsfin.com/logo.png',
        url: 'https://bfsfin.com',
        description: 'Bhardwaj Financial Services (BFS) is Agra\'s premier financial institution providing transparent Loans (Home Loan from 7.15% min ROI, Business & Personal Loans), 100% Cashless Insurance (Health, Term Life & Motor with Free Claim Assistance), and Lifetime-Free Credit Cards with Airport Lounge Access.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sanjay Place, Commercial Hub',
          addressLocality: 'Agra',
          addressRegion: 'Uttar Pradesh',
          postalCode: '282002',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '27.1994',
          longitude: '78.0053',
        },
        telephone: '+919876543210',
        founder: {
          '@type': 'Person',
          name: ownerConfig.name,
          jobTitle: ownerConfig.role,
        },
        areaServed: [
          { '@type': 'City', name: 'Agra' },
          { '@type': 'City', name: 'Mathura' },
          { '@type': 'City', name: 'Firozabad' },
          { '@type': 'City', name: 'Noida' },
          { '@type': 'City', name: 'Gurgaon' },
          { '@type': 'City', name: 'Delhi NCR' },
          { '@type': 'City', name: 'Mumbai' },
          { '@type': 'City', name: 'Bangalore' },
          { '@type': 'City', name: 'Jaipur' },
          { '@type': 'Country', name: 'India' }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Financial Services',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: 'Finance & Loans',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Home Loan (ROI starting from 7.15%*)' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Unsecured Business Loan up to ₹50 Lakhs' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Express Personal Loan' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Loan Against Property (LAP)' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Home Loan Balance Transfer' } }
              ]
            },
            {
              '@type': 'OfferCatalog',
              name: 'Insurance Solutions',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: '100% Cashless Health Insurance (10,000+ Hospitals)' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Term Life Insurance (₹1 Cr - ₹5 Cr Cover)' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Motor & Commercial Vehicle Bima (0-Dep)' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '100% Free Doorstep Claim Settlement Assistance' } }
              ]
            },
            {
              '@type': 'OfferCatalog',
              name: 'Credit Cards',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Lifetime Free Credit Cards (₹0 Annual Fee)' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Airport Lounge Access Credit Cards' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'High Cashback & Rewards Cards' } },
                { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Secured & Low CIBIL Credit Builder Cards' } }
              ]
            }
          ]
        },
        knowsAbout: [
          'Home Loans starting from 7.15% ROI',
          '5-Day Express Loan Sanctions',
          'Cashless Health Insurance',
          'Term Life Insurance Cover',
          'Motor & Vehicle Bima',
          'Free Claim Settlement Assistance',
          'Lifetime Free Credit Cards',
          'Airport Lounge Cards',
          'CIBIL Repair & Credit Guidance',
          'DSA Institutional Lending Pools'
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What products does Bhardwaj Financial Services (BFS) offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bhardwaj Financial Services offers 3 core products: 1. Loans (Home Loans starting at 7.15% min ROI, Business Loans, Personal Loans, LAP), 2. Comprehensive Insurance (Cashless Health Insurance across 10,000+ hospitals, Term Life, Motor Insurance, and Free Claim Settlement Assistance), and 3. Premium Credit Cards (Lifetime-Free cards with zero annual fees, Airport Lounge Access, and Credit-Builder cards).'
            }
          },
          {
            '@type': 'Question',
            name: 'Where is Bhardwaj Financial Services located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bhardwaj Financial Services is headquartered at Sanjay Place, Agra, Uttar Pradesh, and provides digital as well as doorstep financial services across Agra, Mathura, Firozabad, Noida, Gurgaon, Delhi NCR, and nationwide across India.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the starting interest rate for Home Loans at BFS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Home loans at Bhardwaj Financial Services start from a highly competitive minimum ROI of 7.15%* with a 5-day express sanction guarantee and zero hidden brokerage.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does BFS provide free insurance claim settlement assistance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, BFS provides 100% free claim settlement assistance for health, term life, and motor insurance. Our specialized team coordinates with TPA and insurance desks directly so you never have to face claim hurdles alone.'
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
      <AboutClient ownerConfig={ownerConfig} />
    </>
  );
}
