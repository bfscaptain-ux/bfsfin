import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CompareBanksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b132b] text-slate-100 font-sans">
      <Header />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Smart Savings Comparison
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Compare Partner Banks &amp; Savings</h1>
          <p className="text-slate-400 text-xs">See total interest paid on ₹50 Lakh loan over 20 years across banks.</p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white">Bank Savings Breakdown (₹50L Loan / 20 Yrs)</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/40 space-y-3">
              <div className="text-emerald-400 font-extrabold text-sm uppercase">🥇 Punjab National Bank</div>
              <div className="text-2xl font-black text-white">6.50% p.a.</div>
              <div className="text-slate-300">Total Interest: <strong className="text-emerald-400">₹39.8 Lakhs</strong></div>
              <div className="text-slate-400">Monthly EMI: ₹37,279</div>
              <Link href="/apply" className="w-full block text-center bg-emerald-500 text-slate-950 font-bold py-2 rounded-xl">Apply with PNB</Link>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-blue-400 font-extrabold text-sm uppercase">🥈 Central Bank of India</div>
              <div className="text-2xl font-black text-white">6.70% p.a.</div>
              <div className="text-slate-300">Total Interest: <strong className="text-emerald-400">₹41.2 Lakhs</strong></div>
              <div className="text-slate-400">Monthly EMI: ₹37,872</div>
              <Link href="/apply" className="w-full block text-center bg-slate-800 text-slate-200 font-bold py-2 rounded-xl">Apply Cent Bank</Link>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-blue-400 font-extrabold text-sm uppercase">🥉 IDBI Bank</div>
              <div className="text-2xl font-black text-white">6.60% p.a.</div>
              <div className="text-slate-300">Total Interest: <strong className="text-emerald-400">₹40.5 Lakhs</strong></div>
              <div className="text-slate-400">Monthly EMI: ₹37,575</div>
              <Link href="/apply" className="w-full block text-center bg-slate-800 text-slate-200 font-bold py-2 rounded-xl">Apply IDBI</Link>
            </div>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs text-slate-200">
            <div>
              <span className="font-bold text-emerald-400 text-sm">Save ₹1.4 Lakhs to ₹2.5 Lakhs</span> in total interest by choosing PNB through BFS Agra!
            </div>
            <Link href="/apply" className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl">Get Lowest Rate Sanction</Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
