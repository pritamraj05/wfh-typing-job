import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret",
    });
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, taskId } = body;

    let amount = 150000; // 1500 INR default (platform fee)

    if (type === "task_activation" && taskId) {
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      
      const { data: task, error } = await supabaseAdmin
        .from("available_tasks")
        .select("activation_fee")
        .eq("task_id", taskId)
        .single();
        
      if (error || !task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }
      
      amount = task.activation_fee * 100; // Convert INR to paise
    } else if (type === "task_activation") {
      amount = 30000; // 300 INR fallback
    } else if (type === "premium_task") {
      amount = 50000; // 500 INR fallback
    }

    const options = {
      amount: amount,
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
