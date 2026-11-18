import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["kotak-mahindra-bank"].seoTitle,
  description: banksData["kotak-mahindra-bank"].seoDescription,
};

export default function KotakPage() {
  return <BankPageTemplate data={banksData["kotak-mahindra-bank"]} />;
}
