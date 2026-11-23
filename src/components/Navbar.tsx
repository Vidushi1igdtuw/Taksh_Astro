"use client";

import React, { useState } from "react";
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
  Lock,
} from "lucide-react";

interface NavLinkItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // When logged out, only Landing, Learn, and Pricing are public
  const publicLinks: NavLinkItem[] = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Pricing", href: "/pricing", icon: Crown },
  ];

  // When logged in, all astrological features are active
  const authenticatedLinks: NavLinkItem[] = [
    { name: "Kundli", href: "/kundli", icon: Compass },
    { name: "Horoscope", href: "/horoscope", icon: Sparkles },
    { name: "AI Astrologer", href: "/ai-astrologer", icon: MessageSquare, badge: "AI" },
    { name: "Compatibility", href: "/compatibility", icon: Heart },
    { name: "Doshas", href: "/doshas", icon: ShieldAlert },
    { name: "Dasha & Transits", href: "/dasha-transits", icon: Clock },
    { name: "Panchang", href: "/panchang", icon: Calendar },
    { name: "Numerology", href: "/numerology", icon: Award },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Pricing", href: "/pricing", icon: Crown },
  ];

  const activeLinks = user ? authenticatedLinks : publicLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-cosmic-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <div className="w-full h-full bg-cosmic-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-100 to-purple-200">
                ASTROVERSE
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-amber-400/80 font-medium">
                Vedic AI Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {activeLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-sm shadow-amber-400/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1 py-0.2 text-[9px] font-bold bg-purple-500 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-400/30 bg-cosmic-900/60 hover:bg-cosmic-800 transition-all text-xs text-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium max-w-[100px] truncate">{user.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                      user.tier === "premium"
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                        : user.tier === "pro"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                        : "bg-slate-700/40 text-slate-400"
                    }`}
                  >
                    {user.tier}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-48 rounded-xl glass-panel p-2 shadow-2xl border border-amber-500/20 z-50 animate-in fade-in zoom-in-95"
                  >
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-400" />
                      <span>User Dashboard</span>
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-purple-300 hover:text-white hover:bg-purple-500/20 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-purple-400" />
                        <span>Admin Panel</span>
                      </Link>
                    )}

                    <Link
                      href="/pricing"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-300 hover:text-white hover:bg-amber-500/10 transition-colors"
                    >
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span>Manage Tier</span>
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-300 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 xl:hidden">
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
        <div className="xl:hidden border-t border-white/10 bg-cosmic-950/95 backdrop-blur-2xl px-4 py-4 space-y-2">
          {activeLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "text-amber-300 bg-amber-400/10 border border-amber-400/30"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-500 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10 space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 bg-white/5"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-400" />
                  <span>Dashboard ({user.name})</span>
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-purple-300 bg-purple-500/10"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    <span>Admin Control Panel</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-300 hover:bg-rose-500/10"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg text-sm font-medium border border-white/10 text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg text-sm font-semibold bg-amber-400 text-cosmic-950 shadow-md shadow-amber-500/20"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
