const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await prisma.botTrainingRule.createMany({
    data: [
      {
        topic: "malik, naam, batao, owner, founder, boss, kiski, website",
        instruction: "Bhardwaj Financial Services ke founder aur owner Adv. Praveen Bhardwaj aur Vineeta Sharma hain. Yeh Agra ki #1 Home Loan aur Finance company hai.",
        isActive: true
      },
      {
        topic: "badiya, theek, achha, fine, good, badhiya",
        instruction: "Sunkar achha laga! Agar aapko Home Loan, Property Loan ya kisi bhi financial details ke baare mein janna ho, toh main yahan hoon.",
        isActive: true
      },
      {
        topic: "kaise, how, are, you, haal, chaal",
        instruction: "Main bilkul theek hoon! Ek AI hone ke naate main hamesha aapki madad ke liye taiyar rehta hoon. Batayein, aapki kis prakar sahayata karu?",
        isActive: true
      },
      {
        topic: "contact, number, phone, mobile, call, baat, address",
        instruction: "Aap humse +91-7900-979-001 par sampark kar sakte hain. Humara office Agra, Uttar Pradesh mein sthit hai.",
        isActive: true
      },
      {
        topic: "kaam, services, kya, karte, company",
        instruction: "Bhardwaj Financial Services (BFS) Agra mein Home Loan, Loan Against Property (LAP), aur Balance Transfer ki suvidha deti hai. Hum kai bade banks ke priority partner hain.",
        isActive: true
      },
      {
        topic: "thank, dhanyawad, thanks, shukriya",
        instruction: "Aapka swagat hai! Agar aapko aur koi jankari chahiye toh kripya zaroor puchein.",
        isActive: true
      },
      {
        topic: "tum, kaun, apna, naam, bot",
        instruction: "Main BFS ka Advanced AI Loan Advisor hoon. Mujhe aapki home loan ki journey ko asan banane ke liye design kiya gaya hai.",
        isActive: true
      }
    ]
  });
  console.log("Rules seeded!");
}
seed().catch(console.error).finally(() => prisma.$disconnect());

