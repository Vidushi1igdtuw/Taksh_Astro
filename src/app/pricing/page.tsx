"use client";

import React, { useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import { useAuth } from "@/context/AuthContext";
import {
  Crown,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
} from "lucide-react";

export default function PricingPage() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "premium">("pro");

  const openCheckout = (plan: "pro" | "premium") => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>Transparent Membership Tiers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          Elevate Your Astrological Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Unlock unlimited AI Astrologer consultations, deep Dasha breakdowns, and downloadable PDF reports.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch mb-16">
        {/* Seeker (Free) */}
        <div className="rounded-2xl glass-panel p-8 flex flex-col justify-between border border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Seeker</h3>
            <p className="text-xs text-slate-400 mb-4">Essential birth chart exploration</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-black text-white">₹0</span>
              <span className="text-xs text-slate-400">/ forever</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Basic Janam Kundli Calculations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily Personalized Horoscope</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily Hindu Panchang Timings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5 AI Astrologer Queries Per Day</span>
              </li>
            </ul>
          </div>

          <div className="w-full py-2.5 rounded-xl text-center text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
            {user?.tier === "free" ? "Current Tier" : "Default Free Tier"}
          </div>
        </div>

        {/* Pro Plan */}
        <div className="rounded-2xl glass-card p-8 flex flex-col justify-between border-2 border-amber-400 shadow-2xl relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-cosmic-950 font-black text-[10px] uppercase tracking-wider shadow-md">
            Most Popular
          </div>

          <div>
            <h3 className="text-lg font-bold text-amber-300 mb-1">Astroverse Pro</h3>
            <p className="text-xs text-slate-400 mb-4">Complete astrological clarity & Kundli PDF</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-amber-300">₹999</span>
              <span className="text-xs text-slate-400">/ year</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-200 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Detailed Kundli & Navamsa (D9) Chart</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>50 AI Astrologer Questions / Day</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>120-Year Vimshottari Mahadasha Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Full Ashtakoota 36 Gunas Compatibility</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dosha Remedies (Mangal, Kaal Sarp, Pitra)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Download Branded Kundli PDF Reports</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => openCheckout("pro")}
            className="w-full py-3 rounded-xl text-center text-xs font-bold bg-amber-400 hover:bg-amber-300 text-cosmic-950 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
          >
            {user?.tier === "pro" ? "Current Active Plan" : "Upgrade to Pro"}
          </button>
        </div>

        {/* Premium VIP */}
        <div className="rounded-2xl glass-card-purple p-8 flex flex-col justify-between border border-purple-500/40">
          <div>
            <h3 className="text-lg font-bold text-purple-300 mb-1">Astroverse VIP</h3>
            <p className="text-xs text-slate-400 mb-4">Supreme personalized spiritual guidance</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-black text-purple-200">₹2,499</span>
              <span className="text-xs text-slate-400">/ year</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>All Pro Features Included</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Unlimited AI Astrologer Queries (200/day)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>In-depth Yearly Planetary Transit Forecasts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Multiple Saved Family Birth Profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Priority 24/7 Astrological Support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => openCheckout("premium")}
            className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-md shadow-purple-500/20 transition-all hover:scale-105"
          >
            {user?.tier === "premium" ? "Current Active Plan" : "Unlock VIP Access"}
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
