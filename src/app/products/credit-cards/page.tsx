import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import CreditCardsClient from "./CreditCardsClient";

export const metadata: Metadata = {
  title: "Top Credit Cards in India | Compare & Apply | BFSFIN",
  description: "Compare top credit cards from HDFC, SBI, Axis, and ICICI. Find the best card for cashback, travel, and shopping rewards.",
  openGraph: {
    title: "Top Credit Cards in India",
    description: "Find the best credit card tailored to your spending habits. Compare 50+ cards now.",
  }
};

export default async function CreditCardsPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: "products/credit-cards" } });
  const heroImageUrl = heroImage?.imageUrl;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow">
        <CreditCardsClient heroImageUrl={heroImageUrl} />
      </main>

      <Footer />
    </div>
  );
}
