"use client";

import React, { useState } from "react";
import NorthIndianChart from "@/components/NorthIndianChart";
import SouthIndianChart from "@/components/SouthIndianChart";
import PlanetaryTable from "@/components/PlanetaryTable";
import KundliPDF from "@/components/KundliPDF";
import { POPULAR_CITIES, searchCities, CityData } from "@/lib/cities";
import { KundliData } from "@/lib/astronomy/ephemeris";
import { useAuth } from "@/context/AuthContext";
import {
  Compass,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  ChevronRight,
  Loader2,
  RefreshCw,
  Share2,
  Bookmark,
} from "lucide-react";

export default function KundliPage() {
  const { user, activeKundli, setActiveKundli, savedProfiles } = useAuth();

  // Form State
  const [name, setName] = useState(user?.name || "Aryavrat Sharma");
  const [birthDate, setBirthDate] = useState("1995-10-24");
  const [birthTime, setBirthTime] = useState("07:30");
  const [gender, setGender] = useState("Male");
  const [selectedCity, setSelectedCity] = useState<CityData>(POPULAR_CITIES[0]);
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState<CityData[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [saveToAccount, setSaveToAccount] = useState(true);

  // Chart Presentation State
  const [chartStyle, setChartStyle] = useState<"north" | "south">("north");
  const [chartDivision, setChartDivision] = useState<"d1" | "d9">("d1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kundli Result State (defaults to activeKundli or calculated on submit)
  const [kundli, setKundli] = useState<KundliData | null>(activeKundli);

  const handleCitySearch = (q: string) => {
    setCitySearch(q);
    if (q.trim().length > 0) {
      setCityResults(searchCities(q));
      setShowCityDropdown(true);
    } else {
      setShowCityDropdown(false);
    }
  };

  const selectCity = (city: CityData) => {
    setSelectedCity(city);
    setCitySearch(`${city.name}, ${city.country}`);
    setShowCityDropdown(false);
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/kundli/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          birthDate,
          birthTime,
          place: selectedCity.name,
          country: selectedCity.country,
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude,
          timezone: selectedCity.timezone,
          gender,
          saveProfile: user && saveToAccount,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to calculate birth chart");
      }

      setKundli(data.kundli);
      setActiveKundli(data.kundli);
    } catch (err: any) {
      setError(err.message || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  const loadSavedProfile = (profile: any) => {
    setName(profile.name);
    setBirthDate(profile.birthDate);
    setBirthTime(profile.birthTime);
    setSelectedCity({
      name: profile.place,
      country: profile.country,
      latitude: profile.latitude,
      longitude: profile.longitude,
      timezone: profile.timezone,
      tzName: "Asia/Kolkata",
    });
    setCitySearch(`${profile.place}, ${profile.country}`);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Vedic Astronomical Ephemeris</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          Janam Kundli Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Enter your birth coordinates to generate your high-precision Vedic birth chart, Bhavas,
          and D9 Navamsa with Lahiri Ayanamsa.
        </p>
      </div>

      {/* Main Grid: Form on Left, Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-4 rounded-2xl glass-panel border border-white/10 p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Birth Information</span>
            </h2>
            {savedProfiles.length > 0 && (
              <span className="text-[11px] text-amber-400 font-medium">
                {savedProfiles.length} Saved Profiles
              </span>
            )}
          </div>

          {/* Quick Select Saved Profile */}
          {savedProfiles.length > 0 && (
            <div className="mb-4 p-2.5 rounded-xl bg-cosmic-900/60 border border-white/5">
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Load Saved Profile
              </label>
              <select
                onChange={(e) => {
                  const p = savedProfiles.find((sp) => sp.id === e.target.value);
                  if (p) loadSavedProfile(p);
                }}
                className="w-full bg-cosmic-950 border border-white/10 rounded-lg p-1.5 text-xs text-slate-200"
              >
                <option value="">Select a profile...</option>
                {savedProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.birthDate})
                  </option>
                ))}
              </select>
            </div>
          )}

          <form onSubmit={handleCalculate} className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Aryavrat Sharma"
                className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Exact Time</span>
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  required
                  className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* City & Location Auto-suggest */}
            <div className="relative">
              <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Place of Birth</span>
              </label>
              <input
                type="text"
                value={citySearch || `${selectedCity.name}, ${selectedCity.country}`}
                onChange={(e) => handleCitySearch(e.target.value)}
                onFocus={() => {
                  setCityResults(searchCities(citySearch));
                  setShowCityDropdown(true);
                }}
                placeholder="Search city (e.g. New Delhi, Mumbai, London)"
                className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />

              {showCityDropdown && (
                <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl glass-panel border border-amber-500/30 p-1 shadow-2xl z-30 divide-y divide-white/5">
                  {cityResults.length > 0 ? (
                    cityResults.map((c) => (
                      <button
                        key={`${c.name}-${c.country}`}
                        type="button"
                        onClick={() => selectCity(c)}
                        className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-amber-400/10 hover:text-amber-300 flex items-center justify-between"
                      >
                        <span>
                          {c.name}, {c.country}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {c.latitude.toFixed(2)}°, {c.longitude.toFixed(2)}°
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-2 text-[11px] text-slate-400 text-center">
                      No matching cities found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Coordinates Badge */}
            <div className="p-2 rounded-xl bg-cosmic-900/40 border border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
              <span>
                Coordinates: {selectedCity.latitude}° N, {selectedCity.longitude}° E
              </span>
              <span>Timezone: UTC {selectedCity.timezone >= 0 ? `+${selectedCity.timezone}` : selectedCity.timezone}</span>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Gender (Optional)</label>
              <div className="grid grid-cols-3 gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-1.5 rounded-lg text-xs font-medium border ${
                      gender === g
                        ? "bg-amber-400/20 border-amber-400/50 text-amber-300"
                        : "border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Save to account checkbox */}
            {user && (
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={saveToAccount}
                  onChange={(e) => setSaveToAccount(e.target.checked)}
                  className="rounded border-white/20 bg-cosmic-950 text-amber-500 focus:ring-0"
                />
                <span className="text-[11px] text-slate-300">
                  Save this profile to my Astroverse account
                </span>
              </label>
            )}

            {error && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Calculating Celestial Longitudes...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Janam Kundli
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Interactive Chart & Analysis */}
        <div className="lg:col-span-8 space-y-6">
          {kundli ? (
            <>
              {/* Header Bar with Chart Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{kundli.birthDetails.name}&apos;s Chart</span>
                    <span className="text-xs font-normal text-amber-400">
                      ({kundli.lagna.signName} Ascendant)
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Ayanamsa: {kundli.ayanamsaName} ({kundli.ayanamsaDms})
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Style Switcher */}
                  <div className="flex p-0.5 rounded-xl bg-cosmic-900 border border-white/10 text-[11px]">
                    <button
                      onClick={() => setChartStyle("north")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        chartStyle === "north"
                          ? "bg-amber-400 text-cosmic-950 font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      North Indian
                    </button>
                    <button
                      onClick={() => setChartStyle("south")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        chartStyle === "south"
                          ? "bg-amber-400 text-cosmic-950 font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      South Indian
                    </button>
                  </div>

                  {/* Division Switcher */}
                  <div className="flex p-0.5 rounded-xl bg-cosmic-900 border border-white/10 text-[11px]">
                    <button
                      onClick={() => setChartDivision("d1")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        chartDivision === "d1"
                          ? "bg-purple-500 text-white font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      Rashi (D1)
                    </button>
                    <button
                      onClick={() => setChartDivision("d9")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        chartDivision === "d9"
                          ? "bg-purple-500 text-white font-bold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      Navamsa (D9)
                    </button>
                  </div>

                  {/* PDF Download Button */}
                  <KundliPDF kundli={kundli} />
                </div>
              </div>

              {/* Core Sign Pillars (Lagna, Moon, Sun, Nakshatra) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl glass-card border border-amber-500/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Ascendant (Lagna)
                  </span>
                  <span className="text-sm font-extrabold text-amber-300 block">
                    {kundli.lagna.signName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {kundli.lagna.dms}
                  </span>
                </div>

                <div className="p-3 rounded-xl glass-card border border-purple-500/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Moon Sign (Rashi)
                  </span>
                  <span className="text-sm font-extrabold text-purple-200 block">
                    {kundli.moonSign.signName}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {kundli.moonSign.signSanskrit}
                  </span>
                </div>

                <div className="p-3 rounded-xl glass-card border border-amber-500/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Sun Sign
                  </span>
                  <span className="text-sm font-extrabold text-amber-300 block">
                    {kundli.sunSign.signName}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {kundli.sunSign.signSanskrit}
                  </span>
                </div>

                <div className="p-3 rounded-xl glass-card border border-purple-500/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Birth Nakshatra
                  </span>
                  <span className="text-sm font-extrabold text-white block">
                    {kundli.moonSign.nakshatraName}
                  </span>
                  <span className="text-[10px] text-amber-400">
                    Pada {kundli.moonSign.pada} (Lord: {kundli.moonSign.nakshatraLord})
                  </span>
                </div>
              </div>

              {/* Chart Visualization (North or South Indian) */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col items-center justify-center">
                <span className="text-xs text-amber-400 font-semibold mb-4">
                  {chartStyle === "north" ? "North Indian Diamond Chart" : "South Indian Square Chart"} -{" "}
                  {chartDivision === "d1" ? "Rashi Chart (Lagna D1)" : "Navamsa Chart (Spiritual D9)"}
                </span>

                {chartStyle === "north" ? (
                  <NorthIndianChart kundli={kundli} isNavamsa={chartDivision === "d9"} />
                ) : (
                  <SouthIndianChart kundli={kundli} isNavamsa={chartDivision === "d9"} />
                )}
              </div>

              {/* Planetary Positions Table */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Planetary Positions & Status (Graha Sthiti)</span>
                </h3>
                <PlanetaryTable kundli={kundli} />
              </div>

              {/* Major Detected Yogas */}
              {kundli.yogas && kundli.yogas.length > 0 && (
                <div className="p-6 rounded-2xl glass-panel border border-amber-500/30">
                  <h3 className="text-sm font-bold text-amber-300 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Auspicious Vedic Yogas Detected</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {kundli.yogas.map((yoga) => (
                      <div
                        key={yoga.name}
                        className="p-4 rounded-xl bg-cosmic-900/60 border border-white/5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white">{yoga.name}</h4>
                          <span
                            className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                              yoga.type === "Raja"
                                ? "bg-amber-400 text-cosmic-950"
                                : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {yoga.type} Yoga
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{yoga.description}</p>
                        <p className="text-[11px] text-amber-200/90 font-medium">{yoga.effects}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 rounded-2xl glass-panel border border-white/10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Your Janam Kundli Awaits</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Fill in your birth details on the left to calculate your complete planetary chart,
                houses, nakshatra padas, and auspicious Vedic yogas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
