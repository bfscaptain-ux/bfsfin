import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import InsuranceClient from "./InsuranceClient";

export const metadata: Metadata = {
  title: "Secure Your Future | Best Insurance Policies in India | BFSFIN",
  description: "Compare and buy the best Life, Health, and General Insurance policies in India. Get zero hidden charges, unbiased advice, and lifetime claim assistance with BFSFIN.",
};

export default async function InsuranceLandingPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: "products/insurance" } });
  const heroImageUrl = heroImage?.imageUrl;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a0f1c] font-sans transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <InsuranceClient heroImageUrl={heroImageUrl} />
      </main>
      <Footer />
    </div>
  );
}
