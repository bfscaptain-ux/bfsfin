import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "BFS AGRA — Enterprise Home Loan Portal | Mrs. Vinita Sharma",
  description: "Agra's #1 Home Loan Portal. Approved in 5 Days! ₹20L to ₹1Cr+ starting @ 6.50% p.a. Direct priority partner for PNB, Central Bank of India, IDBI & HDFC.",
  keywords: ["Home Loan Agra", "PNB Home Loan Rate Agra", "Balance Transfer Agra", "BFS Agra", "Mrs Vinita Sharma", "Low interest home loan UP"],
  authors: [{ name: "Bhardwaj Financial Services (BFS AGRA)" }],
};

import FloatingContact from "@/components/FloatingContact";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen selection:bg-emerald-500 selection:text-slate-950 pb-16 xl:pb-0">
        <ThemeProvider>
          {children}
          <FloatingContact />
        </ThemeProvider>
      </body>
    </html>
  );
}
