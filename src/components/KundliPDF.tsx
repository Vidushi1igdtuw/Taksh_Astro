"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import { Download, Loader2, FileText } from "lucide-react";
import { KundliData } from "@/lib/astronomy/ephemeris";

interface KundliPDFProps {
  kundli: KundliData;
}

export default function KundliPDF({ kundli }: KundliPDFProps) {
  const [downloading, setDownloading] = useState(false);

  const generatePDF = () => {
    setDownloading(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Background styling
      doc.setFillColor(6, 9, 28);
      doc.rect(0, 0, 210, 297, "F");

      // Gold border
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.8);
      doc.rect(7, 7, 196, 283);

      // Header Brand
      doc.setTextColor(253, 224, 71);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("ASTROVERSE", 105, 22, { align: "center" });

      doc.setTextColor(192, 132, 252);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("SACRED VEDIC JANAM KUNDLI REPORT", 105, 28, { align: "center" });

      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.3);
      doc.line(20, 32, 190, 32);

      // Seeker Details Card
      doc.setFillColor(13, 19, 53);
      doc.rect(15, 36, 180, 36, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`Seeker: ${kundli.birthDetails.name}`, 20, 44);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(203, 213, 225);
      doc.text(`Date of Birth: ${kundli.birthDetails.date}`, 20, 52);
      doc.text(`Time of Birth: ${kundli.birthDetails.time}`, 20, 58);
      doc.text(`Place: ${kundli.birthDetails.place}, ${kundli.birthDetails.country}`, 20, 64);

      doc.text(`Lagna: ${kundli.lagna.signName} (${kundli.lagna.signSanskrit}) - ${kundli.lagna.dms}`, 110, 44);
      doc.text(`Moon Sign: ${kundli.moonSign.signName} (${kundli.moonSign.signSanskrit})`, 110, 52);
      doc.text(`Nakshatra: ${kundli.moonSign.nakshatraName} (Pada ${kundli.moonSign.pada})`, 110, 58);
      doc.text(`Ayanamsa: ${kundli.ayanamsaName} (${kundli.ayanamsaDms})`, 110, 64);

      // Section Title: Planetary Positions
      doc.setTextColor(253, 224, 71);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("PLANETARY POSITIONS (GRAHA STHITI)", 20, 80);

      // Table Header
      let y = 86;
      doc.setFillColor(27, 36, 85);
      doc.rect(15, y, 180, 8, "F");
      doc.setTextColor(253, 224, 71);
      doc.setFontSize(8);
      doc.text("Graha", 20, y + 5.5);
      doc.text("Rashi (Sign)", 45, y + 5.5);
      doc.text("Degree (DMS)", 75, y + 5.5);
      doc.text("House", 110, y + 5.5);
      doc.text("Nakshatra", 125, y + 5.5);
      doc.text("Pada", 155, y + 5.5);
      doc.text("Dignity", 170, y + 5.5);

      // Table Rows
      y += 8;
      const allRows = [
        {
          name: "Lagna",
          sign: kundli.lagna.signName,
          dms: kundli.lagna.dms,
          house: 1,
          nak: kundli.lagna.nakshatraName,
          pada: kundli.lagna.pada,
          dignity: "Ascendant",
        },
        ...kundli.planets.map((p) => ({
          name: `${p.name}${p.isRetrograde ? " (R)" : ""}`,
          sign: p.signName,
          dms: p.dms,
          house: p.house,
          nak: p.nakshatraName,
          pada: p.pada,
          dignity: p.dignity,
        })),
      ];

      allRows.forEach((r, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(13, 19, 53);
        } else {
          doc.setFillColor(18, 25, 68);
        }
        doc.rect(15, y, 180, 7.5, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text(r.name, 20, y + 5);
        doc.text(r.sign, 45, y + 5);
        doc.text(r.dms, 75, y + 5);
        doc.text(String(r.house), 112, y + 5);
        doc.text(r.nak, 125, y + 5);
        doc.text(String(r.pada), 158, y + 5);
        doc.text(r.dignity, 170, y + 5);

        y += 7.5;
      });

      // Section: Major Yogas
      y += 8;
      doc.setTextColor(253, 224, 71);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("MAJOR VEDIC YOGAS DETECTED", 20, y);

      y += 6;
      if (kundli.yogas && kundli.yogas.length > 0) {
        kundli.yogas.slice(0, 4).forEach((yoga) => {
          doc.setFillColor(13, 19, 53);
          doc.rect(15, y, 180, 14, "F");

          doc.setTextColor(253, 224, 71);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.text(`• ${yoga.name} (${yoga.type})`, 18, y + 5);

          doc.setTextColor(203, 213, 225);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.text(yoga.effects, 18, y + 10, { maxWidth: 172 });

          y += 16;
        });
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(203, 213, 225);
        doc.text("Universal planetary alignments present without heavy harsh combinations.", 20, y + 5);
        y += 12;
      }

      // Footer
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.3);
      doc.line(20, 275, 190, 275);

      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(
        "Generated by ASTROVERSE • High-Precision Sidereal Ephemeris Engine • www.astroverse.io",
        105,
        281,
        { align: "center" }
      );

      doc.save(`${kundli.birthDetails.name.replace(/\s+/g, "_")}_Astroverse_Kundli.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={downloading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-cosmic-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105 disabled:opacity-50"
    >
      {downloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download PDF Kundli</span>
        </>
      )}
    </button>
  );
}
