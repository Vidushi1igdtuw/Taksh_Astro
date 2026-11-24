"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  Compass,
  MessageSquare,
  Heart,
  Calendar,
  ShieldAlert,
  Clock,
  BookOpen,
  Award,
  LogOut,
  Menu,
  X,
  Crown,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(e.target as Node)
      ) {
        setToolsDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Specialized Vedic Tools grouped into luxury mega-dropdown
  const vedicTools = [
    {
      name: "Kundli Milan (Compatibility)",
      href: "/compatibility",
      icon: Heart,
      desc: "36 Gunas Ashtakoota Milan & Mangal Dosha match",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
    {
      name: "Dasha & Planetary Transits",
      href: "/dasha-transits",
      icon: Clock,
      desc: "120-Year Vimshottari Mahadasha & live Gochar",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      name: "Dosha Analysis & Remedies",
      href: "/doshas",
      icon: ShieldAlert,
      desc: "Mangal, Kaal Sarp, Pitra Doshas & cancellations",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Daily Panchang & Muhurat",
      href: "/panchang",
      icon: Calendar,
      desc: "Tithi, Nakshatra, Yoga, Karana & auspicious timings",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Numerology Calculator",
      href: "/numerology",
      icon: Award,
      desc: "Life Path, Destiny & Soul Urge vibration numbers",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  const isVedicToolsActive = vedicTools.some((t) => pathname === t.href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-cosmic-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <div className="w-full h-full bg-cosmic-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-lg md:text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-100 to-purple-200">
                ASTROVERSE
              </span>
              <span className="hidden sm:block text-[8px] md:text-[9px] uppercase tracking-widest text-amber-400/80 font-medium">
                Vedic AI Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Clean, Uncluttered Executive Layout */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {user ? (
              <>
                {/* 1. Kundli */}
                <Link
                  href="/kundli"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/kundli"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Janam Kundli</span>
                </Link>

                {/* 2. AI Astrologer */}
                <Link
                  href="/ai-astrologer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/ai-astrologer"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  <span>AI Astrologer</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-xs">
                    AI
                  </span>
                </Link>

                {/* 3. Horoscope */}
                <Link
                  href="/horoscope"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/horoscope"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Horoscope</span>
                </Link>

                {/* 4. Vedic Tools Dropdown (Organized Mega-menu) */}
                <div
                  ref={toolsDropdownRef}
                  className="relative"
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >
                  <button
                    onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isVedicToolsActive || toolsDropdownOpen
                        ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>Vedic Tools</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        toolsDropdownOpen ? "rotate-180 text-amber-400" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {toolsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 rounded-2xl glass-panel p-2 shadow-2xl border border-amber-500/25 z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Vedic Astrological Modules
                        </span>
                      </div>
                      <div className="space-y-1">
                        {vedicTools.map((tool) => {
                          const Icon = tool.icon;
                          const isCurrent = pathname === tool.href;
                          return (
                            <Link
                              key={tool.name}
                              href={tool.href}
                              onClick={() => setToolsDropdownOpen(false)}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                                isCurrent
                                  ? "bg-amber-400/15 border border-amber-400/30 text-white"
                                  : "hover:bg-white/5 text-slate-300 hover:text-white"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${tool.color}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-bold block text-white truncate">
                                  {tool.name}
                                </span>
                                <span className="text-[10px] text-slate-400 block line-clamp-1">
                                  {tool.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Learn */}
                <Link
                  href="/learn"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/learn"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Learn</span>
                </Link>

                {/* 6. Pricing */}
                <Link
                  href="/pricing"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/pricing"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pricing</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/learn"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/learn"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Astrology Academy
                </Link>
                <Link
                  href="/pricing"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pathname === "/pricing"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Pricing Plans
                </Link>
              </>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                {/* Quick Dashboard Link */}
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    pathname === "/dashboard"
                      ? "bg-amber-400/15 border-amber-400/40 text-amber-300"
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dashboard</span>
                </Link>

                {/* User Profile Dropdown */}
                <div ref={userDropdownRef} className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-amber-400/30 bg-cosmic-900/60 hover:bg-cosmic-800 transition-all text-xs text-slate-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white uppercase shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-semibold max-w-[100px] truncate">{user.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wide ${
                        user.tier === "premium"
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                          : user.tier === "pro"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                          : "bg-slate-700/40 text-slate-400"
                      }`}
                    >
                      {user.tier}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl glass-panel p-2 shadow-2xl border border-amber-500/20 z-50 animate-in fade-in zoom-in-95 backdrop-blur-2xl">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-400" />
                        <span>My Sanctuary</span>
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-purple-300 hover:text-white hover:bg-purple-500/20 transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4 text-purple-400" />
                          <span>Admin Control</span>
                        </Link>
                      )}

                      <Link
                        href="/pricing"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-300 hover:text-white hover:bg-amber-500/10 transition-colors"
                      >
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span>Upgrade / Manage Tier</span>
                      </Link>

                      <div className="pt-1 border-t border-white/10 mt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-300 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-rose-400" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-cosmic-950/95 backdrop-blur-2xl px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto">
          {user ? (
            <>
              {/* Primary Mobile Links */}
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    pathname === "/dashboard"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-400" />
                  <span>My Sanctuary Dashboard</span>
                </Link>

                <Link
                  href="/kundli"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    pathname === "/kundli"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Janam Kundli Chart</span>
                </Link>

                <Link
                  href="/ai-astrologer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    pathname === "/ai-astrologer"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-purple-400" />
                    <span>AI Astrologer</span>
                  </div>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-500 text-white rounded-full">
                    AI
                  </span>
                </Link>

                <Link
                  href="/horoscope"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    pathname === "/horoscope"
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Horoscope Predictions</span>
                </Link>
              </div>

              {/* Grouped Vedic Tools */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider px-3 block mb-1">
                  Vedic Astrological Tools
                </span>
                <div className="space-y-1">
                  {vedicTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                          pathname === tool.href
                            ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                            : "text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{tool.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Learn & Pricing */}
              <div className="pt-2 border-t border-white/10 space-y-1">
                <Link
                  href="/learn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Astrology Academy</span>
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/5"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pricing & Membership</span>
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-purple-300 bg-purple-500/10"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                    <span>Admin Control Panel</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Log Out ({user.name})</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm text-slate-200"
              >
                Home
              </Link>
              <Link
                href="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm text-slate-200"
              >
                Astrology Academy
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm text-slate-200"
              >
                Pricing Plans
              </Link>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-xs font-semibold border border-white/10 text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-cosmic-950"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}