"use client";

import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingContact() {
  const [salesPhone, setSalesPhone] = useState("7900-979-001");
  const [whatsappPhone, setWhatsappPhone] = useState("7900979001");

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          if (data.settings.salesPhone) {
            setSalesPhone(data.settings.salesPhone);
            setWhatsappPhone(data.settings.salesPhone.replace(/\D/g, ''));
          }
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-[200] flex flex-col gap-4 items-end pointer-events-none">
      
      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/91${whatsappPhone}?text=Hello%20Bhardwaj%20Finance,%20I%20am%20interested%20in%20a%20Loan.`}
        target="_blank" 
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle fill-white">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
        <span className="absolute right-16 px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-200 dark:border-slate-700">
          Chat on WhatsApp
        </span>
      </a>

      {/* Phone Button */}
      <a 
        href={`tel:${whatsappPhone}`}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110"
      >
        <PhoneCall className="w-6 h-6 fill-white" />
        <span className="absolute right-16 px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-slate-200 dark:border-slate-700">
          Call Expert
        </span>
      </a>
      
    </div>
  );
}
