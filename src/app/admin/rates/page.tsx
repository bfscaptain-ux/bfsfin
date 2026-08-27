"use client";

import { useState, useEffect } from "react";
import { TrendingDown, Plus, Edit2, Trash2, CheckCircle2, RefreshCw } from "lucide-react";

interface BankRateItem {
  id: string;
  bankName: string;
  category: string;
  interestRate: number;
  processingFee: string;
  speedDays: number;
  badge: string | null;
}

export default function AdminRatesCMS() {
  const [rates, setRates] = useState<BankRateItem[]>([
    { id: "1", bankName: "Punjab National Bank (PNB)", category: "Salaried", interestRate: 6.50, processingFee: "₹2,500 + GST", speedDays: 5, badge: "Lowest Interest Rate" },
    { id: "2", bankName: "Central Bank of India", category: "Salaried", interestRate: 6.70, processingFee: "Zero Fee Special", speedDays: 7, badge: "Fast Disbursal" },
    { id: "3", bankName: "IDBI Bank", category: "Self-Employed", interestRate: 6.60, processingFee: "₹2,200", speedDays: 6, badge: "Best for Self-Employed" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BankRateItem | null>(null);

  const [form, setForm] = useState({
    bankName: "",
    category: "Salaried",
    interestRate: "6.50",
    processingFee: "₹2,500",
    speedDays: "5",
    badge: "Special Rate"
  });

  const fetchRates = async () => {
    try {
      const res = await fetch("/api/admin/rates");
      const data = await res.json();
      if (data.success && data.rates.length > 0) {
        setRates(data.rates);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({ bankName: "", category: "Salaried", interestRate: "6.50", processingFee: "₹2,500", speedDays: "5", badge: "Special Rate" });
    setShowModal(true);
  };

  const handleOpenEdit = (item: BankRateItem) => {
    setEditingItem(item);
    setForm({
      bankName: item.bankName,
      category: item.category,
      interestRate: item.interestRate.toString(),
      processingFee: item.processingFee,
      speedDays: item.speedDays.toString(),
      badge: item.badge || ""
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.bankName || !form.interestRate) return;

    if (editingItem) {
      // Update
      const updated = rates.map(r => r.id === editingItem.id ? {
        ...r,
        bankName: form.bankName,
        category: form.category,
        interestRate: parseFloat(form.interestRate),
        processingFee: form.processingFee,
        speedDays: parseInt(form.speedDays),
        badge: form.badge
      } : r);
      setRates(updated);

      try {
        await fetch("/api/admin/rates", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...form })
        });
      } catch (err) { console.log(err); }
    } else {
      // Create
      const newRateItem: BankRateItem = {
        id: Date.now().toString(),
        bankName: form.bankName,
        category: form.category,
        interestRate: parseFloat(form.interestRate),
        processingFee: form.processingFee,
        speedDays: parseInt(form.speedDays),
        badge: form.badge
      };
      setRates([...rates, newRateItem]);

      try {
        await fetch("/api/admin/rates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      } catch (err) { console.log(err); }
    }

    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    setRates(rates.filter(r => r.id !== id));
    try {
      await fetch(`/api/admin/rates?id=${id}`, { method: "DELETE" });
    } catch (e) { console.log(e); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-900 border border-emerald-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-emerald-400" /> Bank Interest Rates CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Any rate change made here immediately updates the Live Ticker &amp; User Rate Chart on the public website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Add New Bank Rate Slab
        </button>
      </div>

      {/* Table */}
      <div className="bg-emerald-900 border border-emerald-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-emerald-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-emerald-800">
              <tr>
                <th className="py-3 px-4">Bank Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Interest Rate</th>
                <th className="py-3 px-4">Processing Fee</th>
                <th className="py-3 px-4">Approval Speed</th>
                <th className="py-3 px-4">Badge / Highlight</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rates.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-white">{r.bankName}</td>
                  <td className="py-3.5 px-4 text-slate-300">{r.category}</td>
                  <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">{r.interestRate.toFixed(2)}% p.a.</td>
                  <td className="py-3.5 px-4 text-slate-300">{r.processingFee}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400">{r.speedDays} Days</td>
                  <td className="py-3.5 px-4">
                    {r.badge ? (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {r.badge}
                      </span>
                    ) : "-"}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="p-1.5 bg-slate-800 text-emerald-400 hover:text-white rounded-lg border border-slate-700"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 bg-slate-800 text-red-400 hover:text-white rounded-lg border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-900 border border-emerald-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">
              {editingItem ? "Edit Bank Rate Details" : "Add New Bank Rate"}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bank Name *</label>
                <input
                  type="text"
                  required
                  value={form.bankName}
                  onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                  placeholder="e.g. Punjab National Bank (PNB)"
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Salaried">Salaried</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Balance Transfer">Balance Transfer</option>
                    <option value="Top-Up Loan">Top-Up Loan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Interest Rate (% p.a.) *</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={form.interestRate}
                    onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Processing Fee</label>
                  <input
                    type="text"
                    value={form.processingFee}
                    onChange={(e) => setForm({ ...form, processingFee: e.target.value })}
                    placeholder="e.g. ₹2,500 + GST"
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Approval Speed (Days)</label>
                  <input
                    type="number"
                    value={form.speedDays}
                    onChange={(e) => setForm({ ...form, speedDays: e.target.value })}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Highlight Badge</label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="e.g. Lowest Rate / Special Offer"
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl"
                >
                  Save Changes to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
