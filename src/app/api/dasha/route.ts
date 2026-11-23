import { NextRequest, NextResponse } from "next/server";
import { calculateVimshottariDasha } from "@/lib/astronomy/dasha";
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
      return NextResponse.json({ error: "Kundli data required" }, { status: 400 });
    }

    const moonPlanet = kundli.planets.find((p) => p.name === "Moon");
    if (!moonPlanet) {
      return NextResponse.json({ error: "Moon position missing in Kundli" }, { status: 400 });
    }

    const birthDateUtc = new Date(kundli.birthDetails.date);
    const dasha = calculateVimshottariDasha(birthDateUtc, moonPlanet);

    return NextResponse.json({ success: true, dasha });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to calculate dasha" }, { status: 500 });
  }
}
