"use client";

import React from "react";

/**
 * CalculatorHuman2D - Relatable 2D Fintech Character Illustration for Calculators.
 * Follows BFS Brand Guide:
 * - Slate Grey pullover (#334155)
 * - Signature Vibrant Red Trousers (#EF4444)
 * - Clean White Sneakers (#FFFFFF / #E2E8F0)
 * - Midnight Navy Hair (#0F172A)
 * - Warm Indian Skin Tone (#F3C19D)
 * - Emerald & Gold Accents (#10B981, #F59E0B)
 */
export default function CalculatorHuman2D({
  className = "w-full h-auto",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Smart Financial Loan EMI Calculator 2D Character Illustration"
    >
      <defs>
        {/* Soft Background Aura */}
        <radialGradient id="calcAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="65%" stopColor="#059669" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>

        {/* Tablet Screen Gradient */}
        <linearGradient id="calcScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>

        {/* Gold Coin Gradient */}
        <linearGradient id="calcGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Red Trouser Gradient */}
        <linearGradient id="calcPantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>

        {/* Emerald Pill Gradient */}
        <linearGradient id="calcEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* 1. Ambient Glow & Drop Shadows */}
      <circle cx="210" cy="160" r="140" fill="url(#calcAura)" />
      <ellipse cx="160" cy="295" rx="50" ry="8" fill="#0F172A" opacity="0.15" />
      <ellipse cx="280" cy="285" rx="40" ry="7" fill="#0F172A" opacity="0.12" />

      {/* 2. OVERSIZED SMART CALCULATOR / TABLET (Held & Displayed) */}
      <g id="CalculatorDevice" transform="translate(210, 80)">
        {/* Device Body Shadow & Bezel */}
        <rect x="0" y="0" width="165" height="195" rx="18" fill="#0F172A" />
        <rect x="2" y="2" width="161" height="191" rx="16" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />

        {/* Screen Bezel */}
        <rect x="12" y="14" width="141" height="68" rx="10" fill="url(#calcScreenGrad)" stroke="#10B981" strokeWidth="1.2" />

        {/* Screen Header & Calculation Result */}
        <text x="22" y="32" fill="#6EE7B7" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">
          BFS EMI SIMULATOR
        </text>
        <circle cx="140" cy="29" r="3.5" fill="#10B981" />

        {/* Animated EMI Value Display */}
        <text x="22" y="55" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="sans-serif">
          ₹ 24,386<tspan fontSize="10" fill="#34D399" fontWeight="bold">/mo</tspan>
        </text>
        <text x="22" y="70" fill="#A7F3D0" fontSize="8" fontWeight="600" fontFamily="sans-serif">
          @ 7.15% ROI • 20 Yrs Tenure
        </text>

        {/* Mini Growth Bar inside Screen */}
        <rect x="110" y="42" width="6" height="24" rx="2" fill="#34D399" opacity="0.4" />
        <rect x="120" y="34" width="6" height="32" rx="2" fill="#34D399" opacity="0.7" />
        <rect x="130" y="24" width="6" height="42" rx="2" fill="#10B981" />

        {/* Keypad Grid (Row 1) */}
        <rect x="14" y="92" width="28" height="20" rx="5" fill="#334155" />
        <text x="28" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">7</text>

        <rect x="48" y="92" width="28" height="20" rx="5" fill="#334155" />
        <text x="62" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">8</text>

        <rect x="82" y="92" width="28" height="20" rx="5" fill="#334155" />
        <text x="96" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">9</text>

        <rect x="116" y="92" width="35" height="20" rx="5" fill="#EF4444" />
        <text x="133" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">AC</text>

        {/* Keypad Grid (Row 2) */}
        <rect x="14" y="118" width="28" height="20" rx="5" fill="#334155" />
        <text x="28" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">4</text>

        <rect x="48" y="118" width="28" height="20" rx="5" fill="#334155" />
        <text x="62" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">5</text>

        <rect x="82" y="118" width="28" height="20" rx="5" fill="#334155" />
        <text x="96" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">6</text>

        <rect x="116" y="118" width="35" height="20" rx="5" fill="#0284C7" />
        <text x="133" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">%</text>

        {/* Keypad Grid (Row 3) */}
        <rect x="14" y="144" width="28" height="20" rx="5" fill="#334155" />
        <text x="28" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">1</text>

        <rect x="48" y="144" width="28" height="20" rx="5" fill="#334155" />
        <text x="62" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2</text>

        <rect x="82" y="144" width="28" height="20" rx="5" fill="#334155" />
        <text x="96" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">3</text>

        <rect x="116" y="144" width="35" height="20" rx="5" fill="#F59E0B" />
        <text x="133" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">₹</text>

        {/* Keypad Grid (Row 4 - Big Emerald Calculate Button) */}
        <rect x="14" y="170" width="62" height="18" rx="5" fill="#334155" />
        <text x="45" y="183" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">0</text>

        <rect x="82" y="170" width="69" height="18" rx="5" fill="url(#calcEmeraldGrad)" />
        <text x="116" y="183" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">=</text>
      </g>

      {/* 3. 2D FINTECH CHARACTER (Fintech Analyst / Smart Borrower) */}
      <g id="Character">
        {/* Left Leg (Red Trousers #EF4444) */}
        <path d="M 132 175 L 122 245 L 118 285 L 138 285 L 144 245 L 152 175 Z" fill="url(#calcPantsGrad)" />
        {/* Left Ankle */}
        <rect x="122" y="282" width="12" height="6" fill="#F3C19D" />
        {/* Left Clean White Sneaker */}
        <path d="M 112 288 Q 128 284 144 288 L 148 296 L 108 296 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
        <path d="M 108 294 L 148 294" stroke="#94A3B8" strokeWidth="1.2" />

        {/* Right Leg (Relaxed forward stance) */}
        <path d="M 158 175 L 168 240 L 176 280 L 196 280 L 186 240 L 174 175 Z" fill="url(#calcPantsGrad)" />
        {/* Right Ankle */}
        <rect x="178" y="278" width="12" height="6" fill="#F3C19D" />
        {/* Right Clean White Sneaker */}
        <path d="M 172 284 Q 188 280 204 284 L 208 292 L 168 292 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
        <path d="M 168 290 L 208 290" stroke="#94A3B8" strokeWidth="1.2" />

        {/* Torso: Cool Slate Grey Pullover (#334155) */}
        <path d="M 120 105 C 120 95, 184 95, 184 105 L 182 182 L 122 182 Z" fill="#334155" />
        <path d="M 134 105 L 146 118 L 158 118 L 170 105" stroke="#475569" strokeWidth="2.5" fill="none" />

        {/* Left Arm: Supporting the oversized Calculator / Tablet */}
        <path d="M 124 112 L 150 152 L 210 162" stroke="#334155" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        {/* Left Hand wrapping around device */}
        <circle cx="212" cy="162" r="7.5" fill="#F3C19D" />

        {/* Right Arm: Raised, Index Finger pointing to calculation / Thumbs Up */}
        <path d="M 180 112 L 218 118 L 242 98" stroke="#334155" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right Hand: Pointing finger */}
        <circle cx="244" cy="96" r="7" fill="#F3C19D" />
        <path d="M 244 94 L 254 84" stroke="#F3C19D" strokeWidth="4.5" strokeLinecap="round" />

        {/* Neck */}
        <rect x="146" y="88" width="14" height="18" fill="#F3C19D" rx="2" />

        {/* Head (Warm Indian Skin Tone) */}
        <ellipse cx="153" cy="74" rx="15" ry="18" fill="#F3C19D" />

        {/* Hair: Midnight Navy (#0F172A) Modern Undraw Aesthetic */}
        <path
          d="M 138 72 C 137 54, 150 48, 168 50 C 176 51, 175 62, 172 70 C 168 67, 162 67, 158 72 C 154 69, 148 69, 144 74 C 141 74, 138 76, 138 72 Z"
          fill="#0F172A"
        />

        {/* Ear */}
        <circle cx="166" cy="75" r="3.5" fill="#E8B88A" />
      </g>

      {/* 4. FLOATING FINTECH BADGES & TOKENS */}
      {/* Floating Gold Rupee Coin */}
      <g transform="translate(60, 80)">
        <circle cx="18" cy="18" r="16" fill="url(#calcGoldGrad)" />
        <circle cx="18" cy="18" r="12" stroke="#FDE68A" strokeWidth="1.5" fill="none" opacity="0.6" />
        <text x="18" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif">
          ₹
        </text>
      </g>

      {/* Floating Emerald Percentage Pill */}
      <g transform="translate(45, 145)">
        <rect x="0" y="0" width="62" height="24" rx="12" fill="url(#calcEmeraldGrad)" />
        <circle cx="12" cy="12" r="7" fill="#34D399" />
        <path d="M 9 12 L 11 14 L 15 10" stroke="#064E3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="24" y="16" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
          7.15% ROI
        </text>
      </g>

      {/* Floating Checkmark Pill (Guaranteed Lowest EMI) */}
      <g transform="translate(230, 20)">
        <rect x="0" y="0" width="145" height="28" rx="14" fill="#065F46" stroke="#10B981" strokeWidth="1.2" />
        <circle cx="14" cy="14" r="8" fill="#10B981" />
        <path d="M 11 14 L 13 16 L 17 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="18" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          100% Accurate EMI
        </text>
      </g>

      {/* Golden Star / Sparkles */}
      <g transform="translate(380, 70)">
        <path d="M 10 0 L 12 7 L 19 10 L 12 13 L 10 20 L 8 13 L 1 10 L 8 7 Z" fill="#F59E0B" />
      </g>
      <g transform="translate(110, 40)">
        <path d="M 8 0 L 10 5 L 15 8 L 10 11 L 8 16 L 6 11 L 1 8 L 6 5 Z" fill="#10B981" />
      </g>
      <circle cx="395" cy="120" r="3" fill="#34D399" opacity="0.8" />
      <circle cx="85" cy="220" r="4" fill="#F59E0B" opacity="0.6" />
    </svg>
  );
}

/**
 * CalculatorBgAmbient2D - Ambient background watermark illustration for Calculator cards & Hero sections.
 * Non-intrusive, pointer-events-none, scalable 2D backdrop graphic.
 */
export function CalculatorBgAmbient2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 680 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="calcBgAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Radial Aura */}
      <circle cx="340" cy="200" r="220" fill="url(#calcBgAura)" />

      {/* Amortization Financial Chart Grid & Curve */}
      <g opacity="0.3" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4">
        <line x1="80" y1="310" x2="600" y2="310" />
        <line x1="80" y1="240" x2="600" y2="240" />
        <line x1="80" y1="170" x2="600" y2="170" />
        <line x1="80" y1="100" x2="600" y2="100" />
      </g>

      {/* Decreasing Interest Curve */}
      <path
        d="M 100 130 C 220 180, 360 250, 580 290"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      {/* Increasing Principal Curve */}
      <path
        d="M 100 280 C 220 250, 360 190, 580 120"
        stroke="#10B981"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* Left Character (Ambient Outline: FinTech Specialist) */}
      <g opacity="0.35" transform="translate(60, 140)">
        {/* Legs: Red trousers */}
        <path d="M 28 85 L 22 150 L 36 150 L 38 85 Z" fill="#EF4444" />
        <path d="M 46 85 L 48 150 L 62 150 L 56 85 Z" fill="#DC2626" />
        {/* Shoes */}
        <path d="M 16 148 Q 26 145 38 148 L 40 155 L 14 155 Z" fill="#FFFFFF" />
        <path d="M 44 148 Q 54 145 66 148 L 68 155 L 42 155 Z" fill="#FFFFFF" />
        {/* Torso */}
        <path d="M 22 28 C 22 20, 62 20, 62 28 L 64 88 L 20 88 Z" fill="#334155" />
        {/* Tablet in hand */}
        <rect x="52" y="38" width="30" height="42" rx="4" fill="#065F46" stroke="#10B981" strokeWidth="1" />
        {/* Arm */}
        <path d="M 24 35 L 56 60" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        {/* Head & Hair */}
        <ellipse cx="42" cy="12" rx="10" ry="12" fill="#F3C19D" />
        <path d="M 32 10 C 32 2, 52 0, 52 8 C 52 11, 48 14, 46 16 C 42 14, 34 14, 32 10 Z" fill="#0F172A" />
      </g>

      {/* Right Character (Ambient Outline: Happy Borrower celebrating loan savings) */}
      <g opacity="0.35" transform="translate(540, 140)">
        {/* Legs: Red trousers */}
        <path d="M 28 85 L 22 150 L 36 150 L 38 85 Z" fill="#EF4444" />
        <path d="M 46 85 L 50 150 L 64 150 L 56 85 Z" fill="#DC2626" />
        {/* Shoes */}
        <path d="M 16 148 Q 26 145 38 148 L 40 155 L 14 155 Z" fill="#FFFFFF" />
        <path d="M 46 148 Q 56 145 68 148 L 70 155 L 44 155 Z" fill="#FFFFFF" />
        {/* Torso */}
        <path d="M 22 28 C 22 20, 62 20, 62 28 L 64 88 L 20 88 Z" fill="#475569" />
        {/* Arms raised in celebration */}
        <path d="M 24 35 L 6 15" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
        <circle cx="5" cy="13" r="4.5" fill="#F3C19D" />
        <path d="M 60 35 L 78 15" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
        <circle cx="79" cy="13" r="4.5" fill="#F3C19D" />
        {/* Head */}
        <ellipse cx="42" cy="12" rx="10" ry="12" fill="#F3C19D" />
        <path d="M 32 10 C 32 2, 52 0, 52 8 C 52 11, 48 14, 46 16 C 42 14, 34 14, 32 10 Z" fill="#0F172A" />
      </g>

      {/* Center Giant Ambient Calculator Watermark */}
      <g opacity="0.18" transform="translate(290, 60)">
        <rect x="0" y="0" width="100" height="130" rx="14" fill="#065F46" stroke="#10B981" strokeWidth="2" />
        <rect x="10" y="10" width="80" height="30" rx="6" fill="#10B981" opacity="0.3" />
        <circle cx="24" cy="60" r="7" fill="#10B981" />
        <circle cx="50" cy="60" r="7" fill="#10B981" />
        <circle cx="76" cy="60" r="7" fill="#10B981" />
        <circle cx="24" cy="82" r="7" fill="#10B981" />
        <circle cx="50" cy="82" r="7" fill="#10B981" />
        <circle cx="76" cy="82" r="7" fill="#10B981" />
        <circle cx="24" cy="104" r="7" fill="#10B981" />
        <rect x="42" y="97" width="42" height="14" rx="4" fill="#F59E0B" />
      </g>

      {/* Ambient Floating Coins */}
      <g opacity="0.35" transform="translate(200, 50)">
        <circle cx="16" cy="16" r="14" fill="#F59E0B" />
        <text x="16" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>
      <g opacity="0.3" transform="translate(470, 70)">
        <circle cx="14" cy="14" r="12" fill="#10B981" />
        <text x="14" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">%</text>
      </g>
    </svg>
  );
}
