import { Metadata } from "next";
import BusinessLoanClient from "./BusinessLoanClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Business Loans up to ₹1 Cr | BFS",
  description: "Fuel your business growth with unsecured business loans. Quick 48-hour approvals and flexible repayment options.",
};

export default async function BusinessLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/business-loan' } });
  const rateSetting = await prisma.systemSetting.findUnique({ where: { key: 'businessLoanRate' } });
  return (
    <BusinessLoanClient 
      heroImageUrl={heroImage?.imageUrl || "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
      startingRate={rateSetting?.value || "12.50"}
    />
  );
}
