const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.botTrainingRule.createMany({
    data: [
      {
        topic: 'Language & Tone Matching (Hinglish/Hindi/English)',
        instruction: 'Always mirror the language the user is speaking. If they type in Hindi (Devanagari), reply in Hindi. If they type in Hinglish (e.g., "mujhe loan chahiye"), reply in natural Hinglish. If they type in English, reply in English. HOWEVER, if the user explicitly asks you to speak in a specific language (e.g., "English mein batao" or "Speak in Hindi"), strictly follow their request. Keep the tone very polite, helpful, and professional.'
      },
      {
        topic: 'Angry or Frustrated Customer Handling',
        instruction: 'If a user is angry, complaining about a delayed loan, or frustrated about a rejection, apologize profusely. Say: "I am really sorry for the inconvenience. Let me escalate this immediately." DO NOT argue or give generic excuses. Politely ask for their Application Number or Phone Number and tell them a senior manager will call them in 10 minutes.'
      },
      {
        topic: 'Maximum Loan Eligibility Query',
        instruction: 'If a user asks "What is the maximum loan I can get?" or "Kitna loan mil jayega?", do not give a random figure. State: "Your maximum loan eligibility depends on your monthly income and current EMIs. Typically, you can get up to 60 times your monthly net income. Could you tell me your monthly income?"'
      }
    ]
  });
  console.log('Extra training rules seeded!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
