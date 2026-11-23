"use client";

import React, { useState, useEffect } from "react";
import { POPULAR_CITIES, CityData } from "@/lib/cities";
import { PanchangData, calculatePanchang } from "@/lib/astronomy/panchang";
import {
  Calendar,
  Clock,
  MapPin,
  Sunrise,
  Sunset,
  Moon,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function PanchangPage() {
  const [selectedCity, setSelectedCity] = useState<CityData>(POPULAR_CITIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [panchang, setPanchang] = useState<PanchangData | null>(null);

  useEffect(() => {
    const res = calculatePanchang(
      date,
      selectedCity.name,
      selectedCity.latitude,
      selectedCity.longitude,
      selectedCity.timezone
    );
    setPanchang(res);
  }, [date, selectedCity]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Daily Hindu Vedic Almanac</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          Daily Panchang & Muhurat
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Precise astronomical timings for Tithi, Vara, Nakshatra, Yoga, Karana, Rahu Kaal, and Abhijit Muhurat.
        </p>
      </div>

      {/* Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 mb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-cosmic-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const c = POPULAR_CITIES.find((city) => city.name === e.target.value);
              if (c) setSelectedCity(c);
            }}
            className="bg-cosmic-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            {POPULAR_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}, {c.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {panchang && (
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Solar & Lunar Cycles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl glass-card border border-amber-500/20 flex items-center gap-3">
              <Sunrise className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Sunrise</span>
                <span className="text-base font-extrabold text-white">{panchang.sunrise}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border border-rose-500/20 flex items-center gap-3">
              <Sunset className="w-8 h-8 text-rose-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Sunset</span>
                <span className="text-base font-extrabold text-white">{panchang.sunset}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border border-purple-500/20 flex items-center gap-3">
              <Moon className="w-8 h-8 text-purple-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Moonrise</span>
                <span className="text-base font-extrabold text-white">{panchang.moonrise}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border border-blue-500/20 flex items-center gap-3">
              <Moon className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Moonset</span>
                <span className="text-base font-extrabold text-white">{panchang.moonset}</span>
              </div>
            </div>
          </div>

          {/* Core 5 Limbs (Pancha-Anga) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tithi */}
            <div className="p-6 rounded-2xl glass-panel border border-amber-500/30 space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400">01 • Tithi (Lunar Phase)</span>
              <h3 className="text-lg font-black text-white">{panchang.tithi.name}</h3>
              <p className="text-xs text-slate-300">{panchang.tithi.details}</p>
            </div>

            {/* Vara */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">02 • Vara (Solar Day)</span>
              <h3 className="text-lg font-black text-white">
                {panchang.vara.dayName} ({panchang.vara.sanskritName})
              </h3>
              <p className="text-xs text-slate-300">Ruling Lord: {panchang.vara.rulingPlanet}</p>
            </div>

            {/* Nakshatra */}
            <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 space-y-2">
              <span className="text-[10px] uppercase font-bold text-purple-400">03 • Nakshatra (Lunar Mansion)</span>
              <h3 className="text-lg font-black text-white">
                {panchang.nakshatra.name} (Pada {panchang.nakshatra.pada})
              </h3>
              <p className="text-xs text-slate-300">
                Lord: {panchang.nakshatra.ruler} • Deity: {panchang.nakshatra.deity}
              </p>
            </div>

            {/* Yoga */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">04 • Yoga (Luni-Solar)</span>
              <h3 className="text-lg font-black text-white">{panchang.yoga.name}</h3>
              <p className="text-xs text-amber-300 font-semibold">{panchang.yoga.nature} Nature</p>
            </div>

            {/* Karana */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">05 • Karana (Half-Tithi)</span>
              <h3 className="text-lg font-black text-white">{panchang.karana.name}</h3>
              <p className="text-xs text-slate-300">Karana #{panchang.karana.number}</p>
            </div>

            {/* Auspicious Abhijit */}
            <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Auspicious Window</span>
              <h3 className="text-lg font-black text-emerald-300">Abhijit Muhurat</h3>
              <p className="text-xs text-white font-mono font-bold">
                {panchang.auspiciousTimings.abhijitMuhurat}
              </p>
            </div>
          </div>

          {/* Inauspicious & Auspicious Muhurats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-rose-500/30 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Inauspicious Timings (Ashubha Muhurats)</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-900/60">
                  <span className="text-slate-300">Rahu Kaal (Avoid major ventures):</span>
                  <span className="font-mono font-bold text-rose-400">
                    {panchang.inauspiciousTimings.rahuKaal}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-900/60">
                  <span className="text-slate-300">Yamaganda Kaal:</span>
                  <span className="font-mono text-slate-300">
                    {panchang.inauspiciousTimings.yamaganda}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-900/60">
                  <span className="text-slate-300">Gulika Kaal:</span>
                  <span className="font-mono text-slate-300">
                    {panchang.inauspiciousTimings.gulikaKaal}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 space-y-4">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Auspicious Timings (Shubha Muhurats)</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-900/60">
                  <span className="text-slate-300">Abhijit Muhurat:</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {panchang.auspiciousTimings.abhijitMuhurat}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-900/60">
                  <span className="text-slate-300">Brahma Muhurat (Spiritual sadhana):</span>
                  <span className="font-mono text-amber-300">
                    {panchang.auspiciousTimings.brahmaMuhurat}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-900/60">
                  <span className="text-slate-300">Amrit Kaal:</span>
                  <span className="font-mono text-slate-300">
                    {panchang.auspiciousTimings.amritKaal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
