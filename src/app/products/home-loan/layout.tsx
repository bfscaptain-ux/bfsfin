import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan in India | Apply Online at Lowest Interest Rates - bfsfin",
  description: "Get the best Home Loan in India with interest rates starting at 7.15%* p.a. Check eligibility, required documents, and apply online for fast-track 5-day in-principle processing*.",
  keywords: ["Home Loan India", "Apply Home Loan Online", "Lowest Interest Rate Home Loan", "Housing Finance", "bfsfin.com", "bfsfin.com"],
  alternates: {
    canonical: "https://bfsfin.com/products/home-loan",
  }
};

export default function HomeLoanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
