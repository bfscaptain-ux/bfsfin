import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & DPDP Data Protection",
  description: "Learn how Bhardwaj Financial Services collects, processes, and protects your personal and financial data in full compliance with the Digital Personal Data Protection (DPDP) Act.",
  alternates: {
    canonical: "https://bfsfin.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Bhardwaj Financial Services",
    description: "Our privacy policy and data governance practices compliant with RBI lending standards and DPDP Act 2023.",
    url: "https://bfsfin.com/privacy-policy",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Bhardwaj Financial Services",
    description: "Our privacy policy and data governance practices compliant with RBI lending standards and DPDP Act 2023.",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
