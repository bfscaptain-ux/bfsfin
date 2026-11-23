"use client";

import React, { useState } from "react";
import { MapPin, Navigation, PhoneCall, ExternalLink, ShieldCheck } from "lucide-react";

interface ContactHeroMapProps {
  apiKey?: string;
  latitude?: number;
  longitude?: number;
  officeName?: string;
  address?: string;
  phone?: string;
}

export default function ContactHeroMap({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBPO8HDancD2RFidwwhSBu9aN6OceosY7U",
  latitude = 27.199777,
  longitude = 78.006699,
  officeName = "Bhardwaj Financial Services (Agra HQ)",
  address = "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place, Agra, Uttar Pradesh 282002",
  phone = "+91 9258-724-227"
}: ContactHeroMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Construct official Google Maps Embed API URL with fallback
  const mapEmbedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=16`
    : `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=16&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <section className="relative w-full border-b border-slate-200/80 dark:border-emerald-900/60 overflow-hidden bg-slate-900 shadow-md">
      {/* Map Container with controlled compact height */}
      <div className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] overflow-hidden bg-slate-950">
        
        {/* Loading placeholder skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-400 text-xs animate-pulse">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-500 animate-bounce" />
              <span>Loading Google Maps (Sanjay Place, Agra)...</span>
            </div>
          </div>
        )}

        {/* Live Google Map Iframe */}
        <iframe
          title="Bhardwaj Financial Services Agra Head Office Location"
          src={mapEmbedUrl}
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full border-0 grayscale-[10%] contrast-[105%] hover:grayscale-0 transition-all duration-500"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Subtle Ambient Gradients on Edges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-slate-950/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/60 to-transparent" />

        {/* Floating Glassmorphism Office Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-6 z-10 max-w-[calc(100%-24px)] sm:max-w-md bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-inner">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 truncate">
                Central Operations HQ • Sanjay Place
              </span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
              {officeName}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate hidden sm:block">
              {address}
            </div>
          </div>

          {/* Quick Action Button: Get Directions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1 active:scale-95 cursor-pointer whitespace-nowrap"
              title="Open Google Maps Driving Directions"
            >
              <Navigation className="w-3 h-3 text-white" />
              <span>Directions</span>
            </a>
          </div>
        </div>

        {/* Bottom Right Floating Coordinates Badge */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-6 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full border border-slate-700/60 text-[10px] text-slate-300 shadow-md">
          <span className="text-emerald-400 font-bold">GPS:</span>
          <span>{latitude.toFixed(6)}, {longitude.toFixed(6)}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Sanjay Place Commercial Hub</span>
        </div>

      </div>
    </section>
  );
}
