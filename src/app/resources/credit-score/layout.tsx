import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIBIL & Credit Score Improvement Guide | Bhardwaj Financial Services",
  description: "Learn how to improve your CIBIL score for lowest home loan interest rates. Credit repair advice, FOIR ratios, and loan eligibility strategies from BFS senior advisors.",
  alternates: {
    canonical: "https://bfsfin.com/resources/credit-score",
  }
};

export default function CreditScoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
