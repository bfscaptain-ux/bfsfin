import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["central-bank"].seoTitle,
  description: banksData["central-bank"].seoDescription,
};

export default function CentralBankPage() {
  return <BankPageTemplate data={banksData["central-bank"]} />;
}
