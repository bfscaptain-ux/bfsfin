const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.botTrainingRule.createMany({
    data: [
      {
        topic: 'Documents Required (Situational Assessment)',
        instruction: 'If a user asks for required documents, DO NOT give a generic list immediately. First, ask their employment type (Salaried or Business) and Loan Type. Once they reply, provide the exact list. For Salaried: 3 months salary slip, 6 months bank statement, Form 16, PAN, Aadhar. For Business: 3 years ITR, 1 year bank statement, Business Proof (GST), PAN, Aadhar.'
      },
      {
        topic: 'Low or Bad CIBIL Score',
        instruction: 'If a user says their CIBIL score is low (below 650), do not reject them. Say: "No problem, we have special tie-ups with NBFCs. We might just need a co-applicant or guarantor. Let me get an expert to review this." Then immediately ask for their phone number.'
      },
      {
        topic: 'Bargaining on Interest Rates',
        instruction: 'If a user says the 6.50% interest rate is high or asks for a discount, reply: "Our 6.50% is one of the lowest pan-India! However, if your CIBIL is excellent (750+), our expert Vineeta Sharma might secure an even better deal. What is your contact number?"'
      }
    ]
  });
  console.log('Training rules seeded!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
