"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto-js";

export async function submitWorkTask(typedText: string, base64Photo: string) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 1. Upload Base64 Photo to Cloudinary using REST API
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary credentials missing");
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signatureString = `timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.SHA1(signatureString).toString();

    const formData = new URLSearchParams();
    formData.append("file", base64Photo);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const cloudData = await cloudinaryRes.json();

    if (!cloudData.secure_url) {
      throw new Error("Failed to upload image to Cloudinary: " + JSON.stringify(cloudData));
    }

    const photoUrl = cloudData.secure_url;

    // 2. Save Task to Supabase bypassing RLS
    const { error } = await supabaseAdmin.from("tasks").insert({
      user_id: userId,
      task_type: "handwriting",
      camera_image_url: photoUrl,
      status: "pending"
    });

    if (error) {
      throw new Error("Database error: " + error.message);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Task submission error:", error);
    return { success: false, error: error.message };
  }
}
