"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";

export const createOrder = async ({ courseId }: { courseId: string }) => {
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

  const price = course.price || 0; // Here we know that the price property is not null, becaused before publishing the course, the price must be set, and here we are only fetching published courses
  // But for safety, we are using the nullish coalescing operator to set the price to 0 if it is null

  const order = await razorpay.orders.create({
    amount: price * 100,
    currency: "INR",
    receipt: `course-${course.id}`, // This is a unique identifier for the order, it can be a maximum of 40 characters,
    notes: {
      userId: user.id,
      userName: user.name,
      courseId: course.id,
      courseTitle: course.title,
      timestamp: new Date().toISOString(),
    },
  });

  return {
    success: {
      message: "Checkout successful",
      order,
      metadata: {
        userId: user.id,
        courseId: course.id,
      },
    },
  };
};
