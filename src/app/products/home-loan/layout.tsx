import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Loan in India | In-Principle Sanction from 7.15%*",
  description: "Get the best Home Loan in India with interest rates starting at 7.15%* p.a. Compare 50+ partner banks, check eligibility, and apply online with Bhardwaj Financial Services.",
  alternates: {
    canonical: "https://bfsfin.com/products/home-loan",
  },
  openGraph: {
    title: "Home Loan in India | Lowest Interest Rates Starting 7.15%*",
    description: "Compare 50+ banks and NBFCs for your home loan. Transparent process, expert underwriting, and doorstep service.",
    url: "https://bfsfin.com/products/home-loan",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan in India | Bhardwaj Financial Services",
    description: "Home loan rates starting from 7.15%* p.a. Compare top PSU & private banks.",
  },
};

export default function HomeLoanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
