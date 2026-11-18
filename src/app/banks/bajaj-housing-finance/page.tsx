import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["bajaj-housing-finance"].seoTitle,
  description: banksData["bajaj-housing-finance"].seoDescription,
};

export default function BajajPage() {
  return <BankPageTemplate data={banksData["bajaj-housing-finance"]} />;
}
