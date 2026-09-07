const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const allFaqs = [

  // ============================================================
  // HLV – Human Life Value Calculator (6 FAQs)
  // ============================================================
  { calculatorId: 'hlv', sortOrder: 0, question: 'What is Human Life Value (HLV)?', answer: 'Human Life Value (HLV) is a calculated estimate of the total financial loss your family would suffer if you were to pass away today. It considers your current income, future earning potential, outstanding liabilities, and existing savings to determine the ideal life insurance cover you should carry.' },
  { calculatorId: 'hlv', sortOrder: 1, question: 'Why should I subtract my current savings from the HLV?', answer: 'Your existing savings and investments (FDs, mutual funds, PPF) can already be used by your family in your absence. Subtracting them gives you the exact insurance shortfall — meaning you only buy the cover you actually need, saving unnecessary premium costs.' },
  { calculatorId: 'hlv', sortOrder: 2, question: 'Does this HLV calculator account for inflation?', answer: 'This calculator uses the Income Replacement Method which provides a solid base estimate. For a more precise inflation-adjusted calculation, speak with our expert advisors who factor in your expected salary growth and long-term inflation (typically 6-7% per annum in India).' },
  { calculatorId: 'hlv', sortOrder: 3, question: 'What is the recommended life cover for a 30-year-old earning ₹10 Lakhs/year?', answer: 'Using the HLV method: 30 working years × ₹10 Lakhs = ₹3 Crores income replacement. Adding liabilities (e.g., ₹20 Lakhs home loan) and subtracting savings (e.g., ₹5 Lakhs) gives a recommended cover of approximately ₹3.15 Crores. A term plan for this costs roughly ₹800–₹1,200 per month.' },
  { calculatorId: 'hlv', sortOrder: 4, question: 'Is term insurance the best product to cover the HLV gap?', answer: 'Yes. Term Insurance is the most cost-effective pure protection product. For a ₹1–₹5 Crore cover, term plans from LIC, HDFC Life, ICICI Prudential, and Tata AIA cost as little as ₹500–₹1,500 per month, making them ideal for covering your HLV gap affordably.' },
  { calculatorId: 'hlv', sortOrder: 5, question: 'Should I include my spouse\'s income when calculating HLV?', answer: 'If your spouse is also an earning member, calculate HLV separately for both of you. Joint coverage through two separate term plans ensures that your family is protected even if either of you passes away. It is the most comprehensive approach to family financial security.' },

  // ============================================================
  // Health Insurance Premium Estimator (6 FAQs)
  // ============================================================
  { calculatorId: 'health-premium', sortOrder: 0, question: 'Why does the age of the eldest member affect the premium so much?', answer: 'In a family floater plan, the premium is calculated based on the oldest member\'s age. Actuarial data shows hospitalization probability increases significantly with age — a 55-year-old causes the floater premium to be nearly 3x compared to a plan for a 30-year-old.' },
  { calculatorId: 'health-premium', sortOrder: 1, question: 'What is the difference between Individual and Family Floater health plans?', answer: 'An Individual plan gives a separate, dedicated sum insured to each covered person. A Family Floater gives a shared sum insured (e.g., ₹10 Lakhs shared among all members). Floaters are 30–40% cheaper but carry the risk of the full sum being used by one member\'s single hospitalization.' },
  { calculatorId: 'health-premium', sortOrder: 2, question: 'How much health insurance cover do I really need?', answer: 'For families in Tier 1 cities (Delhi, Mumbai), a minimum of ₹15–₹20 Lakhs is recommended due to high hospital costs. For Tier 2/3 cities, ₹7–₹10 Lakhs is generally sufficient. Always factor in 10% annual medical inflation when choosing long-term cover.' },
  { calculatorId: 'health-premium', sortOrder: 3, question: 'What is the difference between Tier 1 and Tier 2 city premiums?', answer: 'Tier 1 cities have higher ICU charges, room rent, and specialist fees. Insurers charge 10–15% higher premiums for metro policyholders to offset these inflated healthcare costs compared to Tier 2/3 cities.' },
  { calculatorId: 'health-premium', sortOrder: 4, question: 'Does buying health insurance at a young age save money?', answer: 'Absolutely. A 25-year-old pays 40–50% less than a 45-year-old for the same cover. Early buying also builds a No Claim Bonus (NCB) which can increase your sum insured by up to 100% at no extra cost over the years, dramatically improving your coverage value.' },
  { calculatorId: 'health-premium', sortOrder: 5, question: 'Can I include my parents in a family floater plan?', answer: 'Most insurers allow parents in a floater but up to a certain age. Since older parents significantly raise premiums, it is usually more economical to buy a separate Senior Citizen Health plan (like Star Senior Red Carpet or New India Senior Mediclaim) exclusively for them.' },

  // ============================================================
  // 80C & 80D Tax Saver Calculator (6 FAQs)
  // ============================================================
  { calculatorId: 'tax-saver', sortOrder: 0, question: 'Can I claim both Section 80C and Section 80D simultaneously?', answer: 'Yes! Section 80C (up to ₹1.5 Lakhs — Life Insurance, PPF, ELSS etc.) and Section 80D (up to ₹75,000 — Health Insurance) are completely independent deductions. You can claim both simultaneously, saving a combined maximum of ₹68,250 in taxes at the 30% tax slab.' },
  { calculatorId: 'tax-saver', sortOrder: 1, question: 'What is the maximum tax deduction under Section 80D?', answer: 'Under 80D: ₹25,000 for self, spouse & children\'s health premium. Additional ₹25,000 for parents (below 60 years). Or ₹50,000 if parents are senior citizens (60+). Maximum combined deduction = ₹75,000 per year (₹25,000 + ₹50,000).' },
  { calculatorId: 'tax-saver', sortOrder: 2, question: 'Is Term Life Insurance premium eligible for 80C deduction?', answer: 'Yes, but only if the annual premium is within 10% of the Sum Assured. For example, a ₹1 Crore term plan with a ₹12,000/year premium qualifies fully under 80C as ₹12,000 is well within the 10% = ₹1 Lakh threshold.' },
  { calculatorId: 'tax-saver', sortOrder: 3, question: 'Does the New Tax Regime support 80C and 80D deductions?', answer: 'No. The New Tax Regime does NOT allow deductions under 80C, 80D, HRA, or most other sections. These deductions are exclusively available under the Old Tax Regime. Always compare both regimes with your actual numbers to determine which saves you more tax overall.' },
  { calculatorId: 'tax-saver', sortOrder: 4, question: 'Is GST paid on insurance premiums also tax deductible?', answer: 'No. Only the base premium (excluding 18% GST) is eligible for 80C and 80D deductions. If your annual health premium is ₹20,000 + ₹3,600 GST = ₹23,600 total paid, only ₹20,000 is deductible. The GST portion is not eligible.' },
  { calculatorId: 'tax-saver', sortOrder: 5, question: 'What if I pay cash for my insurance premium?', answer: 'For Section 80D (Health Insurance), cash payment is NOT allowed — premiums must be paid via cheque, net banking, UPI, or debit/credit card. For Section 80C (Life Insurance), cash is technically allowed but not recommended. Always use digital payment for audit proof and deduction eligibility.' },

  // ============================================================
  // Credit Card Payoff Calculator (6 FAQs)
  // ============================================================
  { calculatorId: 'payoff', sortOrder: 0, question: 'Why is credit card debt so expensive compared to other loans?', answer: 'Credit cards charge 2.5%–4% monthly interest, translating to an APR of 30%–48% per year. Compare this to personal loans at 10–18% or home loans at 8–9%. This compounding makes credit card debt the most expensive form of consumer debt in India by far.' },
  { calculatorId: 'payoff', sortOrder: 1, question: 'What is a Balance Transfer and how does it help?', answer: 'A Balance Transfer moves your high-interest credit card outstanding to a new bank at a lower rate (often 0% introductory for 3–6 months). This window lets you aggressively reduce the principal without interest piling up, potentially saving thousands in interest charges.' },
  { calculatorId: 'payoff', sortOrder: 2, question: 'Is it better to take a Personal Loan to clear credit card dues?', answer: 'Almost always yes. A personal loan at 12–15% per year is dramatically cheaper than a credit card\'s 36–48% APR. Converting your entire balance to a fixed EMI personal loan also gives you a definite payoff date and a structured plan, making it easier to become debt-free.' },
  { calculatorId: 'payoff', sortOrder: 3, question: 'How can I pay off ₹1 Lakh credit card debt quickly?', answer: 'If you pay ₹8,000/month against ₹1 Lakh at 42% APR, you\'ll be debt-free in ~15 months and pay ₹21,000 in interest. Alternatively, a personal loan at 14% APR for the same amount reduces total interest to under ₹8,000 — saving you ₹13,000+.' },
  { calculatorId: 'payoff', sortOrder: 4, question: 'Does unpaid credit card debt affect my CIBIL score?', answer: 'Yes, severely. A single missed payment reduces your CIBIL score by 50–100 points. If dues remain unpaid for 90+ days, the account is marked NPA (Non-Performing Asset), potentially dropping your score below 600 and making you ineligible for loans for up to 7 years.' },
  { calculatorId: 'payoff', sortOrder: 5, question: 'Should I use my savings/FD to pay off credit card debt?', answer: 'If your FD earns 6–7% and your credit card charges 42% APR, breaking the FD is the smarter move. The interest saved (42%) massively outweighs the FD interest lost (6–7%). Keep 3–6 months of expenses as an emergency fund, and use the rest to immediately clear the high-interest debt.' },

  // ============================================================
  // Minimum Due Trap Calculator (6 FAQs)
  // ============================================================
  { calculatorId: 'minimum-due', sortOrder: 0, question: 'What exactly is the Minimum Amount Due (MAD) on a credit card?', answer: 'MAD is typically 5% of your total outstanding balance (with a minimum floor of ₹200–₹500). While paying MAD avoids late payment fees, the bank charges compounding interest (2.5–4%/month) on the remaining 95% unpaid balance — creating a vicious debt cycle.' },
  { calculatorId: 'minimum-due', sortOrder: 1, question: 'Why does paying only minimum due take so many years to clear the debt?', answer: 'As your balance reduces, your minimum payment also reduces (MAD = 5% of balance). You\'re paying progressively less, while high interest eats most of each payment. A ₹1 Lakh balance paid only through MAD can take 9+ years to clear and cost ₹1.4 Lakhs in total interest alone.' },
  { calculatorId: 'minimum-due', sortOrder: 2, question: 'What is the "interest-free period" and when does it not apply?', answer: 'The interest-free period (20–50 days) applies ONLY if you pay your FULL outstanding balance by the due date. Once you pay less than the full amount (even just the minimum), the interest-free period is forfeited for all future purchases and interest is charged from the date of each transaction.' },
  { calculatorId: 'minimum-due', sortOrder: 3, question: 'How can I escape the minimum due trap quickly?', answer: 'Best strategies: (1) Take a Personal Loan at 12–15% to pay off the entire card balance. (2) Apply for a Balance Transfer to a 0% introductory rate card. (3) Liquidate non-essential assets like old FDs. (4) Pay more than the minimum every month — even ₹500 extra accelerates payoff dramatically.' },
  { calculatorId: 'minimum-due', sortOrder: 4, question: 'Does paying only the minimum due affect my CIBIL score?', answer: 'Yes. While you avoid a late payment penalty, consistently high credit utilization (balance above 30% of your credit limit) signals financial stress to CIBIL. This can reduce your credit score by 30–70 points, making future loans more expensive or outright rejected.' },
  { calculatorId: 'minimum-due', sortOrder: 5, question: 'Is the minimum due calculated the same way by all banks?', answer: 'No, it varies. HDFC and ICICI: 5% of outstanding. SBI: 5% or ₹200 (whichever is higher). Axis Bank: higher of 5% or a flat ₹500. Always check your card\'s terms — the exact MAD formula is printed on your monthly statement.' },

  // ============================================================
  // Credit Card Rewards Calculator (6 FAQs)
  // ============================================================
  { calculatorId: 'rewards', sortOrder: 0, question: 'Are reward points as valuable as direct cashback?', answer: 'It depends on the card. Direct cashback cards (like Amazon Pay ICICI or HDFC Millennia) credit money directly to your statement (1 point = ₹1). Standard reward points often have variable redemption values: 0.25–0.50 paise for catalog redemption vs ₹0.75–₹1 for travel/miles. Always check the redemption rate.' },
  { calculatorId: 'rewards', sortOrder: 1, question: 'Which credit card gives the highest rewards on online shopping in India?', answer: 'Top cards: (1) Amazon Pay ICICI — 5% on Amazon (Prime users), (2) Flipkart Axis Bank — 5% on Flipkart & Myntra, (3) HDFC Millennia — 5% cashback on all major online sites, (4) SBI SimplyCLICK — 10X rewards on selected partners. Best card depends on where you shop most.' },
  { calculatorId: 'rewards', sortOrder: 2, question: 'Do reward points expire? How long are they valid?', answer: 'Yes, most points have expiry dates. HDFC: 2 years. ICICI: 3 years. Axis Bank: 2 years. SBI Card: 2 years. Amazon Pay ICICI cashback: never expires. Always redeem accumulated points before renewal to avoid losing them — set a calendar reminder 30 days before expiry.' },
  { calculatorId: 'rewards', sortOrder: 3, question: 'Why do travel expenses earn more rewards than groceries?', answer: 'Banks have co-branded partnerships with airlines and travel portals (MakeMyTrip, Goibibo) earning higher merchant interchange fees from travel bookings. They pass a larger share back to you as accelerated reward points (5X–10X) to incentivize using the card for high-value travel purchases.' },
  { calculatorId: 'rewards', sortOrder: 4, question: 'What is the best strategy to maximize credit card reward points?', answer: 'Top strategies: (1) Use one card per spending category (travel card for flights, cashback card for groceries). (2) Consolidate spending to hit annual milestone bonuses. (3) Redeem points for flights/hotels where value is highest (1 point = ₹0.75–₹1). (4) NEVER carry a balance — interest charges erase all reward benefits completely.' },
  { calculatorId: 'rewards', sortOrder: 5, question: 'Should I pay an annual fee for a rewards credit card?', answer: 'Yes, if reward value exceeds the fee. Example: HDFC Regalia charges ₹2,500/year but gives 4 lounge accesses (worth ₹2,000) + renewal bonus points (worth ₹2,500+) + 4 reward points per ₹150 spent. If you spend ₹1 Lakh+/month, rewards easily offset the annual fee several times over.' }
];

async function seed() {
  // Clear existing entries and re-seed fresh
  const deleted = await prisma.calculatorFAQ.deleteMany({});
  console.log(`Cleared ${deleted.count} existing Calculator FAQs...`);

  for (const faq of allFaqs) {
    await prisma.calculatorFAQ.create({ data: faq });
  }

  console.log(`\n✅ Successfully seeded ${allFaqs.length} FAQs across 6 calculators!\n`);

  // Print count per calculator
  const ids = [...new Set(allFaqs.map(f => f.calculatorId))];
  for (const id of ids) {
    const count = allFaqs.filter(f => f.calculatorId === id).length;
    console.log(`  📋 ${id}: ${count} FAQs`);
  }
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
