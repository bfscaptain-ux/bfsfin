import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Loan Application Forms & Checklists (PDF) | BFS",
  description: "Download official bank loan application forms, ITR computation formats, KYC checklists, and sanction guidelines for SBI, PNB, HDFC, and ICICI bank loans.",
  alternates: {
    canonical: "https://bfsfin.com/resources/downloads",
  }
};

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
