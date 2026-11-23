"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Sparkles,
  Compass,
  MessageSquare,
  Clock,
  Heart,
  Calendar,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Crown,
} from "lucide-react";

export default function DashboardPage() {
  const { user, activeKundli, setActiveKundli, savedProfiles, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="py-24 text-center">
        <p className="text-xs text-slate-400">Loading your cosmic dashboard...</p>
      </div>
    );
  }

  const quickTools = [
    { name: "Janam Kundli", href: "/kundli", icon: Compass, desc: "Explore natal houses & D9" },
    { name: "AI Astrologer", href: "/ai-astrologer", icon: MessageSquare, desc: "Ask personalized questions" },
    { name: "Horoscope", href: "/horoscope", icon: Sparkles, desc: "Read today's transit forecast" },
    { name: "Kundli Milan", href: "/compatibility", icon: Heart, desc: "36 Gunas relationship matching" },
    { name: "Dasha & Transits", href: "/dasha-transits", icon: Clock, desc: "120-Year Mahadasha timeline" },
    { name: "Daily Panchang", href: "/panchang", icon: Calendar, desc: "Tithi, Vara, Nakshatra, Muhurat" },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl glass-card border border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Personalized Sanctuary
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                user.tier === "premium"
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : user.tier === "pro"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                  : "bg-slate-700/40 text-slate-400"
              }`}
            >
              {user.tier} Tier
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            The cosmic currents today favor focused study, clear speech, and disciplined action.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/kundli"
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-cosmic-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
          >
            Calculate New Chart
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2.5 rounded-xl font-bold text-xs glass-panel border border-amber-400/40 text-amber-300 hover:text-white transition-all"
          >
            Manage Membership
          </Link>
        </div>
      </div>

      {/* Active Birth Profile Summary Card */}
      {activeKundli ? (
        <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Active Janam Kundli ({activeKundli.birthDetails.name})</span>
            </h2>
            <Link
              href="/kundli"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View Full Chart & PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-cosmic-900/60 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ascendant</span>
              <span className="font-bold text-amber-300">{activeKundli.lagna.signName}</span>
              <span className="text-[10px] text-slate-400 font-mono block">{activeKundli.lagna.dms}</span>
            </div>
            <div className="p-3 rounded-xl bg-cosmic-900/60 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Moon Sign</span>
              <span className="font-bold text-purple-300">{activeKundli.moonSign.signName}</span>
              <span className="text-[10px] text-slate-400 block">{activeKundli.moonSign.signSanskrit}</span>
            </div>
            <div className="p-3 rounded-xl bg-cosmic-900/60 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Sun Sign</span>
              <span className="font-bold text-amber-300">{activeKundli.sunSign.signName}</span>
              <span className="text-[10px] text-slate-400 block">{activeKundli.sunSign.signSanskrit}</span>
            </div>
            <div className="p-3 rounded-xl bg-cosmic-900/60 border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Nakshatra</span>
              <span className="font-bold text-white">{activeKundli.moonSign.nakshatraName}</span>
              <span className="text-[10px] text-amber-400 block">Pada {activeKundli.moonSign.pada}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl glass-panel border border-white/10 text-center space-y-3">
          <p className="text-xs text-slate-400">
            You haven&apos;t calculated an active Janam Kundli in this session yet.
          </p>
          <Link
            href="/kundli"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-cosmic-950"
          >
            Generate Janam Kundli
          </Link>
        </div>
      )}

      {/* Saved Profiles List */}
      {savedProfiles.length > 0 && (
        <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl">
          <h2 className="text-sm font-bold text-white mb-4">Saved Family & Personal Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {savedProfiles.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl glass-card border border-white/10 space-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{p.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    Born: {p.birthDate} at {p.birthTime}
                  </p>
                  <p className="text-[11px] text-slate-400">Place: {p.place}</p>
                </div>
                <Link
                  href="/kundli"
                  className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 pt-2 flex items-center gap-1"
                >
                  <span>Open Chart</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access Tools Grid */}
      <div>
        <h2 className="text-sm font-bold text-white mb-4">Quick Navigation to Astrology Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                href={tool.href}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-colors flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-300">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">{tool.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
