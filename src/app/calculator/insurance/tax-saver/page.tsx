"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyCTA, CalculatorFAQ, DualInput, CalculatorChart, FormulaAndExample, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export default function TaxBenefitCalculator() {
  const [taxSlab, setTaxSlab] = useState<number>(0.3);
  const [termPremium, setTermPremium] = useState<number>(50000);
  const [healthPremiumSelf, setHealthPremiumSelf] = useState<number>(15000);
  const [healthPremiumParents, setHealthPremiumParents] = useState<number>(0);

  const allowed80C = Math.min(termPremium, 150000);
  const allowed80DSelf = Math.min(healthPremiumSelf, 25000);
  const allowed80DParents = Math.min(healthPremiumParents, 50000);
  
  const totalDeduction = allowed80C + allowed80DSelf + allowed80DParents;
  const taxSaved = totalDeduction * taxSlab;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = [
    { name: "Sec 80C (Term Life)", value: allowed80C },
    { name: "Sec 80D (Self/Family)", value: allowed80DSelf },
    { name: "Sec 80D (Parents)", value: allowed80DParents }
  ].filter(item => item.value > 0);

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
              Tax Optimization Tool
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              80C & 80D Tax Saver
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Calculate your maximum potential tax savings by correctly declaring your life and health insurance premiums.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl mb-16">
            
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-emerald-800/50">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">80C & 80D Tax Saver</h3>
                <p className="text-sm text-slate-500 dark:text-emerald-400/80 font-medium">Maximize your deductions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Side Inputs */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Tax Slab Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Your Income Tax Slab</label>
                  <div className="flex flex-wrap gap-3">
                    {[5, 10, 20, 30].map((slab) => (
                      <button
                        key={slab}
                        onClick={() => setTaxSlab(slab / 100)}
                        className={`flex-1 py-3 px-4 text-sm font-bold rounded-xl transition shadow-sm ${
                          taxSlab === slab / 100
                            ? "bg-emerald-600 text-white shadow-emerald-500/30"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {slab}%
                      </button>
                    ))}
                  </div>
                </div>

                <DualInput label="Term Life Insurance Premium (80C)" value={termPremium} min={0} max={300000} step={1000} prefix="₹" onChange={setTermPremium} />
                <DualInput label="Health Premium: Self & Family (80D)" value={healthPremiumSelf} min={0} max={100000} step={1000} prefix="₹" onChange={setHealthPremiumSelf} />
                <DualInput label="Health Premium: Senior Citizen Parents (80D)" value={healthPremiumParents} min={0} max={100000} step={1000} prefix="₹" onChange={setHealthPremiumParents} />
              </div>

              {/* Right Side Results */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="text-center sm:text-left">
                      <div className="text-emerald-300/80 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                        Total Tax Saved
                      </div>
                      <div className="text-5xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tighter">
                        <span className="text-3xl text-emerald-400/70">₹</span>
                        {taxSaved.toLocaleString("en-IN")}
                        <span className="text-base text-emerald-400/70 font-medium ml-1">/yr</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-left space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-slate-400 text-sm">80C Exemption:</span>
                        <span className="text-white font-bold">{formatCurrency(allowed80C)}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-slate-400 text-sm">80D (Self):</span>
                        <span className="text-white font-bold">{formatCurrency(allowed80DSelf)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">80D (Parents):</span>
                        <span className="text-white font-bold">{formatCurrency(allowed80DParents)}</span>
                      </div>
                    </div>

                    {chartData.length > 0 && (
                      <div className="h-56 w-full relative my-6">
                        <CalculatorChart data={chartData} colors={['#10b981', '#3b82f6', '#8b5cf6']} />
                      </div>
                    )}

                    <button className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Buy Insurance & Save Tax
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <FormulaAndExample 
            formulaName="Tax Benefit Limits (80C & 80D)" 
            formulaText="Tax Saved = [ Min(LifePrem, ₹1.5L) + Min(SelfHealth, ₹25k) + Min(ParentsHealth, ₹50k) ] × Tax Slab %"
            exampleText="Suppose you are in the 30% tax slab. You pay ₹50,000 for Term Life (which is fully covered under the 1.5L limit of 80C). You pay ₹20,000 for your family's health insurance (fully covered under 25k limit). And you pay ₹40,000 for your senior citizen parents (fully covered under 50k limit). Total deduction = 50k + 20k + 40k = ₹1,10,000. Your net tax savings = 30% of ₹1,10,000 = ₹33,000!"
          />

          <HowToUse steps={[
            "Select your current income tax bracket.",
            "Input your annual Term Insurance (80C) and Health Insurance (80D) premiums.",
            "See your exact tax savings. The tool automatically applies government upper limits for exemptions."
          ]} />

          <CalculatorFAQ calculatorId="tax-saver" />

          <RelatedCalculators tools={[
            { name: "Health Premium Estimator", link: "/calculator/insurance/health-premium", desc: "Calculate expected premiums for individual and family health insurance." },
            { name: "Human Life Value (HLV)", link: "/calculator/insurance/hlv", desc: "Determine how much Term Life Insurance your family needs." },
            { name: "EMI Calculator", link: "/calculator", desc: "Calculate your standard personal or home loan EMI." }
          ]} />
        </div>
      </main>
      
      {taxSaved > 0 && (
        <StickyCTA 
          resultLabel="Total Tax Saved" 
          resultValue={formatCurrency(taxSaved)} 
          ctaText="Invest to Save Tax" 
          ctaLink="/apply" 
        />
      )}
      <Footer />
    </div>
  );
}
