import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["lic-housing-finance"].seoTitle,
  description: banksData["lic-housing-finance"].seoDescription,
};

export default function LICHFLPage() {
  return <BankPageTemplate data={banksData["lic-housing-finance"]} />;
}
