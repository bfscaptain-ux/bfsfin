import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top-Up Home Loan in India | Quick Funds - bfsfin",
  description: "Get a Top-Up Loan on your existing Home Loan for renovation, marriage, or personal needs. Enjoy low interest rates and quick disbursal across India.",
  keywords: ["Top Up Home Loan", "Home Loan Top Up India", "Home Renovation Loan", "Loan for Personal Needs", "bfsfin.in", "bfsfin.com"],
  alternates: {
    canonical: "https://bfsfin.in/products/top-up-loan",
  }
};

export default function TopUpLoanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
