"use client";

import React from "react";

export default function InsuranceHuman2D({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cashless Health Insurance & Family Safety Illustration"
    >
      {/* Background Soft Glow */}
      <circle cx="160" cy="110" r="95" fill="#F0FDFA" opacity="0.9" />
      <path
        d="M50 190L270 190"
        stroke="#E2E8F0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Massive Protective Healthcare Shield in Background */}
      <path
        d="M210 50C240 50 270 65 270 95C270 145 225 175 210 185C195 175 150 145 150 95C150 65 180 50 210 50Z"
        fill="#CCFBF1"
        stroke="#14B8A6"
        strokeWidth="2.5"
      />
      {/* Medical Cross on Shield */}
      <rect x="204" y="90" width="12" height="36" rx="3" fill="#0D9488" />
      <rect x="192" y="102" width="36" height="12" rx="3" fill="#0D9488" />
      {/* Inner Heart */}
      <path
        d="M210 135C207 131 202 127 197 129C192 131 192 137 194 141C198 147 210 155 210 155C210 155 222 147 226 141C228 137 228 131 223 129C218 127 213 131 210 135Z"
        fill="#F43F5E"
      />

      {/* 2D HUMAN CHARACTER (Undraw Style - Standing Confidently) */}
      {/* Ground Shadow */}
      <ellipse cx="120" cy="190" rx="42" ry="6" fill="#E2E8F0" />

      {/* Legs (Stylized Pants in Emerald / Forest Green) */}
      {/* Left Leg */}
      <path
        d="M102 115L98 165L96 182L108 182L112 165L114 115Z"
        fill="#047857"
      />
      {/* Left Ankle Skin */}
      <rect x="98" y="180" width="8" height="5" fill="#C58F68" />
      {/* Left Shoe */}
      <path
        d="M93 184L110 184L112 189L90 189C89 189 91 185 93 184Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Right Leg (Casual relaxed posture) */}
      <path
        d="M120 115L128 155L138 182L150 182L138 152L130 115Z"
        fill="#065F46"
      />
      {/* Right Ankle Skin */}
      <rect x="138" y="180" width="8" height="5" fill="#C58F68" />
      {/* Right Shoe */}
      <path
        d="M136 184L153 184L155 189L134 189C133 189 135 185 136 184Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Torso & Shirt (Crisp Minimalist White/Cream with Teal Stole/Collar) */}
      <path
        d="M95 65L135 65L138 120L92 120Z"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <path
        d="M105 65L115 120L108 120L98 65Z"
        fill="#E2E8F0"
      />

      {/* Left Arm (Resting peacefully at side) */}
      <path
        d="M95 68L78 100L86 104L100 75Z"
        fill="#E2E8F0"
      />
      <circle cx="76" cy="106" r="6" fill="#C58F68" />

      {/* Right Arm (Holding / Presenting the Health Card/Shield) */}
      <path
        d="M132 68L165 88L158 96L126 76Z"
        fill="#E2E8F0"
      />
      {/* Hand holding Cashless Card */}
      <path
        d="M165 88L176 96L172 102L161 94Z"
        fill="#C58F68"
      />
      {/* Mini Cashless Health Card in Hand */}
      <rect
        x="168"
        y="82"
        width="22"
        height="14"
        rx="2"
        fill="#0D9488"
        transform="rotate(15, 168, 82)"
      />
      <rect
        x="172"
        y="88"
        width="8"
        height="2"
        rx="0.5"
        fill="#CCFBF1"
        transform="rotate(15, 172, 88)"
      />

      {/* Neck */}
      <rect x="110" y="52" width="10" height="15" fill="#C58F68" />

      {/* Head */}
      <ellipse cx="115" cy="42" rx="12" ry="15" fill="#C58F68" />

      {/* Hair (Modern Natural Waves) */}
      <path
        d="M103 40C103 28 112 24 125 26C131 27 132 34 130 40C128 38 123 37 120 40C118 38 114 38 110 42C108 42 105 44 103 40Z"
        fill="#1E1B4B"
      />
      <path d="M104 40L106 46L110 44Z" fill="#1E1B4B" />

      {/* Floating Sparkles & Health Plus Marks */}
      <path d="M75 55L78 62L85 65L78 68L75 75L72 68L65 65L72 62L75 55Z" fill="#14B8A6" />
      <path d="M260 35L262 40L267 42L262 44L260 49L258 44L253 42L258 40L260 35Z" fill="#F59E0B" />
      <circle cx="60" cy="140" r="3" fill="#10B981" opacity="0.6" />
      <circle cx="280" cy="130" r="4" fill="#14B8A6" opacity="0.5" />
    </svg>
  );
}
