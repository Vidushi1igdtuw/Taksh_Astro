"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { NumerologyProfile, calculateNumerology } from "@/lib/astronomy/numerology";
import { useAuth } from "@/context/AuthContext";
import {
  Award,
  Sparkles,
  Calendar,
  User,
} from "lucide-react";

export default function NumerologyPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Aryavrat Sharma");
  const [birthDate, setBirthDate] = useState("1995-10-24");
  const [report, setReport] = useState<NumerologyProfile | null>(() =>
    calculateNumerology(name, birthDate)
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;
    setReport(calculateNumerology(name, birthDate));
  };

  return (
    <AuthGuard
      featureName="Vedic Numerology Profile"
      description="Calculate your Life Path, Destiny, Soul Urge, and Personal Year numbers tailored to your birth details."
    >
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Pythagorean & Vedic Numerology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            Vedic Numerology Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Unveil the esoteric vibrational code behind your birth date and full name.
          </p>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleCalculate}
          className="max-w-2xl mx-auto p-6 rounded-2xl glass-panel border border-white/10 mb-10 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Birth Date</span>
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-cosmic-950 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.01]"
          >
            Calculate Numerology Code
          </button>
        </form>

        {/* Report Display */}
        {report && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Key Numbers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: "Life Path", num: report.lifePathNumber, color: "text-amber-300" },
                { label: "Destiny", num: report.destinyNumber, color: "text-purple-300" },
                { label: "Soul Urge", num: report.soulUrgeNumber, color: "text-rose-300" },
                { label: "Personality", num: report.personalityNumber, color: "text-blue-300" },
                { label: "Birth Day", num: report.birthDayNumber, color: "text-emerald-300" },
                { label: "Personal Year", num: report.personalYearNumber, color: "text-amber-400" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl glass-card border border-white/10 text-center space-y-1"
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {item.label}
                  </span>
                  <span className={`text-3xl font-black ${item.color} block`}>{item.num}</span>
                </div>
              ))}
            </div>

            {/* Life Path In-Depth Card */}
            <div className="p-8 rounded-2xl glass-card border border-amber-500/30 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-xl font-black border border-amber-400/40">
                  {report.lifePathNumber}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                    Primary Life Purpose Vibration
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {report.interpretations.lifePath.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {report.interpretations.lifePath.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="font-bold text-amber-300 block mb-2">Core Strengths:</span>
                  <ul className="space-y-1 text-slate-300">
                    {report.interpretations.lifePath.strengths.map((s, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-purple-300 block mb-2">Evolutionary Advice:</span>
                  <p className="text-slate-300 leading-relaxed">{report.interpretations.lifePath.advice}</p>
                </div>
              </div>
            </div>

            {/* Destiny & Soul Urge & Personal Year */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-purple-400">Destiny (Expression)</span>
                <h4 className="text-base font-bold text-white">{report.interpretations.destiny.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{report.interpretations.destiny.summary}</p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-rose-400">Soul Urge (Heart&apos;s Desire)</span>
                <h4 className="text-base font-bold text-white">{report.interpretations.soulUrge.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{report.interpretations.soulUrge.summary}</p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400">Personal Year Cycle</span>
                <h4 className="text-base font-bold text-white">{report.interpretations.personalYear.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{report.interpretations.personalYear.summary}</p>
              </div>
            </div>

            {/* Lucky Elements */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Auspicious Resonances for Number {report.lifePathNumber}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-cosmic-900/60">
                  <span className="text-[10px] text-slate-400 block font-semibold">Harmonic Numbers</span>
                  <span className="font-bold text-amber-300">{report.luckyElements.numbers.join(", ")}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-900/60">
                  <span className="text-[10px] text-slate-400 block font-semibold">Favorable Colors</span>
                  <span className="font-bold text-slate-200">{report.luckyElements.colors.join(", ")}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-900/60">
                  <span className="text-[10px] text-slate-400 block font-semibold">Resonant Gemstone</span>
                  <span className="font-bold text-purple-300">{report.luckyElements.gemstone}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-900/60">
                  <span className="text-[10px] text-slate-400 block font-semibold">Fortunate Days</span>
                  <span className="font-bold text-slate-200">{report.luckyElements.days.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
