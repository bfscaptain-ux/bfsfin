import { Metadata } from "next";
import HomeLoanClient from "./HomeLoanClient";

export const metadata: Metadata = {
  title: "Home Loans starting at 6.50% | BFS",
  description: "Get up to 90% financing for your dream home with zero hidden brokerage. Apply for a BFS Home Loan today and get a sanction in 5 days.",
};

export default function HomeLoanPage() {
  return <HomeLoanClient />;
}
