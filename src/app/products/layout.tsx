import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Loan Products & Live Bank Interest Rates 2026 | Bhardwaj Financial Services",
  description: "Explore all loan products from 50+ leading banks & NBFCs: Home Loans from 7.15%* ROI, Business Loans, LAP, Personal Loans, MSME, and Cashless Health Insurance with doorstep processing in Agra & Pan-India.",
  alternates: {
    canonical: "https://bfsfin.com/products",
  },
  openGraph: {
    title: "All Loan Products & Bank Interest Rates | BFS Agra",
    description: "Compare Home Loans, Business Loans, LAP & Insurance products with fast 5-day approvals and zero upfront fees.",
    url: "https://bfsfin.com/products",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  }
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
