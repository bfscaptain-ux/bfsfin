import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Bhardwaj Financial Services | India's #1 Loan Consultant",
  description: "Get your Home Loan approved in 5 days! Bhardwaj Financial Services offers the lowest interest rates starting at 6.50% across India. Zero physical branch visits required.",
  keywords: [
    "Bhardwaj Financial Services",
    "home loan consultant",
    "loan approval in 5 days",
    "lowest interest rate home loan",
    "loan agent Agra",
    "Praveen Bhardwaj finance",
    "DSA partner banks",
    "loan against property",
    "balance transfer loan"
  ],
  alternates: {
    canonical: "https://bhardwajfinance.com/",
  },
  openGraph: {
    title: "Bhardwaj Financial Services | Top Tier Mortgage Advisors",
    description: "Specializing in loans from ₹20 Lakhs to ₹1 Crore+. 100% digital processing with 7+ top banking partners.",
    url: "https://bhardwajfinance.com/",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://bhardwajfinance.com/og-image.jpg", // placeholder
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
    "@type": "FinancialService",
    "@id": "https://bhardwajfinance.com/#organization",
    "name": "Bhardwaj Financial Services",
    "url": "https://bhardwajfinance.com",
    "logo": "https://bhardwajfinance.com/logo.png",
    "image": "https://bhardwajfinance.com/logo.png",
    "description": "Top-tier financial consultancy providing Home Loans, LAP, and Balance Transfers with a 5-day approval guarantee.",
    "founder": {
      "@type": "Person",
      "name": "Vineeta Sharma",
      "jobTitle": "Founder & Managing Director",
      "url": "https://bhardwajfinance.com/about/founder"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Palace, Sanjay Place",
      "addressLocality": "Agra",
      "addressRegion": "UP",
      "postalCode": "282002",
      "addressCountry": "IN"
    },
    "telephone": "+91-9999999999",
    "email": "info@bhardwajfinance.com",
    "areaServed": ["Agra", "Mathura", "Noida", "Gurgaon", "Mumbai", "Bangalore", "Jaipur", "Pan India"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Financial Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FinancialProduct",
            "name": "Home Loan",
            "description": "Fresh purchase or construction loans with lowest interest rates."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FinancialProduct",
            "name": "Loan Against Property",
            "description": "High-value cash by mortgaging property."
          }
        }
      ]
    }
  };

  // Fetch Hero Configuration from DB
  const homeHeroImage = await prisma.heroImage.findUnique({ where: { pageId: "home" } });
  
  const settingsRecords = await prisma.systemSetting.findMany({
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
  });

  
  // Fetch live bank rates for the ticker
  

  const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";
  const businessLoanRate = settingsRecords.find(s => s.key === "businessLoanRate")?.value || "12.50";
  const selfEmployedRate = settingsRecords.find(s => s.key === "selfEmployedRate")?.value || "7.25";
  const lapRate = settingsRecords.find(s => s.key === "lapRate")?.value || "7.50";
  const personalLoanRate = settingsRecords.find(s => s.key === "personalLoanRate")?.value || "10.50";
  const goldLoanRate = settingsRecords.find(s => s.key === "goldLoanRate")?.value || "8.50";
  const balanceTransferRate = settingsRecords.find(s => s.key === "balanceTransferRate")?.value || "6.45";
  const contactPhone = settingsRecords.find(s => s.key === "contactPhone")?.value || "+91 7900-979-001";
  const whatsappPhone = settingsRecords.find(s => s.key === "whatsappPhone")?.value || "917900979001";

  const heroConfig = {
    imageUrl: homeHeroImage?.imageUrl || "/hero_image.jpg",
    badgeText: settingsRecords.find(s => s.key === "heroBadgeText")?.value || "RBI Registered & Verified Partners",
    titlePart1: settingsRecords.find(s => s.key === "heroTitlePart1")?.value || "Your Dream Home,",
    titlePart2: settingsRecords.find(s => s.key === "heroTitlePart2")?.value || "Funded in 5 Days.",
    bullet1: settingsRecords.find(s => s.key === "heroBullet1")?.value || `Lowest Interest Rates Guaranteed (from ${settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50"}%)`,
    bullet2: settingsRecords.find(s => s.key === "heroBullet2")?.value || "Zero Processing Fees for Direct Applications",
    bullet3: settingsRecords.find(s => s.key === "heroBullet3")?.value || "Doorstep Document Pickup & 100% Digital Process",
    supportText: settingsRecords.find(s => s.key === "heroSupportText")?.value || "Prefer talking to an expert? Call: 7900-979-001",
    googleRating: settingsRecords.find(s => s.key === "googleRating")?.value || "4.9",
    googleReviewCount: settingsRecords.find(s => s.key === "googleReviewCount")?.value || "1,200+"
  };

  const ownerConfig = {
    name: settingsRecords.find(s => s.key === "ownerName")?.value || "Vineeta Sharma",
    role: settingsRecords.find(s => s.key === "ownerRole")?.value || "Founder & Managing Director, BFS",
    quote: settingsRecords.find(s => s.key === "ownerQuote")?.value || "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: settingsRecords.find(s => s.key === "ownerImage")?.value || "/owner.png"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} selfEmployedRate={selfEmployedRate} businessLoanRate={businessLoanRate} lapRate={lapRate} personalLoanRate={personalLoanRate} goldLoanRate={goldLoanRate} contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
    </>
  );
}
