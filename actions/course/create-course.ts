"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateCourseSchema } from "@/schemas/course";

export const createCourse = async (
  channelId: string,
  values: CreateCourseSchema
) => {
  const validatedFields = CreateCourseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title } = validatedFields.data;

  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    return { error: "Unauthenticated" };
  }

  // Check the user in our database
  const user = await db.user.findUnique({ where: { id: currentUser.id } });

  if (!user) {
    return { error: "User not found" };
  }

  const existingCourse = await db.course.findFirst({
    where: {
      channelId,
      title,
    },
  });

  if (existingCourse) {
    return {
      error: `Course named - '${title}' already exists on your channel. Please choose a different title`,
    };
  }

  try {
    const course = await db.course.create({
      data: {
        channelId,
        ...values,
      },
    });

    return {
      success: {
        message: `Course '${course.title}' created successfully`,
        course,
      },
    };
  } catch (err) {
    return { error: "Soemthing went wrong!" };
  }
};
