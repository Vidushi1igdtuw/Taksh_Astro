import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Compass, ShieldCheck, Mail, Globe, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-cosmic-950/90 text-slate-300 pt-16 pb-12 overflow-hidden z-10">
      {/* Subtle Cosmic background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-amber-500 to-amber-300 p-0.5">
                <div className="w-full h-full bg-cosmic-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-100 to-purple-200">
                ASTROVERSE
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier platform harmonizing ancient Vedic Jyotish wisdom with modern artificial intelligence.
              Explore planetary ephemeris, authentic Kundli calculations, personalized transits, and AI guidance.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-amber-400/90">
                <ShieldCheck className="w-4 h-4" />
                Lahiri Ayanamsa Ephemeris Engine
              </span>
            </div>
          </div>

          {/* Quick Astrology Tools */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
              Astrology Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/kundli" className="hover:text-amber-300 transition-colors">
                  Janam Kundli Generator
                </Link>
              </li>
              <li>
                <Link href="/ai-astrologer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  AI Astrologer Chatbot
                  <span className="text-[9px] px-1 bg-purple-500 text-white rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/horoscope" className="hover:text-amber-300 transition-colors">
                  Personalized Horoscopes
                </Link>
              </li>
              <li>
                <Link href="/compatibility" className="hover:text-amber-300 transition-colors">
                  Kundli Milan (36 Gunas)
                </Link>
              </li>
              <li>
                <Link href="/doshas" className="hover:text-amber-300 transition-colors">
                  Dosha Analysis & Remedies
                </Link>
              </li>
              <li>
                <Link href="/dasha-transits" className="hover:text-amber-300 transition-colors">
                  Vimshottari Dasha & Gochar
                </Link>
              </li>
            </ul>
          </div>

          {/* Almanacs & Wisdom */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
              Vedic Wisdom
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/panchang" className="hover:text-amber-300 transition-colors">
                  Daily Hindu Panchang
                </Link>
              </li>
              <li>
                <Link href="/numerology" className="hover:text-amber-300 transition-colors">
                  Vedic Numerology Profile
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-300 transition-colors">
                  Learning Center & Academy
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-amber-300 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-300 transition-colors">
                  Saved Charts & Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Planetary Philosophy & Contact */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
              Connect & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>support@astroverse.io</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Global Sidereal Coordinates</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Kashi & Global Digital Sanctuary</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-cosmic-900/60 border border-amber-500/20 text-[11px] text-amber-200/80">
              ✨ Traditional Vedic algorithms powered by precise astronomical ephemeris models.
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ASTROVERSE Technologies Inc. All rights reserved.</p>
          <p className="text-[11px] text-slate-400 max-w-lg text-center md:text-right">
            Astrological consultations and algorithmic calculations are intended for spiritual guidance, personal growth,
            and philosophical enrichment.
          </p>
        </div>
      </div>
    </footer>
  );
}
