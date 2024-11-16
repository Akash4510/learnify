import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/db";

// Added this code here, because there was an error in deployment
// when importing stripe from the lib folder
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-09-30.acacia",
  typescript: true,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("[STRIPE_WEBHOOK_API_ERROR", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Webhook Error: Missing metadata", {
        status: 400,
      });
    }

    await db.coursePurchase.create({
      data: {
        courseId,
        userId,
      },
    });
  } else {
    return new NextResponse(
      `Webhook error: Unhandeled event type - '${event.type}'`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
