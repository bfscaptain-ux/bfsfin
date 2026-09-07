"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyCTA, CalculatorFAQ, DualInput, CalculatorChart, FormulaAndExample, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export default function HLVCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [liabilities, setLiabilities] = useState<number>(2000000);
  const [savings, setSavings] = useState<number>(500000);

  const [hlv, setHlv] = useState<number>(0);

  useEffect(() => {
    // Logic: Rough HLV = (Annual Income * (Retirement Age - Current Age)) + Liabilities - Savings
    const yearsWorking = Math.max(0, retirementAge - currentAge);
    let calculatedHlv = (annualIncome * yearsWorking) + liabilities - savings;
    if (calculatedHlv < 0) calculatedHlv = 0;
    setHlv(calculatedHlv);
  }, [currentAge, retirementAge, annualIncome, liabilities, savings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const chartData = [
    { name: "Income Replacement", value: Math.max(0, annualIncome * Math.max(0, retirementAge - currentAge)) },
    { name: "Outstanding Liabilities", value: liabilities },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden"><Header /></div>
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20">
        
        {/* Dynamic Header Section */}
        <div className="bg-white dark:bg-[#0a0f1c] pt-12 pb-16 px-4 relative overflow-hidden print:hidden mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-emerald-800/30 to-transparent" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
              Precision Financial Tool
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              Human Life Value Calculator
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Estimate your true financial value and determine the optimal life insurance cover to protect your family.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl mb-16">
            
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-emerald-800/50">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Smart HLV Calculator</h3>
                <p className="text-sm text-slate-500 dark:text-emerald-400/80 font-medium">Protect your family's future</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Side Inputs */}
              <div className="lg:col-span-7 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DualInput label="Current Age" value={currentAge} min={18} max={65} suffix=" yrs" onChange={setCurrentAge} />
                  <DualInput label="Retirement Age" value={retirementAge} min={40} max={75} suffix=" yrs" onChange={setRetirementAge} />
                </div>
                <DualInput label="Annual Income" value={annualIncome} min={300000} max={50000000} step={100000} prefix="₹" onChange={setAnnualIncome} />
                <DualInput label="Monthly Expenses" value={monthlyExpenses} min={10000} max={1000000} step={5000} prefix="₹" onChange={setMonthlyExpenses} />
                <DualInput label="Outstanding Liabilities" value={liabilities} min={0} max={50000000} step={500000} prefix="₹" onChange={setLiabilities} />
                <DualInput label="Current Savings" value={savings} min={0} max={50000000} step={500000} prefix="₹" onChange={setSavings} />
              </div>

              {/* Right Side Results */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="text-center sm:text-left">
                      <div className="text-emerald-300/80 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                        Recommended Life Cover
                      </div>
                      <div className="text-5xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tighter">
                        <span className="text-3xl text-emerald-400/70">₹</span>
                        {hlv.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="h-56 w-full relative my-6">
                      <CalculatorChart data={chartData} colors={['#10b981', '#f59e0b', '#3b82f6']} />
                    </div>

                    <button className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Get Quotes for {formatCurrency(hlv)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <FormulaAndExample 
            formulaName="Human Life Value (HLV)" 
            formulaText="HLV = [Annual Income × (Retirement Age - Current Age)] + Liabilities - Existing Savings"
            exampleText="Suppose you are 30 years old, retiring at 60. Your annual income is ₹10,00,000. You have an outstanding home loan of ₹20,00,000 and current savings of ₹5,00,000. Your working years left are 30. Your future income replacement is 30 × ₹10 Lakhs = ₹3 Crores. Adding liabilities (₹20 Lakhs) and subtracting savings (₹5 Lakhs) gives a total required life cover of ₹3.15 Crores."
          />

          <HowToUse steps={[
            "Enter your current age, retirement age, and annual income.",
            "Add your outstanding liabilities (loans) and current savings.",
            "Instantly view your recommended life insurance cover and get quotes."
          ]} />

          <CalculatorFAQ calculatorId="hlv" />

          <RelatedCalculators tools={[
            { name: "Health Premium Estimator", link: "/calculator/insurance/health-premium", desc: "Calculate expected premiums for individual and family health insurance." },
            { name: "80C & 80D Tax Saver", link: "/calculator/insurance/tax-saver", desc: "Calculate how much income tax you can save by buying insurance policies." },
            { name: "Debt Payoff Tool", link: "/calculator/credit-cards/payoff", desc: "Find out how long it will take to pay off your credit card debt." }
          ]} />
        </div>
      </main>
      
      <StickyCTA 
        resultLabel="Recommended Life Cover" 
        resultValue={formatCurrency(hlv)} 
        ctaText="Get Quotes" 
        ctaLink="/apply" 
      />
      <Footer />
    </div>
  );
}
