import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { Building2, TrendingDown, Zap, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProductsLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b132b] text-slate-100 font-sans">
      <Header />

      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Enterprise Loan Suite
          </span>
          <h1 className="text-4xl font-black text-white">BFS Agra Loan Products</h1>
          <p className="text-slate-400 text-sm">
            Processing ₹20L to ₹1Cr+ home loans with 5-day sanction guarantee across PNB, Central Bank, IDBI &amp; top partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/40">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">New Home Loan</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Buy ready flat, under-construction home, plot + construction, or self-built property in Agra.
            </p>
            <div className="text-emerald-400 font-black text-xl">Rates from 6.50% p.a. • Up to 30 Yrs</div>
            <Link href="/products/home-loan" className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs">
              <span>View Home Loan Details</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/40">
              <TrendingDown className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Home Loan Balance Transfer</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Paying high interest on existing loan? Transfer to PNB or Cent Bank &amp; save up to ₹20 Lakhs.
            </p>
            <div className="text-blue-400 font-black text-xl">Special BT Rate: 6.45% p.a.</div>
            <Link href="/products/balance-transfer" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs">
              <span>Calculate BT Savings</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/40">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Top-Up Loan</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get instant cash on top of your ongoing home loan for renovation, business, or personal use.
            </p>
            <div className="text-emerald-400 font-black text-xl">Up to ₹50 Lakhs Extra</div>
            <Link href="/products/top-up-loan" className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs">
              <span>View Top-Up Terms</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/40">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Loan Against Property (LAP)</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlock funds against residential or commercial property with high LTV &amp; low interest.
            </p>
            <div className="text-emerald-400 font-black text-xl">Up to 70% Property Market Value</div>
            <Link href="/products/loan-against-property" className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs">
              <span>Know LAP Eligibility</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
