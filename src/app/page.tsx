"use client";

import React, { useState } from "react";
import Link from "next/link";
import ZodiacWheel from "@/components/ZodiacWheel";
import PaymentModal from "@/components/PaymentModal";
import { ZODIAC_SIGNS } from "@/lib/astronomy/ephemeris";
import {
  Sparkles,
  Compass,
  MessageSquare,
  Heart,
  Clock,
  ShieldAlert,
  Calendar,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Star,
  Users,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [selectedHoroscopeSign, setSelectedHoroscopeSign] = useState(ZODIAC_SIGNS[0]);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "premium">("pro");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    {
      title: "Janam Kundli Generator",
      desc: "Astronomical ephemeris calculations for all 9 Grahas, Ascendant, 12 Bhavas, and D9 Navamsa in North and South Indian styles.",
      icon: Compass,
      href: "/kundli",
      badge: "Lahiri Sidereal",
    },
    {
      title: "Conversational AI Astrologer",
      desc: "Ask deep questions about career timing, marriage, Dasha cycles, and remedies with personalized context derived from your chart.",
      icon: MessageSquare,
      href: "/ai-astrologer",
      badge: "AI Powered",
    },
    {
      title: "Ashtakoota Kundli Milan",
      desc: "Complete 36 Guna relationship compatibility test covering Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.",
      icon: Heart,
      href: "/compatibility",
      badge: "36 Gunas",
    },
    {
      title: "Vimshottari Dasha & Gochar",
      desc: "Explore your 120-year Mahadasha, Antardasha, and live planetary sky transits with accurate Sade Sati and Dhaiya timelines.",
      icon: Clock,
      href: "/dasha-transits",
      badge: "120-Year Timeline",
    },
    {
      title: "Vedic Doshas & Remedies",
      desc: "Automated analysis of Mangal Dosha (with classical cancellations), Kaal Sarp types, and Pitra Dosha with non-fatalistic remedies.",
      icon: ShieldAlert,
      href: "/doshas",
      badge: "Classical Pacifications",
    },
    {
      title: "Daily Hindu Panchang",
      desc: "Tithi, Vara, Nakshatra, Yoga, Karana, Rahu Kaal, Yamaganda, and auspicious Abhijit Muhurat tailored to your exact coordinates.",
      icon: Calendar,
      href: "/panchang",
      badge: "City Specific",
    },
    {
      title: "Vedic Numerology",
      desc: "Decode your Life Path, Destiny/Expression, Soul Urge, and Personal Year numbers with profound esoteric interpretations.",
      icon: Award,
      href: "/numerology",
      badge: "Pythagorean & Chaldean",
    },
    {
      title: "Astrology Learning Academy",
      desc: "Comprehensive educational library exploring 12 Rashis, 9 Navagrahas, 27 Nakshatras, and major auspicious Raja Yogas.",
      icon: BookOpen,
      href: "/learn",
      badge: "Knowledge Base",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Enter Exact Birth Coordinates",
      desc: "Input your birth date, exact time, and birthplace. Our system automatically maps your precise geographic latitude, longitude, and timezone.",
    },
    {
      number: "02",
      title: "Ephemeris Astronomical Calculation",
      desc: "Our engine executes Jean Meeus and Lahiri Chitrapaksha algorithms to determine the exact planetary longitudes without random simulations.",
    },
    {
      number: "03",
      title: "Synthesis & AI Consultation",
      desc: "Explore your interactive North or South Indian Janam Kundli, check Dasha timelines, or speak directly to the AI Vedic Astrologer.",
    },
    {
      number: "04",
      title: "Actionable Life Guidance & PDF",
      desc: "Download high-resolution Kundli reports, receive gemstone prescriptions, auspicious muhurats, and non-alarmist remedies.",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Rohini Deshmukh",
      role: "Vedic Scholar & Professor",
      avatar: "RD",
      rating: 5,
      content:
        "The planetary degrees and Lahiri Ayanamsa calculations match the official Indian Ephemeris down to the exact arcminute. Finally, a platform that respects real Jyotish science!",
    },
    {
      name: "Siddharth Varma",
      role: "Tech Entrepreneur, Bengaluru",
      avatar: "SV",
      rating: 5,
      content:
        "The AI Astrologer is mindblowing. It referenced my 10th house Sun and Jupiter aspect accurately without making up generic advice. It feels like consulting a revered guru.",
    },
    {
      name: "Ananya Mukherjee",
      role: "Product Designer, Toronto",
      avatar: "AM",
      rating: 5,
      content:
        "The celestial aesthetic is breathtaking. Navigating between North Indian and South Indian chart styles, Ashtakoota Milan, and Dasha cycles is seamless and luxurious.",
    },
  ];

  const faqs = [
    {
      q: "How accurate are the planetary and Kundli calculations on Astroverse?",
      a: "Astroverse uses high-precision astronomical algorithms (based on planetary ephemeris tables and the official Lahiri Chitrapaksha Ayanamsa). We compute exact geocentric longitudes for all Grahas, calculate the Ascendant (Lagna) from Local Sidereal Time and latitude, and derive Bhavas, Nakshatras, and Navamsa charts mathematically with zero randomization.",
    },
    {
      q: "How does the AI Astrologer work?",
      a: "Unlike generic chatbots, Astroverse AI receives your actual birth chart data—including your Lagna, Moon sign, planetary degrees, house lords, active Vimshottari Mahadasha, and detected yogas—into its reasoning context. This guarantees every consultation is personalized to your unique horoscope.",
    },
    {
      q: "What is the difference between North Indian and South Indian chart styles?",
      a: "In the North Indian diamond chart, the houses (Bhavas) remain fixed in position with House 1 at the top, while the zodiac sign numbers change based on your Lagna. In the South Indian square chart, the zodiac signs remain fixed clockwise from Pisces to Aquarius, while the Ascendant marker (Lagna) shifts.",
    },
    {
      q: "What is Ashtakoota Milan for marriage compatibility?",
      a: "Ashtakoota Milan is the classical Vedic 36-point matching system examining eight essential compatibility dimensions: Varna (ego), Vashya (mutual attraction), Tara (wellbeing), Yoni (biology/intimacy), Graha Maitri (friendship), Gana (temperament), Bhakoot (emotional prosperity), and Nadi (genetic health).",
    },
    {
      q: "Can I download my Janam Kundli as a PDF?",
      a: "Yes! You can instantly generate and download an elegant, branded Astroverse Kundli PDF report featuring your planetary table, house lords, and detected Vedic yogas with one click.",
    },
  ];

  const handleOpenPricing = (plan: "pro" | "premium") => {
    setSelectedPlan(plan);
    setPricingModalOpen(true);
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-purple-700/20 via-amber-500/15 to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-cosmic-900/60 backdrop-blur-md text-amber-300 text-xs font-semibold mb-6 animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sacred Vedic Jyotish Harmonized with Intelligent AI</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            Discover What the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-100 to-purple-300">
              Universe Has Written
            </span>{" "}
            for You.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Explore authentic Vedic birth charts, high-precision planetary ephemeris, personalized 
            predictions, 36-point marital compatibility, and AI astrological wisdom.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/kundli"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Get Your Janam Kundli</span>
            </Link>

            <Link
              href="/ai-astrologer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold glass-panel border border-purple-400/40 text-purple-200 hover:text-white hover:border-purple-300 shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Consult AI Astrologer</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-xs text-slate-300">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Lahiri Sidereal Ephemeris</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant D9 Navamsa</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>36 Guna Milan</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Context-Aware AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CELESTIAL ZODIAC WHEEL SECTION */}
      <section className="py-16 bg-cosmic-900/40 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Celestial Wheel</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            The 12 Vedic Rashis of the Zodiac
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6">
            Rotate through the solar archetypes to reveal their classical rulers, elements, and spiritual signatures.
          </p>

          <ZodiacWheel />
        </div>
      </section>

      {/* 3. DAILY HOROSCOPE PREVIEW */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Today&apos;s Cosmic Weather</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Daily Vedic Horoscope Preview
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select your Sun or Moon sign to glimpse today&apos;s celestial opportunities.
            </p>
          </div>

          {/* Sign Selector Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {ZODIAC_SIGNS.map((sign) => {
              const isSelected = selectedHoroscopeSign.id === sign.id;
              return (
                <button
                  key={sign.id}
                  onClick={() => setSelectedHoroscopeSign(sign)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-amber-400 text-cosmic-950 font-bold shadow-md shadow-amber-500/20 scale-105"
                      : "glass-panel text-slate-300 hover:text-white hover:border-amber-400/40"
                  }`}
                >
                  <span>{sign.symbol}</span>
                  <span>{sign.name}</span>
                </button>
              );
            })}
          </div>

          {/* Horoscope Spotlight Card */}
          <div className="max-w-3xl mx-auto rounded-2xl glass-card border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  {selectedHoroscopeSign.symbol}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedHoroscopeSign.name} ({selectedHoroscopeSign.sanskrit})
                  </h3>
                  <span className="text-xs text-amber-400/90 font-medium">
                    Governed by {selectedHoroscopeSign.ruler} • {selectedHoroscopeSign.element} Element
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Cosmic Harmony:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                  92% Favorable
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
              <p>
                Under today&apos;s transit of {selectedHoroscopeSign.ruler}, your trine houses receive auspicious
                cosmic energy. Communication flows with clarity and emotional sincerity, opening rewarding
                pathways in both collaborative projects and intimate conversations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-cosmic-900/60 border border-white/5">
                  <span className="text-[11px] font-bold text-amber-300 block mb-1">
                    💼 Career & Ambition
                  </span>
                  <span className="text-xs text-slate-300">
                    Excellent window for presenting proposals and organizing complex tasks.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-900/60 border border-white/5">
                  <span className="text-[11px] font-bold text-rose-300 block mb-1">
                    ❤️ Love & Relationships
                  </span>
                  <span className="text-xs text-slate-300">
                    Patience and heartfelt listening melt lingering hesitation.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-4 text-slate-300">
                <span>
                  <strong className="text-amber-400">Lucky Numbers:</strong> 3, 7, 21
                </span>
                <span>
                  <strong className="text-amber-400">Lucky Color:</strong> Amber Saffron
                </span>
              </div>
              <Link
                href={`/horoscope?sign=${selectedHoroscopeSign.name}`}
                className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 group"
              >
                <span>Read Full Weekly & Monthly Forecast</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE FEATURES GRID */}
      <section className="py-20 bg-cosmic-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Full Vedic Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Authentic Jyotish Tools Reimagined
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From mathematical ephemeris calculations to conversational AI guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={feat.title}
                  href={feat.href}
                  className="rounded-2xl glass-card p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-cosmic-950 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                        {feat.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                    <span>Explore Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              How Astroverse Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Rigorous astronomical computation meets thoughtful spiritual discernment in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((st) => (
              <div
                key={st.number}
                className="p-6 rounded-2xl glass-panel border border-white/10 relative overflow-hidden"
              >
                <span className="text-3xl font-black text-amber-400/30 block mb-2">
                  {st.number}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. USER TESTIMONIALS */}
      <section className="py-20 bg-cosmic-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Trusted by Seekers Worldwide
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Read how Vedic scholars, founders, and seekers explore their cosmic journey with Astroverse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl glass-card border border-amber-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <span className="text-[10px] text-slate-400">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRICING PLANS */}
      <section className="py-20" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Transparent Memberships</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Choose Your Cosmic Path
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Start free forever or unlock limitless AI consultations, deep Dasha breakdowns, and downloadable PDF reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Free Tier */}
            <div className="rounded-2xl glass-panel p-8 flex flex-col justify-between border border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Seeker (Free)</h3>
                <p className="text-xs text-slate-400 mb-4">Essential birth chart exploration</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white">₹0</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Basic Janam Kundli & Planetary Positions</span>
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

              <Link
                href="/kundli"
                className="w-full py-2.5 rounded-xl text-center text-xs font-semibold border border-white/20 text-slate-200 hover:bg-white/5 transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier (Popular) */}
            <div className="rounded-2xl glass-card p-8 flex flex-col justify-between border-2 border-amber-400/80 shadow-2xl relative">
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
                onClick={() => handleOpenPricing("pro")}
                className="w-full py-3 rounded-xl text-center text-xs font-bold bg-amber-400 hover:bg-amber-300 text-cosmic-950 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
              >
                Upgrade to Pro
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
                onClick={() => handleOpenPricing("premium")}
                className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-md shadow-purple-500/20 transition-all hover:scale-105"
              >
                Unlock VIP Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-20 bg-cosmic-900/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear answers regarding Vedic principles, calculations, and AI features.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl glass-panel border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-100 hover:text-amber-300"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-white/5 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 rounded-3xl glass-card border border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Begin Your Cosmic Journey Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
              Generate your authentic Vedic birth chart in seconds, explore your soul purpose, and gain clarity with Astroverse.
            </p>

            <Link
              href="/kundli"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Create Your Free Kundli Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Upgrade Modal */}
      <PaymentModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
