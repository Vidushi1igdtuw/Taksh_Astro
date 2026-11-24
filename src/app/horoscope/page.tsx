"use client";

import React, { useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { ZODIAC_SIGNS } from "@/lib/astronomy/ephemeris";
import {
  Sparkles,
  Heart,
  Briefcase,
  Coins,
  Activity,
  GraduationCap,
  Users,
  Loader2,
} from "lucide-react";

export default function HoroscopePage() {
  const { activeKundli } = useAuth();
  const [selectedSign, setSelectedSign] = useState(
    activeKundli ? activeKundli.moonSign.signName : "Aries"
  );
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");
  const [usePersonalized, setUsePersonalized] = useState(Boolean(activeKundli));
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchHoroscope = async () => {
    setLoading(true);
    try {
      const moonParam = usePersonalized && activeKundli ? activeKundli.moonSign.signName : "";
      const lagnaParam = usePersonalized && activeKundli ? activeKundli.lagna.signName : "";
      const res = await fetch(
        `/api/horoscope?sign=${selectedSign}&timeframe=${timeframe}&moonSign=${moonParam}&lagna=${lagnaParam}`
      );
      const json = await res.json();
      if (res.ok) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoroscope();
  }, [selectedSign, timeframe, usePersonalized]);

  const categoryIcons: Record<string, any> = {
    love: Heart,
    career: Briefcase,
    finance: Coins,
    health: Activity,
    education: GraduationCap,
    family: Users,
  };

  return (
    <AuthGuard
      featureName="Personalized Horoscope"
      description="Access deep daily, weekly, monthly, and yearly Vedic forecasts personalized to your natal Moon sign and Ascendant."
    >
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Vedic Planetary Forecast</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            Personalized Vedic Horoscope
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Personalized daily, weekly, monthly, and yearly astrological forecasts across 6 core life categories.
          </p>
        </div>

        {/* Control Bar: Timeframe & Personalized Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 mb-8 max-w-4xl mx-auto">
          {/* Timeframe Selector */}
          <div className="flex p-1 rounded-xl bg-cosmic-900 border border-white/10 text-xs">
            {(["daily", "weekly", "monthly", "yearly"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-1.5 rounded-lg font-bold capitalize transition-all ${timeframe === tf
                  ? "bg-amber-400 text-cosmic-950 shadow-md shadow-amber-500/20"
                  : "text-slate-300 hover:text-white"
                  }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Personalized Moon Sign Toggle */}
          {activeKundli ? (
            <button
              onClick={() => {
                setUsePersonalized(!usePersonalized);
                if (!usePersonalized) setSelectedSign(activeKundli.moonSign.signName);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${usePersonalized
                ? "bg-purple-500/20 text-purple-200 border-purple-400/50"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
                }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>
                {usePersonalized
                  ? `Personalized (Moon: ${activeKundli.moonSign.signName})`
                  : "Personalize with My Kundli"}
              </span>
            </button>
          ) : (
            <span className="text-xs text-slate-400">
              Personalized using your active birth chart.
            </span>
          )}
        </div>

        {/* 12 Zodiac Sign Picker */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign.toLowerCase() === sign.name.toLowerCase();
            return (
              <button
                key={sign.id}
                onClick={() => {
                  setSelectedSign(sign.name);
                  setUsePersonalized(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${isSelected
                  ? "bg-amber-400 text-cosmic-950 font-black shadow-lg shadow-amber-500/30 scale-105"
                  : "glass-panel text-slate-300 hover:text-white hover:border-amber-400/40"
                  }`}
              >
                <span className="text-sm">{sign.symbol}</span>
                <span>{sign.name}</span>
              </button>
            );
          })}
        </div>

        {/* Horoscope Content */}
        {loading ? (
          <div className="p-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
            <p className="text-xs text-slate-400">Consulting planetary transits for {selectedSign}...</p>
          </div>
        ) : data ? (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header Summary Card */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-amber-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                    {data.timeframe} Forecast • {data.dateFormatted}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {data.sign} ({data.sanskrit})
                  </h2>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-cosmic-900/60 border border-white/10">
                  <span className="text-xs text-slate-400">Cosmic Harmony:</span>
                  <span className="text-base font-extrabold text-amber-300">{data.cosmicRating}%</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                {data.overallMood}
              </p>
              <p className="text-xs text-amber-300/90 italic">
                {data.planetaryInfluences}
              </p>

              {/* Lucky Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 mt-6 text-xs">
                <div className="p-3 rounded-xl bg-cosmic-900/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Lucky Numbers</span>
                  <span className="font-bold text-amber-300">{data.lucky.numbers.join(", ")}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-900/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Lucky Color</span>
                  <span className="font-bold text-slate-100">{data.lucky.color}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-900/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Lucky Gemstone</span>
                  <span className="font-bold text-purple-300">{data.lucky.gemstone}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-900/40 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Auspicious Time</span>
                  <span className="font-bold text-slate-100">{data.lucky.favorableTime}</span>
                </div>
              </div>
            </div>

            {/* 6 Category Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(data.categories).map(([key, cat]: any) => {
                const Icon = categoryIcons[key] || Sparkles;
                return (
                  <div
                    key={key}
                    className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                          {cat.score}% Favorable
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-2">{cat.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {cat.prediction}
                      </p>
                    </div>

                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </AuthGuard>
  );
}
