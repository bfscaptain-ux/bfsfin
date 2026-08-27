import { Metadata } from "next";
import HomeLoanClient from "./HomeLoanClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Home Loans starting at 6.50% | BFS",
  description: "Get up to 90% financing for your dream home with zero hidden brokerage. Apply for a BFS Home Loan today and get a sanction in 5 days.",
};

export default async function HomeLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/home-loan' } });
  const rateSetting = await prisma.systemSetting.findUnique({ where: { key: 'homeLoanRate' } });
  return (
    <HomeLoanClient 
      heroImageUrl={heroImage?.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
      startingRate={rateSetting?.value || "6.50"}
    />
  );
}
