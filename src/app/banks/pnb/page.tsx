import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: banksData["pnb"].seoTitle,
  description: banksData["pnb"].seoDescription,
};

export default function PNBPage() {
  return <BankPageTemplate data={banksData["pnb"]} />;
}
