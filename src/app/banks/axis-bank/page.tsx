import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["axis-bank"].seoTitle,
  description: banksData["axis-bank"].seoDescription,
};

export default function AxisBankPage() {
  return <BankPageTemplate data={banksData["axis-bank"]} />;
}
