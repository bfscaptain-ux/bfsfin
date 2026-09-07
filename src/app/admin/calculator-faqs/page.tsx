"use client";

import { useState, useEffect } from "react";
import { Calculator, Plus, Trash2, Eye, EyeOff, Save, ChevronDown, ChevronUp, Pencil, X } from "lucide-react";

const CALCULATOR_IDS = [
  { id: "itr-filing", label: "📋 ITR Filing Services" },
  { id: "msme-registration", label: "🏢 MSME / Udyam Registration" },
  { id: "emi", label: "Home Loan EMI Calculator" },
  { id: "eligibility", label: "Loan Eligibility Calculator" },
  { id: "balance-transfer", label: "Balance Transfer Calculator" },
  { id: "prepayment", label: "Prepayment Impact Tool" },
  { id: "stamp-duty", label: "Stamp Duty Calculator" },
  { id: "hlv", label: "HLV – Human Life Value" },
  { id: "health-premium", label: "Health Premium Estimator" },
  { id: "tax-saver", label: "80C & 80D Tax Saver" },
  { id: "payoff", label: "Credit Card Payoff" },
  { id: "minimum-due", label: "Minimum Due Trap" },
  { id: "rewards", label: "CC Reward Maximizer" },
];

interface FAQ {
  id: string;
  calculatorId: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function CalculatorFAQsAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCalc, setFilterCalc] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editFaq, setEditFaq] = useState<FAQ | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [calcId, setCalcId] = useState(CALCULATOR_IDS[0].id);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchFaqs = () => {
    setLoading(true);
    fetch("/api/admin/calculator-faqs")
      .then((res) => res.json())
      .then((data) => { 
        // Ensure we always store an array
        setFaqs(Array.isArray(data) ? data : []); 
        setLoading(false); 
      })
      .catch(() => { setFaqs([]); setLoading(false); });
  };

  useEffect(() => { fetchFaqs(); }, []);

  const openCreate = () => {
    setEditFaq(null);
    setCalcId(CALCULATOR_IDS[0].id);
    setQuestion("");
    setAnswer("");
    setSortOrder(faqs.length);
    setShowModal(true);
  };

  const openEdit = (faq: FAQ) => {
    setEditFaq(faq);
    setCalcId(faq.calculatorId);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setSortOrder(faq.sortOrder);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    setIsSubmitting(true);

    const url = editFaq
      ? `/api/admin/calculator-faqs/${editFaq.id}`
      : "/api/admin/calculator-faqs";
    const method = editFaq ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calculatorId: calcId, question, answer, sortOrder }),
      });
      if (res.ok) {
        setShowModal(false);
        fetchFaqs();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (faq: FAQ) => {
    await fetch(`/api/admin/calculator-faqs/${faq.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !faq.isActive }),
    });
    fetchFaqs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Kya aap is FAQ ko delete karna chahte hain?")) return;
    await fetch(`/api/admin/calculator-faqs/${id}`, { method: "DELETE" });
    fetchFaqs();
  };

  const filtered = filterCalc === "all" ? faqs : faqs.filter((f) => f.calculatorId === filterCalc);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Service &amp; Calculator FAQs CMS</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage FAQs shown on ITR, MSME, Tools &amp; Calculator pages</p>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4" /> Add New FAQ
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCalc("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${filterCalc === "all" ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-400"}`}
        >
          All ({faqs.length})
        </button>
        {CALCULATOR_IDS.map((c) => {
          const count = faqs.filter((f) => f.calculatorId === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setFilterCalc(c.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${filterCalc === c.id ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-400"}`}
            >
              {c.label} ({count})
            </button>
          );
        })}
      </div>

      {/* FAQ List */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Koi FAQ nahi mila. Upar "Add New FAQ" karein.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((faq) => {
            const calcLabel = CALCULATOR_IDS.find((c) => c.id === faq.calculatorId)?.label || faq.calculatorId;
            return (
              <div
                key={faq.id}
                className={`bg-white dark:bg-slate-900 border rounded-xl p-5 transition-all ${faq.isActive ? "border-slate-200 dark:border-slate-800" : "border-dashed border-slate-300 dark:border-slate-700 opacity-60"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                        {calcLabel}
                      </span>
                      {!faq.isActive && (
                        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">Hidden</span>
                      )}
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white">{faq.question}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggle(faq)}
                      title={faq.isActive ? "Hide FAQ" : "Show FAQ"}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
                    >
                      {faq.isActive ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openEdit(faq)}
                      className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {editFaq ? "FAQ Edit Karein" : "Naya FAQ Add Karein"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Calculator Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Calculator</label>
                <select
                  value={calcId}
                  onChange={(e) => setCalcId(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CALCULATOR_IDS.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Jaise: HLV calculator kya hota hai?"
                  required
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Answer</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Detailed answer likhein..."
                  rows={5}
                  required
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  min={0}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-slate-400 mt-1">Chhoti sankhya = pehle dikhega</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
