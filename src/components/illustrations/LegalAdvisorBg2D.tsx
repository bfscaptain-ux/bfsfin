import React from "react";

/**
 * LegalAdvisorBg2D - Ambient 2D Character Background Artwork for
 * Founder & Managing Director Section (Adv. Praveen Bhardwaj).
 * Features: High-stature Legal Advocate upholding property title verification,
 * legal compliance shields, and lifelong investment security.
 */
export default function LegalAdvisorBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="legalAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Aura */}
      <circle cx="170" cy="210" r="150" fill="url(#legalAura)" />

      {/* Floating Scales of Justice Watermark */}
      <g opacity="0.3" transform="translate(170, 60)">
        <line x1="10" y1="25" x2="80" y2="25" stroke="#10B981" strokeWidth="2.5" />
        <line x1="45" y1="12" x2="45" y2="40" stroke="#10B981" strokeWidth="2.5" />
        <circle cx="45" cy="12" r="3.5" fill="#34D399" />
        <path d="M 8 45 Q 20 52 32 45 Z" fill="#047857" stroke="#34D399" strokeWidth="1.2" />
        <path d="M 58 45 Q 70 52 82 45 Z" fill="#047857" stroke="#34D399" strokeWidth="1.2" />
      </g>

      {/* 2D HUMAN CHARACTER: Legal Advocate & Financial Governance Officer */}
      <g id="LegalAdvocate" transform="translate(80, 130)">
        {/* Drop Shadow */}
        <ellipse cx="65" cy="265" rx="38" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Executive Dark Trousers */}
        <path d="M 46 150 L 42 255 L 60 255 L 60 150 Z" fill="#0F172A" />
        <path d="M 70 150 L 70 255 L 88 255 L 84 150 Z" fill="#1E293B" />

        {/* Shoes */}
        <path d="M 34 253 Q 46 250 62 253 L 64 263 L 32 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 253 Q 80 250 96 253 L 98 263 L 66 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Legal Advocate Robe / Black Blazer with Advocate White Neckband */}
        <path d="M 38 60 C 38 50, 92 50, 92 60 L 94 152 L 36 152 Z" fill="#0F172A" />
        {/* White Lawyer Collar Band */}
        <polygon points="56,58 74,58 65,92" fill="#FFFFFF" />
        <rect x="62" y="58" width="2.5" height="26" fill="#FFFFFF" />
        <rect x="65.5" y="58" width="2.5" height="26" fill="#FFFFFF" />

        {/* Left Arm: Welcoming Hand Gesture */}
        <path d="M 92 65 L 115 95 L 130 85" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="132" cy="85" r="6" fill="#F3C19D" />

        {/* Right Arm: Holding Legal Title Verification Deed with Seal */}
        <path d="M 38 65 L 15 98 L 32 118" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="120" r="6" fill="#F3C19D" />
        {/* Document with Gold Seal */}
        <rect x="18" y="105" width="26" height="34" rx="3" fill="#042F2E" stroke="#34D399" strokeWidth="1.5" transform="rotate(-10 32 121)" />
        <circle cx="32" cy="121" r="5" fill="#FCD34D" />

        {/* Neck & Head */}
        <rect x="58" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="65" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Navy Hair */}
        <path d="M 50 27 C 50 14, 80 11, 80 25 C 80 30, 76 35, 74 37 C 69 33, 53 33, 50 27 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
