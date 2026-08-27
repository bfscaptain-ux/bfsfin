const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.rewardTarget.create({
    data: {
      title: "Win a 4N/5D Trip to Thailand! ✈️",
      description: "Disburse loans worth ₹20 Crores before December 31st, 2026 and pack your bags for an all-expenses-paid premium vacation to Thailand.",
      targetValue: 20, // 20 Crores
      imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
      isActive: true,
    }
  });
  console.log("Reward target seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
