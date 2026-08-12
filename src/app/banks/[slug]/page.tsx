import BankPageTemplate from "@/components/templates/BankPageTemplate";
import { banksData } from "@/data/banksData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bank = banksData[params.slug];
  
  if (!bank) {
    return {
      title: "Bank Not Found",
    };
  }

  return {
    title: bank.seoTitle,
    description: bank.seoDescription,
  };
}

export function generateStaticParams() {
  return Object.keys(banksData).map((slug) => ({
    slug: slug,
  }));
}

export default function DynamicBankPage({ params }: Props) {
  const bank = banksData[params.slug];

  if (!bank) {
    notFound();
  }

  return <BankPageTemplate data={bank} />;
}
