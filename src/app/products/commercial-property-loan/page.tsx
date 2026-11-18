import type { Metadata } from "next";
import ProductPageTemplate from "@/components/templates/ProductPageTemplate";
import { productsData } from "@/data/productsData";
import EMICalculator from "@/components/EMICalculator";

const product = productsData["commercial-property-loan"];

export const metadata: Metadata = {
  title: product.seoTitle,
  description: product.seoDescription,
};

export default function CommercialPropertyLoanPage() {
  return <ProductPageTemplate data={product} calculator={<EMICalculator />} />;
}
