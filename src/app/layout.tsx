import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "BFS AGRA — Enterprise Home Loan Portal | Vineeta Sharma",
  description: "Agra's #1 Home Loan Portal. Approved in 5 Days! ₹20L to ₹1Cr+ starting @ 6.50% p.a. Direct priority partner for PNB, Central Bank of India, IDBI & HDFC.",
  keywords: ["Home Loan Agra", "PNB Home Loan Rate Agra", "Balance Transfer Agra", "BFS Agra", "Vineeta Sharma", "Low interest home loan UP"],
  authors: [{ name: "Bhardwaj Financial Services (BFS AGRA)" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased min-h-screen selection:bg-emerald-200 selection:text-emerald-900 pb-16 xl:pb-0 bg-slate-50 text-slate-900">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
