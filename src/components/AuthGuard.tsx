"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Sparkles, UserPlus, LogIn, Compass, Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  featureName?: string;
  description?: string;
}

export default function AuthGuard({
  children,
  featureName = "this celestial feature",
  description = "Access personalized planetary readings, birth chart computations, and context-aware AI astrological guidance.",
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl text-amber-300 font-bold">ॐ</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 animate-pulse">
          Reading celestial alignments...
        </p>
      </div>
    );
  }

  if (!user) {
    const redirectUrl = encodeURIComponent(pathname);
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full p-8 rounded-3xl glass-card border border-amber-500/40 shadow-2xl text-center relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 via-amber-500 to-amber-300 p-0.5 mx-auto mb-5 shadow-xl shadow-amber-500/20">
            <div className="w-full h-full bg-cosmic-950 rounded-[14px] flex items-center justify-center">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 border border-amber-400/30 text-amber-300 inline-block mb-3">
            Member Access Required
          </span>

          <h2 className="text-2xl font-black text-white mb-2">
            Unlock {featureName}
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            {description} To give you authentic, mathematically precise Jyotish results, Astroverse personalizes every calculation to your unique birth coordinates.
          </p>

          <div className="space-y-3">
            <Link
              href={`/register?redirect=${redirectUrl}`}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account with Birth Profile</span>
            </Link>

            <Link
              href={`/login?redirect=${redirectUrl}`}
              className="w-full py-3 rounded-xl font-bold text-xs glass-panel border border-white/10 text-slate-200 hover:text-white hover:border-amber-400/40 flex items-center justify-center gap-2 transition-all hover:bg-white/5"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>Sign In with Existing Account</span>
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant birth chart generation upon sign up</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
