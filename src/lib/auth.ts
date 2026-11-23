import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { findUserById } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "astroverse_celestial_sacred_jwt_secret_key_2026";

export interface TokenPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
  tier: "free" | "pro" | "premium";
}

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getUserFromRequest(req: NextRequest) {
  // Check authorization header
  const authHeader = req.headers.get("authorization");
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else {
    // Check cookies
    const cookieToken = req.cookies.get("astro_token");
    if (cookieToken) token = cookieToken.value;
  }

  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;

  const user = findUserById(payload.userId);
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    tier: user.tier,
  };
}
