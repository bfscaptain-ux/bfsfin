"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, MapPin, Save, Globe2, ChevronDown, CheckCircle2, Navigation, Layers, HeartHandshake, User, Trophy, Map } from "lucide-react";
import { STATES_AND_CITIES } from "@/lib/indianStatesAndCities";

interface ValueProp {
  title: string;
  description: string;
}

interface LocalArea {
  id: string;
  name: string;
  whyChooseUs: string;
  customerRelateText: string;
  landmarkContext: string;
  localExpertName: string;
  localExpertPhone: string;
  successStoryName: string;
  successStoryText: string;
  statsCleared: string;
  statsTime: string;
  valueProps: ValueProp[];
}

interface ServiceCity {
  id: string;
  state: string;
  name: string;
  description: string;
  localAreas: LocalArea[];
}

export default function ServiceAreasAdmin() {
  const [cities, setCities] = useState<ServiceCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  const states = Object.keys(STATES_AND_CITIES).sort();

  useEffect(() => {
    fetch("/api/service-areas")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const migrated = data.data.map((c: any) => ({
            ...c,
            state: c.state || "",
            localAreas: c.localAreas?.map((area: any) => {
              if (typeof area === 'string') {
                return { 
                  id: Date.now().toString() + Math.random(), 
                  name: area, 
                  whyChooseUs: "", 
                  customerRelateText: "", 
                  landmarkContext: "",
                  localExpertName: "",
                  localExpertPhone: "",
                  successStoryName: "",
                  successStoryText: "",
                  statsCleared: "",
                  statsTime: "",
                  valueProps: [] 
                };
              }
              return {
                ...area,
                landmarkContext: area.landmarkContext || "",
                localExpertName: area.localExpertName || "",
                localExpertPhone: area.localExpertPhone || "",
                successStoryName: area.successStoryName || "",
                successStoryText: area.successStoryText || "",
                statsCleared: area.statsCleared || "",
                statsTime: area.statsTime || "",
                valueProps: area.valueProps || [
                  { title: "Direct Bank Tie-ups", description: "" },
                  { title: "Local Doorstep Pickup", description: "" },
                  { title: "Zero Brokerage Fees", description: "" }
                ]
              };
            }) || []
          }));
          setCities(migrated);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/service-areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cities)
      });
      if (res.ok) alert("SEO Pages Published successfully!");
    } catch (e) {
      alert("Error saving");
    }
    setSaving(false);
  };

  const addCity = () => {
    const newId = Date.now().toString();
    setCities([...cities, { id: newId, state: "", name: "", description: "", localAreas: [] }]);
    setExpandedCity(newId);
  };

  const removeCity = (id: string) => {
    setCities(cities.filter(c => c.id !== id));
  };

  const updateCity = (id: string, updates: Partial<ServiceCity>) => {
    setCities(cities.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const addLocalArea = (cityId: string) => {
    setCities(cities.map(c => {
      if (c.id === cityId) {
        return {
          ...c,
          localAreas: [...c.localAreas, { 
            id: Date.now().toString(), 
            name: "", 
            whyChooseUs: "", 
            customerRelateText: "",
            landmarkContext: "",
            localExpertName: "",
            localExpertPhone: "",
            successStoryName: "",
            successStoryText: "",
            statsCleared: "",
            statsTime: "",
            valueProps: [
              { title: "Direct Bank Tie-ups", description: "We work directly with top local banks for fast approvals." },
              { title: "Local Doorstep Pickup", description: "Our agents will securely collect documents directly from your home." },
              { title: "Zero Brokerage Fees", description: "We are official channel partners. That means zero hidden commissions." }
            ]
          }]
        };
      }
      return c;
    }));
  };

  const updateLocalArea = (cityId: string, areaId: string, field: keyof LocalArea, value: any) => {
    setCities(cities.map(c => {
      if (c.id === cityId) {
        return {
          ...c,
          localAreas: c.localAreas.map(a => a.id === areaId ? { ...a, [field]: value } : a)
        };
      }
      return c;
    }));
  };

  const updateValueProp = (cityId: string, areaId: string, propIndex: number, field: keyof ValueProp, value: string) => {
    setCities(cities.map(c => {
      if (c.id === cityId) {
        return {
          ...c,
          localAreas: c.localAreas.map(a => {
            if (a.id === areaId) {
              const newProps = [...a.valueProps];
              newProps[propIndex] = { ...newProps[propIndex], [field]: value };
              return { ...a, valueProps: newProps };
            }
            return a;
          })
        };
      }
      return c;
    }));
  };

  const removeLocalArea = (cityId: string, areaId: string) => {
    setCities(cities.map(c => {
      if (c.id === cityId) {
        return { ...c, localAreas: c.localAreas.filter(a => a.id !== areaId) };
      }
      return c;
    }));
  };

  if (loading) return <div className="p-8 text-emerald-100 font-bold">Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-emerald-400" /> Programmatic SEO Engine
          </h2>
          <p className="text-emerald-200/70 mt-1">Build immense trust and dominate local search with hyper-local content.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="shrink-0 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
        >
          <Save className="w-5 h-5" /> {saving ? "Saving to Database..." : "Publish SEO Pages"}
        </button>
      </div>

      <div className="space-y-6">
        {cities.map((city) => (
          <div key={city.id} className="bg-emerald-900/30 border border-emerald-500/20 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm transition-all duration-300">
            {/* Header / Collapse Trigger */}
            <div 
              className="p-6 bg-emerald-900/40 border-b border-emerald-500/20 flex items-center justify-between cursor-pointer hover:bg-emerald-800/40 transition"
              onClick={() => setExpandedCity(expandedCity === city.id ? null : city.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                  <Globe2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{city.name || "Unnamed City"} <span className="text-emerald-500 text-sm font-bold ml-2">({city.state || "No State Selected"})</span></h3>
                  <p className="text-xs text-emerald-300/70 font-medium">{city.localAreas.length} Local SEO areas mapped</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); removeCity(city.id); }} 
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                  title="Delete City"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <ChevronDown className={`w-6 h-6 text-emerald-500 transition-transform ${expandedCity === city.id ? "rotate-180" : ""}`} />
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCity === city.id && (
              <div className="p-6 md:p-8 space-y-8 animate-in slide-in-from-top-4 duration-300 fade-in">
                
                {/* 1. City Level Settings */}
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                  <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> 1. City & State Routing
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Select State *</label>
                      <select
                        value={city.state}
                        onChange={(e) => {
                          updateCity(city.id, { state: e.target.value, name: "" }); // Reset city when state changes
                        }}
                        className="w-full bg-emerald-950 border border-emerald-500/30 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">-- Choose State --</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Select City *</label>
                      <select
                        value={city.name}
                        onChange={(e) => updateCity(city.id, { name: e.target.value })}
                        disabled={!city.state}
                        className="w-full bg-emerald-950 border border-emerald-500/30 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                      >
                        <option value="">-- Choose City --</option>
                        {city.state && (STATES_AND_CITIES[city.state as keyof typeof STATES_AND_CITIES] || []).map((c: string) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">City SEO Meta Description</label>
                    <input 
                      type="text" 
                      value={city.description} 
                      onChange={(e) => updateCity(city.id, { description: e.target.value })}
                      placeholder="e.g. Bhardwaj Finance offers the fastest home loan approvals..."
                      className="w-full bg-emerald-950 border border-emerald-500/30 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* 2. Local Areas SEO */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <Navigation className="w-4 h-4" /> 2. Deep Local SEO & Trust Builders
                    </h4>
                    <button 
                      onClick={() => addLocalArea(city.id)} 
                      className="flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-4 py-2 rounded-lg transition"
                    >
                      <Plus className="w-4 h-4" /> Add Neighborhood
                    </button>
                  </div>
                  
                  {city.localAreas.length === 0 ? (
                    <div className="text-center py-10 bg-black/20 rounded-2xl border border-white/5 border-dashed">
                      <p className="text-emerald-200/50 font-medium">No neighborhoods added.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {city.localAreas.map((area) => {
                        const isAreaExpanded = expandedArea === area.id;

                        return (
                        <div key={area.id} className="bg-emerald-950/80 border border-emerald-500/20 rounded-2xl relative shadow-lg overflow-hidden transition-all duration-300">
                          {/* Area Header (Collapsed State) */}
                          <div 
                            className="p-5 flex items-center justify-between cursor-pointer hover:bg-emerald-800/40 transition"
                            onClick={() => setExpandedArea(isAreaExpanded ? null : area.id)}
                          >
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-emerald-400" />
                              <h5 className="font-bold text-white text-lg">{area.name || "Unnamed Neighborhood"}</h5>
                            </div>
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={(e) => { e.stopPropagation(); removeLocalArea(city.id, area.id); }} 
                                className="p-2 rounded-lg bg-red-400/10 hover:bg-red-400/20 text-red-400 hover:text-red-300 transition"
                                title="Delete Area"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <ChevronDown className={`w-5 h-5 text-emerald-500 transition-transform ${isAreaExpanded ? "rotate-180" : ""}`} />
                            </div>
                          </div>

                          {/* Area Body (Expanded State) */}
                          {isAreaExpanded && (
                            <div className="p-5 md:p-8 pt-0 border-t border-emerald-500/20 mt-2">
                              <div className="mb-6 pr-12 mt-4">
                                <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Local Area Name</label>
                                <input 
                                  type="text" 
                                  value={area.name} 
                                  onChange={(e) => updateLocalArea(city.id, area.id, "name", e.target.value)}
                                  placeholder="e.g. Krishna Nagar"
                                  className="w-full bg-black/30 border border-emerald-500/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                                />
                              </div>

                              {/* Emotional Pitches & Landmarks */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div>
                                  <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Map className="w-3 h-3"/> Local Landmark Context</label>
                                  <textarea 
                                    value={area.landmarkContext} 
                                    onChange={(e) => updateLocalArea(city.id, area.id, "landmarkContext", e.target.value)}
                                    placeholder="e.g. Whether you are near the main market or the highway..."
                                    rows={3}
                                    className="w-full bg-black/30 border border-emerald-500/20 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">Area Meta / Intro Pitch</label>
                                  <textarea 
                                    value={area.whyChooseUs} 
                                    onChange={(e) => updateLocalArea(city.id, area.id, "whyChooseUs", e.target.value)}
                                    placeholder="e.g. We have direct relationships with the HDFC branch..."
                                    rows={3}
                                    className="w-full bg-black/30 border border-emerald-500/20 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1"><HeartHandshake className="w-3 h-3"/> Customer Emotional Relate Text</label>
                                  <textarea 
                                    value={area.customerRelateText} 
                                    onChange={(e) => updateLocalArea(city.id, area.id, "customerRelateText", e.target.value)}
                                    placeholder="e.g. Living here means you value community..."
                                    rows={3}
                                    className="w-full bg-black/30 border border-purple-500/20 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none"
                                  />
                                </div>
                              </div>

                              {/* Trust Builders: Local Expert & Success Stories */}
                              <div className="border-t border-emerald-500/10 pt-6 mt-6 mb-6">
                                <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                  <Trophy className="w-4 h-4" /> Local Trust Builders
                                </h5>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Expert Info */}
                                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><User className="w-3 h-3"/> Local Expert Info</label>
                                    <div className="grid grid-cols-2 gap-3">
                                      <input 
                                        type="text" 
                                        value={area.localExpertName}
                                        onChange={(e) => updateLocalArea(city.id, area.id, "localExpertName", e.target.value)}
                                        placeholder="Name (e.g. Praveen)"
                                        className="w-full bg-transparent border-b border-white/10 text-emerald-300 mb-3 pb-1 focus:outline-none focus:border-emerald-500 text-sm"
                                      />
                                      <input 
                                        type="text" 
                                        value={area.localExpertPhone}
                                        onChange={(e) => updateLocalArea(city.id, area.id, "localExpertPhone", e.target.value)}
                                        placeholder="Phone / WhatsApp"
                                        className="w-full bg-transparent border-b border-white/10 text-emerald-300 mb-3 pb-1 focus:outline-none focus:border-emerald-500 text-sm"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                      <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Files Cleared Stat</label>
                                        <input 
                                          type="text" 
                                          value={area.statsCleared}
                                          onChange={(e) => updateLocalArea(city.id, area.id, "statsCleared", e.target.value)}
                                          placeholder="e.g. 500+"
                                          className="w-full bg-transparent border-b border-white/10 text-white pb-1 focus:outline-none focus:border-emerald-500 text-sm"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Time Stat</label>
                                        <input 
                                          type="text" 
                                          value={area.statsTime}
                                          onChange={(e) => updateLocalArea(city.id, area.id, "statsTime", e.target.value)}
                                          placeholder="e.g. 48 Hours"
                                          className="w-full bg-transparent border-b border-white/10 text-white pb-1 focus:outline-none focus:border-emerald-500 text-sm"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Success Story */}
                                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Trophy className="w-3 h-3"/> Local Success Story</label>
                                    <input 
                                      type="text" 
                                      value={area.successStoryName}
                                      onChange={(e) => updateLocalArea(city.id, area.id, "successStoryName", e.target.value)}
                                      placeholder="Customer Name (e.g. Rahul S.)"
                                      className="w-full bg-transparent border-b border-white/10 text-emerald-300 font-bold mb-3 pb-1 focus:outline-none focus:border-emerald-500 text-sm"
                                    />
                                    <textarea 
                                      value={area.successStoryText}
                                      onChange={(e) => updateLocalArea(city.id, area.id, "successStoryText", e.target.value)}
                                      placeholder="Quote (e.g. They got my loan cleared in 3 days!)"
                                      rows={2}
                                      className="w-full bg-black/30 border border-white/5 text-slate-400 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-emerald-500 resize-none"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Dynamic Value Props */}
                              <div className="border-t border-emerald-500/10 pt-6 mt-6">
                                <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                  <Layers className="w-4 h-4" /> Dynamic "Why Choose Us" Cards
                                </h5>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                  {area.valueProps?.map((prop, pIdx) => (
                                    <div key={pIdx} className="bg-black/20 p-4 rounded-xl border border-white/5">
                                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Card {pIdx + 1} Title</label>
                                      <input 
                                        type="text" 
                                        value={prop.title}
                                        onChange={(e) => updateValueProp(city.id, area.id, pIdx, "title", e.target.value)}
                                        className="w-full bg-transparent border-b border-white/10 text-emerald-300 font-bold mb-3 pb-1 focus:outline-none focus:border-emerald-500 text-sm"
                                      />
                                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Card {pIdx + 1} Description</label>
                                      <textarea 
                                        value={prop.description}
                                        onChange={(e) => updateValueProp(city.id, area.id, pIdx, "description", e.target.value)}
                                        rows={3}
                                        className="w-full bg-black/30 border border-white/5 text-slate-400 rounded-lg px-2 py-2 text-xs focus:outline-none focus:border-emerald-500 resize-none"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={addCity} 
        className="mt-8 flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-emerald-500/30 bg-emerald-900/10 hover:bg-emerald-900/30 text-emerald-400 py-12 rounded-3xl font-bold transition-all"
      >
        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <Plus className="w-6 h-6 text-emerald-400" /> 
        </div>
        Expand to a New City
      </button>
    </div>
  );
}
