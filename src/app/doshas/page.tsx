"use client";

import React, { useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { DoshaReport, analyzeDoshas } from "@/lib/astronomy/dosha";
import { calculateVedicKundli } from "@/lib/astronomy/ephemeris";
import {
  ShieldAlert,
  Sparkles,
  Clock,
  Loader2,
} from "lucide-react";

export default function DoshasPage() {
  const { activeKundli } = useAuth();
  const [report, setReport] = useState<DoshaReport | null>(null);

  // If activeKundli is loaded, use it; otherwise compute sample
  useEffect(() => {
    if (activeKundli) {
      setReport(analyzeDoshas(activeKundli));
    } else {
      // Calculate default sample
      const sample = calculateVedicKundli({
        name: "Seeker",
        birthDate: "1995-10-24",
        birthTime: "07:30",
        place: "New Delhi",
        country: "India",
        latitude: 28.6139,
        longitude: 77.209,
        timezone: 5.5,
      });
      setReport(analyzeDoshas(sample));
    }
  }, [activeKundli]);

  return (
    <AuthGuard
      featureName="Vedic Dosha Analysis"
      description="Inspect your chart for Mangal Dosha, Kaal Sarp combinations, Pitra influences, and real-time Shani Sade Sati cycles."
    >
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Vedic Planetary Combinations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            Vedic Dosha Analysis & Remedies
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Clear, authentic analysis of Mangal Dosha, Kaal Sarp, Pitra Dosha, and Shani Sade Sati
            with classical cancellations and constructive Vedic remedies.
          </p>
        </div>

        {report ? (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* 1. MANGAL DOSHA CARD */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-rose-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Mangal Dosha (Kuja Dosha)</h3>
                    <span className="text-xs text-slate-400">Mars placement in relational houses</span>
                  </div>
                </div>

                <div>
                  {report.mangalDosha.isPresent ? (
                    report.mangalDosha.isCancelled ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                        Cancelled by Classical Benefic Yoga
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs">
                        Present ({report.mangalDosha.severity} Intensity)
                      </span>
                    )
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                      Not Present
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {report.mangalDosha.details}
              </p>

              {report.mangalDosha.isCancelled && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-4">
                  <strong>Vedic Cancellation (Nivritti):</strong> {report.mangalDosha.cancellationReason}
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-amber-300 block mb-2">Recommended Remedies:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.mangalDosha.remedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. KAAL SARP DOSHA CARD */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-purple-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Kaal Sarp Yoga</h3>
                    <span className="text-xs text-slate-400">Planetary alignment along Rahu-Ketu nodal axis</span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs border ${report.kaalSarpDosha.isPresent
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    }`}
                >
                  {report.kaalSarpDosha.isPresent
                    ? `${report.kaalSarpDosha.type} (${report.kaalSarpDosha.isPurna ? "Purna" : "Anshik"})`
                    : "Not Present"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {report.kaalSarpDosha.description}
              </p>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-purple-300 block mb-2">Recommended Remedies:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.kaalSarpDosha.remedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. SHANI SADE SATI TRACKER */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-blue-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Shani Sade Sati & Dhaiya Tracker</h3>
                    <span className="text-xs text-slate-400">
                      Live Saturn transit relative to natal Moon in {report.sadeSati.natalMoonSign}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs border ${report.sadeSati.status === "None"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                    }`}
                >
                  {report.sadeSati.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {report.sadeSati.explanation}
              </p>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-blue-300 block mb-2">Saturn Pacification Remedies:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.sadeSati.remedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. PITRA & GURU CHANDAL COMBINATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Pitra Dosha</h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${report.pitraDosha.isPresent
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-300"
                      }`}
                  >
                    {report.pitraDosha.isPresent ? report.pitraDosha.intensity : "None"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {report.pitraDosha.description}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-amber-400 block mb-1">Pitra Remedy:</span>
                  <span className="text-xs text-slate-400">{report.pitraDosha.remedies[0]}</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Guru Chandal Yoga</h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${report.guruChandalDosha.isPresent
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                      : "bg-emerald-500/20 text-emerald-300"
                      }`}
                  >
                    {report.guruChandalDosha.isPresent ? "Detected" : "None"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {report.guruChandalDosha.description}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-purple-400 block mb-1">Guru Remedy:</span>
                  <span className="text-xs text-slate-400">{report.guruChandalDosha.remedies[0]}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
