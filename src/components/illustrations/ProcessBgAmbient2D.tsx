import React from "react";

/**
 * ProcessBgAmbient2D - Subtle widescreen 2D fintech collaboration ambient background vector.
 * Flat vector art style (unDraw / Pablo Stanley aesthetic) with character and banking pillars.
 */
export default function ProcessBgAmbient2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="processBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Radial Aura */}
      <circle cx="250" cy="220" r="180" fill="url(#processBgGlow)" />

      {/* Subtle Landmark Bank Pillars Outline in Background */}
      <g opacity="0.25" stroke="#34D399" strokeWidth="1.5">
        {/* Bank Pediment */}
        <polygon points="120,120 250,60 380,120" fill="none" />
        <rect x="110" y="120" width="280" height="12" rx="2" fill="#047857" opacity="0.3" />
        {/* 4 Pillars */}
        <rect x="140" y="132" width="22" height="110" rx="3" fill="#047857" opacity="0.3" />
        <rect x="200" y="132" width="22" height="110" rx="3" fill="#047857" opacity="0.3" />
        <rect x="278" y="132" width="22" height="110" rx="3" fill="#047857" opacity="0.3" />
        <rect x="338" y="132" width="22" height="110" rx="3" fill="#047857" opacity="0.3" />
        {/* Base Steps */}
        <rect x="100" y="242" width="300" height="14" rx="3" fill="#047857" opacity="0.3" />
        <rect x="80" y="256" width="340" height="14" rx="4" fill="#047857" opacity="0.3" />
      </g>

      {/* Dynamic Leaping Character - Sprinting with 5-Day Express Sanction Folder */}
      <g id="DynamicLeapingCharacter" transform="translate(190, 140)">
        {/* Ground Shadow */}
        <ellipse cx="60" cy="190" rx="45" ry="8" fill="#0F172A" opacity="0.2" />

        {/* Leaping Legs (Dynamic stride) */}
        {/* Back Leg trailing */}
        <path d="M 45 105 L 10 145 L 22 155 L 55 115 Z" fill="#EF4444" />
        <path d="M 12 145 L -10 180 L 8 185 L 25 155 Z" fill="#EF4444" />
        {/* Back Shoe */}
        <path d="M -15 178 Q -5 172 10 184 L 8 192 L -18 186 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Front Leg leaping forward */}
        <path d="M 60 105 L 85 140 L 72 152 L 48 115 Z" fill="#DC2626" />
        <path d="M 80 142 L 100 178 L 84 186 L 68 152 Z" fill="#DC2626" />
        {/* Front Shoe Landing */}
        <path d="M 80 184 Q 100 176 115 186 L 112 194 L 78 190 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Dynamic Torso (Cool Slate Grey Top) */}
        <path d="M 38 42 C 38 32, 78 32, 78 42 L 72 110 L 34 110 Z" fill="#475569" transform="rotate(-8 55 75)" />

        {/* Left Arm holding express Sanction Certificate */}
        <path d="M 38 45 L 12 70 L 25 88" stroke="#475569" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="26" cy="90" r="5.5" fill="#F3C19D" />
        {/* Golden Sanction Medal / Folder */}
        <rect x="8" y="78" width="22" height="30" rx="3" fill="#047857" stroke="#34D399" strokeWidth="1.5" transform="rotate(-15 19 93)" />
        <circle cx="19" cy="93" r="4" fill="#F59E0B" />

        {/* Right Arm swinging forward with key */}
        <path d="M 76 45 L 102 62 L 118 52" stroke="#475569" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="120" cy="52" r="5.5" fill="#F3C19D" />
        {/* Key in Hand */}
        <path d="M 120 52 L 132 48 L 135 52 L 128 55 Z" fill="#F59E0B" />
        <circle cx="135" cy="50" r="3.5" fill="none" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Neck & Head */}
        <rect x="52" y="24" width="12" height="14" fill="#F3C19D" rx="2" transform="rotate(-8 58 31)" />
        <ellipse cx="58" cy="16" rx="13" ry="14" fill="#F3C19D" transform="rotate(-8 58 16)" />
        {/* Navy Hair */}
        <path d="M 44 14 C 44 2, 70 0, 72 12 C 72 16, 68 20, 66 22 C 60 18, 46 18, 44 14 Z" fill="#0F172A" />
      </g>

      {/* Floating Speed Lines & Accents */}
      <g stroke="#34D399" strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <line x1="120" y1="180" x2="160" y2="180" />
        <line x1="90" y1="200" x2="145" y2="200" />
        <line x1="110" y1="220" x2="155" y2="220" />
      </g>
    </svg>
  );
}
