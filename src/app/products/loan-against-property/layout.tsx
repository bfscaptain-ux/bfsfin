import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Against Property in India | LAP - bfsfin",
  description: "Unlock the value of your property with a Loan Against Property (LAP). Get high loan amounts at low interest rates for business or personal needs.",
  keywords: ["Loan Against Property", "LAP India", "Mortgage Loan", "Property Loan", "bfsfin.com", "bfsfin.com"],
  alternates: {
    canonical: "https://bfsfin.com/products/loan-against-property",
  }
};

export default function LAPLayout({ children }: { children: React.ReactNode }) {
  return children;
}
