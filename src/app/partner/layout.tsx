import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner with BFS | Become an Authorized DSA Sub-Broker & Loan Associate",
  description: "Join India's premier loan distribution network. Partner with Bhardwaj Financial Services as a DSA referral agent, builder partner, or CA associate with highest payout slabs.",
  alternates: {
    canonical: "https://bfsfin.com/partner",
  }
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
