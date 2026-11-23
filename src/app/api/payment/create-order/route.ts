import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { planId, amount } = await req.json();

    if (!planId || !amount) {
      return NextResponse.json({ error: "Plan ID and amount are required" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      // Call actual Razorpay Orders API
      const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authHeader}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // in paise
          currency: "INR",
          receipt: `rcpt_${user.id}_${Date.now()}`,
          notes: {
            userId: user.id,
            planId,
          },
        }),
      });

      const orderData = await rzpRes.json();
      if (!rzpRes.ok) {
        return NextResponse.json({ error: orderData.error?.description || "Razorpay order creation failed" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId,
        isTestMode: false,
      });
    }

    // Seamless Dev / Test Mode order generation
    const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: Math.round(amount * 100),
      currency: "INR",
      keyId: "rzp_test_placeholder_key",
      isTestMode: true,
      notice: "Running in Sandbox/Test mode. You can test payment confirmation directly.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}
