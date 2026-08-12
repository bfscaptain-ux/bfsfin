import type { Metadata } from "next";
import ProductPageTemplate from "@/components/templates/ProductPageTemplate";
import { productsData } from "@/data/productsData";

const product = productsData["working-capital"];

export const metadata: Metadata = {
  title: product.seoTitle,
  description: product.seoDescription,
};

export default function WorkingCapitalPage() {
  return <ProductPageTemplate data={product} />;
}
