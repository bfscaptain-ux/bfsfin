"use client";

import React from "react";

export default function HealthHeroHuman2D({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Doctor and Patient 100% Cashless Healthcare Illustration"
    >
      {/* Background Soft Health Blob */}
      <path
        d="M60 140C40 90 80 40 140 30C210 20 280 40 310 90C340 140 320 200 270 230C210 260 120 250 80 220C50 190 70 160 60 140Z"
        fill="#CCFBF1"
        opacity="0.45"
      />
      <ellipse cx="180" cy="240" rx="140" ry="8" fill="#E2E8F0" />

      {/* Hospital Building Silhouette in distant background */}
      <rect x="230" y="70" width="80" height="150" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="250" y="55" width="40" height="20" rx="2" fill="#E2E8F0" />
      <rect x="265" y="48" width="10" height="15" rx="1" fill="#0D9488" />
      <rect x="262.5" y="52" width="15" height="7" rx="1" fill="#0D9488" />
      {/* Hospital Windows */}
      <rect x="245" y="90" width="16" height="16" rx="2" fill="#BAE6FD" />
      <rect x="275" y="90" width="16" height="16" rx="2" fill="#BAE6FD" />
      <rect x="245" y="120" width="16" height="16" rx="2" fill="#BAE6FD" />
      <rect x="275" y="120" width="16" height="16" rx="2" fill="#BAE6FD" />
      <rect x="245" y="150" width="16" height="16" rx="2" fill="#BAE6FD" />
      <rect x="275" y="150" width="16" height="16" rx="2" fill="#BAE6FD" />

      {/* Zero Charge Cashless Tag floating */}
      <g transform="translate(140, 20)">
        <rect x="0" y="0" width="110" height="34" rx="17" fill="#0D9488" />
        <circle cx="17" cy="17" r="10" fill="#14B8A6" />
        <path d="M14 17L17 20L21 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="34" y="22" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">₹0 Cashless</text>
      </g>

      {/* CHARACTER 1: Medical Advisor / Doctor in White Coat */}
      {/* Shadow */}
      <ellipse cx="110" cy="235" rx="30" ry="5" fill="#CBD5E1" />
      {/* Legs (Navy Trousers) */}
      <path d="M96 150L90 225L102 225L108 150Z" fill="#1E293B" />
      <path d="M110 150L116 225L128 225L122 150Z" fill="#0F172A" />
      {/* Shoes */}
      <rect x="86" y="225" width="18" height="6" rx="3" fill="#0F172A" />
      <rect x="114" y="225" width="18" height="6" rx="3" fill="#0F172A" />
      {/* Doctor Coat (Crisp Clean White) */}
      <path d="M85 85L135 85L140 170L80 170Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Inner Scrub / Shirt */}
      <path d="M102 85L118 85L115 125L105 125Z" fill="#0D9488" />
      {/* Stethoscope */}
      <path d="M100 88C100 115 120 115 120 88" stroke="#64748B" strokeWidth="2.5" fill="none" />
      <circle cx="116" cy="118" r="4" fill="#94A3B8" />
      {/* Arms & Hands (Holding Clipboard with Approved Claim Stamp) */}
      <path d="M85 90L70 120L85 130L95 100Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M135 90L145 120L135 128L125 100Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="85" cy="132" r="5" fill="#C58F68" />
      <circle cx="137" cy="128" r="5" fill="#C58F68" />
      {/* Clipboard */}
      <rect x="90" y="115" width="40" height="50" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="102" y="110" width="16" height="8" rx="2" fill="#64748B" />
      <rect x="96" y="125" width="28" height="3" rx="1.5" fill="#CBD5E1" />
      <rect x="96" y="132" width="22" height="3" rx="1.5" fill="#CBD5E1" />
      <rect x="96" y="139" width="25" height="3" rx="1.5" fill="#CBD5E1" />
      {/* Green Approved Stamp */}
      <rect x="95" y="146" width="30" height="12" rx="2" fill="#10B981" />
      <text x="98" y="155" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">APPROVED</text>
      {/* Doctor Neck & Head */}
      <rect x="105" y="70" width="10" height="18" fill="#C58F68" />
      <ellipse cx="110" cy="60" rx="13" ry="16" fill="#C58F68" />
      {/* Doctor Hair */}
      <path d="M97 58C97 44 107 40 120 42C126 44 126 52 124 58C122 56 117 56 114 58C110 56 105 56 102 60C99 60 97 62 97 58Z" fill="#1E1B4B" />

      {/* CHARACTER 2: Happy Patient / Customer (Undraw Dynamic Pose like User's Image!) */}
      {/* Shadow */}
      <ellipse cx="195" cy="235" rx="32" ry="5" fill="#CBD5E1" />
      {/* Dynamic Legs in Vibrant Coral / Red (Directly relatable to user's uploaded sample!) */}
      <path d="M175 160L160 205L145 224L155 228L175 208L188 160Z" fill="#EF4444" />
      <path d="M190 160L208 195L228 215L236 210L216 190L198 160Z" fill="#DC2626" />
      {/* Shoes (Clean Minimalist White Sneakers) */}
      <path d="M140 225L156 225L158 230L138 230C137 230 139 226 140 225Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M230 212L245 212L247 217L228 217C227 217 229 213 230 212Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      {/* Patient Torso (Slate Blue T-shirt) */}
      <path d="M172 105L208 105L205 165L170 165Z" fill="#E2E8F0" />
      <path d="M178 105L200 105L195 165L174 165Z" fill="#CBD5E1" />
      {/* Patient Arms (Reaching out joyfully toward the Doctor / Approval) */}
      <path d="M172 110L148 130L155 138L180 120Z" fill="#CBD5E1" />
      <circle cx="145" cy="134" r="5" fill="#C58F68" />
      <path d="M208 110L228 125L222 133L202 120Z" fill="#CBD5E1" />
      <circle cx="230" cy="128" r="5" fill="#C58F68" />
      {/* Patient Neck & Head */}
      <rect x="185" y="90" width="10" height="18" fill="#C58F68" />
      <ellipse cx="190" cy="80" rx="12" ry="15" fill="#C58F68" />
      {/* Patient Hair (Stylish modern crop) */}
      <path d="M178 78C178 65 188 62 200 64C205 65 205 72 203 78C201 76 196 76 193 78C190 76 186 76 183 80C180 80 178 82 178 78Z" fill="#1E1B4B" />

      {/* Floating Sparkles & Shield Badges */}
      <path d="M40 70L43 77L50 80L43 83L40 90L37 83L30 80L37 77L40 70Z" fill="#14B8A6" />
      <path d="M310 140L312 145L317 147L312 149L310 154L308 149L303 147L308 145L310 140Z" fill="#F59E0B" />
      <circle cx="70" cy="40" r="4" fill="#0D9488" opacity="0.6" />
      <circle cx="330" cy="80" r="3" fill="#10B981" opacity="0.5" />
    </svg>
  );
}
