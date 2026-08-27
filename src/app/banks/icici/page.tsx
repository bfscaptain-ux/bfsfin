import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["icici"].seoTitle,
  description: banksData["icici"].seoDescription,
};

export default function ICICIPage() {
  return <BankPageTemplate data={banksData["icici"]} />;
}
