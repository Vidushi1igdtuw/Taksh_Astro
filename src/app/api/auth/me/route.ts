import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { getBirthProfilesByUserId, getConversationsByUserId } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const profiles = getBirthProfilesByUserId(user.id);
  const conversations = getConversationsByUserId(user.id);

  return NextResponse.json({
    user,
    profiles,
    conversationsCount: conversations.length,
  });
}
