"use client";

import React, { useState } from "react";
import { ZODIAC_SIGNS } from "@/lib/astronomy/ephemeris";
import { Sparkles } from "lucide-react";

export default function ZodiacWheel() {
  const [activeSign, setActiveSign] = useState(ZODIAC_SIGNS[0]);

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 py-8">
      {/* Interactive Rotating Cosmic Dial */}
      <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-spin-reverse-slow pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-dashed border-amber-400/30 pointer-events-none" />

        {/* Center Core Badge */}
        <div className="z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full glass-panel border border-amber-400/50 flex flex-col items-center justify-center text-center p-2 shadow-2xl gold-glow">
          <span className="text-2xl sm:text-3xl text-amber-300 font-bold mb-0.5">
            {activeSign.symbol}
          </span>
          <span className="text-xs font-black tracking-wider text-white uppercase">
            {activeSign.name}
          </span>
          <span className="text-[10px] text-amber-400/90 font-medium">
            {activeSign.sanskrit}
          </span>
        </div>

        {/* 12 Zodiac Sign Nodes */}
        {ZODIAC_SIGNS.map((sign, idx) => {
          const angle = (idx * 30 - 90) * (Math.PI / 180);
          const radius = 135; // px from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isSelected = activeSign.id === sign.id;

          return (
            <button
              key={sign.id}
              onClick={() => setActiveSign(sign)}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className={`absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base sm:text-lg transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-tr from-amber-400 to-amber-200 text-cosmic-950 font-bold scale-125 shadow-lg shadow-amber-500/50 z-20"
                  : "bg-cosmic-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-amber-400/50 hover:scale-110"
              }`}
              title={`${sign.name} (${sign.sanskrit})`}
            >
              {sign.symbol}
            </button>
          );
        })}
      </div>

      {/* Selected Sign Details Card */}
      <div className="w-full max-w-md p-6 rounded-2xl glass-card border border-amber-500/30 text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-amber-400">{activeSign.symbol}</span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                {activeSign.name} ({activeSign.sanskrit})
              </h3>
            </div>
            <span className="text-xs text-amber-400/80 uppercase tracking-wider font-semibold">
              Ruler: {activeSign.ruler} • Element: {activeSign.element}
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-bold text-amber-300">
            Sign #{activeSign.id}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {activeSign.name === "Aries" && "Aries (Mesha) radiates courage, dynamic initiative, and executive pioneer vitality ruled by fiery Mars."}
          {activeSign.name === "Taurus" && "Taurus (Vrishabha) embodies steady determination, worldly aesthetic refinement, and enduring wealth ruled by Venus."}
          {activeSign.name === "Gemini" && "Gemini (Mithuna) sparkles with intellectual curiosity, versatile wit, and eloquent communication ruled by Mercury."}
          {activeSign.name === "Cancer" && "Cancer (Karka) flows with deep emotional intuition, compassionate care, and profound psychic receptivity ruled by the Moon."}
          {activeSign.name === "Leo" && "Leo (Simha) shines with magnetic royal presence, generous nobility, and courageous self-expression ruled by the Sun."}
          {activeSign.name === "Virgo" && "Virgo (Kanya) thrives through meticulous precision, analytical intelligence, and dedicated service ruled by Mercury."}
          {activeSign.name === "Libra" && "Libra (Tula) harmonizes interpersonal balance, artistic diplomacy, and refined social charm ruled by Venus."}
          {activeSign.name === "Scorpio" && "Scorpio (Vrishchika) commands transformative willpower, occult intuition, and deep emotional resilience ruled by Mars."}
          {activeSign.name === "Sagittarius" && "Sagittarius (Dhanu) expands through philosophical wisdom, spiritual optimism, and righteous dharma ruled by Jupiter."}
          {activeSign.name === "Capricorn" && "Capricorn (Makara) achieves monumental milestones through steadfast patience, disciplined ambition, and pragmatic mastery ruled by Saturn."}
          {activeSign.name === "Aquarius" && "Aquarius (Kumbha) leads visionary humanitarian causes, scientific innovations, and unconventional truths ruled by Saturn."}
          {activeSign.name === "Pisces" && "Pisces (Meena) merges with transcendental empathy, creative spiritual imagination, and unconditional moksha ruled by Jupiter."}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-cosmic-900/60 border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">Vedic Lord</span>
            <span className="font-semibold text-slate-200">{activeSign.ruler}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cosmic-900/60 border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">Core Element</span>
            <span className="font-semibold text-amber-300">{activeSign.element}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
