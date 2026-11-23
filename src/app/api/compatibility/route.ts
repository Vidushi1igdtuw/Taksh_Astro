import { NextRequest, NextResponse } from "next/server";
import { calculateAshtakootaMilan } from "@/lib/astronomy/compatibility";
import { calculateVedicKundli, KundliData } from "@/lib/astronomy/ephemeris";

export async function POST(req: NextRequest) {
  try {
    const { partner1, partner2 } = await req.json();

    if (!partner1 || !partner2) {
      return NextResponse.json(
        { error: "Birth details for both partners are required" },
        { status: 400 }
      );
    }

    const k1: KundliData =
      partner1.kundli ||
      calculateVedicKundli({
        name: partner1.name || "Partner 1",
        birthDate: partner1.birthDate,
        birthTime: partner1.birthTime,
        place: partner1.place || "Delhi",
        country: partner1.country || "India",
        latitude: Number(partner1.latitude || 28.6139),
        longitude: Number(partner1.longitude || 77.209),
        timezone: Number(partner1.timezone || 5.5),
      });

    const k2: KundliData =
      partner2.kundli ||
      calculateVedicKundli({
        name: partner2.name || "Partner 2",
        birthDate: partner2.birthDate,
        birthTime: partner2.birthTime,
        place: partner2.place || "Mumbai",
        country: partner2.country || "India",
        latitude: Number(partner2.latitude || 19.076),
        longitude: Number(partner2.longitude || 72.8777),
        timezone: Number(partner2.timezone || 5.5),
      });

    const report = calculateAshtakootaMilan(k1, k2);

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to calculate compatibility" },
      { status: 500 }
    );
  }
}
