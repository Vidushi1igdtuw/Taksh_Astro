"use client";

import React, { useState } from "react";
import { ZODIAC_SIGNS, NAKSHATRAS } from "@/lib/astronomy/ephemeris";
import {
  BookOpen,
  Sparkles,
  Compass,
  Star,
  Search,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"signs" | "planets" | "houses" | "nakshatras" | "yogas">("signs");
  const [searchQuery, setSearchQuery] = useState("");

  const NAVAGRAHAS = [
    { name: "Surya (Sun)", sanskrit: "सूर्य", nature: "Royal Atmakaraka", domain: "Soul, Vitality, Father, Leadership, Authority", gem: "Ruby (Manikya)", mantra: "Om Suryaya Namaha" },
    { name: "Chandra (Moon)", sanskrit: "चन्द्र", nature: "Gentle Manaskaraka", domain: "Mind, Emotions, Mother, Memory, Intuition", gem: "Natural Pearl (Moti)", mantra: "Om Somaya Namaha" },
    { name: "Mangala (Mars)", sanskrit: "मंगल", nature: "Fiery Bhratrikaraka", domain: "Courage, Energy, Land, Ambition, Engineering", gem: "Red Coral (Moonga)", mantra: "Om Angarakaya Namaha" },
    { name: "Budha (Mercury)", sanskrit: "बुध", nature: "Intellectual Vidyakaraka", domain: "Speech, Commerce, Wit, Analytics, Mathematics", gem: "Emerald (Panna)", mantra: "Om Budhaya Namaha" },
    { name: "Guru (Jupiter)", sanskrit: "बृहस्पति", nature: "Divine Jivakaraka", domain: "Wisdom, Dharma, Children, Wealth, Spirituality", gem: "Yellow Sapphire (Pukhraj)", mantra: "Om Brihaspataye Namaha" },
    { name: "Shukra (Venus)", sanskrit: "शुक्र", nature: "Refined Kalatrakaraka", domain: "Love, Arts, Vehicles, Marital Joy, Diplomacy", gem: "White Diamond / Opal", mantra: "Om Shukraya Namaha" },
    { name: "Shani (Saturn)", sanskrit: "शनि", nature: "Karmic Ayushkaraka", domain: "Discipline, Longevity, Humility, Endurance, Justice", gem: "Blue Sapphire (Neelam)", mantra: "Om Sham Shanicharaya Namaha" },
    { name: "Rahu (North Node)", sanskrit: "राहु", nature: "Shadow Evolutionary Node", domain: "Ambition, Unconventional Ideas, Technology, Worldly Illusion", gem: "Hessonite (Gomed)", mantra: "Om Rahave Namaha" },
    { name: "Ketu (South Node)", sanskrit: "केतु", nature: "Shadow Mokshakaraka", domain: "Liberation, Detachment, Occult Insight, Spiritual Renunciation", gem: "Cat's Eye (Lehsuniya)", mantra: "Om Ketave Namaha" },
  ];

  const BHAVAS = [
    { num: 1, name: "Tanu Bhava (1st House)", theme: "Self, Physical Body & Vitality", desc: "Complexion, temperament, early environment, constitution, and general worldview." },
    { num: 2, name: "Dhana Bhava (2nd House)", theme: "Wealth, Speech & Family", desc: "Accumulated wealth, oral expression, food habits, eyesight, and ancestral lineage." },
    { num: 3, name: "Sahaja Bhava (3rd House)", theme: "Siblings, Courage & Initiative", desc: "Valor, younger siblings, short journeys, writing, communication, and manual skills." },
    { num: 4, name: "Sukha Bhava (4th House)", theme: "Mother, Vehicles & Peace", desc: "Emotional tranquility, real estate, vehicles, education, and domestic environment." },
    { num: 5, name: "Putra Bhava (5th House)", theme: "Intellect, Romance & Purva Punya", desc: "Children, past-life merits, creative intuition, romance, and speculative wisdom." },
    { num: 6, name: "Ari Bhava (6th House)", theme: "Health, Enemies & Service", desc: "Immunity, overcoming challenges, daily employment, debts, and competitive grit." },
    { num: 7, name: "Kalatra Bhava (7th House)", theme: "Partnership & Marriage", desc: "Spouse, business contracts, long-term companions, public relations, and legal unions." },
    { num: 8, name: "Ayur Bhava (8th House)", theme: "Longevity, Mystery & Transformation", desc: "Occult knowledge, unexpected inheritances, research depth, and profound rejuvenation." },
    { num: 9, name: "Dharma Bhava (9th House)", theme: "Fortune, Philosophy & Higher Wisdom", desc: "Father, spiritual mentors (Gurus), pilgrimages, righteous principles, and good fortune." },
    { num: 10, name: "Karma Bhava (10th House)", theme: "Career, Status & Public Action", desc: "Profession, executive leadership, reputation, social achievements, and community rank." },
    { num: 11, name: "Labha Bhava (11th House)", theme: "Gains, Aspirations & Social Circles", desc: "Income streams, realization of dreams, elder siblings, and influential friendships." },
    { num: 12, name: "Vyaya Bhava (12th House)", theme: "Moksha, Foreign Lands & Liberation", desc: "Spiritual liberation, meditation, sleep dreams, foreign travels, and surrender of ego." },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Vedic Jyotish Academy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          Astrology Learning Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Explore the timeless architecture of Vedic Jyotish: 12 Rashis, 9 Navagrahas, 12 Bhavas, and 27 Nakshatras.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto p-1 max-w-3xl mx-auto rounded-2xl glass-panel border border-white/10 text-xs">
        {[
          { id: "signs", label: "12 Zodiac Signs" },
          { id: "planets", label: "9 Navagrahas" },
          { id: "houses", label: "12 Bhavas (Houses)" },
          { id: "nakshatras", label: "27 Nakshatras" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-amber-400 text-cosmic-950 shadow-md shadow-amber-500/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Panels */}
      <div className="max-w-6xl mx-auto">
        {activeTab === "signs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ZODIAC_SIGNS.map((s) => (
              <div key={s.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-amber-400">{s.symbol}</span>
                    <h3 className="text-base font-bold text-white">
                      {s.name} ({s.sanskrit})
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-amber-300 border border-white/10">
                    Sign #{s.id}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Lord: <strong className="text-slate-200">{s.ruler}</strong></span>
                  <span>•</span>
                  <span>Element: <strong className="text-amber-300">{s.element}</strong></span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Natural archetype in Vedic astrology signifying core soul tendencies, bodily expression, and elemental temperament.
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "planets" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAVAGRAHAS.map((p) => (
              <div key={p.name} className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <span className="text-xs text-amber-400 font-bold">{p.sanskrit}</span>
                </div>
                <span className="text-[11px] font-semibold text-purple-300 block">{p.nature}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{p.domain}</p>
                <div className="pt-2 border-t border-white/5 text-[11px] space-y-1">
                  <div className="text-slate-400">
                    Gemstone: <strong className="text-slate-200">{p.gem}</strong>
                  </div>
                  <div className="text-amber-300/90 font-mono text-[10px]">{p.mantra}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "houses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BHAVAS.map((h) => (
              <div key={h.num} className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase">House {h.num}</span>
                <h3 className="text-sm font-bold text-white">{h.name}</h3>
                <span className="text-xs font-semibold text-purple-300 block">{h.theme}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "nakshatras" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAKSHATRAS.map((nak) => (
              <div key={nak.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    #{nak.id} {nak.name}
                  </h3>
                  <span className="text-[10px] font-bold text-amber-400">{nak.gana} Gana</span>
                </div>
                <p className="text-xs text-slate-300">
                  Ruler: <strong>{nak.ruler}</strong> • Deity: <strong>{nak.deity}</strong>
                </p>
                <div className="text-[11px] text-slate-400">
                  Symbol: {nak.symbol} • Animal Yoni: {nak.yoni}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
