const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding 'feelings' and friendly tone to all bot rules...");
  
  const rules = await prisma.botTrainingRule.findMany();
  
  let count = 0;
  for (const rule of rules) {
    let newInstruction = rule.instruction;
    
    // Simple naive text replacement to inject warmth and emojis
    newInstruction = newInstruction.replace("CIBIL score ek 3-digit number", "Aapka CIBIL score ek 3-digit number");
    newInstruction = newInstruction.replace("Hum bilkul aapko Home Loan dila sakte hain!", "Hum bilkul aapko Home Loan dila sakte hain! 😊 Har kisi ka ek pehla loan hota hai.");
    newInstruction = newInstruction.replace("Interest rate thoda zyada ho sakta hai.", "Interest rate thoda zyada ho sakta hai, par chinta na karein, hum aapke liye sabse sasta option dhoondhenge! 🤝");
    newInstruction = newInstruction.replace("Wife ya kisi earning family member", "Family ko sath jodna hamesha accha hota hai! ❤️ Wife ya kisi earning family member");
    newInstruction = newInstruction.replace("Blood relatives", "Bank ke rules thode strict hote hain 😅 Blood relatives");
    newInstruction = newInstruction.replace("KOI penalty ya charge nahi lagta!", "KOI penalty ya charge nahi lagta! Toh aap araam se jaldi loan khatam karke tension free ho sakte hain! 🥳");
    newInstruction = newInstruction.replace("Total 3.5 Lakh tak ka tax deduction", "Total 3.5 Lakh tak ka tax deduction! Hai na kamaal ki baat? 💸");
    
    if (newInstruction !== rule.instruction) {
      await prisma.botTrainingRule.update({
        where: { id: rule.id },
        data: { instruction: newInstruction }
      });
      count++;
    }
  }
  
  console.log(`Updated ${count} rules with a more friendly tone!`);
}

main().finally(() => prisma.$disconnect());
