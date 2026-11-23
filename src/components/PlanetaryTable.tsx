"use client";

import React from "react";
import { KundliData, PlanetPosition } from "@/lib/astronomy/ephemeris";

interface PlanetaryTableProps {
  kundli: KundliData;
}

export default function PlanetaryTable({ kundli }: PlanetaryTableProps) {
  const getDignityBadge = (dignity: PlanetPosition["dignity"]) => {
    switch (dignity) {
      case "Exalted":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Own":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "Mooltrikona":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
      case "Debilitated":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "Friendly":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-slate-700/30 text-slate-400 border-slate-600/30";
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl glass-panel border border-white/10 shadow-xl">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-cosmic-900/80 border-b border-white/10 text-amber-300 uppercase tracking-wider text-[11px]">
          <tr>
            <th className="px-4 py-3 font-semibold">Planet (Graha)</th>
            <th className="px-4 py-3 font-semibold">Sign (Rashi)</th>
            <th className="px-4 py-3 font-semibold">Degree (DMS)</th>
            <th className="px-4 py-3 font-semibold">House</th>
            <th className="px-4 py-3 font-semibold">Nakshatra</th>
            <th className="px-4 py-3 font-semibold">Pada</th>
            <th className="px-4 py-3 font-semibold">Dignity</th>
            <th className="px-4 py-3 font-semibold">Motion</th>
            <th className="px-4 py-3 font-semibold">Navamsa</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {/* Lagna Row */}
          <tr className="bg-amber-500/5 font-medium">
            <td className="px-4 py-3 flex items-center gap-2 text-amber-300 font-bold">
              <span>Lagna (Ascendant)</span>
            </td>
            <td className="px-4 py-3 text-slate-200">
              {kundli.lagna.signName} ({kundli.lagna.signSanskrit})
            </td>
            <td className="px-4 py-3 font-mono text-amber-200">{kundli.lagna.dms}</td>
            <td className="px-4 py-3 font-bold text-amber-300">1</td>
            <td className="px-4 py-3">{kundli.lagna.nakshatraName}</td>
            <td className="px-4 py-3">{kundli.lagna.pada}</td>
            <td className="px-4 py-3">
              <span className="px-2 py-0.5 rounded border text-[10px] bg-purple-500/20 text-purple-300 border-purple-500/40 font-semibold">
                Self / Asc
              </span>
            </td>
            <td className="px-4 py-3 text-slate-400">Direct</td>
            <td className="px-4 py-3 text-slate-300">{kundli.navamsaChart.lagnaSignName}</td>
          </tr>

          {/* Planets */}
          {kundli.planets.map((p) => (
            <tr key={p.name} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-100 flex items-center gap-2">
                <span>{p.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({p.sanskrit})</span>
              </td>
              <td className="px-4 py-3 text-slate-200">
                {p.signName} ({p.signSanskrit})
              </td>
              <td className="px-4 py-3 font-mono text-slate-300">{p.dms}</td>
              <td className="px-4 py-3 font-bold text-amber-400">{p.house}</td>
              <td className="px-4 py-3">{p.nakshatraName}</td>
              <td className="px-4 py-3 font-mono">{p.pada}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${getDignityBadge(
                    p.dignity
                  )}`}
                >
                  {p.dignity}
                </span>
              </td>
              <td className="px-4 py-3">
                {p.isRetrograde ? (
                  <span className="px-2 py-0.5 rounded border border-rose-500/40 bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                    Retrograde (Vakri)
                  </span>
                ) : (
                  <span className="text-slate-400">Direct (Marga)</span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-300">{p.navamsaSignName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
