"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Globe2,
  Building2,
  Navigation,
  ArrowRight,
  Search,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Link from "next/link";

export default function LocationsClient() {
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [serviceCities, setServiceCities] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState({
    officeAddress: "Block-C11, Shop No.-5, First Floor, near MK Tailor,\nSanjay Palace, Sanjay Place,\nAgra, Uttar Pradesh - 282002\nIndia",
    contactPhone: "+91 7900-979-001",
    officialEmail: "info@bfsfin.com",
    workingHours: "Mon-Sat: 10AM - 6PM"
  });

  useEffect(() => {
    // Fetch Settings
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(prev => ({
            ...prev,
            officeAddress: data.settings.officeAddress || prev.officeAddress,
            contactPhone: data.settings.contactPhone || prev.contactPhone,
            officialEmail: data.settings.officialEmail || prev.officialEmail,
            workingHours: data.settings.workingHours || prev.workingHours,
          }));
        }
      })
      .catch(console.error);

    // Fetch Service Areas
    fetch("/api/service-areas")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setServiceCities(data.data);
          // Auto-expand the first city by default
          if (data.data.length > 0) setExpandedCity(data.data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const filteredCities = serviceCities.filter(city => {
    const query = searchQuery.toLowerCase();
    if (city.name.toLowerCase().includes(query)) return true;
    if (city.state && city.state.toLowerCase().includes(query)) return true;
    if (city.localAreas && city.localAreas.some((a: any) => (a.name || a).toLowerCase().includes(query))) return true;
    return false;
  });

  // If user searches, auto-expand cities that match
  useEffect(() => {
    if (searchQuery && filteredCities.length === 1) {
      setExpandedCity(filteredCities[0].id);
    }
  }, [searchQuery, filteredCities]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans selection:bg-emerald-500/30">
      <Header />
      
      {/* 1. AGRA HEADQUARTERS HERO */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-emerald-900 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            
            <div className="flex-1 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6"
              >
                <Building2 className="w-4 h-4" /> Central Headquarters
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
              >
                Bhardwaj Finance <br className="hidden lg:block"/>
                <span className="text-emerald-400">Agra HQ.</span>
              </motion.h1>
              <p className="text-emerald-100 max-w-2xl mx-auto lg:mx-0 mb-8 text-lg">
                Our central operations hub handles all direct consultations, bank branch coordination, and high-speed processing for all our service areas.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-lg transition flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call HQ Directly
                </a>
                <a href="https://maps.google.com/?q=Sanjay+Place+Commercial+Hub+Agra" target="_blank" rel="noreferrer" className="px-8 py-4 bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-500/50 font-bold rounded-xl transition flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" /> Get Directions
                </a>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                  <MapPin className="text-emerald-400" /> Official Address
                </h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap mb-8">
                  {settings.officeAddress}
                </p>
                
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                  <Clock className="text-emerald-400" /> Working Hours
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {settings.workingHours}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DYNAMIC SERVICE AREAS DIRECTORY */}
      <section className="py-16 md:py-24 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Find Your Local Branch</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">Select your city below to view all the specific local neighborhoods we serve.</p>
            
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-emerald-500" />
              </div>
              <input
                type="text"
                placeholder="Search your city or neighborhood (e.g., Mathura, Krishna Nagar)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>

          {serviceCities.length === 0 ? (
            <div className="text-center text-slate-500 py-12">No service areas added yet. Add them in the Admin Panel.</div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredCities.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <MapPin className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                  No locations found matching "{searchQuery}".
                </div>
              )}

              {filteredCities.map((city) => {
                const isExpanded = expandedCity === city.id;
                
                return (
                  <motion.div key={city.id} {...fadeInUp} className={`border border-slate-200 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${isExpanded ? 'bg-slate-50 ring-2 ring-emerald-500/20' : 'bg-white'}`}>
                    {/* CITY HEADER (CLICK TO EXPAND) */}
                    <div 
                      className="p-6 md:p-8 cursor-pointer flex items-center justify-between group"
                      onClick={() => setExpandedCity(isExpanded ? null : city.id)}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'}`}>
                          <Globe2 className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-slate-500 font-medium text-sm mt-1 flex items-center gap-2">
                            <span>{city.state}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            <span className="text-emerald-600 font-bold">{city.localAreas?.length || 0} Areas Served</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-slate-200 text-slate-700' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                        {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                      </div>
                    </div>

                    {/* EXPANDED LOCAL AREAS (ACCORDION BODY) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-8 md:px-8 pt-2 border-t border-slate-200/50">
                            <p className="text-slate-600 mb-8 max-w-2xl">{city.description || `We provide direct bank tie-ups and doorstep services across ${city.name}.`}</p>
                            
                            {city.localAreas && city.localAreas.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {city.localAreas.map((area: any, idx: number) => {
                                  const areaName = typeof area === 'string' ? area : area.name;
                                  const isMatch = searchQuery && areaName.toLowerCase().includes(searchQuery.toLowerCase());

                                  return (
                                    <Link 
                                      key={idx} 
                                      href={`/locations/${toSlug(city.name)}/${toSlug(areaName)}`}
                                      className={`group flex items-center justify-between p-5 rounded-2xl transition-all ${
                                        isMatch 
                                          ? "bg-emerald-100 border-2 border-emerald-400 shadow-md transform scale-[1.02]" 
                                          : "bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md"
                                      }`}
                                    >
                                      <div>
                                        <h4 className={`font-bold text-lg mb-1 ${isMatch ? "text-emerald-900" : "text-slate-900"}`}>{areaName}</h4>
                                        <p className={`text-sm ${isMatch ? "text-emerald-700 font-semibold" : "text-slate-500 group-hover:text-emerald-600"}`}>
                                          Visit local page
                                        </p>
                                      </div>
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                        isMatch ? "bg-emerald-500 text-white" : "bg-slate-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                                      }`}>
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-slate-500 italic bg-white p-6 rounded-2xl border border-slate-200">
                                We serve the entire city of {city.name}, but specific local neighborhoods have not been mapped yet.
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
