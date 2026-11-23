import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, createUser, saveBirthProfile, updateUser } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";
import { calculateVedicKundli } from "@/lib/astronomy/ephemeris";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      birthDate,
      birthTime,
      place,
      country,
      latitude,
      longitude,
      timezone,
      gender,
    } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);
    const user = createUser({
      name,
      email,
      passwordHash,
      role: "user",
      tier: "free",
    });

    // Create user's initial birth profile if birth details are provided
    let profile = null;
    let kundli = null;

    if (birthDate && birthTime && latitude !== undefined && longitude !== undefined) {
      kundli = calculateVedicKundli({
        name,
        birthDate,
        birthTime,
        place: place || "New Delhi",
        country: country || "India",
        latitude: Number(latitude),
        longitude: Number(longitude),
        timezone: Number(timezone || 5.5),
      });

      profile = saveBirthProfile({
        userId: user.id,
        name,
        birthDate,
        birthTime,
        place: place || "New Delhi",
        country: country || "India",
        latitude: Number(latitude),
        longitude: Number(longitude),
        timezone: Number(timezone || 5.5),
        gender: gender || "Other",
        chartData: kundli,
      });

      updateUser(user.id, { savedBirthProfileId: profile.id });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tier: user.tier,
    });

    const res = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
      },
      profile,
      kundli,
      token,
    });

    res.cookies.set("astro_token", token, {
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to register" },
      { status: 500 }
    );
  }
}
