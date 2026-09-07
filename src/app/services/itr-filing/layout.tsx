import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online ITR Filing in 24 Hours | CA-Assisted Income Tax Return in Agra & India — BFS",
  description: "File your Income Tax Return (ITR-1, 2, 3, 4, U) online with certified CAs. Maximum refund guarantee, zero notice protection & bank loan-approved computation. Apply with ₹0 advance.",
  keywords: [
    "ITR Filing Online",
    "Income Tax Return Agra",
    "CA for ITR Agra",
    "ITR-1 Sahaj Form 16",
    "ITR-4 Sugam 44AD",
    "Bank Loan ITR",
    "ITR-U Late Filing",
    "Sanjay Place Agra CA Desk",
    "Income tax e-filing 2024-25",
    "Income tax return AY 2025-26",
    "CA near me for ITR",
    "Online tax consultant UP"
  ],
  alternates: {
    canonical: "https://bfsfin.com/services/itr-filing",
  },
  openGraph: {
    title: "Online ITR Filing in 24 Hours | CA-Assisted Desk — BFS Agra",
    description: "Get your Income Tax Return filed online by certified tax experts. Maximum refund, ₹0 advance, and bank-approved computation sheets for fast loan sanctions.",
    url: "https://bfsfin.com/services/itr-filing",
    siteName: "Bhardwaj Financial Services (BFS)",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-itr.png",
        width: 1200,
        height: 630,
        alt: "BFS CA-Assisted Online ITR Filing Desk"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Online ITR Filing in 24 Hours | BFS Agra",
    description: "CA-assisted e-filing with zero notice guarantee and bank loan-approved computation. Apply today.",
  }
};

export default function ItrFilingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
