import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Get the Partner User
  const partner = await prisma.user.findUnique({
    where: { email: "partner@bfs.com" }
  });

  if (!partner) {
    console.error("Partner not found. Run seed script first.");
    return;
  }

  // 2. Insert Lead from Normal Website (No Partner)
  const websiteLead = await prisma.lead.create({
    data: {
      name: "Ramesh Kumar (Website)",
      phone: "9876543210",
      email: "ramesh.website@example.com",
      city: "Mumbai",
      loanType: "Home Loan",
      loanAmount: 5000000,
      status: "NEW",
      source: "Website Direct",
      loanPurpose: "Lead submitted directly from the BFS normal website form."
    }
  });
  console.log("Inserted Website Lead:", websiteLead.name);

  // 3. Insert Lead from Partner Dashboard
  const partnerLead = await prisma.lead.create({
    data: {
      name: "Suresh Singh (Partner)",
      phone: "9988776655",
      email: "suresh.partner@example.com",
      city: "New Delhi",
      loanType: "Business Loan",
      loanAmount: 1500000,
      status: "NEW",
      source: "Partner Referral",
      userId: partner.id, // Linked to Partner!
      loanPurpose: "Lead submitted from Partner Dashboard by BFS Partner."
    }
  });
  console.log("Inserted Partner Lead:", partnerLead.name);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
