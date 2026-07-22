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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, type } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET || "test_secret";

    // Verify signature
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Update user in Supabase to grant access bypassing RLS
    if (type === "task_activation" && body.taskId) {
      // Grant dynamic task access
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("clerk_id", userId)
        .single();
        
      if (user) {
        const { error: dbError } = await supabaseAdmin
          .from("user_task_access")
          .upsert({ user_id: user.id, task_id: body.taskId, granted_by: 'payment' }, { onConflict: 'user_id,task_id' });
          
        if (dbError) console.error("Supabase Error after payment (task_access):", dbError);
      }
    } else {
      // Platform fee or old logic
      let updateData: any = { updated_at: new Date().toISOString() };
      if (type === "premium_task") {
        updateData.has_free_premium_task = true;
      } else {
        updateData.has_paid = true;
      }
  
      const { error: dbError } = await supabaseAdmin
        .from("users")
        .update(updateData)
        .eq("clerk_id", userId);
  
      if (dbError) {
        console.error("Supabase Error after payment:", dbError);
        // Even if DB fails, payment succeeded. We should log this carefully in production.
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Razorpay Verify Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
