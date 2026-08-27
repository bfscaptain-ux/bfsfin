import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer in India | Save Interest - bfsfin",
  description: "Transfer your existing Home Loan to lower interest rates starting at 6.50% p.a. Save Lakhs on interest with zero hassle and get top-up loan options.",
  keywords: ["Home Loan Balance Transfer", "Home Loan Refinance India", "Lower Home Loan EMI", "bfsfin.in", "bfsfin.com"],
  alternates: {
    canonical: "https://bfsfin.in/products/balance-transfer",
  }
};

export default function BalanceTransferLayout({ children }: { children: React.ReactNode }) {
  return children;
}
