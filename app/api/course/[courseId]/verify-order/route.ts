import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { db } from "@/lib/db";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return sig;
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { orderId, razorpayPaymentId, razorpaySignature, userId } =
    await req.json();

  console.log({ orderId, razorpayPaymentId, razorpaySignature, userId });
  const { courseId } = await params;

  const signature = generatedSignature(orderId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      {
        error: {
          message: "Invalid signature! Payment verification failed",
        },
      },
      { status: 400 }
    );
  }

  // DB logic to update the course purchase
  await db.coursePurchase.create({
    data: {
      userId,
      courseId,
      razorpayOrderId: orderId,
      razorpayPaymentId,
    },
  });

  return NextResponse.json(
    {
      success: {
        message: "Payment successful",
      },
    },
    { status: 200 }
  );
}
