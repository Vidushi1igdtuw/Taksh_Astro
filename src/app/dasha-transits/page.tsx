"use client";

import React, { useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { calculateVimshottariDasha, DashaPeriod } from "@/lib/astronomy/dasha";
import { calculateVedicKundli } from "@/lib/astronomy/ephemeris";
import * as Astronomy from "astronomy-engine";
import { getLahiriAyanamsa } from "@/lib/astronomy/ephemeris";
import {
  Clock,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function DashaTransitsPage() {
  const { activeKundli } = useAuth();
  const [dashaData, setDashaData] = useState<{
    mahadashas: DashaPeriod[];
    currentMahadasha: DashaPeriod;
    currentAntardasha: DashaPeriod | null;
    currentPratyantardasha: DashaPeriod | null;
  } | null>(null);

  const [currentTransits, setCurrentTransits] = useState<any[]>([]);

  useEffect(() => {
    // 1. Calculate Vimshottari Dasha
    let k = activeKundli;
    if (!k) {
      k = calculateVedicKundli({
        name: "Seeker",
        birthDate: "1995-10-24",
        birthTime: "07:30",
        place: "New Delhi",
        country: "India",
        latitude: 28.6139,
        longitude: 77.209,
        timezone: 5.5,
      });
    }

    const moon = k.planets.find((p) => p.name === "Moon");
    if (moon) {
      const dasha = calculateVimshottariDasha(new Date(k.birthDetails.date), moon);
      setDashaData(dasha);
    }

    // 2. Compute Live Sky Transits (Gochar)
    const now = new Date();
    const ayanamsa = getLahiriAyanamsa(now);
    const bodies = [
      { name: "Sun", sanskrit: "Surya", body: Astronomy.Body.Sun },
      { name: "Moon", sanskrit: "Chandra", body: Astronomy.Body.Moon },
      { name: "Mars", sanskrit: "Mangala", body: Astronomy.Body.Mars },
      { name: "Mercury", sanskrit: "Budha", body: Astronomy.Body.Mercury },
      { name: "Jupiter", sanskrit: "Guru", body: Astronomy.Body.Jupiter },
      { name: "Venus", sanskrit: "Shukra", body: Astronomy.Body.Venus },
      { name: "Saturn", sanskrit: "Shani", body: Astronomy.Body.Saturn },
    ];

    const signNames = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    const transits = bodies.map((b) => {
      const vec = Astronomy.GeoVector(b.body, now, false);
      const ecl = Astronomy.Ecliptic(vec);
      const siderealLon = ((ecl.elon - ayanamsa) % 360 + 360) % 360;
      const signId = Math.floor(siderealLon / 30) + 1;
      const degInSign = siderealLon % 30;

      return {
        name: b.name,
        sanskrit: b.sanskrit,
        sign: signNames[signId - 1],
        degree: `${Math.floor(degInSign)}° ${Math.round((degInSign % 1) * 60)}'`,
      };
    });

    setCurrentTransits(transits);
  }, [activeKundli]);

  return (
    <AuthGuard
      featureName="Dasha & Transit Analysis"
      description="Track your 120-year Vimshottari Mahadasha timeline, active Antardasha sub-periods, and live Gochar transits."
    >
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Vimshottari Dasha & Planetary Transits</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            Dasha & Transit Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track your 120-year Vimshottari Mahadasha timeline, active Antardasha sub-periods, and real-time
            planetary sky transits (Gochar).
          </p>
        </div>

        {dashaData && (
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* Active Period Spotlight Banner */}
            <div className="p-8 rounded-2xl glass-card border border-amber-500/40 shadow-2xl relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Current Planetary Period Active Right Now
              </span>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white flex items-center gap-2">
                    <span className="text-amber-300">{dashaData.currentMahadasha.planet}</span>
                    <span className="text-slate-400 font-light">Mahadasha</span>
                    {dashaData.currentAntardasha && (
                      <>
                        <span className="text-slate-500">/</span>
                        <span className="text-purple-300">{dashaData.currentAntardasha.planet}</span>
                        <span className="text-slate-400 font-light text-base">Antardasha</span>
                      </>
                    )}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Active from <strong>{dashaData.currentMahadasha.startDate}</strong> until{" "}
                    <strong>{dashaData.currentMahadasha.endDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold animate-pulse-slow">
                    Currently Operating
                  </span>
                </div>
              </div>

              {/* Sub-period Timeline (Antardashas) */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Antardashas within {dashaData.currentMahadasha.planet} Mahadasha:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {dashaData.currentMahadasha.subPeriods?.map((sub) => (
                    <div
                      key={sub.planet}
                      className={`p-3 rounded-xl border text-xs transition-all ${
                        sub.isCurrent
                          ? "bg-amber-400 text-cosmic-950 font-bold border-amber-300 shadow-md scale-105"
                          : "glass-panel border-white/10 text-slate-300"
                      }`}
                    >
                      <span className="block font-bold text-sm">{sub.planet}</span>
                      <span className="text-[10px] block opacity-80 mt-0.5">
                        {sub.startDate.slice(0, 7)} to {sub.endDate.slice(0, 7)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 120-Year Mahadasha Timeline */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Full 120-Year Vimshottari Mahadasha Lifespan Cycle</span>
              </h3>

              <div className="space-y-2.5">
                {dashaData.mahadashas.map((m) => (
                  <div
                    key={m.planet + m.startDate}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      m.isCurrent
                        ? "bg-amber-500/15 border-amber-400/50 shadow-md text-amber-200"
                        : "bg-cosmic-900/40 border-white/5 text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          m.isCurrent ? "bg-amber-400 text-cosmic-950" : "bg-white/10 text-slate-300"
                        }`}
                      >
                        {m.planet.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-xs block text-white">{m.planet} Mahadasha</span>
                        <span className="text-[10px] text-slate-400">
                          {m.durationYears.toFixed(1)} Years
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono block text-slate-200">
                        {m.startDate} — {m.endDate}
                      </span>
                      {m.isCurrent && (
                        <span className="text-[10px] font-bold text-amber-400 uppercase">
                          Current Period
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Sky Planetary Transits (Gochar) */}
            <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Live Planetary Sky Transits (Gochar Today)</span>
                </h3>
                <span className="text-[10px] text-purple-300 font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40">
                  Real-Time Astronomical Ecliptic
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {currentTransits.map((tr) => (
                  <div
                    key={tr.name}
                    className="p-3.5 rounded-xl glass-card border border-white/10 text-center space-y-1"
                  >
                    <span className="text-xs font-bold text-white block">{tr.name}</span>
                    <span className="text-[10px] text-slate-400 block">{tr.sanskrit}</span>
                    <span className="text-xs font-extrabold text-amber-300 block">{tr.sign}</span>
                    <span className="text-[10px] font-mono text-slate-400 block">{tr.degree}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
