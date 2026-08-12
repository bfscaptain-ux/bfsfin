import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const partner = await prisma.user.findUnique({
    where: { email: "partner@bfs.com" }
  });

  if (!partner) return console.error("Partner not found.");

  // Check if profile exists, if not create one
  const profile = await prisma.partnerProfile.upsert({
    where: { userId: partner.id },
    update: { partnerCode: "BFS-PT-001" },
    create: {
      userId: partner.id,
      partnerCode: "BFS-PT-001",
      companyName: "Demo Partner Agency",
      tier: "Platinum",
      commissionRate: "2.5%",
      status: "Active"
    }
  });

  console.log("Partner updated with Code:", profile.partnerCode);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
