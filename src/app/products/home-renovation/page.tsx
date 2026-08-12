import type { Metadata } from "next";
import ProductPageTemplate from "@/components/templates/ProductPageTemplate";
import { productsData } from "@/data/productsData";

const product = productsData["home-renovation"];

export const metadata: Metadata = {
  title: product.seoTitle,
  description: product.seoDescription,
};

export default function HomeRenovationPage() {
  return <ProductPageTemplate data={product} />;
}
