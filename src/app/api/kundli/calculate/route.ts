import { NextRequest, NextResponse } from "next/server";
import { calculateVedicKundli } from "@/lib/astronomy/ephemeris";
import { getUserFromRequest } from "@/lib/auth";
import { saveBirthProfile } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, birthDate, birthTime, place, country, latitude, longitude, timezone, gender, saveProfile } = body;

    if (!birthDate || !birthTime || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Date, time, latitude, and longitude are required" },
        { status: 400 }
      );
    }

    const kundli = calculateVedicKundli({
      name: name || "Seeker",
      birthDate,
      birthTime,
      place: place || "Custom Location",
      country: country || "Earth",
      latitude: Number(latitude),
      longitude: Number(longitude),
      timezone: Number(timezone || 5.5),
    });

    // Optionally save to user account if logged in
    const user = await getUserFromRequest(req);
    if (user && saveProfile) {
      saveBirthProfile({
        userId: user.id,
        name: name || "Seeker",
        birthDate,
        birthTime,
        place: place || "Custom Location",
        country: country || "Earth",
        latitude: Number(latitude),
        longitude: Number(longitude),
        timezone: Number(timezone || 5.5),
        gender,
        chartData: kundli,
      });
    }

    return NextResponse.json({ success: true, kundli });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to calculate birth chart" },
      { status: 500 }
    );
  }
}
