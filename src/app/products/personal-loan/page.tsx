import PersonalLoanClient from './PersonalLoanClient';
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: 'Personal Loan | BFS',
  description: 'Achieve your personal goals with fast, unsecured personal loans up to ₹50 Lakhs at starting rates of 10.50% from BFS India.',
};

export default async function PersonalLoanPage() {
  const heroImage = await prisma.heroImage.findUnique({ where: { pageId: 'products/personal-loan' } });
  
  return <PersonalLoanClient heroImageUrl={heroImage?.imageUrl || undefined} />;
}
