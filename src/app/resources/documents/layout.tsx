import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Loan Document Checklist 2026 | Salaried & Self-Employed — BFS",
  description: "Official document checklist for Home Loan, LAP, and Business Loans. KYC, income proofs, bank statements, ITR, and property registry paper guidelines with doorstep pickup in Agra.",
  alternates: {
    canonical: "https://bfsfin.com/resources/documents",
  }
};

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
