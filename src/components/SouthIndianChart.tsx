"use client";

import React, { useState } from "react";
import { KundliData, ZODIAC_SIGNS } from "@/lib/astronomy/ephemeris";

interface SouthIndianChartProps {
  kundli: KundliData;
  isNavamsa?: boolean;
}

export default function SouthIndianChart({ kundli, isNavamsa = false }: SouthIndianChartProps) {
  const [selectedSign, setSelectedSign] = useState<number | null>(null);

  const lagnaSignId = isNavamsa ? kundli.navamsaChart.lagnaSignId : kundli.lagna.signId;

  // South Indian Chart: Fixed signs clockwise:
  // Row 1: Pisces (12), Aries (1), Taurus (2), Gemini (3)
  // Row 2: Aquarius (11), [Center], [Center], Cancer (4)
  // Row 3: Capricorn (10), [Center], [Center], Leo (5)
  // Row 4: Sagittarius (9), Scorpio (8), Libra (7), Virgo (6)

  const signGrid = [
    [12, 1, 2, 3],
    [11, null, null, 4],
    [10, null, null, 5],
    [9, 8, 7, 6],
  ];

  const getPlanetsInSign = (signId: number) => {
    if (isNavamsa) {
      return kundli.navamsaChart.planets.filter((p) => p.signId === signId);
    }
    return kundli.planets.filter((p) => p.signId === signId);
  };

  const planetAbbr: Record<string, string> = {
    Sun: "Su",
    Moon: "Mo",
    Mars: "Ma",
    Mercury: "Me",
    Jupiter: "Ju",
    Venus: "Ve",
    Saturn: "Sa",
    Rahu: "Ra",
    Ketu: "Ke",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[420px] aspect-square p-2 rounded-2xl glass-panel border border-amber-500/30 shadow-2xl">
        <div className="grid grid-cols-4 grid-rows-4 w-full h-full border-2 border-amber-500/80 rounded-xl overflow-hidden bg-cosmic-950">
          {signGrid.map((row, rIdx) =>
            row.map((signId, cIdx) => {
              if (signId === null) {
                // Center block
                if (rIdx === 1 && cIdx === 1) {
                  return (
                    <div
                      key={`center`}
                      className="col-span-2 row-span-2 flex flex-col items-center justify-center border border-amber-500/40 bg-cosmic-900/60 p-2 text-center"
                    >
                      <span className="text-xl text-amber-400 font-bold mb-1">ॐ</span>
                      <span className="text-xs font-semibold text-amber-200">
                        {isNavamsa ? "Navamsa (D9)" : "South Indian Janam"}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        Lagna in {ZODIAC_SIGNS[lagnaSignId - 1].name}
                      </span>
                    </div>
                  );
                }
                return null;
              }

              const sign = ZODIAC_SIGNS[signId - 1];
              const isLagna = signId === lagnaSignId;
              const planets = getPlanetsInSign(signId);
              const isSelected = selectedSign === signId;

              // Calculate relative house number from lagna
              let houseNum = signId - lagnaSignId + 1;
              if (houseNum <= 0) houseNum += 12;

              return (
                <div
                  key={signId}
                  onClick={() => setSelectedSign(isSelected ? null : signId)}
                  className={`border border-amber-500/40 p-1.5 flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected
                      ? "bg-amber-500/20"
                      : isLagna
                      ? "bg-purple-900/30"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-400">{sign.name.slice(0, 3)}</span>
                    <span className="text-amber-400/80 font-medium">H{houseNum}</span>
                  </div>

                  <div className="my-auto space-y-0.5 text-center">
                    {isLagna && (
                      <span className="inline-block px-1 py-0.2 text-[9px] font-black bg-amber-400 text-cosmic-950 rounded">
                        ASC / LAGNA
                      </span>
                    )}
                    {planets.map((p) => {
                      const abbr = planetAbbr[p.name] || p.name.slice(0, 2);
                      const isRetro = !isNavamsa && (p as any).isRetrograde;
                      return (
                        <div
                          key={p.name}
                          className={`text-[10px] font-semibold leading-tight ${
                            isRetro ? "text-rose-400" : "text-amber-200"
                          }`}
                        >
                          {abbr}{isRetro ? "(R)" : ""}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[8px] text-slate-400 text-right">
                    {sign.sanskrit.slice(0, 4)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedSign !== null && (
        <div className="mt-4 w-full max-w-[420px] p-3 rounded-xl glass-card text-xs text-slate-200 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="font-bold text-amber-300">
              {ZODIAC_SIGNS[selectedSign - 1].name} ({ZODIAC_SIGNS[selectedSign - 1].sanskrit})
            </span>
            <button
              onClick={() => setSelectedSign(null)}
              className="text-slate-400 hover:text-white text-[11px]"
            >
              Close ✕
            </button>
          </div>
          <p className="text-[11px] text-slate-300 mb-1">
            <strong>Lord:</strong> {ZODIAC_SIGNS[selectedSign - 1].ruler} |{" "}
            <strong>Element:</strong> {ZODIAC_SIGNS[selectedSign - 1].element}
          </p>
          <p className="text-[11px] text-amber-200">
            <strong>Occupants:</strong>{" "}
            {getPlanetsInSign(selectedSign).map((p) => p.name).join(", ") || "None"}
          </p>
        </div>
      )}
    </div>
  );
}
