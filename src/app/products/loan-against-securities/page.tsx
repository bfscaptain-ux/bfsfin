import type { Metadata } from "next";
import ProductPageTemplate from "@/components/templates/ProductPageTemplate";
import { productsData } from "@/data/productsData";

const product = productsData["loan-against-securities"];

export const metadata: Metadata = {
  title: product.seoTitle,
  description: product.seoDescription,
};

export default function LASPage() {
  return <ProductPageTemplate data={product} />;
}
