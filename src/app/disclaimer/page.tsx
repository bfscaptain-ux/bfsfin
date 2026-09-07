import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, AlertTriangle, Scale, Landmark, FileText, CheckCircle2, 
  HelpCircle, PhoneCall, Mail, ChevronRight, Lock, Award
} from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Disclaimer & Regulatory Disclosures | Bhardwaj Financial Services",
  description: "Official statutory disclosures, regulatory compliance standards, anti-fraud advisory, and limitation of liability for Bhardwaj Financial Services (BFS Agra).",
  alternates: {
    canonical: "https://bhardwajfinance.com/disclaimer",
  }
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans text-slate-800 dark:text-slate-200">
      <Header />

      {/* 1. HERO HEADER */}
      <section className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-5">
            <Scale className="w-3.5 h-3.5 text-emerald-400" /> Regulatory Transparency & Disclosures
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Legal Disclaimer & Terms of Disclosure
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please read these statutory regulatory disclosures, intermediary terms, and customer advisories carefully before utilizing the services of Bhardwaj Financial Services.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-emerald-300/80 font-medium">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Version: 2.4 (RBI Digital Lending Compliant)</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT BODY */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Anti-Fraud Warning Box */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-6 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-300 font-extrabold text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            Critical Anti-Fraud & Customer Protection Notice
          </div>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200/90 leading-relaxed font-medium">
            Bhardwaj Financial Services (BFS Agra) operates under a <strong>strict Zero Advance Fee policy</strong>. Neither BFS nor any of its employees, executives, or field agents will ever ask you to transfer cash or processing charges into personal bank accounts, or request confidential OTPs, passwords, or UPI PINs over the phone. All legitimate banking fees are payable directly to the sanctioned banking institution via verified official gateways.
          </p>
        </div>

        {/* Section 1: Nature of Organization & Intermediary Status */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Nature of Services & Intermediary Status
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Direct Sales Agent (DSA) & Corporate Channel Partner</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Bhardwaj Financial Services</strong> (hereinafter referred to as &quot;BFS&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;the Platform&quot;), having its principal corporate office at <strong>Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Palace, Agra, Uttar Pradesh - 282002</strong>, operates exclusively as an authorized Direct Selling Agent (DSA), loan distribution partner, corporate facilitator, and multi-lender aggregator.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            BFS is <strong>not a Non-Banking Financial Company (NBFC)</strong>, Bank, or primary underwriting credit institution as defined under the Reserve Bank of India (RBI) Act, 1934. We do not independently sanction, underwrite, lend, or disburse funds from our balance sheet. We bridge the gap between retail borrowers and our authorized lending banking partners.
          </p>
        </section>

        {/* Section 2: Loan Approvals & Disbursals */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Credit Appraisal, Sanction & Disbursal Disclaimers
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Sole discretion of partnering Banks & NBFCs</span>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span><strong>Final Sanction Authority:</strong> All credit evaluations, eligibility assessments, document verifications (KYC, property legal vetting, technical evaluation), and final loan sanction decisions rest solely at the discretion of the partner Bank or NBFC chosen by the applicant.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span><strong>Interest Rates & Terms:</strong> Rates of Interest (ROI), whether fixed or floating, loan tenures, processing fees, loan-to-value (LTV) ratios, and loan amounts are determined exclusively by the lender based on the applicant&apos;s credit score (CIBIL/Experian), income verification, and internal risk matrix.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span><strong>No Guarantee of Approval:</strong> Submitting an application on this portal or through a BFS representative does not guarantee sanction or disbursal. BFS accepts no liability for loan rejection, delayed processing, or reduction in sanction amount caused by bank appraisal norms.</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Financial Calculators & Indicative Tools */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Indicative Calculators & Information Accuracy
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Estimators and illustrative financial models</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            All calculators available on this website — including the <strong>Home Loan EMI Calculator, Loan Eligibility Checker, Balance Transfer Savings Estimator, Prepayment Impact Tool, and Stamp Duty Calculator</strong> — are programmed for general estimation and illustrative purposes only.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            The results generated do not constitute an official loan quotation or sanction letter. Actual EMI amounts, amortization schedules, and charges may vary depending on the lender&apos;s compounding cycle, odd-days interest calculations, and benchmark repo rate adjustments.
          </p>
        </section>

        {/* Section 4: Insurance & Credit Card Offerings */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              4
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Insurance Solicitation & Credit Card Disclosures
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">IRDAI & Issuer Guidelines</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Insurance Products:</strong> Insurance is the subject matter of solicitation. BFS acts as a referral/distribution partner for IRDAI-licensed general and life insurance companies. Any policy issued is an agreement solely between the insured policyholder and the underwriting insurance company. All claims, coverage disputes, and settlements are subject to policy terms and conditions.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Credit Cards:</strong> Credit cards displayed on the website are issued by the respective banking institutions (e.g. HDFC Bank, SBI Card, ICICI Bank, Axis Bank). Joining fees, annual renewal charges, reward structures, interest-free credit cycles, and credit limit sanctioning are governed strictly by the issuing bank&apos;s cardholder agreement.
          </p>
        </section>

        {/* Section 5: Data Privacy & Communication Consent */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              5
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Customer Consent & Electronic Communications
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Authorization for Phone, SMS, Email & WhatsApp</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            By submitting your personal details (Name, Contact Number, Email Address, PAN/Aadhaar information, or Loan Requirement) on this website, you expressly authorize Bhardwaj Financial Services and its authorized representatives to contact you via <strong>Phone Call, SMS, WhatsApp, and Email</strong> to assist you with your application, share sanction updates, and communicate relevant financial offers.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            This consent overrides any National Customer Preference Register (NCPR) or Do Not Disturb (DND) registration on your mobile number in respect of transactional and advisory updates concerning your submitted request.
          </p>
        </section>

        {/* Section 6: Grievance Redressal & Contact Escalation */}
        <section className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/60 rounded-3xl p-6 sm:p-10 text-white space-y-6">
          <div className="flex items-center gap-3 border-b border-emerald-800/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              6
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                Grievance Redressal & Nodal Officer Contact
              </h2>
              <span className="text-xs text-emerald-300/80">Formal escalation matrix for customer feedback</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-emerald-100/80">
            In compliance with our commitment to fair practices, any complaint, discrepancy, or feedback regarding our advisory staff, DSA channel executives, or data handling may be registered directly with our Grievance Redressal Cell:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-800/40 space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Official Calling Helpline</span>
              <p className="font-bold text-white text-base">+91 9258-724-227</p>
              <p className="text-slate-400">Available: Mon - Sat (10:00 AM to 6:30 PM)</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-800/40 space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">WhatsApp & Email Desk</span>
              <p className="font-bold text-white text-base">+91 7900-979-001</p>
              <p className="text-slate-400">Email: <a href="mailto:info@bfsfin.com" className="text-emerald-400 hover:underline">info@bfsfin.com</a></p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400">
            <strong>Registered Address:</strong> Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Palace, Sanjay Place, Agra, Uttar Pradesh - 282002.
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
