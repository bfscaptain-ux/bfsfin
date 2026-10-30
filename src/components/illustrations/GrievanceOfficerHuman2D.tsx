import React from "react";

/**
 * GrievanceOfficerHuman2D - Relatable 2D Illustration for
 * Public Grievance & Nodal Officer Portal (/complaint).
 * Features: Professional Nodal Grievance Officer upholding the Scales of Justice,
 * 48-Hour Resolution Timer, and Zero-Tolerance Misconduct Safety Shield.
 */
export default function GrievanceOfficerHuman2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="grvAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Ambient Background Aura */}
      <circle cx="260" cy="170" r="150" fill="url(#grvAura)" />

      {/* 2. Floating Scales of Justice (Legal Governance) */}
      <g opacity="0.35" transform="translate(210, 45)">
        {/* Balance Beam */}
        <line x1="10" y1="30" x2="90" y2="30" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="15" x2="50" y2="50" stroke="#10B981" strokeWidth="3" />
        <circle cx="50" cy="15" r="4" fill="#34D399" />
        {/* Left Pan */}
        <line x1="20" y1="30" x2="10" y2="55" stroke="#34D399" strokeWidth="1.5" />
        <line x1="20" y1="30" x2="30" y2="55" stroke="#34D399" strokeWidth="1.5" />
        <path d="M 5 55 Q 20 62 35 55 Z" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
        {/* Right Pan */}
        <line x1="80" y1="30" x2="70" y2="55" stroke="#34D399" strokeWidth="1.5" />
        <line x1="80" y1="30" x2="90" y2="55" stroke="#34D399" strokeWidth="1.5" />
        <path d="M 65 55 Q 80 62 95 55 Z" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
      </g>

      {/* Floating 48-Hour TAT & Protection Shield */}
      <g opacity="0.6" transform="translate(370, 75)">
        <rect x="0" y="0" width="105" height="40" rx="8" fill="#022C22" stroke="#34D399" strokeWidth="1.5" />
        <text x="52" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">48 HOURS TAT</text>
        <text x="52" y="32" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="700" fontFamily="sans-serif">DIRECT RESOLUTION</text>
      </g>

      {/* 3. Drop Shadows */}
      <ellipse cx="170" cy="275" rx="42" ry="7" fill="#0F172A" opacity="0.2" />
      <ellipse cx="350" cy="275" rx="42" ry="7" fill="#0F172A" opacity="0.2" />

      {/* 4. LEFT CHARACTER: Protected Complainant / Client */}
      <g id="ComplainantClient" transform="translate(110, 110)">
        {/* Legs: Red Trousers */}
        <path d="M 44 95 L 38 160 L 54 160 L 56 95 Z" fill="#EF4444" />
        <path d="M 66 95 L 68 160 L 84 160 L 78 95 Z" fill="#DC2626" />

        {/* Shoes: Clean White Sneakers */}
        <path d="M 30 158 Q 42 155 56 158 L 58 165 L 28 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 66 158 Q 78 155 92 158 L 94 165 L 64 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate Grey Pullover */}
        <path d="M 38 35 C 38 28, 84 28, 84 35 L 86 98 L 36 98 Z" fill="#475569" />

        {/* Left Arm: Holding Written Statement / File */}
        <path d="M 38 40 L 16 68 L 28 85" stroke="#475569" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="86" r="5" fill="#F3C19D" />
        {/* Document */}
        <rect x="20" y="74" width="20" height="26" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="24" y1="80" x2="36" y2="80" stroke="#94A3B8" strokeWidth="1" />
        <line x1="24" y1="84" x2="34" y2="84" stroke="#94A3B8" strokeWidth="1" />
        <line x1="24" y1="88" x2="32" y2="88" stroke="#94A3B8" strokeWidth="1" />

        {/* Right Arm: Thankful / Hand-on-Heart Relief gesture */}
        <path d="M 84 40 L 98 60 L 75 68" stroke="#475569" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="73" cy="68" r="5" fill="#F3C19D" />

        {/* Head */}
        <rect x="54" y="22" width="12" height="14" fill="#F3C19D" rx="2" />
        <ellipse cx="60" cy="14" rx="12" ry="13" fill="#F3C19D" />
        <path d="M 48 12 C 48 2, 72 0, 72 10 C 72 14, 68 17, 66 19 C 62 16, 50 16, 48 12 Z" fill="#0F172A" />
      </g>

      {/* 5. RIGHT CHARACTER: Praveen Bhardwaj (Nodal Grievance Officer - Formal Legal Stature) */}
      <g id="NodalOfficer" transform="translate(290, 110)">
        {/* Legs: Executive Dark Trousers */}
        <path d="M 44 95 L 40 160 L 56 160 L 56 95 Z" fill="#0F172A" />
        <path d="M 66 95 L 66 160 L 82 160 L 78 95 Z" fill="#1E293B" />

        {/* Shoes */}
        <path d="M 32 158 Q 44 155 58 158 L 60 165 L 30 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 64 158 Q 76 155 90 158 L 92 165 L 62 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Legal Advocate / Nodal Officer Black/Navy Blazer */}
        <path d="M 38 35 C 38 28, 86 28, 86 35 L 88 98 L 36 98 Z" fill="#1E293B" />
        {/* White Lawyer Collar Band */}
        <polygon points="56,34 68,34 62,56" fill="#FFFFFF" />
        <rect x="59" y="34" width="3" height="18" fill="#FFFFFF" />
        <rect x="63" y="34" width="3" height="18" fill="#FFFFFF" />

        {/* Left Arm: Reassuring hand gesture toward client */}
        <path d="M 38 40 L 12 55 L -10 52" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="-12" cy="52" r="5" fill="#F3C19D" />

        {/* Right Arm: Holding Grievance Resolution Ledger & Official Stamp */}
        <path d="M 86 40 L 105 65 L 94 82" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="92" cy="84" r="5" fill="#F3C19D" />
        {/* Official Resolution Clipboard */}
        <rect x="80" y="70" width="24" height="32" rx="2" fill="#042F2E" stroke="#34D399" strokeWidth="1.2" transform="rotate(8 92 86)" />
        <circle cx="92" cy="94" r="3.5" fill="#10B981" />

        {/* Head */}
        <rect x="56" y="22" width="12" height="14" fill="#F3C19D" rx="2" />
        <ellipse cx="62" cy="14" rx="12" ry="13" fill="#F3C19D" />
        <path d="M 50 12 C 50 2, 74 0, 74 10 C 74 14, 70 17, 68 19 C 64 16, 52 16, 50 12 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
