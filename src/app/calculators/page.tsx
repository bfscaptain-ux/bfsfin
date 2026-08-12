"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, CheckCircle2, TrendingUp, RotateCcw, Building2, Stamp, Percent, Activity, ChevronLeft, Loader2 } from "lucide-react";

// Loading Fallback
const CalculatorLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px]">
    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
    <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading Tool...</p>
  </div>
);

// Dynamic Imports (Lazy Loading)
const EMICalculator = dynamic(() => import("@/components/EMICalculator"), { loading: CalculatorLoader });
const QuickEligibility = dynamic(() => import("@/components/QuickEligibility"), { loading: CalculatorLoader });
const PrepaymentCalculator = dynamic(() => import("@/components/calculators/PrepaymentCalculator"), { loading: CalculatorLoader });
const BalanceTransferCalculator = dynamic(() => import("@/components/calculators/BalanceTransferCalculator"), { loading: CalculatorLoader });
const TaxBenefitCalculator = dynamic(() => import("@/components/calculators/TaxBenefitCalculator"), { loading: CalculatorLoader });
const StampDutyCalculator = dynamic(() => import("@/components/calculators/StampDutyCalculator"), { loading: CalculatorLoader });
const InterestRateCompare = dynamic(() => import("@/components/calculators/InterestRateCompare"), { loading: CalculatorLoader });
const AffordabilityCalculator = dynamic(() => import("@/components/calculators/AffordabilityCalculator"), { loading: CalculatorLoader });

const tools = [
  {
    id: "emi",
    title: "EMI Calc",
    component: EMICalculator,
    icon: Calculator,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/20"
  },
  {
    id: "eligibility",
    title: "Eligibility",
    component: QuickEligibility,
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20"
  },
  {
    id: "prepayment",
    title: "Prepayment",
    component: PrepaymentCalculator,
    icon: TrendingUp,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
    border: "border-purple-200 dark:border-purple-500/20"
  },
  {
    id: "balance-transfer",
    title: "Bal. Transfer",
    component: BalanceTransferCalculator,
    icon: RotateCcw,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20"
  },
  {
    id: "tax-benefit",
    title: "Tax Benefits",
    component: TaxBenefitCalculator,
    icon: Building2,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/20"
  },
  {
    id: "stamp-duty",
    title: "Stamp Duty",
    component: StampDutyCalculator,
    icon: Stamp,
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-500/10",
    border: "border-teal-200 dark:border-teal-500/20"
  },
  {
    id: "interest-compare",
    title: "Compare Rates",
    component: InterestRateCompare,
    icon: Percent,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-200 dark:border-indigo-500/20"
  },
  {
    id: "affordability",
    title: "Affordability",
    component: AffordabilityCalculator,
    icon: Activity,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
    border: "border-cyan-200 dark:border-cyan-500/20"
  }
];

export default function CalculatorsHubPage() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeTool = tools.find(t => t.id === activeToolId);
  const ActiveComponent = activeTool?.component;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-100 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 md:pt-24 pb-16 relative z-10 flex flex-col">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1">
          
          <AnimatePresence mode="wait">
            {!activeTool ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header Section for Grid */}
                <div className="text-center mb-8 md:mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-4">
                    <Calculator className="w-3.5 h-3.5" />
                    Tools Hub
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    Smart Calculators
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base px-4">
                    Tap any tool to instantly calculate without reloading.
                  </p>
                </div>

                {/* Sleek App Grid Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {tools.map((tool, idx) => (
                    <motion.button
                      key={tool.id}
                      onClick={() => setActiveToolId(tool.id)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * idx }}
                      className={`group flex flex-col items-center justify-center bg-white dark:bg-slate-900/80 rounded-3xl p-6 border ${tool.border} hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full aspect-square`}
                    >
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center ${tool.bg} ${tool.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner`}>
                        <tool.icon className="w-8 h-8 md:w-10 md:h-10" />
                      </div>
                      <h3 className="text-[13px] md:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-center leading-tight">
                        {tool.title}
                      </h3>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col"
              >
                <div className="mb-4 md:mb-6">
                  <button 
                    onClick={() => setActiveToolId(null)}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 font-bold transition-colors bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-800"
                  >
                    <ChevronLeft className="w-5 h-5" /> Back to Hub
                  </button>
                </div>
                
                <div className="w-full bg-white/50 dark:bg-slate-900/30 rounded-3xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 p-0 md:p-6 shadow-xl overflow-hidden">
                  {ActiveComponent && <ActiveComponent />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
