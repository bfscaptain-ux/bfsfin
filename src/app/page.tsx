import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Home Loan in Agra & Financial Advisor | Bhardwaj Financial Services (BFS)",
  description: "Agra's trusted loan consultant & financial advisor at Sanjay Place. Best Home Loans starting 7.15%*, LAP, Business Loans, Fast Sanction & Doorstep Service across Agra. SBI, HDFC, ICICI & PNB partner.",
  keywords: [
    "home loan in Agra",
    "home loan agent in Agra",
    "home loan consultant Agra",
    "best home loan Agra",
    "home loan DSA Agra",
    "home loan interest rate 2026",
    "home loan eligibility calculator",
    "home loan EMI calculator",
    "home loan documents required",
    "home loan for salaried / self-employed",
    "home loan for salaried",
    "home loan for self-employed",
    "home loan balance transfer",
    "home loan top up",
    "LAP (loan against property) Agra",
    "plot loan / construction loan Agra",
    "plot loan Agra",
    "construction loan Agra",
    "home loan for first-time buyers",
    "low interest home loan",
    "home loan approval fast",
    "SBI / HDFC / ICICI / Axis home loan Agra",
    "SBI home loan Agra",
    "HDFC home loan Agra",
    "ICICI home loan Agra",
    "Axis home loan Agra",
    "financial advisor in Agra",
    "loan advisor Agra",
    "loan consultant near me",
    "financial consultant Agra",
    "loan broker in Agra",
    "best financial services in Agra",
    "CIBIL score improvement advice",
    "loan planning consultant",
    "Agra mein home loan kaise le",
    "ghar ke liye loan Agra",
    "sabse sasta home loan",
    "home loan ke liye kitni salary chahiye",
    "loan agent near me",
    "ghar kharidne ke liye loan",
    "CIBIL score kam ho to loan milega kya",
    "home loan near me",
    "loan consultant near Sanjay Place",
    "loan consultant near Kamla Nagar",
    "loan consultant near Sikandra",
    "loan consultant near Dayalbagh",
    "financial services Agra Uttar Pradesh",
    "Bhardwaj Financial Services",
    "BFS Agra",
    "Praveen Bhardwaj loan consultant Agra",
    "Cash salary home loan Agra",
    "Home loan without ITR Agra"
],
  alternates: {
    canonical: "https://bfsfin.com/",
  },
  openGraph: {
    title: "Home Loan in Agra & Financial Advisor | Bhardwaj Financial Services",
    description: "Agra's trusted loan consultant & financial advisor at Sanjay Place. Best Home Loans starting 7.15%*, LAP, Business Loans & Doorstep Service across Agra.",
    url: "https://bfsfin.com/",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://bfsfin.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bhardwaj Financial Services Agra",
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
        "@id": "https://bfsfin.com/#organization",
        "name": "Bhardwaj Financial Services",
        "alternateName": "BFS",
        "url": "https://bfsfin.com",
        "logo": "https://bfsfin.com/logo.png",
        "image": "https://bfsfin.com/logo.png",
        "description": "Premier financial institution providing Home Loans from 7.15%* min ROI, Unsecured Business Loans, 100% Cashless Health & Term Insurance with Free Claim Assistance, and Lifetime-Free Credit Cards across Agra and Pan-India.",
        "founder": {
          "@type": "Person",
          "name": "Adv. Praveen Bhardwaj",
          "jobTitle": "Founder & Managing Director",
          "url": "https://bfsfin.com/about/founder"
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
          "latitude": "27.199777",
          "longitude": "78.006699"
        },
        "telephone": "+91-9258724227",
        "email": "info@bfsfin.com",
        "sameAs": [
          "https://www.facebook.com/bhardwajfinancialservices",
          "https://www.instagram.com/bhardwajfinancialservices",
          "https://www.linkedin.com/company/bhardwaj-financial-services"
        ],
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
            }
          ]
        }
      }
    ]
  };

  // Fetch Hero Configuration & Real Review Count from DB
  const [homeHeroImage, settingsRecords, realReviewCount, bankLogos] = await Promise.all([
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
    prisma.bankLogo.findMany({
      orderBy: { sortOrder: "asc" }
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
  const whatsappPhone = settingsRecords.find(s => s.key === "whatsappPhone")?.value || "919286683232";

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
      <HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} bankLogos={bankLogos} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} selfEmployedRate={selfEmployedRate} businessLoanRate={businessLoanRate} lapRate={lapRate} personalLoanRate={personalLoanRate} goldLoanRate={goldLoanRate} contactPhone={contactPhone} whatsappPhone={whatsappPhone} />
    </>
  );
}
