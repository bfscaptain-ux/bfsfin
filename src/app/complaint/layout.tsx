import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lodge a Complaint & Customer Grievance Desk | Bhardwaj Financial Services",
  description: "Official customer grievance redressal portal for Bhardwaj Financial Services. Fast escalation, confidential review by Nodal Officer Praveen Bhardwaj, and resolution within 48 hours.",
  alternates: {
    canonical: "https://bfsfin.com/complaint",
  }
};

export default function ComplaintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
