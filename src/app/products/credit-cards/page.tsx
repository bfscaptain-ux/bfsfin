import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import CreditCardsClient from "./CreditCardsClient";
import { buildFinancialProductGraph } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Top Credit Cards in India | Compare & Apply | BFSFIN",
  description: "Compare top credit cards from HDFC, SBI, Axis, and ICICI. Find the best card for cashback, travel, and shopping rewards.",
  alternates: { canonical: "https://bfsfin.com/products/credit-cards" },
  openGraph: {
    title: "Top Credit Cards in India",
    description: "Find the best credit card tailored to your spending habits. Compare 50+ cards now.",
  }
};

export default async function CreditCardsPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: "products/credit-cards" } });
  const heroImageUrl = heroImage?.imageUrl;

  const structuredData = buildFinancialProductGraph({
    name: "Top Credit Cards in India",
    description: "Curated portfolio of lifetime-free, cashback, travel airport lounge, and credit builder cards from leading Indian banks.",
    slug: "credit-cards",
    category: "CreditCard",
    faqs: [
      {
        question: "Can I get a lifetime-free credit card with no annual fee?",
        answer: "Yes, BFS facilitates multiple lifetime-free credit cards from partner banks that carry ₹0 joining and ₹0 annual fee forever."
      },
      {
        question: "How can I get a credit card with low or no CIBIL score?",
        answer: "We offer FD-backed credit cards and entry-level cards that approve instantly and help establish or boost your CIBIL score."
      }
    ]
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 transition-colors duration-300">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="flex-grow">
        <CreditCardsClient heroImageUrl={heroImageUrl} />
      </main>
      <Footer />
    </div>
  );
}
