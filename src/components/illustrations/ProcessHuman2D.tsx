"use client";

import React from "react";

export default function ProcessHuman2D({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="5-Day Express Processing 2D Illustration"
    >
      {/* Background Motion Trails & Soft Geometry */}
      <circle cx="170" cy="110" r="95" fill="#ECFDF5" opacity="0.8" />
      <path d="M40 185L300 185" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      {/* Speed / Motion lines */}
      <path d="M50 140L80 140" stroke="#10B981" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M60 155L95 155" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M45 170L75 170" stroke="#10B981" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

      {/* Floating 5-Day Fast Sanction Badge (Clock & Checkmark) */}
      <g transform="translate(205, 35)">
        <rect x="0" y="0" width="105" height="42" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" />
        <circle cx="20" cy="21" r="10" fill="#10B981" />
        <path d="M17 21L19 23L24 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="36" y="19" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">EXPRESS TAT</text>
        <text x="36" y="32" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif">5-Day Disbursal</text>
      </g>

      {/* Floating Document Folder in Transit */}
      <g transform="translate(185, 95) rotate(-8)">
        <rect x="0" y="0" width="45" height="58" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="8" y="10" width="28" height="4" rx="2" fill="#059669" />
        <rect x="8" y="18" width="22" height="3" rx="1.5" fill="#94A3B8" />
        <rect x="8" y="25" width="25" height="3" rx="1.5" fill="#94A3B8" />
        <rect x="8" y="32" width="18" height="3" rx="1.5" fill="#94A3B8" />
        {/* Approved Stamp */}
        <circle cx="32" cy="42" r="8" fill="#10B981" />
        <path d="M29 42L31 44L35 40" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 2D HUMAN CHARACTER (Running / Leaping Forward - Exactly like User's Image!) */}
      {/* Ground Shadow */}
      <ellipse cx="140" cy="188" rx="55" ry="6" fill="#E2E8F0" />

      {/* Back Leg (Trailing Dynamic Stride in vibrant red/coral) */}
      <path
        d="M125 125L100 160L75 178L82 184L110 165L138 128Z"
        fill="#DC2626"
      />
      {/* Back Foot Ankle Skin */}
      <rect x="74" y="176" width="8" height="6" fill="#C58F68" transform="rotate(35, 74, 176)" />
      {/* Back Shoe (White Minimalist Sneaker) */}
      <path
        d="M62 180L80 178L83 184L60 186C58 186 60 181 62 180Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Forward Leg (Bent in Fast Forward Stride - Like User Image!) */}
      <path
        d="M142 125L170 155L200 168L198 178L162 165L130 128Z"
        fill="#EF4444"
      />
      {/* Forward Foot Ankle Skin */}
      <rect x="195" y="167" width="8" height="6" fill="#C58F68" />
      {/* Forward Shoe */}
      <path
        d="M198 168L220 172L222 178L195 178C194 178 196 170 198 168Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Torso & Oversized Shirt (Grey Slate Tunic - Like User Image!) */}
      <path
        d="M112 65L158 72L146 135L108 128Z"
        fill="#E2E8F0"
      />
      <path
        d="M120 67L152 72L138 135L114 130Z"
        fill="#CBD5E1"
      />

      {/* Left Arm (Trailing Backwards in Athletic Balance - Exactly like User Image!) */}
      <path
        d="M115 70L85 98L75 92L105 65Z"
        fill="#CBD5E1"
      />
      {/* Trailing Left Hand */}
      <path
        d="M85 98L68 112C65 114 62 110 65 107L78 95L85 98Z"
        fill="#C58F68"
      />

      {/* Right Arm (Reaching Forward toward Sanction & Future!) */}
      <path
        d="M152 72L188 88L182 96L145 80Z"
        fill="#CBD5E1"
      />
      {/* Right Hand Reaching */}
      <path
        d="M188 88L205 92C208 93 207 97 203 96L182 96Z"
        fill="#C58F68"
      />

      {/* Neck & Head */}
      <rect x="130" y="50" width="10" height="18" fill="#C58F68" transform="rotate(10, 130, 50)" />
      <ellipse cx="138" cy="40" rx="12" ry="15" fill="#C58F68" transform="rotate(10, 138, 40)" />

      {/* Hair (Midnight Navy Crop Styled like User Image!) */}
      <path
        d="M126 38C126 25 135 20 148 22C154 23 156 30 154 37C152 35 147 35 144 38C142 36 138 36 134 40C131 40 128 42 126 38Z"
        fill="#1E1B4B"
      />

      {/* Floating Sparkles & Speed Stars */}
      <path d="M90 35L93 42L100 45L93 48L90 55L87 48L80 45L87 42L90 35Z" fill="#10B981" />
      <path d="M255 110L257 115L262 117L257 119L255 124L253 119L248 117L253 115L255 110Z" fill="#F59E0B" />
      <circle cx="280" cy="90" r="3" fill="#10B981" opacity="0.6" />
    </svg>
  );
}
