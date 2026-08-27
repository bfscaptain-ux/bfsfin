const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Adding detailed case study...");
  
  await prisma.testimonial.create({
    data: {
      name: "Ramesh Chandra",
      role: "Manufacturing Business Owner",
      location: "Faridabad",
      stars: 5,
      quote: "Bhardwaj Finance didn't just get me a loan; they literally saved my factory from shutting down.",
      detail: "", // Keeping this empty so the UI falls back to Challenge/Solution/Result
      challenge: "Our manufacturing unit was facing a severe cash crunch due to delayed payments from two major clients. We needed ₹1.5 Crores urgently to pay our suppliers and workers. We approached three major banks, but our application was rejected because our recent balance sheet showed a temporary dip in profits. The situation was desperate, and we were considering shutting down production.",
      solution: "The team at Bhardwaj Finance took the time to understand the root cause of our cash flow issues rather than just looking at the P&L statement. They restructured our application to highlight our strong order book and consistent GST returns. Within 48 hours, they negotiated directly with the credit manager of a leading NBFC, presenting a solid case for our business viability.",
      result: "Not only did we get the ₹1.5 Crore working capital loan sanctioned in just 6 days, but they also secured it at an interest rate 1.5% lower than what we expected. We paid our suppliers on time, retained our workforce, and are now operating at 100% capacity again.",
      loanAmount: "₹1.5 Crores",
      daysTaken: "6 Days",
      bankName: "Bajaj Finserv",
      rate: "10.5%",
      slug: "ramesh-chandra-manufacturing-loan",
      // Adding a placeholder photo URL (Lorem Picsum or similar) just so it looks complete.
      photoUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
    }
  });

  console.log("Detailed case study added successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
