import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret",
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const type = body.type || "platform_fee";
    
    // Default platform fee: ₹1500. Task activation: ₹300. (in paise)
    const amount = type === "task_activation" ? 300 * 100 : 1500 * 100;

    const options = {
      amount,
      currency: "INR",
      receipt: `rcpt_${userId.slice(-8)}_${Date.now()}`.slice(0, 40),
      payment_capture: 1, // Auto capture
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error: any) {
    console.error("Razorpay Create Order Error:", error);
    const errorMsg = error?.error?.description || error?.message || JSON.stringify(error);
    return NextResponse.json({ error: "Failed to create order: " + errorMsg }, { status: 500 });
  }
}
