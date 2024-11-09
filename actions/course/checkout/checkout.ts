"use server";

import Stripe from "stripe";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const enrollCourse = async ({ courseId }: { courseId: string }) => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
  });

  if (!course) {
    return {
      error: {
        message: "Course not found",
      },
    };
  }

  const purchased = await db.coursePurchase.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: courseId,
      },
    },
  });

  if (purchased) {
    return {
      error: {
        message: "Course already purchased",
      },
    };
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: course.title,
          description: course.description!,
        },
        unit_amount: Math.round(course.price! * 100),
      },
    },
  ];

  let stripeCustomer = await db.stripeCustomer.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!stripeCustomer) {
    const customer = await stripe.customers.create({
      email: user.email,
    });

    stripeCustomer = await db.stripeCustomer.create({
      data: {
        userId: user.id,
        stripeCustomerId: customer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomer.stripeCustomerId,
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?cancelled=1`,
    // The metaData here is very important
    metadata: {
      courseId: course.id,
      userId: user.id,
    },
  });

  return {
    success: {
      message: "Checkout successful",
      url: session.url,
    },
  };
};
