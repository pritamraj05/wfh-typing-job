import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET || "test_secret";

    // Verify signature
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Update user in Supabase to grant premium access bypassing RLS
    const { error: dbError } = await supabaseAdmin
      .from("users")
      .upsert({ id: userId, has_paid: true, updated_at: new Date().toISOString() });

    if (dbError) {
      console.error("Supabase Error after payment:", dbError);
      // Even if DB fails, payment succeeded. We should log this carefully in production.
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Razorpay Verify Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
