import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Online for Home Loan, LAP & Business Loan | Instant 5-Day Sanction* — BFS",
  description: "One-stop loan application portal for Home Loans from 7.15%* ROI, Loan Against Property & Business Loans with zero upfront brokerage and doorstep document pickup across Agra & Pan-India.",
  alternates: {
    canonical: "https://bfsfin.com/apply",
  },
  openGraph: {
    title: "Apply for Fast-Track Home Loan & LAP | Bhardwaj Financial Services",
    description: "Submit your online loan enquiry in under 2 minutes. Direct sanctioning via 50+ institutional banking partners with zero hidden brokerages.",
    url: "https://bfsfin.com/apply",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  }
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
