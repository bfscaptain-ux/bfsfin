"use client";

import React, { useEffect, useState, useRef } from "react";
import { Brain, Plus, Trash2, Power, PowerOff, UploadCloud, MessageSquare, Bot, Send, Search, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { processUserMessage } from "@/lib/nlp";

type Rule = {
  id: string;
  topic: string;
  instruction: string;
  isActive: boolean;
};

type Scenario = {
  id: string;
  userSays: string;
  botReplies: string;
  isActive: boolean;
};

type KnowledgeDoc = {
  id: string;
  filename: string;
  status: string;
  createdAt: string;
};

export default function AIStudioPage() {
  const [activeTab, setActiveTab] = useState<"rules" | "scenarios" | "knowledge" | "autosync">("scenarios");
  const [rules, setRules] = useState<Rule[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [docs, setDocs] = useState<KnowledgeDoc[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStats, setSyncStats] = useState<any>(null);
  const [botKnowledge, setBotKnowledge] = useState<any>(null);

  // Simulator State
  const [simMessages, setSimMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: "bot", text: "AI Simulator Ready. I will follow the rules and scenarios you define on the left." }
  ]);
  const [simInput, setSimInput] = useState("");

  // Form States
  const [topic, setTopic] = useState("");
  const [instruction, setInstruction] = useState("");
  const [userSays, setUserSays] = useState("");
  const [botReplies, setBotReplies] = useState("");

  useEffect(() => {
    fetchRules();
    fetchDocs();
    
    // Fetch live knowledge base
    fetch("/api/bot/knowledge")
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setBotKnowledge(data.data);
          setScenarios(data.data.scenarios || []);
        }
      });
  }, []);

  const fetchRules = async () => {
    try {
      const res = await fetch("/api/admin/bot-training");
      const data = await res.json();
      if (Array.isArray(data)) setRules(data);
    } catch (err) {}
  };

  const fetchDocs = async () => {
    try {
      const res = await fetch("/api/admin/bot-training/upload");
      const data = await res.json();
      if (Array.isArray(data)) setDocs(data);
    } catch (err) {}
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/bot-training/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        fetchDocs();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleDeleteDoc = async (id: string) => {
    if (!confirm("Delete this document? AI will forget this knowledge.")) return;
    await fetch(`/api/admin/bot-training/upload/${id}`, { method: "DELETE" });
    fetchDocs();
  };

  const handleSyncWebsite = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/admin/bot-training/sync-website", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSyncStats(data.stats);
        fetchDocs(); // Refresh the docs list to show the auto-sync file
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !instruction) return;
    await fetch("/api/admin/bot-training", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, instruction }),
    });
    setTopic(""); setInstruction("");
    fetchRules();
  };

  const handleAddScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSays || !botReplies) return;
    setScenarios(prev => [{ id: Math.random().toString(), userSays, botReplies, isActive: true }, ...prev]);
    setUserSays(""); setBotReplies("");
  };

  const toggleRuleActive = async (id: string, currentStatus: boolean) => {
    await fetch(`/api/admin/bot-training/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !currentStatus }),
    });
    fetchRules();
  };

  const handleSimulateSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim()) return;
    const text = simInput;
    setSimMessages(prev => [...prev, { sender: "user", text }]);
    setSimInput("");
    
    // Process via actual NLP engine
      setTimeout(() => {
        let reply = "Maaf karein, mujhe iska jawab nahi pata. Kripya apna sawal aur clearly puchiye ya customer care ko call karein.";
        
        const nlpResult = processUserMessage(text, botKnowledge);
        
        if (nlpResult.intent === "greeting") {
           reply = "Namaskar! Main BFS AI Assistant hoon. Batayein main aapki kya madad karu?";
        } else if (["emi_calculator", "bt_calculator", "ltv_calculator", "eligibility_calculator"].includes(nlpResult.intent)) {
           reply = "[ System: Calculator Widget Triggered on Frontend ]";
        } else if (nlpResult.intent === "cibil_issue") {
           reply = "[ System: CIBIL Workflow Triggered on Frontend ]";
        } else if (nlpResult.intent !== "unknown" && nlpResult.reply) {
          reply = nlpResult.reply;
        }
        
        setSimMessages(prev => [...prev, { sender: "bot", text: reply }]);
      }, 600);
  };

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simMessages]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden font-sans">
      
      {/* LEFT COLUMN: TRAINING STUDIO */}
      <div className="flex-1 overflow-y-auto border-r border-emerald-900/40 p-6 flex flex-col">
        
        {/* Studio Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 rounded-2xl border border-emerald-500/50 shadow-md flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white drop-shadow-sm flex items-center gap-2">
                Easy Bot Training Center <Sparkles className="w-4 h-4 text-emerald-200" />
              </h1>
              <p className="text-sm text-emerald-100 font-medium mt-1">Yahan se aap apne chatbot ko nayi baatein aur naye sawal-jawab sikha sakte hain.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" /> Bot Active
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-max overflow-x-auto">
          {[
            { id: "scenarios", label: "Sawal-Jawab (Q&A)", icon: MessageSquare },
            { id: "rules", label: "Bot ke Niyam (Rules)", icon: FileText },
            { id: "knowledge", label: "Files Upload", icon: UploadCloud },
            { id: "autosync", label: "Website Auto-Scan", icon: Sparkles }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT: RULES */}
        {activeTab === "rules" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-2">Bot ko naya Niyam (Rule) sikhayein</h2>
              <p className="text-sm text-slate-400 mb-4">Example: "Humesha politely baat karo", ya "Jab koi home loan pooche toh salary zaroor poocho."</p>
              <form onSubmit={handleAddRule} className="space-y-4">
                <div>
                  <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Niyam ka Naam (e.g., Polite Language)" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" required />
                </div>
                <div>
                  <textarea value={instruction} onChange={e => setInstruction(e.target.value)} placeholder="Kya Niyam sikhana hai? (e.g., User se humesha 'Aap' kehkar baat karein...)" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 h-28 focus:outline-none focus:border-emerald-500" required />
                </div>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Save Rule
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {rules.map(rule => (
                <div key={rule.id} className={`p-4 rounded-xl border flex gap-4 transition-all ${rule.isActive ? 'bg-slate-900/80 border-slate-700 hover:border-emerald-500/50' : 'bg-slate-950 border-slate-800 opacity-50'}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-white text-sm">{rule.topic}</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{rule.instruction}</p>
                  </div>
                  <button onClick={() => toggleRuleActive(rule.id, rule.isActive)} className="self-start p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-400 hover:text-emerald-400" title={rule.isActive ? "Disable Rule" : "Enable Rule"}>
                    {rule.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: SCENARIOS */}
        {activeTab === "scenarios" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
            {/* ── HOW IT WORKS GUIDE ── */}
            <div className="bg-emerald-950/50 border border-emerald-800/50 rounded-2xl p-5">
              <h3 className="text-sm font-black text-emerald-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Bot ko kaise train karein? (Step-by-Step Guide)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-emerald-400 font-black mb-1">① Customer ka Sawal likho</div>
                  <div className="text-slate-400">Woh <b>exact phrase</b> ya <b>keywords</b> likho jo customer type karta hai. Jaise: "interest rate kitna hai", "cibil kharab hai", "agra mein loan"</div>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-blue-400 font-black mb-1">② Bot ka Jawab likho</div>
                  <div className="text-slate-400">Woh <b>exact jawab</b> jo bot dega. Koi bhi language chalegi — Hindi, Hinglish, English. Emojis bhi laga sakte ho! 😊</div>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-amber-400 font-black mb-1">③ Turant kaam karta hai!</div>
                  <div className="text-slate-400">Save karte hi bot real website par <b>seedha yahi jawab dega</b>. No restart needed. Right side mein test karo!</div>
                </div>
              </div>
            </div>

             <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-1">Naya Sawal-Jawab Add karein</h2>
              <p className="text-sm text-slate-400 mb-4">Bot ko jab bhi customer kuch specific puchhe toh exactly wahi jawab dena sikhao.</p>
              <form onSubmit={handleAddScenario} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-400 uppercase mb-2">Jab Customer kahe (keywords):</label>
                    <textarea value={userSays} onChange={e => setUserSays(e.target.value)} placeholder="e.g., home loan chahiye&#10;e.g., interest rate kitna hai&#10;e.g., agra mein service hai" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 h-28 focus:outline-none focus:border-emerald-500" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-400 uppercase mb-2">Toh Bot exactly ye jawab de:</label>
                    <textarea value={botReplies} onChange={e => setBotReplies(e.target.value)} placeholder="e.g., Bilkul! Hamare paas home loan 8.35% se shuru hai. Aap salaried hain ya business karein?" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 h-28 focus:outline-none focus:border-emerald-500" required />
                  </div>
                </div>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Q&A (Bot Seekh Jayega!)
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {scenarios.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Abhi koi Q&A nahi hai.</p>
                  <p className="text-xs mt-1">Upar se pehla Q&A add karein — bot turant seekh jayega!</p>
                </div>
              ) : scenarios.map(scenario => (
                <div key={scenario.id} className="p-4 rounded-xl border bg-slate-900/80 border-slate-700 flex flex-col gap-2 relative">
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm text-slate-300">
                    <span className="text-emerald-400 font-bold mr-2">👤 Customer:</span> {scenario.userSays}
                  </div>
                  <div className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded-lg text-sm text-slate-200">
                    <span className="text-blue-400 font-bold mr-2">🤖 Bot:</span> {scenario.botReplies}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: KNOWLEDGE BASE */}
        {activeTab === "knowledge" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-2">Company Files Upload karein</h2>
              <p className="text-sm text-slate-400 mb-6">Yahan aap apne company ki Policy PDFs, Excel rates, ya text files upload kar sakte hain. Bot unko padh kar khud jawab dena seekh jayega.</p>
              
              <div className="flex flex-col items-center justify-center p-8 bg-slate-950/50 border-2 border-dashed border-emerald-900/50 rounded-2xl hover:bg-slate-900 transition-colors relative">
                <input 
                  type="file" 
                  accept=".pdf,.txt,.csv,.xlsx" 
                  onChange={handleFileUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                {isUploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-emerald-400 font-bold text-sm animate-pulse">File padhi jaa rahi hai...</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-12 h-12 text-emerald-500 mb-4" />
                    <h3 className="text-sm font-bold text-slate-300 mb-1">File upload karne ke liye click karein</h3>
                    <p className="text-xs text-slate-500">Max size: 5MB (PDF/TXT/Excel)</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {docs.map(doc => (
                <div key={doc.id} className="p-4 rounded-xl border bg-slate-900/80 border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{doc.filename}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Bot ne padh liya hai
                        </span>
                        <span className="text-[10px] text-slate-500">{new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteDoc(doc.id)} 
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: AUTO-SYNC */}
        {activeTab === "autosync" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
              
              <h2 className="text-xl font-bold text-white mb-2 relative z-10">Website Auto-Scan (Magic Sync)</h2>
              <p className="text-sm text-slate-400 mb-8 max-w-lg relative z-10">
                Aapko ek-ek details sikhane ki zaroorat nahi! Sirf ek button dabayein, aur bot khud aapki website se saare Loan Rates, Team Members, aur Blogs padh kar seekh lega.
              </p>
              
              <div className="flex flex-col items-center justify-center p-8 bg-slate-950/50 border border-slate-700/50 rounded-2xl relative z-10">
                <Brain className={`w-16 h-16 ${isSyncing ? 'text-emerald-500 animate-pulse' : 'text-slate-600'} mb-6`} />
                
                <button 
                  onClick={handleSyncWebsite}
                  disabled={isSyncing}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-black shadow-[0_10px_30px_rgba(52,211,153,0.3)] hover:shadow-[0_10px_40px_rgba(52,211,153,0.4)] transition-all flex items-center gap-3 transform hover:-translate-y-1"
                >
                  {isSyncing ? (
                    <>
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Website Scan ho rahi hai...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Poori Website Scan Karein
                    </>
                  )}
                </button>

                {syncStats && !isSyncing && (
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 w-full max-w-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-black text-emerald-400">{syncStats.rates}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Bank Rates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-blue-400">{syncStats.team}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Team Profiles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-purple-400">{syncStats.blogs}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Articles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-amber-400">{syncStats.jobs}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Job Openings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-rose-400">{syncStats.testimonials}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Testimonials</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-cyan-400">{syncStats.reviews}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">User Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-fuchsia-400">{syncStats.faqs}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">FAQs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-lime-400">{syncStats.areas}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Service Areas</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>


      {/* RIGHT COLUMN: LIVE SIMULATOR */}
      <div className="w-[400px] border-l border-emerald-900/40 bg-slate-900 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="font-bold text-white text-sm">Bot ki Testing (Live Chat)</h2>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-500 bg-emerald-950 px-2 py-1 rounded-md border border-emerald-900/50">Safe Mode</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[url('/pattern.svg')] bg-opacity-10">
          {simMessages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                m.sender === "user" 
                  ? "bg-emerald-600 text-white rounded-br-sm" 
                  : "bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm"
              }`}>
                {m.sender === "bot" ? (
                  <div dangerouslySetInnerHTML={{ __html: m.text }} className="bot-rich-text [&>ul]:list-disc [&>ul]:pl-4 [&>p]:mb-2 [&>p:last-child]:mb-0" />
                ) : (
                  m.text
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSimulateSend} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input 
            type="text" 
            value={simInput} 
            onChange={e => setSimInput(e.target.value)} 
            placeholder="Yahan type karke test karein..." 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          />
          <button type="submit" disabled={!simInput.trim()} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
