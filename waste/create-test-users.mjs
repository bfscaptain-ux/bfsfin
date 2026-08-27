import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const partnerPassword = await bcrypt.hash("Partner@123", 10);

  // Upsert Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@bfs.com" },
    update: { password: adminPassword, role: "ADMIN", name: "BFS Admin", phone: "1111111111" },
    create: {
      email: "admin@bfs.com",
      phone: "1111111111",
      password: adminPassword,
      role: "ADMIN",
      name: "BFS Admin",
      city: "Agra"
    }
  });
  console.log("Admin created:", admin.email);

  // Upsert Partner
  const partner = await prisma.user.upsert({
    where: { email: "partner@bfs.com" },
    update: { password: partnerPassword, role: "PARTNER", name: "BFS Partner", phone: "2222222222" },
    create: {
      email: "partner@bfs.com",
      phone: "2222222222",
      password: partnerPassword,
      role: "PARTNER",
      name: "BFS Partner",
      city: "Agra"
    }
  });
  console.log("Partner created:", partner.email);

  // Upsert Client
  const clientPassword = await bcrypt.hash("Client@123", 10);
  const client = await prisma.user.upsert({
    where: { email: "client@bfs.com" },
    update: { password: clientPassword, role: "CUSTOMER", name: "Demo Client", phone: "3333333333" },
    create: {
      email: "client@bfs.com",
      phone: "3333333333",
      password: clientPassword,
      role: "CUSTOMER",
      name: "Demo Client",
      city: "Agra"
    }
  });
  console.log("Client created:", client.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
