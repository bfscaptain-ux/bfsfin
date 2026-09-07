"use client";

import React, { useState, useMemo } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyCTA, CalculatorFAQ, DualInput, CalculatorChart, FormulaAndExample, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

const CATEGORIES = [
  { id: 'travel', name: 'Travel', rate: 0.05, max: 50000, step: 1000 },
  { id: 'online', name: 'Online Shopping', rate: 0.03, max: 50000, step: 1000 },
  { id: 'grocery', name: 'Grocery', rate: 0.02, max: 30000, step: 1000 },
  { id: 'dining', name: 'Dining', rate: 0.02, max: 30000, step: 1000 },
  { id: 'fuel', name: 'Fuel', rate: 0.01, max: 20000, step: 500 },
];

export default function RewardPointsEstimator() {
  const [spends, setSpends] = useState({
    travel: 10000,
    online: 15000,
    grocery: 10000,
    dining: 5000,
    fuel: 3000,
  });

  const handleSliderChange = (id: string, value: number) => {
    setSpends(prev => ({ ...prev, [id]: value }));
  };

  const { totalMonthlyCashback, totalAnnualCashback, topCategory } = useMemo(() => {
    let monthly = 0;
    let highestSpend = 0;
    let topCatName = '';

    CATEGORIES.forEach(cat => {
      const spend = spends[cat.id as keyof typeof spends];
      monthly += spend * cat.rate;

      if (spend > highestSpend) {
        highestSpend = spend;
        topCatName = cat.name;
      }
    });

    return {
      totalMonthlyCashback: monthly,
      totalAnnualCashback: monthly * 12,
      topCategory: topCatName,
    };
  }, [spends]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const chartData = CATEGORIES.map(cat => ({
    name: cat.name,
    value: spends[cat.id as keyof typeof spends] * cat.rate * 12
  })).filter(d => d.value > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden"><Header /></div>
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20">

        {/* Dynamic Header Section */}
        <div className="bg-white dark:bg-[#0a0f1c] pt-12 pb-16 px-4 relative overflow-hidden print:hidden mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 dark:bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-yellow-800/30 to-transparent" />

          <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold text-xs uppercase tracking-widest mb-6 border border-yellow-100 dark:border-yellow-500/20 shadow-sm">
              Reward Maximizer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              Credit Card Rewards Calculator
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Find out how much cashback and reward points you can earn annually based on your monthly spending habits.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl mb-16">

            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-emerald-800/50">
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 dark:bg-yellow-900 border border-yellow-100 dark:border-yellow-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Reward Maximizer</h3>
                <p className="text-sm text-slate-500 dark:text-emerald-400/80 font-medium">Earn cashback on every spend</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Side Inputs */}
              <div className="lg:col-span-7 space-y-8">
                {CATEGORIES.map(cat => (
                  <DualInput
                    key={cat.id}
                    label={cat.name}
                    value={spends[cat.id as keyof typeof spends]}
                    min={0}
                    max={cat.max}
                    step={cat.step}
                    prefix="₹"
                    onChange={(val) => handleSliderChange(cat.id, val)}
                  />
                ))}
              </div>

              {/* Right Side Results */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                  <div className="space-y-8 relative z-10">
                    <div className="text-center sm:text-left">
                      <div className="text-emerald-300/80 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                        Total Annual Value
                      </div>
                      <div className="text-5xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tighter">
                        <span className="text-3xl text-yellow-400/90">₹</span>
                        <span className="text-yellow-400">{totalAnnualCashback.toLocaleString("en-IN")}</span>
                        <span className="text-base text-yellow-400/70 font-medium ml-1">/yr</span>
                      </div>
                      <p className="text-sm text-yellow-400/60 font-medium mt-2">Earned via cashback &amp; points</p>
                    </div>

                    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-left space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-slate-400 text-sm">Monthly Value:</span>
                        <span className="text-white font-bold">{formatCurrency(totalMonthlyCashback)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Highest Category:</span>
                        <span className="text-emerald-400 font-bold">{topCategory || 'None'}</span>
                      </div>
                    </div>

                    {chartData.length > 0 && (
                      <div className="h-48 w-full relative my-2">
                        <CalculatorChart data={chartData} colors={['#eab308', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6']} />
                      </div>
                    )}

                    <button className="w-full py-4 px-6 bg-yellow-500 hover:bg-yellow-400 transition-colors text-slate-900 font-bold rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                      Find Best Card For You
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FormulaAndExample
            formulaName="Reward Value Estimation"
            formulaText="Annual Value = Σ (Monthly Spend in Category × Category Reward Rate) × 12"
            exampleText="If you spend ₹10,000 on Travel (at a 5% reward rate) and ₹15,000 on Online Shopping (at a 3% reward rate) every month. Your monthly cashback will be (10,000 × 0.05) + (15,000 × 0.03) = ₹500 + ₹450 = ₹950 per month. Over a year, this amounts to ₹950 × 12 = ₹11,400 in pure savings or free flights!"
          />

          <HowToUse steps={[
            "Estimate your average monthly spending across different categories like Travel, Groceries, and Online Shopping.",
            "Use the sliders to input these amounts.",
            "Instantly see how much free money or reward points you are leaving on the table if you use cash or debit cards."
          ]} />

          <CalculatorFAQ calculatorId="rewards" />

          <RelatedCalculators tools={[
            { name: "Credit Card Payoff Tool", link: "/calculator/credit-cards/payoff", desc: "Calculate exact months to pay off debt with fixed monthly payments." },
            { name: "Minimum Due Trap", link: "/calculator/credit-cards/minimum-due", desc: "See why paying only 5% minimum due is the worst financial mistake." },
            { name: "EMI Calculator", link: "/calculator", desc: "Calculate your standard personal or home loan EMI." }
          ]} />
        </div>
      </main>

      {totalAnnualCashback > 0 && (
        <StickyCTA
          resultLabel="Your Annual Savings"
          resultValue={formatCurrency(totalAnnualCashback)}
          ctaText="Apply for Card"
          ctaLink="/apply"
        />
      )}
      <Footer />
    </div>
  );
}
