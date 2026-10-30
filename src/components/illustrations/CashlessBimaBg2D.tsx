import React from "react";

/**
 * CashlessBimaBg2D - Ambient 2D Character Background Artwork for
 * "100% Cashless Health Bima with Free Claim Settlement Concierge" Section.
 * Features: Relatable 2D Family/Healthcare Advocate, Medical Safety Shield,
 * Heartbeat ECG Wave, and Hospital Cashless Network Elements.
 */

export function CashlessBimaLeftBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bimaLeftGlow" cx="40%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#0D9488" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>

      {/* 1. Ambient Radial Glow */}
      <circle cx="160" cy="230" r="160" fill="url(#bimaLeftGlow)" />

      {/* 2. Floating Giant Medical Protection Shield Outline */}
      <g opacity="0.35" transform="translate(30, 40)">
        <path
          d="M 50 0 L 100 20 V 65 C 100 110 50 135 50 135 C 50 135 0 110 0 65 V 20 Z"
          fill="#042F2E"
          opacity="0.2"
          stroke="url(#shieldTealGrad)"
          strokeWidth="2"
        />
        {/* Medical Cross inside shield */}
        <path d="M 50 35 V 75 M 30 55 H 70" stroke="#2DD4BF" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* 3. Floating ECG Heartbeat Pulse Wave */}
      <path
        d="M 10 320 L 70 320 L 85 300 L 95 345 L 110 280 L 125 335 L 135 320 L 220 320"
        stroke="#14B8A6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      <circle cx="110" cy="280" r="4" fill="#2DD4BF" opacity="0.7" />

      {/* 4. Floating Hospital Badges & Cross Glyphs */}
      <g opacity="0.5" transform="translate(230, 70)">
        <rect x="0" y="0" width="34" height="34" rx="8" fill="#0D9488" opacity="0.25" stroke="#2DD4BF" strokeWidth="1.5" />
        <path d="M 17 9 V 25 M 9 17 H 25" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g opacity="0.4" transform="translate(20, 240)">
        <circle cx="12" cy="12" r="12" fill="#0D9488" opacity="0.2" stroke="#2DD4BF" strokeWidth="1.2" />
        <path d="M 12 6 V 18 M 6 12 H 18" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* 5. 2D HUMAN CHARACTER: Delighted Healthcare Advocate / Protected Client */}
      <g id="BimaAdvocateCharacter" transform="translate(100, 140)">
        {/* Soft Drop Shadow under feet */}
        <ellipse cx="65" cy="265" rx="42" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Signature Vibrant Red Trousers (Matching Brand Reference) */}
        <path d="M 44 150 L 38 255 L 56 255 L 58 150 Z" fill="#EF4444" />
        <path d="M 68 150 L 70 255 L 88 255 L 82 150 Z" fill="#DC2626" />

        {/* Shoes: Clean White Sneakers */}
        <path d="M 30 253 Q 42 250 58 253 L 60 263 L 28 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 253 Q 80 250 96 253 L 98 263 L 66 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <rect x="40" y="261" width="16" height="2" fill="#14B8A6" />
        <rect x="74" y="261" width="16" height="2" fill="#14B8A6" />

        {/* Torso: Cool Slate / Grey Pullover with Teal Scarf/Collar */}
        <path d="M 38 60 C 38 50, 88 50, 88 60 L 90 152 L 36 152 Z" fill="#475569" />
        {/* Teal Accent V */}
        <polygon points="56,58 70,58 63,78" fill="#14B8A6" />

        {/* Right Arm: Raised Celebrating 100% Cashless Approval */}
        <path d="M 88 65 L 115 45 L 126 18" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="127" cy="18" r="6" fill="#F3C19D" />
        {/* Medical Cross Icon / Thumbs Up */}
        <circle cx="127" cy="18" r="8" fill="#14B8A6" opacity="0.2" />
        <path d="M 127 12 V 24 M 121 18 H 133" stroke="#2DD4BF" strokeWidth="2.2" strokeLinecap="round" />

        {/* Left Arm: Holding BFS 100% Cashless Health Card */}
        <path d="M 38 65 L 16 98 L 32 118" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="120" r="6" fill="#F3C19D" />
        {/* Cashless Card */}
        <rect x="18" y="106" width="30" height="20" rx="3" fill="#042F2E" stroke="#2DD4BF" strokeWidth="1.5" transform="rotate(10 33 116)" />
        <circle cx="26" cy="116" r="3" fill="#2DD4BF" />
        <line x1="33" y1="114" x2="44" y2="114" stroke="#2DD4BF" strokeWidth="1" />
        <line x1="33" y1="118" x2="41" y2="118" stroke="#2DD4BF" strokeWidth="1" />

        {/* Neck & Head */}
        <rect x="56" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="63" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Midnight Navy Hair */}
        <path d="M 48 28 C 48 14, 78 11, 78 26 C 78 30, 74 35, 72 37 C 67 33, 51 33, 48 28 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function CashlessBimaRightBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bimaRightGlow" cx="60%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#0D9488" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Radial Aura */}
      <circle cx="180" cy="210" r="150" fill="url(#bimaRightGlow)" />

      {/* Modern Hospital Network Outline in Background */}
      <g opacity="0.3" transform="translate(140, 80)">
        <rect x="0" y="30" width="80" height="110" rx="4" fill="#042F2E" opacity="0.3" stroke="#2DD4BF" strokeWidth="1.5" />
        {/* Hospital Green Cross */}
        <circle cx="40" cy="55" r="14" fill="#14B8A6" opacity="0.3" />
        <path d="M 40 47 V 63 M 32 55 H 48" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />
        {/* Window grid */}
        <rect x="14" y="80" width="12" height="12" rx="2" fill="#2DD4BF" opacity="0.4" />
        <rect x="34" y="80" width="12" height="12" rx="2" fill="#2DD4BF" opacity="0.4" />
        <rect x="54" y="80" width="12" height="12" rx="2" fill="#2DD4BF" opacity="0.4" />
        <rect x="14" y="105" width="12" height="12" rx="2" fill="#2DD4BF" opacity="0.4" />
        <rect x="34" y="105" width="12" height="12" rx="2" fill="#2DD4BF" opacity="0.4" />
        <rect x="54" y="105" width="12" height="12" rx="2" fill="#2DD4BF" opacity="0.4" />
      </g>

      {/* 2D HUMAN CHARACTER: Doctor / TPA Claims Concierge Advisor */}
      <g id="BimaDoctorConcierge" transform="translate(70, 130)">
        {/* Drop Shadow */}
        <ellipse cx="65" cy="265" rx="38" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Deep Slate Trousers */}
        <path d="M 46 150 L 42 255 L 60 255 L 60 150 Z" fill="#1E293B" />
        <path d="M 70 150 L 70 255 L 88 255 L 84 150 Z" fill="#0F172A" />

        {/* Shoes */}
        <path d="M 34 253 Q 46 250 62 253 L 64 263 L 32 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 253 Q 80 250 96 253 L 98 263 L 66 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Clean White Medical Coat over Teal Scrub */}
        <path d="M 38 60 C 38 50, 92 50, 92 60 L 94 155 L 36 155 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <polygon points="56,58 74,58 65,95" fill="#14B8A6" />
        {/* Stethoscope */}
        <path d="M 52 64 C 52 90, 78 90, 78 64" fill="none" stroke="#0F172A" strokeWidth="2.5" />
        <path d="M 65 85 V 105" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="65" cy="108" r="4.5" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />

        {/* Right Arm: Welcoming Hand Gesture */}
        <path d="M 38 66 L 14 96 L 2 90" stroke="#FFFFFF" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="2" cy="90" r="6" fill="#F3C19D" />

        {/* Left Arm: Holding Zero-Deduction Claim Approval Folder */}
        <path d="M 92 66 L 115 95 L 98 116" stroke="#FFFFFF" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="96" cy="118" r="6" fill="#F3C19D" />
        {/* Medical Clipboard */}
        <rect x="85" y="100" width="26" height="36" rx="3" fill="#042F2E" stroke="#2DD4BF" strokeWidth="1.5" transform="rotate(8 98 118)" />
        <rect x="91" y="96" width="14" height="6" rx="1.5" fill="#94A3B8" transform="rotate(8 98 118)" />
        <line x1="91" y1="112" x2="105" y2="114" stroke="#2DD4BF" strokeWidth="1.5" />
        <line x1="91" y1="118" x2="103" y2="120" stroke="#2DD4BF" strokeWidth="1.5" />

        {/* Neck & Head */}
        <rect x="58" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="65" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Navy Hair */}
        <path d="M 50 27 C 50 14, 80 11, 80 25 C 80 30, 76 35, 74 37 C 69 33, 53 33, 50 27 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
