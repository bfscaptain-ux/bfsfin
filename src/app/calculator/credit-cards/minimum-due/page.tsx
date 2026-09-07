"use client";

import React, { useState, useMemo } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyCTA, CalculatorFAQ, DualInput, CalculatorChart, FormulaAndExample, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export default function MinimumDueCalculator() {
  const [billAmount, setBillAmount] = useState<number>(100000);
  const [apr, setApr] = useState<number>(42);

  const calculatePayoff = (principal: number, yearlyApr: number, percentPayment: number) => {
    let balance = principal;
    const monthlyRate = yearlyApr / 100 / 12;
    let totalInterest = 0;
    let months = 0;
    const floor = Math.max(500, principal * 0.01); // Floor payment so it eventually ends

    while (balance > 0 && months < 1200) { // cap at 100 years
      months++;
      const interest = balance * monthlyRate;
      totalInterest += interest;
      balance += interest;
      
      let payment = Math.max(balance * (percentPayment / 100), floor);
      if (payment >= balance) {
        payment = balance;
        balance = 0;
      } else {
        balance -= payment;
      }
    }

    return {
      months,
      years: (months / 12).toFixed(1),
      totalInterest: Math.round(totalInterest),
      totalPaid: Math.round(principal + totalInterest),
    };
  };

  const minPaymentResult = useMemo(() => calculatePayoff(billAmount, apr, 5), [billAmount, apr]);
  const tenPercentResult = useMemo(() => calculatePayoff(billAmount, apr, 10), [billAmount, apr]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const chartData = [
    { name: "Principal Debt", value: billAmount },
    { name: "Total Interest Trap", value: minPaymentResult.totalInterest },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden"><Header /></div>
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20">
        
        {/* Dynamic Header Section */}
        <div className="bg-white dark:bg-[#0a0f1c] pt-12 pb-16 px-4 relative overflow-hidden print:hidden mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/10 dark:bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-red-800/30 to-transparent" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-widest mb-6 border border-red-100 dark:border-red-500/20 shadow-sm">
              Financial Eye-Opener
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              The Minimum Due <span className="text-red-500">Trap</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Credit cards trick you into paying only 5% of your bill. See how this "small" payment leads to decades of debt and astronomical interest.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl mb-16">
            
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-emerald-800/50">
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900 border border-red-100 dark:border-red-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Minimum Due Trap</h3>
                <p className="text-sm text-slate-500 dark:text-emerald-400/80 font-medium">See the true cost of 5% payments</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Side Inputs */}
              <div className="lg:col-span-7 space-y-8">
                <DualInput label="Outstanding Bill Amount" value={billAmount} min={5000} max={2000000} step={5000} prefix="₹" onChange={setBillAmount} />
                <DualInput label="Annual Percentage Rate (APR)" value={apr} min={10} max={60} step={0.5} suffix="%" onChange={setApr} />
                
                <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                  <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">If you only pay 5% Minimum Due...</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    You will end up paying a massive <strong className="text-red-600 dark:text-red-500 text-lg">{formatCurrency(minPaymentResult.totalInterest)}</strong> purely in interest charges over <strong className="text-slate-900 dark:text-white">{minPaymentResult.years} years</strong>!
                  </p>
                </div>
              </div>

              {/* Right Side Results */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="text-center sm:text-left">
                      <div className="text-emerald-300/80 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                        Total Amount Paid
                      </div>
                      <div className="text-5xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tighter">
                        <span className="text-3xl text-emerald-400/70">₹</span>
                        {minPaymentResult.totalPaid.toLocaleString("en-IN")}
                      </div>
                      <p className="text-sm text-red-400 font-medium mt-2">Original Debt was only {formatCurrency(billAmount)}</p>
                    </div>

                    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-left">
                      <div className="flex flex-col mb-1">
                        <span className="text-slate-400 text-sm">Time taken to clear debt:</span>
                        <span className="text-white font-bold text-lg">{minPaymentResult.months} Months ({minPaymentResult.years} Yrs)</span>
                      </div>
                    </div>

                    <div className="h-48 w-full relative my-2">
                      <CalculatorChart data={chartData} colors={['#10b981', '#ef4444']} />
                    </div>

                    <button className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Escape the Trap (Convert to EMI)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <FormulaAndExample 
            formulaName="The Snowballing Interest Trap" 
            formulaText="Balance_NextMonth = (Balance_Current + Interest) - Max(5% of Balance, MinimumFloor)"
            exampleText="Suppose you owe ₹1,00,000 on a credit card charging 42% APR (3.5% monthly). If you decide to pay only the 5% minimum due, your first payment is ₹5,000. But before that, ₹3,500 interest is added! So you effectively only reduced your debt by ₹1,500. Next month, your balance is ₹98,500, your 5% payment drops, and the cycle continues indefinitely. Result? You pay over ₹1.4 Lakhs in interest over 9.5 years just to clear a 1 Lakh debt!"
          />

          <HowToUse steps={[
            "Input your total outstanding credit card bill.",
            "Input the card's APR (usually around 42%).",
            "See the terrifying reality of what happens if you pay only the 5% Minimum Amount Due every month."
          ]} />

          <CalculatorFAQ calculatorId="minimum-due" />

          <RelatedCalculators tools={[
            { name: "Credit Card Payoff Tool", link: "/calculator/credit-cards/payoff", desc: "Calculate exact months to pay off debt with fixed monthly payments." },
            { name: "Balance Transfer Savings", link: "/tools/balance-transfer", desc: "See how much interest you save by transferring card debt to a loan." },
            { name: "Reward Points Tracker", link: "/calculator/credit-cards/rewards", desc: "Find out if your card's rewards actually outweigh the fees." }
          ]} />
        </div>
      </main>
      
      <StickyCTA 
        resultLabel="Interest Lost in 5% Trap" 
        resultValue={formatCurrency(minPaymentResult.totalInterest)} 
        ctaText="Convert to EMI" 
        ctaLink="/apply" 
      />
      <Footer />
    </div>
  );
}
