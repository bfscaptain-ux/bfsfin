"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyCTA, CalculatorFAQ, DualInput, CalculatorChart, FormulaAndExample, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(50000);
  const [apr, setApr] = useState(36);
  const [monthlyPayment, setMonthlyPayment] = useState(5000);

  const [months, setMonths] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    calculatePayoff();
  }, [balance, apr, monthlyPayment]);

  const calculatePayoff = () => {
    if (balance <= 0 || monthlyPayment <= 0 || apr < 0) {
      setMonths(null);
      setTotalInterest(null);
      setWarning(null);
      return;
    }

    const r = (apr / 100) / 12;
    const interestPerMonth = balance * r;

    if (monthlyPayment <= interestPerMonth && apr > 0) {
      setWarning("Your monthly payment is less than the interest generated. You will never pay off this debt at this rate.");
      setMonths(null);
      setTotalInterest(null);
      return;
    }

    setWarning(null);

    if (apr === 0) {
      const m = Math.ceil(balance / monthlyPayment);
      setMonths(m);
      setTotalInterest(0);
      return;
    }

    let remaining = balance;
    let interestAccumulated = 0;
    let count = 0;
    
    // Simulate payoff month by month
    while (remaining > 0 && count < 1200) { // cap at 100 years
      const interest = remaining * r;
      interestAccumulated += interest;
      remaining = remaining + interest - monthlyPayment;
      count++;
    }
    
    setMonths(count);
    setTotalInterest(interestAccumulated);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const totalPaid = totalInterest !== null ? balance + totalInterest : 0;
  
  const chartData = [
    { name: "Principal (Original Debt)", value: balance },
    { name: "Total Interest Paid", value: totalInterest || 0 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden"><Header /></div>
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20">
        
        {/* Dynamic Header Section */}
        <div className="bg-white dark:bg-[#0a0f1c] pt-12 pb-16 px-4 relative overflow-hidden print:hidden mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/10 dark:bg-rose-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-rose-800/30 to-transparent" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-widest mb-6 border border-rose-100 dark:border-rose-500/20 shadow-sm">
              Debt Management Tool
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              Credit Card Payoff Calculator
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Find out exactly how many months it will take to pay off your credit card debt and see how much you are losing to interest.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl mb-16">
            
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-emerald-800/50">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-900 border border-rose-100 dark:border-rose-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600 dark:text-rose-400"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Credit Card Payoff</h3>
                <p className="text-sm text-slate-500 dark:text-emerald-400/80 font-medium">Plan your debt repayment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Side Inputs */}
              <div className="lg:col-span-7 space-y-8">
                <DualInput label="Outstanding Balance" value={balance} min={1000} max={1000000} step={1000} prefix="₹" onChange={setBalance} />
                <DualInput label="Annual Percentage Rate (APR)" value={apr} min={0} max={60} step={0.5} suffix="%" onChange={setApr} />
                <DualInput label="Monthly Payment Capability" value={monthlyPayment} min={500} max={100000} step={500} prefix="₹" onChange={setMonthlyPayment} />
              </div>

              {/* Right Side Results */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="space-y-8 relative z-10">
                    
                    {warning ? (
                      <div className="text-red-400 font-medium">
                        {warning}
                      </div>
                    ) : months !== null && totalInterest !== null ? (
                      <>
                        <div className="text-center sm:text-left">
                          <div className="text-emerald-300/80 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                            Time to Payoff
                          </div>
                          <div className="text-5xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tighter">
                            {months} <span className="text-2xl text-emerald-400/70 font-medium ml-1">Months</span>
                          </div>
                          {months > 12 && <p className="text-rose-400 font-bold mt-2">({Math.floor(months / 12)} years and {months % 12} months)</p>}
                        </div>

                        <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-left">
                          <div className="flex justify-between mb-2">
                            <span className="text-slate-400 text-sm">Total Interest:</span>
                            <span className="text-rose-400 font-bold">{formatCurrency(totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Total Paid:</span>
                            <span className="text-white font-bold">{formatCurrency(totalPaid)}</span>
                          </div>
                        </div>

                        <div className="h-56 w-full relative my-6">
                          <CalculatorChart data={chartData} colors={['#10b981', '#f43f5e']} />
                        </div>

                        <button className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] mb-3">
                          Convert to Low EMI Loan
                        </button>
                        <button className="w-full py-3 px-6 bg-transparent border border-slate-600 hover:border-slate-400 transition-colors text-slate-300 font-semibold rounded-xl">
                          Explore Balance Transfer
                        </button>
                      </>
                    ) : (
                      <div className="text-slate-400">Enter valid numbers above.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <FormulaAndExample 
            formulaName="Credit Card Interest & Payoff Time" 
            formulaText="N = -log(1 - (r * P) / A) / log(1 + r)"
            exampleText="Suppose you have ₹50,000 in credit card debt at an APR of 36% (which is 3% per month). If you pay ₹5,000 every month, the formula calculates the number of months required to bring the balance to zero. In this case, you will pay off the debt in 13 months, but you will have paid ₹8,745 purely in interest! That means you ended up paying ₹58,745 for a ₹50,000 debt."
          />

          <HowToUse steps={[
            "Enter your outstanding credit card balance.",
            "Input the Annual Percentage Rate (APR) charged by your bank (usually 36-42%).",
            "See instantly how many months it takes to become debt-free, and how much you lose in interest."
          ]} />

          <CalculatorFAQ calculatorId="payoff" />

          <RelatedCalculators tools={[
            { name: "Minimum Due Trap", link: "/calculator/credit-cards/minimum-due", desc: "See why paying only 5% minimum due is the worst financial mistake." },
            { name: "Balance Transfer Calculator", link: "/tools/balance-transfer", desc: "Check how much you can save by moving your loan or card balance." },
            { name: "EMI Calculator", link: "/calculator", desc: "Calculate your monthly EMI for a standard personal or home loan." }
          ]} />
        </div>
      </main>
      
      {!warning && months !== null && (
        <StickyCTA 
          resultLabel="Total Time to Payoff" 
          resultValue={`${months} Months`} 
          ctaText="Lower Your EMI" 
          ctaLink="/apply" 
        />
      )}
      <Footer />
    </div>
  );
}
