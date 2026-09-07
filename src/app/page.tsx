import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bhardwaj Financial Services (BFS) | Loans @ 7.15%*, Insurance & Credit Cards in Agra & Pan-India",
  description: "Bhardwaj Financial Services (BFS) is Agra's premier financial institution offering 3 core pillars: Home Loans starting from 7.15%* ROI with 5-day sanction, 100% Cashless Health & Life Insurance with free claim assistance, and Lifetime-Free Credit Cards with lounge access. Sanjay Place HQ & Pan-India service.",
  keywords: [
    "Bhardwaj Financial Services",
    "BFS Agra",
    "home loan consultant Agra",
    "home loan 7.15",
    "cashless health insurance Agra",
    "free claim settlement assistance",
    "lifetime free credit cards",
    "airport lounge access credit card",
    "loan approval in 5 days",
    "lowest interest rate home loan",
    "loan agent Agra Sanjay Place",
    "Praveen Bhardwaj finance",
    "DSA partner institutional pools",
    "loan against property",
    "business loan Agra Mathura Noida Delhi NCR",
    "ITR filing online Agra",
    "CA assisted income tax return",
    "MSME registration Agra",
    "Udyam certificate registration online",
    "CGTMSE collateral free loan"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/",
  },
  openGraph: {
    title: "Bhardwaj Financial Services (BFS) | Loans, Insurance & Credit Cards",
    description: "Your 3-in-1 financial hub in Agra & across India. Lowest Home Loan ROI from 7.15%*, 100% Cashless Insurance, and Lifetime-Free Credit Cards with zero hidden fees.",
    url: "https://bhardwajfinance.com/",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://bhardwajfinance.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bhardwaj Financial Services",
      }
    ]
  }
};

export default async function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": "https://bhardwajfinance.com/#organization",
        "name": "Bhardwaj Financial Services",
        "alternateName": "BFS",
        "url": "https://bhardwajfinance.com",
        "logo": "https://bhardwajfinance.com/logo.png",
        "image": "https://bhardwajfinance.com/logo.png",
        "description": "Premier financial institution providing Home Loans from 7.15%* min ROI, Unsecured Business Loans, 100% Cashless Health & Term Insurance with Free Claim Assistance, and Lifetime-Free Credit Cards across Agra and Pan-India.",
        "founder": {
          "@type": "Person",
          "name": "Adv. Praveen Bhardwaj",
          "jobTitle": "Founder & Managing Director",
          "url": "https://bhardwajfinance.com/about/founder"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place",
          "addressLocality": "Agra",
          "addressRegion": "UP",
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "27.1994",
          "longitude": "78.0053"
        },
        "telephone": "+91-9258724227",
        "email": "info@bhardwajfinance.com",
        "areaServed": ["Agra", "Mathura", "Firozabad", "Noida", "Gurgaon", "Delhi NCR", "Mumbai", "Bangalore", "Jaipur", "Pan India"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "3-in-1 Financial Hub Products",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Finance & Loans",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Home Loan (ROI starting from 7.15%*)" } },
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Unsecured Business Loan up to ₹50 Lakhs" } },
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Personal Loan & LAP" } },
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Home Loan Balance Transfer" } }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Insurance Solutions",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "100% Cashless Health Insurance (10,000+ Hospitals)" } },
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Term Life Insurance (₹1 Cr - ₹5 Cr Cover)" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "100% Free Doorstep Claim Settlement Assistance" } }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Credit Cards",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Lifetime Free Credit Cards (₹0 Annual Fee)" } },
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Airport Lounge Access Cards" } },
                { "@type": "Offer", "itemOffered": { "@type": "FinancialProduct", "name": "Low CIBIL Credit Builder Cards" } }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Tax & Business Compliance",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CA-Assisted Online ITR Filing (Form 16 & Business)", "url": "https://bhardwajfinance.com/services/itr-filing" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Official MSME / Udyam Registration (24h Certificate)", "url": "https://bhardwajfinance.com/services/msme-registration" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bank Loan Computation & Balance Sheet Audit" } }
              ]
            }
          ]
        }
      }
    ]
  };

  // Fetch Hero Configuration & Real Review Count from DB
  const [homeHeroImage, settingsRecords, realReviewCount, liveBankRates] = await Promise.all([
    prisma.heroImage.findUnique({ where: { pageId: "home" } }),
    prisma.systemSetting.findMany({
      where: {
        key: {
          in: [
            "heroBadgeText", "heroTitlePart1", "heroTitlePart2",
            "heroBullet1", "heroBullet2", "heroBullet3", "heroSupportText",
            "googleRating", "googleReviewCount",
            "ownerName", "ownerRole", "ownerQuote", "ownerImage", "homeLoanRate", "balanceTransferRate", "contactPhone", "whatsappPhone"
          ]
        }
      }
    }),
    prisma.review.count({ where: { status: "APPROVED" } }),
    prisma.bankRate.findMany({
      orderBy: { interestRate: "asc" },
      take: 10
    })
  ]);

  const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "7.15";
  const businessLoanRate = settingsRecords.find(s => s.key === "businessLoanRate")?.value || "12.50";
  const selfEmployedRate = settingsRecords.find(s => s.key === "selfEmployedRate")?.value || "7.25";
  const lapRate = settingsRecords.find(s => s.key === "lapRate")?.value || "7.50";
  const personalLoanRate = settingsRecords.find(s => s.key === "personalLoanRate")?.value || "10.50";
  const goldLoanRate = settingsRecords.find(s => s.key === "goldLoanRate")?.value || "8.50";
  const balanceTransferRate = settingsRecords.find(s => s.key === "balanceTransferRate")?.value || "6.45";
  const contactPhone = settingsRecords.find(s => s.key === "contactPhone")?.value || "+91 9258-724-227";
  const whatsappPhone = settingsRecords.find(s => s.key === "whatsappPhone")?.value || "917900979001";

  const heroConfig = {
    imageUrl: homeHeroImage?.imageUrl || "/hero_image.jpg",
    badgeText: settingsRecords.find(s => s.key === "heroBadgeText")?.value || "Agra's #1 Premier Financial Distribution Hub",
    titlePart1: settingsRecords.find(s => s.key === "heroTitlePart1")?.value || "Building Wealth, Securing Lives,",
    titlePart2: settingsRecords.find(s => s.key === "heroTitlePart2")?.value || "Loans, Insurance & Cards.",
    bullet1: settingsRecords.find(s => s.key === "heroBullet1")?.value || `Home Loans starting at ${homeLoanRate}%* with 5-Day Fast Sanctions`,
    bullet2: settingsRecords.find(s => s.key === "heroBullet2")?.value || "100% Cashless Health Bima with Free Claim Settlement Support",
    bullet3: settingsRecords.find(s => s.key === "heroBullet3")?.value || "Lifetime-Free Credit Cards with Complimentary Airport Lounge Access",
    supportText: settingsRecords.find(s => s.key === "heroSupportText")?.value || "Talk to our Senior Advisory Desk: +91 9258-724-227",
    googleRating: settingsRecords.find(s => s.key === "googleRating")?.value || "4.9",
    googleReviewCount: realReviewCount > 0 ? `${realReviewCount}` : (settingsRecords.find(s => s.key === "googleReviewCount")?.value || "555")
  };

  const ownerConfig = {
    name: settingsRecords.find(s => s.key === "ownerName")?.value || "Adv. Praveen Bhardwaj",
    role: settingsRecords.find(s => s.key === "ownerRole")?.value || "Founder & Managing Director, BFS",
    quote: settingsRecords.find(s => s.key === "ownerQuote")?.value || "We don't just secure loans; we legally vet your investments, safeguard your health with cashless bima, and curate smart credit cards.",
    image: settingsRecords.find(s => s.key === "ownerImage")?.value || "/praveen_bhardwaj.png"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} liveBankRates={liveBankRates} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} selfEmployedRate={selfEmployedRate} businessLoanRate={businessLoanRate} lapRate={lapRate} personalLoanRate={personalLoanRate} goldLoanRate={goldLoanRate} contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
    </>
  );
}
