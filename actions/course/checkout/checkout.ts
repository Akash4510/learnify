"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

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

  return {
    success: {
      message: "Checkout successful",
    },
  };
};
