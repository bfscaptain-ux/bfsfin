import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online MSME / Udyam Registration in 24 Hours | Instant Certificate — BFS",
  description: "Get government-certified MSME / Udyam Registration Certificate in 24 hours. Avail collateral-free bank loans, priority CGTMSE lending & 45-day payment protection.",
  keywords: [
    "MSME Registration Online",
    "Udyam Registration Certificate",
    "MSME Consultant Agra",
    "Udyam Portal e-Filing",
    "MSME Loan Benefits",
    "Sanjay Place Agra MSME Desk",
    "CGTMSE Loan Eligibility"
  ],
  alternates: {
    canonical: "https://bfsfin.com/services/msme-registration",
  },
  openGraph: {
    title: "Online MSME / Udyam Registration in 24 Hours | BFS Desk",
    description: "Get your official Government of India Udyam Certificate in 24 hours. Unlock collateral-free loan benefits & subsidies.",
    url: "https://bfsfin.com/services/msme-registration",
    siteName: "Bhardwaj Financial Services (BFS)",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Online MSME / Udyam Registration in 24 Hours | BFS",
    description: "Instant government-certified Udyam registration online with zero office visits.",
  }
};

export default function MsmeRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
