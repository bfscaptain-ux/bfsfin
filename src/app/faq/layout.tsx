import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Home Loans, LAP & Processing — BFS",
  description: "Find clear answers to common questions about Home Loans, CIBIL requirements, interest rates, documentation, balance transfer, and loan sanction procedures in Agra & India.",
  alternates: {
    canonical: "https://bfsfin.com/faq",
  }
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
