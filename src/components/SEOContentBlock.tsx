"use client";

import { MapPin, HelpCircle, TrendingUp, ShieldCheck } from "lucide-react";

export default function SEOContentBlock({ productName = "Loan" }: { productName?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main SEO Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            Best {productName} Provider in India - Top Interest Rates in {currentYear}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Finding the right financial solution shouldn't be complicated. At Bhardwaj Finance Services, we bring you India's most trusted and transparent {productName} solutions tailored to your unique needs. Whether you are in Delhi NCR, Mumbai, Bangalore, or anywhere across India, our digital-first process ensures you get the funds you need instantly.
          </p>
        </div>

        {/* Detailed Benefits (AEO & SEO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
            <TrendingUp className="w-10 h-10 text-emerald-600 dark:text-emerald-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Our {productName}?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Our {productName} offers one of the most competitive interest rates in the Indian market today. We understand that borrowing money requires careful planning, which is why we offer flexible repayment tenures, minimal documentation, and zero hidden charges.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              When you apply for a {productName} with us, you benefit from our robust network of 50+ banking partners and NBFCs across India.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Eligibility & Documentation</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Getting approved for a {productName} in India requires basic KYC (Aadhaar, PAN), income proof (Salary Slips or ITR), and a healthy CIBIL score. We cater to both salaried professionals and self-employed individuals.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Our dedicated experts guide you through the digital documentation process to ensure a hassle-free, paperless experience that gets your loan disbursed in record time.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
            <MapPin className="w-10 h-10 text-amber-600 dark:text-amber-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Pan-India Availability</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Bhardwaj Finance Services operates seamlessly across major metropolitan cities including New Delhi, Gurugram, Noida, Mumbai, Pune, Bengaluru, Chennai, Hyderabad, and Kolkata.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We also provide extensive support in Tier 2 and Tier 3 cities, ensuring that premium financial services for your {productName} needs are accessible no matter where you reside in India.
            </p>
          </div>
        </div>

        {/* Long Form SEO Text */}
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Navigating the {productName} Landscape in India</h3>
          <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            <p>
              In today's fast-paced Indian economy, securing a {productName} should empower your financial journey, not hinder it. The Reserve Bank of India (RBI) continuously updates guidelines to make lending more transparent, and we strictly adhere to these practices to protect our customers' interests.
            </p>
            <p>
              Whether you are looking to finance a major life event, consolidate existing debts, expand your business operations, or purchase property, understanding the nuances of a {productName} is critical. Factors such as the repo rate, your credit utilization ratio, and the internal policies of banks play a significant role in determining your final interest rate and loan amount eligibility.
            </p>
            <p>
              At Bhardwaj Finance Services, we utilize advanced AI-driven algorithms to analyze your credit profile instantly and match you with the lending partner that offers the most favorable terms. This ensures a high approval rate and prevents unnecessary inquiries on your CIBIL report, keeping your credit health intact while you secure the best {productName}.
            </p>
          </div>
        </div>

        {/* FAQ Schema for AEO */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 justify-center">
            <HelpCircle className="w-8 h-8 text-blue-600" /> Frequently Asked Questions
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">What is the minimum CIBIL score required for a {productName} in India?</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Generally, a CIBIL score of 750 or above is considered ideal for securing a {productName} at the best interest rates. However, we have partnered with certain NBFCs that may consider scores starting from 650, depending on other factors like income stability and employment history.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">How long does the {productName} approval process take?</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                With our 100% digital application process, initial approvals can be generated within minutes. Following successful document verification and KYC, the final disbursement for a {productName} typically occurs within 24 to 48 working hours directly to your registered bank account.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Are there any prepayment charges for closing the {productName} early?</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                As per RBI guidelines, floating-rate loans for individuals often do not attract prepayment penalties. However, for fixed-rate or business-related {productName}s, lenders may charge a nominal fee ranging from 2% to 4% on the outstanding principal. We provide complete transparency on all such charges upfront before you sign the loan agreement.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
