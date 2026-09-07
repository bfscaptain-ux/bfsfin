const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const deepKnowledge = [
    // --- CIBIL & Credit Score ---
    {
      intent: "CIBIL_SCORE_MEANING",
      keywords: "cibil kya hai, cibil score, credit score, cibil kyu jaruri",
      response: "CIBIL score ek 3-digit number (300-900) hota hai jo aapki credit history dikhata hai. 750+ score par sabse best interest rates milte hain. Agar aapka score kam hai, toh bhi hum kuch specific banks (jaise kuch NBFCs) se loan try kar sakte hain.",
      category: "CIBIL"
    },
    {
      intent: "LOW_CIBIL_LOAN",
      keywords: "kam cibil, low cibil, cibil kharab, 600 cibil, cibil down",
      response: "Agar aapka CIBIL score kam hai (650 se kam), toh bade private/PSU banks directly loan nahi dete. Par ghabrayein nahi! Humare paas HFCs (Housing Finance Companies) aur NBFCs ke options hain jo low CIBIL par bhi loan de sakte hain. Interest rate thoda zyada ho sakta hai.",
      category: "CIBIL"
    },
    {
      intent: "ZERO_CIBIL_LOAN",
      keywords: "zero cibil, cibil nahi hai, minus one cibil, pehla loan",
      response: "Agar aapka CIBIL -1 ya 0 hai (yani aapne pehle kabhi loan nahi liya), toh isko 'New to Credit' kehte hain. Hum bilkul aapko Home Loan dila sakte hain! Sirf aapki income aur banking acchi honi chahiye.",
      category: "CIBIL"
    },
    // --- Co-Applicant & Family ---
    {
      intent: "CO_APPLICANT_BENEFITS",
      keywords: "co-applicant, wife ko add, mummy ko add, joint loan, sanyukt",
      response: "Wife ya kisi earning family member ko Co-applicant bananeke bahot fayde hain: 1) Aapki loan eligibility badh jati hai. 2) Agar co-applicant mahila (woman) hai, toh kuch banks interest rate mein 0.05% ki chhoot (discount) dete hain! 3) Tax benefits dono log claim kar sakte hain.",
      category: "Application"
    },
    {
      intent: "WHO_CAN_BE_CO_APPLICANT",
      keywords: "kisko co applicant, bhai ko add, friend ko add, dost ko add",
      response: "Blood relatives (Parents, Bhaai) ya Spouse (Husband/Wife) ko hi co-applicant banaya jaa sakta hai. Doston (Friends) ya dur ke rishtedaron ko Home Loan mein co-applicant nahi bana sakte.",
      category: "Application"
    },
    // --- Prepayment & Foreclosure ---
    {
      intent: "PREPAYMENT_PENALTY",
      keywords: "jaldi band karna, pre pay, prepayment, foreclose penalty, jaldi jama",
      response: "RBI ke naye rules ke anusar, agar aapka Home Loan 'Floating Interest Rate' par hai (jo normally hota hai), toh jaldi loan band karne (Foreclosure) ya extra paisa jama karne (Part-prepayment) par KOI penalty ya charge nahi lagta!",
      category: "Rules"
    },
    // --- Taxation Benefits ---
    {
      intent: "TAX_BENEFITS",
      keywords: "tax benefit, tax bachao, 80c, income tax, tax chhoot",
      response: "Home Loan par double Tax Benefit milta hai! \n1. Section 80C: Principal amount par 1.5 Lakh tak ki chhoot. \n2. Section 24(b): Interest amount par 2 Lakh tak ki chhoot. Total 3.5 Lakh tak ka tax deduction claim kar sakte hain!",
      category: "Tax"
    },
    // --- Property Types ---
    {
      intent: "GRAM_PANCHAYAT_PROPERTY",
      keywords: "gram panchayat, gaon ki jameen, lal dora, abadi jameen, nagar palika",
      response: "Gram Panchayat ya aabadi ki zameen par bhi hum home loan karwa sakte hain, par iske liye property ka 'Patta' ya valid registry honi zaroori hai. Aise cases mein HFCs (Housing Finance) best option rehte hain.",
      category: "Property"
    },
    {
      intent: "RERA_APPROVED",
      keywords: "rera kya hai, rera approved, rera jaruri, rera",
      response: "RERA (Real Estate Regulatory Authority) ek government body hai jo builders par nazar rakhti hai. Agar aap naya flat/plot le rahe hain, toh uska RERA registered hona zaroori hai. Isse aapke paise surakshit rehte hain.",
      category: "Property"
    },
    // --- Business Loans ---
    {
      intent: "BUSINESS_LOAN_DOCS",
      keywords: "business loan document, vyapar loan, dukaan ke liye loan",
      response: "Business Loan ke liye aamtaur par ye documents lagte hain: 1) 3 saal ki ITR, 2) 1 saal ka Bank Statement, 3) GST Certificate / Udyam Aadhar, 4) Business proof (Gumasta/Shop Act). Without ITR walon ke liye bhi humare paas special schemes hain!",
      category: "Business Loan"
    },
    // --- Balance Transfer (BT) ---
    {
      intent: "BALANCE_TRANSFER_PROCESS",
      keywords: "balance transfer, purana loan transfer, bt karna, interest rate kam",
      response: "Agar aapka purana loan mehnga chal raha hai, toh aap use dusre bank mein transfer (BT) karwa sakte hain. Isse aapka Interest Rate kam ho jayega aur EMI bhi ghat jayegi. Humein apna current Sanction Letter bhejein, hum best BT offer dilwayenge!",
      category: "Balance Transfer"
    },
    {
      intent: "TOP_UP_LOAN",
      keywords: "top up, extra loan, aur paisa chahiye, purane par naya",
      response: "Agar aapka existing Home Loan acche se chal raha hai, toh aap uspar 'Top-Up Loan' le sakte hain. Ye paisa aap ghar ke renovation, shadi, ya personal kaam ke liye use kar sakte hain, aur iska rate Personal Loan se bahot sasta hota hai!",
      category: "Loan Types"
    },
    // --- Subsidies ---
    {
      intent: "PMAY_SUBSIDY",
      keywords: "pmay, pradhan mantri awas yojana, subsidy, sarkari chhut",
      response: "Pradhan Mantri Awas Yojana (PMAY) ke tahat pehle 2.67 Lakh tak ki subsidy milti thi. Halanki, sarkar dwara ye scheme abhi band/hold par hai. Agar koi nayi sarkari scheme aati hai toh hum aapko zaroor update karenge.",
      category: "Schemes"
    }
  ];

  console.log("Seeding deep financial knowledge into BotTrainingRule...");
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
  console.log(`✅ Successfully added ${count} new deep knowledge rules!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
