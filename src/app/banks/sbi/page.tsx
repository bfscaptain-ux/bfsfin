import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["sbi"].seoTitle,
  description: banksData["sbi"].seoDescription,
};

export default function SBIPage() {
  return <BankPageTemplate data={banksData["sbi"]} />;
}
