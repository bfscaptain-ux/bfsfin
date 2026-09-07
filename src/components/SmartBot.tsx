"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, ChevronRight, CheckCircle2, UserCircle2, Calculator, ThumbsUp, ThumbsDown, Mic, Maximize2, Minimize2, ArrowLeft, Volume2, VolumeX, Plus, MessageSquare, Trash2, Search, CreditCard, Shield, Sparkles, AlertCircle, Award, Check, AlertTriangle, ShieldCheck, MessageCircle, PhoneCall, ExternalLink } from "lucide-react";
import { processUserMessage } from "@/lib/nlp";
import { useRouter } from "next/navigation";
import { evaluateUnderwriting, ProductType, EmpType, SalaryMode, CibilTier, AgeBracket } from "@/lib/underwriting";
import { parseDocumentQuery } from "@/lib/documents";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[]; 
  widget?: "emi" | "eligibility" | "bt" | "ltv" | "loan_type" | "home_loan_purpose" | "business_profile" | "whatsapp_fallback";
  widgetData?: any;
  showFeedback?: boolean;
  feedbackState?: "none" | "liked" | "disliked";
};

type ChatStep = "GREETING" | "LOAN_TYPE_SELECTION" | "ASK_PROPERTY" | "ASK_CIBIL" | "LOAN_AMOUNT" | "EMP_TYPE" | "ASK_NAME" | "ASK_PHONE" | "SUBMITTING" | "SUCCESS" | "CLOSED" | "AWAITING_FEEDBACK" | "EMI_CALC" | "CALC_MODE" | "DOC_LOAN_TYPE" | "DOC_SUB_TYPE" | "DOC_EMP_TYPE" | "DOC_SALARY_TYPE" | "DOC_BIZ_TYPE" | "BT_CURRENT_BANK" | "BT_OTHER_BANK_NAME" | "BT_CURRENT_ROI" | "BT_VINTAGE" | "BT_EMI_BOUNCE" | "BT_OUTSTANDING";

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  currentStep: ChatStep;
  leadData: any;
  updatedAt: number;
};

const progressMap: Record<ChatStep, number> = {
  GREETING: 10, LOAN_TYPE_SELECTION: 15, ASK_PROPERTY: 25, ASK_CIBIL: 40, LOAN_AMOUNT: 55, EMP_TYPE: 70, ASK_NAME: 85, ASK_PHONE: 95, SUBMITTING: 100, SUCCESS: 100, CLOSED: 0, AWAITING_FEEDBACK: 10, EMI_CALC: 50, CALC_MODE: 50, DOC_LOAN_TYPE: 20, DOC_SUB_TYPE: 40, DOC_EMP_TYPE: 60, DOC_SALARY_TYPE: 80, DOC_BIZ_TYPE: 80, BT_CURRENT_BANK: 30, BT_OTHER_BANK_NAME: 35, BT_CURRENT_ROI: 45, BT_VINTAGE: 50, BT_EMI_BOUNCE: 60, BT_OUTSTANDING: 70
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

// --- WIDGETS ---
const InChatLoanTypeSelector = ({ onSelect }: { onSelect: (type: string) => void }) => {
  const options = [
    { label: "होम लोन (नया घर / फ्लैट / कंस्ट्रक्शन)", value: "Home Loan" },
    { label: "लोन अगेंस्ट प्रॉपर्टी (LAP / मॉर्गेज)", value: "LAP" },
    { label: "बैलेंस ट्रांसफर + टॉप-अप (मौजूदा लोन ट्रांसफर)", value: "Balance Transfer" },
    { label: "बिजनेस लोन / पर्सनल लोन (अनसिक्योर्ड)", value: "Business Loan" },
  ];
  return (
    <div className="bg-white rounded-xl mt-3 shadow-sm border border-slate-100 overflow-hidden font-sans">
      <div className="p-3.5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
        <div>
          <h4 className="font-bold text-slate-800 text-[13px]">आपको किस प्रकार के लोन की आवश्यकता है?</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">लोन का प्रकार चुनें</p>
        </div>
        <span className="text-[10px] font-medium text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md">Step 1/4</span>
      </div>
      <div className="flex flex-col">
        {options.map((opt, i) => (
          <button key={i} onClick={() => onSelect(opt.value)} className="w-full text-left px-3.5 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between group last:border-b-0">
            <span className="text-[12px] font-semibold text-slate-700">{opt.label}</span>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

const InChatEmiCalc = ({ onApply }: { onApply: (amount: number) => void }) => {
  const [amount, setAmount] = useState(2500000);
  const [tenure, setTenure] = useState(20);
  const rate = 6.50;
  
  const r = rate / 12 / 100;
  const n = tenure * 12;
  const emi = Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  return (
    <div className="bg-white rounded-xl p-4 mt-2 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-100 font-sans">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-emerald-100 rounded-lg"><Calculator className="w-4 h-4 text-emerald-600" /></div>
        <span className="font-bold text-slate-800 text-sm">EMI Calculator (6.50% Rate)</span>
      </div>
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Loan Amount</span><span className="text-emerald-600">₹{(amount/100000).toFixed(1)} L</span>
          </div>
          <input type="range" min="500000" max="50000000" step="100000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Tenure (Years)</span><span className="text-emerald-600">{tenure} Yrs</span>
          </div>
          <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 p-3 rounded-lg border border-emerald-100 mb-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Monthly EMI</p>
        <p className="text-2xl font-black text-emerald-700">₹{emi.toLocaleString('en-IN')}</p>
      </div>
      <button onClick={() => onApply(amount)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-md shadow-emerald-500/20">Apply for this amount</button>
    </div>
  );
};

const InChatBtCalc = ({ onApply }: { onApply: () => void }) => {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [currentRate, setCurrentRate] = useState(9.5);
  const [tenureLeft, setTenureLeft] = useState(15);
  const newRate = 6.50;

  const r1 = currentRate / 12 / 100;
  const n = tenureLeft * 12;
  const currentEmi = Math.round((loanAmount * r1 * Math.pow(1 + r1, n)) / (Math.pow(1 + r1, n) - 1));

  const r2 = newRate / 12 / 100;
  const newEmi = Math.round((loanAmount * r2 * Math.pow(1 + r2, n)) / (Math.pow(1 + r2, n) - 1));

  const monthlySavings = currentEmi - newEmi;
  const totalSavings = monthlySavings * n;

  return (
    <div className="bg-white rounded-xl p-4 mt-2 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-100 font-sans">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-purple-100 rounded-lg"><Calculator className="w-4 h-4 text-purple-600" /></div>
        <span className="font-bold text-slate-800 text-sm">BT Savings Calculator</span>
      </div>
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Existing Loan Amount</span><span className="text-purple-600">₹{(loanAmount/100000).toFixed(1)} L</span>
          </div>
          <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full accent-purple-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Your Current Rate</span><span className="text-red-500">{currentRate.toFixed(2)}%</span>
          </div>
          <input type="range" min="7.0" max="15.0" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="w-full accent-red-400 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Tenure Left</span><span className="text-purple-600">{tenureLeft} Yrs</span>
          </div>
          <input type="range" min="1" max="30" step="1" value={tenureLeft} onChange={(e) => setTenureLeft(Number(e.target.value))} className="w-full accent-purple-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 p-3 rounded-lg border border-purple-100 mb-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Savings (approx)</p>
        {totalSavings > 0 ? (
          <p className="text-2xl font-black text-purple-700">₹{totalSavings.toLocaleString('en-IN')}</p>
        ) : (
          <p className="text-sm font-bold text-red-500">Current rate is already good!</p>
        )}
      </div>
      <button onClick={onApply} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-md shadow-purple-500/20">Transfer Loan Now</button>
    </div>
  );
};

const InChatLtvCalc = ({ onApply }: { onApply: (amount: number) => void }) => {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [propertyType, setPropertyType] = useState("Flat"); // Flat, Plot, Commercial

  const ltvPercent = propertyType === "Flat" ? 0.8 : propertyType === "Plot" ? 0.7 : 0.6;
  const maxLoan = propertyValue * ltvPercent;

  return (
    <div className="bg-white rounded-xl p-4 mt-2 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-100 font-sans">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-indigo-100 rounded-lg"><Calculator className="w-4 h-4 text-indigo-600" /></div>
        <span className="font-bold text-slate-800 text-sm">Property LTV Calculator</span>
      </div>
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Property Value</span><span className="text-indigo-600">₹{(propertyValue/100000).toFixed(1)} L</span>
          </div>
          <input type="range" min="1000000" max="100000000" step="500000" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Property Type</span><span className="text-indigo-600">{propertyType}</span>
          </div>
          <div className="flex gap-2">
            {["Flat", "Plot", "Commercial"].map(type => (
              <button key={type} onClick={() => setPropertyType(type)} className={`flex-1 py-1.5 text-[10px] rounded-md font-bold transition-colors ${propertyType === type ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 p-3 rounded-lg border border-indigo-100 mb-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Max Loan Amount ({ltvPercent * 100}%)</p>
        <p className="text-2xl font-black text-indigo-700">₹{(maxLoan/100000).toFixed(1)} Lakhs</p>
      </div>
      <button onClick={() => onApply(maxLoan)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-md shadow-indigo-500/20">Proceed with this amount</button>
    </div>
  );
};

const InChatHomeLoanPurposeSelector = ({ onSelect }: { onSelect: (type: string) => void }) => {
  const options = [
    { label: "रेडी-टू-मूव फ्लैट या बना-बनाया मकान खरीदना है", value: "Ready to Move" },
    { label: "खाली प्लॉट पर खुद नया मकान बनाना है (Construction)", value: "Plot Construction" },
    { label: "प्लॉट खरीदना + मकान बनाना (Plot + Construction)", value: "Plot + Construction" },
    { label: "मौजूदा मकान का रिनोवेशन / एक्सटेंशन कराना है", value: "Renovation" },
  ];
  return (
    <div className="bg-white rounded-xl mt-3 shadow-sm border border-slate-100 overflow-hidden font-sans">
      <div className="p-3.5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
        <div>
          <h4 className="font-bold text-slate-800 text-[13px]">होम लोन किस काम के लिए चाहिए?</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">प्रॉपर्टी की स्थिति बताएं</p>
        </div>
        <span className="text-[10px] font-medium text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md">Step 1/3</span>
      </div>
      <div className="flex flex-col">
        {options.map((opt, i) => (
          <button key={i} onClick={() => onSelect(opt.value)} className="w-full text-left px-3.5 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between group last:border-b-0">
            <span className="text-[12px] font-semibold text-slate-700">{opt.label}</span>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

const InChatBusinessProfileSelector = ({ onSelect }: { onSelect: (type: string) => void }) => {
  const options = [
    { label: "GST Registered (Turnover 50L+)", value: "GST_HighTurnover" },
    { label: "GST Registered (Turnover under 50L)", value: "GST_LowTurnover" },
    { label: "MSME / Udyam only (No GST)", value: "MSME_Only" },
    { label: "No Registration (Cash Income)", value: "No_Reg" },
  ];
  return (
    <div className="bg-white rounded-xl mt-3 shadow-sm border border-slate-100 overflow-hidden font-sans">
      <div className="p-3.5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
        <div>
          <h4 className="font-bold text-slate-800 text-[13px]">आपकी बिज़नेस प्रोफाइल क्या है?</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">बिज़नेस का प्रकार चुनें</p>
        </div>
        <span className="text-[10px] font-medium text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md">Step 1/3</span>
      </div>
      <div className="flex flex-col">
        {options.map((opt, i) => (
          <button key={i} onClick={() => onSelect(opt.value)} className="w-full text-left px-3.5 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between group last:border-b-0">
            <span className="text-[12px] font-semibold text-slate-700">{opt.label}</span>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

const InChatEligibilityCalc = ({ onComplete }: { onComplete: (eligibleAmt: number) => void }) => {
  const router = useRouter();

  // 5 Underwriting Stages State
  const [product, setProduct] = useState<ProductType>("Home Loan");
  const [empType, setEmpType] = useState<EmpType>("Salaried");
  const [salaryMode, setSalaryMode] = useState<SalaryMode>("bank_transfer");
  const [ageBracket, setAgeBracket] = useState<AgeBracket>("31-45");
  const [cibilTier, setCibilTier] = useState<CibilTier>("750+");
  const [hasEmiBounce, setHasEmiBounce] = useState<boolean>(false);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [existingEmi, setExistingEmi] = useState<number>(0);

  // Dynamic Underwriting Evaluation
  const result = evaluateUnderwriting({
    product,
    empType,
    salaryMode,
    monthlyIncome,
    existingEmi,
    cibilTier,
    ageBracket,
    hasEmiBounce
  });

  return (
    <div className="bg-white rounded-2xl p-4 mt-3 shadow-[0_8px_30px_rgba(0,0,0,0.09)] border border-emerald-100 font-sans max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-sm">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-xs tracking-tight">BFS AI Credit Underwriting Hub</h4>
            <p className="text-[10px] text-slate-500 font-medium">Bhardwaj Financial Services Official Engine</p>
          </div>
        </div>
        <span className="text-[9.5px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Audit
        </span>
      </div>

      {/* Stage 1: Product Selection */}
      <div className="mb-3">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          1. Select Financial Category
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(["Home Loan", "Personal Loan", "Business Loan", "LAP", "Credit Card", "Insurance"] as ProductType[]).map((p) => (
            <button
              key={p}
              onClick={() => setProduct(p)}
              className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition-all text-center ${
                product === p
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {p === "Home Loan" && "🏠 Home Loan"}
              {p === "Personal Loan" && "👤 Personal"}
              {p === "Business Loan" && "💼 Business"}
              {p === "LAP" && "🏢 LAP Loan"}
              {p === "Credit Card" && "💳 Cards"}
              {p === "Insurance" && "🛡️ Insurance"}
            </button>
          ))}
        </div>
      </div>

      {/* Stage 2: Employment & Salary Mode */}
      <div className="mb-3">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          2. Employment & Income Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          <button
            onClick={() => { setEmpType("Salaried"); setSalaryMode("bank_transfer"); }}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition text-left flex items-center justify-between ${
              empType === "Salaried" && salaryMode === "bank_transfer"
                ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                : "border-slate-200 text-slate-600"
            }`}
          >
            <span>💼 Salaried (Bank Transfer)</span>
            {empType === "Salaried" && salaryMode === "bank_transfer" && <Check className="w-3 h-3 text-emerald-600" />}
          </button>
          <button
            onClick={() => { setEmpType("Salaried"); setSalaryMode("cash_cheque"); }}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition text-left flex items-center justify-between ${
              empType === "Salaried" && salaryMode === "cash_cheque"
                ? "bg-purple-50 border-purple-500 text-purple-800"
                : "border-slate-200 text-slate-600"
            }`}
          >
            <span>💵 Salaried (Cash/Cheque)</span>
            {empType === "Salaried" && salaryMode === "cash_cheque" && <Check className="w-3 h-3 text-purple-600" />}
          </button>
          <button
            onClick={() => { setEmpType("Self-Employed"); setSalaryMode("bank_transfer"); }}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition text-left flex items-center justify-between ${
              empType === "Self-Employed"
                ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                : "border-slate-200 text-slate-600"
            }`}
          >
            <span>🏪 Self-Employed (GST/ITR)</span>
            {empType === "Self-Employed" && <Check className="w-3 h-3 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Stage 3: Age Retirement Horizon */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            3. Age Horizon (Tenure Impact)
          </label>
          <span className="text-[10px] text-slate-400 font-medium">Max Tenure: {result.maxTenureYears} Yrs</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {(["21-30", "31-45", "46-55", "55+"] as AgeBracket[]).map((b) => (
            <button
              key={b}
              onClick={() => setAgeBracket(b)}
              className={`py-1 rounded-lg text-[10.5px] font-bold border transition text-center ${
                ageBracket === b
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {b} Yrs
            </button>
          ))}
        </div>
      </div>

      {/* Stage 4: CIBIL Score & Track */}
      <div className="mb-3">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          4. CIBIL Score & 12-Month Track
        </label>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {(["750+", "700-749", "650-699", "<650"] as CibilTier[]).map((c) => (
            <button
              key={c}
              onClick={() => setCibilTier(c)}
              className={`py-1 rounded-lg text-[10px] font-bold border transition text-center ${
                cibilTier === c
                  ? c === "750+"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : c === "700-749"
                    ? "bg-blue-600 text-white border-blue-600"
                    : c === "650-699"
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-purple-600 text-white border-purple-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Bounce Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setHasEmiBounce(false)}
            className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition text-center ${
              !hasEmiBounce
                ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                : "border-slate-200 text-slate-500"
            }`}
          >
            🟢 Zero Bounces (Clean Track)
          </button>
          <button
            onClick={() => setHasEmiBounce(true)}
            className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition text-center ${
              hasEmiBounce
                ? "bg-amber-50 border-amber-500 text-amber-800"
                : "border-slate-200 text-slate-500"
            }`}
          >
            ⚠️ 1-2 Bounces / Delays
          </button>
        </div>
      </div>

      {/* Stage 5: Income & Existing EMIs Sliders */}
      <div className="space-y-2.5 mb-3.5 pt-1 border-t border-slate-100">
        <div>
          <div className="flex justify-between text-[11px] font-bold mb-1">
            <span className="text-slate-500">Monthly In-Hand Income</span>
            <span className="text-emerald-700 font-extrabold">₹{monthlyIncome.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="15000"
            max="500000"
            step="5000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] font-bold mb-1">
            <span className="text-slate-500">Existing Monthly EMIs</span>
            <span className="text-red-500 font-extrabold">₹{existingEmi.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="2000"
            value={existingEmi}
            onChange={(e) => setExistingEmi(Number(e.target.value))}
            className="w-full accent-red-400 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* ================= BFS OFFICIAL PRE-SANCTION ASSESSMENT CARD ================= */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-3.5 rounded-2xl shadow-lg border border-emerald-500/30 mb-3">
        {/* Pool Badge */}
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-500/30 inline-block mb-1">
              {result.lendingPool}
            </span>
            <h5 className="font-black text-xs text-white flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {result.badge}
            </h5>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">BFS Rate Band</span>
            <span className="text-xs font-black text-emerald-300">{result.interestRateBand}</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 mb-2.5">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Max Permissible Limit</span>
            <span className="text-xl font-black text-white">{result.eligibleAmountFormatted}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              {result.maxTenureYears > 0 ? "Tenure & Monthly EMI" : "Repayment Terms"}
            </span>
            <span className="text-xs font-black text-emerald-400">
              {result.estimatedMonthlyEmi > 0 ? `~₹${result.estimatedMonthlyEmi.toLocaleString("en-IN")}/mo` : "Zero Monthly Cost"}
            </span>
            {result.maxTenureYears > 0 && (
              <span className="text-[9.5px] text-slate-300 block">{result.maxTenureYears} Years Approved</span>
            )}
          </div>
        </div>

        {/* Underwriting Notes */}
        <div className="space-y-1">
          {result.keyInsights.map((note, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[10px] text-slate-300 leading-tight">
              <ChevronRight className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {product === "Insurance" || product === "Credit Card" ? (
          <button
            onClick={() => router.push(product === "Credit Card" ? "/apply?product=credit-card" : "/apply?product=insurance")}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
          >
            <span>Apply Online Now 📝</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => onComplete(result.eligibleAmount)}
            disabled={result.eligibleAmount <= 0}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-black py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
          >
            <span>Proceed with {result.eligibleAmountFormatted}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
        <a
          href="https://wa.me/917900979001"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition flex items-center justify-center"
          title="WhatsApp BFS Underwriting Desk"
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
};

// --- InChat WhatsApp Connect Fallback Widget ---
const InChatWhatsAppConnect = ({ 
  userQuery, 
  onSelectAction 
}: { 
  userQuery?: string; 
  onSelectAction?: (action: string) => void;
}) => {
  const queryClean = userQuery && userQuery.length > 2 && !userQuery.toLowerCase().includes("whatsapp")
    ? userQuery
    : "";
  const defaultMsg = queryClean
    ? `Namaste BFS team, mujhe is vishay me guidance chahiye: "${queryClean}"`
    : "Namaste BFS team, mujhe expert loan/insurance/credit card guidance chahiye.";
  const waUrl = `https://wa.me/917900979001?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white rounded-2xl mt-3 p-0 shadow-md border border-emerald-200 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
      <div className="p-3.5 border-b border-emerald-100 flex items-center justify-between bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#25D366] to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-slate-800 text-[13px]">Senior Advisory Desk</h4>
              <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1">
                🚀 Coming Soon
              </span>
            </div>
            <p className="text-[11px] text-slate-500">AI Model in Training • Direct Human Desk Active</p>
          </div>
        </div>
      </div>

      <div className="p-3.5 space-y-3">
        <p className="text-[12px] text-slate-700 leading-relaxed">
          Humara automated AI model abhi continuous training phase me hai aur aage aane wale update me fully launch hoga! (This AI Bot feature is Coming Soon). Tab tak ke liye aapke sawaal ka sahi jawab hamare Senior Loan & Financial Advisors directly WhatsApp aur Call par turant de rahe hain:
        </p>

        {queryClean && (
          <div className="bg-white/95 border border-emerald-100 rounded-xl p-2.5 text-[11.5px] text-slate-600 flex items-start gap-2 shadow-xs">
            <span className="text-emerald-700 font-bold shrink-0">Aapka Topic:</span>
            <span className="line-clamp-2 italic text-slate-700">"{queryClean}"</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20 active:scale-98 text-center"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Par Chat Karein</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          <a
            href="tel:+919258724227"
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-md shadow-slate-900/10 active:scale-98 text-center"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Direct Call (+91 9258-724-227)</span>
          </a>
        </div>

        {onSelectAction && (
          <div className="pt-2 border-t border-emerald-100/60 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-semibold text-slate-400 mr-1">Vikalp:</span>
            <button
              onClick={() => onSelectAction("Check Eligibility 🔢")}
              className="text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg transition"
            >
              Check Eligibility 🔢
            </button>
            <button
              onClick={() => onSelectAction("Finance & Loans 💰")}
              className="text-[11px] font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg transition"
            >
              Loans 💰
            </button>
            <button
              onClick={() => onSelectAction("Insurance Plans 🛡️")}
              className="text-[11px] font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg transition"
            >
              Insurance 🛡️
            </button>
            <button
              onClick={() => onSelectAction("Start Over 🔄")}
              className="text-[11px] font-medium bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-lg transition"
            >
              Start Over 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN BOT COMPONENT ---
export default function SmartBot({ isOpen, onClose, inline = false }: { isOpen: boolean; onClose: () => void; inline?: boolean }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>("GREETING");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [botKnowledge, setBotKnowledge] = useState<any>(null);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  
  const [leadData, setLeadData] = useState({
    loanType: "Home Loan", propertyIdentified: "", cibilStatus: "", loanAmount: "", empType: "", name: "", phone: "",
    docLoanType: "", docSubType: "", docEmpType: "", docSalaryType: "", docBizType: "",
    btBank: "", btRoi: "", btVintage: "", btEmiBounce: "", btOutstanding: ""
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isTtsEnabledRef = useRef(isTtsEnabled);

  useEffect(() => {
    if (isOpen && !isInitialized) {
      // Fetch dynamic knowledge
      fetch("/api/bot/knowledge")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setBotKnowledge(data.data);
          }
        })
        .catch(err => console.error(err));

      const savedSessionsRaw = localStorage.getItem('smartbot_sessions');
      let loadedSessions: ChatSession[] = [];
      if (savedSessionsRaw) {
        loadedSessions = JSON.parse(savedSessionsRaw);
        setSessions(loadedSessions);
      }
      
      const activeSessionId = sessionStorage.getItem('smartbot_active_session');
      if (activeSessionId) {
        const activeSession = loadedSessions.find(s => s.id === activeSessionId);
        if (activeSession) {
          setCurrentSessionId(activeSession.id);
          setMessages(activeSession.messages);
          setCurrentStep(activeSession.currentStep);
          setLeadData(activeSession.leadData);
          setIsInitialized(true);
          return;
        }
      }
      
      startNewSession();
    }
  }, [isOpen, isInitialized]);

  const startNewSession = () => {
    const newId = Date.now().toString();
    setCurrentSessionId(newId);
    setMessages([]);
    setCurrentStep("GREETING");
    setLeadData({ 
      loanType: "Home Loan", propertyIdentified: "", cibilStatus: "", loanAmount: "", empType: "", name: "", phone: "",
      docLoanType: "", docSubType: "", docEmpType: "", docSalaryType: "", docBizType: "",
      btBank: "", btRoi: "", btVintage: "", btEmiBounce: "", btOutstanding: ""
    });
    setIsInitialized(true);
    triggerBotMessage(
      `Namaste! 🙏 Welcome to Bhardwaj Financial Services.\n\n🚧 **AI Advisor — Training Mode**\nHumara AI Advisor abhi advanced training phase mein hai. Bahut jaldi yeh fully automated ho jayega aur aapke sabhi sawaalon ka instant jawab dega!\n\n🔜 **Coming Soon Features:**\n• 24/7 Instant AI Chat Support\n• Smart Loan Eligibility Check\n• Personalized Financial Advice\n• Document Guidance & More\n\n✅ **Abhi Immediate Help Chahiye?**\nHumare expert team se seedha baat karein — WhatsApp ya Call karein!\n\n📞 Call: 9258025786\n💬 WhatsApp: Niche button press karein`,
      ["WhatsApp Expert 💬", "Call Now 📞", "Visit Office 🏢"],
      800, undefined, false 
    );
  };

  const loadSession = (id: string) => {
    const s = sessions.find(s => s.id === id);
    if (s) {
      setCurrentSessionId(s.id);
      setMessages(s.messages);
      setCurrentStep(s.currentStep);
      setLeadData(s.leadData);
      sessionStorage.setItem('smartbot_active_session', s.id);
      if (!isFullScreen) setIsFullScreen(true);
    }
  };

  const requestDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessionToDelete(id);
  };

  const confirmDeleteSession = () => {
    if (!sessionToDelete) return;
    
    setSessions(prev => {
      const newSessions = prev.filter(s => s.id !== sessionToDelete);
      localStorage.setItem('smartbot_sessions', JSON.stringify(newSessions));
      return newSessions;
    });
    
    if (sessionToDelete === currentSessionId) {
      startNewSession();
    }
    setSessionToDelete(null);
  };

  useEffect(() => {
    if (isInitialized && currentSessionId && messages.length > 0) {
      setSessions(prev => {
        const existingIdx = prev.findIndex(s => s.id === currentSessionId);
        const firstUserMsg = messages.find(m => m.sender === "user")?.text;
        const title = firstUserMsg ? (firstUserMsg.length > 25 ? firstUserMsg.substring(0, 25) + '...' : firstUserMsg) : "New Consultation";
        
        const newSession: ChatSession = {
          id: currentSessionId,
          title,
          messages,
          currentStep,
          leadData,
          updatedAt: Date.now()
        };
        
        let newSessions;
        if (existingIdx >= 0) {
          newSessions = [...prev];
          newSessions[existingIdx] = newSession;
        } else {
          newSessions = [newSession, ...prev];
        }
        
        localStorage.setItem('smartbot_sessions', JSON.stringify(newSessions));
        return newSessions;
      });
      sessionStorage.setItem('smartbot_active_session', currentSessionId);
    }
  }, [messages, currentStep, leadData, isInitialized, currentSessionId]);

  const toggleTts = () => {
    const newState = !isTtsEnabled;
    setIsTtsEnabled(newState);
    isTtsEnabledRef.current = newState;
    if (newState) {
        speakText("Voice output enabled");
    } else {
        window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (!isTtsEnabledRef.current || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('en-IN') || v.lang.includes('hi_IN'));
    if (hiVoice) utterance.voice = hiVoice;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const triggerBotMessage = (text: string, options?: string[], delay: number = 800, widget?: "emi" | "eligibility" | "bt" | "ltv" | "loan_type" | "home_loan_purpose" | "business_profile" | "whatsapp_fallback", showFeedback: boolean = true, widgetData?: any) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Math.random().toString(), sender: "bot", text, options, widget: widget as any, widgetData, showFeedback, feedbackState: "none" }]);
      setIsTyping(false);
      speakText(text);
    }, delay);
  };

  const handleFeedback = (messageId: string, type: "liked" | "disliked") => {
    setMessages((prev) => prev.map(m => m.id === messageId ? { ...m, feedbackState: type } : m));
    if (type === "disliked") {
      triggerBotMessage("Maafi chahti hu! Ek acha counselor apni galti sudharta hai. Maine kahan galti ki?", undefined, 600, undefined, false);
      setCurrentStep("AWAITING_FEEDBACK");
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInputValue(transcript);
      setTimeout(() => handleUserAction(transcript), 500);
      setInputValue("");
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const autoDetectLanguage = (text: string) => {
    if (/[\u0900-\u097F]/.test(text)) return "hi";
    if (/[\u0A80-\u0AFF]/.test(text)) return "gu";
    if (/[\u0980-\u09FF]/.test(text)) return "bn";
    if (/[\u0A00-\u0A7F]/.test(text)) return "pa";
    return null;
  };

  const handleUserAction = async (text: string) => {
    const detectedLang = autoDetectLanguage(text);
    if (detectedLang) {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select && select.value !== detectedLang) {
        select.value = detectedLang;
        select.dispatchEvent(new Event("change"));
      }
    }
    
    if (text !== "WIDGET_ACTION" && text.trim() !== "") {
      setMessages((prev) => [...prev, { id: Math.random().toString(), sender: "user", text }]);
      setInputValue("");
      setIsTyping(true);
    }

    // ── AI TRAINING MODE — Intercept ALL messages ──────────────────
    // AI is not trained yet, so redirect all user queries to human experts
    
    const lowerText = text.toLowerCase().trim();
    
    // Handle WhatsApp quick reply
    if (lowerText.includes("whatsapp")) {
      setIsTyping(false);
      triggerBotMessage(
        `💬 **WhatsApp Connect**\n\nHumare senior advisor se seedha baat karein:\n\n📱 WhatsApp: wa.me/919258025786\n\nEk click mein connect ho jayenge! Aapko turant response milega.\n\n🚀 Jab humara AI Advisor launch hoga, yahan pe instant automated help milegi!`,
        ["Call Instead 📞", "Visit Office 🏢", "Main Menu 🏠"],
        600
      );
      // Also open WhatsApp
      window.open("https://wa.me/919258025786?text=Hi%20BFS%2C%20mujhe%20financial%20services%20ke%20baare%20mein%20jankari%20chahiye", "_blank");
      return;
    }

    // Handle Call quick reply
    if (lowerText.includes("call")) {
      setIsTyping(false);
      triggerBotMessage(
        `📞 **Direct Call**\n\nHumare expert team se abhi baat karein:\n\n📞 Phone: 9258025786\n📞 Office: 9258025786\n\n⏰ Available: Mon-Sat, 10 AM - 7 PM\n\n🚀 AI Advisor coming soon — tab 24/7 instant help milegi!`,
        ["WhatsApp Instead 💬", "Visit Office 🏢", "Main Menu 🏠"],
        600
      );
      window.open("tel:9258025786", "_self");
      return;
    }

    // Handle Visit Office quick reply
    if (lowerText.includes("visit") || lowerText.includes("office")) {
      setIsTyping(false);
      triggerBotMessage(
        `🏢 **BFS Head Office**\n\n📍 Address:\nBhardwaj Financial Services\nAgra, Uttar Pradesh\n\n⏰ Office Hours: Mon-Sat, 10 AM - 7 PM\n\n📞 Appointment: 9258025786\n💬 WhatsApp: wa.me/919258025786\n\nAap bina appointment bhi aa sakte hain! 🤝`,
        ["WhatsApp Expert 💬", "Call Now 📞", "Main Menu 🏠"],
        600
      );
      return;
    }

    // Handle Main Menu
    if (lowerText.includes("main menu") || lowerText.includes("menu") || lowerText.includes("start")) {
      setIsTyping(false);
      startNewSession();
      return;
    }

    // ── DEFAULT: Coming Soon response for ANY other message ──
    setIsTyping(false);
    
    const comingSoonResponses = [
      `🚧 **AI Advisor — Training Mode**\n\nAbhi humara AI model training phase mein hai aur aapke iss sawaal ka automated jawab nahi de sakta.\n\n✨ Bahut jaldi yeh feature fully active hoga!\n\n✅ **Abhi help chahiye?**\nHumare human experts ready hain aapki madad ke liye:`,
      `🤖 **Coming Soon!**\n\nHumara AI Advisor abhi seekh raha hai aur jaldi hi aapke har sawaal ka smart jawab dega!\n\n💡 Tab tak aap seedha humare experts se baat kar sakte hain:`,
      `⏳ **AI Under Development**\n\nYeh feature abhi build ho raha hai. Hum ise best possible banane mein lage hain!\n\n🎯 Aapki query ke liye abhi humare experts available hain:`
    ];
    
    const randomResponse = comingSoonResponses[Math.floor(Math.random() * comingSoonResponses.length)];
    triggerBotMessage(
      randomResponse,
      ["WhatsApp Expert 💬", "Call Now 📞", "Visit Office 🏢"],
      600
    );
  };

  const processServerResponse = async (text: string, nlpResult: any) => {
    const lower = text.toLowerCase().trim();

    // ── Direct WhatsApp / Executive Assistance Interceptor ──
    const isExplicitContactRequest =
      text === "WhatsApp 💬" ||
      text === "WhatsApp Executive 💬" ||
      text === "Call Executive 📞" ||
      text === "Talk to Human Expert" ||
      text === "Talk to Claim Expert 📞" ||
      text === "Expert Call 📞" ||
      text === "Call Now 📞" ||
      Boolean(lower.match(/\b(whatsapp|human|executive|agent|advisor|officer|insan|customer care|helpline|support|baat karni hai|call me|phone pe baat|help desk)\b/));

    if (text === "WhatsApp 💬" || text === "WhatsApp Executive 💬") {
      const waUrl = `https://wa.me/917900979001?text=${encodeURIComponent("Namaste BFS team, mujhe expert consultation chahiye.")}`;
      window.open(waUrl, "_blank");
      triggerBotMessage(
        "WhatsApp open ho raha hai! Aap hamare senior executive se seedha connect ho rahe hain. Agar koi aur jankari chahiye toh batayein:",
        ["Check Eligibility 🔢", "Finance & Loans 💰", "Insurance Plans 🛡️", "Start Over 🔄"],
        400,
        "whatsapp_fallback",
        true,
        { userQuery: text }
      );
      return;
    }

    if (isExplicitContactRequest) {
      triggerBotMessage(
        "Zarur! Aap hamare Senior Financial Advisor se seedha WhatsApp ya Call Helpline par jud sakte hain:",
        ["WhatsApp Executive 💬", "Check Eligibility 🔢", "Finance & Loans 💰", "Insurance Plans 🛡️"],
        400,
        "whatsapp_fallback",
        true,
        { userQuery: text }
      );
      return;
    }

    // ── NLP / Rasa Unrecognized Fallback Interceptor ──
    if (nlpResult.intent === "fallback") {
      triggerBotMessage(
        nlpResult.reply || "Main aapka prashna poori tarah nahi samajh paaya. 🤖 Hamare senior executive aapse seedha WhatsApp par baat karne ke liye uplabdh hain:",
        ["WhatsApp Executive 💬", "Check Eligibility 🔢", "Finance & Loans 💰", "Insurance Plans 🛡️"],
        600,
        "whatsapp_fallback",
        true,
        { userQuery: text }
      );
      return;
    }

    // ── Direct Document Checklist Interceptor (Profile-Aware Intelligent Response) ──
    const isDocRequest = 
      nlpResult.intent === "document_query" || 
      text === "Required Documents" ||
      text === "Required Documents 📄" ||
      text === "Home Loan Documents 🏠" ||
      text === "Business Loan Documents 💼" ||
      text === "Personal Loan Documents 👤" ||
      Boolean(lower.match(/\b(document|documents|kagaz|kagajat|paper|papers)\b/));

    if (isDocRequest) {
      const docResult = parseDocumentQuery(text);
      triggerBotMessage(
        docResult.html,
        docResult.options,
        400
      );
      return;
    }

    // ── Context Follow-up Interceptor (Memory of Bot's own previous response) ──
    if (nlpResult.intent === "context_followup" && nlpResult.reply) {
      triggerBotMessage(
        nlpResult.reply,
        nlpResult.options || ["Check Eligibility 🔢", "WhatsApp Executive 💬", "Start Over 🔄"],
        400
      );
      return;
    }

    // ── About BFS (Bhardwaj Financial Services) Interceptor ──
    const isAboutBFS =
      nlpResult.intent === "about_bfs" ||
      nlpResult.intent === "ask_about_bfs" ||
      Boolean(lower.match(/\b(bfs kya|bfs full form|bfs.*kaun|who is bfs|about bfs|about company|aap kaun|tum kaun|company ke bare|company details|company profile|bhardwaj financial|bfs kya hai|bfs ke bare|aap kya karte|aapka kaam kya|bhardwaj financial services kya|madat|madad|help kar|help kr|kese madat|kese madad|kaise madad|kaise madat|humari.*madat|humari.*madad|meri.*madat|meri.*madad|fayda|suvidha|services|facilities)\b/)) ||
      lower === "about bfs" || lower === "bfs" || lower === "who are you" || lower === "aap kaun ho" ||
      Boolean(lower.includes("bfs") && lower.match(/\b(madat|madad|help|kaam|fayda)\b/));

    if (isAboutBFS) {
      setCurrentStep("GREETING");
      triggerBotMessage(
        nlpResult.reply || (
          "🏛️ **Bhardwaj Financial Services (BFS)**\n\n" +
          "**BFS ka Full Form:** **Bhardwaj Financial Services**\n" +
          "Hum Bharat ke agrani aur vishwasniya Financial Distribution & Advisory Platform hain. Hum 2,500+ se adhik parivaron aur vyapariyon ko sabse kam byaj daron par loan, bima aur credit cards uplabdh kara chuke hain.\n\n" +
          "⭐ **Humari Mukhya Visheshatayein (Why Choose BFS):**\n" +
          "• 🏠 **Home Loan:** Market me sabse kam byaj dar — **7.15%** se shuru! (Up to 90% funding & 30 years tenure)\n" +
          "• 💼 **Business Loan:** ₹5 Lakh se ₹50 Lakh tak Unsecured Funding bina kisi girvi ke (MSME/GST)\n" +
          "• 👤 **Personal Loan:** Instant approval up to ₹15 Lakhs kam se kam dastavez par\n" +
          "• 🏢 **Loan Against Property (LAP):** Saste rate (9.00% se) par badi limit\n" +
          "• 🛡️ **Insurance:** 10,000+ hospitals me 100% Cashless Health & Term Life Cover\n" +
          "• ⚡ **100% Transparent:** Zero upfront fees, koi chhupe huye charges nahi, aur direct doorstep service!\n\n" +
          "📍 **Head Office:** Sanjay Place, Agra, UP | Pan-India Digital Support\n" +
          "📞 **Helpline:** +91 9258-724-227 | 💬 **WhatsApp:** +91 7900-979-001"
        ),
        ["Home Loan (7.15%*) 🏠", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Finance & Loans 💰"],
        400
      );
      return;
    }

    // ── Global Product / Category Selectors (Always resets any stale pending form) ──
    const isFinanceOverview = 
      nlpResult.intent === "ask_finance_general" ||
      Boolean(lower.match(/(konse|kaun se|types of|kya kya|list of|konsa|all).*loan|loan.*(options|services|types|list|dete|krate|karate|milega|hote hain|uplabdh)|finance.*(service|detail|option)|tum konse.*loan|loan.*portfolio/)) ||
      lower === "finance" || lower === "loans" || lower === "loan" || text === "Finance & Loans 💰" || text === "Loans & Finance 💰" || lower === "naya loan" || text === "Naya Loan Chahiye 💰";

    if (isFinanceOverview) {
      setCurrentStep("GREETING");
      triggerBotMessage(
        "Bhardwaj Financial Services (BFS) sabhi pramukh prakar ke loans par lowest interest rates aur fast approval provide karta hai:\n\n" +
        "1️⃣ 🏠 **Home Loan (घर / फ्लैट ऋण)**:\n• Interest Rate: **7.15%** se shuru, up to 90% property cost funding\n• Naya ghar khareedne, flat lene ya plot construction ke liye 30 saal tak aasan EMI\n\n" +
        "2️⃣ 💼 **Business Loan (व्यापार ऋण)**:\n• **Bina kisi collateral (girvi) ke up to ₹50 Lakhs**\n• MSME, GST registered ya dukaan ke vistar ke liye 48-72 ghante mein approval\n\n" +
        "3️⃣ 👤 **Personal Loan (व्यक्तिगत ऋण)**:\n• Instant cash disbursal up to ₹15 Lakhs, minimal documentation\n• Emergency, wedding, travel ya personal zaroorat ke liye\n\n" +
        "4️⃣ 🏢 **Loan Against Property - LAP (प्रॉपर्टी पर लोन)**:\n• Apni residential ya commercial property par saste rate (**9.00%** se) par bada loan\n• Market valuation ka 60% se 75% funding aur 15-20 saal tenure\n\n" +
        "5️⃣ 🔄 **Balance Transfer + Top-Up**:\n• Purane mehenge loan ko kam interest rate par shift karke har mahine EMI ki bachat + sath me extra Top-Up loan!\n\n" +
        "Aapko inme se kis loan ke baare mein vistar se jaanna hai ya apply karna hai?",
        [
          "🏠 Home Loan",
          "💼 Business Loan",
          "👤 Personal Loan",
          "🏢 Loan Against Property (LAP)",
          "🔄 Balance Transfer",
          "Check Eligibility 🔢",
          "Apply for Finance 💰"
        ]
      );
      return;
    }

    const isInsuranceOverview =
      nlpResult.intent === "ask_insurance_general" ||
      Boolean(lower.match(/(konse|kaun se|types of|kya kya|list of|konsa|all).*(insurance|bima)|(insurance|bima).*(options|services|types|list|dete|krate|karate|milega|hote hain|uplabdh|portfolio)|tum konse.*(insurance|bima)/)) ||
      lower === "insurance" || lower === "bima" || lower === "mediclaim" || text === "Insurance Plans 🛡️" || lower === "bima karwana hai";

    if (isInsuranceOverview) {
      setCurrentStep("GREETING");
      triggerBotMessage(
        "Bhardwaj Financial Services (BFS) sabhi leading insurance companies ke best plans aur 100% claim settlement assistance provide karta hai:\n\n" +
        "1️⃣ 🏥 **Health Insurance (Mediclaim - स्वास्थ्य बीमा)**:\n• 10,000+ top network hospitals mein 100% Cashless treatment\n• Pre & Post hospitalization kharche covered\n• Section 80D ke tahat ₹75,000 tak Income Tax bachat\n\n" +
        "2️⃣ 👨‍👩‍👧‍👦 **Term Life Insurance (जीवन सुरक्षा बीमा)**:\n• Pure family financial protection cover ₹1 Crore se ₹5 Crore tak\n• Sabse saste premium par sabse bada life security cover aur Section 80C tax deduction\n\n" +
        "3️⃣ 🚗 **Motor Insurance (कार और बाइक बीमा)**:\n• Comprehensive protection + Zero Depreciation (0-Dep) add-on\n• 24x7 Roadside Breakdown Assistance aur cashless network garages\n\n" +
        "4️⃣ 📑 **Free Claim Settlement Support (क्लेम सहायता)**:\n• Hospital cashless approval aur claim rejection re-open karwane mein hamari legal team ki taraf se 100% free help!\n\n" +
        "Aapko kis policy ke baare mein vistar se jaanna hai ya quote chahiye?",
        [
          "🏥 Health Insurance",
          "👨‍👩‍👧‍👦 Term Life Plan",
          "🚗 Motor Insurance",
          "📑 Claim Settlement Help",
          "Apply for Insurance 🛡️"
        ]
      );
      return;
    }

    const isCreditCardOverview =
      nlpResult.intent === "ask_credit_card_general" ||
      Boolean(lower.match(/(konse|kaun se|types of|kya kya|list of|konsa|all).*(credit card|card)|(credit card|card).*(options|services|types|list|dete|krate|karate|milega|hote hain|uplabdh)|tum konse.*card/)) ||
      lower === "credit card" || lower === "credit cards" || lower === "card" || text === "Credit Cards 💳" || lower === "creditcard";

    if (isCreditCardOverview) {
      setCurrentStep("GREETING");
      triggerBotMessage(
        "Bhardwaj Financial Services (BFS) par sabhi leading partner institutions ke top credit cards available hain:\n\n" +
        "1️⃣ 🆓 **Lifetime Free Credit Cards (लाइफटाइम फ्री कार्ड्स)**:\n• Forever Zero Joining Fee aur Zero Annual/Renewal Fee!\n• 50 din ka interest-free credit period aur dining/shopping discounts\n• First-time users ke liye sabse best bina kisi maintenance charge ke\n\n" +
        "2️⃣ ✈️ **Airport Lounge Access Cards (एयरपोर्ट लाउंज कार्ड्स)**:\n• Har quarter 2 se 4 complimentary luxury domestic & international airport lounge visits\n• Free unlimited buffet food, premium relax zone aur Wi-Fi facilities\n\n" +
        "3️⃣ 🛍️ **Cashback & Shopping Cards (कैशबैक कार्ड्स)**:\n• Amazon, Flipkart, Myntra, Swiggy, Zomato par up to 5% flat cashback\n• Petrol pumps par 1% fuel surcharge waiver\n• Har transaction par direct cash savings\n\n" +
        "4️⃣ 📋 **Low CIBIL / FD-Backed Cards**:\n• Agar aapka CIBIL score nahi hai ya low hai, toh Fixed Deposit (FD) backed guaranteed card\n• Jisse sirf 3 mahine mein aapka CIBIL 750+ ban jata hai!\n\n" +
        "Aapko kis category ka credit card chahiye ya apply karna hai?",
        [
          "🆓 Lifetime Free Card",
          "✈️ Airport Lounge Card",
          "🛍️ Cashback Card",
          "📋 Check Card Eligibility",
          "Apply for Card 💳"
        ]
      );
      return;
    }

    // ── Direct Sub-product Handlers (Global) ──
    // 1. Finance sub-products
    if (lower.includes("home loan") || text.includes("Home Loan") || lower.includes("makan ka loan") || lower.includes("ghar ka loan")) {
      setLeadData(prev => ({ ...prev, loanType: "Home Loan" }));
      setCurrentStep("ASK_PROPERTY");
      triggerBotMessage(
        "Home Loan ke rates **7.15%** se shuru hote hain aur 30 saal tak aasan EMI milti hai (80-90% property funding). 🏡\n\nKya aapne loan ke liye property final kar li hai ya abhi limit check karni hai?",
        ["Property Dekh Li Hai 🏠", "Abhi Sirf Limit Check Karni Hai 🔍", "Required Documents 📄", "Apply for Home Loan 📝"]
      );
      return;
    }

    if (lower.includes("business loan") || text.includes("Business Loan") || lower.includes("vyapar loan") || lower.includes("dukaan")) {
      setLeadData(prev => ({ ...prev, loanType: "Business Loan" }));
      setCurrentStep("ASK_CIBIL");
      triggerBotMessage(
        "Business Loan (Vyapar Loan) ke liye kisi property collateral ki zaroorat nahi hoti! ₹5 Lakh se ₹50 Lakh+ tak unsecured funding milti hai 48-72 ghante mein. 💼\n\nAapka business profile kya hai?",
        ["GST Registered (Turnover 50L+) 📊", "MSME / Udyam Only 🏭", "Proprietorship / Dukaan 🏪", "Check Eligibility 🔢"]
      );
      return;
    }

    if (lower.includes("personal loan") || text.includes("Personal Loan") || lower.includes("salary loan")) {
      setLeadData(prev => ({ ...prev, loanType: "Personal Loan" }));
      setCurrentStep("EMP_TYPE");
      triggerBotMessage(
        "Personal Loan mein minimal documentation aur instant bank account credit milta hai (up to ₹15 Lakhs). 👤\n\nAap naukri (Salaried) karte hain ya apna business (Self-Employed) hai?",
        ["Salaried (Job) 💼", "Self-Employed (Business) 🏪", "Interest Rate Jaanein 📉", "Apply Personal Loan 📝"]
      );
      return;
    }

    if (lower.includes("loan against property") || text.includes("Loan Against Property") || lower.includes("lap") || lower.includes("property par loan")) {
      setLeadData(prev => ({ ...prev, loanType: "LAP" }));
      setCurrentStep("ASK_PROPERTY");
      triggerBotMessage(
        "Loan Against Property (LAP) mein aap apni residential ya commercial property girvi rakhkar saste interest rate (9.00% se) par bada fund le sakte hain. 🏢\n\nAapki property kis type ki hai?",
        ["Residential House/Flat 🏠", "Commercial Shop/Office 🏬", "Plot / Industrial 🏗️", "Apply for LAP 📝"]
      );
      return;
    }

    if (lower.includes("balance transfer") || text.includes("Balance Transfer") || lower.includes("loan shift") || lower.includes("bt ")) {
      setLeadData(prev => ({ ...prev, loanType: "Balance Transfer" }));
      setCurrentStep("BT_CURRENT_BANK");
      triggerBotMessage(
        "Balance Transfer se aapka purana mehenga loan saste bank mein shift ho jayega, jisse har mahine hazaron ki bachat hogi + sath mein extra Top-Up loan bhi mil jayega! 🔄\n\nAapka current loan kis institution mein chal raha hai?",
        ["Nationalized Bank 🏦", "Private Bank 🏛️", "NBFC Institution 💳", "Other Institution"]
      );
      return;
    }

    // 2. Insurance sub-products
    if (lower.includes("health insurance") || lower.includes("mediclaim") || text.includes("Health Insurance")) {
      triggerBotMessage(
        "Health Insurance (Mediclaim) mein 10,000+ top hospitals mein 100% Cashless treatment milta hai aur Section 80D ke tahat ₹75,000 tak Tax bachat hoti hai. 🏥\n\nAap kiske liye health cover lena chahte hain?",
        ["Poori Family Ke Liye (Family Floater) 👨‍👩‍👧‍👦", "Individual (Sirf Apne Liye) 👤", "Parents / Senior Citizen 👵", "Apply for Insurance 🛡️"]
      );
      return;
    }

    if (lower.includes("term life") || lower.includes("life insurance") || text.includes("Term Life") || lower.includes("jeevan bima")) {
      triggerBotMessage(
        "Term Life Insurance sabse sasta aur pure protection plan hai jisme ₹1 Crore se ₹5 Crore tak ka family protection life cover milta hai, sath hi Section 80C tax deduction! 👨‍👩‍👧‍👦\n\nAapki lagbhag age bracket kya hai?",
        ["Age: 18 - 30 Years", "Age: 31 - 45 Years", "Age: 45+ Years", "Apply for Term Plan 📝"]
      );
      return;
    }

    if (lower.includes("car insurance") || lower.includes("bike bima") || lower.includes("motor insurance") || text.includes("Car Insurance") || text.includes("Bike Bima") || text.includes("Two-Wheeler")) {
      triggerBotMessage(
        "Car & Bike Insurance mein Comprehensive, Zero Depreciation (0-Dep), 24x7 Roadside Assistance aur instant policy issuance milti hai. 🚗\n\nAapko kis type ka cover chahiye?",
        ["Policy Renewal Karwana Hai 🔄", "Zero Dep Plan Chahiye 🛡️", "Third Party Bima 📄", "Apply for Insurance 🛡️"]
      );
      return;
    }

    if (lower.includes("claim settlement") || lower.includes("claim help") || text.includes("Claim Settlement") || text.includes("Claim Support")) {
      triggerBotMessage(
        "Humari specialized legal aur claims team hospital cashless approval aur rejected claims ko re-open karwane mein poori madad karti hai! 📑\n\nAapko kis type ki claim help chahiye?",
        ["Hospital Cashless Approval 🏥", "Motor Accident Claim 🚗", "Rejected Claim Re-open ⚖️", "Talk to Claim Expert 📞"]
      );
      return;
    }

    // 3. Credit Card sub-products
    if (lower.includes("lifetime free") || text.includes("Lifetime Free")) {
      triggerBotMessage(
        "Lifetime Free Credit Cards mein Forever Zero Joining Fee aur Zero Annual Fee hoti hai! 50 days interest-free period aur discounts bina kisi maintenance charge ke. 🆓\n\nKya aapka pehle se koi credit card ya CIBIL score bana hua hai?",
        ["Haan, CIBIL 750+ Hai 👍", "Pehli Baar Card Lena Hai 🌟", "Salary Account Par Chahiye 💼", "Apply for Card 💳"]
      );
      return;
    }

    if (lower.includes("airport lounge") || text.includes("Airport Lounge") || lower.includes("lounge card")) {
      triggerBotMessage(
        "Airport Lounge Cards mein har quarter 2 se 4 complimentary luxury domestic aur international airport lounge visits (free buffet food, relax zone aur Wi-Fi) milti hain! ✈️\n\nAapki monthly income profile kya hai?",
        ["Salaried (₹25k+ In-Hand) 💼", "Self-Employed / Business 🏪", "Apply for Card 💳"]
      );
      return;
    }

    if (lower.includes("cashback") || text.includes("Cashback") || lower.includes("shopping card") || lower.includes("fuel surcharge") || text.includes("Fuel Surcharge")) {
      triggerBotMessage(
        "Cashback Credit Cards se aap Amazon, Flipkart, Myntra, Swiggy, Zomato par up to 5% direct cashback aur petrol pumps par 1% surcharge waiver pa sakte hain! 🛍️\n\nAapka main kharcha kahan hota hai?",
        ["Online Shopping (Amazon/Flipkart) 🛒", "Food Delivery & Dining 🍔", "Petrol & Fuel ⛽", "Apply for Card 💳"]
      );
      return;
    }

    if (lower.includes("card eligibility") || text.includes("Card Eligibility")) {
      triggerBotMessage(
        "Agar aapka CIBIL nahi bana hai ya salary kam hai, toh pareshan mat hoiye! Hum Fixed Deposit (FD) backed secure cards provide karate hain jisse 3 mahine mein aapka CIBIL 750+ ban jata hai. 📋\n\nAapki profile batayein:",
        ["Salaried Employee 💼", "Self-Employed / Dukaan 🏪", "Student / Housewife 🎓", "Apply for Card 💳"]
      );
      return;
    }

    // 4. Direct Apply Redirections
    if (text === "Apply for Home Loan 📝" || text === "Apply for LAP 📝" || text === "Apply Personal Loan 📝" || text === "Apply for Finance 💰" || text === "Apply Finance 💰") {
      triggerBotMessage("Finance application page par le jaa raha hoon... Kripya wahan basic details bharein!", ["Continue Chat"]);
      router.push("/apply?product=finance");
      return;
    }

    if (text === "Apply for Term Plan 📝" || text === "Apply for Insurance 🛡️" || text === "Apply Insurance 🛡️") {
      triggerBotMessage("Insurance application page par le jaa raha hoon... Kripya wahan basic details bharein!", ["Continue Chat"]);
      router.push("/apply?product=insurance");
      return;
    }

    if (text === "Apply for Card 💳" || text === "Apply Credit Card 💳" || text === "Apply Lifetime Free 📝") {
      triggerBotMessage("Credit Card application page par le jaa raha hoon... Kripya wahan basic details bharein!", ["Continue Chat"]);
      router.push("/apply?product=credit-card");
      return;
    }

    if (text === "Talk to Claim Expert 📞" || text === "Talk to Human Expert" || text === "Expert Call 📞" || text === "Call Now 📞") {
      triggerBotMessage("Aap hamare senior expert Adv. Praveen Bhardwaj se seedha baat kar sakte hain:\n📞 +91 9258-724-227\n💬 WhatsApp: 7900-979-001", ["WhatsApp 💬", "Apply Online 📝", "Start Over 🔄"]);
      return;
    }

    // ── Handle Global Cancellations ──
    const isCancelCommand = ["cancel", "band", "stop", "nahi dena", "nhi dena", "mat", "chhod", "cancel process"].some(w => text.toLowerCase().includes(w));
    
    if (isCancelCommand) {
      triggerBotMessage("Process cancel kar diya gaya hai. Main aapki aur kya madad kar sakta hun?", ["Naya Loan Chahiye 💰", "Check Eligibility", "Track Old Loan"]);
      setCurrentStep("GREETING");
      return;
    }

    const isSmalltalk = ["smalltalk_bored", "smalltalk_identity", "smalltalk_how_are_you"].includes(nlpResult.intent);
    if (isSmalltalk) {
      if (currentStep !== "GREETING" && currentStep !== "SUCCESS" && currentStep !== "CLOSED") {
        triggerBotMessage(nlpResult.reply + "\n\nAapka form abhi pending hai, kripya aage badhein.", ["Cancel Process"]);
      } else {
        triggerBotMessage(nlpResult.reply || "Bolo ji, kya madad karu?", ["Apply for Loan", "Start Over"]);
      }
      return;
    }

    if (nlpResult.intent === "remind_question" || text.toLowerCase().includes("pichla") || text.toLowerCase().includes("jawab hai") || text.toLowerCase().includes("kya process") || text.toLowerCase().includes("kya chal raha") || text.toLowerCase().includes("kya kr rahe")) {
        const stepMessages: Record<string, string> = {
          "LOAN_TYPE_SELECTION": "Main pooch raha tha ki aapko kaun sa loan chahiye? (jaise: Home Loan, Business Loan)",
          "ASK_PROPERTY": "Main pooch raha tha ki kya aapne loan ke liye koi property dekh li hai?",
          "ASK_CIBIL": "Main aapka lagbhag CIBIL score pooch raha tha.",
          "LOAN_AMOUNT": "Main pooch raha tha ki aapko kitne amount ka loan chahiye? (jaise: 25 Lakh)",
          "EMP_TYPE": "Main pooch raha tha ki aap job karte hain ya aapka apna business hai?",
          "ASK_NAME": "Main aapka shubh naam pooch raha tha. 😊",
          "ASK_PHONE": "Aapki profile lagbhag ban gayi hai, main bas aapka 10-digit mobile number pooch raha tha."
        };
        const reminder = stepMessages[currentStep] || "Kripya apne form ka bacha hua jawab dein.";
        triggerBotMessage(`Aapka loan form abhi pending hai. 📝\n\n${reminder}`, ["Cancel Process"]);
        return;
      }

      // Prevent greeting from being recorded as data but use Rasa's reply
      if (nlpResult.intent === "greeting") {
        triggerBotMessage(nlpResult.reply || "Hello! Aap kaise hain?", ["Cancel Process"]);
        return;
      }

      // Global Knowledge Interceptor (Answers user questions even when in the middle of a form)
      if (currentStep !== "GREETING" && currentStep !== "SUCCESS" && currentStep !== "CLOSED") {
         if (["faq_query", "interest_rate_query", "service_area_query", "document_query"].includes(nlpResult.intent) && nlpResult.reply) {
            const stepMsgs: Record<string, string> = {
              "LOAN_TYPE_SELECTION": "Wapas form par aate hue apne form par: Aapko kaun sa loan chahiye?",
              "ASK_PROPERTY": "Wapas form par aate hue: Kya aapne loan ke liye koi property dekh li hai?",
              "ASK_CIBIL": "Wapas form par aate hue: Aapka lagbhag CIBIL score kitna hai?",
              "LOAN_AMOUNT": "Wapas form par aate hue: Aapko kitne amount ka loan chahiye? (jaise: 25 Lakh)",
              "EMP_TYPE": "Wapas form par aate hue: Aap job karte hain ya aapka apna business hai?",
              "ASK_NAME": "Wapas form par aate hue: Aapka shubh naam kya hai?",
              "ASK_PHONE": "Wapas form par aate hue: Aapka 10-digit mobile number kya hai?",
              "BT_CURRENT_BANK": "Wapas form par aate hue: Aapka current loan kis bank mein hai?",
              "BT_CURRENT_ROI": "Wapas form par aate hue: Aapka wahan interest rate kitna chal raha hai?",
              "BT_VINTAGE": "Wapas form par aate hue: Is loan ko chalte hue kitna time ho gaya hai?",
              "BT_EMI_BOUNCE": "Wapas form par aate hue: Pichle 12 mahino mein koi EMI bounce hui hai?",
              "BT_OUTSTANDING": "Wapas form par aate hue: Aapka outstanding amount kitna bacha hai?"
            };
            const reminderMsg = stepMsgs[currentStep] || "Kripya form ka bacha hua jawab dein.";
            triggerBotMessage(`${nlpResult.reply}\n\n---\n*${reminderMsg}*`, ["Cancel Process"]);
            return;
         }
      }
    switch (currentStep) {
      case "GREETING":
        if (text === "Talk to Human Expert" || text === "Expert Call 📞" || text === "Call Now 📞") {
          triggerBotMessage("Zarur! Aap hamare senior expert Adv. Praveen Bhardwaj se seedha baat kar sakte hain:\n📞 +91 9258-724-227\n💬 WhatsApp: 7900-979-001", ["WhatsApp 💬", "Apply Online 📝", "Start Over 🔄"]);
        } else if (text === "WhatsApp 💬") {
          window.open("https://wa.me/917900979001", "_blank");
          triggerBotMessage("WhatsApp open ho raha hai! Aap humein 7900-979-001 par bhi message bhej sakte hain.", ["Continue Chat", "Start Over 🔄"]);
        } else if (text === "Apply Online 📝" || text === "Apply Now 📝") {
          triggerBotMessage("Aapko kis category mein apply karna hai?", ["Apply Finance 💰", "Apply Insurance 🛡️", "Apply Credit Card 💳"]);
        } else if (text === "Apply Finance 💰" || text === "Apply for Finance 💰") {
          triggerBotMessage("Finance application page par le jaa raha hoon...", ["Continue Chat"]);
          router.push("/apply?product=finance");
        } else if (text === "Apply Insurance 🛡️" || text === "Apply for Insurance 🛡️") {
          triggerBotMessage("Insurance application page par le jaa raha hoon...", ["Continue Chat"]);
          router.push("/apply?product=insurance");
        } else if (text === "Apply Credit Card 💳" || text === "Apply for Card 💳") {
          triggerBotMessage("Credit Card application page par le jaa raha hoon...", ["Continue Chat"]);
          router.push("/apply?product=credit-card");
        } else if (text === "Check Eligibility" || text === "Check Eligibility 🔢") {
          triggerBotMessage("Bilkul! Apni Loans, Credit Cards, ya Insurance eligibility check karne ke liye neeche diya gaya Universal Eligibility Engine use karein:", undefined, 600, "eligibility");
          setCurrentStep("EMI_CALC");
        } else if (text === "Finance & Loans 💰" || text === "Loans & Finance 💰") {
          triggerBotMessage("Bhardwaj Financial Services sabhi types ke loan par lowest interest rates aur priority sanction provide karta hai:\n• 🏠 Home Loan (Rates 7.15% se)\n• 💼 Business Loan (Unsecured MSME/GST)\n• 👤 Personal Loan (Immediate cash)\n• 🏢 Loan Against Property (LAP)\n• 🔄 Balance Transfer & Top-Up\n\nAapko kis loan ki requirement hai?", ["Home Loan", "Business Loan", "Personal Loan", "LAP", "Apply for Finance 💰"]);
        } else if (text === "Insurance Plans 🛡️") {
          triggerBotMessage("🛡️ Bhardwaj Financial Services Insurance Services:\n• 🏥 Health Insurance (10,000+ Cashless Hospitals, Tax benefit u/s 80D)\n• 👨‍👩‍👧‍👦 Term Life Insurance (₹1 Crore+ family protection cover, Section 80C)\n• 🚗 Motor Insurance (Car/Bike 0-Dep, instant renewal)\n• 📑 100% Free Claim Settlement Support\n\nAap kis policy ke baare mein jaanna chahte hain?", ["Health Insurance 🏥", "Term Life Plan 👨‍👩‍👧‍👦", "Motor Insurance 🚗", "Apply for Insurance 🛡️"]);
        } else if (text === "Credit Cards 💳") {
          triggerBotMessage("💳 Credit Card Services at BFS:\n• 🆓 Lifetime Free Credit Cards (Zero Joining & Annual Fee forever)\n• ✈️ Airport Lounge Access Cards (Complimentary luxury airport entry)\n• 🛍️ Cashback & Shopping Cards (Amazon/Flipkart & fuel savings)\n• 📋 Card Eligibility Check (Low CIBIL/New to Credit)\n\nAapko kis type ka card pasand hai?", ["Lifetime Free Card 🆓", "Airport Lounge ✈️", "Cashback Card 🛍️", "Apply for Card 💳"]);
        } else if (nlpResult.intent === "document_query" || text === "Required Documents") {
          if (text.toLowerCase().includes("bt") || text.toLowerCase().includes("balance transfer")) {
            setLeadData(prev => ({ ...prev, docLoanType: "Balance Transfer" }));
            triggerBotMessage("BT (Balance Transfer) ke liye, property kis type ki hai?", ["Residential", "Commercial", "Plot"]);
            setCurrentStep("DOC_SUB_TYPE");
          } else if (text.toLowerCase().includes("home loan") || text.toLowerCase().includes("makan")) {
            setLeadData(prev => ({ ...prev, docLoanType: "Home Loan" }));
            triggerBotMessage("Home Loan ke liye, property kis type ki hai?", ["Flat / Apartment", "Independent House", "Plot + Construction"]);
            setCurrentStep("DOC_SUB_TYPE");
          } else if (text.toLowerCase().includes("lap") || text.toLowerCase().includes("property")) {
            setLeadData(prev => ({ ...prev, docLoanType: "LAP" }));
            triggerBotMessage("Loan Against Property ke liye, property kis type ki hai?", ["Residential", "Commercial", "Industrial"]);
            setCurrentStep("DOC_SUB_TYPE");
          } else if (text.toLowerCase().includes("business")) {
            setLeadData(prev => ({ ...prev, docLoanType: "Business Loan", docEmpType: "Self-Employed" }));
            triggerBotMessage("Business Loan ke liye, aapka business kis type ka hai?", ["Proprietorship", "Partnership / LLP", "Pvt Ltd Company"]);
            setCurrentStep("DOC_BIZ_TYPE");
          } else if (text.toLowerCase().includes("personal")) {
            setLeadData(prev => ({ ...prev, docLoanType: "Personal Loan" }));
            triggerBotMessage("Personal Loan ke liye, aapki employment profile kya hai?", ["Salaried (Job)", "Self-Employed (Business)"]);
            setCurrentStep("DOC_EMP_TYPE");
          } else {
            triggerBotMessage("Bilkul! Sahi document list ke liye bata dein — aapko kaun sa loan chahiye?", ["Home Loan", "Loan Against Property (LAP)", "Business Loan", "Personal Loan", "Balance Transfer"]);
            setCurrentStep("DOC_LOAN_TYPE");
          }
        } else if (nlpResult.reply) {
          // Rasa AI server ya Local Knowledge base se exact reply mila ✅
          triggerBotMessage(nlpResult.reply, nlpResult.options || ["Apply Online 📝", "Talk to Human Expert", "Start Over 🔄"]);
        } else if (nlpResult.intent === "cibil_issue") {
          triggerBotMessage("CIBIL score kharab hona koi badi baat nahi hai! Humare paas aise kai options hain jo low CIBIL par bhi kaam karte hain. Aapka score abhi lagbhag kitna hai?", ["750+", "650-750", "550-650", "550 se kam"]);
        } else if (["emi_calculator", "bt_calculator", "ltv_calculator", "eligibility_calculator"].includes(nlpResult.intent)) {
          const widgetMap: Record<string, any> = { emi_calculator: "emi", bt_calculator: "bt", ltv_calculator: "ltv", eligibility_calculator: "eligibility" };
          triggerBotMessage("Bilkul! Neeche tool se calculate karein:", undefined, 600, widgetMap[nlpResult.intent]);
          setCurrentStep("EMI_CALC");
        } else if (text.toLowerCase().includes("home loan") || text.toLowerCase().includes("makan ka loan")) {
          setLeadData(prev => ({ ...prev, loanType: "Home Loan" }));
          triggerBotMessage("Zarur! Home Loan ke liye apply karne se pehle, kya aapne koi property identify kar li hai ya abhi search kar rahe hain?", ["Yes, Property Finalized", "No, just checking limits"]);
          setCurrentStep("ASK_PROPERTY");
        } else if (text.toLowerCase().includes("business loan")) {
          setLeadData(prev => ({ ...prev, loanType: "Business Loan" }));
          triggerBotMessage("Zarur! Business Loan ke liye aapka lagbhag CIBIL score kitna hai?", ["750+", "650-750", "550-650", "I don't know"]);
          setCurrentStep("ASK_CIBIL");
        } else if (text.toLowerCase().includes("personal loan")) {
          setLeadData(prev => ({ ...prev, loanType: "Personal Loan" }));
          triggerBotMessage("Zarur! Personal Loan ke liye aapka lagbhag CIBIL score kitna hai?", ["750+", "650-750", "550-650", "I don't know"]);
          setCurrentStep("ASK_CIBIL");
        } else if (text.toLowerCase().includes("lap") || text.toLowerCase().includes("loan against property")) {
          setLeadData(prev => ({ ...prev, loanType: "LAP" }));
          triggerBotMessage("Zarur! Loan Against Property ke liye, kya aapki property residential hai ya commercial?", ["Residential", "Commercial", "Industrial"]);
          setCurrentStep("ASK_PROPERTY");
        } else if (text.toLowerCase().includes("bt") || text.toLowerCase().includes("balance transfer")) {
          setLeadData(prev => ({ ...prev, loanType: "Balance Transfer" }));
          triggerBotMessage("Behtareen chunaav. Balance Transfer se aapka interest rate kaafi kam ho sakta hai. Aapka current loan kis Bank ya NBFC mein chal raha hai?", ["Nationalized Bank 🏦", "Private Bank 🏛️", "NBFC Institution 💳", "Other Bank"]);
          setCurrentStep("BT_CURRENT_BANK");
        } else if (text === "Apply for Loan" || text === "Apply for Loan 📝" || lower === "apply loan" || lower === "loan apply") {
          triggerBotMessage("Zarur! Aapko konsa loan apply karna hai? Kripya loan type chunein:", undefined, 600, "loan_type");
          setCurrentStep("LOAN_TYPE_SELECTION");
        } else if (text === "Bank Rates" || lower.includes("bank rate") || lower.includes("interest rate")) {
          triggerBotMessage(
            "Bhardwaj Financial Services par sabhi partner banks ke lowest interest rates uplabdh hain:\n• 🏠 Home Loan: **7.15%** se shuru\n• 🏢 LAP (Mortgage): **9.00%** se shuru\n• 💼 Business Loan: **11.5%** se shuru\n• 👤 Personal Loan: **10.5%** se shuru\n\nAapko kis loan ka rate ya eligibility check karni hai?",
            ["🏠 Home Loan", "💼 Business Loan", "👤 Personal Loan", "🏢 Loan Against Property (LAP)", "Check Eligibility 🔢"]
          );
        } else {
          // Koi match nahi mila
          triggerBotMessage(
            "Main aapke is prashna ko poori tarah nahi samajh paaya. 🤖\n\nAapki behtar sahayata ke liye, aap hamare senior executive se seedha WhatsApp par chat kar sakte hain ya vikalp chun sakte hain:",
            ["WhatsApp Executive 💬", "Check Eligibility 🔢", "Finance & Loans 💰", "Insurance Plans 🛡️"],
            600,
            "whatsapp_fallback",
            true,
            { userQuery: text }
          );
        }
        break;

      case "EMI_CALC":
        if (text === "Continue Application" || text === "Cancel Process") return;
        if (!/\d/.test(text) && !text.toLowerCase().includes("lakh") && !text.toLowerCase().includes("crore")) {
           triggerBotMessage("Maafi chahta hun, amount samajh nahi aaya. 😅 Kripya amount numbers mein likhein (jaise: '25 Lakh' ya '1.5 Crore'), ya hamare executive se WhatsApp par baat karein.", ["WhatsApp Executive 💬", "Cancel Process"], 600, "whatsapp_fallback", true, { userQuery: text });
           return;
        }
        
        // 10 Lakh Minimum Amount Logic
        const calcAmtStr = text.toLowerCase().replace(/,/g, '');
        let calcNumericAmt = 1000000; // default to safe amount
        if (calcAmtStr.includes("lakh") || calcAmtStr.includes("lac") || calcAmtStr.match(/\bl\b/)) {
           const match = calcAmtStr.match(/[\d.]+/);
           if (match) calcNumericAmt = parseFloat(match[0]) * 100000;
        } else if (calcAmtStr.includes("crore") || calcAmtStr.includes("cr")) {
           const match = calcAmtStr.match(/[\d.]+/);
           if (match) calcNumericAmt = parseFloat(match[0]) * 10000000;
        } else if (calcAmtStr.includes("k") || calcAmtStr.includes("thousand") || calcAmtStr.includes("hazar")) {
           const match = calcAmtStr.match(/[\d.]+/);
           if (match) calcNumericAmt = parseFloat(match[0]) * 1000;
        } else {
           const match = calcAmtStr.match(/[\d.]+/);
           if (match) calcNumericAmt = parseFloat(match[0]);
           // If user just types "50", assume lakhs if they are in the loan context, but let's be strict.
           // Usually users type "500000" or "5 Lakh"
           if (calcNumericAmt < 1000 && calcNumericAmt > 0 && !calcAmtStr.includes("000")) calcNumericAmt = calcNumericAmt * 100000;
        }

        if (calcNumericAmt > 0 && calcNumericAmt < 1000000) {
           triggerBotMessage("Maaf kijiyega, humari policy ke anusaar hum filhaal sirf 10 Lakh ya usse upar ke loans hi process karte hain. 🙏 Kya aapko 10 Lakh ya usse zyada ki requirement hai?", ["Haan, 10 Lakh se upar", "Nahi, kam chahiye"]);
           return;
        }
        if (text === "Nahi, kam chahiye") {
           triggerBotMessage("Maafi chahenge! 🙏 Hum sirf 10L+ loans mein hi deal karte hain. Agar future mein requirement ho toh hume zaroor yaad kijiye!");
           setCurrentStep("CLOSED");
           return;
        }
        if (text === "Haan, 10 Lakh se upar") {
           triggerBotMessage("Great! Kripya apna loan amount bata dein (jaise: 15 Lakh)");
           return;
        }

        setLeadData(prev => ({ ...prev, loanAmount: text }));
        triggerBotMessage(`Waah! 🎉 Aapka ₹${text} ka loan requirement note kar liya hai. Ab batayein, aapko konsa loan chahiye?`, ["Home Loan", "Business Loan", "Loan Against Property", "Personal Loan"]);
        setCurrentStep("LOAN_TYPE_SELECTION");
        break;

                  case "LOAN_TYPE_SELECTION":
        setLeadData(prev => ({ ...prev, loanType: text }));
        if (text.toLowerCase().includes("business") || text.includes("GST") || text.includes("MSME") || text === "No_Reg") {
           triggerBotMessage("Great! Business loan ke liye property ki zarurat nahi. Aapka CIBIL score lagbhag kitna hai?", [
             "750+ (Ekdum Badhiya!)", "650-749 (Theek Theek)", "650 se Kam (Thodi Problem)", "Pehli Baar Loan Lena Hai"
           ]);
           setCurrentStep("ASK_CIBIL");
        } else if (text.toLowerCase().includes("personal")) {
           triggerBotMessage("Great! Personal loan ke liye property ki zarurat nahi. Aapka CIBIL score lagbhag kitna hai?", [
             "750+ (Ekdum Badhiya!)", "650-749 (Theek Theek)", "650 se Kam (Thodi Problem)", "Pehli Baar Loan Lena Hai"
           ]);
           setCurrentStep("ASK_CIBIL");
        } else if (text.toLowerCase().includes("bt") || text.toLowerCase().includes("balance transfer")) {
           triggerBotMessage("Behtareen chunaav. Balance Transfer se aapka interest rate kaafi kam ho sakta hai. Aapka current loan kis institution mein chal raha hai?", [
             "Nationalized Bank 🏦", "Private Bank 🏛️", "NBFC Institution 💳", "Other Bank"
           ]);
           setCurrentStep("BT_CURRENT_BANK");
        } else {
           triggerBotMessage("Aage badhne se pehle, kripya batayein: Kya aapne property final kar li hai ya abhi sirf limit check karni hai?", ["Property Dekh Li Hai 🏡", "Abhi Sirf Check Karna Hai"]);
           setCurrentStep("ASK_PROPERTY");
        }
        break;

            case "BT_CURRENT_BANK":
        if (text === "Other Bank/NBFC" || text.toLowerCase().includes("other")) {
           triggerBotMessage("Kripya apne us Bank ya NBFC ka naam bataein:");
           setCurrentStep("BT_OTHER_BANK_NAME");
        } else {
           setLeadData(prev => ({ ...prev, btBank: text }));
           triggerBotMessage("Wahan aapka maujooda interest rate (ROI) lagbhag kitna hai?", ["8.5% - 9%", "9% - 10%", "10% se zyada", "Nahi Pata"]);
           setCurrentStep("BT_CURRENT_ROI");
        }
        break;

      case "BT_OTHER_BANK_NAME":
        setLeadData(prev => ({ ...prev, btBank: text }));
        triggerBotMessage("Wahan aapka maujooda interest rate (ROI) lagbhag kitna hai?", ["8.5% - 9%", "9% - 10%", "10% se zyada", "Nahi Pata"]);
        setCurrentStep("BT_CURRENT_ROI");
        break;

      case "BT_CURRENT_ROI":
        setLeadData(prev => ({ ...prev, btRoi: text }));
        triggerBotMessage("Is loan ko chalte hue kitna time ho gaya hai? (BT ke liye kam se kam 12 EMI pay honi zaroori hain)", ["1 saal se kam", "1-3 saal", "3 saal se zyada"]);
        setCurrentStep("BT_VINTAGE");
        break;

      case "BT_VINTAGE":
        setLeadData(prev => ({ ...prev, btVintage: text }));
        triggerBotMessage("Pichle 12 mahino mein kya aapki koi EMI bounce hui hai?", ["Nahi, ekdum clear track hai", "Haan, 1-2 bounce thi par pay kar di", "Haan, kaafi bounce hain"]);
        setCurrentStep("BT_EMI_BOUNCE");
        break;

      case "BT_EMI_BOUNCE":
        setLeadData(prev => ({ ...prev, btEmiBounce: text }));
        triggerBotMessage("Aapka abhi balance outstanding amount lagbhag kitna bacha hai jo transfer karna hai? (jaise: 25 Lakh)");
        setCurrentStep("BT_OUTSTANDING");
        break;

      case "BT_OUTSTANDING":
        setLeadData(prev => ({ ...prev, loanAmount: text }));
        triggerBotMessage("Dhanyawad. Kripya apni employment profile chunein:", ["Salaried (Job)", "Self-Employed (Business)"]);
        setCurrentStep("EMP_TYPE");
        break;

      case "ASK_PROPERTY":
        if (text.toLowerCase().includes("business")) {
          setLeadData(prev => ({ ...prev, loanType: "Business Loan", empType: "Self-Employed" }));
        }
        setLeadData(prev => ({ ...prev, propertyIdentified: text }));
        triggerBotMessage("Bilkul! 👍 Ek aur important baat — banks aapka CIBIL score zaroor dekhte hain. Aapka score abhi lagbhag kitna hai?", [
          "750+ (Ekdum Badhiya! 🌟)", "650-749 (Theek Theek)", "650 se Kam (Thodi Problem)", "Pehli Baar Loan Lena Hai"
        ]);
        setCurrentStep("ASK_CIBIL");
        break;

      case "ASK_CIBIL":
        if (!/\d/.test(text) && !text.includes("Pehli Baar") && !text.includes("Kam") && text.length < 15) {
          triggerBotMessage("Kshama karein. Kripya apna CIBIL score numbers mein darj karein ya niche diye options chunein. (jaise 750) ya button dabayein.", [
            "750+ (Ekdum Badhiya! 🌟)", "650-749 (Theek Theek)", "650 se Kam (Thodi Problem)", "Pehli Baar Loan Lena Hai"
          ]);
          return;
        }
        setLeadData(prev => ({ ...prev, cibilStatus: text }));
        if (text.includes("650 se Kam") || text.includes("Below 650") || text.match(/\b([3-5]\d\d|6[0-4]\d)\b/)) {
          triggerBotMessage("Koi baat nahi! 😊 Low CIBIL hona koi mushkil nahi. Hamare paas BFS Special Lending Pool uplabdh hai jo low score par bhi loan dete hain — khaaskar agar koi Co-Applicant ho. Aap aage badhna chahenge?", ["Haan, Aage Badhein ✅", "WhatsApp Executive 💬", "Pehle Expert Se Baat Karein"]);
        } else {
          triggerBotMessage("Excellent. Aapka profile bahut achha hai aur best interest rates ke poore chances hain. Kripya batayein aapko kitne loan amount ki aavashyakta hai?");
        }
        setCurrentStep("LOAN_AMOUNT");
        break;

      case "LOAN_AMOUNT":
        if (text === "Talk to Expert" || text === "Pehle Expert Se Baat Karein") {
           triggerBotMessage("Zarur! Aap seedha call karein: 📞 7900-979-001 — Adv. Praveen Bhardwaj aapki poori help karenge!"); setCurrentStep("CLOSED"); break;
        }
        if (text.includes("?")) {
           triggerBotMessage("Bilkul valid sawaal hai aapka! 😊 Pehle loan amount bata dein, main aapko poori detail samjhata hun. Amount number mein likhein (jaise: 25 Lakh ya 50 Lakh).", ["Cancel"]);
           return;
        }
        if (text === "Nahi, kam chahiye") {
           triggerBotMessage("Maafi chahenge! 🙏 Hum sirf 10L+ loans mein hi deal karte hain. Agar future mein requirement ho toh hume zaroor yaad kijiye!");
           setCurrentStep("CLOSED");
           return;
        }
        if (text === "Haan, 10 Lakh se upar") {
           triggerBotMessage("Great! Kripya apna loan amount bata dein (jaise: 15 Lakh)");
           return;
        }
        if (!/\d/.test(text) && !text.toLowerCase().includes("lakh") && !text.toLowerCase().includes("crore")) {
           triggerBotMessage("Maafi chahta hun, amount samajh nahi aaya. 😅 Kya aap number mein bata sakte hain? Jaise: '25 Lakh' ya '1.5 Crore'", ["Cancel"]);
           return;
        }

        // 10 Lakh Minimum Amount Logic
        const amtStr2 = text.toLowerCase().replace(/,/g, '');
        let numericAmount2 = 1000000;
        if (amtStr2.includes("lakh") || amtStr2.includes("lac") || amtStr2.match(/\bl\b/)) {
           const match = amtStr2.match(/[\d.]+/);
           if (match) numericAmount2 = parseFloat(match[0]) * 100000;
        } else if (amtStr2.includes("crore") || amtStr2.includes("cr")) {
           const match = amtStr2.match(/[\d.]+/);
           if (match) numericAmount2 = parseFloat(match[0]) * 10000000;
        } else if (amtStr2.includes("k") || amtStr2.includes("thousand") || amtStr2.includes("hazar")) {
           const match = amtStr2.match(/[\d.]+/);
           if (match) numericAmount2 = parseFloat(match[0]) * 1000;
        } else {
           const match = amtStr2.match(/[\d.]+/);
           if (match) numericAmount2 = parseFloat(match[0]);
           if (numericAmount2 < 1000 && numericAmount2 > 0 && !amtStr2.includes("000")) numericAmount2 = numericAmount2 * 100000;
        }

        if (numericAmount2 > 0 && numericAmount2 < 1000000) {
           triggerBotMessage("Maaf kijiyega, humari policy ke anusaar hum filhaal sirf 10 Lakh ya usse upar ke loans hi process karte hain. 🙏 Kya aapko 10 Lakh ya usse zyada ki requirement hai?", ["Haan, 10 Lakh se upar", "Nahi, kam chahiye"]);
           return;
        }

        setLeadData(prev => ({ ...prev, loanAmount: text }));
        if (leadData.empType === "Self-Employed") {
          triggerBotMessage("Dhanyawad. Kripya apna shubh naam darj karein taaki hum aapki profile taiyar kar sakein.");
          setCurrentStep("ASK_NAME");
        } else {
          triggerBotMessage("Accha! Aap job karte hain ya apna koi business hai? 🤔", ["Naukri Hai (Salaried) 💼", "Apna Business Hai 🏪"]);
          setCurrentStep("EMP_TYPE");
        }
        break;

      case "EMP_TYPE":
        if (text.toLowerCase().includes("business") || text.toLowerCase().includes("self") || text.includes("🏪")) {
           setLeadData(prev => ({ ...prev, empType: "Self-Employed" }));
        } else {
           setLeadData(prev => ({ ...prev, empType: "Salaried (Job)" }));
        }
        triggerBotMessage("Shukriya! 😊 Ab sirf do cheezein chahiye — naam aur number. Pehle apna naam batayein!");
        setCurrentStep("ASK_NAME");
        break;

      case "ASK_NAME":
        setLeadData(prev => ({ ...prev, name: text }));
        triggerBotMessage(`Dhanyawad ${text} ji. Kripya apna 10-digit mobile number darj karein. Hamare senior expert jald hi aapse sampark karenge.`);
        setCurrentStep("ASK_PHONE");
        break;

      case "ASK_PHONE":
        if (text.replace(/\D/g, '').length < 10) {
          triggerBotMessage("Ek valid 10-digit mobile number chahiye, jaise: 9876543210 😊 Agar share nahi karna toh 'Cancel' kar sakte hain.", ["Cancel Process"]);
          return;
        }
        const finalData = { ...leadData, phone: text };
        setLeadData(finalData);
        setCurrentStep("SUBMITTING");
        triggerBotMessage("Ek second... aapki profile secure tarike se submit ho rahi hai! ⏳", undefined, 400);
        
        let numericAmount = 3000000;
        const amtStr = finalData.loanAmount.toLowerCase();
        if (amtStr.includes("lakh") || amtStr.includes("l")) {
           const match = amtStr.match(/[\d.]+/);
           if (match) numericAmount = parseFloat(match[0]) * 100000;
        } else if (amtStr.includes("crore") || amtStr.includes("cr")) {
           const match = amtStr.match(/[\d.]+/);
           if (match) numericAmount = parseFloat(match[0]) * 10000000;
        } else {
           const match = amtStr.match(/[\d]+/);
           if (match) numericAmount = parseFloat(match[0]);
        }

        try {
          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              name: finalData.name, 
              phone: finalData.phone,
              email: `bot-${finalData.phone}@bfs.local`, 
              loanType: finalData.loanType, 
              employmentType: finalData.empType,
              loanAmount: numericAmount,
              source: "AI SmartBot",
              message: `Bot Chat Details:\n- Loan Amount: ${finalData.loanAmount}\n- CIBIL Status: ${finalData.cibilStatus}\n- Property Status: ${finalData.propertyIdentified}\n- Emp Type: ${finalData.empType}` 
            })
          });

          // Generate Personalized Document Checklist
          let docs = [
            "✅ PAN Card & Aadhar Card",
            "✅ 2 Passport Size Photographs",
            "✅ Current Residence Proof (Electricity Bill/Rent Agreement)"
          ];

          if (finalData.empType === "Salaried" || finalData.empType === "Salaried (Job)") {
            docs.push("✅ Last 3 Months Salary Slips");
            docs.push("✅ Last 6 Months Bank Statement (Salary Account)");
            docs.push("✅ Form 16 or Last 2 Years ITR");
          } else {
            docs.push("✅ Last 12 Months Current/Savings Bank Statement");
            if (finalData.loanType.includes("GST")) {
              docs.push("✅ GST Registration Certificate & 1 Year GST Returns");
            }
            if (finalData.loanType === "MSME_Only") {
              docs.push("✅ Udyam / MSME Certificate");
            }
            docs.push("✅ Last 2-3 Years ITR with Computation of Income & Balance Sheet");
          }

          if (finalData.loanType.includes("Home") || finalData.loanType === "LAP" || finalData.loanType === "Balance Transfer") {
             if (finalData.propertyIdentified && finalData.propertyIdentified.includes("Finalized")) {
                docs.push("✅ Property Agreement to Sale (ATS) / Token Receipt");
                docs.push("✅ Property Chain / Previous Registries (13-30 years)");
                docs.push("✅ Approved Map / Sanction Plan");
             } else {
                docs.push("✅ (Once Property is finalized): Property Registry & Chain Documents");
             }
          }

          if (finalData.loanType === "Balance Transfer") {
             docs.push("✅ Existing Loan Sanction Letter");
             docs.push("✅ Last 12 Months Loan Track Record (Statement)");
             docs.push("✅ List of Documents (LOD) from Current Bank");
          }

          const checklistHtml = `
            <p>✅ <strong>Profile Submitted Successfully!</strong> Our senior counselor will call you shortly.</p>
            <div class="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 class="font-bold text-emerald-800 text-[14px] mb-2 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                Your Personalized Document Checklist
              </h4>
              <p class="text-xs text-emerald-600 mb-3">Based on your profile (${finalData.empType || 'Business'}, ${finalData.loanType.replace(/_/g, ' ')}), please keep these documents ready for faster processing:</p>
              <ul class="space-y-1.5 text-[13px] text-slate-700 font-medium">
                ${docs.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          `;

          triggerBotMessage(checklistHtml, ["Close Chat", "Start Over"]);
          setCurrentStep("SUCCESS");
        } catch (error) {
          triggerBotMessage("Sorry, error submitting. Please call us.");
          setCurrentStep("SUCCESS");
        }
        break;

      case "DOC_LOAN_TYPE":
        setLeadData(prev => ({ ...prev, docLoanType: text }));
        if (text === "Home Loan") {
           triggerBotMessage("Is Home Loan ka kya purpose hai?", ["Ready to Move", "Plot Purchase", "Construction", "Renovation"]);
           setCurrentStep("DOC_SUB_TYPE");
        } else if (text === "Business Loan") {
           triggerBotMessage("Business Loan ke liye aapka business type kya hai?", ["GST Registered (High Turnover)", "GST Registered (Low Turnover)", "MSME Only (No GST)", "Cash Business"]);
           setCurrentStep("DOC_BIZ_TYPE");
        } else {
           triggerBotMessage("Aapki employment profile kya hai?", ["Salaried (Job)", "Self-Employed (Business)"]);
           setCurrentStep("DOC_EMP_TYPE");
        }
        break;

      case "DOC_SUB_TYPE":
        setLeadData(prev => ({ ...prev, docSubType: text }));
        triggerBotMessage("Aapki employment profile kya hai?", ["Salaried (Job)", "Self-Employed (Business)"]);
        setCurrentStep("DOC_EMP_TYPE");
        break;

      case "DOC_EMP_TYPE":
        setLeadData(prev => ({ ...prev, docEmpType: text }));
        if (text.includes("Salaried")) {
           triggerBotMessage("Aapki job kis type ki hai?", ["Govt Job / PSU", "Private Job (MNC/Pvt Ltd)", "Cash Salary"]);
           setCurrentStep("DOC_SALARY_TYPE");
        } else {
           triggerBotMessage("Aapka business kis type ka hai aur GST status kya hai?", ["GST Registered (High Turnover)", "GST Registered (Low Turnover)", "MSME Only (No GST)", "Cash Business"]);
           setCurrentStep("DOC_BIZ_TYPE");
        }
        break;

      case "DOC_SALARY_TYPE":
      case "DOC_BIZ_TYPE": {
        const isSalaried = currentStep === "DOC_SALARY_TYPE";
        const newLeadData = { ...leadData, [isSalaried ? 'docSalaryType' : 'docBizType']: text };
        setLeadData(newLeadData);
        
        let docs = [
          "✅ PAN Card & Aadhar Card",
          "✅ 2 Passport Size Photographs",
          "✅ Current Residence Proof (Electricity Bill/Rent Agreement)"
        ];

        if (isSalaried) {
          docs.push("✅ Last 3 Months Salary Slips");
          docs.push("✅ Last 6 Months Bank Statement (Salary Account)");
          if (text.includes("Govt") || text.includes("Private")) {
             docs.push("✅ Form 16 (Last 2 Years)");
             docs.push("✅ Employee ID Card");
          } else {
             docs.push("✅ Salary Certificate / Cash Vouchers");
          }
        } else {
          docs.push("✅ Last 12 Months Current/Savings Bank Statement");
          if (text.includes("GST")) {
            docs.push("✅ GST Registration Certificate & 1 Year GST Returns");
          }
          if (text.includes("MSME")) {
            docs.push("✅ Udyam / MSME Certificate");
          }
          if (text.includes("Cash")) {
            docs.push("✅ Shop Act / Gumasta / Labor License");
            docs.push("✅ Kachha Bill / Register Book (for income proof)");
          } else {
            docs.push("✅ Last 2-3 Years ITR with Computation of Income & Balance Sheet");
          }
        }

        const loan = (newLeadData.docLoanType || "").toLowerCase();
        const sub = (newLeadData.docSubType || "").toLowerCase();
        
        if (loan.includes("home") || loan.includes("lap") || loan.includes("property") || loan.includes("balance transfer") || loan.includes("bt")) {
           if (sub.includes("ready") || sub.includes("purchase")) {
              docs.push("✅ Property Agreement to Sale (ATS) / Token Receipt");
              docs.push("✅ Property Chain / Previous Registries (13-30 years)");
              docs.push("✅ Approved Map / Sanction Plan");
           } else if (sub.includes("construction")) {
              docs.push("✅ Plot Registry");
              docs.push("✅ Construction Estimate from Architect");
              docs.push("✅ Approved Construction Map");
           } else if (loan.includes("home")) {
              docs.push("✅ (Once Property is finalized): Property Registry & Chain Documents");
           } else {
              docs.push("✅ Property Registry / Title Deed");
              docs.push("✅ Property Chain (Previous Registries)");
              docs.push("✅ Approved Map (Nagar Nigam / Authority)");
           }
        }

        if (loan.includes("balance transfer") || loan.includes("bt")) {
           docs.push("✅ Existing Loan Sanction Letter");
           docs.push("✅ Last 12 Months Loan Track Record (Statement)");
           docs.push("✅ List of Documents (LOD) from Current Bank");
           docs.push("✅ Foreclosure Letter");
        }

        const docListHtml = `
          <div class="mt-2 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h4 class="font-bold text-emerald-800 text-[14px] mb-2 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
              Sateek Document Checklist
            </h4>
            <p class="text-[11px] text-emerald-600 mb-3 uppercase tracking-wider font-bold border-b border-emerald-200/50 pb-2">Profile: ${isSalaried ? text : text} | ${loan} ${sub ? `(${sub})` : ''}</p>
            <ul class="space-y-2 text-[13px] text-slate-700 font-medium">
              ${docs.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
          <p class="mt-4 text-[13px] font-semibold text-slate-700">Ye lijiye aapki complete checklist! Kya aap is loan ke liye apply karna chahenge?</p>
        `;

        triggerBotMessage(docListHtml, ["Apply for Loan", "Start Over", "Close Chat"], 1200);
        setCurrentStep("SUCCESS");
        break;
      }

      case "CLOSED":
      case "SUCCESS":
      case "AWAITING_FEEDBACK":
        if (text === "Start Over") {
          setMessages([]);
          setCurrentStep("GREETING");
          setLeadData({ loanType: "Home Loan", propertyIdentified: "", cibilStatus: "", loanAmount: "", empType: "", name: "", phone: "", docLoanType: "", docSubType: "", docEmpType: "", docSalaryType: "", docBizType: "", btBank: "", btRoi: "", btVintage: "", btEmiBounce: "", btOutstanding: "" });
          sessionStorage.removeItem('smartbot_messages');
          sessionStorage.removeItem('smartbot_step');
          sessionStorage.removeItem('smartbot_lead');
          triggerBotMessage(`${getGreeting()}! I am back. How can I help you today?`, ["I want a Home Loan", "Check Eligibility"], 600, undefined, false);
        } else if (text === "Apply for Loan") {
          setLeadData(prev => ({ ...prev, loanType: prev.docLoanType || "Home Loan", empType: prev.docEmpType || "Salaried" }));
          triggerBotMessage("Great! To start your application, what is your approximate CIBIL score?", [
            "750+ (Excellent)", "650 - 749 (Average)", "Below 650 (Poor/Default)", "Never taken a loan"
          ]);
          setCurrentStep("ASK_CIBIL");
        } else if (text === "Close Chat") {
          onClose();
        }
        break;
    }
  };

  const handleEmiApply = (amount: number) => {
    const formattedAmt = `₹${(amount/100000).toFixed(1)} Lakhs`;
    setLeadData(prev => ({ ...prev, loanAmount: formattedAmt }));
    setMessages((prev) => [...prev, { id: Math.random().toString(), sender: "user", text: `I want to apply for ${formattedAmt}` }]);
    triggerBotMessage("Smart choice! Before we proceed, have you identified the property yet?", ["Yes, Property Finalized", "No, just checking limits"]);
    setCurrentStep("ASK_PROPERTY");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue("");
    handleUserAction(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const requiresTextInput = currentStep !== "SUBMITTING" && currentStep !== "SUCCESS";
  const progress = progressMap[currentStep] || 0;

  // Container - full screen on mobile, popup on desktop
  const containerClasses = inline
    ? "w-full h-full bg-white font-sans flex overflow-hidden"
    : isFullScreen
      ? "fixed inset-0 z-[9999] w-full h-[100dvh] bg-white font-sans flex"
      : "fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[9999] w-full sm:w-[400px] h-[85dvh] sm:h-[640px] max-h-[90dvh] font-sans rounded-t-2xl sm:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sm:shadow-2xl border-t sm:border border-slate-200";

  return (
    <div className={containerClasses}>

      {/* ── SIDEBAR OVERLAY ─────────────────────────────────── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[10000] flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />

          {/* Drawer Panel - Gemini style */}
          <div className="relative w-[85vw] max-w-[340px] h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-left-2 duration-200">
            
            {/* Top: Logo + Close */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                  <img src="/logo.png" alt="BFS" className="w-5 h-5 object-contain brightness-0 invert" />
                </div>
                <span className="font-bold text-slate-800 text-base">BFS Advisor</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Actions */}
            <div className="px-3 pb-2 space-y-1">
              <button onClick={() => { startNewSession(); setIsSidebarOpen(false); }} className="w-full flex items-center gap-4 px-4 py-3 rounded-full hover:bg-slate-100 text-slate-700 transition group">
                <Plus className="w-5 h-5 text-slate-500 group-hover:text-emerald-600" />
                <span className="text-[14px] font-medium">New chat</span>
              </button>
              <div className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-slate-100 transition group cursor-pointer">
                <Search className="w-5 h-5 text-slate-500 group-hover:text-emerald-600" />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search chats"
                    value={sidebarSearch}
                    onChange={e => setSidebarSearch(e.target.value)}
                    className="w-full text-[14px] text-slate-700 bg-transparent outline-none placeholder-slate-400 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 mx-4 my-1" />

            {/* Recent Chats */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">Recent</p>
              {sessions
                .filter(s => !sidebarSearch || s.title.toLowerCase().includes(sidebarSearch.toLowerCase()))
                .map(s => (
                  <div key={s.id} className={`group flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition ${s.id === currentSessionId ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-100 text-slate-700'}`}>
                    <button onClick={() => { loadSession(s.id); setIsSidebarOpen(false); }} className="flex-1 truncate text-left text-[14px] font-medium">
                      {s.title}
                    </button>
                    <button onClick={(e) => requestDeleteSession(e, s.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 text-slate-400 hover:text-red-500 rounded-full transition shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              {sidebarSearch && sessions.filter(s => s.title.toLowerCase().includes(sidebarSearch.toLowerCase())).length === 0 && (
                <p className="text-sm text-slate-400 text-center py-8">Koi chat nahi mili</p>
              )}
            </div>

            {/* Bottom: Settings */}
            <div className="h-px bg-slate-100 mx-4" />
            <div className="px-3 py-3">
              <div className="flex items-center gap-4 px-4 py-3 rounded-full hover:bg-slate-100 transition cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">BFS Captain</p>
                  <p className="text-[11px] text-slate-400">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CHAT WINDOW ─────────────────────────────────── */}
      <div className={`w-full h-full flex flex-col bg-white overflow-hidden ${(!isFullScreen && !inline) ? 'rounded-t-2xl sm:rounded-2xl sm:shadow-2xl sm:border sm:border-slate-200' : ''}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-full hover:bg-slate-100 transition -ml-1">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            {/* Logo + Name */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center">
                <img src="/logo.png" alt="BFS" className="w-4 h-4 object-contain brightness-0 invert" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800 leading-none">BFS Advisor</p>
                <p className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block animate-pulse"></span> Training Mode • Coming Soon
                </p>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button onClick={toggleTts} className="p-2 rounded-full hover:bg-slate-100 transition" title="Voice">
              {isTtsEnabled ? <Volume2 className="w-4.5 h-4.5 text-slate-600" /> : <VolumeX className="w-4.5 h-4.5 text-slate-400" />}
            </button>
            {!inline && (
              <button onClick={() => setIsFullScreen(!isFullScreen)} className="flex p-2 rounded-full hover:bg-slate-100 transition" title="Toggle fullscreen">
                {isFullScreen ? <Minimize2 className="w-4 h-4 text-slate-600" /> : <Maximize2 className="w-4 h-4 text-slate-600" />}
              </button>
            )}
            {!inline && (
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition" title="Close">
                <X className="w-4.5 h-4.5 text-slate-600" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && progress < 100 && (
          <div className="h-0.5 bg-slate-100">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white scroll-smooth">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"} group`}>
              
              {m.sender === "bot" && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                    <img src="/logo.png" alt="BFS" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">BFS Advisor</span>
                </div>
              )}

              <div className={`max-w-[88%] ${m.sender === "bot" ? "ml-8" : ""} text-[14px] leading-relaxed whitespace-pre-wrap ${
                m.sender === "user"
                  ? "bg-slate-100 text-slate-800 rounded-2xl rounded-tr-sm px-4 py-3"
                  : "text-slate-800"
              }`}>
                {m.sender === "bot" ? (
                  <div dangerouslySetInnerHTML={{ __html: m.text }} className="bot-rich-text" />
                ) : (
                  m.text
                )}
                {m.widget === "loan_type" && <InChatLoanTypeSelector onSelect={(type) => handleUserAction(type)} />}
                {m.widget === "home_loan_purpose" && <InChatHomeLoanPurposeSelector onSelect={(type) => handleUserAction(type)} />}
                {m.widget === "business_profile" && <InChatBusinessProfileSelector onSelect={(type) => handleUserAction(type)} />}
                {m.widget === "emi" && <InChatEmiCalc onApply={(amt) => handleUserAction(amt.toString())} />}
                {m.widget === "eligibility" && <InChatEligibilityCalc onComplete={(amt) => handleUserAction(amt.toString())} />}
                {m.widget === "bt" && <InChatBtCalc onApply={() => handleUserAction("I want to transfer my loan")} />}
                {m.widget === "ltv" && <InChatLtvCalc onApply={(amt) => handleUserAction(amt.toString())} />}
                {m.widget === "whatsapp_fallback" && (
                  <InChatWhatsAppConnect 
                    userQuery={m.widgetData?.userQuery} 
                    onSelectAction={(action) => handleUserAction(action)} 
                  />
                )}
              </div>

              {/* Feedback */}
              {m.sender === "bot" && m.feedbackState === "none" && (
                <div className="flex items-center gap-1 mt-1 ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleFeedback(m.id, "liked")} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-500 transition">
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleFeedback(m.id, "disliked")} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-red-400 transition">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Quick Reply Options */}
              {m.options && m.id === messages[messages.length - 1].id && (
                <div className={`flex flex-wrap gap-2 mt-3 ${m.sender === "bot" ? "ml-8" : ""} animate-in fade-in slide-in-from-bottom-2`}>
                  {m.options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleUserAction(opt)}
                      className="px-4 py-2 border border-slate-200 text-slate-700 text-[12.5px] font-medium rounded-full hover:bg-slate-50 hover:border-emerald-300 hover:text-emerald-700 transition-all flex items-center gap-1.5">
                      {opt} <ChevronRight className="w-3 h-3 opacity-50" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="BFS" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
              </div>
              <div className="flex gap-1 px-3 py-2">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar - Gemini style */}
        {requiresTextInput && (
          <div className="px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-2 bg-white border-t border-slate-100 shrink-0 relative">
            <div className="relative group">
              {/* Dynamic Glow Effect - Auto Animated */}
              <div className={`absolute -inset-1 rounded-full blur-md transition-all duration-700 pointer-events-none bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] animate-shine
                ${inputValue.trim() 
                  ? 'opacity-60 scale-[1.03]' 
                  : 'opacity-25 scale-100 group-hover:opacity-40 group-focus-within:opacity-50'}`} 
              />
              
              <form onSubmit={handleFormSubmit} className={`relative flex items-center gap-2 bg-white border rounded-full px-4 py-2.5 transition-all duration-300
                  ${inputValue.trim() 
                    ? 'border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-2 ring-emerald-100/50' 
                    : 'border-slate-200 shadow-sm focus-within:border-emerald-300 group-hover:border-slate-300 group-hover:shadow-md'}`}>
                <input
                  type={currentStep === "ASK_PHONE" ? "tel" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Apna sawal likhein..."
                  className="flex-1 bg-transparent text-[14px] text-slate-800 outline-none placeholder-slate-400 min-w-0"
                />
                <button type="button" onClick={startVoiceInput} className={`p-1.5 rounded-full transition-transform ${isListening ? 'text-red-500 bg-red-50 animate-pulse' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 hover:scale-110'}`}>
                  <Mic className="w-4.5 h-4.5" />
                </button>
                {inputValue.trim() && (
                  <button type="submit" className="p-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 text-white hover:scale-110 active:scale-90 shadow-md flex items-center justify-center animate-in zoom-in">
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {sessionToDelete && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-full">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-red-900 text-base">Delete Chat History</h3>
            </div>
            <div className="p-5">
              <p className="text-slate-600 text-[13px] font-medium leading-relaxed">Are you sure you want to permanently delete this consultation? This action cannot be undone.</p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button onClick={() => setSessionToDelete(null)} className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition">
                Cancel
              </button>
              <button onClick={confirmDeleteSession} className="px-4 py-2 text-[13px] font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition">
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
