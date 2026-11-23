import { NextRequest, NextResponse } from "next/server";
import { calculatePanchang } from "@/lib/astronomy/panchang";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const city = searchParams.get("city") || "New Delhi";
    const lat = parseFloat(searchParams.get("lat") || "28.6139");
    const lng = parseFloat(searchParams.get("lng") || "77.2090");
    const tz = parseFloat(searchParams.get("tz") || "5.5");

    const panchang = calculatePanchang(date, city, lat, lng, tz);

    return NextResponse.json({ success: true, panchang });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to calculate panchang" },
      { status: 500 }
    );
  }
}
