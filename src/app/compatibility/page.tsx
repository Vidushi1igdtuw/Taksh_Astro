"use client";

import React, { useState } from "react";
import { POPULAR_CITIES, searchCities, CityData } from "@/lib/cities";
import { CompatibilityResult, KootaScore } from "@/lib/astronomy/compatibility";
import { useAuth } from "@/context/AuthContext";
import {
  Heart,
  Sparkles,
  Users,
  Compass,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function CompatibilityPage() {
  const { user, activeKundli } = useAuth();

  // Partner 1 (e.g. Groom / Seeker)
  const [p1Name, setP1Name] = useState(user?.name || "Aryavrat Sharma");
  const [p1Date, setP1Date] = useState("1995-10-24");
  const [p1Time, setP1Time] = useState("07:30");
  const [p1City, setP1City] = useState<CityData>(POPULAR_CITIES[0]);

  // Partner 2 (e.g. Bride / Partner)
  const [p2Name, setP2Name] = useState("Priyanka Sen");
  const [p2Date, setP2Date] = useState("1997-04-12");
  const [p2Time, setP2Time] = useState("14:15");
  const [p2City, setP2City] = useState<CityData>(POPULAR_CITIES[1]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partner1: {
            name: p1Name,
            birthDate: p1Date,
            birthTime: p1Time,
            place: p1City.name,
            country: p1City.country,
            latitude: p1City.latitude,
            longitude: p1City.longitude,
            timezone: p1City.timezone,
            kundli: activeKundli && activeKundli.birthDetails.name === p1Name ? activeKundli : undefined,
          },
          partner2: {
            name: p2Name,
            birthDate: p2Date,
            birthTime: p2Time,
            place: p2City.name,
            country: p2City.country,
            latitude: p2City.latitude,
            longitude: p2City.longitude,
            timezone: p2City.timezone,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to calculate compatibility");
      }

      setResult(data.report);
    } catch (err: any) {
      setError(err.message || "Matchmaking calculation failed");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: KootaScore["status"]) => {
    switch (status) {
      case "Excellent":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Good":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Average":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Ashtakoota Guna Milan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          Vedic Relationship Compatibility
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Enter both partners&apos; birth details to generate the authentic 36 Gunas Ashtakoota Milan,
          Mangal Dosha matching, strengths, and Vedic remedies.
        </p>
      </div>

      {/* Dual Input Form */}
      <form onSubmit={handleMatch} className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Partner 1 */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Partner 1 Details</span>
              </h2>
              <span className="text-[10px] text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                Primary Profile
              </span>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={p1Name}
                onChange={(e) => setP1Name(e.target.value)}
                required
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={p1Date}
                  onChange={(e) => setP1Date(e.target.value)}
                  required
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">Birth Time</label>
                <input
                  type="time"
                  value={p1Time}
                  onChange={(e) => setP1Time(e.target.value)}
                  required
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">Birthplace City</label>
              <select
                onChange={(e) => {
                  const c = POPULAR_CITIES.find((city) => city.name === e.target.value);
                  if (c) setP1City(c);
                }}
                value={p1City.name}
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}, {c.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Partner 2 */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Partner 2 Details</span>
              </h2>
              <span className="text-[10px] text-rose-300 font-semibold px-2 py-0.5 rounded-full bg-rose-400/10 border border-rose-400/30">
                Partner Profile
              </span>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={p2Name}
                onChange={(e) => setP2Name(e.target.value)}
                required
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={p2Date}
                  onChange={(e) => setP2Date(e.target.value)}
                  required
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">Birth Time</label>
                <input
                  type="time"
                  value={p2Time}
                  onChange={(e) => setP2Time(e.target.value)}
                  required
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">Birthplace City</label>
              <select
                onChange={(e) => {
                  const c = POPULAR_CITIES.find((city) => city.name === e.target.value);
                  if (c) setP2City(c);
                }}
                value={p2City.name}
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}, {c.country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4 text-center">
            {error}
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 via-amber-400 to-amber-500 hover:from-rose-400 hover:to-amber-300 text-cosmic-950 shadow-xl shadow-rose-500/20 inline-flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Calculating Ashtakoota 36 Gunas...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Calculate 36 Gunas Compatibility
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results View */}
      {result && (
        <div className="space-y-8 animate-in fade-in">
          {/* Main Score Hero Card */}
          <div className="p-8 rounded-2xl glass-card border border-rose-500/40 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase tracking-wide">
                  {result.verdict}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {result.partner1.name} & {result.partner2.name}
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
                  <span>
                    <strong>{result.partner1.name}:</strong> Moon in {result.partner1.moonSign} (
                    {result.partner1.nakshatra} Pada {result.partner1.pada})
                  </span>
                  <span>•</span>
                  <span>
                    <strong>{result.partner2.name}:</strong> Moon in {result.partner2.moonSign} (
                    {result.partner2.nakshatra} Pada {result.partner2.pada})
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  {result.summary}
                </p>
              </div>

              {/* Score Circular Dial */}
              <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1e293b"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={result.totalScore >= 21 ? "#f59e0b" : "#f43f5e"}
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * result.percentage) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-white">{result.totalScore}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">out of 36</span>
                  <span className="text-[11px] font-bold text-amber-400">{result.percentage}%</span>
                </div>
              </div>
            </div>

            {/* Mangal Dosha Compatibility Banner */}
            <div className="mt-6 pt-6 border-t border-white/10 flex items-start gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">
                  Mangal Dosha Analysis:{" "}
                  <span
                    className={
                      result.mangalDoshaMatch.isCompatible ? "text-emerald-400" : "text-amber-400"
                    }
                  >
                    {result.mangalDoshaMatch.isCompatible ? "Balanced / Neutralized" : "Attention Needed"}
                  </span>
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {result.mangalDoshaMatch.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* 8 Kootas Detailed Table */}
          <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10 bg-cosmic-900/60">
              <h3 className="text-sm font-bold text-white">
                Detailed Ashtakoota Breakdown (All 8 Dimensions)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-cosmic-950/80 text-amber-300 uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Koota</th>
                    <th className="px-4 py-3 font-semibold">Points</th>
                    <th className="px-4 py-3 font-semibold">Dimension</th>
                    <th className="px-4 py-3 font-semibold">Interpretation</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {result.kootas.map((k) => (
                    <tr key={k.name} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold text-white">
                        <span>{k.name}</span>{" "}
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({k.hindiName})
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-amber-300">
                        {k.obtainedPoints} / {k.maxPoints}
                      </td>
                      <td className="px-4 py-3 text-slate-300">{k.area}</td>
                      <td className="px-4 py-3 text-slate-400 max-w-sm">{k.description}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${getStatusBadge(
                            k.status
                          )}`}
                        >
                          {k.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30">
              <h3 className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Relationship Strengths</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {result.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-amber-500/30">
              <h3 className="text-sm font-bold text-amber-300 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Vedic Remedies & Considerations</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {result.remedies.map((rem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
