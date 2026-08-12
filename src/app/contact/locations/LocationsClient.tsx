"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe2,
  Building2,
  ArrowRight,
  Navigation
} from "lucide-react";
import Link from "next/link";

export default function LocationsClient() {
  const [selectedCity, setSelectedCity] = useState("Agra (HQ)");

  const cities = [
    "Agra (HQ)",
    "Mathura",
    "Noida",
    "Gurgaon",
    "Mumbai",
    "Bangalore",
    "Jaipur"
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500/30">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Globe2 className="w-4 h-4" /> Pan India Network
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
          >
            Find an office <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">near you.</span>
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select a city below to view our local office details or regional contact information. We process loans efficiently across all listed locations.
          </p>
        </div>
      </section>

      {/* 2. LOCATIONS CONTENT */}
      <section className="py-16 md:py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Interactive City Grid */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 text-center">Select Region</h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300
                    ${selectedCity === city 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-600 transform scale-105' 
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
                    }
                  `}
                >
                  <MapPin className={`w-4 h-4 ${selectedCity === city ? 'text-white' : 'text-emerald-500'}`} />
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Detail Card */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {selectedCity === "Agra (HQ)" ? (
                // AGRA (HQ) VIEW - FULL DETAILS
                <motion.div 
                  key="agra"
                  {...fadeInUp}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Agra Headquarters</h2>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                        Our central operations hub. Visit us for direct consultation, file submission, and immediate processing with local bank branches.
                      </p>
                    </div>
                    
                    <a 
                      href="https://maps.google.com/?q=Sanjay+Place+Commercial+Hub+Agra" 
                      target="_blank" 
                      rel="noreferrer"
                      className="shrink-0 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                      <Navigation className="w-4 h-4 text-emerald-500" /> Get Directions
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold">
                        <MapPin className="w-5 h-5 text-emerald-500" /> Physical Address
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Sanjay Place Commercial Hub,<br />
                        Agra, Uttar Pradesh - 282002<br />
                        India
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold">
                        <Phone className="w-5 h-5 text-emerald-500" /> Contact Details
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm flex flex-col gap-2">
                        <a href="tel:+919999999999" className="hover:text-blue-600 dark:hover:text-blue-400">+91 999 999 9999</a>
                        <a href="mailto:info@bhardwajfinance.com" className="hover:text-blue-600 dark:hover:text-blue-400">info@bhardwajfinance.com</a>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold">
                        <Clock className="w-5 h-5 text-emerald-500" /> Working Hours
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Monday - Saturday<br />
                        10:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // OTHER CITIES VIEW - PLACEHOLDER
                <motion.div 
                  key={selectedCity}
                  {...fadeInUp}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                  
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe2 className="w-10 h-10" />
                  </div>
                  
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                    Serving <span className="text-emerald-600 dark:text-emerald-400">{selectedCity}</span> Digitally
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed text-lg">
                    While our physical branch in {selectedCity} is currently being set up, our dedicated regional representatives are fully active. We process files and coordinate with local bank branches in {selectedCity} directly from our Headquarters.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                      Submit Online Query <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href="tel:+919999999999" className="px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                      Call Agra HQ <Phone className="w-4 h-4 text-emerald-500" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
