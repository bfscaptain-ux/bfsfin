import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan in India | Apply Online at Lowest Interest Rates - bfsfin",
  description: "Get the best Home Loan in India with interest rates starting at 6.50% p.a. Check eligibility, required documents, and apply online for a 5-day sanction guarantee.",
  keywords: ["Home Loan India", "Apply Home Loan Online", "Lowest Interest Rate Home Loan", "Housing Finance", "bfsfin.in", "bfsfin.com"],
  alternates: {
    canonical: "https://bfsfin.in/products/home-loan",
  }
};

export default function HomeLoanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
