"use client";

import React, { useState, useMemo } from "react";
import { Search, Hash, Copy, Check, Sparkles, Building2, Factory, Briefcase, TrendingUp, HelpCircle } from "lucide-react";

interface NicEntry {
  code: string;
  division: string;
  activity: string;
  type: "Manufacturing" | "Services" | "Trading";
  categoryTag: string;
  keywords: string[];
}

const NIC_DATABASE: NicEntry[] = [
  {
    code: "1520",
    division: "Div 15: Leather Products",
    activity: "Manufacture of footwear, shoes, chappals, and leather goods",
    type: "Manufacturing",
    categoryTag: "Footwear & Leather",
    keywords: ["footwear", "shoes", "leather", "chappal", "sandals", "boots", "agra"]
  },
  {
    code: "1410",
    division: "Div 14: Wearing Apparel",
    activity: "Manufacture of wearing apparel, tailoring, ready-made garments",
    type: "Manufacturing",
    categoryTag: "Apparel & Garments",
    keywords: ["garments", "clothes", "tailor", "apparel", "textile", "dress", "fashion"]
  },
  {
    code: "4711",
    division: "Div 47: Retail Trade",
    activity: "Retail sale in non-specialized stores (Kirana, Supermarkets, FMCG)",
    type: "Trading",
    categoryTag: "Retail & Grocery",
    keywords: ["kirana", "grocery", "fmcg", "supermarket", "retail", "shop", "store"]
  },
  {
    code: "5610",
    division: "Div 56: Food & Beverage",
    activity: "Restaurants, cafes, food stalls, and catering services",
    type: "Services",
    categoryTag: "Food & Restaurant",
    keywords: ["restaurant", "cafe", "food", "catering", "dhaba", "hotel", "bakery", "sweets"]
  },
  {
    code: "6201",
    division: "Div 62: Computer Programming",
    activity: "Software development, web design, IT consultancy and digital services",
    type: "Services",
    categoryTag: "IT & Software",
    keywords: ["software", "it", "web", "developer", "tech", "app", "consulting", "coding"]
  },
  {
    code: "2599",
    division: "Div 25: Fabricated Metals",
    activity: "Manufacture of fabricated metal products, hardware, iron & steel units",
    type: "Manufacturing",
    categoryTag: "Metals & Hardware",
    keywords: ["metal", "iron", "steel", "hardware", "fabrication", "welding", "machinery"]
  },
  {
    code: "4923",
    division: "Div 49: Land Transport",
    activity: "Freight transport by road, logistics, trucking, and goods transport",
    type: "Services",
    categoryTag: "Transport & Logistics",
    keywords: ["transport", "logistics", "truck", "freight", "cargo", "delivery", "courier"]
  },
  {
    code: "1061",
    division: "Div 10: Food Products",
    activity: "Manufacture of grain mill products, flour mills (Atta Chakki), pulses",
    type: "Manufacturing",
    categoryTag: "Agro & Food Processing",
    keywords: ["flour", "atta", "chakki", "grain", "mill", "pulses", "agriculture", "spice"]
  },
  {
    code: "4752",
    division: "Div 47: Retail Trade",
    activity: "Retail sale of hardware, paints, sanitaryware, and construction materials",
    type: "Trading",
    categoryTag: "Hardware & Paints",
    keywords: ["hardware", "paint", "cement", "sanitary", "tiles", "building materials"]
  },
  {
    code: "8549",
    division: "Div 85: Education",
    activity: "Coaching classes, computer training institutes, and tuition centers",
    type: "Services",
    categoryTag: "Education & Coaching",
    keywords: ["coaching", "tuition", "institute", "training", "education", "school"]
  },
  {
    code: "9602",
    division: "Div 96: Personal Services",
    activity: "Hairdressing, beauty salons, spa, and beauty treatment services",
    type: "Services",
    categoryTag: "Salon & Wellness",
    keywords: ["salon", "parlor", "beauty", "hair", "spa", "wellness", "makeup"]
  },
  {
    code: "3100",
    division: "Div 31: Furniture",
    activity: "Manufacture of wooden, metal, and modular furniture and fixtures",
    type: "Manufacturing",
    categoryTag: "Furniture & Decor",
    keywords: ["furniture", "sofa", "bed", "wood", "interior", "carpentry", "modular"]
  },
  {
    code: "4520",
    division: "Div 45: Motor Vehicles",
    activity: "Maintenance and repair of motor vehicles, garage, and service centers",
    type: "Services",
    categoryTag: "Automobile & Garage",
    keywords: ["automobile", "garage", "car", "bike", "mechanic", "service center", "repair"]
  },
  {
    code: "1811",
    division: "Div 18: Printing",
    activity: "Printing of newspapers, books, brochures, labels, packaging boxes",
    type: "Manufacturing",
    categoryTag: "Printing & Packaging",
    keywords: ["printing", "press", "packaging", "boxes", "labels", "design", "flex"]
  },
  {
    code: "4772",
    division: "Div 47: Retail Trade",
    activity: "Retail sale of pharmaceutical and medical goods, chemist & pharmacy",
    type: "Trading",
    categoryTag: "Medical & Pharmacy",
    keywords: ["pharmacy", "medical", "chemist", "medicine", "drugs", "clinic"]
  },
  {
    code: "7410",
    division: "Div 74: Specialized Design",
    activity: "Graphic designing, architectural, interior decoration, and photography",
    type: "Services",
    categoryTag: "Design & Creative",
    keywords: ["design", "graphic", "architect", "interior", "photography", "studio"]
  }
];

const FILTER_TAGS = [
  "All",
  "Footwear & Leather",
  "IT & Software",
  "Retail & Grocery",
  "Food & Restaurant",
  "Manufacturing",
  "Services"
];

interface MsmeNicCodeFinderProps {
  onSelectCode?: (code: string) => void;
}

export default function MsmeNicCodeFinder({ onSelectCode }: MsmeNicCodeFinderProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return NIC_DATABASE.filter((item) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.code.includes(q) ||
        item.activity.toLowerCase().includes(q) ||
        item.division.toLowerCase().includes(q) ||
        item.categoryTag.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q));

      if (!matchesQuery) return false;

      if (selectedTag === "All") return true;
      if (selectedTag === "Manufacturing" || selectedTag === "Services" || selectedTag === "Trading") {
        return item.type === selectedTag;
      }
      return item.categoryTag === selectedTag;
    });
  }, [query, selectedTag]);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    if (onSelectCode) onSelectCode(code);
  };

  return (
    <section className="py-14 bg-slate-50 dark:bg-[#021814] border-t border-slate-200 dark:border-teal-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/70 border border-teal-300 dark:border-teal-800/80 text-teal-800 dark:text-teal-300 text-xs font-bold tracking-wide">
            <Hash className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Official Government Classification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Find Your Business NIC 4-Digit Code
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Every MSME requires a National Industrial Classification (NIC) code. Type your business type below to discover your official government category.
          </p>
        </div>

        {/* Search Bar & Quick Category Filters */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600 dark:text-teal-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by business (e.g. Shoes, Footwear, Software, Kirana, Cafe, Metal, Transport)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 dark:border-teal-800/80 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium shadow-md shadow-slate-900/5 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {filtered.map((item) => {
              const isCopied = copiedCode === item.code;
              return (
                <div
                  key={item.code}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-teal-900/60 hover:border-teal-400 shadow-sm transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300">
                        NIC: {item.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.type === "Manufacturing"
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                          : item.type === "Services"
                          ? "bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300"
                          : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    <div className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                      {item.activity}
                    </div>

                    <div className="text-[11px] text-slate-400 font-medium">
                      {item.division}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      Eligible for MSME Benefits
                    </span>
                    <button
                      onClick={() => handleCopy(item.code)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-teal-900/60 space-y-2">
              <HelpCircle className="w-8 h-8 text-teal-500 mx-auto" />
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Can&apos;t find your exact industry code?
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                No problem! Just enter your business name in our form, and BFS senior compliance experts will auto-map your official 4-digit NIC codes at zero additional charge.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
