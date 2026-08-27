import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["hdfc"].seoTitle,
  description: banksData["hdfc"].seoDescription,
};

export default function HDFCPage() {
  return <BankPageTemplate data={banksData["hdfc"]} />;
}
