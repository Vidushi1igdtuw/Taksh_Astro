"use client";

import React, { useState, Suspense } from "react";
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

function RegisterContent() {
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
    } else {
      setCityResults([]);
    }
  };

  const handleSelectCity = (c: CityData) => {
    setSelectedCity(c);
    setCitySearch(`${c.name}, ${c.country}`);
    setShowCityDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!birthDate || !birthTime) {
      setError("Please provide your complete birth date and birth time.");
      return;
    }

    setLoading(true);

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
      setError(res.error || "Failed to create your profile.");
    }
  };

  return (
    <div className="py-12 max-w-2xl mx-auto px-4">
      <div className="p-6 md:p-8 rounded-3xl glass-card border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 via-amber-500 to-amber-300 p-0.5 mx-auto mb-3">
            <div className="w-full h-full bg-cosmic-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Join Astroverse</h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Create your account and initialize your sacred Vedic birth chart profile in one seamless step.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: ACCOUNT CREDENTIALS */}
          <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Step 1: Account Credentials</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Password (min 6 chars) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: SACRED BIRTH PROFILE */}
          <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Step 2: Sacred Birth Profile (Used for Janam Kundli)</span>
              </div>
              <span className="text-[10px] text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Swiss Ephemeris Accuracy
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Your exact time and birthplace allow our astronomical engine to compute your Lagna, Moon Sign (Rashi), Nakshatra Pada, and planetary Bhavas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Exact Time of Birth *
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="time"
                    required
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Non-binary</option>
                </select>
              </div>
            </div>

            {/* Birthplace Search */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Place of Birth (City / Town) *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3 z-10" />
                <input
                  type="text"
                  value={citySearch || `${selectedCity.name}, ${selectedCity.country}`}
                  onChange={(e) => {
                    handleCitySearch(e.target.value);
                    setShowCityDropdown(true);
                  }}
                  onFocus={() => setShowCityDropdown(true)}
                  placeholder="Search city (e.g. New Delhi, Mumbai, London, New York...)"
                  className="w-full bg-cosmic-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />

                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-cosmic-950 border border-amber-500/30 rounded-xl shadow-2xl z-30 divide-y divide-white/5">
                    {(cityResults.length > 0 ? cityResults : POPULAR_CITIES).map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectCity(c)}
                        className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-amber-300 hover:bg-amber-400/10 flex items-center justify-between"
                      >
                        <span className="font-medium">
                          {c.name}, <span className="text-slate-400">{c.country}</span>
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {c.latitude.toFixed(2)}°N, {c.longitude.toFixed(2)}°E (UTC{c.timezone >= 0 ? `+${c.timezone}` : c.timezone})
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Coordinates Pill */}
              <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-amber-400 font-semibold">Active Coordinates:</span>
                <span>
                  {selectedCity.name} ({selectedCity.latitude.toFixed(4)}°, {selectedCity.longitude.toFixed(4)}°, Timezone: UTC{selectedCity.timezone >= 0 ? `+${selectedCity.timezone}` : selectedCity.timezone})
                </span>
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

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-3" />
          <p className="text-sm">Loading Astroverse Onboarding...</p>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}