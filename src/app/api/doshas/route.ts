import { NextRequest, NextResponse } from "next/server";
import { analyzeDoshas } from "@/lib/astronomy/dosha";
import { calculateVedicKundli, KundliData } from "@/lib/astronomy/ephemeris";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let kundli: KundliData = body.kundli;

    if (!kundli && body.birthDetails) {
      const { name, birthDate, birthTime, place, country, latitude, longitude, timezone } = body.birthDetails;
      kundli = calculateVedicKundli({
        name: name || "Seeker",
        birthDate,
        birthTime,
        place,
        country,
        latitude: Number(latitude),
        longitude: Number(longitude),
        timezone: Number(timezone),
      });
    }

    if (!kundli) {
      return NextResponse.json({ error: "Kundli data or birth details required" }, { status: 400 });
    }

    const doshas = analyzeDoshas(kundli);
    return NextResponse.json({ success: true, doshas });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to analyze doshas" }, { status: 500 });
  }
}
