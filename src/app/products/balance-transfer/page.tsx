import type { Metadata } from "next";
import ProductPageTemplate from "@/components/templates/ProductPageTemplate";
import { productsData } from "@/data/productsData";
import BalanceTransferCalculator from "@/components/calculators/BalanceTransferCalculator";

const product = productsData["balance-transfer"];

export const metadata: Metadata = {
  title: product.seoTitle,
  description: product.seoDescription,
};

export default function BalanceTransferPage() {
  return <ProductPageTemplate data={product} calculator={<BalanceTransferCalculator />} />;
}
