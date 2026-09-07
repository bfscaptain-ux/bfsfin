const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const deepKnowledge = [
    {
      intent: "HIDDEN_CHARGES",
      keywords: "hidden charge, extra paisa, processing fee, chhupe hue, fraud",
      response: "Hum poori tarah se transparent hain! 😇 Sirf bank ki standard processing fee lagti hai, jo pehle hi bata di jayegi. Humari taraf se koi chhupe hue (hidden) charges nahi hain. Aap bilkul befikr rahein! ✨"
    },
    {
      intent: "PROCESSING_TIME",
      keywords: "kitna time, kitne din, samay, time lagega, fast, approval time",
      response: "Humari koshish rehti hai ki aapko sabse fast service mile! 🚀 Aam taur par documents poore hone ke baad 5 se 7 din ke andar sanction aa jata hai. Agar profile strong hai, toh aur bhi jaldi ho sakta hai!"
    },
    {
      intent: "NRI_LOAN",
      keywords: "nri, nri loan, dubai, videsh, bahar rehta",
      response: "Ji haan! Hum NRI clients ke liye bhi Home Loan process karte hain. 🌍 NRI loan ka process thoda alag hota hai, par humari expert team isme aapki poori madad karegi. Kya aap current country bata sakte hain?"
    },
    {
      intent: "CIBIL_UPDATE",
      keywords: "cibil update, cibil theek, score improve, badhana",
      response: "CIBIL score theek karna ek lamba process hai, par namumkin nahi! 📈 Apne purane pending dues clear karein, aur naye loans lene se bachein. Agar aap chahein toh humari team aapko CIBIL improve karne ke tips de sakti hai."
    },
    {
      intent: "REJECTED_LOAN",
      keywords: "reject ho gaya, cancel ho gaya, nahi mila, mana kar diya",
      response: "Oh! 🥺 Agar pehle kisi bank ne loan reject kiya hai, toh chinta mat kijiye. Hum aapki profile ko deeply analyze karenge aur usi bank mein file layenge jo aapki profile ke hisaab se best ho. Hum reject hone ka reason theek kar sakte hain! 💪"
    }
  ];

  console.log("Seeding MORE advanced rules into BotTrainingRule...");
  let count = 0;
  for (const item of deepKnowledge) {
    const topic = item.intent + " - " + item.keywords;
    const existing = await prisma.botTrainingRule.findFirst({
      where: { topic }
    });
    if (!existing) {
      await prisma.botTrainingRule.create({ 
        data: {
          topic,
          instruction: item.response,
          isActive: true
        }
      });
      count++;
    }
  }
  console.log(`✅ Successfully added ${count} advanced conversational rules!`);
}

main().finally(() => prisma.$disconnect());
