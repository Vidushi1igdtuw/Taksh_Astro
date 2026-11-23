import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { recordSubscription } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const {
      planId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isTestMode,
    } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keySecret && !isTestMode) {
      // Secure server-side signature verification
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { error: "Invalid payment signature verification failed" },
          { status: 400 }
        );
      }
    }

    // Upgrade user tier in database & record subscription
    const sub = recordSubscription(
      user.id,
      planId as "free" | "pro" | "premium",
      amount || (planId === "pro" ? 999 : 2499),
      razorpay_order_id,
      razorpay_payment_id || `pay_mock_${Date.now()}`
    );

    return NextResponse.json({
      success: true,
      message: `Successfully upgraded to ${planId.toUpperCase()} tier!`,
      subscription: sub,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Payment verification failed" }, { status: 500 });
  }
}
