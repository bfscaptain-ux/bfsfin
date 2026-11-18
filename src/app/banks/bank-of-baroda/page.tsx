import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["bank-of-baroda"].seoTitle,
  description: banksData["bank-of-baroda"].seoDescription,
};

export default function BankOfBarodaPage() {
  return <BankPageTemplate data={banksData["bank-of-baroda"]} />;
}
