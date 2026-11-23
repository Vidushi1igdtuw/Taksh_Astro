import { NextRequest, NextResponse } from "next/server";
import { calculateNumerology } from "@/lib/astronomy/numerology";

export async function POST(req: NextRequest) {
  try {
    const { name, birthDate } = await req.json();

    if (!name || !birthDate) {
      return NextResponse.json(
        { error: "Name and birth date are required" },
        { status: 400 }
      );
    }

    const report = calculateNumerology(name, birthDate);

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to calculate numerology" },
      { status: 500 }
    );
  }
}
