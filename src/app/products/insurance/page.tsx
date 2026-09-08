import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import InsuranceClient from "./InsuranceClient";

export const metadata: Metadata = {
  title: "Best Insurance Policies in India | Health, Term, Motor | BFSFIN",
  description: "Compare and buy the best Health Insurance, Term Life Cover, Motor Insurance, and Business Insurance policies in India. Zero hidden charges with BFSFIN.",
  keywords: "health insurance, term life insurance, car insurance, family floater, critical illness, business insurance, best insurance in india",
  alternates: { canonical: "https://bfsfin.com/products/insurance" }
};

export default async function InsuranceLandingPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: "products/insurance" } });
  const heroImageUrl = heroImage?.imageUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Comprehensive Insurance Products by BFSFIN",
    "description": "Explore our wide range of insurance products including Health, Life, Motor, and Business insurance.",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "url": "https://bfsfin.com/products/insurance/health-insurance", "name": "Health Insurance" },
      { "@type": "ListItem", "position": 2, "url": "https://bfsfin.com/products/insurance/term-life", "name": "Term Life Insurance" },
      { "@type": "ListItem", "position": 3, "url": "https://bfsfin.com/products/insurance/family-floater", "name": "Family Floater Insurance" },
      { "@type": "ListItem", "position": 4, "url": "https://bfsfin.com/products/insurance/critical-illness", "name": "Critical Illness Cover" },
      { "@type": "ListItem", "position": 5, "url": "https://bfsfin.com/products/insurance/car-insurance", "name": "Car Insurance" },
      { "@type": "ListItem", "position": 6, "url": "https://bfsfin.com/products/insurance/two-wheeler-insurance", "name": "Two Wheeler Insurance" },
      { "@type": "ListItem", "position": 7, "url": "https://bfsfin.com/products/insurance/home-insurance", "name": "Home Property Insurance" },
      { "@type": "ListItem", "position": 8, "url": "https://bfsfin.com/products/insurance/business-insurance", "name": "Business & SME Insurance" }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 font-sans transition-colors duration-300">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow">
        <InsuranceClient heroImageUrl={heroImageUrl} />
      </main>
      <Footer />
    </div>
  );
}
