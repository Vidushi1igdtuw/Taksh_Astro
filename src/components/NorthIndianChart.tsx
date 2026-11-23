"use client";

import React, { useState } from "react";
import { KundliData } from "@/lib/astronomy/ephemeris";

interface NorthIndianChartProps {
  kundli: KundliData;
  isNavamsa?: boolean;
}

export default function NorthIndianChart({ kundli, isNavamsa = false }: NorthIndianChartProps) {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  const lagnaSignId = isNavamsa ? kundli.navamsaChart.lagnaSignId : kundli.lagna.signId;

  // Sign number for each house (1 to 12)
  const getHouseSignNumber = (houseNum: number) => {
    return ((lagnaSignId - 1 + (houseNum - 1)) % 12) + 1;
  };

  // Get planets in a given house
  const getPlanetsInHouse = (houseNum: number) => {
    if (isNavamsa) {
      return kundli.navamsaChart.planets.filter((p) => p.house === houseNum);
    }
    return kundli.planets.filter((p) => p.house === houseNum);
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

  // North Indian Chart House Coordinates & Paths in a 400x400 viewBox
  // 1: Center-top diamond (Ascendant)
  // 2: Top-left triangle
  // 3: Far-left top triangle
  // 4: Center-left diamond
  // 5: Far-left bottom triangle
  // 6: Bottom-left triangle
  // 7: Center-bottom diamond
  // 8: Bottom-right triangle
  // 9: Far-right bottom triangle
  // 10: Center-right diamond
  // 11: Far-right top triangle
  // 12: Top-right triangle

  const housePaths = [
    { num: 1, path: "M 200,0 L 300,100 L 200,200 L 100,100 Z", textX: 200, textY: 95 },
    { num: 2, path: "M 100,100 L 200,0 L 0,0 Z", textX: 105, textY: 45 },
    { num: 3, path: "M 0,0 L 100,100 L 0,200 Z", textX: 45, textY: 105 },
    { num: 4, path: "M 0,200 L 100,100 L 200,200 L 100,300 Z", textX: 95, textY: 200 },
    { num: 5, path: "M 0,200 L 100,300 L 0,400 Z", textX: 45, textY: 295 },
    { num: 6, path: "M 0,400 L 100,300 L 200,400 Z", textX: 105, textY: 355 },
    { num: 7, path: "M 200,400 L 100,300 L 200,200 L 300,300 Z", textX: 200, textY: 305 },
    { num: 8, path: "M 200,400 L 300,300 L 400,400 Z", textX: 295, textY: 355 },
    { num: 9, path: "M 300,300 L 400,400 L 400,200 Z", textX: 355, textY: 295 },
    { num: 10, path: "M 200,200 L 300,100 L 400,200 L 300,300 Z", textX: 305, textY: 200 },
    { num: 11, path: "M 300,100 L 400,0 L 400,200 Z", textX: 355, textY: 105 },
    { num: 12, path: "M 200,0 L 400,0 L 300,100 Z", textX: 295, textY: 45 },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[420px] aspect-square p-2 rounded-2xl glass-panel border border-amber-500/30 shadow-2xl">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full select-none cursor-pointer"
        >
          {/* Outer Boundary */}
          <rect
            x="0"
            y="0"
            width="400"
            height="400"
            fill="#090d24"
            stroke="#d4af37"
            strokeWidth="2.5"
            rx="8"
          />

          {/* House Polygons */}
          {housePaths.map((h) => {
            const isHovered = selectedHouse === h.num;
            const signNumber = getHouseSignNumber(h.num);
            const planets = getPlanetsInHouse(h.num);

            return (
              <g
                key={h.num}
                onClick={() => setSelectedHouse(selectedHouse === h.num ? null : h.num)}
                className="transition-all"
              >
                <path
                  d={h.path}
                  fill={isHovered ? "rgba(212, 175, 55, 0.22)" : "rgba(18, 27, 71, 0.55)"}
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  className="hover:fill-amber-500/20 transition-colors"
                />

                {/* Sign Number Indicator */}
                <text
                  x={h.textX}
                  y={h.textY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#94a3b8"
                  className="pointer-events-none"
                >
                  {signNumber}
                </text>

                {/* Planets In House */}
                <g className="pointer-events-none">
                  {planets.map((p, pIdx) => {
                    const offset = (pIdx - (planets.length - 1) / 2) * 13;
                    const abbr = planetAbbr[p.name] || p.name.slice(0, 2);
                    const isRetro = !isNavamsa && (p as any).isRetrograde;
                    const deg = !isNavamsa && (p as any).degreeInSign !== undefined
                      ? `${Math.floor((p as any).degreeInSign)}°`
                      : "";

                    return (
                      <text
                        key={p.name}
                        x={h.textX}
                        y={h.textY + 16 + offset}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="10"
                        fontWeight="600"
                        fill={isRetro ? "#f87171" : "#fef08a"}
                      >
                        {abbr}{isRetro ? "(R)" : ""} {deg}
                      </text>
                    );
                  })}
                </g>
              </g>
            );
          })}

          {/* Center Sacred Symbol */}
          <circle cx="200" cy="200" r="14" fill="#090d24" stroke="#d4af37" strokeWidth="1" />
          <text
            x="200"
            y="201"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fill="#d4af37"
            fontWeight="bold"
          >
            ॐ
          </text>
        </svg>
      </div>

      {/* Selected House Details Drawer / Card */}
      {selectedHouse !== null && (
        <div className="mt-4 w-full max-w-[420px] p-3 rounded-xl glass-card text-xs text-slate-200 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="font-bold text-amber-300">
              House {selectedHouse} ({kundli.houses[selectedHouse - 1]?.signName})
            </span>
            <button
              onClick={() => setSelectedHouse(null)}
              className="text-slate-400 hover:text-white text-[11px]"
            >
              Close ✕
            </button>
          </div>
          <p className="text-[11px] text-slate-300 mb-1">
            <strong>Lord:</strong> {kundli.houses[selectedHouse - 1]?.signLord}
          </p>
          <p className="text-[11px] text-slate-400 mb-1.5">
            <strong>Significations:</strong> {kundli.houses[selectedHouse - 1]?.significations}
          </p>
          <p className="text-[11px] text-amber-200">
            <strong>Planets Present:</strong>{" "}
            {kundli.houses[selectedHouse - 1]?.planetsInHouse.join(", ") || "None"}
          </p>
        </div>
      )}
    </div>
  );
}
