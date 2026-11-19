import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "AI Loan Advisor",
  description: "Chat with our AI Loan Advisor to get instant quotes, check your eligibility, and apply for a Home Loan, LAP, or Business Loan 100% digitally.",
  keywords: [
    "AI loan advisor",
    "chat bot loan agent",
    "home loan chatbot",
    "digital loan application",
    "Bhardwaj Financial Services AI",
    "instant loan eligibility check"
  ],
  alternates: {
    canonical: "https://bfsfin.com/ai-loan-advisor",
  }
};

export default function AILoanAdvisorPage() {
  return <ClientPage />;
}
