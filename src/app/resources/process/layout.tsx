import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Step-by-Step Home Loan Approval Process | Bhardwaj Financial Services",
  description: "Understand the end-to-end 5-day bank sanction process: Document pickup, legal title vetting, bank credit appraisal, sanction letter issuance, and disbursal.",
  alternates: {
    canonical: "https://bfsfin.com/resources/process",
  }
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
