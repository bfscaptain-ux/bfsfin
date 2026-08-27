import { Metadata } from "next";
import LoanAgainstPropertyClient from "./LoanAgainstPropertyClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Loan Against Property (LAP) | BFS",
  description: "Unlock the value of your property with our LAP solutions. Get high-value capital for business expansion or personal milestones.",
};

export default async function LoanAgainstPropertyPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/loan-against-property' } });
  const rateSetting = await prisma.systemSetting.findUnique({ where: { key: 'lapRate' } });
  return (
    <LoanAgainstPropertyClient 
      heroImageUrl={heroImage?.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
      startingRate={rateSetting?.value || "7.50"}
    />
  );
}
