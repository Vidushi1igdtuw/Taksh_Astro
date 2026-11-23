"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { POPULAR_CITIES, searchCities, CityData } from "@/lib/cities";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const { register } = useAuth();

  // Step / Section State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Birth Profile Information
  const [birthDate, setBirthDate] = useState("1998-05-15");
  const [birthTime, setBirthTime] = useState("08:30");
  const [gender, setGender] = useState("Male");
  const [selectedCity, setSelectedCity] = useState<CityData>(POPULAR_CITIES[0]);
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState<CityData[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await register({
      name,
      email,
      password,
      birthDate,
      birthTime,
      place: selectedCity.name,
      country: selectedCity.country,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      timezone: selectedCity.timezone,
      gender,
    });

    setLoading(false);

    if (res.success) {
      router.push(redirectTarget);
    } else {
      setError(res.error || "Registration failed");
    }
  };

  return (
    <div className="py-12 max-w-2xl mx-auto px-4 sm:px-6">
      <div className="p-8 sm:p-10 rounded-3xl glass-card border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 via-amber-500 to-amber-300 p-0.5 mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-cosmic-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Create Your Account</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Your personal Janam Kundli and astrological profile will be automatically calculated and saved to your account.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* SECTION 1: ACCOUNT CREDENTIALS */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <User className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                1. Account Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Vidushi Singh"
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@domain.com"
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat password"
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: SACRED BIRTH PROFILE DETAILS */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" />
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  2. Birth Profile (For Kundli & Predictions)
                </h2>
              </div>
              <span className="text-[10px] text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                Lahiri Ephemeris
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exact Time of Birth</span>
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  required
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* City Auto-complete / Selector */}
            <div className="relative">
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
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
                placeholder="Search birthplace city..."
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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

            {/* Coordinates & Timezone Info */}
            <div className="p-2 rounded-xl bg-cosmic-900/60 border border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
              <span>
                Coordinates: {selectedCity.latitude}° N, {selectedCity.longitude}° E
              </span>
              <span>Timezone: UTC {selectedCity.timezone >= 0 ? `+${selectedCity.timezone}` : selectedCity.timezone}</span>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      gender === g
                        ? "bg-amber-400/20 border-amber-400/60 text-amber-300"
                        : "border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Your Janam Kundli Profile...
                </>
              ) : (
                <>
                  <span>Create Account & Calculate Birth Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-slate-400 mt-6 pt-4 border-t border-white/10">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(redirectTarget)}`}
            className="text-amber-400 hover:text-amber-300 font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
