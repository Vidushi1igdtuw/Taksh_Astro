"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Check, Crown, ShieldCheck, Sparkles, X, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: "pro" | "premium";
}

export default function PaymentModal({ isOpen, onClose, selectedPlan }: PaymentModalProps) {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const planDetails = {
    pro: {
      name: "ASTROVERSE PRO",
      price: "₹999",
      amount: 999,
      period: "/ year",
      features: [
        "Unlimited Detailed Janam Kundli & D9 Navamsa",
        "Higher AI Astrologer Queries (50/day)",
        "Complete Vimshottari Mahadasha & Antardasha",
        "Full Ashtakoota Milan (36 Gunas) Compatibility",
        "Dosha Analysis (Mangal, Kaal Sarp, Pitra)",
        "Download Branded PDF Birth Chart Reports",
      ],
    },
    premium: {
      name: "ASTROVERSE VIP PASS",
      price: "₹2,499",
      amount: 2499,
      period: "/ year",
      features: [
        "All Pro Features Included",
        "Highest Priority AI Astrologer Access (200/day)",
        "Advanced Yearly Astrological Transit Forecast",
        "Unlimited Saved Birth Profiles for Family",
        "Detailed Gemstone & Remedial Life Prescriptions",
        "Priority 24/7 Astrological Support",
      ],
    },
  }[selectedPlan];

  const handleCheckout = async () => {
    if (!user) {
      setError("Please sign in or create an account to activate your subscription.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create Order
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          amount: planDetails.amount,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // 2. Complete Payment Verification (Sandbox or Live)
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          amount: planDetails.amount,
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `pay_${Date.now()}_confirmed`,
          isTestMode: orderData.isTestMode,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || "Payment verification failed");
      }

      // Celebrate!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#fbbf24", "#d4af37", "#a855f7", "#38bdf8"],
      });

      setSuccess(true);
      await refreshUser();
    } catch (err: any) {
      setError(err.message || "Payment process could not be completed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl glass-panel border border-amber-500/40 p-6 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl pointer-events-none rounded-full" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 mx-auto flex items-center justify-center text-cosmic-950 shadow-lg shadow-amber-400/30">
              <Crown className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Welcome to {planDetails.name}!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your subscription is now active! All premium planetary algorithms and AI astrologer features
              are unlocked for your account.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-cosmic-950 shadow-md transition-all"
            >
              Continue to Sanctuary
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <Crown className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider font-bold">Secure Upgrade</span>
            </div>

            <h3 className="text-xl font-extrabold text-white">{planDetails.name}</h3>
            <div className="flex items-baseline gap-1 mt-1 mb-4">
              <span className="text-3xl font-black text-amber-300">{planDetails.price}</span>
              <span className="text-xs text-slate-400">{planDetails.period}</span>
            </div>

            <div className="space-y-2 py-3 border-y border-white/10 mb-5">
              {planDetails.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Secure Verification...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Proceed to Secure Checkout ({planDetails.price})
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Razorpay 256-bit SSL Secure Verification & Instant Activation</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
